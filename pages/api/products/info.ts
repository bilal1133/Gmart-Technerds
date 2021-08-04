import Products from "../../../models/Products";

export default async function handler(req, res) {
    try {
        const id = req.body.id;

        const products = new Products();
        let data = await products.getProductsByParams({
            where: {
                id: id
            },
            relations: ["lang", "lang.id_lang", "category", "brand", "images", "unit", "shop"]
        });

        res.status(200).json({
            "data": data[0]
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "brands.ts"
        })
    }
}