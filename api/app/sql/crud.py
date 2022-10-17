
from unicodedata import name
from sqlalchemy.orm import Session, join
import uuid



from ..sql import models, schemas

def generate_uuid():
  return uuid.uuid4().hex



def get_user_by_id(db: Session, user_id: str):
    return db.query(models.User).filter(models.User.user_id == user_id).first()
#test passed

def post_user(db: Session, uuid: str, user: dict):
    db_user = models.User(
        public_id= generate_uuid(),
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

def post_category(db: Session, category: schemas.Category):
    db_category = models.Category(
        cat_id= generate_uuid(),
        name=category.name
    )
    db.add(db_category)
    db.commit()
    return category

def post_subcategory(db: Session, subcategory: schemas.SubCategory):
    db_subcategory = models.Subcategory(
        subcat_id= generate_uuid(),
        name=subcategory.name,
        category_id=subcategory.category_id,
        image_url=subcategory.image_url
    )
    db.add(db_subcategory)
    db.commit()

def post_tutorship(db: Session, tutorship: schemas.Tutorship):
    db_tutorship = models.Tutoring(
        tutoring_id= generate_uuid(),
        category_id=tutorship.category_id,
        subcategory_id=tutorship.subcategory_id,
        public_id=tutorship.public_id,
        name=tutorship.name,
        description=tutorship.description,
        ut_value=tutorship.ut_value
    )
    db.add(db_tutorship)
    db.commit()

def get_categories(db: Session):
    return db.query(models.Category).all()

def get_subcategories(db: Session, categorys_id):
    return db.query(models.Subcategory).filter_by(category_id=categorys_id).all()

def get_tutorships_subcategories(db: Session, subcategory_id):
    return db.query(models.Tutoring).filter_by(subcategory_id=subcategory_id).all()

def get_tutorships_info(db: Session, tutoring_id):
    return db.query(models.Tutoring).filter_by(tutoring_id=tutoring_id).first()



def get_tutorships_search(db: Session, category_id, subcategory_id, ut_value_min, ut_value_max):
    result = {"Estado": "En Proceso aun no esta"}
    # tutoring = models.Tutoring
    # if category_id == "":
    #     if subcategory_id != "" and ut_value_min != -1 and ut_value_max != -1:
    #         result = db.query(tutoring).filter(tutoring.ut_value <= ut_value_max, tutoring.ut_value >= ut_value_min, tutoring.subcategory_id==subcategory_id).all()
    #     elif subcategory_id == "":
    #         result = db.query(models.Tutoring).filter_by(ut_value=ut_value).all()
    #     elif ut_value_min == -1:
    #         result = db.query(models.Tutoring).filter_by(subcategory_id=subcategory_id).all()
    #result = db.query(models.Tutoring).filter_by(subcategory_id=subcategory_id, category_id=category_id).all()
    #result = db.query(models.Tutoring).filter(models.Tutoring.ut_value <= ut_value_max, models.Tutoring.ut_value >= ut_value_min, models.Tutoring.category_id == category_id).all()

    return result

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
