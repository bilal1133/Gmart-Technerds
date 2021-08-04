import ExtrasGroup from "../../../models/ExtrasGroup";

export default async function handler(req, res) {
    try {
        let ids = req.body.ids;
        const extrasGroup = new ExtrasGroup();

        for(let i in ids) {
            await extrasGroup.removeExtraGroupsByParams({id: ids[i]});
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