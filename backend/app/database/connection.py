import os

from dotenv import load_dotenv

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base




load_dotenv()
database_url = os.getenv('DATABASE_URL')

