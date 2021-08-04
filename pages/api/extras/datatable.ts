import DataTablesModel from "../../../models/DataTables";
import LanguagesModel from "../../../models/Languages";
import ProductsModel from "../../../models/Products";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var column = [
            "ProductExtras.id",
            "Products.id",
            "name",
            "image",
            "extraGroup",
            "price",
            "active",
            "options"
        ];

        let dataTablesModel = new DataTablesModel();
        var id_shop = post['id_shop'];
        var totalData = await dataTablesModel.getCount('ProductExtras');
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
            datas = await dataTablesModel.getByLimitAndOrder('ProductExtras', limit, start, order, dir, ['ProductExtras.lang', 'ProductExtras.product', 'ProductExtras.extraGroup'], ['ProductExtrasLanguage', "Products", "ProductExtraGroups"], ["lang=" + id_lang, '', '']);
        } else {
            var search = post['search[value]'];
            var searchQuery = 'ProductExtrasLanguage.name Like "%' + search + '%"';
            datas = await dataTablesModel.getByLimitAndSearch('ProductExtras', limit, start, order, dir, searchQuery, ['ProductExtras.lang', 'ProductExtras.product', 'ProductExtras.extraGroup'], ['ProductExtrasLanguage', "Products", "ProductExtraGroups"], ["lang=" + id_lang, '', '']);

            totalFiltered = await dataTablesModel.getCountSearch('ProductExtras', searchQuery, ['ProductExtras.lang', 'ProductExtras.product', 'ProductExtras.extraGroup'], ['ProductExtrasLanguage', "Products", "ProductExtraGroups"], ["lang=" + id_lang, '', '']);
        }

        const productsModel = new ProductsModel();
        var responseData = [];
        if (datas != null && datas != 'undefined' && datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
                var nestedData = {};
                nestedData["id"] = datas[i]['id'];

                var productName = "";
                if (datas[i]['product'] != null) {
                    let productData = await productsModel.getProductsByParams({
                        where: {
                            id: datas[i]['product']['id']
                        },
                        relations: ["lang"]
                    }) as any[];

                    if(productData.length > 0)
                        productName = productData[0]['lang'][0]['name'];
                }

                nestedData["product"] = productName;
                nestedData["name"] = datas[i]['lang'].length > 0 ? datas[i]['lang'][0]['name'] : "";
                nestedData["image"] = datas[i]['image_url'];
                nestedData["extraGroup"] = datas[i]['extraGroup'] != null ? datas[i]['extraGroup']['id'] : "";
                nestedData["price"] = datas[i]['price'];
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
            "file": "datatable.ts"
        })
    }
}