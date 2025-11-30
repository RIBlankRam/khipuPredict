import sqlite3

from click import Path

# ...existing code...
sqlite_path = r"C:\Users\LUIS\Documents\ComplejidadAlgoritmica\data\khipu.db"
# sqlite_path = r"C:\Users\LUIS\Documents\ComplejidadAlgoritmica\backend\khipu.db"
conn_sqlite = sqlite3.connect(sqlite_path)
# ...existing code...
cur_sqlite = conn_sqlite.cursor()

# Leer 10 registros de la tabla cord
cur_sqlite.execute("SELECT * FROM cord LIMIT 10;")
rows = cur_sqlite.fetchall()

for r in rows:
    print(r)

cur_sqlite.execute("SELECT name FROM sqlite_master WHERE type='table';")
print(cur_sqlite.fetchall())


