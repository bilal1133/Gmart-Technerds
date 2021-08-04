import DataTablesModel from "../../../models/DataTables";
import MobileParamsLangModel from "../../../models/MobileParamsLang";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var column = [
            "MobileParams.name",
            "MobileParams.percentage",
            "MobileParams.options",
        ];

        let dataTablesModel = new DataTablesModel();
        var totalData = await dataTablesModel.getCount('MobileParams');
        var totalFiltered = totalData;
        var draw: number = post.draw;

        var limit: number = post.length;
        var start: number = post.start;
        var order = column[post['order[0][column]']];
        var dir = post['order.0.dir'];
        let datas = null;

        if (post['search[value]'].length == 0) {
            datas = await dataTablesModel.getByLimitAndOrder('MobileParams', limit, start, order, dir, [], []);
        } else {
            var search = post['search[value]'];
            var searchQuery = 'MobileParams.name Like "%' + search + '%"';
            datas = await dataTablesModel.getByLimitAndSearch('MobileParams', limit, start, order, dir, searchQuery, [], []);

            totalFiltered = await dataTablesModel.getCountSearch('MobileParams', searchQuery, [], []);
        }

        let mobileParamsLang = new MobileParamsLangModel();
        let mobileParamsLangData = await mobileParamsLang.getMobileParamsLangByParams({
            where: {
                id_lang: post.id
            },
            relations: ['id_param']
        }) as any[];

        var responseData = [];
        if (datas != null && datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
                var nestedData = {};
                nestedData["id"] = datas[i]['id'];
                nestedData["name"] = datas[i]['name'];

                let index = mobileParamsLangData.findIndex((param_lang) => {
                    return param_lang.id_param.id == datas[i]['id'];
                });

                if (index > -1)
                    nestedData['translation'] = "<input type='text' lang_id='" + post.id + "' class='form-control input_" + datas[i]["id"] + "' value='" + mobileParamsLangData[index].name + "'/>";
                else
                    nestedData['translation'] = "<input type='text' lang_id='" + post.id + "' class='form-control input_" + datas[i]["id"] + "' />";
                nestedData["submit"] = '<input type="button" param_id="' + datas[i]["id"] + '" class="btn btn-success save_data" value="Save"/>';
                responseData.push(nestedData);
            }
        }

        res.status(200).json({
            "draw": draw,
            "recordsTotal": totalData,
            "recordsFiltered": totalFiltered,
            "data": responseData
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "brands.ts"
        })
    }
}