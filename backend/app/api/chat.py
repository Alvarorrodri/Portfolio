from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, field_validator
from app.rag.pipeline import app_graph

router = APIRouter()

MESSAGE_LIMIT = 20
MAX_SESSIONS = 5_000
LIMIT_MESSAGE = (
    "Has alcanzado el límite de preguntas por esta sesión. "
    "Puedes contactarme directamente en LinkedIn o GitHub para seguir hablando."
)

session_counts: dict[str, int] = {}


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=500)
    session_id: str = Field(min_length=8, max_length=64)

    @field_validator("session_id")
    @classmethod
    def validate_session_id(cls, v: str) -> str:
        allowed = set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_")
        if not all(c in allowed for c in v):
            raise ValueError("session_id contiene caracteres no permitidos")
        return v


class ChatResponse(BaseModel):
    response: str
    messages_left: int
    limit_reached: bool


@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    sid = req.session_id
    count = session_counts.get(sid, 0)

    if count >= MESSAGE_LIMIT:
        return ChatResponse(
            response=LIMIT_MESSAGE,
            messages_left=0,
            limit_reached=True,
        )

    if len(session_counts) >= MAX_SESSIONS:
        oldest = next(iter(session_counts))
        del session_counts[oldest]

    result = app_graph.invoke({"question": req.message})
    answer = result.get("answer", "Lo siento, no pude generar una respuesta.")

    session_counts[sid] = count + 1
    remaining = MESSAGE_LIMIT - session_counts[sid]

    return ChatResponse(
        response=answer,
        messages_left=remaining,
        limit_reached=remaining <= 0,
    )
