import Banners from "../../../../models/Banners";

export default async function handler(req, res) {
    let post = req.body;
    try {
        const id_shop = post['id_shop'];


        var params = {
            relations: ["lang"], where: {
                active: 1,
                shop: {
                    id: id_shop
                }
            }
        };

        const banners = new Banners();
        var data = await banners.getBannersByParams(params);

        res.status(200).json({
            "data": data
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "parent.ts"
        })
    }
}