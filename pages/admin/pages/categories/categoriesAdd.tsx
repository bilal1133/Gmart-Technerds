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
    shops: any[],
    shop: number,
    active_lang: any,
    langs: any[],
    parents: any[],
    parent: number,
    id: number,
    active: number,
    selectedFile: any,
    selectedFileName: string,
    error: string,
    users: any,
    redirectTo: boolean,
    loading: boolean
}

export default class CategoriesAdd extends Component<AppProps & RouteProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            names: [],
            name: "",
            shops: [],
            shop: -1,
            active_lang: -1,
            langs: [],
            parents: [],
            parent: -1,
            id: -1,
            active: 1,
            selectedFile: {},
            selectedFileName: "Upload image",
            error: "",
            users: [],
            redirectTo: false,
            loading: true
        }


        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeShop = this.onChangeShop.bind(this);
        this.saveCategories = this.saveCategories.bind(this);
        this.onChangeActiveLang = this.onChangeActiveLang.bind(this);
        this.changeParent = this.changeParent.bind(this);
        this.onChangeActive = this.onChangeActive.bind(this);
        this.onChangeFileUpload = this.onChangeFileUpload.bind(this);
    }

    async componentDidMount() {
        let users = await Cookies.get('user');
        if (users && users != 'undefined') {
            var userData = JSON.parse(users);
            this.setState({
                users: userData
            });
        }

        if (this.props.match && this.props.match.params.id > 0) {
            this.setState({
                id: this.props.match.params.id,
            });
            this.getCategoriesInfoById(this.props.match.params.id);
        } else
            this.setState({
                loading: false
            })

        await this.getShops();
        this.getLangs();
        this.getParentCategories();

        setTimeout(() => {
            $('.shop-select').selectpicker({
                liveSearch: true
            });
            $('.parent-select').selectpicker();
        }, 1000);
    }

    async getCategoriesInfoById(id: number) {
        //get brand by id
        const {data: data} = await axios.post('/api/categories/info', {id});

        const langs = data.data.lang;
        var names = [];
        if (langs.length > 0) {
            for (let i in langs) {
                let id_lang = langs[i].id_lang.id;
                if (names.length == 0) {
                    this.setState({
                        name: langs[i].name,
                        active_lang: langs[i].id_lang
                    });
                }

                names.push({
                    id_lang: id_lang,
                    value: langs[i].name
                });
            }
        }

        this.setState({
            names: names,
            shop: data.data.shop.id,
            parent: data.data.parent,
            active: data.data.active,
            selectedFileName: data.data.image_url,
            loading: false
        });

        setTimeout(() => {
            $('.shop-select').selectpicker('refresh');
            $('.parent-select').selectpicker('refresh');
        }, 1000);
    }

    async getShops() {
        //get all active shops list
        const {data: data} = await axios.post('/api/shops/active', {
            "id_shop": this.state.users['shop'] ? this.state.users['shop']['id'] : 0,
        })
        if (data.data.length > 0)
            this.setState({
                shops: data.data,
                shop: this.state.id == -1 ? data.data[0].id : this.state.shop
            })

        setTimeout(() => {
            $('.shop-select').selectpicker('refresh');
            $('.parent-select').selectpicker('refresh');
        }, 1000);
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

    async getParentCategories() {
        //get all active languages list
        const {data: data} = await axios.post('/api/categories/parent', {
            "id_shop": this.state.users['shop'] ? this.state.users['shop']['id'] : 0,
        })

        this.setState({
            parents: data.data
        })

        setTimeout(() => {
            $('.shop-select').selectpicker('refresh');
            $('.parent-select').selectpicker('refresh');
        }, 1000);
    }

    async saveCategories() {
        if (this.state.names.length > 0
            && ((this.state.selectedFile.name && this.state.selectedFile.name.length > 0) || this.state.selectedFileName.length > 0)) {
            //save categories data
            const formData = new FormData();
            for (let i = 0; i < this.state.names.length; i++) {
                if (!this.state.names[i]) continue;

                formData.append('name[' + this.state.names[i].id_lang + ']', this.state.names[i].value);
            }
            formData.append('shop', this.state.shop.toString());
            formData.append('parent', this.state.parent.toString());
            formData.append('id', this.state.id.toString());
            formData.append('active', this.state.active.toString());
            formData.append('image', this.state.selectedFile);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            //save brands data
            const {data: data} = await axios.post('/api/categories/save', formData, config);

            if (data.data.success) {
                this.setState({
                    redirectTo: true
                })
            }
        } else {
            let error = "";

            if (!((this.state.selectedFile.name && this.state.selectedFile.name.length > 0) || this.state.selectedFileName.length > 0))
                error += 'Category image is not selected.\n'

            if (this.state.names.length != this.state.langs.length)
                error += "Category name is not entered in some languages.\n"

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

    //setState on change shop
    onChangeShop(e: any) {
        this.setState({
            shop: e.target.value
        })
    }

    //setState on change parent
    changeParent(e: any) {
        this.setState({
            parent: e.target.value
        })
    }

    onChangeActive(active: number) {
        this.setState({
            active: active
        });
    }

    onChangeFileUpload(e: any) {
        this.setState({
            selectedFile: e.target.files[0],
            selectedFileName: e.target.files[0].name
        });
    }

    render() {

        console.log(this.state.shop);
        if (this.state.redirectTo)
            return (<Redirect to='/categories'/>);

        return (
            <Layout>
                <Head>
                    <title>Gmarket - Add category</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Add category</h1>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">Add category</h6>
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
                                    <label>Category name</label>
                                    <input className="form-control" onChange={this.onChangeName} value={this.state.name}
                                           placeholder="Category name" required={true}/>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Shop</label>
                                    <select className="form-control shop-select" value={this.state.shop}
                                            onChange={this.onChangeShop}>
                                        {
                                            this.state.shops.length > 0 && this.state.shops.map((item) => {
                                                return (
                                                    <option key={item.id} value={item.id}>{item.lang[0].name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Parent Category</label>
                                    <select className="form-control parent-select" value={this.state.parent}
                                            onChange={this.changeParent}>
                                        <option value={-1}>No Parent</option>
                                        {
                                            this.state.parents.length > 0 && this.state.parents.map((item) => {
                                                return (
                                                    <option key={item.id}
                                                            value={item.id}>{item.lang[0].name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Category image</label>
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
                                <input onClick={this.saveCategories} value="Save Category"
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