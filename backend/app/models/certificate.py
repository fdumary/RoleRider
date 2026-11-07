from backend.app.database.connection import Base
from sqlalchemy import Column, Integer, String


class Certificate(Base):
    __tablename__ = 'certificates'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    link = Column(String)
    price = Column(String)