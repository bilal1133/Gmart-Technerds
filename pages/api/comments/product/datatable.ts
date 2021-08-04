import DataTablesModel from "../../../../models/DataTables";
import CategoriesModel from "../../../../models/Categories";
import {Not} from "typeorm";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var column = [
            "id_product",
            "user",
            "comment",
            "active",
            "options"
        ];

        let dataTablesModel = new DataTablesModel();
        var id_shop = post['id_shop'];

        var totalData
        if (id_shop == 0)
            totalData = await dataTablesModel.getCount('ProductComments');
        else {
            totalData = await dataTablesModel.getCount('ProductComments', 'Products.shop = "' + id_shop + '"', ['ProductComments.product', 'Products']);
        }

        var totalFiltered = totalData;
        var draw: number = post.draw;

        var limit: number = post.length;
        var start: number = post.start;
        var order = column[post['order[0][column]']];
        var dir = post['order.0.dir'];
        let datas = null;

        if (post['search[value]'].length == 0) {
            if (id_shop == 0)
                datas = await dataTablesModel.getByLimitAndOrder('ProductComments', limit, start, order, dir, ['ProductComments.user', 'ProductComments.product'], ['Users', 'Products']);
            else {
                var searchQuery = 'Products.shop = "' + id_shop + '"';
                datas = await dataTablesModel.getByLimitAndSearch('ProductComments', limit, start, order, dir, searchQuery, ['ProductComments.user', 'ProductComments.product'], ['Users', 'Products']);
            }
        } else {
            var search = post['search[value]'];
            if (id_shop == 0)
                var searchQuery = 'ProductComments.comment_text Like "%' + search + '%"';
            else
                var searchQuery = 'ProductComments.comment_text Like "%' + search + '%" AND Products.shop = "' + id_shop + '"';
            datas = await dataTablesModel.getByLimitAndSearch('ProductComments', limit, start, order, dir, searchQuery, ['ProductComments.user', 'ProductComments.product'], ['Users', 'Products']);

            totalFiltered = await dataTablesModel.getCountSearch('ProductComments', searchQuery, [], []);
        }

        var responseData = [];
        if (datas != null && datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
                var nestedData = {};
                nestedData["product_id"] = datas[i]['product']["id"];
                nestedData["user"] = datas[i]['user']["surname"] + " " + datas[i]['user']["surname"];
                nestedData["comment"] = datas[i]['comment_text'];
                nestedData["star"] = datas[i]['star'];
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