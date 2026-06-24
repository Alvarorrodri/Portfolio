# Portfolio — Álvaro Rodrigo Cantalejo

Portfolio personal con chatbot RAG funcional. El asistente responde preguntas sobre proyectos, habilidades y experiencia consultando una base de conocimiento vectorial en tiempo real.

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS + Framer Motion |
| Backend | FastAPI + Python 3.11 |
| RAG | LangChain · LangGraph · ChromaDB · HuggingFace |
| LLM | Groq API (Llama 3.1 8B) |
| Datos estructurados | SQLite |
| Servidor prod | Caddy (HTTPS automático) |
| Contenedores | Docker + Docker Compose |

## Estructura

```
Portfolio/
├── docker-compose.yml          # Entorno local (hot reload)
├── docker-compose.prod.yml     # Producción
├── frontend/
│   ├── src/
│   │   ├── components/         # Hero, About, Projects, Skills...
│   │   ├── context/            # ChatContext (estado compartido)
│   │   ├── data/content.js     # Todo el contenido del portfolio
│   │   └── hooks/
│   ├── Caddyfile               # Reverse proxy + SPA routing
│   └── Dockerfile
└── backend/
    ├── app/
    │   ├── api/chat.py         # POST /chat con rate limiting
    │   ├── db/                 # SQLite (proyectos, certs, skills)
    │   ├── data/*.md           # Base de conocimiento del RAG
    │   └── rag/pipeline.py     # LangGraph StateGraph
    ├── ingest.py               # Construye ChromaDB + SQLite
    └── Dockerfile
```

## Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- API key de [Groq](https://console.groq.com) (gratuita)

## Puesta en marcha local

**1. Configura el entorno del backend**

```bash
cp backend/.env.example backend/.env
# Edita backend/.env y añade tu GROQ_API_KEY
```

**2. Arranca los contenedores**

```bash
docker compose up --build
```

La primera build tarda ~5-8 minutos porque instala PyTorch (dependencia de `sentence-transformers`). Las siguientes son inmediatas gracias al caché de Docker.

**3. Indexa el contenido**

En otro terminal, una sola vez:

```bash
docker compose exec backend python ingest.py
```

Esto construye el índice vectorial en ChromaDB y puebla el SQLite con los datos estructurados.

**4. Abre el portfolio**

- Frontend: http://localhost:5173
- API: http://localhost:8000/docs

## Cómo funciona el chatbot

```
Pregunta del usuario
        │
        ▼
  Clasificador (LLM)
  ┌─────┴──────────────┐
perfil              saludo / desconocido
  │                         │
  ▼                         ▼
Buscador              Respuesta fija
  ├── SQLite (lista exacta de proyectos,
  │          certs, skills, experiencia)
  └── ChromaDB (k=16 chunks semánticos)
        │
        ▼
  Generador (LLM)
        │
        ▼
   Respuesta markdown
```

El clasificador decide si la pregunta es sobre el perfil profesional, un saludo, o algo fuera de ámbito. Para preguntas de perfil, el buscador combina datos exactos de SQLite (para nunca omitir proyectos o certificaciones) con contexto semántico de ChromaDB (para detalles).

## Despliegue en producción

**1. Configura variables de entorno**

En `backend/.env`:
```
ENV=production
CORS_ORIGINS=https://tudominio.com
```

**2. Para HTTPS automático con Let's Encrypt**

Edita `frontend/Caddyfile`, sustituye `:80` por tu dominio:
```
tudominio.com {
    ...
}
```

Y añade el puerto 443 en `docker-compose.prod.yml`:
```yaml
ports:
  - "80:80"
  - "443:443"
```

**3. Arranca**

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

El backend ejecuta `ingest.py` automáticamente si `chroma_db/` no existe.

## Actualizar el contenido

El contenido del chatbot vive en `backend/app/data/*.md`. Tras modificar cualquier archivo:

```bash
docker compose exec backend python ingest.py
```

El contenido visual del portfolio está en `frontend/src/data/content.js`.

## Rate limiting

El chatbot acepta 20 mensajes por sesión. El contador se resetea al recargar la página (nuevo `session_id` en `sessionStorage`). El límite es por sesión, no global.
