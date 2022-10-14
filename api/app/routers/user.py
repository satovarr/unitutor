from fastapi import APIRouter, Body, Request, Depends, HTTPException
from http import HTTPStatus
from sqlalchemy.orm import Session
from ..middlewares.validateToken import validate_token
from ..main import get_db
from ..sql import crud

router = APIRouter()


@router.get('/signin-user')
def signin_user(token: dict = Body(...), db: Session = Depends(get_db)):
    if validate_token(token):
        return HTTPStatus.OK
    raise HTTPException(status_code=404, detail="Invalid login")


@router.get('/profile-user')
def profile_user(token: dict = Body(...), db: Session = Depends(get_db)):
    uuid = validate_token(token)
    if uuid:
        return crud.get_user_by_id(db, uuid)
    raise HTTPException(status_code=404, detail="Invalid user token")


@router.post('/create-user')
def create_user(token: dict = Body(...), user: dict = Body(...), db: Session = Depends(get_db)):
    uuid = validate_token(token)
    if uuid:
        return crud.post_user(db, uuid, user)
    raise HTTPException(status_code=404, detail="Invalid register")


@router.post('/create-tutoring')
def create_tutoring(token: dict = Body(...), tutoring: dict = Body(...), db: Session = Depends(get_db)):
    uuid = validate_token(token)
    if uuid:
        return crud.post_tutoring(db, uuid, tutoring)
    raise HTTPException(status_code=404, detail="Invalid creation")
