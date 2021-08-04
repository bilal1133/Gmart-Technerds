import {dbConnection} from '../config/db';
import {Connection} from 'typeorm';
import {UsersAdmin} from "../entity/UserAdmin";
import {Roles} from "../entity/Roles";
import {Shops} from "../entity/Shops";
import md5 from "md5";

export default class UsersAdminModel {
    save(params: any, image_url: string) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                var userAdmin = null;
                if (params.id > 0)
                    userAdmin = await connect.getRepository('UsersAdmin').findOne(params.id);
                else
                    userAdmin = new UsersAdmin();

                userAdmin.name = params.name;
                userAdmin.surname = params.surname;
                userAdmin.email = params.email;
                userAdmin.phone = params.phone;
                userAdmin.password = md5(params.password);
                userAdmin.active = params.active;
                userAdmin.token = '';
                userAdmin.image_url = image_url;
                userAdmin.address = params.address;
                userAdmin.created_at = new Date();

                let role: Roles = await connect.getRepository('Roles').findOne(params.role) as Roles;
                userAdmin.role = role;
                userAdmin.id_role = params.role;

                if (params.shop > 0) {
                    let shops: Shops = await connect.getRepository('Shops').findOne(params.shop) as Shops;
                    userAdmin.shop = shops;
                    userAdmin.id_shop = params.shop;
                }

                await connect.getRepository('UsersAdmin').save(userAdmin).then(() => {
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

    getAdminByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let users = await connect.getRepository('UsersAdmin').find(params);
                resolve(users);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    removeUserByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                //get removoved item
                let user = await connect.getRepository('UsersAdmin').findOne(params);
                //remove item
                await connect.getRepository('UsersAdmin').remove(user);

                resolve(user);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    loginDeliveryBoy(phone: string, password: string) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let users = await connect.getRepository('UsersAdmin').findOne({
                        where: {
                            phone: phone.replace(/\s+/g, ''),
                            password: md5(password),
                            id_role: 3
                        }
                    }
                ).catch((error) => {
                    reject({
                        error: error
                    });
                });
                resolve(users);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    makeOffline(id: number, offline: number) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let user = await connect.getRepository('UsersAdmin').findOne({
                        where: {
                            id: id
                        }
                    }
                ) as UsersAdmin;

                user.offline = offline;
                await connect.getRepository('UsersAdmin').save(user).then(() => {
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

    updateDeliveryBoy(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                var userAdmin = await connect.getRepository('UsersAdmin').findOne(params.id) as UsersAdmin;

                userAdmin.name = params.name;
                userAdmin.surname = params.surname;
                userAdmin.phone = params.phone;
                if (params.password.length > 0)
                    userAdmin.password = md5(params.password);

                await connect.getRepository('UsersAdmin').save(userAdmin).then(() => {
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
}