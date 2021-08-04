import React, {Component} from 'react';
import Layout from '../../layouts/layouts';
import Head from 'next/head';
import axios from 'axios';

interface AppProps {

}

interface AppState {
    roles: any[]
}

export default class Roles extends Component<AppProps, AppState> {
    constructor(props) {
        super(props);

        this.state = {
            roles: []
        }
    }

    componentDidMount() {
        setTimeout(() => {
            $('#dataTable').DataTable({
                "processing": true,
                "serverSide": true,
                "ajax": {
                    "url": "/api/roles/datatable",
                    "dataType": "json",
                    "type": "POST",
                    "data": {}
                },
                "columns": [
                    {"data": "name"},
                    {"data": "active", searchable: false, orderable: false},
                ],
                columnDefs: [
                    {
                        "render": function (data, type, row) {
                            if (data == 1)
                                return '<div class="badge badge-success">Active</div>';
                            else
                                return '<div class="badge badge-danger">Inactive</div>';
                        },
                        "targets": 1
                    }]
            });
        }, 1000);
    }

    render() {
        return (
            <Layout>
                <Head>
                    <title>Gmarket - Roles list</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Roles</h1>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">Roles</h6>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <th>Role name</th>
                                <th>Active</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </Layout>
        )
    }
}