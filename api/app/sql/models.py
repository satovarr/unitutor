from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship
from .database import Base





class User(Base):
    __tablename__ = "user"

    user_id = Column(String(50), primary_key=True, unique=True, nullable=False)
    public_id = Column(String(50), nullable=False, unique=True)
    is_tutor = Column(Boolean, default=False)
    photo_url = Column(String(250), default="Sin imagen")
    telephone = Column(String(10), default="Sin Telefono")
    description = Column(String(200))
    tutorings = relationship("Tutoring", backref="user")


class Category(Base):
    __tablename__ = 'category'
    cat_id = Column(String(50), primary_key=True,
                    unique=True, nullable=False)
    name = Column(String(50), nullable=False)
    sub_categorys = relationship("Subcategory", backref="category_s")
    tutorings = relationship("Tutoring", backref="category_t")


class Subcategory(Base):
    __tablename__ = 'subcategory'

    subcat_id = Column(String(50), primary_key=True,
                       unique=True, nullable=False)
    name = Column(String(50), nullable=False)
    image_url = Column(String(300))
    category_id = Column(String(50), ForeignKey("category.cat_id"))
    tutorias = relationship("Tutoring", backref="subcategory")


class Tutoring(Base):
    __tablename__ = 'tutoring'
    tutoring_id = Column(String(50), primary_key=True,
                         unique=True, nullable=False)
    ut_value = Column(Integer, nullable=False)
    description = Column(String(50), nullable=False)
    name = Column(String(50), nullable=False)
    subcategory_id = Column(String(50), ForeignKey("subcategory.subcat_id"))
    category_id = Column(String(50), ForeignKey("category.cat_id"))
    public_id = Column(String(50), ForeignKey("user.public_id"))
    calification = relationship("Score", backref="tutoring")


class Score(Base):
    __tablename__ = 'Score'
    score_id = Column(String(50), primary_key=True,
                      unique=True, nullable=False)
    score = Column(Float, nullable=False)
    reviews_amount = Column(Integer, nullable=False)
    tutoring_id = Column(String(50), ForeignKey("tutoring.tutoring_id"))
