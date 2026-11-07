from app.database.connection import Base, engine
from app.models.JobRoleSkill import  JobRoleSkill

Base.metadata.create_all(bind=engine)