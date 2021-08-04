import Products from "../../../../models/Products";
import {Like, MoreThan} from "typeorm";
import CouponModel from "../../../../models/Coupon";

export default async function handler(req, res) {
    let post = req.body;
    try {
        const id_shop = post['id_shop'];
        const limit = post['limit'];
        const offset = post['offset'];
        const search = post['search'];
        const products = new Products();
        const coupon = new CouponModel();

        let data = await products.search(id_shop, search, limit, offset) as any[];
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
            "file": "search.ts"
        })
    }
}