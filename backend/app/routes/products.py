from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Product
from ..schemas import ProductBase

router = APIRouter()


@router.get("/", response_model=list[ProductBase])
def list_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return products


@router.get("/{product_id}", response_model=ProductBase)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    return product
