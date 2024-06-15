# main.py

from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine, Column, Integer, String, Float, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SQLALCHEMY_DATABASE_URL = "sqlite:///./transactions.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float, nullable=False)
    category = Column(String, nullable=False)
    description = Column(String, nullable=True)
    date = Column(Date, default=datetime.date.today)

Base.metadata.create_all(bind=engine)

@app.get("/transactions/")
def read_transactions(skip: int = 0, limit: int = 10):
    db = SessionLocal()
    transactions = db.query(Transaction).offset(skip).limit(limit).all()
    db.close()
    return transactions

@app.post("/transactions/")
def create_transaction(amount: float, category: str, description: str = None):
    db = SessionLocal()
    transaction = Transaction(amount=amount, category=category, description=description)
    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    db.close()
    return transaction

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
