import {dbConnection} from '../config/db';
import {Connection} from 'typeorm';
import {Shops} from '../entity/Shops';
import {Language} from '../entity/Language';
import {ShopsLanguage} from '../entity/ShopsLanguage';
import removeImage from '../utils/removeImage';

export default class ShopsModel {
    saveShops(post: any, logo: string, back_image: string) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                var shops = null;
                if (post.id > 0) {
                    shops = await connect.getRepository('Shops').findOne(post.id);
                    if (back_image.length > 0)
                        shops.backimage_url = back_image;
                    if (logo.length > 0)
                        shops.logo_url = logo;
                    shops.delivery_type = post.type;
                    shops.delivery_price = post.delivery_price;
                    shops.delivery_range = post.delivery_range;
                    shops.admin_percentage = post.admin_comission;
                    shops.tax = post.tax;
                    shops.latitude = post.lat;
                    shops.longtitude = post.lng;
                    shops.open_hour = post.open_hours;
                    shops.close_hour = post.close_hours;
                    shops.is_closed = post.is_closed ? 1 : 0;
                    shops.mobile = post.mobile;
                    shops.phone = post.phone;
                    shops.show_type = post.feature_type;
                } else {
                    shops = new Shops();
                    shops.backimage_url = back_image;
                    shops.logo_url = logo;
                    shops.delivery_type = post.type;
                    shops.delivery_price = post.delivery_price;
                    shops.delivery_range = post.delivery_range;
                    shops.admin_percentage = post.admin_comission;
                    shops.tax = post.tax;
                    shops.latitude = post.lat;
                    shops.longtitude = post.lng;
                    shops.open_hour = post.open_hours;
                    shops.close_hour = post.close_hours;
                    shops.is_closed = post.is_closed ? 1 : 0;
                    shops.mobile = post.mobile;
                    shops.phone = post.phone;
                    shops.created_at = new Date();
                    shops.active = 1;
                    shops.show_type = post.feature_type;
                }

                await connect.getRepository('Shops').save(shops).then(async (value) => {

                    for (let i = 0; i < post.name.length; i++) {
                        let lang: Language = await connect.getRepository('Language').findOne({id: post.name[i].id_lang}) as Language;

                        var shopsLang = null;
                        if (post.id > 0) {
                            shopsLang = await connect.getRepository('ShopsLanguage').findOne({
                                id_shop: value,
                                id_lang: lang
                            });

                            if (!shopsLang) {
                                shopsLang = new ShopsLanguage();
                            }
                        } else {
                            shopsLang = new ShopsLanguage();
                        }

                        shopsLang.name = post.name[i].value;
                        shopsLang.description = post.description[i].value;
                        shopsLang.address = post.address[i].value;
                        shopsLang.info = post.info[i].value;
                        shopsLang.id_lang = lang;
                        shopsLang.id_shop = value;

                        await connect.getRepository('ShopsLanguage').save(shopsLang)
                    }

                    resolve({
                        success: true
                    });
                });

            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getShopsByParam(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let shops = await connect.getRepository('Shops').find(params);
                resolve(shops);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    removeShopsByParam(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                //get rmeovoved item
                let shops = await connect.getRepository('Shops').findOne(params);
                //remove item
                await connect.getRepository('Shops').remove(shops);
                //remove image
                removeImage(shops['logo_url']);
                removeImage(shops['backimage_url']);

                resolve(shops);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getShopsCount() {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                var shopCount = await connect.getRepository('Shops').createQueryBuilder().where({
                    active: 1
                }).getCount();

                var shops= await connect.getRepository('Shops').find({
                    where: {
                        active: 1
                    },
                    relations: ['lang'],
                    order: {
                        id: "DESC"
                    },
                    take: 10
                });

                resolve({
                    "shop_count": shopCount,
                    "shop_data": shops
                });
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }
}