from pydantic import BaseModel
from fastapi import Depends, HTTPException, status

class ProductCreate(BaseModel):
    name: str
    price: float
    description: str