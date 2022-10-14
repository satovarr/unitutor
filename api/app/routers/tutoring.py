from fastapi import APIRouter, Body, Request, Depends, HTTPException
from http import HTTPStatus
from sqlalchemy.orm import Session
from .validateToken import validate_token
from ..sql.database import get_db

router = APIRouter()


@router.get('/categories')
def create_user(token: dict = Body(...), db: Session = Depends(get_db)):
  return "categories"

@router.get('/search')
def create_tutoring(token: dict = Body(...), db: Session = Depends(get_db)):
    return HTTPStatus.OK


@router.get('/tutoring/{tutoring_id}')
def signin_user(token: dict = Body(...), db: Session = Depends(get_db)):
    return HTTPStatus.OK


@router.get('/user/{user_public_id}')
def profile_user(token: dict = Body(...), db: Session = Depends(get_db)):
    return HTTPStatus.OK
