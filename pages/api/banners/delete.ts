import Banners from "../../../models/Banners";

export default async function handler(req, res) {
    try {
        let ids = req.body.ids;
        const banners = new Banners();

        for(let i in ids) {
            await banners.removeBannersByParams({id: ids[i]});
        }

        res.status(200).json({
            "data": {
                "success": true
            }
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "banners.ts"
        })
    }
}