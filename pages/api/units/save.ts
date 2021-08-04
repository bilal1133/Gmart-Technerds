import fileUpload from '../../../utils/fileUpload';
import Units from "../../../models/Units";

export default async function handler(req, res) {
    try {
        let post = await fileUpload(req) as any;
        if (post) {
            let body = {};

            for (let key in post.fields) {
                let index = key.indexOf('[');
                if (index > -1) {
                    let key_name = key.substring(0, index)

                    if (typeof body[key_name] == 'undefined')
                        body[key_name] = [];

                    body[key_name].push({
                        value: post.fields[key],
                        id_lang: key.charAt(index + 1)
                    });

                } else
                    body[key] = post.fields[key];
            }

            const units = new Units();
            let data = await units.saveUnit(body);

            res.status(200).json({
                "data": data
            })
        } else {
            res.status(400).json({
                "error": "",
                "file": "save.ts"
            })
        }
    } catch (e) {
        let error = (e as Error).message;
        res.status(400).json({
            "error": error,
            "file": "save.ts"
        })
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};