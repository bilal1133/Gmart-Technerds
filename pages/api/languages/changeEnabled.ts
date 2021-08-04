import Languages from "../../../models/Languages";

export default async function handler(req, res) {
    try {
        let id = req.body.id;
        const languages = new Languages();
        let data = await languages.changeEnabled(id);

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