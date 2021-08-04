import UserAdmin from "../../../../models/UserAdmin";

export default async function handler(req, res) {
    try {
        let ids = req.body.ids;
        const userAdmin = new UserAdmin();

        for(let i in ids) {
            await userAdmin.removeUserByParams({id: ids[i]});
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