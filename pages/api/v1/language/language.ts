import MobileParamsLang from '../../../../models/MobileParamsLang'
import LanguagesModel from "../../../../models/Languages";

export default async function handler(req, res) {
    try {
        let lang_code = req.body.lang_code;
        let languagesModel = new LanguagesModel();
        let languages = await languagesModel.getLanguageByParams({
            where: {
                short_name: lang_code
            }
        }) as any[];

        var id_lang = 1;
        if (languages.length > 0)
            id_lang = languages[0]['id'];

        const mobileParamsLang = new MobileParamsLang();
        let data = await mobileParamsLang.getLanguagesWithParams(id_lang) as any[];
        let translations = {};
        if (data.length == 0)
            res.status(200).json({})
        else {
            for (let i = 0; i < data.length; i++) {
                let key = data[i]['mname'];
                var value = data[i]['lname'];
                if(value == null || value.length == 0)
                    value = data[i]['defaultText'];

                translations[key] = value;
            }
            res.status(200).json(translations);
        }
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "language.ts"
        })
    }
}