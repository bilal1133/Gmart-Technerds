import {dbConnection} from '../config/db';
import {Connection} from 'typeorm';
import LanguagesModel from "./Languages";

export default class DataTablesModel {
    getCount(entity_name: string, searchQuery: String = "", relationTable: any = false) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let count = 0;
                if (relationTable) {
                    if (searchQuery.length > 0)
                        count = await connect.getRepository(entity_name).createQueryBuilder().leftJoinAndSelect(relationTable[0], relationTable[1]).where(searchQuery).getCount();
                    else
                        count = await connect.getRepository(entity_name).createQueryBuilder().leftJoinAndSelect(relationTable[0], relationTable[1]).getCount();
                } else {
                    if (searchQuery.length > 0)
                        count = await connect.getRepository(entity_name).createQueryBuilder().where(searchQuery).getCount();
                    else
                        count = await connect.getRepository(entity_name).createQueryBuilder().getCount();
                }
                resolve(count);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getByLimitAndOrder(entity_name: string, limit: number, offset: number, order: string, dir: string, relation: any, relationTable: any, condition: any = []) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let datas;
                if (relation.length == 0)
                    datas = await connect.getRepository(entity_name).createQueryBuilder().limit(limit).offset(offset).orderBy(order, dir == 'asc' ? 'ASC' : "DESC").getMany();
                else {
                    var modelData = connect.getRepository(entity_name).createQueryBuilder();
                    for (let i = 0; i < relation.length; i++) {
                        if (condition.length > 0 && condition[i].length > 0)
                            modelData = modelData.leftJoinAndSelect(relation[i], relationTable[i], condition[i]);
                        else
                            modelData = modelData.leftJoinAndSelect(relation[i], relationTable[i]);
                    }
                    datas = await modelData.limit(limit).offset(offset).orderBy(order, dir == 'asc' ? 'ASC' : "DESC").getMany();
                }
                resolve(datas);
            }).catch((e) => {
                console.log(e);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }


    getByLimitAndSearch(entity_name: string, limit: number, offset: number, order: string, dir: string, searchQuery: string, relation: any, relationTable: any, condition: any = []) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let datas;
                if (relation.length == 0)
                    datas = await connect.getRepository(entity_name).createQueryBuilder().where(searchQuery).limit(limit).offset(offset).orderBy(order, dir == 'asc' ? 'ASC' : "DESC").getMany();
                else {
                    var modelData = connect.getRepository(entity_name).createQueryBuilder();
                    for (let i = 0; i < relation.length; i++) {
                        if (condition.length > 0 && condition[i].length > 0)
                            modelData = modelData.leftJoinAndSelect(relation[i], relationTable[i], condition[i]);
                        else
                            modelData = modelData.leftJoinAndSelect(relation[i], relationTable[i]);
                    }
                    datas = await modelData.where(searchQuery).limit(limit).offset(offset).orderBy(order, dir == 'asc' ? 'ASC' : "DESC").getMany();
                }
                resolve(datas);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getCountSearch(entity_name: string, searchQuery: string, relation: any, relationTable: any, condition: any = []) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let count;
                if (relation.length == 0)
                    count = await connect.getRepository(entity_name).createQueryBuilder().where(searchQuery).getCount();
                else {
                    var data = connect.getRepository(entity_name).createQueryBuilder();
                    for (let i = 0; i < relation.length; i++) {
                        if (condition.length > 0 && condition[i].length > 0)
                            data = data.leftJoinAndSelect(relation[i], relationTable[i], condition[i]);
                        else
                            data = data.leftJoinAndSelect(relation[i], relationTable[i]);
                    }
                    count = await data.where(searchQuery).getCount();
                }
                resolve(count);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }
}