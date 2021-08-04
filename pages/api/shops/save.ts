import fileUpload from '../../../utils/fileUpload';
import avalUrl from "../../../utils/avalUrl";
import Shops from "../../../models/Shops";

export default async function handler(req, res) {
    try {
        let post = await fileUpload(req) as any;

        if(post) {
            let body = {};
            var image_url = "";
            var back_image_url = "";

            if (typeof post.files != 'undefined' && typeof post.files.logo != 'undefined') {
                const shop_image_url: string = post.files.logo.path;
                image_url = await avalUrl(shop_image_url);
            }

            if (typeof post.files != 'undefined' && typeof post.files.back_image != 'undefined') {
                const shop_back_image_url: string = post.files.back_image.path;
                back_image_url = await avalUrl(shop_back_image_url);
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

            const shops = new Shops();
            let data = await shops.saveShops(body, image_url, back_image_url);

            res.status(200).json({
                "data": data
            });
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