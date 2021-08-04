import TimeUnits from "../../../models/TimeUnits";

export default async function handler(req, res) {
    try {
        let id = req.body.id;

        const timeUnits = new TimeUnits();
        let data = await timeUnits.saveTimeUnit(req.body);

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