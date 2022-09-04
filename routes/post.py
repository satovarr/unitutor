from fastapi import APIRouter
from config.db import conn

post = APIRouter()

@post.get('/post/{post_id}')
def get_post_by_id(post_id):
  return f"tutorind number {post_id}"

@post.get('/post')
def get_post():
  return "post tutoring here"

@post.post('/post')
def post_tutoring(params):
  return params
