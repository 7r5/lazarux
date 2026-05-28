from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from ..database import get_db
from ..models import User
from ..schemas import LoginRequest, RegisterRequest, TokenResponse

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


@router.post("/register", response_model=TokenResponse)
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    email = data.email.strip().lower()
    first_name = data.first_name.strip()
    last_name = data.last_name.strip()
    age = data.age
    user_type = data.user_type.strip().lower()

    if not email or not data.password or not first_name or not last_name:
        raise HTTPException(status_code=400, detail="Email, nombre, apellido y contraseña son obligatorios")
    if len(data.password) < 4:
        raise HTTPException(status_code=400, detail="La contraseña debe tener al menos 4 caracteres")
    if age <= 0:
        raise HTTPException(status_code=400, detail="La edad debe ser un número positivo")
    if user_type not in ["user", "admin"]:
        raise HTTPException(status_code=400, detail="El tipo de usuario debe ser 'user' o 'admin'")

    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="El usuario ya existe")

    user = User(
        email=email,
        hashed_password=get_password_hash(data.password),
        first_name=first_name,
        last_name=last_name,
        age=age,
        role=user_type,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"access_token": "dummy-token", "token_type": "bearer"}


@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    if not data.email or not data.password:
        raise HTTPException(status_code=400, detail="Email y contraseña son obligatorios")

    user = db.query(User).filter(User.email == data.email.strip().lower()).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Email o contraseña inválidos")

    return {"access_token": "dummy-token", "token_type": "bearer"}


@router.get("/profile")
def profile(token: str = "dummy-token"):
    return {"email": "usuario@ecommerce.com", "name": "Cliente Demo"}
