# Analizador de Reseñas

API REST que analiza reseñas de productos usando LangChain, Ollama y LangSmith. Devuelve sentimiento, aspectos clave, puntuación y resumen estructurado.

## Requisitos previos

- Python 3.11+
- [Ollama](https://ollama.com/) instalado y corriendo localmente con el modelo `gemma3`
- Cuenta en [LangSmith](https://smith.langchain.com/) con un prompt llamado `analizador-resenas`

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Alvarorrodri/PromptEngineering.git
   cd PromptEngineering
   ```

2. Crea y activa el entorno virtual:
   ```bash
   python -m venv venv
   # Windows
   .\venv\Scripts\Activate.ps1
   # Linux/Mac
   source venv/bin/activate
   ```

3. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```

4. Crea el archivo `.env` con tus credenciales:
   ```env
   LANGSMITH_TRACING=true
   LANGSMITH_API_KEY=tu_api_key
   LANGSMITH_ENDPOINT=https://eu.api.smith.langchain.com
   GROQ_API_KEY=tu_groq_api_key
   ```

## Ejecución

```bash
fastapi dev main.py
```

La API estará disponible en `http://localhost:8000`.

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Health check |
| GET | `/health` | Health check |
| POST | `/analizar` | Analiza una reseña |

### POST `/analizar`

**Body:**
```json
{
  "reseña": "El producto llegó rápido y la calidad es excelente"
}
```

**Respuesta:**
```json
{
  "sentimiento": "positivo",
  "aspectos": ["envio", "calidad"],
  "puntuacion": 9,
  "resumen": "Reseña muy positiva destacando rapidez de envío y buena calidad"
}
```

## Dependencias principales

- **FastAPI** — framework web
- **LangChain + Ollama** — integración con modelos de lenguaje locales
- **LangSmith** — gestión y versionado de prompts
- **Pydantic** — validación de datos y structured output
