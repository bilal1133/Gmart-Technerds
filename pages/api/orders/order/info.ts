import Orders from "../../../../models/Orders";

export default async function handler(req, res) {
    try {
        const id = req.body.id;

        const orders = new Orders();
        let data = await orders.getOrdersByParams({
            where: {
                id: id
            },
            relations: ["user", "order_status", "payment_status", "payment_method", "order_detail", "delivery_boy", "delivery_address", "order_detail.product", "order_detail.product.lang", "order_detail.product.unit", "order_detail.product.unit.lang", "order_detail.product.images", 'order_detail.replace_product']
        });

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