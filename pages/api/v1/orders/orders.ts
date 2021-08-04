import Orders from "../../../../models/Orders";
import {In, MoreThan} from "typeorm";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var id_shop = post['id_shop'];
        var id_user = post['id_user'];
        var limit = post['limit'];
        var offset = post['offset'];
        var status = post['status'];
        const orders = new Orders();
        var params = {
            where: {
                active: 1,
                id_user: id_user,
                id_shop: id_shop,
                order_status: {
                    id: status == 1 ? In([1, 2, 3]) : status
                }
            },
            order: {
                id: 'DESC',
            },
            relations: ["order_detail", "delivery_address", "delivery_boy", "order_detail.product", "order_detail.product.lang", "order_detail.product.images", "order_status", "shops", "shops.lang"]
        };

        if (limit > 0) params["take"] = limit;
        if (offset > 0) params["skip"] = offset;

        let data = await orders.getOrdersByParams(params) as any[];

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