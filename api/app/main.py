from fastapi import FastAPI

from .routers import tutoring, user


from .sql import models
from .sql.database import engine

models.Base.metadata.create_all(bind=engine, checkfirst=True)

app = FastAPI()


app.include_router(tutoring.router)
app.include_router(user.router)
