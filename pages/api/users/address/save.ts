import UserAddresses from "../../../../models/UserAddresses";

export default async function handler(req, res) {
    try {
        let post = req.body;

        const userAddresses = new UserAddresses();
        let data = await userAddresses.saveUserAddresses(post);

        res.status(200).json({
            "data": data
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "save.ts"
        })
    }
}