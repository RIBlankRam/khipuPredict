import sqlite3
conn = sqlite3.connect(r"C:\Users\LUIS\Documents\ComplejidadAlgoritmica\data\khipu.db")
cur = conn.cursor()

for tbl in ["khipu_main", "primary_cord", "cord", "knot", "cord_cluster"]:
    print("\n=== TABLA:", tbl, "===")
    try:
        cur.execute(f"PRAGMA table_info({tbl});")
        print(cur.fetchall())
    except:
        print("No existe")