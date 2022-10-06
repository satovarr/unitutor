from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import models
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

sql_app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
