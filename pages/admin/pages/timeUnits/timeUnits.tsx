import React, {Component} from 'react';
import Layout from '../../layouts/layouts'
import Head from 'next/head';
import {roleGuard} from '../../../../utils/roleGuard';
import {Redirect, Link} from 'react-router-dom';
import axios from "axios";
import DeleteModal from "../../components/deleteModal";

interface AppProps {

}

interface AppState {
    timeUnits: any[],
    id: number,
    redirectToEdit: boolean,
    checkboxChecked: boolean,
    checkIds: any[]
}

export default class TimeUnits extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            timeUnits: [],
            id: -1,
            redirectToEdit: false,
            checkboxChecked: false,
            checkIds: []
        }
    }

    componentDidMount() {
        var self = this;
        setTimeout(() => {
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
                if (this.checked) {
                    $(".checkbox").each(function () {
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
                    "url": "/api/timeUnits/datatable",
                    "dataType": "json",
                    "type": "POST",
                    "data": {}
                },
                "columns": [
                    {"data": "checkbox"},
                    {"data": "name"},
                    {"data": "shop"},
                    {"data": "sort"},
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
                            var src = "";
                            if (roleGuard('timeUnits.edit'))
                                src += '<a href="" did="' + row.id + '" class="editBtn"><span class="btn"><i class="fa fa-edit text-success"></i></span></a>';
                            if (roleGuard('timeUnits.delete'))
                                src += '<a href="" did="' + row.id + '" data-toggle="modal" data-target="#deleteModal" class="btn deleteBtn"><i class="fa fa-trash text-danger"></i></a>';
                            return src;
                        },
                        "targets": 5
                    },]
            });
        }, 1000);
    }

    onChangeId(id: number) {
        this.setState({
            id: id
        })
    }

    async removeTimeUnit(id: number) {
        //remove units by id
        const {data: data} = await axios.post('/api/timeUnits/remove', {id});
        if (data)
            await $('#dataTable').DataTable().ajax.reload();
    }


    async removeTimeUnitByIds(ids: any) {
        //remove lang by id
        const {data: data} = await axios.post('/api/timeUnits/delete', {ids: ids});
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
            return (<Redirect to={`/timeUnits/edit/${this.state.id}`}/>);

        return (
            <Layout>
                <Head>
                    <title>Gmarket - Time Units list</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Time Units</h1>
                <p className="mb-4">Remove and edit time units</p>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">Time Units</h6>
                        </div>
                        <div className="col col-md-6 col-sm-6">
                            {
                                roleGuard('timeUnits.add') && (

                                    <Link to="/timeUnits/add">
                                        <button className="btn btn-success float-right">Add Time Unit</button>
                                    </Link>

                                )
                            }
                            {
                                roleGuard('timeUnits.delete') && this.state.checkboxChecked && (
                                    <button className="btn btn-danger float-right mr-1" onClick={() => {
                                        this.removeTimeUnitByIds(this.state.checkIds);
                                    }}>Delete Units</button>
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
                                <th>Name</th>
                                <th>Shop</th>
                                <th>Sort</th>
                                <th>Active</th>
                                <th></th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <DeleteModal onSubmit={() => this.removeTimeUnit(this.state.id)}/>
            </Layout>
        )
    }
}