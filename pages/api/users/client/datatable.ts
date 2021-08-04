import DataTables from "../../../../models/DataTables";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var column = [
            "surname",
            "name",
            "phone",
            "active",
            "options"
        ];

        let dataTablesModel = new DataTables();
        var totalData = await dataTablesModel.getCount('UsersClient');
        var totalFiltered = totalData;
        var draw: number = post.draw;

        var limit: number = post.length;
        var start: number = post.start;
        var order = column[post['order[0][column]']];
        var dir = post['order.0.dir'];
        let datas = null;

        if (post['search[value]'].length == 0) {
            datas = await dataTablesModel.getByLimitAndOrder('UsersClient', limit, start, order, dir, [], []);
        } else {
            var search = post['search[value]'];
            var searchQuery = 'UsersClient.name Like "%' + search + '%" or UsersClient.surname Like "%' + search + '%"';
            datas = await dataTablesModel.getByLimitAndSearch('UsersClient', limit, start, order, dir, searchQuery, [], []);

            totalFiltered = await dataTablesModel.getCountSearch('UsersClient', searchQuery, [], []);
        }

        var responseData = [];
        if (datas != null && datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
                var nestedData = {};
                nestedData["id"] = datas[i]['id'];
                nestedData["surname"] = datas[i]['surname'];
                nestedData["name"] = datas[i]['name'];
                nestedData["phone"] = datas[i]['phone'];
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