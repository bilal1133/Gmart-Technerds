import DataTablesModel from "../../../../models/DataTables";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var column = [
            "id_order",
            "user",
            "comment",
            "active",
            "options"
        ];

        let dataTablesModel = new DataTablesModel();
        var id_shop = post['id_shop'];

        var totalData
        if (id_shop == 0)
            totalData = await dataTablesModel.getCount('OrderComments');
        else
            totalData = await dataTablesModel.getCount('OrderComments', 'Orders.shops = ' + id_shop, ['OrderComments.id_order', 'Orders']);
        var totalFiltered = totalData;
        var draw: number = post.draw;

        var limit: number = post.length;
        var start: number = post.start;
        var order = column[post['order[0][column]']];
        var dir = post['order.0.dir'];
        let datas = null;

        if (post['search[value]'].length == 0) {
            if (id_shop == 0)
                datas = await dataTablesModel.getByLimitAndOrder('OrderComments', limit, start, order, dir, ['OrderComments.user', 'OrderComments.order'], ['UsersClient', 'Orders']);
            else {
                var searchQuery = 'Orders.shops = ' + id_shop;
                datas = await dataTablesModel.getByLimitAndSearch('OrderComments', limit, start, order, dir, searchQuery, ['OrderComments.user', 'OrderComments.order'], ['UsersClient', 'Orders']);
            }
        } else {
            var search = post['search[value]'];
            if (id_shop == 0)
                var searchQuery = 'OrderComments.comment_text Like "%' + search + '%"';
            else
                var searchQuery = 'OrderComments.comment_text Like "%' + search + '%" AND Orders.shops = ' + id_shop;
            datas = await dataTablesModel.getByLimitAndSearch('OrderComments', limit, start, order, dir, searchQuery, ['OrderComments.user', 'OrderComments.order'], ['UsersClient', 'Orders']);

            totalFiltered = await dataTablesModel.getCountSearch('OrderComments', searchQuery, [], []);
        }

        var responseData = [];
        if (datas != null && datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
                var nestedData = {};
                nestedData["order_id"] = datas[i]['order']["id"];
                nestedData["user"] = datas[i]['user']["surname"] + " " + datas[i]['user']["surname"];
                nestedData["comment"] = datas[i]['comment_text'];
                nestedData["active"] = datas[i]['active'];
                nestedData["options"] = "";
                nestedData["checkbox"] = "";

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