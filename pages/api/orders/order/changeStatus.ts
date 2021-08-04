import Orders from "../../../../models/Orders";

export default async function handler(req, res) {
    let post = req.body;
    try {
        let status = post.status;
        let orderId = post.order_id;
        const orders = new Orders();
        let data = await orders.changeStatus(orderId, status);

        res.status(200).json({
            "data": data
        });
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "changeStatus.ts"
        })
    }
}