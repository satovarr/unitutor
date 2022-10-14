from fastapi import FastAPI
from .routers import tutoring, user

from sqlalchemy.orm import Session
from .sql import models
from .sql.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine, checkfirst=True)

app = FastAPI()

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

app.include_router(tutoring.router)
app.include_router(user.router)
