import { Router } from "express";
import { KhipuController } from "../controllers/khipuController.js";

const router = Router();

router.get("/grouped", KhipuController.getGrouped);
router.get("/", KhipuController.getAll);    // lista de khipus para mapa
router.get("/:id", KhipuController.getById); // detalles + grafos

export default router;
    