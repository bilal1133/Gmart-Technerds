import Coupon from "../../../../models/Coupon";

export default async function handler(req, res) {
    try {
        const id_shop = req.body.id_shop;
        const limit = req.body.limit;
        const offset = req.body.offset;

        const coupon = new Coupon();
        let data = await coupon.getCouponProductsByParams(id_shop, limit, offset) as any[];

        var products = [];
        for (let i = 0; i < data.length; i++) {
            var index = products.indexOf(data[i]['product']);
            if (index == -1)
                products.push(data[i]['product'])
        }

        res.status(200).json({
            "data": products
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "info.ts"
        })
    }
}