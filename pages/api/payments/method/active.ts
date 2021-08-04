import Payments from "../../../../models/Payments";

export default async function handler(req, res) {
    try {
        const payments = new Payments();
        let data = await payments.getPaymentMethodsByParams({ active: 1 });

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