from backend.app.database.connection import Base, engine
from backend.app.models.JobRoleSkill import  JobRoleSkill

Base.metadata.create_all(bind=engine)