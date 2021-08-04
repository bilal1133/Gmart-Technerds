import Extras from "../../../models/Extras";

export default async function handler(req, res) {
    try {
        const id_extra = req.body.id;

        if (!id_extra || id_extra == 'undefined') {
            res.status(200).json({
                "logged": false,
                "error": "id is empty",
            })
        }

        const extras = new Extras();
        let data = await extras.getExtrasByParams({
            where: {
                id: id_extra
            }, relations: ["lang", "lang.lang", "shop", "product", "extraGroup"]
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