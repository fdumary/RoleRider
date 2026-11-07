import os

from dotenv import load_dotenv
from openai import OpenAI
from pathlib import Path
from backend.app.prompts.openai_prompt import ROADMAP_SYSTEM_PROMPT


env_path = Path(__file__).resolve().parents[3] / ".env"
load_dotenv(env_path)
print(env_path)


def openai_service(resume_text: str, job_title: str, skills: str, job_description: str):
    api_key = os.getenv("OPENAI_API_KEY")

    if not api_key:
        raise ValueError("OPENAI_API_KEY is missing")
    client = OpenAI(api_key=api_key)

    response = client.responses.create(
        model="gpt-6-luna",
        instructions=ROADMAP_SYSTEM_PROMPT,
        input=resume_text + job_title + skills + job_description

    )

    return response.output_text
