from fastapi import APIRouter, Body, Request, Depends, HTTPException,status
from http import HTTPStatus
from sqlalchemy.orm import Session
from .validateToken import validate_token
from ..sql.database import get_db
from ..sql import crud
from ..sql import schemas

router = APIRouter()


@router.get('/signin-user')
def signin_user(token: dict = Body(...), db: Session = Depends(get_db)):
    uuid = validate_token(token)
    if uuid:
        return uuid
    raise HTTPException(status_code=404, detail="Invalid login")


@router.post('/profile-user')
def profile_user(token: dict = Body(...), db: Session = Depends(get_db)):
    print(token)
    uuid = validate_token(token)
    if uuid:
        return crud.get_user_by_id(db, uuid)
    raise HTTPException(status_code=404, detail="Invalid user token")


@router.post('/create-user')
def create_user(token: dict = Body(...), user: schemas.User = Body(...), db: Session = Depends(get_db)):
    uuid = validate_token(token)
    if uuid:
        return crud.post_user(db, uuid, user)
    raise HTTPException(status_code=404, detail="Invalid register")


@router.post(
    path='/create-categories',
    status_code=status.HTTP_201_CREATED,
    tags=['Create',],
    summary= "Create category in the app"
    )
def create_category(category: schemas.Category = Body(...), db: Session = Depends(get_db)):
    """
    # Create category
    
    This path operation create a category in the app and save the information in the database
    
    Parameters:
    - Request Body parameter:
        - **category: Category** -> A category model with the name
    
    Return a status 201 
    """
    category_r = crud.post_category(db, category)
    return category_r

@router.post(
    path='/create-subcategories',
    status_code=status.HTTP_201_CREATED,
    tags=['Create',],
    summary= "Create subcategory in the app"
    )
def create_subcategory(subcategory: schemas.SubCategory = Body(...), db: Session = Depends(get_db)):
    """
    # Create subcategory
    
    This path operation create a subcategory in the app and save the information in the database
    
    Parameters:
    - Request Body parameter:
        - **category: Category** -> A category model with the name, category_id and image_url
    
    Return a status 201 
    """
    crud.post_subcategory(db, subcategory)
    return subcategory


@router.post(
    path='/create-tutorship',
    status_code=status.HTTP_201_CREATED,
    tags=['Create',],
    summary= "Create a tutorship in the app"
    )
def create_tutorship(tutorship: schemas.Tutorship = Body(...), db: Session = Depends(get_db)):
    """
    # Create tutorship
    
    This path operation create a tutorship in the app and save the information in the database
    
    Parameters:
    - Request Body parameter:
        - **tutorship: Tutorship** -> A tutorshio model with the name, description, value, category_id, subcategory_id and public_id
    
    Return a status 201 
    """
    crud.post_tutorship(db, tutorship)
    return tutorship