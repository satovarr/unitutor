from decouple import config
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database configuration
DB_USER = config("DB_USER")
DB_PASS = config("DB_PASS")
DB_URL = config("DB_URL")
DB_PORT = config("DB_PORT")
DB_SCHEMA = config("DB_SCHEMA")

SQLALCHEMY_DATABASE_URL = f"mariadb+mariadbconnector://{DB_USER}:{DB_PASS}@{DB_PORT}/{DB_SCHEMA}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


