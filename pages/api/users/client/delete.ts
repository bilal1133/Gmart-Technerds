import UserClient from "../../../../models/UserClient";

export default async function handler(req, res) {
    try {
        let ids = req.body.ids;
        const userClient = new UserClient();

        for(let i in ids) {
            await userClient.removeUserByParams({id: ids[i]});
        }

        res.status(200).json({
            "data": {
                "success": true
            }
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "remove.ts"
        })
    }
}