from fastapi import APIRouter
from backend.app.services.auth_service import create_guest_token

router = APIRouter(prefix="/api/auth", tags=["Auth"])


@router.post("/guest")
def guest_login():
    token = create_guest_token()
    return {
        "access_token": token,
        "token_type": "bearer"
    }
