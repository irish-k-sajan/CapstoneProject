from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
URL_DATABASE = 'mysql+pymysql://avnadmin:AVNS_GoxaBDlMtHOtshgwqWF@mysql-3716567a-tigeranalytics-6e43.e.aivencloud.com:28244/defaultdb?ssl-mode=REQUIRED/defaultdb'
engine = create_engine(URL_DATABASE)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
