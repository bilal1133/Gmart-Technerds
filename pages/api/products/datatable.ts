import DataTablesModel from "../../../models/DataTables";
import Categories from "../../../models/Categories";
import {Not} from "typeorm";
import LanguagesModel from "../../../models/Languages";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var column = [
            "name",
            "description",
            "image",
            "category",
            "amount",
            "price",
            "discount",
            "qr_code",
            "active",
            "options"
        ];

        let dataTablesModel = new DataTablesModel();
        var id_shop = post['id_shop'];
        var totalData;
        var categoryIds = "";
        if (id_shop == 0)
            totalData = await dataTablesModel.getCount('Products');
        else {
            const categories = new Categories();
            let data = await categories.getCategoriesByParams({
                where: {
                    shop: {
                        id: id_shop
                    },
                    parent: Not(-1)
                },
                relations: ["shop"]
            }) as any;

            for (let i = 0; i < data.length; i++) {
                categoryIds += data[i].id + ",";
            }
            categoryIds = categoryIds.substring(0, categoryIds.length - 1);

            var searchText = "";
            if (categoryIds.length > 0)
                searchText = 'Products.id_category IN (' + categoryIds + ')';

            totalData = await dataTablesModel.getCount('Products', searchText);
        }

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
                datas = await dataTablesModel.getByLimitAndOrder('Products', limit, start, order, dir, ['Products.lang', 'Products.images', 'Products.category'], ['ProductsLanguage', 'ProductsImages', 'Categories'], ["id_lang=" + id_lang, "", ""]);
            else {
                var searchQuery = "";
                if (categoryIds.length > 0)
                    searchQuery = 'Products.id_category IN (' + categoryIds + ')';
                datas = await dataTablesModel.getByLimitAndSearch('Products', limit, start, order, dir, searchQuery, ['Products.lang', 'Products.images', 'Products.category'], ['ProductsLanguage', 'ProductsImages', 'Categories'], ["id_lang=" + id_lang, "", ""]);
            }
        } else {
            var search = post['search[value]'];
            if (id_shop == 0)
                var searchQuery = 'ProductsLanguage.name Like "%' + search + '%" OR ProductsLanguage.description Like "%' + search + '%"';
            else {
                var searchQuery = 'ProductsLanguage.name Like "%' + search + '%" OR ProductsLanguage.description Like "%' + search + '%"';
                if (categoryIds.length > 0)
                    searchQuery = 'ProductsLanguage.name Like "%' + search + '%" OR ProductsLanguage.description Like "%' + search + '%" AND Products.id_category IN (' + categoryIds + ')';
            }
            datas = await dataTablesModel.getByLimitAndSearch('Products', limit, start, order, dir, searchQuery, ['Products.lang', 'Products.images', 'Products.category'], ['ProductsLanguage', 'ProductsImages', 'Categories'], ["id_lang=" + id_lang, "", ""]);

            totalFiltered = await dataTablesModel.getCountSearch('Products', searchQuery, [], []);
        }

        var responseData = [];
        if (datas != null && datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
                var nestedData = {};
                nestedData["name"] = datas[i]['lang'].length > 0 ? datas[i]['lang'][0]['name'] : "";
                nestedData["description"] = datas[i]['lang'].length > 0 ? datas[i]['lang'][0]['description'] : "";
                nestedData["image"] = datas[i]['images'].length > 0 ? datas[i]['images'][0]['image_url'] : "";
                nestedData["category"] = datas[i]['category'] != null ? datas[i]['category']['image_url'] : "";
                nestedData["amount"] = datas[i]['quantity'];
                nestedData["price"] = datas[i]['price'];
                nestedData["discount"] = datas[i]['discount_price'];
                nestedData["weight"] = datas[i]['weight'];
                nestedData["active"] = datas[i]['active'];
                nestedData["id"] = datas[i]['id'];
                nestedData["options"] = "";

                responseData.push(nestedData);
            }
        }

        res.status(200).json({
            "draw": draw,
            "recordsTotal": totalData,
            "recordsFiltered": totalFiltered,
            "data": responseData,
            "datas": datas
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "brands.ts"
        })
    }
}