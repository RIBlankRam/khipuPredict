import { Router } from "express";
import { PrimaryCordController } from "../controllers/primaryCordController.js";

const router = Router();

router.get("/", PrimaryCordController.getAll);
router.get("/:khipuId", PrimaryCordController.getByKhipu);

export default router;
