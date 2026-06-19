from fastapi import APIRouter
from pydantic import BaseModel
from app.rag.pipeline import app_graph

router = APIRouter()

MESSAGE_LIMIT = 20
LIMIT_MESSAGE = (
    "Has alcanzado el límite de preguntas por esta sesión. "
    "Puedes contactarme directamente en LinkedIn o GitHub para seguir hablando."
)

session_counts: dict[str, int] = {}


class ChatRequest(BaseModel):
    message: str
    session_id: str


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

    result = app_graph.invoke({"question": req.message})
    answer = result.get("answer", "Lo siento, no pude generar una respuesta.")

    session_counts[sid] = count + 1
    remaining = MESSAGE_LIMIT - session_counts[sid]

    return ChatResponse(
        response=answer,
        messages_left=remaining,
        limit_reached=remaining <= 0,
    )
