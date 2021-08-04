import Banners from "../../../models/Banners";

export default async function handler(req, res) {
    try {
        const banner_id = req.body.id;

        if (!banner_id || banner_id == 'undefined') {
            res.status(200).json({
                "logged": false,
                "error": "id is empty",
            })
        }
        const banners = new Banners();
        let data = await banners.getBannersByParams({
            where: {
                id: banner_id
            },
            relations: ['lang', 'lang.id_lang', 'products', 'products.id_product','products.id_product.lang']
        });

        res.status(200).json({
            "data": data[0]
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "bannerInfo.ts"
        })
    }
}