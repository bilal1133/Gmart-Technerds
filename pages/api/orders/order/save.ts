import Orders from "../../../../models/Orders";

export default async function handler(req, res) {
    let post = req.body;
    try {
        const orders = new Orders();
        let data = await orders.saveOrder(post);

        res.status(200).json({
            "data": data
        });
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "saveShopsAddress.ts"
        })
    }
}