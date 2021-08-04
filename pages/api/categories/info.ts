import Category from "../../../models/Categories";

export default async function handler(req, res) {
    try {
        const category_id = req.body.id;

        if (!category_id || category_id == 'undefined') {
            res.status(200).json({
                "logged": false,
                "error": "id is empty",
            })
        }

        const categories = new Category();
        let data = await categories.getCategoriesByParams({
            where: {
                id: category_id
            }, relations: ["lang", "shop", "lang.id_lang"]
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