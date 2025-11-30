import { CordModel } from "../models/cordModel.js";

export const CordController = {
    getAll: async (req, res) => {
        res.json(await CordModel.getAll());
    },

    getByKhipu: async (req, res) => {
        const cords = await CordModel.getByKhipu(req.params.khipuId);
        res.json(cords);
    }
};
