"""
RoleRider — FastAPI Backend Service
Provides guest-first authentication, JWT signing and verification,
and career competency pathway services.
"""

import os
import time
import json
import uuid
import hmac
import hashlib
import base64
from typing import Optional, Dict, Any
from fastapi import FastAPI, HTTPException, Depends, Header, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="RoleRider API",
    description="Backend API for RoleRider Technical Competency & Career Development Platform",
    version="1.0.0"
)

# CORS Configuration
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# JWT Secret Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "rolerider-jwt-prototype-signing-secret-key-2026")
JWT_EXPIRATION_SECONDS = 3600  # 60 minutes

def base64url_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode('utf-8').rstrip('=')

def base64url_decode(data_str: str) -> bytes:
    padding = '=' * (4 - (len(data_str) % 4)) if len(data_str) % 4 != 0 else ''
    return base64.urlsafe_b64decode(data_str + padding)

def create_jwt_token(payload: Dict[str, Any]) -> str:
    """Create a signed HS256 JWT using standard libraries."""
    header = {"alg": "HS256", "typ": "JWT"}
    header_bytes = json.dumps(header, separators=(',', ':')).encode('utf-8')
    payload_bytes = json.dumps(payload, separators=(',', ':')).encode('utf-8')

    segments = [base64url_encode(header_bytes), base64url_encode(payload_bytes)]
    signing_input = ".".join(segments).encode('utf-8')

    signature = hmac.new(SECRET_KEY.encode('utf-8'), signing_input, hashlib.sha256).digest()
    segments.append(base64url_encode(signature))
    return ".".join(segments)

def verify_jwt_token(token: str) -> Dict[str, Any]:
    """Verify an HS256 JWT signature and expiration."""
    try:
        parts = token.split('.')
        if len(parts) != 3:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Malformed token: token must have 3 parts"
            )

        header_b64, payload_b64, signature_b64 = parts
        signing_input = f"{header_b64}.{payload_b64}".encode('utf-8')
        expected_sig = hmac.new(SECRET_KEY.encode('utf-8'), signing_input, hashlib.sha256).digest()
        actual_sig = base64url_decode(signature_b64)

        if not hmac.compare_digest(expected_sig, actual_sig):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token signature"
            )

        payload = json.loads(base64url_decode(payload_b64).decode('utf-8'))
        now = int(time.time())

        if "exp" in payload and now > payload["exp"]:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Guest token has expired. Please start a new guest session."
            )

        return payload
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Token validation failed: {str(e)}"
        )

# Data Models
class GuestUser(BaseModel):
    id: str
    role: str = "guest"
    is_guest: bool = True

class GuestAuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int = 3600
    user: GuestUser

# Dependency for protected endpoints
async def get_current_guest(authorization: Optional[str] = Header(None)) -> Dict[str, Any]:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid Authorization header"
        )
    token = authorization.split(" ")[1]
    payload = verify_jwt_token(token)
    return payload

# Endpoints
@app.get("/api/health")
async def health_check():
    return {"status": "ok", "service": "RoleRider FastAPI Backend", "version": "1.0.0"}

@app.post("/api/auth/guest", response_model=GuestAuthResponse)
async def create_guest_session():
    """
    Generate a unique guest UUID and signed JWT with 60-minute expiration.
    No credentials required.
    """
    guest_uuid = str(uuid.uuid4())
    now = int(time.time())
    expires_at = now + JWT_EXPIRATION_SECONDS

    payload = {
        "sub": guest_uuid,
        "role": "guest",
        "iat": now,
        "exp": expires_at,
        "jti": str(uuid.uuid4()),
    }

    access_token = create_jwt_token(payload)

    return GuestAuthResponse(
        access_token=access_token,
        token_type="bearer",
        expires_in=JWT_EXPIRATION_SECONDS,
        user=GuestUser(
            id=guest_uuid,
            role="guest",
            is_guest=True
        )
    )

@app.get("/api/auth/me")
async def get_current_session(guest_session: Dict[str, Any] = Depends(get_current_guest)):
    """Protected endpoint to inspect active guest identity."""
    return {
        "authenticated": True,
        "guest_id": guest_session.get("sub"),
        "role": guest_session.get("role"),
        "expires_in": max(0, guest_session.get("exp", 0) - int(time.time())),
    }

