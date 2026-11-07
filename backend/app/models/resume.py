from backend.app.database.connection import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import UUID

class Resume(Base):
    __tablename__ = 'resume'
    id = Column(Integer, primary_key=True)
    owner_id = Column(UUID(as_uuid=True), nullable=False)
    filename = Column(String)
    extracted_text = Column(String)
