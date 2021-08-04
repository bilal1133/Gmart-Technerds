import {dbConnection} from '../config/db';
import {Connection} from 'typeorm';
import {permissionsSeed} from "../seeds/permissions.seed";
import {Permissions} from "../entity/Permissions";

export default class PermissionsModel {
    getPermissionsByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let permissions = await connect.getRepository('Permissions').find(params);
                resolve(permissions);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    initTable() {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                const permissionsData = permissionsSeed;
                for (const item of permissionsData) {
                    let permissions = await connect.getRepository('Permissions').findOne({
                        name: item.name
                    }) as Permissions;

                    if (!permissions) {
                        permissions = new Permissions();
                    }

                    permissions.name = item.name;
                    permissions.type = item.type;
                    permissions.url = item.url;

                    await connect.getRepository('Permissions').save(permissions);
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