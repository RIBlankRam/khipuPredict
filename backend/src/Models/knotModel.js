import { pool } from "../config/db.js";

export const KnotModel = {
    getAll: async () => {
        const res = await pool.query("SELECT * FROM knot");
        return res.rows;
    },

    getByCord: async (cordId) => {
        const res = await pool.query(
            "SELECT * FROM knot WHERE cord_id=$1",
            [cordId]
        );
        return res.rows;
    }
};
