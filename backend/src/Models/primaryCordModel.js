import { pool } from "../config/db.js";

export const PrimaryCordModel = {
    getAll: async () => {
        const res = await pool.query("SELECT * FROM primary_cord");
        return res.rows;
    },

    getByKhipu: async (khipuId) => {
        const res = await pool.query(
            "SELECT * FROM primary_cord WHERE khipu_id=$1",
            [khipuId]
        );
        return res.rows;
    }
};
