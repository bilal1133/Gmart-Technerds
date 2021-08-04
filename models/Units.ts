import { dbConnection } from '../config/db';
import { Connection } from 'typeorm';
import { Language } from '../entity/Language';
import {Units} from "../entity/Unit";
import {UnitsLanguage} from "../entity/UnitLanguage";

export default class UnitsModel {
    saveUnit(post: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                var unit = null;
                if (post.id > 0) {
                    unit = await connect.getRepository('Units').findOne({ id: post.id });
                } else {
                    unit = new Units();
                    unit.created_at = new Date();
                }
                unit.active = post.active;

                await connect.getRepository('Units').save(unit).then(async (value) => {
                    let names = post.name;
                    for (let i = 0; i < names.length; i++) {
                        if (!names[i]) continue;

                        let lang: Language = await connect.getRepository('Language').findOne({ id: names[i].id_lang }) as Language;

                        var unitLang = null;
                        if (post.id > 0) {
                            unitLang = await connect.getRepository('UnitsLanguage').findOne({ unit: value, lang: lang });

                            if (!unitLang)
                                unitLang = new UnitsLanguage();
                        } else {
                            unitLang = new UnitsLanguage();
                        }
                        unitLang.name = names[i].value;
                        unitLang.unit = value;
                        unitLang.lang = lang;

                        await connect.getRepository('UnitsLanguage').save(unitLang).then(() => {
                            resolve({
                                success: true
                            });
                        });
                    }

                    resolve({
                        success: false
                    });
                });
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getUnitsByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let categories = await connect.getRepository('Units').find(params);

                resolve(categories);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    removeUnitsByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let categories = await connect.getRepository('Units').find(params);
                //remove item
                await connect.getRepository('Units').remove(categories);

                resolve(categories);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }
}