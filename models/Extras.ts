import { dbConnection } from '../config/db';
import { Connection } from 'typeorm';
import { Language } from '../entity/Language';
import {ProductExtras} from "../entity/ProductExtras";
import {ProductExtrasLanguage} from "../entity/ProductExtrasLanguage";
import {Shops} from "../entity/Shops";
import {Products} from "../entity/Products";
import {ProductExtraGroups} from "../entity/ProductExtraGroups";

export default class Extras {
    saveExtras(post: any, images: string) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                var extras = null;
                if (post.id > 0) {
                    extras = await connect.getRepository('ProductExtras').findOne({ id: post.id });
                } else {
                    extras = new ProductExtras();
                    extras.created_at = new Date();
                }

                let shop: Shops = await connect.getRepository('Shops').findOne({ id: post.shop }) as Shops;
                let product: Products = await connect.getRepository('Products').findOne({ id: post.product }) as Products;
                let extraGroup: ProductExtraGroups = await connect.getRepository('ProductExtraGroups').findOne({ id: post.extraGroup }) as ProductExtraGroups;

                extras.active = post.active;
                extras.price = post.price;
                extras.image_url = images;
                extras.product = product;
                extras.extraGroup = extraGroup;
                extras.background_color = post.backgroundColor;
                extras.shop = shop;

                await connect.getRepository('ProductExtras').save(extras).then(async (value) => {
                    let names = post.name;
                    let description = post.description;
                    for (let i = 0; i < names.length; i++) {
                        if (!names[i]) continue;

                        let lang: Language = await connect.getRepository('Language').findOne({ id: names[i].id_lang }) as Language;

                        var extraGroupLang = null;
                        if (post.id > 0) {
                            extraGroupLang = await connect.getRepository('ProductExtrasLanguage').findOne({ extraGroup: value, lang: lang });

                            if (!extraGroupLang)
                                extraGroupLang = new ProductExtrasLanguage();
                        } else {
                            extraGroupLang = new ProductExtrasLanguage();
                        }
                        extraGroupLang.name = names[i].value;
                        extraGroupLang.description = description[i].value;
                        extraGroupLang.extras = value;
                        extraGroupLang.lang = lang;

                        await connect.getRepository('ProductExtrasLanguage').save(extraGroupLang).then(() => {
                            resolve({
                                success: true
                            });
                        }).catch((error) => {
                            reject(error);
                        });
                    }

                    resolve({
                        success: false
                    });
                }).catch((error) => {
                    reject(error);
                });
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getExtrasByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let categories = await connect.getRepository('ProductExtras').find(params);

                resolve(categories);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    removeExtrasByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let categories = await connect.getRepository('ProductExtras').find(params);
                //remove item
                await connect.getRepository('ProductExtras').remove(categories);

                resolve(categories);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }
}