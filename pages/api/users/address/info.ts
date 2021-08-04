import UserAddresses from "../../../../models/UserAddresses";

export default async function handler(req, res) {
    try {
        const id = req.body.id;

        const userAddresses = new UserAddresses();
        let data = await userAddresses.getUserAddressesByParams({ id: id });

        res.status(200).json({
            "data": data[0]
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "brands.ts"
        })
    }
}