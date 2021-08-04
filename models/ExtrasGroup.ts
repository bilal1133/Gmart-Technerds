import { dbConnection } from '../config/db';
import { Connection } from 'typeorm';
import { Language } from '../entity/Language';
import {ProductExtraGroups} from "../entity/ProductExtraGroups";
import {ProductExtraGroupsLanguage} from "../entity/ProductExtraGroupsLanguage";

export default class ExtrasGroupModel {
    saveExtraGroup(post: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                var extraGroup = null;
                if (post.id > 0) {
                    extraGroup = await connect.getRepository('ProductExtraGroups').findOne({ id: post.id });
                } else {
                    extraGroup = new ProductExtraGroups();
                    extraGroup.created_at = new Date();
                }
                extraGroup.active = post.active;

                await connect.getRepository('ProductExtraGroups').save(extraGroup).then(async (value) => {
                    let names = post.name;
                    for (let i = 0; i < names.length; i++) {
                        if (!names[i]) continue;

                        let lang: Language = await connect.getRepository('Language').findOne({ id: names[i].id_lang }) as Language;

                        var extraGroupLang = null;
                        if (post.id > 0) {
                            extraGroupLang = await connect.getRepository('ProductExtraGroupsLanguage').findOne({ extraGroup: value, lang: lang });

                            if (!extraGroupLang)
                                extraGroupLang = new ProductExtraGroupsLanguage();
                        } else {
                            extraGroupLang = new ProductExtraGroupsLanguage();
                        }
                        extraGroupLang.name = names[i].value;
                        extraGroupLang.extraGroup = value;
                        extraGroupLang.lang = lang;

                        await connect.getRepository('ProductExtraGroupsLanguage').save(extraGroupLang).then(() => {
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

    getExtraGroupsByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let categories = await connect.getRepository('ProductExtraGroups').find(params);

                resolve(categories);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    removeExtraGroupsByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let categories = await connect.getRepository('ProductExtraGroups').find(params);
                //remove item
                await connect.getRepository('ProductExtraGroups').remove(categories);

                resolve(categories);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }
}