import Units from "../../../models/Units";

export default async function handler(req, res) {
    try {
        const units = new Units();
        let data = await units.getUnitsByParams({
            where: {
                active: 1
            }, relations: ["lang", "lang.lang"]
        });

        res.status(200).json({
            "data": data
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "info.ts"
        })
    }
}