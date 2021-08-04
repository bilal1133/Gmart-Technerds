import Coupon from "../../../models/Coupon";

export default async function handler(req, res) {
    try {
        const id_coupon = req.body.id;

        if (!id_coupon || id_coupon == 'undefined') {
            res.status(200).json({
                "logged": false,
                "error": "id is empty",
            })
        }

        const coupon = new Coupon();
        let data = await coupon.getCouponByParams({
            where: {
                id: id_coupon
            }, relations: ["lang", "shop", "products", "lang.lang", "products.product","products.product.lang"]
        });

        res.status(200).json({
            "data": data[0]
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "info.ts"
        })
    }
}