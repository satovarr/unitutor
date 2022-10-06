from fastapi import APIRouter, Body, Request
from ..helpers.validateToken import validateToken

router = APIRouter()

@router.get('/register')
def get_register_page():
  return "register"

@router.post('/register-test')
def create_user(token: dict = Body(...)):
  return {"uuid": validateToken(token)}
