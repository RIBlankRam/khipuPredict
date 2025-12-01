import sqlite3
import psycopg

# ==========================================
# 1) Conexión a SQLite
# ==========================================
sqlite_path = r"C:\Users\LUIS\Documents\ComplejidadAlgoritmica\data\khipu.db"
conn_sql = sqlite3.connect(sqlite_path)
cur_sql = conn_sql.cursor()

# ==========================================
# 2) Conexión a PostgreSQL (Neon)
# ==========================================
conn_pg = psycopg.connect(
    "postgresql://neondb_owner:npg_fd9uv1gQFcTh@ep-proud-cherry-acwox4x8-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
)
cur_pg = conn_pg.cursor()

print("Cargando IDs existentes...")
cur_pg.execute("SELECT id FROM cord")
existing_cord_ids = {r[0] for r in cur_pg.fetchall()}

cur_pg.execute("SELECT id FROM khipu")
existing_khipu_ids = {r[0] for r in cur_pg.fetchall()}

print(f"CORD IDs cargados: {len(existing_cord_ids)}")
print(f"KHIPU IDs cargados: {len(existing_khipu_ids)}\n")

# ==========================================
# FUNCIÓN PARA LIMPIAR VALORES
# ==========================================
def fix(value):
    if value is None:
        return None
    if isinstance(value, str):
        v = value.strip()
        if v == "" or v == "''" or v == "\"\"":
            return None
        return v.replace("\x00", "")
    return value


# ==========================================
# MIGRAR TABLA: ascher_color_dc
# ==========================================
print("Migrando: ascher_color_dc")

cur_sql.execute("""
    SELECT AS_COLOR_CD, COLOR_DESCR, R_DEC, G_DEC, B_DEC
    FROM ascher_color_dc
""")

rows_dc_raw = cur_sql.fetchall()

rows_dc = []
for r in rows_dc_raw:
    acode, desc, r_dec, g_dec, b_dec = r
    rows_dc.append((
        fix(acode), fix(desc), r_dec, g_dec, b_dec
    ))

cur_pg.executemany("""
    INSERT INTO ascher_color_dc(AS_COLOR_CD, COLOR_DESCR, R_DEC, G_DEC, B_DEC)
    VALUES (%s,%s,%s,%s,%s)
    ON CONFLICT (AS_COLOR_CD) DO NOTHING;
""", rows_dc)

conn_pg.commit()
print(f"→ Migrados {len(rows_dc)} colores base OKR\n")


# ==========================================
# MIGRAR TABLA: ascher_cord_color
# ==========================================
print("Migrando: ascher_cord_color")

cur_sql.execute("""
    SELECT 
        color_id,
        COLOR_CD_1, COLOR_CD_2, COLOR_CD_3, COLOR_CD_4, COLOR_CD_5,
        FULL_COLOR,
        CORD_ID,
        KHIPU_ID,
        RANGE_BEG,
        RANGE_END
    FROM ascher_cord_color
""")

rows_cc = []
for r in cur_sql.fetchall():
    (
        color_id,
        c1, c2, c3, c4, c5,
        full,
        cord_id,
        khipu_id,
        rb, re
    ) = r

    # LIMPIEZA DE COLORES
    c1 = fix(c1)
    c2 = fix(c2)
    c3 = fix(c3)
    c4 = fix(c4)
    c5 = fix(c5)
    full = fix(full)

    # Validación FK (si no existe, va NULL)
    if cord_id not in existing_cord_ids:
        cord_id = None
    if khipu_id not in existing_khipu_ids:
        khipu_id = None

    rows_cc.append((
        color_id, c1, c2, c3, c4, c5,
        full, cord_id, khipu_id,
        rb, re
    ))

cur_pg.executemany("""
    INSERT INTO ascher_cord_color(
        COLOR_ID,
        COLOR_CD_1,
        COLOR_CD_2,
        COLOR_CD_3,
        COLOR_CD_4,
        COLOR_CD_5,
        FULL_COLOR,
        CORD_ID,
        KHIPU_ID,
        RANGE_BEGIN,
        RANGE_END
    )
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    ON CONFLICT (COLOR_ID) DO NOTHING;
""", rows_cc)

conn_pg.commit()
print(f"→ Migrados {len(rows_cc)} registros de colores aplicados a cuerdas")
print("\n✔ Migración COMPLETA SIN ERRORES ✔")
