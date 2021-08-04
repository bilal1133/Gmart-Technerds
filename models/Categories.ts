import { dbConnection } from '../config/db';
import { Connection } from 'typeorm';
import { Categories } from '../entity/Categories';
import { CategoriesLanguage } from '../entity/CategoriesLanguage';
import { Shops } from '../entity/Shops';
import { Language } from '../entity/Language';

export default class CategoriesModel {
    saveCategory(post: any, image_url: string) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                var categories = null;
                if (post.id > 0) {
                    categories = await connect.getRepository('Categories').findOne({ id: post.id });
                    if (image_url.length > 0)
                        categories.image_url = image_url;
                } else {
                    categories = new Categories();
                    categories.created_at = new Date();
                    categories.image_url = image_url;
                }
                categories.parent = post.parent;
                categories.active = post.active;
                let shop: Shops = await connect.getRepository('Shops').findOne({ id: post.shop }) as Shops;

                categories.shop = shop;

                await connect.getRepository('Categories').save(categories).then(async (value) => {
                    let names = post.name;
                    for (let i = 0; i < names.length; i++) {
                        if (!names[i]) continue;

                        let lang: Language = await connect.getRepository('Language').findOne({ id: names[i].id_lang }) as Language;

                        var categoriesLang = null;
                        if (post.id > 0) {
                            categoriesLang = await connect.getRepository('CategoriesLanguage').findOne({ id_category: value, id_lang: lang });

                            if (!categoriesLang)
                                categoriesLang = new CategoriesLanguage();
                        } else {
                            categoriesLang = new CategoriesLanguage();
                        }
                        categoriesLang.name = names[i].value;
                        categoriesLang.id_category = value;
                        categoriesLang.id_lang = lang;

                        await connect.getRepository('CategoriesLanguage').save(categoriesLang).then(() => {
                            resolve({
                                success: true
                            });
                        });
                    }

                    resolve({
                        success: false
                    });
                });
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getCategoriesByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let categories = await connect.getRepository('Categories').find(params);

                resolve(categories);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    removeCategoriesByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let categories = await connect.getRepository('Categories').find(params);
                //remove item
                await connect.getRepository('Categories').remove(categories);

                resolve(categories);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }
}