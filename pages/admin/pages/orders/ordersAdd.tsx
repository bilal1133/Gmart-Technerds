import React, {Component} from 'react';
import Layout from '../../layouts/layouts'
import Head from 'next/head';
import axios from 'axios';
import AddAddressModal from "../../components/addAddressModal";
import AddClientModal from "../../components/AddClientModal";
import {Link, Redirect} from 'react-router-dom';
import {RouteProps} from 'react-router';
import token from "../../../api/v1/users/token";

declare var $: any;

interface AppProps {

}

interface AppState {
    tax: number,
    delivery_fee: number,
    total_sum: number,
    total_discount: number,
    id_user: number,
    users: any[],
    order_status: number,
    order_statuses: any[],
    payment_status: number,
    payment_statuses: any[],
    payment_method: number,
    payment_methods: any[],
    comment: string,
    active: number,
    id: number,
    shops: any[],
    shop: number,
    address: number,
    addresses: any[],
    is_add_address: boolean,
    delivery_type: number,
    shop_delivery_type: number,
    order_mark: number,
    order_review: string,
    delivery_boys: any[],
    id_delivery_boy: number,
    delivery_date: string,
    products: any[],
    product: number,
    replace_product: number,
    change_product: number,
    productsCache: any[],
    delivery_boy_comment: string,
    redirectTo: boolean,
    old_order_status: number,
    time_units: any[],
    day_units: any[],
    delivery_day: string,
    delivery_boy_status: number,
    loading: boolean,
    token: string,
    device_type: number
}

export default class OrdersAdd extends Component<AppProps & RouteProps, AppState> {
    constructor(props) {
        super(props);

        this.state = {
            tax: 0,
            delivery_fee: 0,
            total_sum: 0,
            total_discount: 0,
            id_user: -1,
            order_status: -1,
            payment_status: -1,
            payment_method: -1,
            comment: "",
            users: [],
            order_statuses: [],
            payment_statuses: [],
            payment_methods: [],
            active: 0,
            id: -1,
            shops: [],
            shop: -1,
            address: -1,
            addresses: [],
            is_add_address: false,
            delivery_type: 1,
            shop_delivery_type: 3,
            order_mark: 5,
            order_review: "",
            delivery_boys: [],
            id_delivery_boy: -1,
            delivery_date: "",
            products: [],
            product: -1,
            replace_product: -1,
            change_product: -1,
            productsCache: [],
            delivery_boy_comment: "",
            delivery_boy_status: 1,
            redirectTo: false,
            old_order_status: 1,
            time_units: [],
            day_units: [],
            delivery_day: "",
            loading: true,
            token: "",
            device_type: 1
        };

        this.onTaxChangeName = this.onTaxChangeName.bind(this);
        this.onDeliveryFeeChangeName = this.onDeliveryFeeChangeName.bind(this);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangeOrderStatus = this.onChangeOrderStatus.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.getOrderStatus = this.getOrderStatus.bind(this);
        this.getShops = this.getShops.bind(this);
        this.getPaymentStatus = this.getPaymentStatus.bind(this);
        this.getPaymentMethod = this.getPaymentMethod.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.onChangeActive = this.onChangeActive.bind(this);
        this.onChangeShop = this.onChangeShop.bind(this);
        this.saveOrders = this.saveOrders.bind(this);
        this.onClickAddAddress = this.onClickAddAddress.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeDeliveryType = this.onChangeDeliveryType.bind(this);
        this.onChangeOrderReview = this.onChangeOrderReview.bind(this);
        this.onChangeDeliveryDate = this.onChangeDeliveryDate.bind(this);
        this.onProductChange = this.onProductChange.bind(this);
        this.onSubmitProduct = this.onSubmitProduct.bind(this);
        this.onClickProductDelete = this.onClickProductDelete.bind(this);
        this.onDecriment = this.onDecriment.bind(this);
        this.onIncrement = this.onIncrement.bind(this);
        this.onReplaceProductChange = this.onReplaceProductChange.bind(this);
        this.onSubmitReplaceProduct = this.onSubmitReplaceProduct.bind(this);
        this.onChangeProduct = this.onChangeProduct.bind(this);
        this.onChangeDeliveryDay = this.onChangeDeliveryDay.bind(this);
        this.getTimeUnits = this.getTimeUnits.bind(this);
        this.getDayUnits = this.getDayUnits.bind(this);
        this.getOrdersInfo = this.getOrdersInfo.bind(this);
        this.onChangeDeliveryBoyComment = this.onChangeDeliveryBoyComment.bind(this);
        this.getDeliveryBoyOrdersInfo = this.getDeliveryBoyOrdersInfo.bind(this);
        this.changePaymentMethod = this.changePaymentMethod.bind(this);
        this.changePaymentStatus = this.changePaymentStatus.bind(this);
        this.onChangeDeliveryBoy = this.onChangeDeliveryBoy.bind(this);
        this.calculateTotals = this.calculateTotals.bind(this);
    }

