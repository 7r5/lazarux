from fastapi import APIRouter, HTTPException
from ..schemas import CartItemSchema, CheckoutRequest

router = APIRouter()

fake_cart = []


@router.get("/", response_model=list[CartItemSchema])
def get_cart():
    return fake_cart


@router.post("/add", response_model=list[CartItemSchema])
def add_to_cart(item: CartItemSchema):
    for existing in fake_cart:
        if existing["product_id"] == item.product_id:
            existing["quantity"] += item.quantity
            return fake_cart

    fake_cart.append(item.dict())
    return fake_cart


@router.post("/checkout")
def checkout(request: CheckoutRequest):
    if not request.items:
        raise HTTPException(status_code=400, detail="El carrito está vacío")
    fake_cart.clear()
    return {"message": "Pago simulado completado", "status": "success"}
