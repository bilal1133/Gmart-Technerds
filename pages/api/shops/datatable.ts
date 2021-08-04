import DataTablesModel from "../../../models/DataTables";
import LanguagesModel from "../../../models/Languages";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var column = [
            "Shops.id",
            "name",
            "description",
            "image",
            "background_image",
            "type",
            "price",
            "range",
            "active",
            "options"
        ];
        var id_shop = post['id_shop'];
        let dataTablesModel = new DataTablesModel();
        var totalData;
        if (id_shop == 0)
            totalData = await dataTablesModel.getCount('Shops');
        else
            totalData = await dataTablesModel.getCount('Shops', 'Shops.id = ' + id_shop);
        var totalFiltered = totalData;
        var draw: number = post.draw;

        var limit: number = post.length;
        var start: number = post.start;
        var order = column[post['order[0][column]']];
        var dir = post['order.0.dir'];
        let datas = null;

        let langModel = new LanguagesModel();
        let lang = await langModel.getLanguageByParams({
            where: {
                active: 1
            }
        });

        var id_lang = 1;
        if (lang[0] != null)
            id_lang = lang[0]['id']

        if (post['search[value]'].length == 0) {
            if (id_shop == 0)
                datas = await dataTablesModel.getByLimitAndOrder('Shops', limit, start, order, dir, ['Shops.lang'], ['ShopsLang'], ["id_lang=" + id_lang]);
            else {
                var searchQuery = 'Shops.id = ' + id_shop;
                datas = await dataTablesModel.getByLimitAndSearch('Shops', limit, start, order, dir, searchQuery, ['Shops.lang'], ['ShopsLang'], ["id_lang=" + id_lang]);
            }

        } else {
            var search = post['search[value]'];
            if (id_shop == 0)
                var searchQuery = 'ShopsLanguage.name Like "%' + search + '%"';
            else
                var searchQuery = 'ShopsLanguage.name Like "%' + search + '%" AND Shops.id = ' + id_shop;
            datas = await dataTablesModel.getByLimitAndSearch('Shops', limit, start, order, dir, searchQuery, ['Shops.lang'], ['ShopsLang'], ["id_lang=" + id_lang]);

            totalFiltered = await dataTablesModel.getCountSearch('Shops', searchQuery, ['Shops.lang'], ['ShopsLang'], ["id_lang=" + id_lang]);
        }

        var responseData = [];
        if (datas != null && datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
                var nestedData = {};
                nestedData["checkbox"] = "";
                nestedData["id"] = datas[i]['id'];
                nestedData["name"] = datas[i]['lang'][0]['name'];
                nestedData["description"] = datas[i]['lang'][0]['description'];
                nestedData["image"] = datas[i]['logo_url'];
                nestedData["background_image"] = datas[i]['backimage_url'];
                nestedData["type"] = datas[i]['delivery_type'];
                nestedData["price"] = datas[i]['delivery_price'];
                nestedData["range"] = datas[i]['delivery_range'];
                nestedData["active"] = datas[i]['active'];
                nestedData["options"] = "";

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
            "file": "dataTableShop.ts"
        })
    }
}