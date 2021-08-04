import Comments from "../../../../models/Comments";

export default async function handler(req, res) {
    try {
        const id = req.body.id;

        const comments = new Comments();
        let data = await comments.removeProductCommentsByParams({id: id});

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