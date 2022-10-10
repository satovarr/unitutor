from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import models
from .database import SessionLocal, engine

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
