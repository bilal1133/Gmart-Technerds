import RolesModel from "../../../models/Roles";
import RolePermissionsModel from "../../../models/RolePermissions";
import DataTablesModel from "../../../models/DataTables";

export default async function handler(req, res) {
    let post = req.body;
    try {
        var column = [
            "name",
        ];

        const roles = new RolesModel();
        const rolePermissions = new RolePermissionsModel();
        var data: any = await roles.getRolesByParams({active: 1});
        data.map(async (item) => {
            await column.push(item.name);
        });

        let dataTablesModel = new DataTablesModel();
        var totalData = await dataTablesModel.getCount('Permissions');
        var totalFiltered = totalData;
        var draw: number = post.draw;

        var limit: number = post.length;
        var start: number = post.start;
        var order = column[post['order[0][column]']];
        var dir = post['order.0.dir'];
        let datas = null;

        if (post['search[value]'].length == 0) {
            datas = await dataTablesModel.getByLimitAndOrder('Permissions', limit, start, order, dir, [], []);
        } else {
            var search = post['search[value]'];
            var searchQuery = 'Permissions.name Like "%' + search + '%"';
            datas = await dataTablesModel.getByLimitAndSearch('Permissions', limit, start, order, dir, searchQuery, [], []);

            totalFiltered = await dataTablesModel.getCountSearch('Permissions', searchQuery, [], []);
        }

        var responseData = [];
        if (datas != null && datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
                var nestedData = {};
                nestedData["name"] = datas[i]['name'];
                await Promise.all(data.map(async (item) => {
                    var dataRoles: any = await rolePermissions.getRolePermissionsByParams(
                        "RolesPermissions.id_role=" + item.id + " AND RolesPermissions.id_permission=" + datas[i]['id']);

                    nestedData[item.name] = '<div class="custom-control custom-checkbox small">' +
                        '<input ' + (item.id == 1 ? "disabled='disabled'" : "") + ' ' + (dataRoles.length > 0 ? "checked='checked'" : "") + ' pid="' + datas[i]["id"] + '" rid="' + item.id + '" id="' + ("checkbox_" + datas[i]["id"] + "_" + item.id) + '" type="checkbox" class="custom-control-input" />' +
                        '<label for="' + ("checkbox_" + datas[i]["id"] + "_" + item.id) + '" class="custom-control-label"></label>' +
                        '</div>';
                    return nestedData;
                }));

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