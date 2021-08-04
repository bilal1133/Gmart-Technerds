import Extras from "../../../models/Extras";

export default async function handler(req, res) {
    try {
        let id = req.body.id;

        const extras = new Extras();
        let data = await extras.removeExtrasByParams({id: id});

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