import { pool } from "../config/db.js";

export const KhipuModel = {
  /* ======================================================
     🔥 BÁSICOS
  ====================================================== */
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

  /* ======================================================
     🔥 CUERDAS BÁSICAS
  ====================================================== */
  getCords: async (khipuId) => {
    const res = await pool.query(
      `
      SELECT *
      FROM cord
      WHERE khipu_id = $1
      ORDER BY id ASC
      `,
      [khipuId]
    );
    return res.rows;
  },

  /* ======================================================
     🔥 NUDOS POR CUERDA (NORMALIZADOS PARA EL FRONT)
     → Usa exactamente las columnas que tienes en Neon:
       knot_type, knot_count, knot_offset, direction, numeric_value
  ====================================================== */
  getKnotsByCord: async (cordId) => {
  const res = await pool.query(
    `
    SELECT 
      id,
      cord_id,
      knot_type,
      knot_count,
      knot_offset,
      direction,
      numeric_value
    FROM knot
    WHERE cord_id = $1
    ORDER BY knot_offset ASC
    `,
    [cordId]
  );

  return res.rows.map((row, idx) => ({
    id: row.id,
    orden: idx + 1,
    tipo: row.knot_type || "Sin tipo",
    cantidad: row.knot_count ?? 0,
    posicion: row.knot_offset,
    direccion: row.direction || "N/A",
    valor: row.numeric_value ?? "Sin calcular"
  }));
},


  /* ======================================================
     🔥 COLORES OKR (catálogo Ascher)
  ====================================================== */
  getCordsWithColors: async (khipuId) => {
    const res = await pool.query(
      `
      SELECT 
        c.id AS cord_id,
        c.cord_name,
        c.length,
        c.twist,
        c.position_desc,

        acc.full_color,

        dc1.color_descr AS color_name_1,
        dc2.color_descr AS color_name_2,
        dc3.color_descr AS color_name_3,
        dc4.color_descr AS color_name_4,
        dc5.color_descr AS color_name_5,

        acc.color_cd_1,
        acc.color_cd_2,
        acc.color_cd_3,
        acc.color_cd_4,
        acc.color_cd_5

      FROM cord c
      LEFT JOIN ascher_cord_color acc ON acc.cord_id = c.id

      LEFT JOIN ascher_color_dc dc1 ON acc.color_cd_1 = dc1.as_color_cd
      LEFT JOIN ascher_color_dc dc2 ON acc.color_cd_2 = dc2.as_color_cd
      LEFT JOIN ascher_color_dc dc3 ON acc.color_cd_3 = dc3.as_color_cd
      LEFT JOIN ascher_color_dc dc4 ON acc.color_cd_4 = dc4.as_color_cd
      LEFT JOIN ascher_color_dc dc5 ON acc.color_cd_5 = dc5.as_color_cd

      WHERE c.khipu_id = $1
      ORDER BY c.id ASC
      `,
      [khipuId]
    );

    return res.rows;
  },

  /* ======================================================
     ⭐ CUERDAS COMPLETAS (COLORES + NUDOS)
     → ESTA ES LA FUNCIÓN QUE DEBE USAR EL CONTROLLER
  ====================================================== */
  getCordsFull: async (khipuId) => {
    const result = await pool.query(
      `
      SELECT 
        c.id AS cord_id,
        c.cord_name,
        c.length,
        c.twist,
        c.position_desc,

        acc.full_color,

        acc.color_cd_1,
        acc.color_cd_2,
        acc.color_cd_3,
        acc.color_cd_4,
        acc.color_cd_5,

        dc1.color_descr AS color_name_1,
        dc2.color_descr AS color_name_2,
        dc3.color_descr AS color_name_3,
        dc4.color_descr AS color_name_4,
        dc5.color_descr AS color_name_5

      FROM cord c
      LEFT JOIN ascher_cord_color acc ON acc.cord_id = c.id

      LEFT JOIN ascher_color_dc dc1 ON acc.color_cd_1 = dc1.as_color_cd
      LEFT JOIN ascher_color_dc dc2 ON acc.color_cd_2 = dc2.as_color_cd
      LEFT JOIN ascher_color_dc dc3 ON acc.color_cd_3 = dc3.as_color_cd
      LEFT JOIN ascher_color_dc dc4 ON acc.color_cd_4 = dc4.as_color_cd
      LEFT JOIN ascher_color_dc dc5 ON acc.color_cd_5 = dc5.as_color_cd

      WHERE c.khipu_id = $1
      ORDER BY c.id ASC
      `,
      [khipuId]
    );

    const cords = result.rows;

    // 🔥 anexamos los nudos *ya normalizados* a cada cuerda
    for (const cord of cords) {
      const knots = await KhipuModel.getKnotsByCord(cord.cord_id);
      cord.knots = knots; // [{orden, tipo, cantidad, posicion, direccion, valor}, ...]
    }

    return cords;
  },

  /* ======================================================
     🔥 GRAFO
  ====================================================== */
  buildGraph(cords) {
    return cords.map((c) => ({
      id: c.cord_id,
      name: c.cord_name,
      length: c.length,
      color: c.full_color || null,
    }));
  },
};
