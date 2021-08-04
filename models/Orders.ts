import {dbConnection} from '../config/db';
import {Connection} from 'typeorm';
import {Orders} from '../entity/Orders';
import {PaymentStatus} from '../entity/PaymentStatus';
import {OrderStatus} from '../entity/OrderStatus';
import {PaymentMethod} from '../entity/PaymentsMethods';
import {UserAddresses} from '../entity/UserAddresses';
import {OrderDetails} from '../entity/OrdersDetail';
import {Products} from '../entity/Products';
import {Shops} from "../entity/Shops";
import ShopsModel from "./Shops";
import {UsersAdmin} from "../entity/UserAdmin";
import {UsersClient} from "../entity/UserClient";
import {DeliveryBoyOrders} from "../entity/DeliveryBoyOrders";
import UserClient from "./UserClient";
import Comments from "./Comments";
import {Coupon} from "../entity/Coupon";


const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default class OrdersModel {
    getOrdersByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let orders = await connect.getRepository('Orders').find(params);
                resolve(orders);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    removeOrderByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                //get removed item
                let order = await connect.getRepository('Orders').findOne(params);
                //remove item
                await connect.getRepository('Orders').remove(order);

                resolve(order);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    saveOrder(post: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                var order = null;
                if (post.id > 0) {
                    order = await connect.getRepository('Orders').findOne({
                        id: post.id
                    }) as Orders;
                    order.updated_at = new Date();
                } else {
                    order = new Orders();
                }

                let user: UsersClient = await connect.getRepository('UsersClient').findOne({
                    id: post.id_user
                }) as UsersClient;

                let shop: Shops = await connect.getRepository('Shops').findOne({
                    id: post.id_shop
                }) as Shops;

                let address: UserAddresses = await connect.getRepository('UserAddresses').findOne({
                    id: post.id_delivery_address
                }) as UserAddresses;

                let delivery_boy: UsersAdmin = await connect.getRepository('UsersAdmin').findOne({
                    id: post.deliver_boy
                }) as UsersAdmin;

                let order_status: OrderStatus = await connect.getRepository('OrderStatus').findOne({
                    id: post.order_status
                }) as OrderStatus;

                let payment_status: PaymentStatus = await connect.getRepository('PaymentStatus').findOne({
                    id: post.payment_status
                }) as PaymentStatus;

                let payment_method: PaymentMethod = await connect.getRepository('PaymentMethod').findOne({
                    id: post.payment_method
                }) as PaymentMethod;

                order.tax = post.tax != null ? post.tax : 0;
                order.delivery_fee = post.delivery_fee;
                order.total_sum = post.total_sum;
                order.total_discount = post.total_discount;
                order.id_user = post.id_user;

                if (post.order_status == 4) {
                    order.delivery_mark = post.order_mark;

                    const comments = new Comments();
                    let orderComment = await comments.saveOrderComment(order.id, post.order_review, post.id_user);

                    order.id_review = orderComment['id'];
                }

                order.id_delivery_address = post.id_delivery_address;
                order.id_shop = post.id_shop;
                order.delivery_date = post.delivery_date;
                order.comment = post.comment;
                order.active = 1;
                order.type = post.type;
                order.created_at = new Date();
                order.user = user;
                order.delivery_boy = delivery_boy;
                order.order_status = order_status;
                order.payment_status = payment_status;
                order.payment_method = payment_method;
                order.delivery_address = address;
                order.shops = shop;

                await connect.getRepository('Orders').save(order).catch((error) => {
                    resolve({
                        error: error,
                        order: order
                    });
                }).then(async (value) => {
                    if (post.deliver_boy > 0 && post.order_status > 1) {
                        var deliveryBoyOrders: DeliveryBoyOrders = await connect.getRepository('DeliveryBoyOrders').findOne({
                            user: post.deliver_boy,
                            order: value.id
                        }).catch((error) => {
                            resolve(error);
                        }) as DeliveryBoyOrders;

                        if (deliveryBoyOrders == null) {
                            deliveryBoyOrders = new DeliveryBoyOrders();
                            deliveryBoyOrders.active = 1;
                            deliveryBoyOrders.created_at = new Date();
                            deliveryBoyOrders.status = 1;
                        }

                        if (post.order_status == 4) {
                            deliveryBoyOrders.status = 3;
                        } else if (post.order_status == 5) {
                            deliveryBoyOrders.status = 4;
                        } else if (post.order_status == 3) {
                            deliveryBoyOrders.status = 2;
                        }

                        deliveryBoyOrders.user = delivery_boy;
                        deliveryBoyOrders.order = value;
                        deliveryBoyOrders.comment = post.delivery_boy_comment;
                        deliveryBoyOrders.updated_at = new Date();

                        await connect.getRepository('DeliveryBoyOrders').save(deliveryBoyOrders).catch((error) => {
                            reject({
                                error: error
                            });
                        });
                    }

                    if (post.order_status < 3) {
                        let oldOrderDetails = await connect.getRepository('OrderDetails').find({
                            order: {
                                id: value.id
                            }
                        }).catch((error) => {
                            reject({
                                error: error
                            });
                        }) as OrderDetails[];

                        for (let k = 0; k < oldOrderDetails.length; k++) {
                            let productItem: Products = await connect.getRepository('Products').findOne({
                                id: oldOrderDetails[k].id_product
                            }) as Products;

                            if (productItem) {
                                productItem.quantity = productItem.quantity + oldOrderDetails[k].quantity;
                                await connect.getRepository('Products').save(productItem);
                            }
                        }

                        await connect.getRepository('OrderDetails').delete({
                            order: {
                                id: value.id
                            }
                        }).catch((error) => {
                            reject({
                                error: error
                            });
                        });


                        let details = null;

                        if (post.isMobile)
                            details = JSON.parse(post.detail);
                        else
                            details = post.detail;

                        for (let m in details) {
                            let orderDetail = new OrderDetails();

                            let item = details[m];
                            if (details[m].data != null) {
                                item = {...details[m], ...details[m].data}
                            }

                            let product: Products = await connect.getRepository('Products').findOne({
                                id: item.id
                            }) as Products;

                            var exchangeProduct: Products = await connect.getRepository('Products').findOne({
                                id: item.exchange_id
                            }) as Products;

                            var coupon: Coupon = await connect.getRepository('Coupon').findOne({
                                id: item.coupon_id
                            }) as Coupon;

                            orderDetail.quantity = item.count <= product.quantity ? item.count : product.quantity;
                            orderDetail.discount = item.discount_price;
                            orderDetail.price = item.price;
                            orderDetail.id_product = item.id;
                            orderDetail.is_replaced = post.isMobile ? 0 : item.type == 1 ? 1 : 0;
                            orderDetail.is_replacement_product = post.isMobile ? 0 : item.type == 2 ? 1 : 0;
                            orderDetail.order = value;
                            orderDetail.replace_product = exchangeProduct;
                            orderDetail.product = product;
                            orderDetail.coupon_amount = item.coupon_amount ? item.coupon_amount : 0;
                            orderDetail.coupon = coupon;

                            await connect.getRepository('OrderDetails').save(orderDetail).then(async (value) => {
                                if (product) {
                                    product.quantity = product.quantity - value.quantity;
                                    await connect.getRepository('Products').save(product);
                                }
                            }).catch((error) => {
                                reject({
                                    error: error
                                });
                            });
                        }
                    }

                    resolve({
                        success: true
                    });
                });

            });
        } catch (e) {
            return e
        }
    }

    saveOrderStatus(id_order: number, status: number) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let order = await connect.getRepository('Orders').findOne({
                    id: id_order
                }) as Orders;

                let orderStatus = await connect.getRepository('OrderStatus').findOne({
                    id: status
                }) as OrderStatus;

                order.order_status = orderStatus;

                await connect.getRepository('Orders').save(order);

                resolve({
                    success: true
                });
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getOrdersStatistics(id_shop: number) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                var orderCount = null;
                var order = null;
                var orderAmount = null;
                var orderByCustomerId = null;
                var ordersByShop = null;
                var ordersByDate = null;
                var date = new Date();
                date.setDate(-10);
                let dateStr = date.getFullYear() + ":" + date.getMonth() + ":" + date.getDate() + " 00:00:00";

                if (id_shop == 0) {
                    orderCount = await connect.getRepository('Orders').createQueryBuilder().getCount();
                    order = await connect.getRepository('Orders').createQueryBuilder().limit(10).orderBy('id', 'DESC').getMany();

                    orderAmount = await connect.getRepository('Orders').createQueryBuilder().select("SUM(Orders.total_sum)", "sum").getRawOne();
                    orderByCustomerId = await connect.getRepository('Orders').query('SELECT COUNT(DISTINCT id_user) as client_count FROM `Orders` WHERE 1');
                    ordersByShop = await connect.getRepository('Orders').query('SELECT COUNT(DISTINCT id) as order_count, id_shop FROM `Orders` WHERE 1 GROUP BY id_shop');
                    ordersByDate = await connect.getRepository('Orders').query('SELECT id, created_at FROM `Orders` WHERE created_at >= "' + dateStr + '"');
                } else {
                    orderCount = await connect.getRepository('Orders').createQueryBuilder().where({
                        shops: id_shop
                    }).getCount();
                    order = await connect.getRepository('Orders').createQueryBuilder().where({
                        shops: id_shop
                    }).limit(10).orderBy('id', 'DESC').getMany();

                    orderAmount = await connect.getRepository('Orders').createQueryBuilder().select("SUM(Orders.total_sum)", "sum")
                        .where({
                            shops: id_shop
                        }).getRawOne();

                    orderByCustomerId = await connect.getRepository('Orders').query('SELECT COUNT(DISTINCT id_user) as client_count FROM `Orders` WHERE shops = ' + id_shop);
                    ordersByShop = await connect.getRepository('Orders').query('SELECT COUNT(DISTINCT id) as order_count FROM `Orders` WHERE shops = ' + id_shop + ' GROUP BY id_user');
                    ordersByDate = await connect.getRepository('Orders').query('SELECT id, created_at FROM `Orders` WHERE created_at >= "' + dateStr + '" AND shops = ' + id_shop + '');
                }

                var ordersData = [];
                var shopOrders = [];
                const shops = new ShopsModel();
                const userClient = new UserClient();
                for (let i = 0; i < order.length; i++) {
                    let data = await shops.getShopsByParam({
                        where: {
                            id: order[i]["id_shop"]
                        }, relations: ["lang"]
                    }) as any[];

                    let data1 = await userClient.getClientByParams({
                        where: {
                            id: order[i]["id_user"]
                        }
                    }) as any[];

                    ordersData.push({
                        "id": order[i]["id"],
                        "total_sum": order[i]["total_sum"],
                        "total_discount": order[i]["total_discount"],
                        "shop": data.length > 0 && typeof data[0] != 'undefined' ? data[0]["lang"][0]["name"] : "",
                        "client": data1.length > 0 ? (data1[0]["surname"]) + " " + (data1[0]["name"]) : "",
                    });
                }

                if (id_shop == 0) {
                    for (let i = 0; i < ordersByShop.length; i++) {
                        let data = await shops.getShopsByParam({
                            where: {
                                id: ordersByShop[i]["id_shop"]
                            }, relations: ["lang"]
                        }) as any[];

                        shopOrders.push({
                            "order_count": ordersByShop[i]['order_count'],
                            "shop": data.length > 0 && typeof data[0] != 'undefined' ? data[0]["lang"][0]["name"] : "",
                        });
                    }
                } else {

                }

                var lineChartData = [];
                for (let i = 0; i < ordersByDate.length; i++) {
                    var date = new Date(ordersByDate[i]['created_at']);
                    var day = date.getDate();
                    let index = lineChartData.findIndex((item) => item.day == day);
                    if (index == -1) {
                        lineChartData.push({
                            day: day,
                            count: 1,
                            dateFull: day + " " + monthNames[date.getMonth()]
                        });
                    } else {
                        lineChartData[index].count += 1;
                    }
                }

                resolve({
                    "order_count": orderCount,
                    "order_amount": orderAmount,
                    'orders': ordersData,
                    'client_count': orderByCustomerId,
                    'shop_orders': shopOrders,
                    'line_data': lineChartData
                });
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    changeOrderStatus(id: number, status: number) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let order_status: OrderStatus = await connect.getRepository('OrderStatus').findOne({
                    id: status
                }) as OrderStatus;

                let order = await connect.getRepository('Orders').findOne(id) as Orders;
                order.order_status = order_status;
                await connect.getRepository('Orders').save(order).then(async (value) => {
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

    changeStatus(orderId: number, status: number) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();


                var order = await connect.getRepository('Orders').findOne({
                    id: orderId
                }) as Orders;

                let order_status: OrderStatus = await connect.getRepository('OrderStatus').findOne({
                    id: status
                }) as OrderStatus;

                order.order_status = order_status;

                await connect.getRepository('Orders').save(order).catch((error) => {
                    resolve({
                        error: error,
                        order: order
                    });
                });


                resolve({
                    success: true
                });
            });
        } catch (e) {
            //let error = (e as Error).message
            return e
        }
    }
}