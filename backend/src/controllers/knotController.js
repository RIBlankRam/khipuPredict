import { KnotModel } from "../models/knotModel.js";

export const KnotController = {
    getAll: async (req, res) => {
        res.json(await KnotModel.getAll());
    },

    getByCord: async (req, res) => {
        const knots = await KnotModel.getByCord(req.params.cordId);
        res.json(knots);
    }
};
