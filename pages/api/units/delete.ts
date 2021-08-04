import Units from "../../../models/Units";

export default async function handler(req, res) {
    try {
        let ids = req.body.ids;
        const units = new Units();

        for(let i in ids) {
            await units.removeUnitsByParams({id: ids[i]});
        }

        res.status(200).json({
            "data": {
                "success": true
            }
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "delete.ts"
        })
    }
}