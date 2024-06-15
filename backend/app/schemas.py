# creating pydantic schemas 
from pydantic import BaseModel
from typing import Optional
from datetime import date

class TransactionBase(BaseModel):
    amount: float
    category: str
    description: str
    is_income: bool
    date: date

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int

    class Config:
        orm_mode = True
