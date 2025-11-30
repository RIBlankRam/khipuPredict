// src/routes/graphRoutes.js
import { Router } from "express";
import { GraphController } from "../controllers/graphController.js";

const router = Router();

router.get("/graph", GraphController.buildGraph);
router.get("/bellman", GraphController.bellmanFord);
router.get("/dfs", GraphController.dfs);
router.get("/bfs", GraphController.bfs);

export default router;
