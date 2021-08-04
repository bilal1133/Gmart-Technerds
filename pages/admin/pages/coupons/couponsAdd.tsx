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
    discount: number,
    discount_type: number,
    shops: any[],
    shop: number,
    productsData: any[],
    products: any[],
    loading: boolean
}

export default class CouponsAdd extends Component<AppProps & RouteProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
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
            discount: 0,
            discount_type: 0,
            shops: [],
            shop: -1,
            productsData: [],
            products: [],
            loading: true
        }


        this.onChangeName = this.onChangeName.bind(this);
        this.saveCoupon = this.saveCoupon.bind(this);
        this.onChangeActiveLang = this.onChangeActiveLang.bind(this);
        this.onChangeActive = this.onChangeActive.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDiscount = this.onChangeDiscount.bind(this);
        this.onChangeDiscountType = this.onChangeDiscountType.bind(this);
        this.onChangeShop = this.onChangeShop.bind(this);
        this.onChangeProducts = this.onChangeProducts.bind(this);
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
            this.getCouponInfoById(this.props.match.params.id);
        else
            this.setState({
                loading: false
            })

        this.getShops();
        this.getLangs();

        setTimeout(() => {
            $('.shop-select').selectpicker({
                liveSearch: true
            });
            $('.discount-type-select').selectpicker({
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
        if (data.data.length > 0)
            this.setState({
                productsData: data.data
            })
        setTimeout(() => {
            $('.product-select').selectpicker('refresh');
        }, 1000);
    }

    async getCouponInfoById(id: number) {
        //get brand by id
        const {data: data} = await axios.post('/api/coupons/info', {id});

        const langs = data.data.lang;
        const products = data.data.products;
        var descriptions = [];
        if (langs.length > 0) {
            for (let i in langs) {
                let id_lang = langs[i].lang.id;
                if (descriptions.length == 0) {
                    this.setState({
                        description: langs[i].description,
                        active_lang: langs[i].lang
                    });
                }

                descriptions.push({
                    id_lang: id_lang,
                    value: langs[i].description
                });
            }
        }

        var products_array = [];
        if (products.length > 0) {
            for (let i in products) {
                if (!products[i]['product']) continue;
                products_array.push({
                    id: products[i]['product']['id'],
                    name: products[i]['product']['lang'][0]['name']
                });
            }
        }

        this.getActiveProducts(data.data.shop.id);

        this.setState({
            id: data.data.id,
            shop: data.data.shop.id,
            active: data.data.active,
            discount: data.data.discount,
            discount_type: data.data.discount_type,
            name: data.data.name,
            products: products_array,
            loading: false,
            descriptions: descriptions
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

    async saveCoupon() {
        if (this.state.descriptions.length > 0) {
            //save coupon data
            const formData = new FormData();
            for (let i = 0; i < this.state.descriptions.length; i++) {
                if (!this.state.descriptions[i]) continue;

                formData.append('descriptions[' + this.state.descriptions[i].id_lang + ']', this.state.descriptions[i].value);
            }

            for (let i = 0; i < this.state.products.length; i++) {
                if (!this.state.products[i]) continue;

                formData.append('products[' + i + ']', this.state.products[i].id);
            }
            formData.append('id', this.state.id.toString());
            formData.append('name', this.state.name);
            formData.append('discount', this.state.discount.toString());
            formData.append('discount_type', this.state.discount_type.toString());
            formData.append('shop', this.state.shop.toString());
            formData.append('active', this.state.active.toString());
            //save coupon data
            const {data: data} = await axios.post('/api/coupons/save', formData);

            if (data.data.success) {
                this.setState({
                    redirectTo: true
                })
            }
        } else {
            let error = "";
            if (this.state.descriptions.length != this.state.langs.length)
                error += "Coupon description is not entered in some languages.\n"

            this.setState({
                error: error
            });
        }
    }

    //setState on change shop
    onChangeShop(e: any) {
        this.setState({
            shop: e.target.value,
            productsData: [],
            products: []
        })

        this.getActiveProducts(e.target.value);
    }

    onChangeProducts(e: any) {
        let products = this.state.products;
        let index = products.findIndex((item) => item.id == e.target.value);
        if (index == -1)
            products.push({
                id: e.target.value,
                name: e.target.selectedOptions[0].innerText
            });

        this.setState({
            products: products
        })
    }

    onChangeActiveLang(lang) {
        var description = "";

        let mindex = this.state.descriptions.findIndex((item) => item.id_lang == lang.id);

        if (mindex > -1)
            description = this.state.descriptions[mindex].value;

        this.setState({
            active_lang: lang,
            description: description
        });
    }

    //setState on change name
    onChangeName(e: any) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeActive(active: number) {
        this.setState({
            active: active
        });
    }

    onChangeDiscount(e) {
        this.setState({
            discount: e.target.value
        })
    }

    onChangeDiscountType(e) {
        this.setState({
            discount_type: e.target.value
        })
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
            return (<Redirect to='/coupon'/>);

        return (
            <Layout>
                <Head>
                    <title>Gmarket - Add Coupon</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Add Coupon</h1>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">Add Coupon</h6>
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
                                    <label>Code</label>
                                    <input className="form-control" onChange={this.onChangeName} value={this.state.name}
                                           placeholder="Code" required={true}/>
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
                                    <label>Discount type</label>
                                    <select className="form-control discount-type-select" onChange={this.onChangeDiscountType} value={this.state.discount_type}>
                                        <option value={0}>Percentage</option>
                                        <option value={1}>Fixed price</option>
                                    </select>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Discount</label>
                                    <input className="form-control" onChange={this.onChangeDiscount}
                                           value={this.state.discount}
                                           placeholder="Discount" type="number" required={true}/>
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
                                    <select className="form-control product-select"
                                            onChange={this.onChangeProducts}>
                                        {
                                            this.state.productsData && this.state.productsData.map((item) => {
                                                return (
                                                    <option key={item.id}
                                                            value={item.id}>{item.lang[0].name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group d-flex">
                                {
                                    this.state.products.length > 0 && this.state.products.map((item) => {
                                        return (
                                            <div key={item.id} className="badge badge-light mr-1">
                                                <button type="button" id={item.id} className="close">×</button>
                                                <strong className="mr-2 h6">{item.name}</strong>
                                            </div>
                                        );
                                    })
                                }
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
                                <input onClick={this.saveCoupon} value="Save Coupon"
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