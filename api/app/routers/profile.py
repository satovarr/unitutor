from fastapi import APIRouter, Body
from ..helpers.validateToken import validateToken

router = APIRouter()

@router.get('/profile')
def getProfile(token = Body()):
  return "my profile"
