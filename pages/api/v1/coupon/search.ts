import Coupon from "../../../../models/Coupon";

export default async function handler(req, res) {
    try {
        const id_product = req.body.id_product;
        const code = req.body.code;

        const coupon = new Coupon();
        let data = await coupon.getCouponByProductId(id_product, code) as any[];

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