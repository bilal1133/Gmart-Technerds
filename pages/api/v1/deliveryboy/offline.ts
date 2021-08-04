import UsersAdminModel from "../../../../models/UserAdmin";

export default async function handler(req, res) {
    try {
        let body = req.body;

        const userAdmin = new UsersAdminModel();
        let data = await userAdmin.makeOffline(body.id, body.offline);
        if (data)
            res.status(200).json({
                "success": true,
                "user": data
            });
        else
            res.status(200).json({
                "success": false,
                "data": body,
                "user": data
            });
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": e,
            "file": "save.ts"
        })
    }
}