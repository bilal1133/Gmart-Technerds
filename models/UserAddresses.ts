import {dbConnection} from '../config/db';
import {Connection} from 'typeorm';
import {UserAddresses} from '../entity/UserAddresses';
import {UsersClient} from "../entity/UserClient";

export default class UserAddressesModel {
    getUserAddressesByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let userAddresses = await connect.getRepository('UserAddresses').find(params);
                resolve(userAddresses);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    saveUserAddresses(post: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let userAddresses: UserAddresses = null;
                if (post.id > 0)
                    userAddresses = await connect.getRepository('UserAddresses').findOne({id: post.id}) as UserAddresses;
                else
                    userAddresses = new UserAddresses();

                let client = await connect.getRepository('UsersClient').findOne({id: post.user_id}) as UsersClient;
                
                userAddresses.id_user = post.user_id;
                userAddresses.user = client;
                userAddresses.address = post.address;
                userAddresses.latitude = post.lat;
                userAddresses.longtitude = post.lng;
                userAddresses.active = 1;
                userAddresses.default = 1;
                userAddresses.created_at = new Date();
                userAddresses.updated_at = new Date();

                await connect.getRepository('UserAddresses').save(userAddresses).then(() => {
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

    removeUserAddressByParams(params) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                //get removoved item
                let userAddresses = await connect.getRepository('UserAddresses').findOne(params);
                //remove item
                await connect.getRepository('UserAddresses').remove(userAddresses);

                resolve(userAddresses);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }
}