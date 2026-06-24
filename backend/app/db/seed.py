import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent.parent.parent / "data" / "portfolio.db"

PROJECTS = [
    (
        "ChatBot RAG",
        "LangChain, LangGraph, ChromaDB, HuggingFace, Groq, Python",
        "Chatbot conversacional con pipeline RAG completo. v1: flujo lineal. v2: LangGraph con agente clasificador que decide si buscar en la base de conocimiento, responder a saludos o rechazar preguntas fuera de ámbito.",
        "https://github.com/Alvarorrodri/ChatBot-RAG",
    ),
    (
        "Email Autoresponder con IA",
        "n8n, Gmail API, Groq, Llama 3.3 70B",
        "Automatización que detecta emails entrantes en Gmail, lee los PDFs adjuntos y genera borradores de respuesta automáticamente usando IA.",
        "https://github.com/Alvarorrodri/email-autoresponder-n8n",
    ),
    (
        "Analizador de CVs por Telegram",
        "n8n, Telegram Bot API, Groq, Llama 3.3 70B",
        "Bot de Telegram que recibe CVs en PDF y da feedback profesional detallado: puntos fuertes, áreas de mejora y una valoración del 1 al 10.",
        "https://github.com/Alvarorrodri/cv-analyzer-bot",
    ),
    (
        "Bot de Noticias Tech",
        "n8n, RSS (Xataka), Groq, Llama 3.3, Telegram",
        "Automatización que cada mañana obtiene las últimas noticias de tecnología vía RSS, las resume con IA en 3-4 líneas y las envía por Telegram.",
        "https://github.com/Alvarorrodri/news-bot-telegram-n8n",
    ),
    (
        "Bot de Reservas para Restaurante",
        "n8n, Telegram, AI Agent, Groq",
        "Agente conversacional que gestiona reservas de mesa de forma natural a través de Telegram.",
        "https://github.com/Alvarorrodri/restaurante-bot-n8n",
    ),
    (
        "TerraLog",
        "Flutter, Dart, Supabase",
        "Aplicación móvil para el registro y seguimiento de procesos de compostaje. Documenta cada lote con fotos, mediciones ambientales y observaciones, con sincronización en la nube vía Supabase.",
        "https://github.com/Alvarorrodri/TerraLog",
    ),
]

CERTIFICATIONS = [
    ("LangChain en Python", "OpenWebinars", "Jun 2026"),
    ("Bases de Datos Vectoriales", "OpenWebinars", "Jun 2026"),
    ("Prompt Engineering para Desarrolladores", "OpenWebinars", "May 2026"),
    ("Automatización con n8n", "OpenWebinars", "2025"),
    ("AWS Cloud Foundations & Operations", "AWS Academy", "2025"),
    ("Appian Associate Developer", "Appian", "2025"),
]

SKILLS = [
    ("IA & Automatización", "Python"),
    ("IA & Automatización", "LangChain"),
    ("IA & Automatización", "LangGraph"),
    ("IA & Automatización", "RAG (Retrieval-Augmented Generation)"),
    ("IA & Automatización", "ChromaDB"),
    ("IA & Automatización", "HuggingFace (sentence-transformers)"),
    ("IA & Automatización", "Groq (Llama 3 / 3.3)"),
    ("IA & Automatización", "n8n"),
    ("IA & Automatización", "Prompt Engineering"),
    ("Low-Code", "OutSystems"),
    ("Low-Code", "Appian"),
    ("Backend & Cloud", "FastAPI"),
    ("Backend & Cloud", "SQL"),
    ("Backend & Cloud", "Docker"),
    ("Backend & Cloud", "AWS"),
    ("Backend & Cloud", "Git / GitHub"),
]

EXPERIENCE = [
    (
        "Inetum",
        "Low-Code Developer (Prácticas)",
        "Sep 2025 — May 2026 (800h)",
        "Plataforma multirol de gestión de certificaciones corporativas (empleado / gestor / aprobador) con dashboards y KPIs en tiempo real. Stack: OutSystems, SQL. Equipo ágil de 3 desarrolladores.",
    ),
]


def seed():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    c.executescript("""
        DROP TABLE IF EXISTS projects;
        DROP TABLE IF EXISTS certifications;
        DROP TABLE IF EXISTS skills;
        DROP TABLE IF EXISTS experience;

        CREATE TABLE projects (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            name        TEXT NOT NULL,
            technologies TEXT,
            description TEXT,
            github      TEXT
        );
        CREATE TABLE certifications (
            id      INTEGER PRIMARY KEY AUTOINCREMENT,
            name    TEXT NOT NULL,
            issuer  TEXT,
            year    TEXT
        );
        CREATE TABLE skills (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL,
            name     TEXT NOT NULL
        );
        CREATE TABLE experience (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            company     TEXT NOT NULL,
            role        TEXT,
            period      TEXT,
            description TEXT
        );
    """)

    c.executemany(
        "INSERT INTO projects (name, technologies, description, github) VALUES (?,?,?,?)",
        PROJECTS,
    )
    c.executemany(
        "INSERT INTO certifications (name, issuer, year) VALUES (?,?,?)",
        CERTIFICATIONS,
    )
    c.executemany(
        "INSERT INTO skills (category, name) VALUES (?,?)",
        SKILLS,
    )
    c.executemany(
        "INSERT INTO experience (company, role, period, description) VALUES (?,?,?,?)",
        EXPERIENCE,
    )

    conn.commit()
    conn.close()
    print("✅ SQLite portfolio.db seeded correctly")


if __name__ == "__main__":
    seed()
