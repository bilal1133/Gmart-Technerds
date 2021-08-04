import DeliveryBoy from "../../../../models/DeliveryBoy";

export default async function handler(req, res) {
    let post = req.body;
    try {
        let status = post.status;
        let orderId = post.order_id;
        let userId = post.user_id;
        const deliveryBoy = new DeliveryBoy();
        let data = await deliveryBoy.changeStatus(orderId, status, userId);

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