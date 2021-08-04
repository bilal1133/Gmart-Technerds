import Banners from "../../../../models/Banners";
import ProductsModel from "../../../../models/Products";
import CouponModel from "../../../../models/Coupon";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var id = post['id'];
        const limit = post['limit'];
        const offset = post['offset'];

        const banners = new Banners();
        var bannerProducts = await banners.getBannerProductsByParams(id, limit, offset) as any[];

        const productsModel = new ProductsModel();
        const coupon = new CouponModel();
        var products = [];
        if (bannerProducts.length > 0) {
            for (let i = 0; i < bannerProducts.length; i++) {
                let product = await productsModel.getProductsByParams({
                    where: {
                        active: 1,
                        id: bannerProducts[i]["id_product"],
                    }, relations: ["lang", "images"]
                }) as any[];

                if (product.length > 0) {
                    product[0]["has_coupon"] = await coupon.hasCoupon(bannerProducts[i]["id_product"]);
                    products.push(product[0]);
                }
            }
        }


        res.status(200).json({
            "data": products
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "parent.ts"
        })
    }
}