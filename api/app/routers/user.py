from fastapi import APIRouter, Body, Request, Depends, HTTPException,status, File, UploadFile
from http import HTTPStatus
from sqlalchemy.orm import Session
from .validateToken import validate_token
from ..sql.database import get_db
from ..sql import crud
from ..sql import schemas
import PyPDF2
import codecs

router = APIRouter()


@router.post('/signin-user')
def signin_user(token: dict = Body(...), db: Session = Depends(get_db)):
    uuid = validate_token(token)
    if uuid:
        return uuid
    raise HTTPException(status_code=404, detail="Invalid login")


@router.post('/profile-user')
def profile_user(token: dict = Body(...), db: Session = Depends(get_db)):
    uuid = validate_token(token)
    if uuid:
        return crud.get_user_by_id(db, uuid)
    raise HTTPException(status_code=404, detail="Invalid user token")

@router.post('/public-user')
def public_user(token: dict = Body(...), db: Session = Depends(get_db)):
    uuid = validate_token(token["accessToken"])
    if uuid:
        return crud.get_user_public_id(db, uuid) 


@router.post('/create-user')
def create_user(token: dict = Body(...), user: schemas.User = Body(...), db: Session = Depends(get_db)):
    uuid = validate_token(token['accessToken'])
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
    status_code=status.HTTP_200_OK,
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


@router.post(
    path='/verify_certificate',
    status_code=status.HTTP_200_OK,
    tags=['Validate',],
    summary= "Validate if a tutor approved the subject to be tutored"
    )
async def verify_certificate(file: UploadFile, code_class: str):
    """
    # Verify certificade
    
    This path operation Validate if a tutor approved the subject to be tutored 
    
    Parameters:
    - Request Body parameter:
        - **file: UploadFile** -> The certificate of notes in pdf
    - Path parameter:
        - **code_class: str** -> code-class of the subcategory that will create the tutorial
    
    Return a status 200
    """
    #guardamos el archivo 
    with open("certificate.pdf","wb") as myfile:
        content = await file.read()
        myfile.write(content)
        #print("Cantidad de paginas:", pdfreader.numPages)
        myfile.close()

    valor = "no encontrado"
    with open("certificate.pdf","rb") as myfile:
        pdfreader = PyPDF2.PdfFileReader(myfile)
        content = ""
        #Guardamos el contenido del archivo
        for x in range(0, pdfreader.numPages):
            page = pdfreader.getPage(x)
            content = content + "\n"+ page.extract_text()
        content = content.split("\n")
        #Buscamos la información
        for x in range(len(content)):
            if content[x].find(code_class) == 0:
                valor = content[x]
        valor = valor.split(" ")
        valor = valor[-1]
        valor = valor[0:3]
        valor = float(valor)
        myfile.close()

    #Borramos la información del certificado
    with open("certificate.pdf","wb") as myfile:
        myfile.close()

    if valor >= 3:
        return {"result": "Meet requirements"}
    else:
        return {"result": "Does not meet the requirements or the file is not valid"}
         


@router.post(
    path='/create-score',
    status_code=status.HTTP_200_OK,
    tags=['Create',],
    summary= "Create a score in the app"
    )
def create_score(score: schemas.Score = Body(...), db: Session = Depends(get_db)):
    """
    # Create tutorship
    
    This path operation create a tutorship in the app and save the information in the database
    
    Parameters:
    - Request Body parameter:
        - **tutorship: Tutorship** -> A tutorshio model with the name, description, value, category_id, subcategory_id and public_id
    
    Return a status 201 
    """
    crud.post_score(db, score)
    return score