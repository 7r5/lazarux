import os
from urllib.parse import urlparse, parse_qs, urlencode, urlunparse

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Read DATABASE_URL from env, default to local MySQL
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "mysql+pymysql://ecommerce_user:ecommerce_pass@localhost:3306/ecommerce",
)


# Some connection providers (e.g. Aiven) include `ssl-mode=REQUIRED` in the
# DATABASE_URL query string. SQLAlchemy will pass unknown query params directly
# to the DB-API (PyMySQL), and PyMySQL does not accept a keyword named
# "ssl-mode" (hyphen). To avoid TypeError: Connection.__init__() got an
# unexpected keyword argument 'ssl-mode', strip that param and map it to
# PyMySQL's `ssl` connect arg.
def _create_engine_from_url(db_url: str):
    parsed = urlparse(db_url)
    qs = parse_qs(parsed.query, keep_blank_values=True)
    connect_args = {}

    if "ssl-mode" in qs:
        # Remove unsupported 'ssl-mode' query param and enable SSL for PyMySQL
        qs.pop("ssl-mode", None)
        connect_args["ssl"] = {}

    # Rebuild query string without the removed params
    new_query = urlencode({k: v[0] for k, v in qs.items()})
    cleaned = parsed._replace(query=new_query)
    cleaned_url = urlunparse(cleaned)

    return create_engine(cleaned_url, echo=False, future=True, connect_args=connect_args)


engine = _create_engine_from_url(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
