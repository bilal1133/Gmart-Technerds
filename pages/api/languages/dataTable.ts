import DataTablesModel from "../../../models/DataTables";

export default async function handler(req, res) {
    const post = req.body;
    try {
        var column = [
            "name",
            "short_name",
            "image",
            "active"
        ];

        let dataTablesModel = new DataTablesModel();
        var totalData = await dataTablesModel.getCount('Language');
        var totalFiltered = totalData;
        var draw: number = post.draw;

        var limit: number = post.length;
        var start: number = post.start;
        var order = column[post['order[0][column]']];
        var dir = post['order.0.dir'];
        let datas = null;

        if (post['search[value]'].length == 0) {
            datas = await dataTablesModel.getByLimitAndOrder('Language', limit, start, order, dir, [], []);
        } else {
            var search = post['search[value]'];
            var searchQuery = 'Language.name Like "%' + search + '%"';
            datas = await dataTablesModel.getByLimitAndSearch('Language', limit, start, order, dir, searchQuery, [], []);

            totalFiltered = await dataTablesModel.getCountSearch('Language', searchQuery, [], []);
        }

        var responseData = [];
        if (datas != null && datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
                var nestedData = {};
                nestedData["id"] = datas[i]['id'];
                nestedData["name"] = datas[i]['name'];
                nestedData["short_name"] = datas[i]['short_name'];
                nestedData["image"] = datas[i]['image_url'];
                nestedData["active"] = datas[i]['active'];
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