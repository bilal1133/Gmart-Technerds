import Orders from "../../../models/Orders";

export default async function handler(req, res) {
    try {
        const id_shop = req.body.id_shop;

        const orders = new Orders();
        let data = await orders.getOrdersStatistics(id_shop);

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