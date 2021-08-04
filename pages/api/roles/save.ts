import RolePermissions from "../../../models/RolePermissions";

export default async function handler(req, res) {
    try {
        let id_role = req.body.id_role;
        let id_permission = req.body.id_permission;

        const rolePermissions = new RolePermissions();
        let data = await rolePermissions.saveRolePermissions(id_permission, id_role);

        res.status(200).json({
            "data": data
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "save.ts"
        })
    }
}