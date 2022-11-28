from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import tutoring, user
from .sql import models
from .sql.database import engine

models.Base.metadata.create_all(bind=engine, checkfirst=True)

app = FastAPI()

origins = [
    "https://unitutor-f0c21.web.app", 
    "https://unitutor-f0c21.firebaseapp.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tutoring.router)
app.include_router(user.router)
