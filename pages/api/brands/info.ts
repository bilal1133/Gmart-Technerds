import Brands from "../../../models/Brands";

export default async function handler(req, res) {
    try {
        const brand_id = req.body.id;

        if (!brand_id || brand_id == 'undefined') {
            res.status(200).json({
                "logged": false,
                "error": "id is empty",
            })
        }

        const brands = new Brands();
        let data = await brands.getBrandsByParams({
            where: {
                id: brand_id
            },
            relations: ['id_shop']
        });

        res.status(200).json({
            "data": data[0]
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "info.ts"
        })
    }
}