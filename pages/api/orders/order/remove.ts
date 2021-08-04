import Orders from "../../../../models/Orders";

export default async function handler(req, res) {
    try {
        let id = req.body.id;

        const orders = new Orders();
        let data = await orders.removeOrderByParams({id: id});

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