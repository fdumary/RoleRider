from backend.app.database.connection import Base
from sqlalchemy import Column, Integer, String


class JobRoleSkill(Base):
    __tablename__ = 'JobRoleSkill'
    id = Column(Integer, primary_key=True)
    JobTitle = Column(String)
    skills = Column(String)
    job_description = Column(String)