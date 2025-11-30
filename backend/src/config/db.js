import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
    connectionString:
        "postgresql://neondb_owner:npg_fd9uv1gQFcTh@ep-proud-cherry-acwox4x8-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require"
});
