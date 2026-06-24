import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent.parent.parent / "data" / "portfolio.db"


def _conn():
    return sqlite3.connect(DB_PATH)


def get_all_projects():
    with _conn() as conn:
        return conn.execute(
            "SELECT name, technologies, github FROM projects ORDER BY id"
        ).fetchall()


def get_all_certifications():
    with _conn() as conn:
        return conn.execute(
            "SELECT name, issuer, year FROM certifications ORDER BY id"
        ).fetchall()


def get_skills_by_category():
    with _conn() as conn:
        rows = conn.execute(
            "SELECT category, name FROM skills ORDER BY id"
        ).fetchall()
    grouped = {}
    for cat, skill in rows:
        grouped.setdefault(cat, []).append(skill)
    return grouped


def get_experience():
    with _conn() as conn:
        return conn.execute(
            "SELECT company, role, period FROM experience ORDER BY id"
        ).fetchall()


def build_structured_context() -> str:
    lines = ["=== DATOS ESTRUCTURADOS (listado exacto y completo) ===\n"]

    lines.append("PROYECTOS DE ÁLVARO RODRIGO (lista completa, no omitir ninguno):")
    for name, technologies, github in get_all_projects():
        lines.append(f"- {name} | Tecnologías: {technologies} | GitHub: {github}")

    lines.append("\nCERTIFICACIONES:")
    for name, issuer, year in get_all_certifications():
        lines.append(f"- {name} ({issuer}, {year})")

    lines.append("\nHABILIDADES TÉCNICAS:")
    for category, skills in get_skills_by_category().items():
        lines.append(f"  {category}: {', '.join(skills)}")

    lines.append("\nEXPERIENCIA LABORAL:")
    for company, role, period in get_experience():
        lines.append(f"- {company}: {role} ({period})")

    return "\n".join(lines)