    componentDidMount() {
        this.getUsers();

        if (this.props.match && this.props.match.params.id > 0)
            this.getOrdersInfo(this.props.match.params.id);
        else
            this.setState({
                loading: false
            })

        let self = this;
        setTimeout(() => {
            $('#AddClientModal').on('hidden.bs.modal', function () {
                self.getUsers(true);
            });
            $('#addAddressModal').on('hidden.bs.modal', function () {
                self.getAddressesByUserId(self.state.id_user, true);
            });
            $('.shops-select').selectpicker({
                liveSearch: true
            });
            $('.delivery-boys-select').selectpicker({
                liveSearch: true
            });
            $('.product-select').selectpicker({
                liveSearch: true
            });
            $('.replace-product-select').selectpicker({
                liveSearch: true
            });
            $('.client-select').selectpicker({
                liveSearch: true
            });
            $('.time-unit-select').selectpicker({
                liveSearch: true
            });
            $('.address-select').selectpicker({
                liveSearch: true
            });
            $('.order-status-select').selectpicker({
                liveSearch: true
            });
            $('.payment-status-select').selectpicker({
                liveSearch: true
            });
            $('.day-unit-select').selectpicker({
                liveSearch: true
            });
            $('.payment-method-select').selectpicker({
                liveSearch: true
            });
        }, 1000);
    }

    async getOrdersInfo(id: number) {
        //get all categories list
        const {data: data} = await axios.post('/api/orders/order/info', {id})

        var date_string = data.data.delivery_date;
        var date_array = date_string.split(" ");

        this.setState({
            tax: data.data.tax,
            delivery_fee: data.data.delivery_fee,
            // total_sum: data.data.total_sum,
            // total_discount: data.data.total_discount,
            comment: data.data.comment,
            active: data.data.active,
            shop: data.data.id_shop,
            payment_method: data.data.payment_method.id,
            payment_status: data.data.payment_status.id,
            order_status: data.data.order_status.id,
            old_order_status: data.data.order_status.id,
            id_user: data.data.user.id,
            id_delivery_boy: data.data.delivery_boy != null ? data.data.delivery_boy.id : -1,
            id: data.data.id,
            address: data.data.id_delivery_address,
            delivery_date: date_array[1],
            delivery_day: date_array[0],
            loading: false,
            token: data.data.user.token,
            device_type: data.data.user.device_type
        })

        this.getAddressesByUserId(data.data.user.id);
        this.getShops();

        if (data.data.delivery_boy != null && data.data.delivery_boy.id > 0) {
            this.getDeliveryBoyOrdersInfo(data.data.delivery_boy.id, data.data.id);
        }

        var dataDetail = [];
        var order_detail = data.data.order_detail;
        if (order_detail.length > 0)
            for (let i = 0; i < order_detail.length; i++) {
                dataDetail.push({
                    id: order_detail[i].product.id,
                    type: (order_detail[i].is_replaced != 0 || order_detail[i].is_replacement_product != 0) ? (order_detail[i].is_replaced == 1 ? 1 : 2) : 0,
                    count: order_detail[i].quantity,
                    exchange_id: (order_detail[i].is_replaced != 0 || order_detail[i].is_replacement_product != 0) ? order_detail[i].replace_product.id : -1,
                    data: order_detail[i].product
                })
            }

        this.setState({
            productsCache: dataDetail
        });

        this.calculateTotals();


        setTimeout(() => {
            $('.time-unit-select').selectpicker('refresh');
            $('.day-unit-select').selectpicker('refresh');
        }, 1000);
    }

    async getDeliveryBoyOrdersInfo(id_user: number, id_order) {
        //get all categories list
        const {data: data} = await axios.post('/api/deliveryBoy/orderInfo', {id_user: id_user, id_order: id_order})
        this.setState({
            delivery_boy_comment: data.data.comment,
            delivery_boy_status: data.data.status
        })
    }

    onTaxChangeName(e: any) {
        this.setState({
            tax: e.target.value
        });
    }

    onDeliveryFeeChangeName(e: any) {
        this.setState({
            tax: e.target.value
        });
    }

    onChangeUser(e: any) {
        this.setState({
            id_user: e.target.value
        })

        this.getAddressesByUserId(e.target.value, true);
        this.getShops();
    }

    onChangeDeliveryBoy(e: any) {
        this.setState({
            id_delivery_boy: e.target.value
        })
    }

    onChangeOrderStatus(e: any) {
        this.setState({
            order_status: e.target.value
        })
    }

    onChangeShop(e: any) {
        let id = e.target.value;
        let index = this.state.shops.findIndex((item) => item.id == id);

        this.setState({
            shop: id,
            tax: this.state.shops[index].tax,
            delivery_fee: this.state.shops[index].delivery_price,
            shop_delivery_type: this.state.shops[index].delivery_type,
            productsCache: []
        })

        this.getDeliveryBoys(id);
        this.getProducts(id, true);
    }

