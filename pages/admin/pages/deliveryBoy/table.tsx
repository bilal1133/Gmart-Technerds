import React, {Component} from "react";
import Layout from "../../layouts/layouts";
import Head from "next/head";
import {Link, Redirect} from 'react-router-dom';
import {roleGuard} from "../../../../utils/roleGuard";
import DeleteModal from "../../components/deleteModal";
import SmallLoader from "../../components/smallLoader";
import axios from "axios";

interface AppProps {
}

interface AppState {
    deliveryboy: any[],
    orders: any[],
    details: any[],
    checklist: any[]
}

export default class Table extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            deliveryboy: [],
            orders: [],
            details: [],
            checklist: []
        }

        this.getDeliveryBoys = this.getDeliveryBoys.bind(this);
    }

    componentDidMount() {
        this.getDeliveryBoys();
    }

    async changeOrderStatus(orderId: number, status: number) {
        const {data: data} = await axios.post('/api/orders/order/changeStatus', {
            order_id: orderId,
            status: status
        });
        if (data)
            this.getDeliveryBoys();
    }

    async getDeliveryBoys() {
        //get delivery boy orders
        const {data: data} = await axios.post('/api/deliveryBoy/table');
        if (data)
            this.setState({
                deliveryboy: data['data']['deliveryboy'],
                orders: data['data']['orders'],
            });
    }

    render() {
        return (
            <Layout>
                <Head>
                    <title>Gmarket - Delivery boys</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Delivery boys</h1>
                <p className="mb-4">Delivery boys statistics</p>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">Delivery boys</h6>
                        </div>
                        <div className="col col-md-6 col-sm-6">
                            <button className="btn btn-success float-right" onClick={() => {
                                this.getDeliveryBoys();
                            }}>Refresh
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <th>Delivery boys</th>
                                <th>Orders</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.deliveryboy.map((item) => {
                                    var orderIndex = this.state.orders.findIndex((data) => data['id'] == item['id']);
                                    var orders = this.state.orders[orderIndex]['orders'];
                                    return (
                                        <tr key={item['id']}>
                                            <td><h4>{item['name']} {item['surname']}</h4></td>
                                            <td>
                                                <div className="row">
                                                    {
                                                        orders.map((order) => {
                                                            var status = order['status'];
                                                            var orderStatus = order['order']['order_status']['id'];
                                                            var statusText = "Delivered";
                                                            var backgroundColor = "green";
                                                            var color = "white";
                                                            var url = "/orders/edit/" + order['order']['id'];

                                                            if (status == 5) {
                                                                backgroundColor = "red";
                                                                statusText = "Canceled";
                                                            } else if (status == 3) {
                                                                backgroundColor = "orange";
                                                                statusText = "On a way";
                                                            } else if (status == 2) {
                                                                backgroundColor = "blue";
                                                                statusText = "Accepted";
                                                            } else if (status == 1) {
                                                                backgroundColor = "white";
                                                                color = "black";
                                                                statusText = "New";
                                                            }

                                                            if (orderStatus == 4) return <div></div>;

                                                            return (
                                                                <div className="card" key={order['id']} style={{
                                                                    width: '200px',
                                                                    backgroundColor: backgroundColor,
                                                                    color: color,
                                                                    padding: '10px'
                                                                }}>
                                                                    <h5 className="row justify-content-between"
                                                                        style={{margin: 0}}>
                                                                        ID #{order['order']['id']}
                                                                        {
                                                                            status == 4 && (
                                                                                <a className="btn btn-success btn-sm"
                                                                                   onClick={() => {
                                                                                       this.changeOrderStatus(order['order']['id'], 4);
                                                                                   }}>OK</a>)
                                                                        }
                                                                    </h5>
                                                                    <span><b>Status</b>: {statusText}</span>
                                                                    <span><b>Delivery date</b>: {order['order']['delivery_date']}</span>
                                                                    <hr/>
                                                                    <h6><b>Shop Info</b></h6>
                                                                    <span><b>Name</b>: {order['order']['shops']['lang'][0]['name']}</span>
                                                                    <span><b>Phone</b>: {order['order']['shops']['phone']}</span>
                                                                    <span><b>Address</b>: {order['order']['shops']['lang'][0]['address']}</span>
                                                                    <hr/>
                                                                    <h6><b>Client Info</b></h6>
                                                                    <span>
                                                                    <b>Name</b>: {order['order']['user']['name']} {order['order']['user']['surname']}
                                                                </span>
                                                                    <span><b>Phone</b>: {order['order']['user']['phone']}</span>
                                                                    <span>
                                                                    <b>Address</b>: {order['order']['delivery_address']['address']}
                                                                </span>
                                                                    <div className="row justify-content-between"
                                                                         style={{margin: 0, paddingTop: '10px'}}>
                                                                        <a data-toggle="modal" onClick={() => {
                                                                            this.setState({
                                                                                checklist: order['order']['checklist'] != null ? order['order']['checklist'].replace(/[\[\]']+/g, '').split(",") : [],
                                                                                details: order['order']['order_detail'],
                                                                            });
                                                                        }} data-target="#checklistModal"
                                                                           className="btn btn-warning btn-sm">Checklist</a>
                                                                        <a className="btn btn-info btn-sm" href={url}>Order
                                                                            info</a>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="modal fade" id="checklistModal" tabIndex={-1} role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Checklist</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {
                                    this.state.details.map((product) => {
                                        var index = this.state.checklist.indexOf(product['product']['id'] + "");
                                        return (<div className="row justify-content-between"
                                                     style={{margin: 0, paddingTop: '10px'}}>
                                            <div className="col col-md-11 col-xs-11">
                                                {product['product']['lang'][0]['name']}
                                            </div>
                                            <div className="col col-md-1 col-xs-1">
                                                {
                                                    index > -1 ? (
                                                            <img className="img-profile rounded-circle" src="/images/y.png"
                                                                 style={{width: '20px'}}/>)
                                                        : (
                                                            <img className="img-profile rounded-circle" src="/images/x.png"
                                                                 style={{width: '20px'}}/>)
                                                }
                                            </div>
                                        </div>);
                                    })
                                }
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}