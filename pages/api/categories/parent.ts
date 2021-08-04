import Category from "../../../models/Categories";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var id_shop = post['id_shop'];

        const categories = new Category();
        if (id_shop == 0)
            var data = await categories.getCategoriesByParams({
                where: {
                    parent: -1
                }, relations: ["lang"]
            });
        else
            var data = await categories.getCategoriesByParams({
                where: {
                    parent: -1,
                    id_shop: id_shop
                }, relations: ["lang"]
            });

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