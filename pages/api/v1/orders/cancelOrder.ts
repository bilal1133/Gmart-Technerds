import Orders from "../../../../models/Orders";
import {MoreThan} from "typeorm";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var id_order = post['id_order'];

        const orders = new Orders();
        let data = await orders.changeOrderStatus(id_order, 5) as any[];

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