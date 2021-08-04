import Coupon from "../../../models/Coupon";
import fileUpload from "../../../utils/fileUpload";
import avalUrl from "../../../utils/avalUrl";

export default async function handler(req, res) {
    let post = req.body;
    try {
        let post = await fileUpload(req) as any;
        if (post) {
            let body = {};
            var image_url = "";
            if (typeof post.files.image_url != 'undefined') {
                const cat_image_url: string = post.files.image_url.path;
                image_url = avalUrl(cat_image_url);
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

            const coupon = new Coupon();
            let data = await coupon.saveCoupon(body);

            res.status(200).json({
                "data": data
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