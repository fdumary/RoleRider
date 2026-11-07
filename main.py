"""
RoleRider — Root FastAPI Entrypoint
Allows running:
    python -m uvicorn main:app --reload
directly from the project root directory.
"""

from backend.app.main import app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

