import Units from "../../../models/Units";

export default async function handler(req, res) {
    try {
        let id = req.body.id;

        const units = new Units();
        let data = await units.removeUnitsByParams({id: id});

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