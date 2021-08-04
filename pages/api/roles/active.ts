import Roles from "../../../models/Roles";

export default async function handler(req, res) {
    try {
        const roles = new Roles();
        let data = await roles.getRolesByParams({active: 1});

        res.status(200).json({
            "data": data
        })
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "roles.ts"
        })
    }
}