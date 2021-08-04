import React, {Component} from 'react';
import Layout from '../../layouts/layouts'
import Head from 'next/head';
import 'datatables.net';
import Cookies from "js-cookie";
import axios from "axios";
import SmallLoader from "../../components/smallLoader";

interface AppProps {

}

interface AppState {
    id: number,
    users: any,
    loading: boolean
}

export default class Settings extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            id: -1,
            users: {},
            loading: false
        }
    }

    componentDidMount() {
        let self = this;
        if (typeof window !== 'undefined')
            this.setState({
                users: localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : {}
            });

        setTimeout(() => {
            $(document).on("click", ".save_data", (e) => {
                let param_id = e.currentTarget.attributes[1].nodeValue;
                let value = $(".input_" + param_id).val();

                self.saveData(param_id, value);
            });

            $('#dataTable').DataTable({
                "processing": true,
                "serverSide": true,
                "ajax": {
                    "url": "/api/settings/datatable",
                    "dataType": "json",
                    "type": "POST",
                    "data": {
                        "id_shop": this.state.users['shop'] ? this.state.users['shop']['id'] : 0,
                    }
                },
                "columns": [
                    {"data": "name"},
                    {"data": "value", searchable: false, orderable: false},
                    {"data": "default", searchable: false, orderable: false},
                    {"data": "shop", searchable: false, orderable: false},
                    {"data": "options", searchable: false, orderable: false},
                ],
                columnDefs: []
            });
        }, 1000);
    }

    async saveData(id_param, value) {
        this.setState({
            loading: true
        })
        const dataResult = await axios.post('/api/settings/save', {
            id_param: id_param,
            data: value
        });

        if (dataResult.data.length > 0)
            $('#dataTable').DataTable().ajax.reload();

        this.setState({
            loading: false
        })
    }


    render() {
        return (
            <Layout>
                <Head>
                    <title>Gmarket - Settings</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Settings</h1>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">Settings</h6>
                        </div>

                    </div>
                    <div className="card-body">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                                <th>Default value</th>
                                <th>Shop</th>
                                <th></th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                {
                    this.state.loading && <SmallLoader/>
                }
            </Layout>
        )
    }
}