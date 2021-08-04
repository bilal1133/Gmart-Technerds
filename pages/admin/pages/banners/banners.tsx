import React, {Component} from 'react';
import axios from 'axios';
import Layout from '../../layouts/layouts'
import {Link, Redirect} from 'react-router-dom';
import Head from 'next/head';
import 'datatables.net';
import DeleteModal from '../../components/deleteModal';
import {roleGuard} from '../../../../utils/roleGuard';

interface AppProps {

}

interface AppState {
    banners: any[],
    id: number,
    redirectToEdit: boolean,
    checkboxChecked: boolean,
    checkIds: any[]
}

export default class Banners extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            banners: [],
            id: -1,
            redirectToEdit: false,
            checkboxChecked: false,
            checkIds: []
        }
    }

    componentDidMount() {
        setTimeout(() => {
            var self = this;
            $(document).on('click', ".deleteBtn", function () {
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
                    "url": "/api/banners/datatable",
                    "dataType": "json",
                    "type": "POST",
                    "data": {
                        id: 0
                    }
                },
                "columns": [
                    {"data": "checkbox", searchable: false, orderable: false},
                    {"data": "name"},
                    {"data": "description"},
                    {"data": "image", searchable: false, orderable: false},
                    {"data": "shop", searchable: false, orderable: false},
                    {"data": "active", searchable: false, orderable: false},
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
                            return '<image src="' + data + '" style="height: 100px"/>';
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
                        "targets": 5
                    },
                    {
                        "render": function (data, type, row) {
                            var src = "";
                            if (roleGuard('banners.edit'))
                                src += '<a href="" did="' + row.id + '" class="editBtn"><span class="btn"><i class="fa fa-edit text-success"></i></span></a>';
                            if (roleGuard('banners.delete'))
                                src += '<a href="" did="' + row.id + '" data-toggle="modal" data-target="#deleteModal" class="btn deleteBtn"><i class="fa fa-trash text-danger"></i></a>';
                            return src;
                        },
                        "targets": 6
                    },]
            });
        }, 1000);
    }

    async removeBanner(id: number) {
        //remove lang by id
        const {data: data} = await axios.post('/api/banners/remove', {id});
        if (data)
            $('#dataTable').DataTable().ajax.reload();
    }

    async removeBannerByIds(ids: any) {
        //remove lang by id
        const {data: data} = await axios.post('/api/banners/delete', {ids: ids});
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
            return (<Redirect to={`/banners/edit/${this.state.id}`}/>);

        return (
            <Layout>
                <Head>
                    <title>Gmarket - Banners list</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Banners</h1>
                <p className="mb-4">Create, remove and edit banners</p>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">Banners</h6>
                        </div>
                        <div className="col col-md-6 col-sm-6">
                            {
                                roleGuard('banners.add') && (

                                    <Link to="/banners/add">
                                        <button className="btn btn-success float-right">Add Banners</button>
                                    </Link>

                                )
                            }

                            {
                                roleGuard('banners.delete') && this.state.checkboxChecked && (
                                    <button className="btn btn-danger float-right mr-1" onClick={() => {
                                        this.removeBannerByIds(this.state.checkIds);
                                    }}>Delete Banners</button>
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
                                <th>Title</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Shop</th>
                                <th>Active</th>
                                <th></th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <DeleteModal onSubmit={() => this.removeBanner(this.state.id)}/>
            </Layout>
        )
    }
}