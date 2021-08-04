import Products from "../../../models/Products";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var id_shop = post['id_shop'];

        const products = new Products();
        var data = null;
        if (id_shop == 0)
            data = await products.getProductsByParams({
                where: {
                    active: 1
                }, relations: ["lang"]
            });
        else
            data = await products.getProductsByParams({
                where: {
                    active: 1,
                    shop: id_shop
                }, relations: ["lang"]
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