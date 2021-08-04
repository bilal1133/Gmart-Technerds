import Languages from "../../../models/Languages";

export default async function handler(req, res) {
    try {
        const lang_id = req.body.id;

        if (!lang_id || lang_id == 'undefined') {
            res.status(200).json({
                "logged": false,
                "error": "id is empty",
            })
        }

        const languages = new Languages();
        let data = await languages.getLanguageByParams({ id: lang_id });

        res.status(200).json({
            "data": data[0]
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "userInfo.ts"
        })
    }
}