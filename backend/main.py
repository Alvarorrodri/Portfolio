import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.chat import router as chat_router

ENV = os.getenv("ENV", "development")

app = FastAPI(
    title="Portfolio Chatbot API",
    version="1.0.0",
    docs_url=None if ENV == "production" else "/docs",
    redoc_url=None if ENV == "production" else "/redoc",
)

_default_origins = "http://localhost:5173,http://localhost:4173,http://localhost"
origins = os.getenv("CORS_ORIGINS", _default_origins).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)

app.include_router(chat_router)


@app.get("/health")
def health():
    return {"status": "ok"}
