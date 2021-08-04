import {dbConnection} from '../config/db';
import {Connection} from 'typeorm';
import {UsersClient} from "../entity/UserClient";
import md5 from "md5";
import {UserAddresses} from "../entity/UserAddresses";

export default class UsersClientModel {
    save(params: any, image_url: string) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                var userClient = null;

                var social_id = parseInt(params.social_id);

                if (params.id > 0)
                    userClient = await connect.getRepository('UsersClient').findOne({
                        where: {
                            id: params.id
                        }
                    });
                else if (social_id > 0) {
                    userClient = await connect.getRepository('UsersClient').findOne({
                        where: {
                            social_id: social_id
                        }
                    }).catch((e) => {
                        let error = (e as Error).message
                        resolve({
                            success: false,
                            user: error,
                        });
                    });
                }

                if (!userClient) {
                    userClient = new UsersClient();
                    userClient.token = params.token ? params.token : '';
                    userClient.device_type = params.device_type ? params.device_type : '';
                    userClient.auth_type = params.auth_type > 0 ? params.auth_type : 1;
                }

                if (image_url.length > 0)
                    userClient.image_url = image_url;
                userClient.name = params.name;
                userClient.surname = params.surname;
                if (params.phone && params.phone.length > 0)
                    userClient.phone = params.phone;
                if (params.email && params.email.length > 0)
                    userClient.email = params.email;
                if (params.password && params.password.length > 0)
                    userClient.password = md5(params.password);
                if (social_id > 0)
                    userClient.social_id = social_id.toString();
                userClient.created_at = new Date();
                userClient.active = params.active ? params.active : 1;

                await connect.getRepository('UsersClient').save(userClient).then(async (value) => {
                    let userAddresses: UserAddresses = null;

                    if (params.address > 0) {
                        userAddresses = await connect.getRepository('UserAddresses').findOne({id: params.address}) as UserAddresses;
                        userAddresses.default = 1;
                        userAddresses.updated_at = new Date();
                    } else {
                        if (params.address_text && params.address_text.length > 0) {
                            userAddresses = await connect.getRepository('UserAddresses').findOne({
                                id_user: value.id,
                                address: params.address_text
                            }) as UserAddresses;

                            if (userAddresses == null)
                                userAddresses = new UserAddresses();
                            userAddresses.user = value;
                            userAddresses.id_user = value.id;
                            userAddresses.address = params.address_text;
                            userAddresses.latitude = params.lat;
                            userAddresses.longtitude = params.lng;
                            userAddresses.default = 1;
                            userAddresses.active = 1;
                            userAddresses.created_at = new Date();
                            userAddresses.updated_at = new Date();
                        }
                    }

                    if (userAddresses)
                        await connect.getRepository('UserAddresses').save(userAddresses).then(async (value2) => {
                            resolve({
                                success: true,
                                user: value["id"],
                                address: value2["id"]
                            });
                        });

                    resolve({
                        success: true,
                        user: value["id"],
                    });
                }).catch(error => reject(error));

            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getClientByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let users = await connect.getRepository('UsersClient').find(params);
                resolve(users);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    loginUser(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let users = await connect.getRepository('UsersClient').findOne(params).catch((error) => {
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

    removeUserByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                //get removoved item
                let user = await connect.getRepository('UsersClient').findOne(params);
                //remove item
                await connect.getRepository('UsersClient').remove(user);

                resolve(user);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getUserClientCount() {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                var shopCount = null;

                shopCount = await connect.getRepository('UsersClient').createQueryBuilder().getCount();

                resolve({
                    "count": shopCount,
                });
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    saveToken(id_user: number, token: string, type: number = 1) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                var userClient = await connect.getRepository('UsersClient').findOne(id_user) as UsersClient;

                if (userClient) {
                    userClient.token = token;
                    userClient.device_type = type;
                    await connect.getRepository('UsersClient').save(userClient);
                }

                resolve({
                    success: true,
                });
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }
}