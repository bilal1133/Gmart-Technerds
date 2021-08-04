import ExtrasGroup from "../../../models/ExtrasGroup";

export default async function handler(req, res) {
    try {
        const extrasGroup = new ExtrasGroup();
        var data = await extrasGroup.getExtraGroupsByParams({
                relations: ["lang"], where: {
                    active: 1
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