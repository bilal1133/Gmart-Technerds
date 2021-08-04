import UsersAdmin from "../../../../models/UserAdmin";

export default async function handler(req, res) {
    try {
        const id_shop = req.body.id_shop;

        if (!id_shop || id_shop == 'undefined') {
            res.status(200).json({
                "logged": false,
                "error": "id is empty",
            })
        }

        const usersAdmin = new UsersAdmin();
        let data = await usersAdmin.getAdminByParams({
            where: {
                shop: id_shop,
                id_role: 3
            }
        });

        res.status(200).json({
            "data": data
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "userInfo.ts"
        })
    }
}