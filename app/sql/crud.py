
from unicodedata import name
from sqlalchemy.orm import Session, join
import uuid


from ..sql import models, schemas


def generate_uuid():
    return uuid.uuid4().hex


def get_user_by_id(db: Session, user_id: str):
    return db.query(models.User).filter(models.User.user_id == user_id).first()
# test passed

def get_user_public_id(db: Session, user_id: str):
    result = db.query(models.User).filter(
        models.User.user_id == user_id).first()
    return result.__dict__["public_id"]

def post_user(db: Session, uuid: str, user: schemas.User):
    db_user = models.User(
        user_id=uuid,
        public_id=generate_uuid(),
        user_name=user.user_name,
        payme_url=user.payme_url,
        is_tutor=user.is_tutor,
        photo_url=user.photo_url,
        telephone=user.telephone,
        description=user.description,
    )
    db.add(db_user)
    db.commit()
    return user


def post_category(db: Session, category: schemas.Category):
    db_category = models.Category(
        cat_id=generate_uuid(),
        name=category.name
    )
    db.add(db_category)
    db.commit()
    return category


def post_subcategory(db: Session, subcategory: schemas.SubCategory):
    db_subcategory = models.Subcategory(
        subcat_id=generate_uuid(),
        name=subcategory.name,
        code_class=subcategory.code_class,
        category_id=subcategory.category_id,
        image_url=subcategory.image_url
    )
    db.add(db_subcategory)
    db.commit()


def post_tutorship(db: Session, tutorship: schemas.Tutorship):
    db_tutorship = models.Tutoring(
        tutoring_id=generate_uuid(),
        category_id=tutorship.category_id,
        subcategory_id=tutorship.subcategory_id,
        public_id=tutorship.public_id,
        name=tutorship.name,
        description=tutorship.description,
        ut_value=tutorship.ut_value
    )
    db.add(db_tutorship)
    db.commit()

def post_score(db: Session, score: schemas.Score):
    db_score = models.Score(
        score_id=generate_uuid(),
        tutoring_id=score.tutoring_id,
        score=score.score
    )
    db.add(db_score)
    db.commit()



def get_categories(db: Session):
    return db.query(models.Category).all()


def get_subcategories(db: Session, categorys_id):
    return db.query(models.Subcategory).filter_by(category_id=categorys_id).all()


def get_tutorships_subcategories(db: Session, subcategory_id):
    return db.query(models.Tutoring).filter_by(subcategory_id=subcategory_id).all()


def get_tutorships_info(db: Session, tutoring_id):
    return db.query(models.Tutoring).filter_by(tutoring_id=tutoring_id).first()


def get_tutorships_user(db: Session, public_id):
    return db.query(models.Tutoring).filter_by(public_id=public_id).all()


def get_category_name(db: Session, cat_id):
    return db.query(models.Category.name).filter_by(cat_id=cat_id).first()


def get_user_info_public_id(db: Session, public_id):
    return db.query(models.User).filter_by(public_id=public_id).first()


def get_subcategory_name(db: Session, subcat_id):
    return db.query(models.Subcategory.name).filter_by(subcat_id=subcat_id).first()


def get_subcategory_code_class(db: Session, subcat_id):
    return db.query(models.Subcategory.code_class).filter_by(subcat_id=subcat_id).first()

def get_scores(db: Session, tutoring_id):
    return db.query(models.Score).filter_by(tutoring_id=tutoring_id).all()

def get_tutorships_search(db: Session, category_id, subcategory_id, ut_value_min, ut_value_max, name_tutoring):
    result = db.query(models.Tutoring)
    if category_id != "":
        result = result.filter_by(category_id=category_id)
    if subcategory_id != "":
        result = result.filter_by(subcategory_id=subcategory_id)
    if name_tutoring != "":
        result = result.filter(
            models.Tutoring.name.ilike(f'%{name_tutoring}%'))
    result = result.filter(models.Tutoring.ut_value <= ut_value_max,
                           models.Tutoring.ut_value >= ut_value_min).all()

    #     if subcategory_id != ""
    #         result = db.query(tutoring).filter(tutoring.ut_value <= ut_value_max, tutoring.ut_value >= ut_value_min, tutoring.subcategory_id==subcategory_id).all()

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
