from langgraph.graph import StateGraph, END
from typing import TypedDict
from langchain_groq import ChatGroq
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from dotenv import load_dotenv
from app.db.database import build_structured_context

load_dotenv()

EMBED_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
CHROMA_DIR = "chroma_db"
COLLECTION_NAME = "portfolio"


class State(TypedDict):
    question: str
    context: str
    answer: str
    question_type: str


llm = ChatGroq(model="llama-3.1-8b-instant", temperature=0)

embeddings = HuggingFaceEmbeddings(model_name=EMBED_MODEL)
vectorstore = Chroma(
    persist_directory=CHROMA_DIR,
    embedding_function=embeddings,
    collection_name=COLLECTION_NAME,
)


def clasificador(state: State) -> State:
    question = state["question"]

    response = llm.invoke(f"""
    Clasifica esta pregunta sobre el portfolio de Álvaro Rodrigo en una de estas categorías:
    - "perfil": si pregunta sobre experiencia, proyectos, habilidades, certificaciones, tecnologías, trabajo o cualquier cosa profesional
    - "saludo": SOLO si es un saludo literal como "hola", "buenos días", "qué tal", "hey"
    - "desconocido": si no encaja en ninguna de las anteriores

    Ejemplos:
    - "hola" → saludo
    - "qué tal" → saludo
    - "qué proyectos tiene?" → perfil
    - "domina LangChain?" → perfil
    - "dónde ha trabajado?" → perfil
    - "cuál es la capital de Francia?" → desconocido

    Pregunta: {question}

    Responde SOLO con una palabra: perfil, saludo o desconocido
    """)

    state["question_type"] = response.content.strip().lower()
    return state


def buscador(state: State) -> State:
    question = state["question"]
    docs = vectorstore.similarity_search(question, k=16)
    rag_context = "\n\n---\n\n".join([
        f"[Sección: {doc.metadata.get('source', 'portfolio')}]\n{doc.page_content}"
        for doc in docs
    ])
    state["context"] = build_structured_context() + "\n\n=== CONTEXTO DETALLADO (RAG) ===\n\n" + rag_context
    return state


def generador(state: State) -> State:
    question = state["question"]
    context = state["context"]

    response = llm.invoke(f"""
    Eres el asistente personal de Álvaro Rodrigo Cantalejo, un Low-Code Developer especializado en IA y automatización.
    Responde preguntas sobre su experiencia, proyectos, habilidades y trayectoria profesional.

    REGLAS:
    - Basa tu respuesta ÚNICAMENTE en el contexto proporcionado.
    - Si preguntan por proyectos, enumera TODOS los que aparezcan en el contexto sin omitir ninguno. Nunca uses frases como "algunos de ellos son".
    - Si no hay información suficiente sobre algo, dilo claramente.
    - Responde siempre en español.
    - Usa formato markdown cuando ayude a la claridad: listas con guiones, **negrita** para nombres de proyectos o tecnologías.

    Contexto:
    {context}

    Pregunta: {question}
    """)

    state["answer"] = response.content
    return state


def saludo(state: State) -> State:
    state["answer"] = (
        "¡Hola! Soy el asistente de Álvaro Rodrigo. "
        "Puedo responder preguntas sobre su experiencia profesional, proyectos de IA, "
        "habilidades técnicas y certificaciones. ¿En qué puedo ayudarte?"
    )
    return state


def desconocido(state: State) -> State:
    state["answer"] = (
        "Esa pregunta está fuera de mi ámbito. Estoy especializado en el perfil profesional "
        "de Álvaro Rodrigo: proyectos, habilidades, experiencia laboral y certificaciones. "
        "¿Puedo ayudarte con alguno de esos temas?"
    )
    return state


def enrutador(state: State) -> str:
    return state["question_type"]


grafo = StateGraph(State)

grafo.add_node("clasificador", clasificador)
grafo.add_node("buscador", buscador)
grafo.add_node("generador", generador)
grafo.add_node("saludo", saludo)
grafo.add_node("desconocido", desconocido)

grafo.set_entry_point("clasificador")

grafo.add_conditional_edges(
    "clasificador",
    enrutador,
    {
        "perfil": "buscador",
        "saludo": "saludo",
        "desconocido": "desconocido",
    },
)

grafo.add_edge("buscador", "generador")
grafo.add_edge("generador", END)
grafo.add_edge("saludo", END)
grafo.add_edge("desconocido", END)

app_graph = grafo.compile()
