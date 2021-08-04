import DeliveryBoy from "../../../../models/DeliveryBoy";
import {In, MoreThan} from "typeorm";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var id_delivery_boy = post['id_delivery_boy'];
        var limit = post['limit'];
        var offset = post['offset'];
        var status = post['status'];
        const deliveryBoy = new DeliveryBoy();
        var params = {
            where: {
                active: 1,
                status: status,
                user: {
                    id: id_delivery_boy
                },
            },
            order: {
                id: 'DESC',
            },
            relations: ["order", "order.user", "order.order_detail", "order.order_status", "order.delivery_address", "order.order_detail.product", "order.order_detail.product.lang", "order.order_detail.product.images", "order.shops", "order.shops.lang"]
        };

        if (limit > 0) params["take"] = limit;
        if (offset > 0) params["skip"] = offset;

        let data = await deliveryBoy.getDeliveryBoyOrdersByParams(params) as any[];

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