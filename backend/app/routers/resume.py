from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from backend.app.services.resume_service import extract_text_from_pdf
from backend.app.services.auth_service import get_current_user

router = APIRouter(
    prefix="/api/resumes",
    tags=["Resumes"]
)


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    guest_id: str = Depends(get_current_user)
):
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

    return {
        "filename": file.filename,
        "guest_id": guest_id,
        "extracted_text": extracted_text
    }