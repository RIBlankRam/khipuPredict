import psycopg2
import os

conn = psycopg2.connect(
    "postgresql://neondb_owner:npg_fd9uv1gQFcTh@ep-proud-cherry-acwox4x8-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
)
cur = conn.cursor()

cur.execute("SELECT * FROM khipu LIMIT 5;")
print(cur.fetchall())