from datetime import datetime, timedelta, timezone
import jwt
from backend.app.core.config import JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRE_MINUTES
from uuid import uuid4
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer


bearer = HTTPBearer()

def create_guest_token():

    guest_id = uuid4()
    now = datetime.now(timezone.utc)
    payload = {
        "sub": str(guest_id),
        "role": "guest",
        "iat": now,
        "exp": now + timedelta(minutes=JWT_EXPIRE_MINUTES),
    }

    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token

def verify_guest_token(token: str):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    guest_id = payload.get("sub")
    if not guest_id or payload.get("role") != "guest":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid guest token"
        )
    return guest_id

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(bearer)):
    token = credentials.credentials
    guest_id = verify_guest_token(token)
    return guest_id