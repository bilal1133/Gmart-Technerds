import {Connection} from "typeorm";
import {dbConnection} from "../config/db";
import {Brands} from "../entity/Brands";
import {MobileParamsLang} from "../entity/MobileParamsLang";


export default class MobileParamsLangModel {
    getMobileParamsLangByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                //find by params
                let lang = await connect.getRepository('MobileParamsLang').find(params);
                resolve(lang);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getMobileParamsByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                //find by params
                let lang = await connect.getRepository('MobileParams').find(params);
                resolve(lang);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    saveMobileParams(id_param, id_lang, text) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                var mobileParamsLang = await connect.getRepository('MobileParamsLang').findOne({
                    id_param: id_param,
                    id_lang: id_lang
                }) as MobileParamsLang;

                var isExits = true;

                if (!mobileParamsLang) {
                    mobileParamsLang = new MobileParamsLang();
                    isExits = false;
                }

                mobileParamsLang.id_param = id_param;
                mobileParamsLang.id_lang = id_lang;
                mobileParamsLang.name = text.replace(/'/g, "`");

                if (isExits)
                    await connect.getRepository('MobileParamsLang').update({
                        id_param: id_param,
                        id_lang: id_lang
                    }, {
                        name: text.replace(/'/g, "`")
                    }).then((value) => {
                        resolve({
                            success: true
                        });
                    });
                else
                    await connect.getRepository('MobileParamsLang').save(mobileParamsLang).then((value) => {
                        resolve({
                            success: true
                        });
                    });

            }).catch((e) => {
                return e
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getLanguagesWithParams(id_lang: number) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                const data = await connect.getRepository('MobileParams').createQueryBuilder("MobileParams")
                    .leftJoinAndSelect("MobileParams.params_lang", "MobileParamsLang", "MobileParamsLang.id_lang = " + id_lang)
                    .select([
                        "MobileParams.name as mname",
                        "MobileParams.defaultText as defaultText",
                        "MobileParamsLang.name as lname",
                    ])
                    .getRawMany().catch((error) => reject(error));

                resolve(data);

            }).catch((e) => {
                return e
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }
}