    async getShops() {
        //get all active users list
        const {data: data} = await axios.post('/api/shops/active')

        var shop = this.state.shop == -1 ? data.data[0].id : this.state.shop;
        var tax = this.state.tax == -1 ? data.data[0].tax : this.state.tax;
        var delivery_fee = this.state.delivery_fee == -1 ? data.data[0].delivery_price : this.state.delivery_fee;
        var show_delivery_type = this.state.shop_delivery_type == -1 ? data.data[0].delivery_type : this.state.shop_delivery_type;

        this.setState({
            shops: data.data,
            shop: shop,
            tax: tax,
            delivery_fee: delivery_fee,
            shop_delivery_type: show_delivery_type,
        })

        this.getOrderStatus();
        this.getPaymentStatus();
        this.getPaymentMethod();

        if (data.data[0].id > 0) {
            this.getDeliveryBoys(shop);
            this.getProducts(shop);
            this.getTimeUnits(shop);
            this.getDayUnits(shop);
        }

        setTimeout(() => {
            $('.shops-select').selectpicker('refresh');
        }, 1000);
    }

    async getDeliveryBoys(id_shop: number) {
        //get all active delivery boys list
        const {data: data} = await axios.post('/api/users/admin/deliveryBoy', {id_shop: id_shop})
        this.setState({
            delivery_boys: data.data,
            id_delivery_boy: data.data.length > 0 ? data.data[0].id : -1
        })

        setTimeout(() => {
            $('.delivery-boys-select').selectpicker('refresh');
        }, 1000);
    }


    async getProducts(id_shop: number, refresh: boolean = false) {
        //get all active users list
        const {data: data} = await axios.post('/api/products/byShop', {id_shop: id_shop})
        this.setState({
            products: data.data,
            product: data.data.length > 0 ? data.data[0].id : -1,
            replace_product: data.data.length > 0 ? data.data[0].id : -1,
        })

        setTimeout(() => {
            $('.product-select').selectpicker('refresh');
            $('.replace-product-select').selectpicker('refresh');
        }, 1000);
    }

    onClickAddAddress() {
        this.setState({
            is_add_address: true,
            address: -1
        })

        setTimeout(() => {
            $('.address-select').selectpicker('refresh');
        }, 1000);
    }

    async getUsers(refresh: boolean = false) {
        //get all active users list
        const {data: data} = await axios.post('/api/users/client/active')
        if (data && data.data)
            this.setState({
                users: data.data
            })


        setTimeout(() => {
            $('.client-select').selectpicker('refresh');
        }, 1000);
    }

    //on change address select
    onChangeAddress(e: any) {
        this.setState({
            address: e.target.value,
        });
        if (e.target.value > 0)
            this.setState({
                is_add_address: false
            });
        else this.setState({
            is_add_address: true
        });
    }

    async getAddressesByUserId(id: number, refresh: boolean = false) {
        //get user by id
        const {data: data} = await axios.post('/api/users/address/byUser', {id: id});

        let index = data.data.findIndex((item) => item.default == 1);

        this.setState({
            addresses: data.data,
            address: this.state.address == -1 ? (index > -1 ? data.data[index].id : data.data.length > 0 ? data.data[0].id : -1) : this.state.address
        })
        ;

        setTimeout(() => {
            $('.address-select').selectpicker('refresh');
        }, 1000);
    }

    async getOrderStatus() {
        //get all active order status list
        const {data: data} = await axios.post('/api/orders/status/active')
        this.setState({
            order_statuses: data.data,
            order_status: this.state.order_status == -1 ? data.data[0].id : this.state.order_status
        })

        setTimeout(() => {
            $('.order-status-select').selectpicker('refresh');
        }, 1000);
    }

    async getPaymentStatus() {
        //get all active payment status list
        const {data: data} = await axios.post('/api/payments/status/active')
        this.setState({
            payment_statuses: data.data,
            payment_status: this.state.payment_status == -1 ? data.data[0].id : this.state.payment_status
        })

        setTimeout(() => {
            $('.payment-status-select').selectpicker('refresh');
        }, 1000);
    }

    async getTimeUnits(id_shop: number) {
        const {data: data} = await axios.post('/api/timeUnits/active', {id_shop: id_shop})
        this.setState({
            time_units: data.data,
            delivery_date: data.data.length > 0 ? data.data[0].name : "08:00-24:00"
        })

        setTimeout(() => {
            $('.time-unit-select').selectpicker('refresh');
        }, 1000);
    }

    async getDayUnits(id_shop: number) {
        let today = new Date();
        let tomorrow = new Date();
        let afterTomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        afterTomorrow.setDate(tomorrow.getDate() + 2);

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        this.setState({
            delivery_day: today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate(),
            day_units: [
                {
                    name: "Today",
                    day: today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
                },
                {
                    name: "Tomorrow",
                    day: tomorrow.getFullYear() + "-" + (tomorrow.getMonth() + 1) + "-" + tomorrow.getDate()
                },
                {
                    name: afterTomorrow.getDate() + " " + monthNames[afterTomorrow.getMonth()],
                    day: afterTomorrow.getFullYear() + "-" + (afterTomorrow.getMonth() + 1) + "-" + afterTomorrow.getDate()
                }
            ]
        });

        setTimeout(() => {
            $('.day-unit-select').selectpicker('refresh');
        }, 1000);
    }

