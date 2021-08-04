import React, {Component} from 'react';
import axios from 'axios';
import Layout from '../../layouts/layouts';
import Head from 'next/head';
import DeleteModal from '../../components/deleteModal';
import {roleGuard} from '../../../../utils/roleGuard';
import Cookies from "js-cookie";
import {Redirect, Link} from 'react-router-dom';
import SmallLoader from "../../components/smallLoader";

interface AppProps {

}

interface AppState {
    orders: any[],
    id: number,
    order: any,
    users: any,
    orderStatuses: any[],
    status: number,
    order_id: number,
    token: string,
    text: string,
    redirectToEdit: boolean,
    checkboxChecked: boolean,
    checkIds: any[],
    loading: boolean
}

export default class Orders extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            orders: [],
            id: -1,
            order: {},
            users: {},
            orderStatuses: [],
            status: 0,
            order_id: 0,
            token: "",
            text: "",
            redirectToEdit: false,
            checkboxChecked: false,
            checkIds: [],
            loading: true
        }
    }

    componentDidMount() {
        if (typeof window !== 'undefined')
            this.setState({
                users: localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : {}
            });

        this.getStatuses();

        setTimeout(() => {
            var self = this;
            $(document).on('click', ".deleteBtn", function (e) {
                e.preventDefault();

                var did = parseInt($(this).attr("did"));
                self.onChangeId(did);
            });

            $(document).on('click', ".editBtn", function (e) {
                e.preventDefault();

                var did = parseInt($(this).attr("did"));
                self.onChangeId(did);

                self.setState({
                    redirectToEdit: true
                })
            });

            $(document).on('change', "#checkboxAll", function (e) {
                $('.checkbox').not(this).prop('checked', this.checked);

                var checkIdsAll = self.state.checkIds;
                if(this.checked) {
                    $(".checkbox").each(function(){
                        var id = $(this).attr("did");
                        checkIdsAll.push(id);
                    });

                    self.setState({
                        checkIds: checkIdsAll
                    })
                } else {
                    self.setState({
                        checkIds: []
                    })
                }

                self.setState({
                    checkboxChecked: this.checked
                })
            });

            $(document).on('change', ".checkbox", function (e) {
                var id = $(this).attr("did");

                let checkIdsAll = self.state.checkIds;
                let index = checkIdsAll.findIndex((item) => item == id);
                if (index == -1)
                    checkIdsAll.push(id);
                else
                    checkIdsAll.splice(index, 1);

                if (checkIdsAll.length > 0)
                    self.setState({
                        checkboxChecked: true,
                        checkIds: checkIdsAll
                    })
                else
                    self.setState({
                        checkboxChecked: false,
                        checkIds: checkIdsAll
                    })
            });

            $('#dataTable').DataTable({
                "processing": true,
                "serverSide": true,
                "ajax": {
                    "url": "/api/orders/order/datatable",
                    "dataType": "json",
                    "type": "POST",
                    "data": {
                        "id_shop": this.state.users['shop'] ? this.state.users['shop']['id'] : 0,
                    }
                },
                initComplete: function () {
                    self.setState({
                        loading: false
                    });
                },
                "columns": [
                    {"data": "checkbox"},
                    {"data": "id"},
                    {"data": "user"},
                    {"data": "amount"},
                    {"data": "order_status"},
                    {"data": "payment_status"},
                    {"data": "payment_method"},
                    {"data": "order_date"},
                    {"data": "delivery_date"},
                    {"data": "options", searchable: false, orderable: false}
                ],
                columnDefs: [
                    {
                        "render": function (data, type, row) {
                            return '<div class="custom-control custom-checkbox small">' +
                                '<input id="checkbox_' + row.id + '" did="' + row.id + '" type="checkbox" class="custom-control-input checkbox"/>' +
                                '<label for="checkbox_' + row.id + '" class="custom-control-label"></label>' +
                                '</div>';
                        },
                        "orderable": false,
                        "targets": 0
                    },
                    {
                        "render": function (data, type, row) {
                            var src = "";
                            if (roleGuard('orders.orders.edit'))
                                src += '<a href="" did="' + row.id + '" class="editBtn"><span class="btn"><i class="fa fa-edit text-success"></i></span></a>';
                            if (roleGuard('orders.orders.delete'))
                                src += '<a href="" did="' + row.id + '" data-toggle="modal" data-target="#deleteModal" class="btn deleteBtn"><i class="fa fa-trash text-danger"></i></a>';
                            return "<div class='row'>" +
                                src +
                                "</div>";
                        },
                        "targets": 9
                    },]
            });
        }, 1000);
    }

    async getStatuses() {
        const {data: data} = await axios.post('/api/orders/status/active')
        this.setState({
            orderStatuses: data.data,
            status: data.data[0]['id']
        })
    }

    async removeOrder(id: number) {
        //remove order by id
        const {data: data} = await axios.post('/api/orders/order/remove', {id});
        if (data)
            $('#dataTable').DataTable().ajax.reload();
    }

    onChangeId(id: number) {
        this.setState({
            id: id
        })
    }

    async removeOrdersByIds(ids: any) {
        //remove lang by id
        const {data: data} = await axios.post('/api/orders/order/delete', {ids: ids});
        if (data) {
            $("#checkboxAll").prop("checked", false);
            $('#dataTable').DataTable().ajax.reload();
            this.setState({
                checkboxChecked: false,
                checkIds: []
            });
        }
    }

    render() {
        if (this.state.redirectToEdit)
            return (<Redirect to={`/orders/edit/${this.state.id}`}/>);

        return (
            <Layout>
                <Head>
                    <title>Gmarket - Orders list</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Orders</h1>
                <p className="mb-4">Create, remove and edit orders</p>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">Orders</h6>
                        </div>
                        <div className="col col-md-6 col-sm-6">
                            {
                                roleGuard('orders.orders.add') && (

                                    <Link to="/orders/add">
                                        <button className="btn btn-success float-right">Add Order</button>
                                    </Link>

                                )
                            }
                            {
                                roleGuard('orders.orders.delete') && this.state.checkboxChecked && (
                                    <button className="btn btn-danger float-right mr-1" onClick={() => {
                                        this.removeOrdersByIds(this.state.checkIds);
                                    }}>Delete Orders</button>
                                )
                            }
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <th>
                                    <div className="custom-control custom-checkbox small">
                                        <input id="checkboxAll" type="checkbox" className="custom-control-input"/>
                                        <label htmlFor="checkboxAll" className="custom-control-label"></label>
                                    </div>
                                </th>
                                <th>ID</th>
                                <th>Client</th>
                                <th>Amount</th>
                                <th>Order Status</th>
                                <th>Payment Status</th>
                                <th>Payment Methods</th>
                                <th>Order date</th>
                                <th>Delivery date</th>
                                <th></th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <DeleteModal onSubmit={() => this.removeOrder(this.state.id)}/>
                {
                    this.state.loading && (
                        <SmallLoader/>
                    )
                }
            </Layout>
        )
    }


}