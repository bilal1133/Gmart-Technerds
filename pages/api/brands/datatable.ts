import DataTablesModel from "../../../models/DataTables";
import Shops from "../../../models/Shops";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var column = [
            "Brands.id",
            "name",
            "logo",
            "active",
            "options"
        ];

        let dataTablesModel = new DataTablesModel();
        var id_shop = post['id_shop'];
        var totalData;
        if (id_shop == 0)
            totalData = await dataTablesModel.getCount('Brands');
        else
            totalData = await dataTablesModel.getCount('Brands', 'Brands.id_shop = ' + id_shop);

        var totalFiltered = totalData;
        var draw: number = post.draw;

        var limit: number = post.length;
        var start: number = post.start;
        var order = column[post['order[0][column]']];
        var dir = post['order.0.dir'];
        let datas = null;

        if (post['search[value]'].length == 0) {
            if (id_shop == 0)
                datas = await dataTablesModel.getByLimitAndOrder('Brands', limit, start, order, dir, ['Brands.id_shop'], ['Shops']);
            else {
                var searchQuery = 'id_shop = ' + id_shop;
                datas = await dataTablesModel.getByLimitAndSearch('Brands', limit, start, order, dir, searchQuery, ['Brands.id_shop'], ['Shops']);
            }
        } else {
            var search = post['search[value]'];
            if (id_shop == 0)
                var searchQuery = 'name Like "%' + search + '%"';
            else
                var searchQuery = 'name Like "%' + search + '%" AND id_shop = ' + id_shop;
            datas = await dataTablesModel.getByLimitAndSearch('Brands', limit, start, order, dir, searchQuery, ['Brands.id_shop'], ['Shops']);

            totalFiltered = await dataTablesModel.getCountSearch('Brands', searchQuery, ['Brands.id_shop'], ['Shops']);
        }

        var responseData = [];
        const shops = new Shops();

        if (datas != null && datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
                var nestedData = {};
                nestedData["id"] = datas[i]['id'];
                nestedData["checkbox"] = "";
                nestedData["name"] = datas[i]['name'];
                nestedData["logo"] = datas[i]['image_url'];

                var shopData = await shops.getShopsByParam({
                    where: {
                        id: datas[i]['id_shop']['id']
                    }, relations: ["lang"]
                });


                nestedData["shop"] = shopData[0]['lang'][0]['name'];
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