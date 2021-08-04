import md5 from "md5";
import UserAdmin from "../../../models/UserAdmin";
import RolePermissions from "../../../models/RolePermissions";

export default async function handler(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || typeof email == 'undefined') {
            res.status(200).json({
                "logged": false,
                "error": "email is empty",
            })
        } else if (!password || typeof password == 'undefined') {
            res.status(200).json({
                "logged": false,
                "error": "password is empty",
            })
        }

        const encrypted_passwd = md5(password);

        const userAdmin = new UserAdmin();
        var data = await userAdmin.getAdminByParams({
            where: {
                email: email, password: encrypted_passwd
            },
            relations: ["role", "shop"]
        });

        if (data && data[0]) {
            let rolePermission = new RolePermissions();
            let permissions = await rolePermission.getRolePermission(data[0]['role']);
            data[0]['permissions'] = permissions;
        }

        if (data && typeof data != 'undefined' && Object.keys(data).length > 0) {
            res.status(200).json({
                "logged": true,
                "user": data[0]
            });
        } else {
            res.status(200).json({
                "logged": false
            });
        }
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "login.ts"
        })
    }
}