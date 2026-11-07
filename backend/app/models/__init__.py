from backend.app.database.connection import Base, engine
from backend.app.models.certificate import  Certificate

Base.metadata.create_all(bind=engine)