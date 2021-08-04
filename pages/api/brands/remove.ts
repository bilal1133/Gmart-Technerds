import Brands from "../../../models/Brands";

export default async function handler(req, res) {
    try {
        let id = req.body.id;
        const brands = new Brands();
        let data = await brands.removeBrandsByParams({id: id});

        res.status(200).json({
            "data": data
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "brands.ts"
        })
    }
}