import Products from "../../../models/Products";

export default async function handler(req, res) {
    try {
        const id_shop = req.body.id_shop;

        const products = new Products();
        let data = await products.getProductsByParams({
            where: {
                shop: id_shop
            },
            relations: ["lang", "lang.id_lang", "images", "unit", "unit.lang"]
        });

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