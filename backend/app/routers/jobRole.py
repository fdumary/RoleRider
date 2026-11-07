"""from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from backend.app.services.resume_service import extract_text_from_pdf
from backend.app.services.auth_service import get_current_user
from backend.app.database.connection import get_db
from backend.app.models.JobRoleSkill import JobRoleSkill
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

router = APIRouter(
    prefix="/jobRole",
    tags=["Job Role"],
)


@router.post("/", )
def job_role(job_title: str, db: Session = Depends(get_db)):
    job_description = db.query(JobRoleSkill).filter(JobTitle=job_title).first()
    if not job_description:
        raise HTTPException()
    return"""