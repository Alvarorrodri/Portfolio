"""
Indexa el contenido del portfolio desde app/data/*.md en ChromaDB.
Ejecutar una vez antes de arrancar el servidor: python ingest.py
"""

from pathlib import Path
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document

DATA_DIR = Path("app/data")
CHROMA_DIR = "chroma_db"
EMBED_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
COLLECTION_NAME = "portfolio"
CHUNK_SIZE = 500
CHUNK_OVERLAP = 200


def load_documents() -> list[Document]:
    docs = []
    md_files = list(DATA_DIR.glob("*.md"))

    if not md_files:
        raise FileNotFoundError(
            f"No se encontraron archivos .md en '{DATA_DIR}/'. "
            "Añade al menos un archivo de contenido antes de indexar."
        )

    for path in md_files:
        content = path.read_text(encoding="utf-8")
        docs.append(
            Document(
                page_content=content,
                metadata={
                    "source": path.name,
                },
            )
        )
        print(f"  Cargado: {path.name} ({len(content)} caracteres)")

    return docs


def split_documents(docs: list[Document]) -> list[Document]:
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
        separators=["\n## ", "\n### ", "\n\n", "\n", " "],
    )
    chunks = splitter.split_documents(docs)
    print(f"  Chunks generados: {len(chunks)}")
    return chunks


def build_vectorstore(chunks: list[Document]) -> None:
    print("  Cargando modelo de embeddings (primera vez puede tardar)...")
    embeddings = HuggingFaceEmbeddings(model_name=EMBED_MODEL)

    Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=CHROMA_DIR,
        collection_name=COLLECTION_NAME,
    )
    print(f"  Vectorstore guardado en '{CHROMA_DIR}/'")


def main():
    print("\n=== Indexando Portfolio ===")

    print("\n[1/4] Cargando archivos...")
    docs = load_documents()
    print(f"  Documentos encontrados: {len(docs)}")

    print("\n[2/4] Dividiendo en chunks...")
    chunks = split_documents(docs)

    print("\n[3/4] Generando embeddings y guardando en ChromaDB...")
    build_vectorstore(chunks)

    print("\n[4/4] Poblando SQLite con datos estructurados...")
    from app.db.seed import seed as seed_db
    seed_db()

    print("\nIndexación completada. Ahora puedes ejecutar: uvicorn main:app --reload\n")


if __name__ == "__main__":
    main()
