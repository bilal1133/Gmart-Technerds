import Orders from "../../../../models/Orders";
import UserClient from "../../../../models/UserClient";

export default async function handler(req, res) {
    let post = req.body;
    try {
        let id_user = post.id_user;
        let name = post.name;
        let phone = post.phone;
        let address = post.address;
        let longitude = post.longitude;
        let latitude = post.latitude;
        let id_shop = post.id_shop;
        let tax = post.tax;
        let delivery_fee = post.delivery_fee;
        let total_sum = post.total_sum;
        let total_discount = post.total_discount;
        let delivery_date = post.delivery_date;
        let comment = post.comment;
        let type = post.type;
        let detail = post.detail;
        let payment_status = post.payment_status;
        let payment_method = post.payment_method;

        let names = name.split(" ");

        const userClient = new UserClient();
        let userData = await userClient.save({
            id: id_user,
            name: names.length > 0 ? names[0] : "Unknown",
            surname: names.length > 1 ? names[1] : "Unknown",
            phone: phone,
            address_text: address,
            lat: latitude,
            lng: longitude
        }, "");

        const orders = new Orders();
        let data = await orders.saveOrder({
            id_user: id_user,
            id_shop: id_shop,
            id_delivery_address: userData["address"],
            deliver_boy: 0,
            order_status: 1,
            payment_status: payment_status,
            payment_method: payment_method,
            tax: tax,
            delivery_fee: delivery_fee,
            total_sum: total_sum,
            total_discount: total_discount,
            delivery_date: delivery_date,
            comment: comment,
            type: type,
            detail: detail,
            isMobile: true
        });

        res.status(200).json({
            "data": data
        })
    } catch (e) {
        res.status(400).json({
            "error": e,
            "file": "saveOrder.ts"
        })
    }
}