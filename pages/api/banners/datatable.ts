import DataTablesModel from "../../../models/DataTables";
import Shops from "../../../models/Shops";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var column = [
            "Banners.id",
            "title",
            "description",
            "image",
            "category",
            "active",
            "options"
        ];

        let dataTablesModel = new DataTablesModel();
        var totalData = await dataTablesModel.getCount('Banners');
        var totalFiltered = totalData;
        var draw: number = post.draw;

        var limit: number = post.length;
        var start: number = post.start;
        var order = column[post['order[0][column]']];
        var dir = post['order.0.dir'];
        let datas = null;

        if (post['search[value]'].length == 0) {
            datas = await dataTablesModel.getByLimitAndOrder('Banners', limit, start, order, dir, ['Banners.lang', 'Banners.shop'], ['BannersLanguage', 'Shops']);
        } else {
            var search = post['search[value]'];
            var searchQuery = 'BannersLanguage.title Like "%' + search + '%" OR BannersLanguage.description Like "%' + search + '%"';
            datas = await dataTablesModel.getByLimitAndSearch('Banners', limit, start, order, dir, searchQuery, ['Banners.shop', 'Banners.lang'], ['Shops', 'BannersLanguage']);

            totalFiltered = await dataTablesModel.getCountSearch('Banners', searchQuery, [], []);
        }

        const shops = new Shops();
        var responseData = [];
        if (datas != null && datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
                var nestedData = {};
                nestedData["checkbox"] = "";
                nestedData["name"] = datas[i]['lang'][0]['title'];
                nestedData["description"] = datas[i]['lang'][0]['description'];
                nestedData["image"] = datas[i]['image_url'];
                nestedData["id"] = datas[i]['id'];

                var shopData = await shops.getShopsByParam({
                    where: {
                        id: datas[i]['shop']["id"]
                    }, relations: ["lang"]
                }) as any[];

                nestedData["shop"] = shopData.length > 0 ? shopData[0]["lang"][0]["name"] : "";
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