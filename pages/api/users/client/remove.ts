import UserClient from "../../../../models/UserClient";

export default async function handler(req, res) {
    try {
        let id = req.body.id;

        const userClient = new UserClient();
        let data = await userClient.removeUserByParams({ id: id });

        res.status(200).json({
            "data": data
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "remove.ts"
        })
    }
}