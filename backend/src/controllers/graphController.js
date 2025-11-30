// src/controllers/graphController.js
import { buildGraph } from "../algorithms/graphBuilder.js";
import { bellmanFord } from "../algorithms/bellmanFord.js";
import { dfs } from "../algorithms/dfs.js";
import { bfs } from "../algorithms/bfs.js";
import { KhipuModel } from "../models/khipuModel.js";

export const GraphController = {
    
    buildGraph: async (req, res) => {
        const khipus = await KhipuModel.getAll();
        const graph = buildGraph(khipus);
        res.json(graph);
    },

    bellmanFord: async (req, res) => {
        const { source } = req.query;
        const khipus = await KhipuModel.getAll();
        const graph = buildGraph(khipus);

        const result = bellmanFord(graph, source);
        res.json(result);
    },

    dfs: async (req, res) => {
        const { start } = req.query;
        const khipus = await KhipuModel.getAll();
        const graph = buildGraph(khipus);

        const result = dfs(graph, start);
        res.json(result);
    },

    bfs: async (req, res) => {
        const { start } = req.query;
        const khipus = await KhipuModel.getAll();
        const graph = buildGraph(khipus);

        const result = bfs(graph, start);
        res.json(result);
    }
};
