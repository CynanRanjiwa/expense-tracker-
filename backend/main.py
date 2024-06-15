# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Float, Date, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime

app = FastAPI()

# CORS settings to allow frontend communication
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
DATABASE_URL = "sqlite:///./transactions.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Transaction model
class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float, nullable=False)
    category = Column(String, nullable=False)
    description = Column(String, nullable=True)
    income = Column(Boolean, default=False)
    date = Column(Date, default=datetime.date.today)

Base.metadata.create_all(bind=engine)

# Pydantic model for request body
class TransactionCreate(BaseModel):
    amount: float
    category: str
    description: str
    income: bool
    date: datetime.date

# API to create a transaction
@app.post("/transactions/")
def create_transaction(transaction: TransactionCreate):
    db = SessionLocal()
    db_transaction = Transaction(**transaction.dict())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    db.close()
    return db_transaction

# API to read transactions
@app.get("/transactions/")
def read_transactions(skip: int = 0, limit: int = 10):
    db = SessionLocal()
    transactions = db.query(Transaction).offset(skip).limit(limit).all()
    db.close()
    return transactions

# Run the FastAPI app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
