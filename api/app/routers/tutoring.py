import imp
from fastapi import APIRouter, Body, Request, Depends, HTTPException,status
from http import HTTPStatus
from sqlalchemy.orm import Session
from ..sql import crud
from .validateToken import validate_token
from ..sql.database import get_db
from typing import Optional

router = APIRouter()


@router.get('/categories/nose')
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

@router.get(
    path='/categories',
    tags=['View',],
    status_code=status.HTTP_200_OK,
    summary= "View all categories in the app"
    )
def view_category(db: Session = Depends(get_db)):
    """
    # View categories
    
    This path operation fetches all the categories from the database and returns a json with them.
    
    Return a status 200 and Json with de categories
    """
    result = crud.get_categories(db)
    return result 

@router.get(
    path='/categories/{category_id}',
    tags=['View',],
    status_code=status.HTTP_200_OK,
    summary= "View all subcategories of a category in the app"
    )
def view_subcategory(category_id: str, db: Session = Depends(get_db)):
    """
    # View subcategories of a category

    This path operation gets the category_id by path parameter and fetches all subcategories of the category returning them in a Json.

    Parameters:
    - Request path parameter:
        - **category_id** -> category_id primary key of a category
    
    Return a status 200 and Json with de subcategories
    """
    result = crud.get_subcategories(db, category_id)
    return result

@router.get(
    path='/categories/subcategories/{subcategory_id}',
    tags=['View',],
    status_code=status.HTTP_200_OK,
    summary= "View all tutorships of a subcategory in the app"
    )
def view_tutorships_subcategory(subcategory_id: str ,db: Session = Depends(get_db)):
    """
    # View categories
    
    This path operation fetches all the categories from the database and returns a json with them.
    
    Return a status 200 and Json with de categories
    """
    result = crud.get_tutorships_subcategories(db,subcategory_id)
    return result 

@router.get(
    path='/tutorships/search',
    tags=['View',],
    status_code=status.HTTP_200_OK,
    summary= "View all tutorships of a subcategory in the app"
    )
def view_tutorships_search(
    category_id: str = "",
    subcategory_id: str = "",
    ut_value_min: int = -1,
    ut_value_max: int = -1,
    db: Session = Depends(get_db)
    ):
    """
    # View tutorship search WE NEED TO COMPLETE THIS DESCRIPTION
    
    This path operation fetches all the categories from the database and returns a json with them.
    
    Return a status 200 and Json with de categories
    """
    result = crud.get_tutorships_search(db, category_id, subcategory_id, ut_value_min, ut_value_max)
    return result 

@router.get(
    path='/tutorships/view/{tutoring_id}',
    tags=['View',],
    status_code=status.HTTP_200_OK,
    summary= "View info of a tutorship in the app"
    )
def view_tutorship(
    tutoring_id: str,
    db: Session = Depends(get_db)
    ):
    """
    # View tutorship -- WE NEED TO COMPLETE THIS DESCRIPTION
    
    This path operation fetches all the categories from the database and returns a json with them.
    
    Return a status 200 and Json with de categories
    """
    result = crud.get_tutorships_info(db, tutoring_id)
    return result 