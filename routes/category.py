from fastapi import APIRouter
from config.db import conn

category = APIRouter()

@category.get('/c/{category_name}/{subcategory_name}')
def get_subcategory_by_name(category_name, subcategory_name):
  return f"your category is: {category_name} and your subcategory is {subcategory_name}"

@category.get('/c/{category_name}')
def get_category_by_name(category_name):
  return f"your category is: {category_name}"
