import DataTablesModel from "../../../../models/DataTables";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var column = [
            "user",
            "address",
            "lat",
            "lng",
            "default",
            "active",
            "options"
        ];

        let dataTablesModel = new DataTablesModel();
        var totalData = await dataTablesModel.getCount('UserAddresses');
        var totalFiltered = totalData;
        var draw: number = post.draw;

        var limit: number = post.length;
        var start: number = post.start;
        var order = column[post['order[0][column]']];
        var dir = post['order.0.dir'];
        let datas = null;

        if (post['search[value]'].length == 0) {
            datas = await dataTablesModel.getByLimitAndOrder('UserAddresses', limit, start, order, dir, ["UserAddresses.user"], ["Users"]);
        } else {
            var search = post['search[value]'];
            var searchQuery = 'UserAddresses.address Like "%' + search + '%"';
            datas = await dataTablesModel.getByLimitAndSearch('UserAddresses', limit, start, order, dir, searchQuery, ["UserAddresses.user"], ["Users"]);

            totalFiltered = await dataTablesModel.getCountSearch('UserAddresses', searchQuery, [], []);
        }

        var responseData = [];
        if (datas != null && datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
                var nestedData = {};
                nestedData["user"] = datas[i]['user']['surname'] + " " + datas[i]['user']['name'];
                nestedData["address"] = datas[i]['address'];
                nestedData["id"] = datas[i]['id'];
                nestedData["lat"] = datas[i]['latitude'];
                nestedData["lng"] = datas[i]['longtitude'];
                nestedData["default"] = datas[i]['default'];
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
            "file": "datatable.ts"
        })
    }
}