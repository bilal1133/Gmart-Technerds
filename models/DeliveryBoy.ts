import {Between, Connection, Not} from "typeorm";
import {dbConnection} from "../config/db";
import {DeliveryBoyOrders} from "../entity/DeliveryBoyOrders";
import {Orders} from "../entity/Orders";
import {OrderStatus} from "../entity/OrderStatus";


export default class DeliveryBoyModel {
    getDeliveryBoyOrderByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let deliveryBoyOrders = await connect.getRepository('DeliveryBoyOrders').find(params);
                resolve(deliveryBoyOrders);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getDeliveryBoyOrdersByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let orders = await connect.getRepository('DeliveryBoyOrders').find(params);
                resolve(orders);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    changeStatus(orderId: number, status: number, userId: number) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let deliveryBoyOrders = await connect.getRepository('DeliveryBoyOrders').findOne({
                    where: {
                        order: {
                            id: orderId
                        },
                        user: {
                            id: userId
                        }
                    }
                }) as DeliveryBoyOrders;

                if (deliveryBoyOrders) {
                    deliveryBoyOrders.status = status;
                    await connect.getRepository('DeliveryBoyOrders').save(deliveryBoyOrders).then(async () => {
                        if (status == 3) {
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
                        }

                        resolve({
                            success: true
                        });
                    }).catch((error) => {
                        reject({
                            error: error
                        });
                    });
                } else {
                    resolve({
                        success: false
                    });
                }

                resolve({
                    success: false
                });
            });
        } catch (e) {
            //let error = (e as Error).message
            return e
        }
    }

    saveCheckList(orderId: number, checklist: string) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let orders = await connect.getRepository('Orders').findOne({
                    where: {
                        id: orderId
                    }
                }) as Orders;
                orders.checklist = checklist;
                await connect.getRepository('Orders').save(orders).then(() => {
                    resolve({
                        success: true
                    });
                }).catch((error) => {
                    reject({
                        error: error
                    });
                });

                resolve({
                    success: false
                });
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getOrdersTable() {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                var deliveryBoys = await connect.getRepository('UsersAdmin').find({
                    id_role: 3
                });

                var deliveryBoyOrders = [];
                var today = new Date();
                var beforeday = new Date();
                beforeday.setDate(beforeday.getDate() - 3);

                for (let i = 0; i < deliveryBoys.length; i++) {
                    let orders = await connect.getRepository('DeliveryBoyOrders').find({
                        where: {
                            active: 1,
                            user: {
                                id: deliveryBoys[i]['id']
                            },
                            created_at: Between(beforeday, today)
                        },
                        order: {
                            id: 'DESC',
                        },
                        relations: ["order", "order.user", "order.order_detail", "order.order_status", "order.delivery_address", "order.order_detail.product", "order.order_detail.product.lang", "order.order_detail.product.images", "order.shops", "order.shops.lang"]
                    });

                    deliveryBoyOrders.push({
                        "id": deliveryBoys[i]['id'],
                        "orders": orders
                    });
                }

                resolve({
                    "deliveryboy": deliveryBoys,
                    "orders": deliveryBoyOrders
                });
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    statistics(id: number) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let delivered = await connect.getRepository('DeliveryBoyOrders').find({
                    where: {
                        user: {
                            id: id
                        },
                        status: 4
                    }
                }) as DeliveryBoyOrders[];

                let canceled = await connect.getRepository('DeliveryBoyOrders').find({
                    where: {
                        user: {
                            id: id
                        },
                        status: 5
                    }
                }) as DeliveryBoyOrders[];

                let onaway = await connect.getRepository('DeliveryBoyOrders').find({
                    where: {
                        user: {
                            id: id
                        },
                        status: 3
                    }
                }) as DeliveryBoyOrders[];

                let newOrders = await connect.getRepository('DeliveryBoyOrders').find({
                    where: {
                        user: {
                            id: id
                        },
                        status: 1
                    }
                }) as DeliveryBoyOrders[];

                let accepted = await connect.getRepository('DeliveryBoyOrders').find({
                    where: {
                        user: {
                            id: id
                        },
                        status: 2
                    }
                }) as DeliveryBoyOrders[];

                resolve({
                    "delivered": delivered.length,
                    "canceled": canceled.length,
                    "accepted": accepted.length,
                    "onaway": onaway.length,
                    "new": newOrders.length
                });
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }
}