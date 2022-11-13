
from pydantic import BaseModel


class ItemBase(BaseModel):
    title: str
    description: str | None = None


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


class User(BaseModel):
    user_id: str
    public_id: str
    user_name: str
    is_tutor: bool
    photo_url: str
    telephone: str
    description: str



class Category(BaseModel):
    name: str

    class Config:
        schema_extra = {
            "example": {
                "name": "Calculo"
            }
        }


class SubCategory(BaseModel):
    category_id: str
    name: str
    code_class: str
    image_url: str
    
    class Config:
        schema_extra = {
            "example": {
                "category_id": "beb98d3c1d9e4199835bc6a14832b041",
                "name": "Calculo Diferencial",
                "code_class": "1000004-B",
                "image_url": "www.test.com"
            }
        }


class Tutorship(BaseModel):
    category_id: str
    subcategory_id: str
    public_id: str
    name: str
    description: str
    ut_value: int

    class Config:
        schema_extra = {
            "example": {
                "category_id": "beb98d3c1d9e4199835bc6a14832b041",
                "subcategory_id": "9e3e03f692a84748a86e7b43102fc10b",
                "public_id": "2",
                "name": "Derivadas parciales",
                "ut_value": 45000,
                "description": "La mejor tutoria!"
            }
        }


class certificate(BaseModel):
    code_class: str