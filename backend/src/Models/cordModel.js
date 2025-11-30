import { pool } from "../config/db.js";

export const CordModel = {
    getAll: async () => {
        const res = await pool.query("SELECT * FROM cord");
        return res.rows;
    },

    getByKhipu: async (khipuId) => {
        const res = await pool.query(
            "SELECT * FROM cord WHERE khipu_id=$1",
            [khipuId]
        );
        return res.rows;
    }
};
