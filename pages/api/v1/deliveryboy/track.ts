import DeliveryBoyTrack from "../../../../models/DeliveryBoyTrack";

export default async function handler(req, res) {
    let post = req.body;
    try {
        const deliveryBoyTrack = new DeliveryBoyTrack();
        let data = await deliveryBoyTrack.saveTrack(post);

        res.status(200).json({
            "data": data
        });
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "track.ts"
        })
    }
}
