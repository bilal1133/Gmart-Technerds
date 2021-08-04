import fileUpload from '../../../utils/fileUpload';
import avalUrl from "../../../utils/avalUrl";
import Products from "../../../models/Products";

export default async function handler(req, res) {
    try {
        let post = await fileUpload(req) as any;

        if (post) {
            var images = [];
            var body = {};

            let files: any = Object.values(post.files);

            if (files.length > 0) {
                let m = 0;
                for (let i in files) {
                    images[m] = await avalUrl(files[i].path);
                    m++;
                }
            }

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

            const product = new Products();
            let data = await product.saveProducts(images, body);

            res.status(200).json({
                "data": data
            })
        } else {
            res.status(400).json({
                "error": "Cannot upload image",
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