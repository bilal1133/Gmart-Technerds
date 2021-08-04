import GlobalSettings from "../../../models/GlobalSettings";

export default async function handler(req, res) {
    let post = req.body;
    try {
        let mobileLangParams = new GlobalSettings();
        let data = await mobileLangParams.saveSetting(post);

        res.status(200).json({
            "data": data
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "brands.ts"
        })
    }
}