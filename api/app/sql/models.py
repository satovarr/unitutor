from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship

from .database import Base, engine

class User(Base):
    __tablename__ = "user"

    user_id = Column(String(50), primary_key = True, unique=True, nullable=False)
    public_id = Column(String(50), nullable=False, unique=True)
    is_tutor = Column(Boolean, default=False)
    description = Column(String(200))
    tutorings = relationship("Tutoring", backref="user")

    def __init__(self, user_id, public_id, is_tutor=False, description=None):
        self.user_id = user_id
        self.public_id = public_id
        self.is_tutor = is_tutor
        self.description = description

class Subcategory(Base): 
    __tablename__ = 'subcategory'

    subcat_id = Column(String(50), primary_key = True, unique=True, nullable=False)
    name = Column(String(50), nullable=False)
    image_url = Column(String(300))
    category_id = Column(String(50), ForeignKey("categoria.cat_id"))
    tutorias = relationship("Tutoria", backref="subcategoria")

    def __init__(self, subcat_id, name, image_url, category_id):
        self.subcat_id = subcat_id
        self.name = name
        self.image_url = image_url
        self.category_id = category_id

class Tutoring(Base): 
    __tablename__ = 'tutoring'
    tutoring_id = Column(String(50), primary_key = True, unique=True, nullable=False)
    ut_value = Column(String(50), nullable=False)
    description = Column(String(50), nullable=False)
    name = Column(String(50), nullable=False)
    subcategory_id = Column(String(50), ForeignKey("subcategoria.sub_cat_id"))
    category_id = Column(String(50), ForeignKey("categoria.cat_id"))
    public_id = Column(String(50), ForeignKey("usuario.public_id"))
    calification = relationship("Score", backref="tutoria")


    def __init__(self, tutoring_id, ut_value, description, name, subcategory_id, category_id, public_id):
        self.tutoring_id = tutoring_id
        self.valor_ut = ut_value
        self.descripcion = description
        self.name = name
        self.sub_categoria_id = subcategory_id
        self.categoria_id = category_id
        self.public_id = public_id

class Score(Base): 
    __tablename__ = 'Score'
    score_id = Column(String(50), primary_key = True, unique=True, nullable=False)
    score = Column(Float, nullable=False)
    reviews_amount = Column(Integer, nullable=False)
    tutoring_id = Column(String(50), ForeignKey("tutoring.tutoring_id"))

    def __init__(self, score_id, score, reviews_amount, tutoring_id):
        self.score_id = score_id
        self.score = score
        self.reviews_amount = reviews_amount
        self.tutoring_id = tutoring_id
