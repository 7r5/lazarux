from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routes import auth, products, cart

app = FastAPI(
    title="Ecommerce API",
    description="API de backend para ecommerce con FastAPI y MySQL.",
    version="0.1.0",
)

# Definimos explícitamente los dominios que pueden consultar esta API
origins = [
    "https://ecommerce-frontend-a34i.onrender.com",  # Tu frontend en Render
    "http://localhost:5173",                          # Tu entorno local con Vite
    "http://127.0.0.1:5173",
    "http://localhost:10000",                         # Por si pruebas el preview localmente
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # <-- Cambiado '*' por la lista explícita de orígenes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(products.router, prefix="/products", tags=["products"])
app.include_router(cart.router, prefix="/cart", tags=["cart"])


@app.get("/health")
def health_check():
    return {"status": "ok"}
