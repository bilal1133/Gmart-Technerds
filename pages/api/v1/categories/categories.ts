import Categories from "../../../../models/Categories";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var id_shop = post['id_shop'];
        var parent = post['parent'];

        const categories = new Categories();
        var data = await categories.getCategoriesByParams({
            relations: ["lang"], where: {
                active: 1,
                parent: parent,
                shop: {
                    id: id_shop
                }
            }
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