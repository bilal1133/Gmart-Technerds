import UserClient from "../../../../models/UserClient";
import md5 from "md5";

export default async function handler(req, res) {
    try {
        let body = req.body;

        var params = {};
        if(body.auth_type == 1) {
            params = {
                where: {
                    phone: body.phone.replace(/\s+/g, ''),
                    password: md5(body.password)
                }
            };
        } else if(body.auth_type == 2 || body.auth_type == 3) {
            params = {
                where: {
                    social_id: parseInt(body.social_id)
                }
            };
        }

        const userClient = new UserClient();
        let data = await userClient.loginUser(params);
        if (data)
            res.status(200).json({
                "success": true,
                "user": data
            });
        else
            res.status(200).json({
                "success": false,
                "data": params
            });
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "save.ts"
        })
    }
}