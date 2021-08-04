import Products from "../../../../models/Products";
import Comments from "../../../../models/Comments";
import Extras from "../../../../models/Extras";

export default async function handler(req, res) {
    let post = req.body;
    try {
        const id = post['id'];
        const products = new Products();
        var params = {
            where: {
                id: id
            }, relations: ["images", "unit", "unit.lang", "brand", "category", "category.lang"]
        };

        let data = await products.getProductsByParams(params) as any[];

        const commentModel = new Comments();
        let commentsData = await commentModel.getProductCommentsByParams({
            where: {
                id_product: id
            },
            take: 5,
            relations: ["user"]
        }) as any[];

        const extrasModel = new Extras();
        let extras = await extrasModel.getExtrasByParams({
            where: {
                product: {
                    id: id
                }
            },
            relations: ["extraGroup", "extraGroup.lang", "lang"]
        });

        res.status(200).json({
            "data": data[0],
            "comments": commentsData,
            "extras": extras
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "brands.ts"
        })
    }
}
