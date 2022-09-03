from sqlalchemy import create_engine, MetaData

engine = create_engine("mysql+pymysql://root:21232321@localhost:3306/unitutor")

meta = MetaData()

conn = engine.connect()
