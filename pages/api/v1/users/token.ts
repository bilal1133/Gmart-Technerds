import UserClient from "../../../../models/UserClient";

export default async function handler(req, res) {
    try {
        const userClient = new UserClient();
        let data = await userClient.saveToken(req.body.id_user, req.body.token, req.body.device_type);
        res.status(200).json(data);
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "token.ts"
        })
    }
}