from fastapi import APIRouter
from config.db import conn
from models.users import users
from schemas.user import User

user = APIRouter()


@user.get("/users")
def get_profile():
  return "loged user profile"

@user.get("/users/{user_id}")
def get_profile_by_id(user_id: int):
  return f"profile is {user_id}"

"""
@user.get("/users")
def get_users():
  return conn.execute(users.select()).fetchall()
"""

@user.post("/users")
def create_user(user: User):
  print(user)
  return "Hello world"

"""
@user.get("/users")
def hello():
  return "Hello world"
  """
