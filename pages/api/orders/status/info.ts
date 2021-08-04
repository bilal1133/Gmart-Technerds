import OrderStatus from "../../../../models/OrderStatus";

export default async function handler(req, res) {
    try {
        const id = req.body.id;

        const orderStatus = new OrderStatus();
        let data = await orderStatus.getOrderStatusByParams({id: id});

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