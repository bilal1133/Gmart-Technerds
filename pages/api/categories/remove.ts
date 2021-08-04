import Category from "../../../models/Categories";

export default async function handler(req, res) {
    try {
        let id = req.body.id;

        const categories = new Category();
        let data = await categories.removeCategoriesByParams({id: id});

        res.status(200).json({
            "data": data
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "remove.ts"
        })
    }
}