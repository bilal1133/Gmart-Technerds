import {dbConnection} from '../config/db';
import {Connection} from 'typeorm';
import {Products} from '../entity/Products';
import {ProductsLanguage} from '../entity/ProductsLanguage';
import {Language} from '../entity/Language';
import {ProductsImages} from '../entity/ProductsImages';
import {Categories} from '../entity/Categories';
import removeImage from '../utils/removeImage';
import {ProductComments} from '../entity/ProductComments';
import {Shops} from "../entity/Shops";
import {Units} from "../entity/Unit";
import {of} from "rxjs";

export default class ProductsModel {
    saveProducts(images: any, post: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                var product = null;
                if (post.id > 0) {
                    product = await connect.getRepository('Products').findOne({id: post.id});
                } else {
                    product = new Products();
                    product.created_at = new Date();
                }

                product.quantity = post.amount;
                product.price = post.price;
                product.discount_price = post.discount;
                product.weight = post.weight;

                let unit: Units = await connect.getRepository('Units').findOne({id: post.unit}) as Units;

                product.id_unit = post.unit;
                product.unit = unit;
                product.show_type = post.show_type;
                product.pack_quantity = post.package_count;
                product.active = 1;
                if (post.brand != null && post.brand > 0)
                    product.brand = post.brand;
                else
                    product.brand = null;

                let category: Categories = await connect.getRepository('Categories').findOne({id: post.id_category}) as Categories;
                let shop: Shops = await connect.getRepository('Shops').findOne({id: post.shop}) as Shops;

                product.id_category = post.id_category;
                product.category = category;
                product.shop = shop;

                await connect.getRepository('Products').save(product).then(async (value) => {
                    for (let i = 0; i < post.name.length; i++) {
                        let lang: Language = await connect.getRepository('Language').findOne({id: post.name[i].id_lang}) as Language;
                        var productLang = null;
                        if (post.id > 0) {
                            productLang = await connect.getRepository('ProductsLanguage').findOne({
                                id_product: value,
                                id_lang: lang
                            });

                            if (!productLang)
                                productLang = new ProductsLanguage();
                        } else {
                            productLang = new ProductsLanguage();
                        }
                        productLang.name = post.name[i].value;
                        productLang.description = post.description[i].value;
                        productLang.id_lang = lang;
                        productLang.id_product = value;

                        await connect.getRepository('ProductsLanguage').save(productLang)
                    }

                    var imgs = await connect.getRepository('ProductsImages').find({
                        where: {
                            id_product: value,
                        },
                        relations: ["id_product"]
                    });

                    if (imgs)
                        for (let i in imgs) {
                            await connect.getRepository('ProductsImages').remove(imgs[i]);
                        }

                    if (post.image && post.image.length > 0) {
                        for (let i in post.image) {
                            let productImage = JSON.parse(post.image[i].value);

                            let productImages = new ProductsImages();
                            productImages.id_product = value;
                            productImages.image_url = productImage.image_url;
                            productImages.main = productImage.main;
                            productImages.active = 1;
                            productImages.created_at = new Date();

                            await connect.getRepository('ProductsImages').save(productImages)
                        }
                    }

                    for (let i = 0; i < images.length; i++) {
                        let productImages = new ProductsImages();
                        productImages.id_product = value;
                        productImages.image_url = images[i];
                        productImages.main = i == 0 ? 1 : 0
                        productImages.active = 1;
                        productImages.created_at = new Date();

                        await connect.getRepository('ProductsImages').save(productImages)
                    }

                    resolve({
                        success: true
                    });
                }).catch(error => reject(error));
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getProductsByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let products = await connect.getRepository('Products').find(params).catch((error) => {
                    reject(error);
                });

                resolve(products);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    removeProductsByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let product = await connect.getRepository('Products').findOne(params) as Products;

                for (let i in product.images) {
                    //remove image
                    await removeImage(product.images[i]['image_url']);
                }

                await connect.getRepository('Products').remove(product);

                resolve(product);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    saveProductComments(post: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let productComment = new ProductComments();
                productComment.id_product = post.id_product;
                productComment.id_user = post.id_user;
                productComment.star = post.star;
                productComment.comment_text = post.comment;
                productComment.active = 1;
                productComment.created_at = new Date();

                await connect.getRepository('ProductComments').save(productComment).then(async (value) => {
                    resolve({
                        success: true
                    });
                }).catch(error => reject(error));
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    search(id_shop: number, search: string, limit: number, offset: number) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let products = await connect.getRepository('Products').createQueryBuilder()
                    .leftJoinAndSelect('Products.lang','ProductsLanguage')
                    .leftJoinAndSelect('Products.images','ProductsImages')
                    .leftJoinAndSelect('Products.shop','Shops')
                    .where("Shops.id = " + id_shop + " AND ProductsLanguage.name LIKE '%" + search + "%'")
                    .take(limit).skip(offset).getMany();

                resolve(products);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }
}