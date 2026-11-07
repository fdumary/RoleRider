from backend.app.database.connection import get_db
from sqlalchemy.orm import Session
from backend.app.models.certificate import Certificate
from fastapi import APIRouter, Depends, HTTPException


router = APIRouter( prefix="/certificate",
                    tags=["certificate"])

@router.get("/")
async def certificate(db: Session = Depends(get_db)):

    try:
        certificates = db.query(Certificate).all()
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    return certificates





