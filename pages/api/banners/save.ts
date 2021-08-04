import fileUpload from '../../../utils/fileUpload';
import avalUrl from "../../../utils/avalUrl";
import Banners from "../../../models/Banners";

export default async function handler(req, res) {
    try {
        let post = await fileUpload(req) as any;

        if(post) {
            var image_url = "";
            if (typeof post.files.banner_image != 'undefined') {
                const banner_image_url: string = post.files.banner_image.path;
                image_url = avalUrl(banner_image_url);
            }
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

            const description = body['description'];
            const name = body['name'];
            const button_text = body['button_text'];
            const products = body['products'];
            console.log(post.fields);
            const id = post.fields.id;
            const id_shop = post.fields.id_shop;
            const active = post.fields.active;
            const title_color = post.fields.title_color;
            const background_color = post.fields.background_color;
            const indicator_color = post.fields.indicator_color;
            const button_color = post.fields.button_color;
            const position = post.fields.position;

            const banners = new Banners();
            let data = await banners.saveBanners(description, name, products, button_text, image_url, id_shop, active, id, title_color, button_color, indicator_color, background_color, position);

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