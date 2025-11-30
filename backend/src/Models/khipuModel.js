import { pool } from "../config/db.js";

export const KhipuModel = {
  getGroupedBasic: async () => {
    const result = await pool.query(`
      SELECT id, code, investigator, museum, provenance
      FROM khipu
      ORDER BY museum, investigator;
    `);
    return result.rows;
  },

  getAll: async () => {
    const result = await pool.query("SELECT * FROM khipu");
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query("SELECT * FROM khipu WHERE id = $1", [id]);
    return result.rows[0];
  },

  /** ------------------------------------------------------
   *  🔥 OBTENER CUERDAS + NUDOS DE UN KHIPU
   -------------------------------------------------------*/
  getCords: async (khipuId) => {
    const res = await pool.query(
      `SELECT *
       FROM cord
       WHERE khipu_id = $1
       ORDER BY id ASC`,
      [khipuId]
    );
    return res.rows;
  },

  getKnotsByCord: async (cordId) => {
    const res = await pool.query(
      `SELECT *
       FROM knot
       WHERE cord_id = $1
       ORDER BY knot_offset ASC`,
      [cordId]
    );
    return res.rows;
  },

  /** ------------------------------------------------------
   *  🔥 Cuerdas con lista de NUDOS incluidos
   -------------------------------------------------------*/
  getCordsWithKnots: async (khipuId) => {
    const cords = await KhipuModel.getCords(khipuId);

    for (const cord of cords) {
      const knots = await KhipuModel.getKnotsByCord(cord.id);
      cord.knots = knots; // Añadimos los nudos dentro de cada cuerda
    }

    return cords;
  },

  /** ------------------------------------------------------
   *  🔥 Grafo simple de cuerdas (si deseas)
   -------------------------------------------------------*/
  buildGraph(cords) {
    return cords.map((c) => ({
      id: c.id,
      name: c.cord_name,
      length: c.length,
      color: c.color,
    }));
  },
};
