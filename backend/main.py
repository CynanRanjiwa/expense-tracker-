from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Float, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime

app = FastAPI()

# CORS settings
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

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./expense_tracker.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float, nullable=False)
    category = Column(String, nullable=False)
    description = Column(String, nullable=True)
    date = Column(Date, default=datetime.date.today)

class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, nullable=False)
    password = Column(String, nullable=False)

Base.metadata.create_all(bind=engine)

# Routes for transactions
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

# Routes for categories
@app.get("/categories/")
def read_categories(skip: int = 0, limit: int = 10):
    db = SessionLocal()
    categories = db.query(Category).offset(skip).limit(limit).all()
    db.close()
    return categories

@app.post("/categories/")
def create_category(name: str):
    db = SessionLocal()
    category = Category(name=name)
    db.add(category)
    db.commit()
    db.refresh(category)
    db.close()
    return category

# Routes for users
@app.get("/users/")
def read_users(skip: int = 0, limit: int = 10):
    db = SessionLocal()
    users = db.query(User).offset(skip).limit(limit).all()
    db.close()
    return users

@app.post("/users/")
def create_user(username: str, email: str, password: str):
    db = SessionLocal()
    user = User(username=username, email=email, password=password)
    db.add(user)
    db.commit()
    db.refresh(user)
    db.close()
    return user

# Run the application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
