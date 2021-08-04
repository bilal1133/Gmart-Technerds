import {Connection} from "typeorm";
import {dbConnection} from "../config/db";
import {DeliveryBoyOrderTrack} from "../entity/DeliveryBoyOrderTrack";
import {Orders} from "../entity/Orders";
import {UsersClient} from "../entity/UserClient";
import {UsersAdmin} from "../entity/UserAdmin";


export default class DeliveryBoyTrackModel {
    saveTrack(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let orderId = params.order_id;
                let userId = params.user_id;
                let latitude = params.latitude;
                let longitude = params.longitude;

                var order = order = await connect.getRepository('Orders').findOne({
                    id: orderId
                }) as Orders;

                let user: UsersAdmin = await connect.getRepository('UsersAdmin').findOne({
                    id: userId
                }) as UsersAdmin;

                var deliveryBoyOrderTrack = new DeliveryBoyOrderTrack();
                deliveryBoyOrderTrack.user = user;
                deliveryBoyOrderTrack.order = order;
                deliveryBoyOrderTrack.latitude = latitude;
                deliveryBoyOrderTrack.longtitude = longitude;
                deliveryBoyOrderTrack.created_at = new Date();

                await connect.getRepository('DeliveryBoyOrderTrack').save(deliveryBoyOrderTrack).catch((error) => {
                    reject({
                        error: error
                    });
                });

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