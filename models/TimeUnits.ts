import { dbConnection } from '../config/db';
import { Connection } from 'typeorm';
import { Language } from '../entity/Language';
import {Units} from "../entity/Unit";
import {UnitsLanguage} from "../entity/UnitLanguage";
import {TimeUnits} from "../entity/TimeUnits";
import {Shops} from "../entity/Shops";

export default class TimeUnitsModel {
    saveTimeUnit(post: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                var unit = null;
                if (post.id > 0) {
                    unit = await connect.getRepository('TimeUnits').findOne({ id: post.id });
                } else {
                    unit = new TimeUnits();
                    unit.created_at = new Date();
                }

                let shop: Shops = await connect.getRepository('Shops').findOne({ id: post.shop }) as Shops;

                unit.name = post.name;
                unit.active = post.active;
                unit.sort = post.sort;
                unit.shop = shop;

                await connect.getRepository('TimeUnits').save(unit).then(async (value) => {
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

    getTimeUnitsByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let timeUnits = await connect.getRepository('TimeUnits').find(params);

                resolve(timeUnits);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    removeTimeUnitsByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let timeUnits = await connect.getRepository('TimeUnits').find(params);
                //remove item
                await connect.getRepository('TimeUnits').remove(timeUnits);

                resolve(timeUnits);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }
}