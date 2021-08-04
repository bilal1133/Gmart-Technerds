import RolePermissions from "../../../models/RolePermissions";

export default async function handler(req, res) {
    try {
        const rolePermissions = new RolePermissions();
        let data = await rolePermissions.getRolePermissionsByParams({});

        res.status(200).json( {
            "data": data
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "permissions.ts"
        })
    }
}