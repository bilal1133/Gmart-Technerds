import Extras from "../../../models/Extras";

export default async function handler(req, res) {
    try {
        let ids = req.body.ids;
        const extras = new Extras();

        for(let i in ids) {
            await extras.removeExtrasByParams({id: ids[i]});
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