import fileUpload from '../../../utils/fileUpload';
import avalUrl from "../../../utils/avalUrl";
import Brands from "../../../models/Brands";

export default async function handler(req, res) {
    try {
        let post = await fileUpload(req) as any;

        if(post) {
            var image_url = "";
            if (typeof post.files.brandLogo != 'undefined') {
                const brand_image_url: string = post.files.brandLogo.path;
                image_url = avalUrl(brand_image_url);
            }
            const brand_name = post.fields.brandName;
            const id = post.fields.id;
            const shop = post.fields.shop;
            const active = post.fields.active;

            const brands = new Brands();
            let data = await brands.saveBrands(brand_name, image_url, id, shop, active);

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