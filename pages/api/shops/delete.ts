import Shops from "../../../models/Shops";

export default async function handler(req, res) {
    try {
        let ids = req.body.ids;
        const shops = new Shops();

        for(let i in ids) {
            await shops.removeShopsByParam({id: ids[i]});
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
            "file": "shops.ts"
        })
    }
}