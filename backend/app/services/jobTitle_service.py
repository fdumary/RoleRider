from fastapi import  HTTPException
from app.models.JobRoleSkill import JobRoleSkill
from sqlalchemy.orm import Session


def get_jobTitle_services(job_title: str, db: Session):
    if job_title is None or not job_title.strip():
        raise HTTPException(status_code=400, detail='Job Title cannot be empty')
    job_services = db.query(JobRoleSkill).filter(JobRoleSkill.JobTitle == job_title).first()
    if job_services is None:
        raise HTTPException(status_code=404, detail="Job title not found")
    return job_services
