import UsersAdmin from "../../../../models/UserAdmin";

export default async function handler(req, res) {
    try {
        const user_id = req.body.id;

        if (!user_id || user_id == 'undefined') {
            res.status(200).json({
                "logged": false,
                "error": "id is empty",
            })
        }

        const usersAdmin = new UsersAdmin();
        let data = await usersAdmin.getAdminByParams({
            where: {
                id: user_id
            }, relations: ["role", "shop"]
        });

        res.status(200).json({
            "data": data[0]
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "userInfo.ts"
        })
    }
}