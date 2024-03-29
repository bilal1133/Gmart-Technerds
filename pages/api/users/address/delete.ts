import UserAddresses from "../../../../models/UserAddresses";

export default async function handler(req, res) {
    try {
        let ids = req.body.ids;
        const userAddresses = new UserAddresses();

        for(let i in ids) {
            await userAddresses.removeUserAddressByParams({id: ids[i]});
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