import TimeUnits from "../../../../models/TimeUnits";

export default async function handler(req, res) {
    try {
        var id_shop = req.body.id_shop;
        if (id_shop > 0) {
            const timeUnits = new TimeUnits();
            var data = await timeUnits.getTimeUnitsByParams({
                where: {
                    active: 1,
                    shop: {
                        id: id_shop
                    }
                }
            });
            res.status(200).json({
                "data": data
            })
        } else {
            res.status(200).json({
                "data": []
            })
        }
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "info.ts"
        })
    }
}