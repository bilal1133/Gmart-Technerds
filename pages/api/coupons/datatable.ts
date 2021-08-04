import DataTablesModel from "../../../models/DataTables";
import LanguagesModel from "../../../models/Languages";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var column = [
            "Coupon.id",
            "name",
            "description",
            "shop",
            "discount",
            "discount_type",
            "active",
            "options"
        ];

        let dataTablesModel = new DataTablesModel();
        var id_shop = post['id_shop'];
        var totalData = await dataTablesModel.getCount('Coupon');
        var totalFiltered = totalData;
        var draw: number = post.draw;

        var limit: number = post.length;
        var start: number = post.start;
        var order = column[post['order[0][column]']];
        var dir = post['order.0.dir'];
        let datas = null;

        let langModel = new LanguagesModel();
        let lang = await langModel.getLanguageByParams({
            where: {
                active: 1
            }
        });

        var id_lang = 1;
        if (lang[0] != null)
            id_lang = lang[0]['id']

        if (post['search[value]'].length == 0) {
            datas = await dataTablesModel.getByLimitAndOrder('Coupon', limit, start, order, dir, ['Coupon.lang', 'Coupon.shop'], ['CouponLanguage', "Shops"], ['', '']);
        } else {
            var search = post['search[value]'];
            var searchQuery = 'Coupon.name Like "%' + search + '%"';
            datas = await dataTablesModel.getByLimitAndSearch('Coupon', limit, start, order, dir, searchQuery, ['Coupon.lang', 'Coupon.shop'], ['CouponLanguage', "Shops"], ['', '']);

            totalFiltered = await dataTablesModel.getCountSearch('Coupon', searchQuery, ['Coupon.lang', 'Coupon.shop'], ['CouponLanguage', "Shops"], ['', '']);
        }

        var responseData = [];
        if (datas != null && datas != 'undefined' && datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
                var nestedData = {};
                nestedData["id"] = datas[i]['id'];
                nestedData["code"] = datas[i]['name'];
                nestedData["description"] = datas[i]['lang'].length > 0 ? datas[i]['lang'][0]['description'] : "";
                nestedData["discount"] = datas[i]['discount'];
                nestedData["discount_type"] = datas[i]['discount_type'] == 0?"Percentage":"Fixed price";
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