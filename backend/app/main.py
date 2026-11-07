from fastapi import FastAPI
from backend.app.routers import auth

app = FastAPI()

app.include_router(auth.router)
@app.get("/")
def home():
    return {"Hello": "World"}