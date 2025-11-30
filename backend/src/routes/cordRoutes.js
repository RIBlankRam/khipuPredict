import { Router } from "express";
import { CordController } from "../controllers/cordController.js";

const router = Router();

router.get("/", CordController.getAll);
router.get("/:khipuId", CordController.getByKhipu);

export default router;