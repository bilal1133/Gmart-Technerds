import {dbConnection} from '../config/db';
import {Connection} from 'typeorm';
import {Language} from '../entity/Language';
import removeImage from '../utils/removeImage';

export default class LanguagesModel {
    saveLanguages(name: string, shortName: string, imageUrl: string, id: number) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                var lang = null;
                if (id > 0) {
                    lang = await connect.getRepository('Language').findOne(id);
                    lang.name = name;
                    lang.short_name = shortName;
                    if (imageUrl.length > 0)
                        lang.image_url = imageUrl;

                } else {
                    lang = new Language();
                    lang.name = name;
                    lang.short_name = shortName;
                    lang.image_url = imageUrl;
                    lang.active = 1;
                }
                //save 
                await connect.getRepository('Language').save(lang).then(() => {
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

    getLanguageByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                //find by params
                let lang = await connect.getRepository('Language').find(params);
                resolve(lang);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    removeLanguageByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                //get rmeovoved item
                let lang = await connect.getRepository('Language').findOne(params);
                //remove item
                await connect.getRepository('Language').remove(lang);
                //remove image
                removeImage(lang['image_url']);

                resolve(lang);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    changeEnabled(id: number) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let lang = await connect.getRepository('Language').findOne({
                    id: id
                }) as Language;

                lang.active = lang.active == 1 ? 0 : 1;

                await connect.getRepository('Language').save(lang);

                resolve(lang);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    initTable() {

    }
}