import {dbConnection} from '../config/db';
import {Connection} from 'typeorm';
import {ProductComments} from "../entity/ProductComments";
import {Products} from "../entity/Products";
import {UsersClient} from "../entity/UserClient";
import {Orders} from "../entity/Orders";
import {OrderComments} from "../entity/OrderComments";

export default class Comments {
    getOrderCommentsByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let orderComments = await connect.getRepository('OrderComments').findOne(params);
                resolve(orderComments);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    removeOrderCommentsByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let orderComments = await connect.getRepository('OrderComments').findOne(params);

                await connect.getRepository('OrderComments').remove(orderComments);

                resolve(orderComments);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getProductCommentsByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let productComments = await connect.getRepository('ProductComments').find(params);
                resolve(productComments);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    removeProductCommentsByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let productComments = await connect.getRepository('ProductComments').findOne(params);

                await connect.getRepository('ProductComments').remove(productComments);

                resolve(productComments);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    saveProductComment(productId: number, comment: string, star: number, userId: number) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let product = await connect.getRepository('Products').findOne({id: productId}) as Products;
                let user = await connect.getRepository('UsersClient').findOne({id: userId}) as UsersClient;
                var productComments = await connect.getRepository('ProductComments').findOne({
                    id_user: userId,
                    id_product: productId
                }) as ProductComments;

                if (!productComments) {
                    productComments = new ProductComments();
                    productComments.id_product = productId;
                    productComments.product = product;
                    productComments.id_user = userId;
                    productComments.user = user;
                    productComments.active = 1;
                    productComments.created_at = new Date();
                }
                productComments.comment_text = comment;
                productComments.star = star;

                await connect.getRepository('ProductComments').save(productComments).then(async (value) => {
                    let commendData = await this.getProductCommentsByParams({
                        where: {
                            id_product: productId
                        },
                        take: 5,
                        relations: ["user"]
                    });

                    resolve({
                        success: true,
                        comments: commendData
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

    saveOrderComment(orderId: number, comment: string, userId: number) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let order = await connect.getRepository('Orders').findOne({id: orderId}) as Orders;
                let user = await connect.getRepository('UsersClient').findOne({id: userId}) as UsersClient;

                let orderComments = await connect.getRepository('OrderComments').findOne({
                    id_order: orderId
                }) as OrderComments;
                if (orderComments == null)
                    orderComments = new OrderComments();
                orderComments.comment_text = comment;
                orderComments.id_order = orderId;
                orderComments.order = order;
                orderComments.id_user = userId;
                orderComments.user = user;
                orderComments.active = 1;
                orderComments.created_at = new Date();

                await connect.getRepository('OrderComments').save(orderComments).then(async (value) => {
                    // let commendData = await this.getOrderCommentsByParams({
                    //     where: {
                    //         id_order: orderId
                    //     },
                    //     relations: ["user"]
                    // });

                    resolve(value);
                }).catch((error) => {
                    reject(error);
                });
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }
}