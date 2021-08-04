import React, {Component} from 'react';
import Layout from "../../layouts/layouts";
import Head from "next/head";
import SmallLoader from "../../components/smallLoader";
import {Redirect} from 'react-router-dom';

interface AppProps {

}

interface AppState {
    id: number,
    params: any[],
    loading: boolean,
    editableClick: boolean
}

export default class MobileLanguage extends Component<AppProps, AppState> {
    constructor(props) {
        super(props);

        this.state = {
            params: [],
            loading: false,
            id: -1,
            editableClick: false
        }
    }

    async componentDidMount() {
        var self = this;
        setTimeout(() => {
            $(document).on('click', ".editMobileLanguage", function (e) {
                e.preventDefault();

                var did = parseInt($(this).attr("did"));
                self.setState({
                    id: did,
                    editableClick: true
                });
            });

            var columns = [
                {"data": "name"},
                {"data": "percentage"},
                {"data": "submit"}
            ];

            $('#dataTable').DataTable({
                "processing": true,
                "serverSide": true,
                "ajax": {
                    "url": "/api/mobileLanguage/datatable",
                    "dataType": "json",
                    "type": "POST",
                    "data": {}
                },
                "columns": columns,
                "columnDefs": [
                    {
                        "targets": 1
                    },
                    {
                        "render": function (data, type, row) {
                            var src = "";
                            src += '<a href="" did="' + row.id + '" class="editMobileLanguage"><span class="btn"><i class="fa fa-edit text-success"></i></span></a>';
                            return src;
                        },
                        "targets": 2
                    },]
            });
        }, 1000);
    }

    render() {
        if(this.state.editableClick)
            return (<Redirect to={`/mobile/language/edit/${this.state.id}`}/>);

        return (
            <Layout>
                <Head>
                    <title>Gmarket - App Languages</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">App Languages</h1>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">App Languages</h6>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <td>Language</td>
                                <td>Translation percentage</td>
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
        );
    }
}