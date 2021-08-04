import Shops from "../../../models/Shops";

export default async function handler(req, res) {
    try {
        const shops = new Shops();
        var data = await shops.getShopsByParam({
            where: {
                active: 1
            }, relations: ["lang"]
        });

        res.status(200).json({
            "data": data
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "active.ts"
        })
    }
}