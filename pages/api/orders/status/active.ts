import OrderStatus from "../../../../models/OrderStatus";

export default async function handler(req, res) {
    try {
        const orderStatus = new OrderStatus();
        let data = await orderStatus.getOrderStatusByParams({active: 1});

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