    async getPaymentMethod() {
        //get all active payment method list
        const {data: data} = await axios.post('/api/payments/method/active')
        this.setState({
            payment_methods: data.data,
            payment_method: this.state.payment_method == -1 ? data.data[0].id : this.state.payment_method
        })

        setTimeout(() => {
            $('.payment-method-select').selectpicker('refresh');
        }, 1000);
    }

    onProductChange(e: any) {
        this.setState({
            product: e.target.value
        })
    }

    onReplaceProductChange(e: any) {
        this.setState({
            replace_product: e.target.value
        })
    }

    changePaymentStatus(e: any) {
        this.setState({
            payment_status: e.target.value
        })
    }

    changePaymentMethod(e: any) {
        this.setState({
            payment_method: e.target.value
        })
    }

    onChangeComment(e: any) {
        this.setState({
            comment: e.target.value
        })
    }

    onChangeDeliveryBoyComment(e: any) {
        this.setState({
            delivery_boy_comment: e.target.value
        })
    }

    onChangeOrderReview(e: any) {
        this.setState({
            order_review: e.target.value
        })
    }

    onChangeDeliveryDate(e: any) {
        this.setState({
            delivery_date: e.target.value
        })
    }

    onChangeDeliveryDay(e: any) {
        this.setState({
            delivery_day: e.target.value
        })
    }

    onChangeActive(active: number) {
        this.setState({
            active: active
        });
    }

    onChangeDeliveryType(type: number) {
        this.setState({
            delivery_type: type
        });

        this.getDeliveryBoys(this.state.shop);
    }

    onSubmitProduct() {
        let index = this.state.products.findIndex((item) => item.id == this.state.product);
        if (index > -1) {
            let data = this.state.productsCache;
            let mindex = data.findIndex((item) => item.id == this.state.product);
            let productData = this.state.products[index];

            if (mindex == -1) {
                data.push({
                    id: this.state.product,
                    type: 0,
                    count: 1,
                    exchange_id: -1,
                    data: productData
                })

                this.setState({
                    productsCache: data
                });
                this.calculateTotals();
            }
        }
    }

    calculateTotals() {
        var total = 0;
        var total_d = 0;
        if (this.state.productsCache.length > 0) {
            for (let i = 0; i < this.state.productsCache.length; i++) {
                if (this.state.productsCache[i].data.is_replaced != 1) {
                    total += this.state.productsCache[i].data.price * this.state.productsCache[i].count;
                    total_d += this.state.productsCache[i].data.discount_price > 0 ? (this.state.productsCache[i].data.price - this.state.productsCache[i].data.discount_price) * this.state.productsCache[i].count : 0;
                }
            }
        }

        this.setState({
            total_sum: total,
            total_discount: total_d
        });
    }

    onSubmitReplaceProduct() {
        let data = this.state.productsCache;
        let index = data.findIndex((item) => item.id == this.state.change_product);
        if (index > -1 && this.state.change_product != this.state.replace_product) {
            let nindex = this.state.products.findIndex((item) => item.id == this.state.replace_product);
            let mindex = data.findIndex((item) => item.id == this.state.replace_product && item.exchange_id == this.state.change_product);

            let productData = this.state.products[nindex];
            let changeProductData = this.state.products[index];
            let removedSum = data[index].count * changeProductData.price;
            let removedDiscount = changeProductData.discount_price > 0 ? data[index].count * (changeProductData.price - changeProductData.discount_price) : 0;

            if (nindex > -1) {
                data[index].type = 1;
                data[index].exchange_id = this.state.replace_product;
                if (mindex == -1) {
                    data.push({
                        id: this.state.replace_product,
                        type: 2,
                        count: 1,
                        exchange_id: this.state.change_product,
                        data: productData
                    })
                } else {
                    data[mindex].type = 2;
                    data[mindex].exchange_id = this.state.change_product;
                }
            }
            this.setState({
                productsCache: data,
            });

            this.calculateTotals();
        }
    }

    onChangeProduct(e, id_product) {
        e.preventDefault();

        this.setState({
            change_product: id_product
        })
    }

    onClickProductDelete(e, id_product: number, exchange_id: number) {
        e.preventDefault();

        var data = this.state.productsCache;
        let index = data.findIndex((item) => item.id == id_product && item.exchange_id == exchange_id);
        if (index > -1) {
            data.splice(index, 1);

            let exindex = data.findIndex((item) => item.exchange_id == id_product && item.id == exchange_id);
            if (exindex > -1 && data[exindex].type == 2) {
                data.splice(exindex, 1);
            } else if (exindex > -1 && data[exindex].type == 1) {
                data[exindex].type = 0;
            }

        }

        this.setState({
            productsCache: data
        });
        this.calculateTotals();
    }

