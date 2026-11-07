from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, Form
from backend.app.services.resume_service import extract_text_from_pdf
from backend.app.services.auth_service import get_current_user
from backend.app.database.connection import get_db
from backend.app.models.resume import Resume
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from backend.app.services.jobTitle_services import get_jobTitle_services

router = APIRouter(
    prefix="/api/resumes",
    tags=["Resumes"]
)


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...),
    guest_id: str = Depends(get_current_user),
    db: Session = Depends(get_db)):
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are accepted"
        )

    file_bytes = await file.read()

    extracted_text = extract_text_from_pdf(file_bytes)

    if not extracted_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Could not extract text from PDF"
        )

    new_resume = Resume(owner_id=guest_id, filename=file.filename,extracted_text=extracted_text)
    try:
        db.add(new_resume)
        db.commit()
        db.refresh(new_resume)
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to save resume. PLease try again.")

    job_services = get_jobTitle_services(job_description, db)







    return {
        "response": new_resume.extracted_text,
        "id": new_resume.id,
        "filename": new_resume.filename,
        "get_jobTitle_services": job_services
    }