from fastapi import FastAPI
from .routers import register, profile, user

from sqlalchemy.orm import Session
from .sql import models
from .sql.database import SessionLocal, engine

app = FastAPI()

app.include_router(register.router)
app.include_router(profile.router)
app.include_router(user.router)
