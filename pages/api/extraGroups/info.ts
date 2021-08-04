import ExtrasGroup from "../../../models/ExtrasGroup";

export default async function handler(req, res) {
    try {
        const id_extraGroup = req.body.id;

        if (!id_extraGroup || id_extraGroup == 'undefined') {
            res.status(200).json({
                "logged": false,
                "error": "id is empty",
            })
        }

        const extrasGroup = new ExtrasGroup();
        let data = await extrasGroup.getExtraGroupsByParams({
            where: {
                id: id_extraGroup
            }, relations: ["lang", "lang.lang"]
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