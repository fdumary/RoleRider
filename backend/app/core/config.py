import os
from dotenv import load_dotenv
from pathlib import Path


env_path = Path(__file__).resolve().parents[3] / ".env"
load_dotenv(env_path)

JWT_SECRET = os.getenv("JWT_SECRET_KEY")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")
JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES"))

if not JWT_SECRET:
    raise ValueError("JWT_SECRET_KEY is not set")
