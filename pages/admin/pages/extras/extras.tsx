import React, {Component} from 'react';
import axios from 'axios';
import Layout from '../../layouts/layouts'
import {Link, Redirect} from 'react-router-dom';
import Head from 'next/head';
import DeleteModal from '../../components/deleteModal';
import 'datatables.net';
import {roleGuard} from '../../../../utils/roleGuard';
import Cookies from "js-cookie";
import SmallLoader from "../../components/smallLoader";

interface AppProps {

}

interface AppState {
    id: number,
    users: any,
    redirectToEdit: boolean,
    checkboxChecked: boolean,
    checkIds: any[],
    loading: boolean
}

export default class Extras extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            id: -1,
            users: {},
            redirectToEdit: false,
            checkboxChecked: false,
            checkIds: [],
            loading: true
        }

        this.onChangeId = this.onChangeId.bind(this);
    }

    componentDidMount() {
        if (typeof window !== 'undefined')
            this.setState({
                users: localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : {}
            });

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
                    "url": "/api/extras/datatable",
                    "dataType": "json",
                    "type": "POST",
                    "data": {
                        "id_shop": this.state.users['shop'] ? this.state.users['shop']['id'] : 0,
                    }
                },
                "columns": [
                    {"data": "checkbox", searchable: false, orderable: false},
                    {"data": "product", searchable: false, orderable: false},
                    {"data": "name"},
                    {"data": "image", searchable: false, orderable: false},
                    {"data": "extraGroup", searchable: false, orderable: false},
                    {"data": "price"},
                    {"data": "active", searchable: false, orderable: false},
                    {"data": "options", searchable: false, orderable: false}
                ],
                initComplete: function () {
                    self.setState({
                        loading: false
                    });
                },
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
                            return '<image src="' + data + '" style="height: 50px"/>';
                        },
                        "targets": 3
                    },
                    {
                        "render": function (data, type, row) {
                            if (data == 1)
                                return '<div class="badge badge-success">Active</div>';
                            else
                                return '<div class="badge badge-danger">Inactive</div>';
                        },
                        "targets": 6
                    },
                    {
                        "render": function (data, type, row) {
                            var src = "";
                            if (roleGuard('extras.edit'))
                                src += '<a href="" class="editBtn" did="' + row.id + '"><span class="btn"><i class="fa fa-edit text-success"></i></span></a>';
                            if (roleGuard('extras.delete'))
                                src += '<a href="" did="' + row.id + '" data-toggle="modal" data-target="#deleteModal" class="btn deleteBtn"><i class="fa fa-trash text-danger"></i></a>';
                            return src;
                        },
                        "targets": 7
                    },]
            });
        }, 1000);
    }

    async removeExtras(id: number) {
        //remove extras by id
        const {data: data} = await axios.post('/api/extras/remove', {id});
        if (data)
            await $('#dataTable').DataTable().ajax.reload();
    }

    async removeUnitByIds(ids: any) {
        //remove lang by id
        const {data: data} = await axios.post('/api/extras/delete', {ids: ids});
        if (data) {
            $("#checkboxAll").prop("checked", false);
            $('#dataTable').DataTable().ajax.reload();
            this.setState({
                checkboxChecked: false,
                checkIds: []
            });
        }
    }

    onChangeId(id: number) {
        this.setState({
            id: id
        })
    }

    render() {
        if (this.state.redirectToEdit)
            return (<Redirect to={`/products/extras/edit/${this.state.id}`}/>);

        return (
            <Layout>
                <Head>
                    <title>Gmarket - Extras list</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Extras</h1>
                <p className="mb-4">Create, remove and edit extras</p>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">Extras</h6>
                        </div>
                        <div className="col col-md-6 col-sm-6">
                            {
                                roleGuard('extras.add') && (

                                    <Link to="/products/extras/add">
                                        <button className="btn btn-success float-right">Add Extras</button>
                                    </Link>

                                )
                            }
                            {
                                roleGuard('extras.delete') && this.state.checkboxChecked && (
                                    <button className="btn btn-danger float-right mr-1" onClick={() => {
                                        this.removeUnitByIds(this.state.checkIds);
                                    }}>Delete Extras</button>
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
                                <th>Product</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Extra Group</th>
                                <th>Price</th>
                                <th>Active</th>
                                <th></th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <DeleteModal onSubmit={() => this.removeExtras(this.state.id)}/>
                {
                    this.state.loading && (
                        <SmallLoader/>
                    )
                }
            </Layout>
        )
    }
}