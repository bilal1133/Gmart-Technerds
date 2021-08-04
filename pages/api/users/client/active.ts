import UserClient from "../../../../models/UserClient";

export default async function handler(req, res) {
    try {
        const userClient = new UserClient();
        let data = await userClient.getClientByParams({ active: 1 });

        res.status(200).json({
            "data": data
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "brands.ts"
        })
    }
}