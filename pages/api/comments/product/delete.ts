import Comments from "../../../../models/Comments";

export default async function handler(req, res) {
    try {
        let ids = req.body.ids;
        const comments = new Comments();

        for(let i in ids) {
            await comments.removeProductCommentsByParams({id: ids[i]});
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
            "file": "delete.ts"
        })
    }
}