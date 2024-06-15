# defining my sqlalchemy models 
from sqlalchemy import Column, Integer, String, Boolean, Float, Date
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import relationship
from .database import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float, nullable=False)
    category = Column(String, index=True)
    description = Column(String, index=True)
    is_income = Column(Boolean, default=False)
    date = Column(Date, nullable=False)
