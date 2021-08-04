import TimeUnits from "../../../models/TimeUnits";

export default async function handler(req, res) {
    try {
        const timeUnits = new TimeUnits();
        let data = await timeUnits.getTimeUnitsByParams({
            where: {
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
            "file": "info.ts"
        })
    }
}