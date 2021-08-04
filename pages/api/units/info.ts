import Units from "../../../models/Units";

export default async function handler(req, res) {
    try {
        const id_unit = req.body.id;

        if (!id_unit || id_unit == 'undefined') {
            res.status(200).json({
                "logged": false,
                "error": "id is empty",
            })
        }

        const units = new Units();
        let data = await units.getUnitsByParams({
            where: {
                id: id_unit
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