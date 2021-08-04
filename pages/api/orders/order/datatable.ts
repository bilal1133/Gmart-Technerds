import DataTablesModel from "../../../../models/DataTables";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var column = [
            "Orders.id",
            "user",
            "amount",
            "discount",
            "order_status",
            "payment_status",
            "payment_method",
            "comment",
            "active",
            "options"
        ];

        let dataTablesModel = new DataTablesModel();
        var id_shop = post['id_shop'];
        var totalData;
        if (id_shop == 0)
            totalData = await dataTablesModel.getCount('Orders');
        else
            totalData = await dataTablesModel.getCount('Orders', 'Orders.shops = ' + id_shop);
        var totalFiltered = totalData;
        var draw: number = post.draw;

        var limit: number = post.length;
        var start: number = post.start;
        var order = column[post['order[0][column]']];
        var dir = post['order.0.dir'];
        let datas = null;

        if (post['search[value]'].length == 0) {
            if (id_shop == 0)
                datas = await dataTablesModel.getByLimitAndOrder('Orders', limit, start, order, dir, ['Orders.user', 'Orders.order_status', 'Orders.payment_status', 'Orders.payment_method'], ['Users', 'OrderStatus', 'PaymentStatus', 'PaymentMethod']);
            else {
                var searchQuery = 'Orders.shops = ' + id_shop;
                datas = await dataTablesModel.getByLimitAndSearch('Orders', limit, start, order, dir, searchQuery, ['Orders.user', 'Orders.order_status', 'Orders.payment_status', 'Orders.payment_method'], ['Users', 'OrderStatus', 'PaymentStatus', 'PaymentMethod']);
            }
        } else {
            var search = post['search[value]'];
            if (id_shop == 0)
                var searchQuery = '';
            else
                var searchQuery = 'Orders.shops = ' + id_shop;
            datas = await dataTablesModel.getByLimitAndSearch('Orders', limit, start, order, dir, searchQuery, ['Orders.user', 'Orders.order_status', 'Orders.payment_status', 'Orders.payment_method'], ['Users', 'OrderStatus', 'PaymentStatus', 'PaymentMethod']);

            totalFiltered = await dataTablesModel.getCountSearch('Orders', searchQuery, [], []);
        }

        var responseData = [];
        if (datas != null && datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
                var nestedData = {};
                nestedData["id"] = datas[i]['id'];
                nestedData["user"] = datas[i]['user']['surname'] + " " + datas[i]['user']['name'];
                nestedData["amount"] = datas[i]['total_sum'];
                nestedData["order_status"] = "<span class='" + datas[i]['order_status']['class'] + "'><i class='" + datas[i]['order_status']['icon'] + "'></i> " + datas[i]['order_status']['name'] + "</span>";
                nestedData["payment_status"] = "<span class='" + datas[i]['payment_status']['class'] + "'><i class='" + datas[i]['payment_status']['icon'] + "'></i> " + datas[i]['payment_status']['name'] + "</span>";
                nestedData["payment_method"] = datas[i]['payment_method']['name'];

                let date = new Date(datas[i]['created_at']);

                nestedData["order_date"] = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
                nestedData["delivery_date"] = datas[i]['delivery_date'];
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