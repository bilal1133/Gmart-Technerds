import React, {Component} from 'react';
import Layout from '../../layouts/layouts';
import Head from 'next/head';
import axios from 'axios';
import {roleGuard} from "../../../../utils/roleGuard";

interface AppProps {

}

interface AppState {
    roles: any[],
    permissions: any[],
    rolePermissions: any[]
}

export default class Permissions extends Component<AppProps, AppState> {
    constructor(props) {
        super(props);

        this.state = {
            roles: [],
            permissions: [],
            rolePermissions: []
        }
    }

    async componentDidMount() {
        await this.getRoles();
        setTimeout(() => {
            var columns = [
                {"data": "name"},
            ];

            this.state.roles.length > 0 && this.state.roles.map((item) => {
                columns.push({"data": item.name});
            });

            var self = this;
            $(document).on('change', ".custom-control-input", function () {
                var pid = parseInt($(this).attr("pid"));
                var rid = parseInt($(this).attr("rid"));
                self.changePermission(pid, rid);
            });

            $('#dataTable').DataTable({
                "processing": true,
                "serverSide": true,
                "ajax": {
                    "url": "/api/permissions/datatable",
                    "dataType": "json",
                    "type": "POST",
                    "data": {}
                },
                "columns": columns
            });
        }, 1000);
    }

    async getRoles() {
        //get all roles list
        const {data: data} = await axios.post('/api/roles/active')
        this.setState({
            roles: data.data
        })
    }

    async getRolePermissions() {
        const {data: data} = await axios.post('/api/roles/rolePermissions')
        this.setState({
            rolePermissions: data.data
        })
    }

    async changePermission(id_permission, id_role) {
        //save role permissions
        const {data: data} = await axios.post('/api/roles/save', {
            id_role: id_role,
            id_permission: id_permission
        })

        if (data.data.success) {
            $('#dataTable').DataTable().ajax.reload(null, false);
        }
    }

    render() {
        return (
            <Layout>
                <Head>
                    <title>Gmarket - Permissions list</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Permissions</h1>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">Permissions</h6>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <th>Permission</th>
                                {
                                    this.state.roles.length > 0 && this.state.roles.map((item) => {
                                        return (<th key={item.id}>{item.name}</th>);
                                    })
                                }
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </Layout>
        )
    }
}