from sqlalchemy import create_engine, MetaData
from decouple import config

#request .env file and locate it on /unitutor/
engine = create_engine(f"mysql+pymysql://{config('DB_USER')}:{config('DB_PASSWORD')}@{config('DB_LOCATION')}:{config('DB_PORT')}/{config('DB_SCHEMA')}")

meta = MetaData()

conn = engine.connect()
