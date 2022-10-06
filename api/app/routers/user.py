from fastapi import APIRouter, Body
from ..helpers.validateToken import validateToken

router = APIRouter()

@router.get('/user/{user_public_id}')
def getProfile(user_public_id, token = Body()):
  return f"profile of {user_public_id}"
