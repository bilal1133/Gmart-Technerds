import {Connection} from "typeorm";
import {dbConnection} from "../config/db";
import {Banners} from "../entity/Banners";
import {Language} from "../entity/Language";
import {BannersLanguage} from "../entity/BannerLanguage";
import removeImage from "../utils/removeImage";
import {Shops} from "../entity/Shops";
import {BannerProducts} from "../entity/BannerProducts";
import {Products} from "../entity/Products";
import {reject} from "q";

export default class BannersModel {
    saveBanners(description: any, name: any, products: any, button_text: any, image_url: string, id_shop: number, active: number, id: number, title_color: string, button_color: string, indicator_color: string, background_color: string, position: string) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let shop: Shops = await connect.getRepository('Shops').findOne({id: id_shop}) as Shops;

                var banners = null;
                if (id > 0) {
                    banners = await connect.getRepository('Banners').findOne(id);
                    banners.id_shop = id_shop;
                    banners.title_color = title_color;
                    banners.button_color = button_color;
                    banners.indicator_color = indicator_color;
                    banners.background_color = background_color;
                    banners.position = position;
                    banners.shop = shop;
                    banners.active = active;
                    if (image_url.length > 0)
                        banners.image_url = image_url;
                } else {
                    banners = new Banners();
                    banners.id_shop = id_shop;
                    banners.title_color = title_color;
                    banners.button_color = button_color;
                    banners.indicator_color = indicator_color;
                    banners.background_color = background_color;
                    banners.position = position;
                    banners.image_url = image_url;
                    banners.shop = shop;
                    banners.active = active;
                    banners.created_at = new Date();
                }

                await connect.getRepository('Banners').save(banners).then(async (value) => {
                    for (let i = 0; i < description.length; i++) {
                        if (!description[i]) continue;

                        let lang: Language = await connect.getRepository('Language').findOne({id: description[i].id_lang}) as Language;

                        var bannersLang = null;
                        if (id > 0) {
                            bannersLang = await connect.getRepository('BannersLanguage').findOne({
                                id_banner: value,
                                id_lang: lang
                            });

                            if (!bannersLang)
                                bannersLang = new BannersLanguage();
                        } else {
                            bannersLang = new BannersLanguage();
                        }
                        bannersLang.description = description[i].value;
                        bannersLang.title = name[i].value;
                        bannersLang.button_text = button_text[i].value;
                        bannersLang.id_banner = value;
                        bannersLang.id_lang = lang;

                        await connect.getRepository('BannersLanguage').save(bannersLang);
                    }

                    if (products && products.length > 0)
                        for (let i = 0; i < products.length; i++) {
                            if (!products[i]) continue;

                            let product: Products = await connect.getRepository('Products').findOne({id: products[i].value}) as Products;

                            var bannersProducts = null;
                            if (id > 0) {
                                bannersProducts = await connect.getRepository('BannerProducts').findOne({
                                    id_banner: value,
                                    id_product: product
                                });

                                if (!bannersProducts)
                                    bannersProducts = new BannerProducts();
                            } else {
                                bannersProducts = new BannerProducts();
                            }

                            bannersProducts.id_banner = value;
                            bannersProducts.id_product = product;

                            await connect.getRepository('BannerProducts').save(bannersProducts);
                        }

                    resolve({
                        success: true,
                        id: value.id
                    });
                });
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getBannersByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let banners = await connect.getRepository('Banners').find(params);
                resolve(banners);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getBannerProductsByParams(id: number, limit: number, offset: number) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let bannerProductsQuery = await connect.getRepository('BannerProducts').query("SELECT  `id_product` FROM `BannerProducts` `BannerProducts` WHERE `BannerProducts`.`id_banner` = " + id + " LIMIT " + limit + " OFFSET " + offset);

                resolve(bannerProductsQuery);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    removeBannersByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                //get rmeovoved item
                let brand = await connect.getRepository('Banners').findOne(params);
                //remove item
                await connect.getRepository('Banners').remove(brand);
                //remove image
                removeImage(brand['image_url']);

                resolve(brand);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }
}