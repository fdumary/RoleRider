from fastapi import FastAPI
from backend.app.routers import auth
from backend.app.routers import resume

app = FastAPI()

app.include_router(auth.router)
app.include_router(resume.router)



