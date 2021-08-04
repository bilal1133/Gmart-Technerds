import DataTablesModel from "../../../models/DataTables";
import ShopsModel from "../../../models/Shops";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var column = [
            "name",
            "value",
            "default",
            "shop"
        ];

        let dataTablesModel = new DataTablesModel();
        var id_shop = post['id_shop'];
        var totalData;
        if (id_shop == 0)
            totalData = await dataTablesModel.getCount('GlobalSettings');
        else
            totalData = await dataTablesModel.getCount('GlobalSettings', 'shop = ' + id_shop);

        var totalFiltered = totalData;
        var draw: number = post.draw;

        var limit: number = post.length;
        var start: number = post.start;
        var order = column[post['order[0][column]']];
        var dir = post['order.0.dir'];
        let datas = null;

        if (post['search[value]'].length == 0) {
            if (id_shop == 0)
                datas = await dataTablesModel.getByLimitAndOrder('GlobalSettings', limit, start, order, dir, ['GlobalSettings.shop'], ['Shops']);
            else {
                var searchQuery = 'shop = ' + id_shop;
                datas = await dataTablesModel.getByLimitAndSearch('GlobalSettings', limit, start, order, dir, searchQuery, ['GlobalSettings.shop'], ['Shops']);
            }
        } else {
            var search = post['search[value]'];
            if (id_shop == 0)
                var searchQuery = 'name Like "%' + search + '%"';
            else
                var searchQuery = 'name Like "%' + search + '%" AND shop = ' + id_shop;
            datas = await dataTablesModel.getByLimitAndSearch('GlobalSettings', limit, start, order, dir, searchQuery, ['GlobalSettings.shop'], ['Shops']);

            totalFiltered = await dataTablesModel.getCountSearch('GlobalSettings', searchQuery, ['GlobalSettings.shop'], ['Shops']);
        }

        var responseData = [];
        let shopModel = new ShopsModel();
        if (datas != null && datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
                var nestedData = {};

                let shop = await shopModel.getShopsByParam({
                    where: {
                        id: datas[i]['shop']['id']
                    }, relations: ["lang", "lang.id_lang"]
                });

                nestedData["id"] = datas[i]['id'];
                nestedData["name"] = datas[i]['name'];
                nestedData['value'] = "<input type='text' class='form-control input_" + datas[i]["id"] + "' value='" + datas[i]['value'] + "'/>";
                nestedData["options"] = '<input type="button" id="' + datas[i]["id"] + '" class="btn btn-success save_data" value="Save"/>';
                nestedData["shop"] = shop[0]['lang'][0]['name'];
                nestedData["default"] = datas[i]['default'];

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
            "file": "datatable.ts"
        })
    }
}