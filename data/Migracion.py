import sqlite3
import psycopg
from datetime import datetime

# ================================
# 1) Conexión a SQLite
# ================================
sqlite_path = r"C:\Users\LUIS\Documents\ComplejidadAlgoritmica\data\khipu.db"
conn_sql = sqlite3.connect(sqlite_path)
cur_sql = conn_sql.cursor()

# ================================
# 2) Conexión a PostgreSQL (Neon)
# ================================
conn_pg = psycopg.connect(
    "postgresql://neondb_owner:npg_fd9uv1gQFcTh@ep-proud-cherry-acwox4x8-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
)
cur_pg = conn_pg.cursor()

# ================================
# UTILIDADES
# ================================
def to_date(text):
    if text is None:
        return None
    try:
        return datetime.fromisoformat(text)
    except:
        return None

def sanitize_row(row):
    return tuple(
        (value.replace("\x00", "") if isinstance(value, str) else value)
        for value in row
    )

# ================================
# MIGRAR khipu
# ================================
print("Migrando: khipu")

cur_sql.execute("""
    SELECT KHIPU_ID, NICKNAME, INVESTIGATOR_NUM, MUSEUM_NAME,
           MUSEUM_NUM, PROVENANCE, EARLIEST_AGE, CREATED_ON, NOTES
    FROM khipu_main
""")

khipu_rows = [sanitize_row(r) for r in cur_sql.fetchall()]

cur_pg.executemany("""
    INSERT INTO khipu(id, code, investigator, museum, museum_number,
                      provenance, creation_date, excel_write_date,
                      notes, raw_filename)
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,NULL)
    ON CONFLICT (id) DO NOTHING;
""", [
    (r[0], r[1], r[2], r[3], r[4], r[5], to_date(r[6]), to_date(r[7]), r[8])
    for r in khipu_rows
])

conn_pg.commit()


# ================================
# MIGRAR primary_cord
# ================================
print("Migrando: primary_cord")

cur_sql.execute("""
    SELECT PCORD_ID, KHIPU_ID, STRUCTURE, THICKNESS,
           PCORD_LENGTH, FIBER, BEGINNING, TERMINATION,
           TWIST, NOTES
    FROM primary_cord
""")

primary_rows = [sanitize_row(r) for r in cur_sql.fetchall()]

cur_pg.executemany("""
    INSERT INTO primary_cord(id, khipu_id, structure, thickness, length,
                             color, fiber, beginning, termination, twist, notes)
    VALUES (%s,%s,%s,%s,%s,NULL,%s,%s,%s,%s,%s)
    ON CONFLICT (id) DO NOTHING;
""", primary_rows)

conn_pg.commit()

# Guardar IDs en memoria (RÁPIDO)
cur_pg.execute("SELECT id FROM primary_cord")
existing_primary_ids = {r[0] for r in cur_pg.fetchall()}


# ================================
# MIGRAR cord
# ================================
print("Migrando: cord")

cur_sql.execute("""
    SELECT CORD_ID, KHIPU_ID, PENDANT_FROM, INVESTIGATOR_CORD_NUM,
           TWIST, ATTACHMENT_TYPE, CORD_NOTES, CORD_LENGTH,
           TERMINATION, THICKNESS, FIBER, ATTACH_POS
    FROM cord
""")

cord_rows = []
for r in cur_sql.fetchall():
    r = sanitize_row(r)

    cord_id = r[0]
    khipu_id = r[1]
    pcord_id = r[2]
    name = r[3]
    twist = r[4]
    attach = r[5]
    notes = r[6]
    length = r[7]
    term = r[8]
    thick = r[9]
    fiber = r[10]
    pos = r[11]

    # Validación FK en memoria (0,0001s)
    if pcord_id not in existing_primary_ids:
        pcord_id = None

    cord_rows.append((
        cord_id, khipu_id, pcord_id, name, twist,
        attach, notes, length, term, thick,
        fiber, pos
    ))

cur_pg.executemany("""
    INSERT INTO cord(id, khipu_id, primary_cord_id, cord_name, twist,
                     attachment, knots_raw, length, termination, thickness,
                     color, value, position_desc)
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,NULL,%s)
    ON CONFLICT (id) DO NOTHING;
""", cord_rows)

conn_pg.commit()

# Guardar IDs de cord
cur_pg.execute("SELECT id FROM cord")
existing_cord_ids = {r[0] for r in cur_pg.fetchall()}


# ================================
# MIGRAR knot
# ================================
print("Migrando: knot")

cur_sql.execute("""
    SELECT KNOT_ID, CORD_ID, TYPE_CODE, NUM_TURNS,
           KNOT_ORDINAL, DIRECTION
    FROM knot
""")

knot_rows = []
for r in cur_sql.fetchall():
    r = sanitize_row(r)

    knot_id = r[0]
    cord_id = r[1]
    knot_type = r[2]
    knot_count = r[3]
    knot_offset = r[4]
    direction = r[5]

    if cord_id not in existing_cord_ids:
        cord_id = None

    knot_rows.append((
        knot_id, cord_id, knot_type, knot_count,
        knot_offset, direction
    ))

cur_pg.executemany("""
    INSERT INTO knot(id, cord_id, knot_type, knot_count,
                     knot_offset, direction, numeric_value)
    VALUES (%s,%s,%s,%s,%s,%s,NULL)
    ON CONFLICT (id) DO NOTHING;
""", knot_rows)

conn_pg.commit()

print("✔ Migración COMPLETA SIN ERRORES")
