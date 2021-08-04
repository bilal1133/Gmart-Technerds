import React, {Component} from 'react';
import Layout from '../../layouts/layouts'
import Head from 'next/head';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {RouteProps} from 'react-router';

declare var $: any;

interface AppProps {

}

interface AppState {
    selectedFileName: string,
    selectedFile: any,
    name: string,
    shortName: string,
    id: number,
    error: string,
    redirect: boolean
}

export default class LanguagesAdd extends Component<AppProps & RouteProps, AppState> {
    constructor(props) {
        super(props);

        this.state = {
            selectedFileName: "Choose file",
            selectedFile: {},
            name: "",
            shortName: "",
            id: -1,
            error: "",
            redirect: false
        }

        this.onChangeFileUpload = this.onChangeFileUpload.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeShortName = this.onChangeShortName.bind(this);
        this.getLanguageInfoById = this.getLanguageInfoById.bind(this);
        this.saveLanguages = this.saveLanguages.bind(this);
    }

    componentDidMount() {
        console.log(this.props)
        if (this.props.match && this.props.match.params.id > 0)
            this.getLanguageInfoById(this.props.match.params.id);
    }

    async getLanguageInfoById(id: number) {
        //get language by id
        const {data: data} = await axios.post('/api/languages/info', {id});
        this.setState({
            selectedFileName: data.data.image_url,
            name: data.data.name,
            shortName: data.data.short_name,
            id: data.data.id
        });
    }

    async saveLanguages() {
        if (((this.state.selectedFile.name && this.state.selectedFile.name.length > 0) || this.state.selectedFileName.length > 0) && this.state.name.length > 0 && this.state.shortName.length > 0) {
            const formData = new FormData();
            formData.append('logo', this.state.selectedFile);
            formData.append('name', this.state.name);
            formData.append('shortName', this.state.shortName);
            formData.append('id', this.state.id.toString());
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            //save language data
            const {data: data} = await axios.post('/api/languages/save', formData, config);

            if (data.data.success) {
                this.setState({
                    redirect: true
                });
            }
        } else {
            let error = "";
            if (!((this.state.selectedFile.name && this.state.selectedFile.name.length > 0) || this.state.selectedFileName.length > 0))
                error += 'Language image is not selected.\n'

            if (this.state.name.length == 0)
                error += "Language name is not entered.\n"

            if (this.state.shortName.length == 0)
                error += "Language short name is not entered.\n";


            this.setState({
                error: error
            });
        }
    }

    onChangeFileUpload(e: any) {
        this.setState({
            selectedFile: e.target.files[0],
            selectedFileName: e.target.files[0].name
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeShortName(e) {
        this.setState({
            shortName: e.target.value
        })
    }

    render() {
        if (this.state.redirect)
            return (<Redirect to='/languages'/>);

        return (
            <Layout>
                <Head>
                    <title>Gmarket - Add language</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Add language</h1>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">Add language</h6>
                        </div>
                    </div>
                    <div className="card-body">
                        {
                            this.state.error.length > 0 && (
                                <div className="alert alert-danger alert-block">
                                    <button type="button" className="close" data-dismiss="alert">×</button>
                                    <strong>
                                        {this.state.error}
                                    </strong>
                                </div>
                            )
                        }
                        <form>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Language name</label>
                                    <input className="form-control" onChange={this.onChangeName} value={this.state.name}
                                           placeholder="Language name" required={true}/>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Language image</label>
                                    <div className="custom-file">
                                        <input type="file" onChange={this.onChangeFileUpload}
                                               className="custom-file-input" id="customFile"/>
                                        <label className="custom-file-label"
                                               htmlFor="customFile">{this.state.selectedFileName}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Language short name</label>
                                    <input className="form-control" onChange={this.onChangeShortName}
                                           value={this.state.shortName} placeholder="Language short name"
                                           required={true}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="col col-md-12 col-sm-12">
                                <input value="Save Language" onClick={this.saveLanguages}
                                       className="btn btn-success float-right" type="button"/>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        )
    }
}