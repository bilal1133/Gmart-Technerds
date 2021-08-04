import React, {Component} from 'react';
import Layout from '../../layouts/layouts'
import Head from 'next/head';
import {roleGuard} from '../../../../utils/roleGuard';
import {Redirect} from 'react-router-dom';
import SmallLoader from "../../components/smallLoader";

interface AppProps {

}

interface AppState {
    paymentMethods: any[],
    id: number,
    redirectToEdit: boolean,
    loading: boolean
}

export default class PaymentMethods extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            paymentMethods: [],
            id: -1,
            redirectToEdit: false,
            loading: true
        }
    }

    componentDidMount() {
        var self = this;
        setTimeout(() => {
            $(document).on('click', ".editBtn", function (e) {
                e.preventDefault();

                var did = parseInt($(this).attr("did"));
                self.onChangeId(did);

                self.setState({
                    redirectToEdit: true
                })
            });

            $('#dataTable').DataTable({
                "processing": true,
                "serverSide": true,
                "ajax": {
                    "url": "/api/payments/method/datatable",
                    "dataType": "json",
                    "type": "POST",
                    "data": {}
                },
                initComplete: function () {
                    self.setState({
                        loading: false
                    });
                },
                "columns": [
                    {"data": "name"},
                    {"data": "active", searchable: false, orderable: false},
                    {"data": "options", searchable: false, orderable: false}
                ],
                columnDefs: [
                    {
                        "render": function (data, type, row) {
                            var src = "";
                            if (roleGuard('payment.method.edit'))
                                src += '<a href="" did="' + row.id + '" class="editBtn"><span class="btn"><i class="fa fa-edit text-success"></i></span></a>';
                            return src;
                        },
                        "targets": 2
                    },]
            });
        }, 1000);
    }

    onChangeId(id: number) {
        this.setState({
            id: id
        })
    }

    render() {
        if (this.state.redirectToEdit)
            return (<Redirect to={`/payments/method/edit/${this.state.id}`}/>);

        return (
            <Layout>
                <Head>
                    <title>Gmarket - Payment methods list</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Payment methods</h1>
                <p className="mb-4">Remove and edit payment methods</p>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">Payment methods</h6>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Active</th>
                                <th></th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                {
                    this.state.loading && (
                        <SmallLoader/>
                    )
                }
            </Layout>
        )
    }
}