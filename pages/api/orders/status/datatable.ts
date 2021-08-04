import DataTablesModel from "../../../../models/DataTables";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var column = [
            "name",
            "icon",
            "class",
            "active",
            "options"
        ];

        let dataTablesModel = new DataTablesModel();
        var totalData = await dataTablesModel.getCount('OrderStatus');
        var totalFiltered = totalData;
        var draw: number = post.draw;

        var limit: number = post.length;
        var start: number = post.start;
        var order = column[post['order[0][column]']];
        var dir = post['order.0.dir'];
        let datas = null;

        if (post['search[value]'].length == 0) {
            datas = await dataTablesModel.getByLimitAndOrder('OrderStatus', limit, start, order, dir, [], []);
        } else {
            var search = post['search[value]'];
            var searchQuery = 'OrderStatus.name Like "%' + search + '%"';
            datas = await dataTablesModel.getByLimitAndSearch('OrderStatus', limit, start, order, dir, searchQuery, [], []);

            totalFiltered = await dataTablesModel.getCountSearch('OrderStatus', searchQuery, [], []);
        }

        var responseData = [];
        if (datas != null && datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
                var nestedData = {};
                nestedData["id"] = datas[i]['id'];
                nestedData["name"] = datas[i]['name'];
                nestedData["icon"] = datas[i]['icon']
                nestedData["class"] = datas[i]['class'];
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