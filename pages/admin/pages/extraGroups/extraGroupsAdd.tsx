import React, {Component} from 'react';
import Layout from '../../layouts/layouts'
import Head from 'next/head';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Cookies from "js-cookie";
import SmallLoader from "../../components/smallLoader";
import {RouteProps} from 'react-router';

declare var $: any;

interface AppProps {

}

interface AppState {
    names: any[],
    name: string,
    active_lang: any,
    langs: any[],
    id: number,
    active: number,
    error: string,
    users: any,
    redirectTo: boolean,
    loading: boolean
}

export default class ExtraGroupsAdd extends Component<AppProps & RouteProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            names: [],
            name: "",
            active_lang: -1,
            langs: [],
            id: -1,
            active: 1,
            error: "",
            users: [],
            redirectTo: false,
            loading: true
        }


        this.onChangeName = this.onChangeName.bind(this);
        this.saveExtraGroups = this.saveExtraGroups.bind(this);
        this.onChangeActiveLang = this.onChangeActiveLang.bind(this);
        this.onChangeActive = this.onChangeActive.bind(this);
    }

    async componentDidMount() {
        let users = await Cookies.get('user');
        if (users && users != 'undefined') {
            var userData = JSON.parse(users);
            this.setState({
                users: userData
            });
        }

        if (this.props.match && this.props.match.params.id > 0)
            this.getExtraGroupInfoById(this.props.match.params.id);
        else
            this.setState({
                loading: false
            })

        this.getLangs();
    }

    async getExtraGroupInfoById(id: number) {
        //get brand by id
        const {data: data} = await axios.post('/api/extraGroups/info', {id});

        const langs = data.data.lang;
        var names = [];
        if (langs.length > 0) {
            for (let i in langs) {
                let id_lang = langs[i].lang.id;
                if (names.length == 0) {
                    this.setState({
                        name: langs[i].name,
                        active_lang: langs[i].lang
                    });
                }

                names.push({
                    id_lang: id_lang,
                    value: langs[i].name
                });
            }
        }

        this.setState({
            id: data.data.id,
            names: names,
            active: data.data.active,
            loading: false
        });
    }

    async getLangs() {
        //get all active languages list
        const {data: data} = await axios.post('/api/languages/active')
        if (data.data.length > 0)
            this.setState({
                langs: data.data,
                active_lang: data.data[0]
            })
    }

    async saveExtraGroups() {
        if (this.state.names.length > 0) {
            //save extra groups data
            const formData = new FormData();
            for (let i = 0; i < this.state.names.length; i++) {
                if (!this.state.names[i]) continue;

                formData.append('name[' + this.state.names[i].id_lang + ']', this.state.names[i].value);
            }
            formData.append('id', this.state.id.toString());
            formData.append('active', this.state.active.toString());
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            //save brands data
            const {data: data} = await axios.post('/api/extraGroups/save', formData, config);

            if (data.data.success) {
                this.setState({
                    redirectTo: true
                })
            }
        } else {
            let error = "";
            if (this.state.names.length != this.state.langs.length)
                error += "Extra group name is not entered in some languages.\n"

            this.setState({
                error: error
            });
        }
    }

    onChangeActiveLang(lang) {
        var name = "";

        let index = this.state.names.findIndex((item) => item.id_lang == lang.id);

        if (index > -1)
            name = this.state.names[index].value;

        this.setState({
            active_lang: lang,
            name: name
        });
    }

    //setState on change name
    onChangeName(e: any) {
        let name_array = this.state.names;
        let index = name_array.findIndex((item) => item.id_lang == this.state.active_lang.id);
        if (index == -1)
            name_array.push({
                id_lang: this.state.active_lang.id,
                value: e.target.value
            });
        else
            name_array[index].value = e.target.value;
        this.setState({
            names: name_array,
            name: e.target.value
        })
    }

    onChangeActive(active: number) {
        this.setState({
            active: active
        });
    }

    render() {
        if (this.state.redirectTo)
            return (<Redirect to='/products/extraGroups'/>);

        return (
            <Layout>
                <Head>
                    <title>Gmarket - Add Extra Group</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Add Extra Group</h1>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">Add Extra Group</h6>
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
                            <div className="col col-md-12 col-sm-12" style={{display: 'flex', justifyContent: 'end'}}>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-default dropdown-toggle"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {
                                            this.state.active_lang.name
                                        }
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        {
                                            this.state.langs.length > 0 && this.state.langs.map((item) => {
                                                if (item.id != this.state.active_lang.id) {
                                                    return (
                                                        <button key={item.id} className="dropdown-item"
                                                                onClick={() => this.onChangeActiveLang(item)}
                                                                type="button">{item.name}</button>
                                                    );
                                                } else return (<div key={item.id}></div>);
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Extra Group name</label>
                                    <input className="form-control" onChange={this.onChangeName} value={this.state.name}
                                           placeholder="Extra Group name" required={true}/>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <div className="custom-control custom-checkbox small">
                                        <input checked={this.state.active == 1 ? true : false}
                                               onChange={() => this.onChangeActive(this.state.active == 1 ? 0 : 1)}
                                               id="active" type="checkbox" className="custom-control-input"/>
                                        <label htmlFor="active" className="custom-control-label">Active</label>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className="col col-md-12 col-sm-12">
                                <input onClick={this.saveExtraGroups} value="Save Extra Group"
                                       className="btn btn-success float-right" type="button"/>
                            </div>
                        </form>
                    </div>
                </div>
                {
                    this.state.loading && (
                        <SmallLoader/>
                    )
                }
            </Layout>
        )
    }
}