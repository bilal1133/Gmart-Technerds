import {dbConnection} from '../config/db';
import {Connection} from 'typeorm';
import {Shops} from "../entity/Shops";
import {Language} from "../entity/Language";
import {Products} from "../entity/Products";
import {Coupon} from "../entity/Coupon";
import {CouponLanguage} from "../entity/CouponLanguage";
import {CouponProducts} from "../entity/CouponProducts";

export default class CouponModel {
    saveCoupon(post: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let shop: Shops = await connect.getRepository('Shops').findOne({id: post.shop}) as Shops;

                var coupon = null;
                if (post.id > 0) {
                    coupon = await connect.getRepository('Coupon').findOne(post.id);
                } else {
                    coupon = new Coupon();
                    coupon.created_at = new Date();
                }

                coupon.shop = shop;
                coupon.name = post.name;
                coupon.discount_type = post.discount_type;
                coupon.discount = post.discount;
                coupon.active = post.active;

                await connect.getRepository('Coupon').save(coupon).then(async (value) => {
                    for (let i = 0; i < post.descriptions.length; i++) {
                        if (!post.descriptions[i]) continue;

                        let lang: Language = await connect.getRepository('Language').findOne({id: post.descriptions[i].id_lang}) as Language;

                        var couponLang = null;
                        if (post.id > 0) {
                            couponLang = await connect.getRepository('CouponLanguage').findOne({
                                coupon: value,
                                lang: lang
                            });

                            if (!couponLang)
                                couponLang = new CouponLanguage();
                        } else {
                            couponLang = new CouponLanguage();
                        }
                        couponLang.description = post.descriptions[i].value;
                        couponLang.lang = lang;
                        couponLang.coupon = value;

                        await connect.getRepository('CouponLanguage').save(couponLang).catch((error) => {
                            reject(error);
                        });
                    }

                    var products = post.products;
                    if (products && products.length > 0)
                        for (let i = 0; i < products.length; i++) {
                            if (!products[i]) continue;

                            let product: Products = await connect.getRepository('Products').findOne({id: products[i].value}) as Products;

                            var couponProducts = null;
                            if (post.id > 0) {
                                couponProducts = await connect.getRepository('CouponProducts').findOne({
                                    coupon: value,
                                    product: product
                                });

                                if (!couponProducts)
                                    couponProducts = new CouponProducts();
                            } else {
                                couponProducts = new CouponProducts();
                            }

                            couponProducts.coupon = value;
                            couponProducts.product = product;

                            await connect.getRepository('CouponProducts').save(couponProducts);
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

    getCouponByProductId(id_product: number, code: string) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let coupon = await connect.getRepository('Coupon').createQueryBuilder()
                    .leftJoinAndSelect('Coupon.products','CouponProducts')
                    .leftJoinAndSelect('CouponProducts.product','Products').where('Products.id = ' + id_product).where('Coupon.name = "' + code + '"').getMany();

                resolve(coupon);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getCouponByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let coupon = await connect.getRepository('Coupon').find(params).catch((error) => reject(error));

                resolve(coupon);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getCouponProductsByParams(id_shop: number, limit: number, offset: number) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let coupon = await connect.getRepository('CouponProducts').createQueryBuilder()
                    .leftJoinAndSelect('CouponProducts.product','Products')
                    .leftJoinAndSelect('Products.lang','ProductsLanguage')
                    .leftJoinAndSelect('Products.images','ProductsImages')
                    .leftJoinAndSelect('Products.shop','Shops').where('Shops.id = ' + id_shop).skip(offset).limit(limit).getMany();

                resolve(coupon);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    hasCoupon(id_product: number) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let coupon = await connect.getRepository('CouponProducts').find({
                    where: {
                        product: {
                            id: id_product
                        }
                    }
                }).catch((error) => reject(error)) as any[];

                if (coupon.length > 0)
                    resolve(true);
                else
                    resolve(false);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    removeCouponByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let coupon = await connect.getRepository('Coupon').find(params);
                //remove item
                await connect.getRepository('Coupon').remove(coupon);

                resolve(coupon);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }
}