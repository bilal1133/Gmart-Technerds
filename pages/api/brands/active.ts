import Brands from "../../../models/Brands";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var id_shop = post['id_shop'];

        const brands = new Brands();
        if (id_shop == 0)
            var data = await brands.getBrandsByParams({active: 1});
        else
            var data = await brands.getBrandsByParams({active: 1, id_shop: id_shop});

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