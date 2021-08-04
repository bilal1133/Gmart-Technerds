import DataTablesModel from "../../../models/DataTables";
import Shops from "../../../models/Shops";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var column = [
            "TimeUnits.id",
            "name",
            "name",
            "sort",
            "active",
            "options"
        ];

        let dataTablesModel = new DataTablesModel();
        var totalData = await dataTablesModel.getCount('TimeUnits');
        var totalFiltered = totalData;
        var draw: number = post.draw;

        var limit: number = post.length;
        var start: number = post.start;
        var order = column[post['order[0][column]']];
        var dir = post['order.0.dir'];
        let datas = null;

        if (post['search[value]'].length == 0) {
            datas = await dataTablesModel.getByLimitAndOrder('TimeUnits', limit, start, order, dir, ['TimeUnits.shop'], ['Shops']);
        } else {
            var search = post['search[value]'];
            var searchQuery = 'TimeUnits.name Like "%' + search + '%"';
            datas = await dataTablesModel.getByLimitAndSearch('TimeUnits', limit, start, order, dir, searchQuery, ['TimeUnits.shop'], ['Shops']);

            totalFiltered = await dataTablesModel.getCountSearch('TimeUnits', searchQuery, ['TimeUnits.shop'], ['Shops']);
        }

        const shops = new Shops();
        var responseData = [];
        if (datas != null && datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
                var nestedData = {};
                nestedData["id"] = datas[i]['id'];
                nestedData["name"] = datas[i]['name'];

                var shopData = await shops.getShopsByParam({
                    where: {
                        id: datas[i]['shop']["id"]
                    }, relations: ["lang"]
                }) as any[];

                nestedData["shop"] = shopData.length > 0 ? shopData[0]["lang"][0]["name"] : "";
                nestedData["sort"] = datas[i]['sort'];
                nestedData["active"] = datas[i]['active'];
                nestedData["options"] = "";
                nestedData["datatable"] = "";

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