    onIncrement(e, id_product: number, exchange_id: number) {
        e.preventDefault();

        var data = this.state.productsCache;
        let index = data.findIndex((item) => item.id == id_product && item.exchange_id == exchange_id);
        if (index > -1 && data[index].type != 1 && data[index].count < data[index].data.quantity) {
            data[index].count = data[index].count + 1;
        }

        this.setState({
            productsCache: data
        })

        this.calculateTotals();
    }

    onDecriment(e, id_product: number, exchange_id: number) {
        e.preventDefault();

        var data = this.state.productsCache;
        let index = data.findIndex((item) => item.id == id_product && item.exchange_id == exchange_id);
        if (index > -1 && data[index].count > 1 && data[index].type != 1) {
            data[index].count = data[index].count - 1;
        }

        this.setState({
            productsCache: data
        });
        this.calculateTotals();
    }

    sendNotification(title, body, order_id, to) {
        var settings = {
            "url": "https://fcm.googleapis.com/fcm/send",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "key=AAAAK_HMt04:APA91bHPORNFmswWRZWguLQ63ldzALd4FoVC1HX3CB4AmsmxOCyVjQVaXYcDx0ULtTE3ILI_pmPvIGpRQuFgm5QQpP4MBKwOci4xSnkPEsYXqbC2oZvMpBYhlCih1E4eMVYGVv84DNaP"
            },
            "data": JSON.stringify({
                "notification": {
                    "body": body,
                    "title": title
                }, "priority": "high",
                "data": {
                    "order_id": order_id
                },
                "to": to
            }),
        };

