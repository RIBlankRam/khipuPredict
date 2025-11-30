import { Router } from "express";
import { KnotController } from "../controllers/knotController.js";

const router = Router();

router.get("/", KnotController.getAll);
router.get("/:cordId", KnotController.getByCord);

export default router;
