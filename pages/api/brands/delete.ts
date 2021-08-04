import Brands from "../../../models/Brands";

export default async function handler(req, res) {
    try {
        let ids = req.body.ids;
        const brands = new Brands();

        for(let i in ids) {
             await brands.removeBrandsByParams({id: ids[i]});
        }

        res.status(200).json({
            "data": {
                "success": true
            }
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "brands.ts"
        })
    }
}