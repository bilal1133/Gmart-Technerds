import {dbConnection} from '../config/db';
import {Connection} from 'typeorm';
import {PaymentStatus} from '../entity/PaymentStatus';
import {PaymentMethod} from '../entity/PaymentsMethods';
import {paymentStatusSeed} from "../seeds/payment_status.seed";
import {paymentMethodSeed} from "../seeds/payment_method.seed";

export default class PaymentsModel {
    getPaymentStatusByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                this.setDefaultPaymentStatus();
                this.setDefaultPaymentMethod();

                let paymentStatus = await connect.getRepository('PaymentStatus').find(params);
                resolve(paymentStatus);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getPaymentMethodsByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let paymentMethods = await connect.getRepository('PaymentMethod').find(params);
                resolve(paymentMethods);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    savePaymentStatus(post: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                var paymentStatus: PaymentStatus = await connect.getRepository('PaymentStatus').findOne({id: post.id}) as PaymentStatus;
                paymentStatus.name = post.name;
                paymentStatus.icon = post.icon;
                paymentStatus.class = post.class;
                paymentStatus.active = post.active;

                await connect.getRepository('PaymentStatus').save(paymentStatus).then(async (value) => {
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

    savePaymentMethod(post: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                var paymentMethod: PaymentMethod = await connect.getRepository('PaymentMethod').findOne({id: post.id}) as PaymentMethod;
                paymentMethod.name = post.name;
                paymentMethod.active = post.active;

                await connect.getRepository('PaymentMethod').save(paymentMethod).then(async (value) => {
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

    setDefaultPaymentMethod() {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                for (let i = 0; i < paymentMethodSeed.length; i++) {

                    let paymentMethod = new PaymentMethod();
                    paymentMethod.id = paymentMethodSeed[i].id;
                    paymentMethod.name = paymentMethodSeed[i].name;
                    paymentMethod.active = 1;
                    paymentMethod.created_at = new Date();

                    await connect.getRepository('PaymentMethod').save(paymentMethod);
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

    setDefaultPaymentStatus() {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();


                for (let i = 0; i < paymentStatusSeed.length; i++) {
                    let paymentStatus = new PaymentStatus();
                    paymentStatus.id = paymentStatusSeed[i].id;
                    paymentStatus.name = paymentStatusSeed[i].name;
                    paymentStatus.class = paymentStatusSeed[i].class;
                    paymentStatus.icon = paymentStatusSeed[i].icon;
                    paymentStatus.active = 1;
                    paymentStatus.created_at = new Date();

                    await connect.getRepository('PaymentStatus').save(paymentStatus);
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