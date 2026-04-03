from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import httpx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactForm(BaseModel):
    name: str
    email: str
    message: str
    company: str = ""
    phone: str = ""
    vertical: str = ""

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.post("/api/contact")
async def contact(form: ContactForm):
    api_key = os.environ.get("RESEND_API_KEY")
    async with httpx.AsyncClient() as client:
        await client.post(
            "https://api.resend.com/emails",
            headers={"Authorization": f"Bearer {api_key}"},
            json={
                "from": "onboarding@resend.dev",
                "to": "kushalbellani18@gmail.com",
                "subject": f"New Consult Request from {form.name}",
                "html": f"<p><b>Name:</b> {form.name}</p><p><b>Email:</b> {form.email}</p><p><b>Company:</b> {form.company}</p><p><b>Vertical:</b> {form.vertical}</p><p><b>Message:</b> {form.message}</p>"
            }
        )
    return {"success": True}