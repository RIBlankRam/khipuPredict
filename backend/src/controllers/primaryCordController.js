import { PrimaryCordModel } from "../models/primaryCordModel.js";

export const PrimaryCordController = {
    getAll: async (req, res) => {
        res.json(await PrimaryCordModel.getAll());
    },

    getByKhipu: async (req, res) => {
        const pc = await PrimaryCordModel.getByKhipu(req.params.khipuId);
        res.json(pc);
    }
};
