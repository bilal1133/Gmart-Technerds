import DataTablesModel from "../../../models/DataTables";
import LanguagesModel from "../../../models/Languages";
import Shops from "../../../models/Shops";
import CategoriesModel from "../../../models/Categories";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var column = [
            "Categories.id",
            "name",
            "image",
            "parent_id",
            "active",
            "options"
        ];

        let dataTablesModel = new DataTablesModel();
        var id_shop = post['id_shop'];
        var totalData;
        if (id_shop == 0)
            totalData = await dataTablesModel.getCount('Categories');
        else
            totalData = await dataTablesModel.getCount('Categories', 'Shops.id = ' + id_shop, ['Categories.shop', 'Shops']);
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
                datas = await dataTablesModel.getByLimitAndOrder('Categories', limit, start, order, dir, ['Categories.lang', 'Categories.shop'], ['CategoriesLang', 'Shops'], ["id_lang=" + id_lang, ""]);
            else {
                var searchQuery = 'Shops.id = ' + id_shop;
                datas = await dataTablesModel.getByLimitAndSearch('Categories', limit, start, order, dir, searchQuery, ['Categories.lang', 'Categories.shop'], ['CategoriesLang', 'Shops'], ["id_lang=" + id_lang, ""]);
            }
        } else {
            var search = post['search[value]'];
            if (id_shop == 0)
                var searchQuery = 'CategoriesLanguage.name Like "%' + search + '%"';
            else
                var searchQuery = 'CategoriesLanguage.name Like "%' + search + '%" AND Shops.id = ' + id_shop;
            datas = await dataTablesModel.getByLimitAndSearch('Categories', limit, start, order, dir, searchQuery, ['Categories.lang', 'Categories.shop'], ['CategoriesLang', 'Shops'], ["id_lang=" + id_lang, ""]);

            totalFiltered = await dataTablesModel.getCountSearch('Categories', searchQuery, ['Categories.lang'], ['CategoriesLang'], ["id_lang=" + id_lang, ""]);
        }

        const shops = new Shops();
        const categories = new CategoriesModel();
        var responseData = [];
        if (datas != null && datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
                var nestedData = {};
                nestedData["id"] = datas[i]['id'];
                nestedData["name"] = datas[i]['lang'].length > 0 ? datas[i]['lang'][0]['name'] : "";
                nestedData["image"] = datas[i]['image_url'];

                var shopData = await shops.getShopsByParam({
                    where: {
                        id: datas[i]['shop']["id"]
                    }, relations: ["lang"]
                }) as any[];

                var categoriesData = await categories.getCategoriesByParams({
                    where: {
                        id: datas[i]['parent']
                    }, relations: ["lang"]
                }) as any[];

                nestedData["shop"] = shopData.length > 0 ? shopData[0]["lang"][0]["name"] : "";
                nestedData["parent_id"] = categoriesData.length > 0 && categoriesData[0] != null && categoriesData[0]['lang'].length > 0 ? categoriesData[0]['lang'][0]['name'] : "";
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
            "file": "brands.ts"
        })
    }
}