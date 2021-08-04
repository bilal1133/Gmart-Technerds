import React, {Component} from 'react';
import Layout from '../../layouts/layouts'
import Head from 'next/head';
import axios from 'axios';
import Cookies from "js-cookie";
import {Redirect} from 'react-router-dom';
import SmallLoader from "../../components/smallLoader";
import {RouteProps} from 'react-router';

declare var $: any;

interface AppProps {

}

interface AppState {
    selectedFileName: string,
    selectedFile: any,
    brandName: string,
    id: number,
    error: string,
    shops: any[],
    shop: number,
    active: number,
    users: any,
    redirectTo: boolean,
    loading: boolean
}

export default class BrandsAdd extends Component<AppProps & RouteProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            selectedFileName: "Choose file",
            selectedFile: {},
            brandName: "",
            id: -1,
            error: "",
            shops: [],
            shop: -1,
            active: 1,
            users: [],
            redirectTo: false,
            loading: true
        }

        this.onChangeFileUpload = this.onChangeFileUpload.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.saveBrands = this.saveBrands.bind(this);
        this.getBrandInfoById = this.getBrandInfoById.bind(this);
        this.onChangeActive = this.onChangeActive.bind(this);
        this.changeShop = this.changeShop.bind(this);
        this.getShops = this.getShops.bind(this);
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
            this.getBrandInfoById(this.props.match.params.id);
        else
            this.setState({
                loading: false
            })

        this.getShops();

        setTimeout(() => {
            $('.shop-select').selectpicker({
                liveSearch: true
            });
        }, 1000);
    }

    async getShops() {
        //get all active shops list
        const {data: data} = await axios.post('/api/shops/active', {
            "id_shop": this.state.users['shop'] ? this.state.users['shop']['id'] : 0,
        })
        if (data.data.length > 0) {
            this.setState({
                shops: data.data,
                shop: this.state.shop == 1 ? data.data[0].id : this.state.shop
            })
        }

        $('.shop-select').selectpicker('refresh');
    }

    async getBrandInfoById(id: number) {
        //get brand by id
        const {data: data} = await axios.post('/api/brands/info', {id});
        this.setState({
            selectedFileName: data.data.image_url,
            brandName: data.data.name,
            id: data.data.id,
            shop: data.data.id_shop.id,
            loading: false
        });
    }

    async saveBrands() {
        if (((this.state.selectedFile.name && this.state.selectedFile.name.length > 0) || this.state.selectedFileName.length > 0) && this.state.brandName.length > 0) {
            const formData = new FormData();
            formData.append('brandLogo', this.state.selectedFile);
            formData.append('brandName', this.state.brandName);
            formData.append('active', this.state.active.toString());
            formData.append('shop', this.state.shop.toString());
            formData.append('id', this.state.id.toString());
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            //save brands data
            const {data: data} = await axios.post('/api/brands/save', formData, config);

            if (data.data.success) {
                this.setState({
                    redirectTo: true
                })
            }
        } else {
            let error = "";
            if (!((this.state.selectedFile.name && this.state.selectedFile.name.length > 0) || this.state.selectedFileName.length > 0))
                error += 'Brand image is not selected.\n'

            if (this.state.brandName.length == 0)
                error += "Brand name is not entered.\n"

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
            brandName: e.target.value
        })
    }

    changeShop(e: any) {
        this.setState({
            shop: e.target.value
        })
    }

    onChangeActive(active: number) {
        this.setState({
            active: active
        });
    }

    render() {
        if (this.state.redirectTo)
            return (<Redirect to='/brands'/>);

        return (
            <Layout>
                <Head>
                    <title>Gmarket - Add brand</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Add brand</h1>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">Add brand</h6>
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
                                    <label>Name</label>
                                    <input className="form-control" onChange={this.onChangeName}
                                           value={this.state.brandName} placeholder="Name" required={true}/>
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
                                    <label>Shop</label>
                                    <select className="form-control shop-select" value={this.state.shop}
                                            onChange={this.changeShop}>
                                        {
                                            this.state.shops.length > 0 && this.state.shops.map((item) => {
                                                return (
                                                    <option key={item.id} value={item.id}>{item.lang[0].name}</option>
                                                );
                                            })
                                        }
                                    </select>
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
                                <input value="Save Brand" onClick={this.saveBrands}
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