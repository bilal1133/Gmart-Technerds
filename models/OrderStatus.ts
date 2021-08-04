import {dbConnection} from '../config/db';
import {Connection} from 'typeorm';
import {OrderStatus} from '../entity/OrderStatus';
import {orderStatusesSeed} from "../seeds/order_status.seed";

export default class OrderStatusModel {
    getOrderStatusByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                this.setDefaultData();

                let orderStatus = await connect.getRepository('OrderStatus').find(params);
                resolve(orderStatus);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    saveOrderStatus(post: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                var orderstatus: OrderStatus = await connect.getRepository('OrderStatus').findOne({id: post.id}) as OrderStatus;
                orderstatus.name = post.name;
                orderstatus.icon = post.icon;
                orderstatus.class = post.class;
                orderstatus.active = post.active;

                await connect.getRepository('OrderStatus').save(orderstatus).then(async (value) => {
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

    setDefaultData() {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                for (let i = 0; i < orderStatusesSeed.length; i++) {
                    let orderstatus = new OrderStatus();
                    orderstatus.id = orderStatusesSeed[i].id;
                    orderstatus.name = orderStatusesSeed[i].name;
                    orderstatus.icon = orderStatusesSeed[i].icon;
                    orderstatus.class = orderStatusesSeed[i].class;
                    orderstatus.active = 1;
                    orderstatus.created_at = new Date();

                    await connect.getRepository('OrderStatus').save(orderstatus);
                }

                resolve({
                    success: true
                });
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }
}