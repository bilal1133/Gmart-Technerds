import TimeUnits from "../../../models/TimeUnits";

export default async function handler(req, res) {
    try {
        const id_time_unit = req.body.id;

        if (!id_time_unit || id_time_unit == 'undefined') {
            res.status(200).json({
                "logged": false,
                "error": "id is empty",
            })
        }

        const timeUnits = new TimeUnits();
        let data = await timeUnits.getTimeUnitsByParams({
            where: {
                id: id_time_unit
            }, relations: ["shop"]
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