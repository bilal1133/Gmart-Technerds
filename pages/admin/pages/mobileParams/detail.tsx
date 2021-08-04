import React, {Component} from 'react';
import Layout from "../../layouts/layouts";
import Head from "next/head";
import axios from "axios";
import SmallLoader from "../../components/smallLoader";
import {RouteProps} from 'react-router';

declare var $: any;

interface AppProps {

}

interface AppState {
    params: any[],
    langs: any[],
    loading: boolean,
    id: number
}

export default class MobileLanguageDetail extends Component<AppProps & RouteProps, AppState> {
    constructor(props) {
        super(props);

        this.state = {
            params: [],
            langs: [],
            loading: false,
            id: -1
        }
    }

    async saveData(id_param, valueArray) {
        this.setState({
            loading: true
        })
        const dataResult = await axios.post('/api/mobileLanguage/save', {
            id_param: id_param,
            data: valueArray
        });

        if (dataResult.data.length > 0)
            $('#dataTable').DataTable().ajax.reload();

        this.setState({
            loading: false
        })
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params.id > 0) {
            this.setState({
                id: this.props.match.params.id
            })
            await this.getLangs(this.props.match.params.id);
        }
        var self = this;

        $(document).on("click", ".save_data", (e) => {
            let param_id = e.currentTarget.attributes[1].nodeValue;
            let valueArray = [];
            $(".input_" + param_id).each((key, nodeValue) => {
                let langId = nodeValue.attributes[1].nodeValue;
                let data = nodeValue.value;

                valueArray.push({
                    id_lang: langId,
                    text: data
                });
            });

            self.saveData(param_id, valueArray);
        });

        setTimeout(() => {
            var columns = [
                {"data": "name"},
                {"data": "translation"},
                {"data": "submit"}
            ];

            $('#dataTable').DataTable({
                "processing": true,
                "serverSide": true,
                "ajax": {
                    "url": "/api/mobileLanguage/datatableDetail",
                    "dataType": "json",
                    "type": "POST",
                    "data": {
                        id: this.state.id
                    }
                },
                "columns": columns,
                "columnDefs": []
            });
        }, 1000);
    }

    async getLangs(id) {
        //get all active languages list
        const {data: data} = await axios.post('/api/languages/info',{id: id});
        if (data.data)
            this.setState({
                langs: data.data,
            })
    }

    render() {
        return (
            <Layout>
                <Head>
                    <title>Gmarket - App Languages Detail</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">App Languages Detail</h1>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">{this.state.langs['name']}</h6>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <td>Word name</td>
                                <td>Translation</td>
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