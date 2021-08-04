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
    descriptions: any[],
    description: string,
    price: number,
    selectedFile: any,
    selectedFileName: string,
    shops: any[],
    shop: number,
    products: any[],
    product: number,
    extraGroups: any[],
    extraGroup: number,
    backgroundColor: string,
    loading: boolean
}

export default class ExtrasAdd extends Component<AppProps & RouteProps, AppState> {
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
            descriptions: [],
            description: "",
            price: 0,
            selectedFile: {},
            selectedFileName: "Upload image",
            shops: [],
            shop: -1,
            products: [],
            product: -1,
            extraGroups: [],
            extraGroup: -1,
            backgroundColor: '#ffffff',
            loading: true
        }


        this.onChangeName = this.onChangeName.bind(this);
        this.saveExtras = this.saveExtras.bind(this);
        this.onChangeActiveLang = this.onChangeActiveLang.bind(this);
        this.onChangeActive = this.onChangeActive.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeFileUpload = this.onChangeFileUpload.bind(this);
        this.onChangeShop = this.onChangeShop.bind(this);
        this.onChangeProduct = this.onChangeProduct.bind(this);
        this.onChangeExtraGroup = this.onChangeExtraGroup.bind(this);
        this.onChangeBackgroundColor = this.onChangeBackgroundColor.bind(this);
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
            this.getExtrasInfoById(this.props.match.params.id);
        else
            this.setState({
                loading: false
            })

        this.getShops();
        this.getLangs();
        this.getExtrasGroups();

        setTimeout(() => {
            $('.shop-select').selectpicker({
                liveSearch: true
            });
            $('.product-select').selectpicker({
                liveSearch: true
            });
        }, 1000);
    }

    async getShops() {
        //get all active shops list
        const {data: data} = await axios.post('/api/shops/active', {
            //"id_shop": this.state.shop,
        })
        if (data.data.length > 0)
            this.setState({
                shops: data.data,
                shop: this.state.shop == -1 ? data.data[0].id : this.state.shop
            })

        if (!(this.props.match && this.props.match.params.id > 0))
            this.getActiveProducts(data.data[0].id);

        setTimeout(() => {
            $('.shop-select').selectpicker('refresh');
        }, 3000);
    }

    async getActiveProducts(id_shop) {
        //get all active languages list
        const {data: data} = await axios.post('/api/products/active', {
            "id_shop": id_shop,
        })
        if (data.data.length > 0) {
            this.setState({
                products: data.data,
                product: this.state.product == -1 ? data.data[0].id : this.state.product
            })
            setTimeout(() => {
                $('.product-select').selectpicker('refresh');
            }, 3000);
        }
    }

    async getExtrasInfoById(id: number) {
        //get brand by id
        const {data: data} = await axios.post('/api/extras/info', {id});

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
            shop: data.data.shop.id,
            product: data.data.product.id,
            active: data.data.active,
            loading: false
        });

        this.getActiveProducts(data.data.shop.id);
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

    async getExtrasGroups() {
        //get all active languages list
        const {data: data} = await axios.post('/api/extraGroups/active')
        if (data.data.length > 0)
            this.setState({
                extraGroups: data.data,
                extraGroup: data.data[0].id
            })

        setTimeout(() => {
            $('.extraGroup-select').selectpicker();
        }, 1000);
    }

    async saveExtras() {
        if (this.state.names.length > 0) {
            //save extras data
            const formData = new FormData();
            for (let i = 0; i < this.state.names.length; i++) {
                if (!this.state.names[i]) continue;

                formData.append('name[' + this.state.names[i].id_lang + ']', this.state.names[i].value);
                formData.append('description[' + this.state.descriptions[i].id_lang + ']', this.state.descriptions[i].value);
            }
            formData.append('image_url', this.state.selectedFile);
            formData.append('id', this.state.id.toString());
            formData.append('price', this.state.price.toString());
            formData.append('shop', this.state.shop.toString());
            formData.append('product', this.state.product.toString());
            formData.append('extraGroup', this.state.extraGroup.toString());
            formData.append('active', this.state.active.toString());
            formData.append('backgroundColor', this.state.backgroundColor.toString());
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            //save brands data
            const {data: data} = await axios.post('/api/extras/save', formData, config);

            if (data.data.success) {
                this.setState({
                    redirectTo: true
                })
            }
        } else {
            let error = "";
            if (this.state.names.length != this.state.langs.length)
                error += "Extras name is not entered in some languages.\n"

            this.setState({
                error: error
            });
        }
    }

    //setState on change shop
    onChangeShop(e: any) {
        this.setState({
            shop: e.target.value,
            product: -1,
            products: []
        })

        this.getActiveProducts(e.target.value);
    }

    onChangeProduct(e: any) {
        this.setState({
            product: e.target.value
        })
    }

    onChangeBackgroundColor(e: any) {
        this.setState({
            backgroundColor: e.target.value
        })
    }

    onChangeExtraGroup(e: any) {
        this.setState({
            extraGroup: e.target.value
        })
    }

    onChangeActiveLang(lang) {
        var name = "";
        var description = "";

        let index = this.state.names.findIndex((item) => item.id_lang == lang.id);

        if (index > -1)
            name = this.state.names[index].value;

        let mindex = this.state.descriptions.findIndex((item) => item.id_lang == lang.id);

        if (mindex > -1)
            description = this.state.descriptions[mindex].value;

        this.setState({
            active_lang: lang,
            name: name,
            description: description
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

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        })
    }

    onChangeFileUpload(e: any) {
        this.setState({
            selectedFile: e.target.files[0],
            selectedFileName: e.target.files[0].name
        });
    }

    onChangeDescription(e: any) {
        let description_array = this.state.descriptions;
        let index = description_array.findIndex((item) => item.id_lang == this.state.active_lang.id);
        if (index == -1)
            description_array.push({
                id_lang: this.state.active_lang.id,
                value: e.target.value
            });
        else
            description_array[index].value = e.target.value;

        this.setState({
            descriptions: description_array,
            description: e.target.value
        })
    }

    render() {
        if (this.state.redirectTo)
            return (<Redirect to='/products/extras'/>);

        return (
            <Layout>
                <Head>
                    <title>Gmarket - Add Extras</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Add extras</h1>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">Add extras</h6>
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
                                    <label>Name</label>
                                    <input className="form-control" onChange={this.onChangeName} value={this.state.name}
                                           placeholder="Name" required={true}/>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Description</label>
                                    <textarea className="form-control" placeholder="Description"
                                              onChange={this.onChangeDescription}
                                              value={this.state.description}></textarea>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Price</label>
                                    <input className="form-control" onChange={this.onChangePrice}
                                           value={this.state.price}
                                           placeholder="Price" type="number" required={true}/>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Image</label>
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
                                    <label>Shops</label>
                                    <select className="form-control shop-select" onChange={this.onChangeShop}>
                                        {
                                            this.state.shops.length > 0 && this.state.shops.map((item) => {
                                                return (
                                                    <option key={item.id}
                                                            value={item.id}>{item.lang[0].name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Products</label>
                                    <select className="form-control product-select" value={this.state.product}
                                            onChange={this.onChangeProduct}>
                                        {
                                            this.state.products && this.state.products.map((item) => {
                                                return (
                                                    <option key={item.id}
                                                            value={item.id}>{item.lang[0].name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Extras Group</label>
                                    <select className="form-control extraGroup-select"
                                            onChange={this.onChangeExtraGroup}>
                                        {
                                            this.state.extraGroups.length > 0 && this.state.extraGroups.map((item) => {
                                                return (
                                                    <option key={item.id}
                                                            value={item.id}>{item.lang[0].name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Background color</label>
                                    <input className="form-control" type="color" onChange={this.onChangeBackgroundColor}
                                           value={this.state.backgroundColor}
                                           placeholder="Background color" required={true}/>
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
                                <input onClick={this.saveExtras} value="Save Extras"
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