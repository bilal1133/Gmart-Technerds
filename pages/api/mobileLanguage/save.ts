import MobileParamsLangModel from "../../../models/MobileParamsLang";

export default async function handler(req, res) {
    let post = req.body;
    try {
        let mobileLangParams = new MobileParamsLangModel();
        let id_param = post.id_param;
        let dataArray = post.data;

        var data = null;
        for (let i = 0; i < dataArray.length; i++) {
            data = mobileLangParams.saveMobileParams(id_param, dataArray[i].id_lang, dataArray[i].text);
        }

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