from fastapi import APIRouter
from config.db import conn

home = APIRouter()

@home.get('/')
def get_home():
  return "home"