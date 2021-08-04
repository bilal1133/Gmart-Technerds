import {Connection} from "typeorm";
import {dbConnection} from "../config/db";
import {Language} from "../entity/Language";
import {GlobalSettings} from "../entity/GlobalSettings";

export default class GlobalSettingsModel {
    saveSetting(post: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();
                let settings: GlobalSettings = await connect.getRepository('GlobalSettings').findOne({id: post.id_param}) as GlobalSettings;
                settings.value = post.data;

                await connect.getRepository('GlobalSettings').save(settings).then(() => {
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
}