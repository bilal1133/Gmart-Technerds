import React, {Component} from 'react';
import axios from 'axios';
import Layout from '../../layouts/layouts'
import {Link, Redirect} from 'react-router-dom';
import Head from 'next/head';

interface AppProps { 

}

interface AppState {
    languages: any[],
    id: number
}

export default class Languages extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            languages: [],
            id: -1
        }
    }

    componentDidMount() {
        setTimeout(() => {
            var self = this;

            $(document).on('change', ".enabled", function (e) {
                e.preventDefault();

                var did = parseInt($(this).attr("did"));
                self.changeEnabled(did);
            });

            $('#dataTable').DataTable({
                "processing": true,
                "serverSide": true,
                "ajax": {
                    "url": "/api/languages/dataTable",
                    "dataType": "json",
                    "type": "POST",
                    "data": {}
                },
                "columns": [
                    {"data": "name"},
                    {"data": "short_name"},
                    {"data": "image", searchable: false, orderable: false},
                    {"data": "active", searchable: false, orderable: false}
                ],
                columnDefs: [
                    {
                        "render": function (data, type, row) {
                            return '<image src="' + data + '" style="height: 40px"/>';
                        },
                        "targets": 2
                    },
                    {
                        "render": function (data, type, row) {
                            if (data == 1)
                                return '<div class="custom-control custom-checkbox small"><input type="checkbox" did="' + row.id + '" class="custom-control-input enabled" id="enabled_' + row.id + '" checked/><label for="enabled_' + row.id + '" class="custom-control-label"></label></div>';
                            else
                                return '<div class="custom-control custom-checkbox small"><input type="checkbox" did="' + row.id + '" class="custom-control-input enabled" id="enabled_' + row.id + '"/><label for="enabled_' + row.id + '" class="custom-control-label"></label></div>';
                        },
                        "targets": 3
                    }]
            });
        }, 1000);
    }

    async changeEnabled(id: number) {
        //remove lang by id
        const {data: data} = await axios.post('/api/languages/changeEnabled', {id});
        if (data)
            $('#dataTable').DataTable().ajax.reload();
    }

    render() {
        return (
            <Layout>
                <Head>
                    <title>Gmarket - Languages list</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Languages</h1>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">Languages</h6>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Short name</th>
                                <th>Logo</th>
                                <th>Enabled</th>
                            </tr>
                            </thead>

                        </table>
                    </div>
                </div>
            </Layout>
        )
    }
}