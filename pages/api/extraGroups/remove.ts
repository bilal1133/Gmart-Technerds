import ExtrasGroup from "../../../models/ExtrasGroup";

export default async function handler(req, res) {
    try {
        let id = req.body.id;

        const extrasGroup = new ExtrasGroup();
        let data = await extrasGroup.removeExtraGroupsByParams({id: id});

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