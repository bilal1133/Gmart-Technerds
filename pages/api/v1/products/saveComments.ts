import Comments from "../../../../models/Comments";

export default async function handler(req, res) {
    try {
        const id_product = req.body.id_product;
        const id_user = req.body.id_user;
        const star = req.body.star;
        const comment = req.body.comment;

        const comments = new Comments();
        let data = await comments.saveProductComment(id_product, comment, star, id_user);

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