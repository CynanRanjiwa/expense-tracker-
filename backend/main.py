# backend/main.py
from fastapi import FastAPI, HTTPException, Depends, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, desc
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from pydantic import BaseModel
from models import Base, Expense
from typing import List

app = FastAPI()

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ExpenseCreate(BaseModel):
    description: str
    amount: float
    date: datetime

class ExpenseUpdate(BaseModel):
    description: str
    amount: float
    date: datetime

@app.post("/expenses/", response_model=Expense)
def create_expense(expense: ExpenseCreate, db: Session = Depends(get_db)):
    new_expense = Expense(**expense.dict())
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)
    return new_expense

@app.get("/expenses/", response_model=List[Expense])
def read_expenses(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(Expense).order_by(desc(Expense.date)).offset(skip).limit(limit).all()

@app.get("/expenses/{expense_id}", response_model=Expense)
def read_expense(expense_id: int, db: Session = Depends(get_db)):
    expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if expense is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expense not found")
    return expense

@app.put("/expenses/{expense_id}", response_model=Expense)
def update_expense(expense_id: int, expense: ExpenseUpdate, db: Session = Depends(get_db)):
    db_expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if db_expense is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expense not found")
    for var, value in vars(expense).items():
        setattr(db_expense, var, value)
    db.commit()
    db.refresh(db_expense)
    return db_expense

@app.delete("/expenses/{expense_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_expense(expense_id: int, db: Session = Depends(get_db)):
    expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if expense is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expense not found")
    db.delete(expense)
    db.commit()
    return

# Pagination endpoint
@app.get("/expenses/paginate/", response_model=List[Expense])
def paginate_expenses(skip: int = Query(0, ge=0), limit: int = Query(10, le=100), db: Session = Depends(get_db)):
    return db.query(Expense).order_by(desc(Expense.date)).offset(skip).limit(limit).all()

# Create the database tables
Base.metadata.create_all(bind=engine)
