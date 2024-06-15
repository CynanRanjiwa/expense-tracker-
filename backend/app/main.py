from fastapi import FastAPI
from app.database import engine
from app.models import Base
from app.routers import transactions  # Import your routers

# Create the database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Include your routers
app.include_router(transactions.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}
