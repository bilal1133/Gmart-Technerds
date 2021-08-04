import Shops from "../../../models/Shops";

export default async function handler(req, res) {
    try {
        const shop_id = req.body.id;

        if (!shop_id || shop_id == 'undefined') {
            res.status(200).json({
                "logged": false,
                "error": "id is empty",
            })
        }

        const shops = new Shops();
        let data = await shops.getShopsByParam({
            where: {
                id: shop_id
            }, relations: ["lang", "lang.id_lang"]
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