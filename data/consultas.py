import sqlite3
conn = sqlite3.connect(r"C:\Users\LUIS\Documents\ComplejidadAlgoritmica\data\khipu.db")
cur = conn.cursor()
cur.execute("PRAGMA table_info(knot)")
print(cur.fetchall())