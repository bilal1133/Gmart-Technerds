import Shops from "../../../../models/Shops";

export default async function handler(req, res) {
    try {
        const shops = new Shops();
        var deliveryShops = await shops.getShopsByParam({
            where: [
                {
                    active: 1,
                    delivery_type: 1
                },
                {
                    active: 1,
                    delivery_type: 3
                }
            ], relations: ["lang"]
        });

        var pickupShops = await shops.getShopsByParam({
            where: [
                {
                    active: 1,
                    delivery_type: 2
                },
                {
                    active: 1,
                    delivery_type: 3
                }
            ], relations: ["lang"]
        });

        res.status(200).json({
            "data": {
                "deliveryShops": deliveryShops,
                "pickupShops": pickupShops
            }
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "active.ts"
        })
    }
}