import Shops from "../../../models/Shops";

export default async function handler(req, res) {
    try {
        let id = req.body.id;

        const shops = new Shops();
        let data = await shops.removeShopsByParam({id: id});

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