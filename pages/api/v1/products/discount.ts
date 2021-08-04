import Products from "../../../../models/Products";
import {MoreThan} from "typeorm";
import CouponModel from "../../../../models/Coupon";

export default async function handler(req, res) {
    let post = req.body;
    try {
        const id_shop = post['id_shop'];
        const limit = post['limit'];
        const offset = post['offset'];
        const products = new Products();
        const coupon = new CouponModel();
        var params = {
            where: {
                active: 1,
                discount_price: MoreThan(0),
                shop: {
                    id: id_shop
                }
            }, relations: ["lang", "images"]
        };

        if (limit > 0) params["take"] = limit;
        if (offset > 0) params["skip"] = offset;

        let data = await products.getProductsByParams(params) as any[];
        var productsArray = [];
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                data[i]['has_coupon'] = await coupon.hasCoupon(data[i]['id']);
                productsArray.push(data[i]);
            }
        }

        res.status(200).json({
            "data": productsArray
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "brands.ts"
        })
    }
}