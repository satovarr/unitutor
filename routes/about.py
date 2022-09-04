from fastapi import APIRouter

about = APIRouter()

@about.get('/about')
def get_about():
  return "about"