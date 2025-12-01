import { KhipuModel } from "../Models/khipuModel.js";

const REAL_MUSEUMS = [
  "American Museum of Natural History, NY",
  "Centro Mallqui, Leymebamba, Amazonas",
  "Ethnologisches Museum, Berlin, Germany",
  "Field Museum of Natural History, Chicago, IL",
  "Hood Museum of Art, Dartmouth College",
  "Joslyn Art Museum, Omaha, Nebraska",
  "Lowe Art Museum, University of Miami",
  "Lowie Museum, UC Berkeley",
  "Musée du Quai Branly, Paris",
  "Museo de Arte Amano, Lima",
  "Museo Nacional de Arqueología, Antropología e Historia del Perú",
  "Museo de Ica",
  "Museo Chileno de Arte Precolombino",
  "Museo Larco",
  "Museum für Völkerkunde, Vienna",
  "Royal Ontario Museum, Toronto",
  "Smithsonian National Museum, Washington D.C.",
  "Museo Temple Radicati, Huaraz",
  "Museo de Sitio de Pachacamac"
];

function clean(str) {
  return str?.replace(/"/g, "").trim() || "";
}

function autoAssignMuseum(k) {
  const prov = clean(k.provenance).toLowerCase();
  const museum = clean(k.museum);

  if (prov.includes("leymebamba")) return "Centro Mallqui, Leymebamba, Amazonas";
  if (prov.includes("ica")) return "Museo de Ica";
  if (prov.includes("pachacamac")) return "Museo de Sitio de Pachacamac";
  if (prov.includes("huaraz")) return "Museo Temple Radicati, Huaraz";
  if (REAL_MUSEUMS.includes(museum)) return museum;

  return null;
}

export const KhipuController = {
  getGrouped: async (req, res) => {
    try {
      const khipus = await KhipuModel.getGroupedBasic();

      const grouped = {};
      for (const k of khipus) {
        const assigned = autoAssignMuseum(k);
        if (!assigned) continue;

        if (!grouped[assigned]) grouped[assigned] = [];
        grouped[assigned].push({
          id: k.id,
          code: k.code,
          investigator: k.investigator,
          provenance: k.provenance,
        });
      }

      res.json(grouped);
    } catch (err) {
      console.error("Error en getGrouped:", err);
      res.status(500).json({ error: "Error al agrupar khipus" });
    }
  },

  getAll: async (req, res) => {
    try {
      const rows = await KhipuModel.getAll();
      res.json(rows);
    } catch (err) {
      console.error("Error en getAll:", err);
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const khipu = await KhipuModel.getById(req.params.id);
      if (!khipu) return res.status(404).json({ error: "No encontrado" });

      // 👉 CUERDAS COMPLETAS: colores + nudos normalizados
      const cords = await KhipuModel.getCordsFull(khipu.id);

      const graphStructure = KhipuModel.buildGraph(cords);

      res.json({
        khipu,
        cords,
        graph: graphStructure,
      });
    } catch (err) {
      console.error("Error en getById:", err);
      res.status(500).json({ error: err.message });
    }
  },
};
