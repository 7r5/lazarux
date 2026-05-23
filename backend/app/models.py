from sqlalchemy import Column, Float, Integer, String, Text
from .database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    image_url = Column(String(512), nullable=True)
    stock = Column(Integer, nullable=False, default=0)


class CartItem(Base):
    __tablename__ = "cart_items"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, nullable=False)
    quantity = Column(Integer, nullable=False, default=1)
