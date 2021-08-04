import OrderStatus from "../../../../models/OrderStatus";

export default async function handler(req, res) {
    let post = req.body;
    try {
        const orderStatus = new OrderStatus();
        let data = await orderStatus.saveOrderStatus(post);

        res.status(200).json({
            "data": data
        });
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "saveShopsAddress.ts"
        })
    }
}