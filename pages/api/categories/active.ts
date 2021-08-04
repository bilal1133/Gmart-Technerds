import Category from "../../../models/Categories";
import {Not} from "typeorm";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var id_shop = post['id_shop'];

        const categories = new Category();
        if (id_shop == 0)
            var data = await categories.getCategoriesByParams({
                relations: ["lang"], where: {
                    active: 1,
                    parent: Not(-1)
                }
            });
        else
            var data = await categories.getCategoriesByParams({
                relations: ["lang"], where: {
                    active: 1,
                    parent: Not(-1),
                    shop: id_shop
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