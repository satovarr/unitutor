from fastapi import FastAPI

from routes.about import about
from routes.category import category
from routes.chat import chat
from routes.home import home
from routes.post import post
from routes.register import register
from routes.search import search
from routes.user import user

app = FastAPI()

app.include_router(about)
app.include_router(category)
app.include_router(chat)
app.include_router(home)
app.include_router(post)
app.include_router(register)
app.include_router(search)
app.include_router(user)
