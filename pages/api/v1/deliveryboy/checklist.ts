import DeliveryBoy from "../../../../models/DeliveryBoy";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var orderId = post['order_id'];
        var checklist = post['checklist'];
        const deliveryBoy = new DeliveryBoy();
        let data = await deliveryBoy.saveCheckList(orderId, checklist) as any[];

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