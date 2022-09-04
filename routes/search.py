from fastapi import APIRouter
from config.db import conn

search = APIRouter()

@search.post('/search/{params}')
def post_search(params):
  return f'your search is: {params}'