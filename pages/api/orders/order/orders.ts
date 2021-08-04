import Orders from "../../../../models/Orders";

export default async function handler(req, res) {
    try {
        const orders = new Orders();
        let data = await orders.getOrdersByParams({
            where: {
                order_status: {
                    id: 1
                }
            },
            relations: ["order_status", "user"]
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