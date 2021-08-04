import LanguagesModel from "../../../models/Languages";
import DataTablesModel from "../../../models/DataTables";
import MobileParamsLangModel from "../../../models/MobileParamsLang";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var column = [
            "MobileParams.name",
            "MobileParams.percentage",
            "MobileParams.optios",
        ];

        const languages = new LanguagesModel();
        var data: any = await languages.getLanguageByParams({active: 1});

        let dataTablesModel = new DataTablesModel();
        var totalData = await dataTablesModel.getCount('MobileParams') as number;
        var draw: number = post.draw;

        let mobileParamsLang = new MobileParamsLangModel();

        var responseData = [];
        if (data != null && data.length > 0) {
            for (let i = 0; i < data.length; i++) {

                let mobileParamsLangData = await mobileParamsLang.getMobileParamsLangByParams({
                    where: {
                        id_lang: data[i]['id']
                    }
                }) as any[];
                var translatedData = mobileParamsLangData.length;

                var nestedData = {};
                nestedData["id"] = data[i]['id'];
                nestedData["name"] = data[i]['name'];
                nestedData["percentage"] = Math.round((translatedData/totalData)*100) + " %";
                nestedData["submit"] = '';
                responseData.push(nestedData);
            }
        }

        res.status(200).json({
            "draw": draw,
            "recordsTotal": data.length,
            "recordsFiltered": data.length,
            "data": responseData
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "datatable.ts"
        })
    }
}