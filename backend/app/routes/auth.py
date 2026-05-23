from fastapi import APIRouter, HTTPException
from ..schemas import LoginRequest, TokenResponse

router = APIRouter()


@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest):
    # Dummy authentication: acepta cualquier credencial y devuelve un token simple.
    if not data.email or not data.password:
        raise HTTPException(status_code=400, detail="Email y contraseña son obligatorios")

    return {"access_token": "dummy-token", "token_type": "bearer"}


@router.get("/profile")
def profile(token: str = "dummy-token"):
    # En un desarrollo simple se usa un token de prueba.
    return {"email": "usuario@ecommerce.com", "name": "Cliente Demo"}