        $.ajax(settings).done(function (response) {

        });
    }

    async saveOrders() {
        //save orders data
        const {data: data} = await axios.post('/api/orders/order/save', {
            tax: this.state.tax,
            delivery_fee: this.state.delivery_fee,
            total_sum: this.state.total_sum,
            total_discount: this.state.total_discount,
            id_user: this.state.id_user,
            order_status: this.state.order_status,
            payment_status: this.state.payment_status,
            payment_method: this.state.payment_method,
            comment: this.state.comment,
            active: this.state.active,
            deliver_boy: this.state.id_delivery_boy,
            order_mark: this.state.order_mark,
            order_review: this.state.order_review,
            id_delivery_address: this.state.address,
            id_shop: this.state.shop,
            delivery_date: this.state.delivery_day + " " + this.state.delivery_date,
            type: this.state.delivery_type,
            detail: this.state.productsCache,
            id: this.state.id,
            delivery_boy_comment: this.state.delivery_boy_comment
        });

        if (data.data.success) {
            if (this.state.old_order_status != this.state.order_status) {
                console.log(this.state.old_order_status);
                console.log(this.state.order_status);
                if (this.state.order_status == 2)
                    this.sendNotification("Gmarket", "Your order is ready to delivery", this.state.id, this.state.token);
                else if (this.state.order_status == 3)
                    this.sendNotification("Gmarket", "Your order is on a way", this.state.id, this.state.token);
                else if (this.state.order_status == 4)
                    this.sendNotification("Gmarket", "Your order is delivered", this.state.id, this.state.token);
                else if (this.state.order_status == 5)
                    this.sendNotification("Gmarket", "Your order is canceled", this.state.id, this.state.token);
            }


            this.setState({
                redirectTo: true
            })
        }
    }

    render() {
        if (this.state.redirectTo)
            return (<Redirect to='/orders'/>);

        return (
            <Layout>
                <Head>
                    <title>Gmarket - Edit order</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Add order</h1>
                <div className="row">
                    <div className="col card shadow mb-4 padding0 mr-2">
                        <div className="row card-header py-3">
                            <div className="col col-md-12 col-sm-12">
                                <h6 className="m-0 font-weight-bold text-primary">Client info</h6>
                            </div>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group row">
                                    <div className="col col-md-12 col-sm-12">
                                        <label>Client</label>
                                        <div className="row">
                                            <div className="col col-md-8 col-sm-12">
                                                <select className="form-control client-select"
                                                        value={this.state.id_user}
                                                        onChange={this.onChangeUser}>
                                                    <option value="-1">No client selected</option>
                                                    {
                                                        typeof this.state.users != 'undefined' && this.state.users.length > 0 && this.state.users.map((item) => {
                                                            return (
                                                                <option key={item.id}
                                                                        value={item.id}>{item.name} {item.surname}</option>
                                                            );
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <a href="#" className="btn btn-success ml-2" data-toggle="modal"
                                               data-target="#AddClientModal">Add Client
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    {
                                        this.state.id_user > 0 && (
                                            <div className="col col-md-12 col-sm-12">
                                                <label>Address</label>
                                                <div className="row">
                                                    <div className="col col-md-8 col-sm-12">
                                                        <select placeholder="Addresses"
                                                                className="form-control address-select"
                                                                value={this.state.address}
                                                                onChange={this.onChangeAddress}>
                                                            {
                                                                this.state.addresses.length > 0 && this.state.addresses.map((item) => {
                                                                    return (
                                                                        <option key={item.id}
                                                                                value={item.id}>{item.address}</option>
                                                                    );
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    <a href="#" className="btn btn-success ml-2"
                                                       onClick={this.onClickAddAddress} data-toggle="modal"
                                                       data-target="#addAddressModal">Add new address
                                                    </a>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col col-sm-12 col-md-6">
                        {
                            this.state.id_user > 0 && (
                                <div className="card shadow mb-4 padding0">
                                    <div className="row card-header py-3">
                                        <div className="col col-md-6 col-sm-6">
                                            <h6 className="m-0 font-weight-bold text-primary">Shop info</h6>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group row">
                                                <div className="col col-md-12 col-sm-12">
                                                    <label>Shop</label>
                                                    <select className="form-control shops-select"
                                                            value={this.state.shop}
                                                            onChange={this.onChangeShop}>
                                                        {
                                                            this.state.shops.length > 0 && this.state.shops.map((item) => {
                                                                return (
                                                                    <option key={item.id}
                                                                            value={item.id}>{item.lang[0].name}</option>
                                                                );
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col col-md-6 col-sm-12">
                                                    <label>Tax</label>
                                                    <input className="form-control" type="tax"
                                                           onChange={this.onTaxChangeName}
                                                           value={this.state.tax} placeholder="Tax" required={true}
                                                           disabled={true}/>
                                                </div>
                                                <div className="col col-md-6 col-sm-12">
                                                    <label>Delivery fee</label>
                                                    <input className="form-control"
                                                           type="number"
                                                           onChange={this.onDeliveryFeeChangeName}
                                                           value={this.state.delivery_fee} placeholder="Delivery Fee"
                                                           required={true} disabled={true}/>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                {
                    this.state.id_user > 0 && this.state.shop > 0 && (
                        <>
                            <div className="row">
                                <div className="col card shadow mb-4 padding0 float-right mr-2">
                                    <div className="row card-header py-3">
                                        <div className="col col-md-6 col-sm-6">
                                            <h6 className="m-0 font-weight-bold text-primary">Order info</h6>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group row">
                                                <div className="col col-md-6 col-sm-12">
                                                    <label>Total amount</label>
                                                    <input className="form-control" value={this.state.total_sum}
                                                           placeholder="Total amount" required={true} disabled={true}/>
                                                </div>
                                                <div className="col col-md-6 col-sm-12">
                                                    <label>Total discount</label>
                                                    <input className="form-control" value={this.state.total_discount}
                                                           placeholder="Total discount" required={true}
                                                           disabled={true}/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col col-md-6 col-sm-12">
                                                    <label>Order Status</label>
                                                    <select className="form-control order-status-select"
                                                            value={this.state.order_status}
                                                            disabled={this.state.order_status == 2 && this.state.id_delivery_boy > -1}
                                                            onChange={this.onChangeOrderStatus}>
                                                        {
                                                            this.state.order_statuses.length > 0 && this.state.order_statuses.map((item) => {
                                                                if ((this.state.old_order_status == 1 && (item.id == 1 || item.id == 2 || item.id == 5)) || (this.state.old_order_status == 2 && (item.id == 2 || item.id == 3 || item.id == 5))
                                                                    || (this.state.old_order_status == 3 && (item.id == 3 || item.id == 4 || item.id == 5)) || (this.state.old_order_status == 4 && (item.id == 4 || item.id == 5)) || (this.state.old_order_status == 5 && item.id == 5))
                                                                    return (
                                                                        <option key={item.id}
                                                                                value={item.id}>{item.name}</option>
                                                                    );
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="col col-md-6 col-sm-12">
                                                    <label>Payment status</label>
                                                    <select className="form-control payment-status-select"
                                                            value={this.state.payment_status}
                                                            onChange={this.changePaymentStatus}>
                                                        {
                                                            this.state.payment_statuses.length > 0 && this.state.payment_statuses.map((item) => {
                                                                return (
                                                                    <option key={item.id}
                                                                            value={item.id}>{item.name}</option>
                                                                );
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col col-md-6 col-sm-12">
                                                    <label>Payment method</label>
                                                    <select className="form-control payment-method-select"
                                                            value={this.state.payment_method}
                                                            onChange={this.changePaymentMethod}>
                                                        {
                                                            this.state.payment_methods.length > 0 && this.state.payment_methods.map((item) => {
                                                                return (
                                                                    <option key={item.id}
                                                                            value={item.id}>{item.name}</option>
                                                                );
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="col col-md-6 col-sm-12">
                                                    <label>Order's Comment</label>
                                                    <textarea className="form-control" value={this.state.comment}
                                                              onChange={this.onChangeComment}></textarea>
                                                </div>
                                            </div>
                                            {
                                                this.state.order_status == 4 && (
                                                    <div className="form-group row">
                                                        <div className="col col-md-6 col-sm-12">
                                                            <label>Order mark</label>
                                                            <input className="form-control" type="number"
                                                                   value={this.state.order_mark}
                                                                   placeholder="Order mark" required={true}/>
                                                        </div>
                                                        <div className="col col-md-6 col-sm-12">
                                                            <label>Order's Review</label>
                                                            <textarea className="form-control"
                                                                      value={this.state.order_review}
                                                                      onChange={this.onChangeOrderReview}></textarea>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </form>
                                    </div>
                                </div>
                                <div className="col col-sm-12 col-md-6 card shadow mb-4 padding0 float-right">
                                    <div className="row card-header py-3">
                                        <div className="col col-md-6 col-sm-6">
                                            <h6 className="m-0 font-weight-bold text-primary">Delivery info</h6>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group row">
                                                <div className="col col-md-6 col-sm-12">
                                                    <label>Delivery type</label>
                                                    {
                                                        (this.state.shop_delivery_type == 1 || this.state.shop_delivery_type == 3) && (
                                                            <div className="custom-control custom-checkbox small">
                                                                <input
                                                                    checked={this.state.delivery_type == 1 ? true : false}
                                                                    onChange={() => this.onChangeDeliveryType(1)}
                                                                    id="Delivery"
                                                                    type="checkbox"
                                                                    className="custom-control-input"/>
                                                                <label htmlFor="Delivery"
                                                                       onClick={() => this.onChangeDeliveryType(1)}
                                                                       className="custom-control-label">Delivery</label>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        (this.state.shop_delivery_type == 2 || this.state.shop_delivery_type == 3) && (
                                                            <div className="custom-control custom-checkbox small">
                                                                <input
                                                                    checked={this.state.delivery_type == 2 ? true : false}
                                                                    onChange={() => this.onChangeDeliveryType(2)}
                                                                    id="Pickup"
                                                                    type="checkbox"
                                                                    className="custom-control-input"/>
                                                                <label htmlFor="Pickup"
                                                                       onClick={() => this.onChangeDeliveryType(2)}
                                                                       className="custom-control-label">Pickup</label>
                                                            </div>
                                                        )
                                                    }


                                                </div>
                                                <div className="col col-md-6 col-sm-12">
                                                    <label>Delivery date</label>
                                                    <div className="row">
                                                        <div className="col col-sm-12 col-md-6">
                                                            <select className="form-control day-unit-select"
                                                                    value={this.state.delivery_day}
                                                                    onChange={this.onChangeDeliveryDay}>
                                                                {
                                                                    this.state.day_units.length > 0 && this.state.day_units.map((item) => {
                                                                        return (
                                                                            <option key={item.day}
                                                                                    value={item.day}>{item.name}</option>
                                                                        );
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="col col-sm-12 col-md-6">
                                                            <select className="form-control time-unit-select"
                                                                    value={this.state.delivery_date}
                                                                    onChange={this.onChangeDeliveryDate}>
                                                                {
                                                                    this.state.time_units.length > 0 && this.state.time_units.map((item) => {
                                                                        return (
                                                                            <option key={item.id}
                                                                                    value={item.name}>{item.name}</option>
                                                                        );
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                this.state.delivery_type == 1 && this.state.order_status > 1 && (
                                                    <div className="form-group row">
                                                        <div className="col col-md-6 col-sm-12">
                                                            <label>Delivery boy</label>
                                                            <select className="form-control delivery-boys-select"
                                                                    value={this.state.id_delivery_boy}
                                                                    onChange={this.onChangeDeliveryBoy}>
                                                                <option value={-1}>No delivery boy</option>
                                                                {
                                                                    this.state.delivery_boys.length > 0 && this.state.delivery_boys.map((item) => {
                                                                        if (item.offline == 0)
                                                                            return (
                                                                                <option style={{backgroundColor: 'red'}}
                                                                                        key={item.id} disabled={true}
                                                                                        value={item.id}>{item.name} {item.surname}</option>);

                                                                        return (
                                                                            <option key={item.id}
                                                                                    value={item.id}>{item.name} {item.surname}</option>
                                                                        );
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="col col-md-6 col-sm-12">
                                                            <label>Delivery boy's comment</label>
                                                            <textarea className="form-control"
                                                                      value={this.state.delivery_boy_comment}
                                                                      onChange={this.onChangeDeliveryBoyComment}></textarea>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col card shadow mb-4 padding0 float-right mr-2">
                                <div className="row card-header py-3">
                                    <div className="col col-md-6 col-sm-12">
                                        <h6 className="m-0 font-weight-bold text-primary">Order detail info</h6>
                                    </div>
                                    {
                                        this.state.order_status < 2 && (
                                            <div className="col col-md-6 col-sm-12">
                                                <div className="row justify-content-end">
                                                    <div className="col col-md-8 col-sm-8">
                                                        <select className="form-control product-select"
                                                                onChange={this.onProductChange}
                                                                value={this.state.product}>
                                                            {
                                                                this.state.products.length > 0 && this.state.products.map((item) => {
                                                                    return (
                                                                        <option key={item.id}
                                                                                value={item.id}>{item.lang[0].name}</option>
                                                                    );
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    <button className="btn btn-success float-right"
                                                            onClick={this.onSubmitProduct}>Add Products
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="card-body">
                                    <form>
                                        <table className="table table-bordered">
                                            <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>In Stock</th>
                                                <th>Price</th>
                                                <th>Discount</th>
                                                <th>Quantity</th>
                                                <th>Price total</th>
                                                <th>Discount total</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.productsCache.length > 0 && this.state.productsCache.map((item) => {
                                                    return (
                                                        <tr key={item.id}
                                                            className={item.type == 2 ? "bg-success" : ""}>
                                                            <td>{item.id}</td>
                                                            <td><Link to={"/products/edit/" + item.id}
                                                                      style={item.type == 1 ? {textDecoration: "line-through"} : {}}
                                                                      className="page-link">{item.data.lang[0].name}</Link>
                                                            </td>
                                                            <td>
                                                                <div
                                                                    className="badge badge-danger">{item.data.quantity} {item.data.unit.lang[0].name}</div>
                                                            </td>
                                                            <td>{item.data.price}</td>
                                                            <td>{item.data.discount_price > 0 ? (item.data.price - item.data.discount_price) : 0}</td>
                                                            <td>
                                                                <div className="col justify-content-center row">
                                                                    {
                                                                        this.state.order_status < 2 && (
                                                                            <a href=""
                                                                               onClick={(e) => this.onDecriment(e, item.id, item.exchange_id)}
                                                                               className="btn btn-sm btn-info">
                                                                                <i className="fa fa-minus"></i>
                                                                            </a>
                                                                        )
                                                                    }
                                                                    <div className="text text-primary ml-3 mr-3">
                                                                        {item.count}
                                                                    </div>
                                                                    {
                                                                        this.state.order_status < 2 && (
                                                                            <a href=""
                                                                               onClick={(e) => this.onIncrement(e, item.id, item.exchange_id)}
                                                                               className="btn btn-sm btn-info">
                                                                                <i className="fa fa-plus"></i>
                                                                            </a>
                                                                        )
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td>{item.count * item.data.price}</td>
                                                            <td>{item.data.discount_price > 0 ? (item.count * (item.data.price - item.data.discount_price)) : 0}</td>
                                                            <td>
                                                                {
                                                                    this.state.order_status < 2 && (
                                                                        <div className="row">
                                                                            <a href=""
                                                                               onClick={(e) => this.onClickProductDelete(e, item.id, item.exchange_id)}>
                                                                        <span
                                                                            className="btn"><i
                                                                            className="fa fa-trash text-danger"></i></span></a>
                                                                            {
                                                                                item.type == 0 && (
                                                                                    <a href="#"
                                                                                       onClick={(e) => this.onChangeProduct(e, item.id)}
                                                                                       data-toggle="modal"
                                                                                       data-target="#replacement"><span
                                                                                        className="btn"><i
                                                                                        className="fa fa-reply text-warning"></i></span>
                                                                                    </a>
                                                                                )
                                                                            }
                                                                        </div>)
                                                                }
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colSpan={7}>
                                                    <div className="float-right">Total amount</div>
                                                </td>
                                                <td colSpan={2}>
                                                    <b>{this.state.total_sum}</b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={7}>
                                                    <div className="float-right">Discount</div>
                                                </td>
                                                <td colSpan={2}><b>{this.state.total_discount}</b></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={7}>
                                                    <div className="float-right">Delivery fee</div>
                                                </td>
                                                <td colSpan={2}><b>{this.state.delivery_fee}</b></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={7}>
                                                    <div className="float-right">Tax</div>
                                                </td>
                                                <td colSpan={2}><b>{this.state.tax}</b></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={7}>
                                                    <div className="float-right"><b>Amount to pay</b></div>
                                                </td>
                                                <td colSpan={2}>
                                                    <b>{this.state.total_sum - this.state.total_discount + this.state.tax + this.state.delivery_fee}</b>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </form>
                                </div>
                            </div>
                            <div className="col col-md-12 col-sm-12 justify-content-end row mb-2">
                                <button className="btn btn-success float-right mr-2" onClick={this.saveOrders}>Save <i
                                    className="fa fa-save"></i>
                                </button>
                                <button className="btn btn-secondary float-right">Cancel <i className="fa fa-reply"></i>
                                </button>
                            </div>
                        </>
                    )
                }
                <AddClientModal/>
                <AddAddressModal idUser={this.state.id_user}/>

                <div className="modal fade" id="replacement" tabIndex={-1} role="dialog"
                     aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="h3 mb-2 text-gray-800">Replace product</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col col-md-8 col-sm-8">
                                        <select className="form-control replace-product-select"
                                                onChange={this.onReplaceProductChange}
                                                value={this.state.replace_product}>
                                            {
                                                this.state.products.length > 0 && this.state.products.map((item) => {
                                                    return (
                                                        <option key={item.id}
                                                                value={item.id}>{item.lang[0].name}</option>
                                                    );
                                                })
                                            }
                                        </select>
                                    </div>
                                    <button className="btn btn-success float-right" data-dismiss="modal"
                                            onClick={this.onSubmitReplaceProduct}>Replace Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}