from unicodedata import name
from sqlalchemy.orm import Session

from ..sql import models, schemas


def get_user_by_id(db: Session, user_id: str):
    return db.query(models.User).filter(models.User.user_id == user_id).first()
#test passed

def post_user(db: Session, uuid: str, user: dict):
    db_user = models.User(
        user_id=uuid, description=user["description"]
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def post_tutoring(db: Session, uuid: str, tutoring: dict):
    # request category id
    subcategory_id = 1
    # request subcategory id
    category_id = 1
    db_tutoring = models.User(
        ut_value=tutoring["ut_value"], description=tutoring["description"], name=tutoring["name"], subcategory_id=subcategory_id, category_id=category_id)
    db.add(db_tutoring)
    db.commit()
    db.refresh(db_tutoring)
    return db_tutoring


"""

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = models.User(
        email=user.email, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()


def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
    db_item = models.Item(**item.dict(), owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
"""
