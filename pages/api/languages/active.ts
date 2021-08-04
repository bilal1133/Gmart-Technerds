import Languages from "../../../models/Languages";

export default async function handler(req, res) {
    try {
        const languages = new Languages();
        let data = await languages.getLanguageByParams({ active: 1 });
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