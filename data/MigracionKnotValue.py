import sqlite3
import psycopg

# ================================
# 1. Conexión a SQLite
# ================================
sqlite_path = r"C:\Users\LUIS\Documents\ComplejidadAlgoritmica\data\khipu.db"
conn_sql = sqlite3.connect(sqlite_path)
cur_sql = conn_sql.cursor()

# ================================
# 2. Conexión a PostgreSQL (Neon)
# ================================
conn_pg = psycopg.connect(
    "postgresql://neondb_owner:npg_fd9uv1gQFcTh@ep-proud-cherry-acwox4x8-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
)
cur_pg = conn_pg.cursor()

print("Leyendo valores desde SQLite...")

cur_sql.execute("""
    SELECT 
        KNOT_ID,
        knot_value_type
    FROM knot
    WHERE knot_value_type IS NOT NULL
      AND knot_value_type != ''
""")

rows = cur_sql.fetchall()
print(f"→ {len(rows)} nudos con valor encontrado.")

# ================================
# PREPARAR BULK UPDATE
# ================================

bulk_updates = [
    (val, knot_id) 
    for (knot_id, val) in rows
]

print("Enviando a PostgreSQL (bulk)...")

cur_pg.executemany(
    """
    UPDATE knot
    SET numeric_value = %s
    WHERE id = %s
    """,
    bulk_updates
)

conn_pg.commit()

print("✔ Migración completada con executemany (rápida).")
print(f"✔ Total actualizados: {len(bulk_updates)}")
