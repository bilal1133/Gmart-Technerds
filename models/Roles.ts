import { dbConnection } from '../config/db';
import { Connection } from 'typeorm';

export default class RolesModel {
    getRolesByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let roles = await connect.getRepository('Roles').find(params);
                resolve(roles);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }
}