import DeliveryBoy from "../../../models/DeliveryBoy";

export default async function handler(req, res) {
    try {
        const deliveryBoy = new DeliveryBoy();
        let data = await deliveryBoy.getOrdersTable();

        res.status(200).json({
            "data": data
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "info.ts"
        })
    }
}