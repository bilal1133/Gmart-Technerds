import Brands from "../../../../models/Brands";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var id_shop = post['id_shop'];
        var limit = post['limit'];
        var offset = post['offset'];

        const brands = new Brands();
        var data = await brands.getBrandsByParams({
            where: {
                active: 1,
                id_shop: {
                    id: id_shop
                }
            },
            take: limit,
            skip: offset
        });

        res.status(200).json({
            "data": data
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "parent.ts"
        })
    }
}