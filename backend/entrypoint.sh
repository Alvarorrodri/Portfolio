#!/bin/sh
set -e

if [ ! -d "chroma_db" ] || [ -z "$(ls -A chroma_db 2>/dev/null)" ]; then
    echo "ChromaDB vacío — ejecutando ingest..."
    python ingest.py
fi

exec uvicorn main:app --host 0.0.0.0 --port 8000 --workers 2
