import React, {Component} from 'react';
import Layout from '../../layouts/layouts'
import Head from 'next/head';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import GoogleMapReact, {latLng2Tile} from "google-map-react";
import SmallLoader from "../../components/smallLoader";
import {RouteProps} from 'react-router';

declare var $: any;

const AnyReactComponent = ({lat, lng, text}) => <div><i className="fa fa-store red-icon"></i></div>;

interface AppProps {

}

interface AppState {
    name: string,
    names: any[],
    description: string,
    descriptions: any[],
    info: string,
    infos: any[],
    logo: any,
    logoName: string,
    backImage: any,
    backImageName: string,
    type: number,
    deliveryPrice: number,
    deliveryRange: number,
    active_lang: any,
    langs: any[],
    id: number,
    error: string,
    lat: number,
    lng: number,
    address: string,
    addresses: any[],
    open_hours: string,
    close_hours: string,
    is_closed: boolean,
    admin_comission: number,
    tax: number,
    mobile: string,
    phone: string,
    redirectTo: boolean,
    feature_type: number,
    loading: boolean
}

export default class ShopsAdd extends Component<AppProps & RouteProps, AppState> {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            names: [],
            description: "",
            descriptions: [],
            info: "",
            infos: [],
            logo: {},
            logoName: "Choose file",
            backImage: {},
            backImageName: "Choose file",
            type: 1,
            deliveryPrice: 0,
            deliveryRange: 0,
            active_lang: -1,
            langs: [],
            id: -1,
            error: "",
            lat: 59.95,
            lng: 30.33,
            address: "",
            addresses: [],
            open_hours: "08:00",
            close_hours: "18:00",
            is_closed: false,
            admin_comission: 0,
            tax: 0,
            mobile: "",
            phone: "",
            redirectTo: false,
            feature_type: 1,
            loading: true
        }

        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeShopName = this.onChangeShopName.bind(this);
        this.onChangeShopDescription = this.onChangeShopDescription.bind(this);
        this.onChangeLogoUpload = this.onChangeLogoUpload.bind(this);
        this.onChangeBackImageUpload = this.onChangeBackImageUpload.bind(this);
        this.onChangeActiveLang = this.onChangeActiveLang.bind(this);
        this.onChangeShopDeliveryPrice = this.onChangeShopDeliveryPrice.bind(this);
        this.onChangeShopDeliveryRange = this.onChangeShopDeliveryRange.bind(this);
        this.onClickMap = this.onClickMap.bind(this);
        this.onChangeShopAddress = this.onChangeShopAddress.bind(this);
        this.onChangeOpenHours = this.onChangeOpenHours.bind(this);
        this.onChangeCloseHours = this.onChangeCloseHours.bind(this);
        this.onChangeClosed = this.onChangeClosed.bind(this);
        this.onChangeAdminComission = this.onChangeAdminComission.bind(this);
        this.onChangeShopTax = this.onChangeShopTax.bind(this);
        this.onChangeShopInfo = this.onChangeShopInfo.bind(this);
        this.onChangeMobile = this.onChangeMobile.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.saveShops = this.saveShops.bind(this);
        this.onChangeFeatureType = this.onChangeFeatureType.bind(this);
    }

    async componentDidMount() {
        await this.getLangs();
        if (this.props.match.params.id > 0)
            this.getShopInfoById(this.props.match.params.id);
        else
            this.setState({
                loading: false
            })
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

    async getShopInfoById(id: number) {
        //get brand by id
        const {data: data} = await axios.post('/api/shops/info', {id});

        const langs = data.data.lang;
        var names = [];
        var descriptions = [];
        var infos = [];
        var addresses = [];
        if (langs.length > 0) {
            for (let i in langs) {
                let id_lang = langs[i].id_lang.id;
                if (names.length == 0) {
                    this.setState({
                        name: langs[i].name,
                        description: langs[i].description,
                        info: langs[i].info,
                        address: langs[i].address,
                        active_lang: langs[i].id_lang
                    });
                }

                names.push({
                    id_lang: id_lang,
                    value: langs[i].name
                });
                descriptions.push({
                    id_lang: id_lang,
                    value: langs[i].description
                });
                infos.push({
                    id_lang: id_lang,
                    value: langs[i].info
                });
                addresses.push({
                    id_lang: id_lang,
                    value: langs[i].address
                });
            }
        }

        this.setState({
            names: names,
            descriptions: descriptions,
            infos: infos,
            addresses: addresses,
            logoName: data.data.logo_url,
            backImageName: data.data.backimage_url,
            deliveryPrice: data.data.delivery_price,
            deliveryRange: data.data.delivery_range,
            type: data.data.delivery_type,
            phone: data.data.phone,
            mobile: data.data.mobile,
            open_hours: data.data.open_hour,
            close_hours: data.data.close_hour,
            lat: data.data.latitude,
            lng: data.data.longtitude,
            tax: data.data.tax,
            admin_comission: data.data.admin_percentage,
            feature_type: data.data.show_type,
            id: data.data.id,
            loading: false
        });
    }

    onChangeType(type: number) {
        this.setState({
            type: type
        })
    }

    onChangeFeatureType(type: number) {
        this.setState({
            feature_type: type
        })
    }

    onChangeAdminComission(e: any) {
        this.setState({
            admin_comission: e.target.value
        });
    }

    onChangeShopTax(e: any) {
        this.setState({
            tax: e.target.value
        });
    }

    onChangeMobile(e: any) {
        this.setState({
            mobile: e.target.value
        });
    }

    onChangePhone(e: any) {
        this.setState({
            phone: e.target.value
        });
    }

    onChangeShopDeliveryPrice(e: any) {
        this.setState({
            deliveryPrice: e.target.value
        });
    }

    onChangeShopDeliveryRange(e: any) {
        this.setState({
            deliveryRange: e.target.value
        });
    }

    onChangeShopName(e: any) {
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

    onChangeShopDescription(e) {
        let descriptions_array = this.state.descriptions;
        let index = descriptions_array.findIndex((item) => item.id_lang == this.state.active_lang.id);
        if (index == -1)
            descriptions_array.push({
                id_lang: this.state.active_lang.id,
                value: e.target.value
            });
        else
            descriptions_array[index].value = e.target.value;
        this.setState({
            descriptions: descriptions_array,
            description: e.target.value
        })
    }

    onChangeShopInfo(e) {
        let infos_array = this.state.infos;
        let index = infos_array.findIndex((item) => item.id_lang == this.state.active_lang.id);
        if (index == -1)
            infos_array.push({
                id_lang: this.state.active_lang.id,
                value: e.target.value
            });
        else
            infos_array[index].value = e.target.value;
        this.setState({
            infos: infos_array,
            info: e.target.value
        })
    }

    onChangeLogoUpload(e: any) {
        this.setState({
            logo: e.target.files[0],
            logoName: e.target.files[0].name
        });
    }

    onChangeBackImageUpload(e: any) {
        this.setState({
            backImage: e.target.files[0],
            backImageName: e.target.files[0].name
        });
    }

    onChangeActiveLang(lang: any) {
        let name = "";
        let description = "";
        let info = "";
        let address = "";

        let index = this.state.names.findIndex((item) => item.id_lang == lang.id);
        if (index > -1)
            name = this.state.names[index].value;

        let index2 = this.state.descriptions.findIndex((item) => item.id_lang == lang.id);
        if (index2 > -1)
            description = this.state.descriptions[index2].value;

        let index3 = this.state.infos.findIndex((item) => item.id_lang == lang.id);
        if (index3 > -1)
            info = this.state.infos[index3].value;

        let index4 = this.state.addresses.findIndex((item) => item.id_lang == lang.id);
        if (index4 > -1)
            address = this.state.addresses[index4].value;

        this.setState({
            active_lang: lang,
            name: name,
            description: description,
            info: info,
            address: address
        });
    }

    onChangeShopAddress(e: any) {
        let address_array = this.state.addresses;
        let index = address_array.findIndex((item) => item.id_lang == this.state.active_lang.id);
        if (index == -1)
            address_array.push({
                id_lang: this.state.active_lang.id,
                value: e.target.value
            });
        else
            address_array[index].value = e.target.value;

        this.setState({
            addresses: address_array,
            address: e.target.value
        })
    }

    onClickMap(position) {
        this.setState({
            lat: position.lat,
            lng: position.lng
        })
    }

    onChangeOpenHours(e: any) {
        this.setState({
            open_hours: e.target.value
        })
    }

    onChangeCloseHours(e: any) {
        this.setState({
            close_hours: e.target.value
        })
    }

    onChangeClosed(is_closed: boolean) {
        this.setState({
            is_closed: is_closed
        })
    }

    async saveShops() {
        if (((this.state.logo.name && this.state.logo.name.length > 0) || this.state.logoName.length > 0)
            && ((this.state.backImage.name && this.state.backImage.name.length > 0) || this.state.backImageName.length > 0)
            && this.state.names.length > 0 && this.state.descriptions.length > 0) {
            const formData = new FormData();
            formData.append('logo', this.state.logo);
            for (let i = 0; i < this.state.names.length; i++) {
                if (!this.state.names[i]) continue;

                formData.append('name[' + this.state.names[i].id_lang + ']', this.state.names[i].value);
                formData.append('description[' + this.state.descriptions[i].id_lang + ']', this.state.descriptions[i].value);
                formData.append('address[' + this.state.addresses[i].id_lang + ']', this.state.addresses[i].value);
                formData.append('info[' + this.state.infos[i].id_lang + ']', this.state.infos[i].value);
            }
            formData.append('back_image', this.state.backImage);
            formData.append('type', this.state.type.toString());
            formData.append('delivery_price', this.state.deliveryPrice.toString());
            formData.append('delivery_range', this.state.deliveryRange.toString());
            formData.append('id', this.state.id.toString());
            formData.append('lat', this.state.lat.toString());
            formData.append('lng', this.state.lng.toString());
            formData.append('open_hours', this.state.open_hours.toString());
            formData.append('close_hours', this.state.close_hours.toString());
            formData.append('is_closed', this.state.is_closed.toString());
            formData.append('admin_comission', this.state.admin_comission.toString());
            formData.append('mobile', this.state.mobile.toString());
            formData.append('phone', this.state.phone.toString());
            formData.append('tax', this.state.tax.toString());
            formData.append('feature_type', this.state.feature_type.toString());

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            //save shops data
            const {data: data} = await axios.post('/api/shops/save', formData, config);

            if (data.data.success) {
                this.setState({
                    redirectTo: true
                });
            }
        } else {
            let error = "";
            if (!((this.state.logo.name && this.state.logo.name.length > 0) || this.state.logoName.length > 0))
                error += 'Shop logo image is not selected.\n'

            if (!((this.state.backImage.name && this.state.backImage.name.length > 0) || this.state.backImageName.length > 0))
                error += 'Shop background image is not selected.\n'

            if (this.state.names.length < this.state.langs.length)
                error += "Shop name is not entered in some languages.\n"

            if (this.state.descriptions.length < this.state.langs.length)
                error += "Shop description is not entered in some languages.\n"

            this.setState({
                error: error
            });
        }
    }

    render() {
        if (this.state.redirectTo)
            return (<Redirect to='/shops'/>);

        return (
            <Layout>
                <Head>
                    <title>Gmarket - Add shop</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Add Shop</h1>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">Add Shop</h6>
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
                                    <input className="form-control" value={this.state.name}
                                           onChange={this.onChangeShopName} placeholder="Shop name" required={true}/>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Description</label>
                                    <textarea className="form-control" placeholder="Description"
                                              onChange={this.onChangeShopDescription}
                                              value={this.state.description}></textarea>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Address</label>
                                    <input className="form-control" onChange={this.onChangeShopAddress}
                                           value={this.state.address} placeholder="Shop address" required={true}/>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Info</label>
                                    <textarea className="form-control" placeholder="Info"
                                              onChange={this.onChangeShopInfo}
                                              value={this.state.info}></textarea>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Phone</label>
                                    <input className="form-control" onChange={this.onChangePhone}
                                           value={this.state.phone} placeholder="Phone" required={true}/>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Mobile</label>
                                    <input className="form-control" onChange={this.onChangeMobile}
                                           value={this.state.mobile} placeholder="Mobile" required={true}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Admin Commission</label>
                                    <input className="form-control" onChange={this.onChangeAdminComission} type="number"
                                           value={this.state.admin_comission} placeholder="Admin comission" required={true}/>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Tax</label>
                                    <input className="form-control" onChange={this.onChangeShopTax} type="number"
                                           value={this.state.tax} placeholder="Tax" required={true}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Delivery fee</label>
                                    <input className="form-control" value={this.state.deliveryPrice} type="number"
                                           onChange={this.onChangeShopDeliveryPrice} placeholder="Shop delivery price"
                                           required={true}/>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Delivery range</label>
                                    <input className="form-control" value={this.state.deliveryRange} type="number"
                                           onChange={this.onChangeShopDeliveryRange} placeholder="Shop delivery range"
                                           required={true}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Logo</label>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input"
                                               onChange={this.onChangeLogoUpload} id="logo"/>
                                        <label className="custom-file-label"
                                               htmlFor="logo">{this.state.logoName}</label>
                                    </div>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Background image</label>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input"
                                               onChange={this.onChangeBackImageUpload} id="backimage"/>
                                        <label className="custom-file-label"
                                               htmlFor="backimage">{this.state.backImageName}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Open hours</label>
                                    <input type="time" className="form-control" value={this.state.open_hours}
                                           onChange={this.onChangeOpenHours} placeholder="Open hours" required={true}/>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Close hours</label>
                                    <input type="time" className="form-control" value={this.state.close_hours}
                                           onChange={this.onChangeCloseHours} placeholder="Close hours"
                                           required={true}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-4 col-sm-12">
                                    <label>Delivery type</label>
                                    <div className="custom-control custom-checkbox small">
                                        <input checked={this.state.type == 1 ? true : false}
                                               onChange={() => this.onChangeType(1)} id="delivery" type="checkbox"
                                               className="custom-control-input"/>
                                        <label htmlFor="delivery" onClick={() => this.onChangeType(1)}
                                               className="custom-control-label">Delivery</label>
                                    </div>
                                    <div className="custom-control custom-checkbox small">
                                        <input checked={this.state.type == 2 ? true : false}
                                               onChange={() => this.onChangeType(2)} id="pickup" type="checkbox"
                                               className="custom-control-input"/>
                                        <label htmlFor="pickup" onClick={() => this.onChangeType(2)}
                                               className="custom-control-label">Pickup</label>
                                    </div>
                                    <div className="custom-control custom-checkbox small">
                                        <input checked={this.state.type == 3 ? true : false}
                                               onChange={() => this.onChangeType(3)} id="pickupanddelivery"
                                               type="checkbox" className="custom-control-input"/>
                                        <label htmlFor="pickupanddelivery" onClick={() => this.onChangeType(3)}
                                               className="custom-control-label">Delivery & Pickup</label>
                                    </div>
                                </div>
                                <div className="col col-md-4 col-sm-12">
                                    <label>Closed restaurant</label>
                                    <div className="custom-control custom-checkbox small">
                                        <input checked={this.state.is_closed}
                                               onChange={() => this.onChangeClosed(!this.state.is_closed)}
                                               id="is_closed" type="checkbox" className="custom-control-input"/>
                                        <label htmlFor="is_closed" className="custom-control-label">Is closed</label>
                                    </div>
                                </div>
                                <div className="col col-md-4 col-sm-12">
                                    <label>Feature type</label>
                                    <div className="custom-control custom-checkbox small">
                                        <input checked={this.state.feature_type == 1 ? true : false}
                                               onChange={() => this.onChangeFeatureType(1)} id="default" type="checkbox"
                                               className="custom-control-input"/>
                                        <label htmlFor="default" onClick={() => this.onChangeFeatureType(1)}
                                               className="custom-control-label">Default</label>
                                    </div>
                                    <div className="custom-control custom-checkbox small">
                                        <input checked={this.state.feature_type == 2 ? true : false}
                                               onChange={() => this.onChangeFeatureType(2)} id="new" type="checkbox"
                                               className="custom-control-input"/>
                                        <label htmlFor="new" onClick={() => this.onChangeFeatureType(2)}
                                               className="custom-control-label">New</label>
                                    </div>
                                    <div className="custom-control custom-checkbox small">
                                        <input checked={this.state.feature_type == 3 ? true : false}
                                               onChange={() => this.onChangeFeatureType(3)} id="top"
                                               type="checkbox" className="custom-control-input"/>
                                        <label htmlFor="top" onClick={() => this.onChangeFeatureType(3)}
                                               className="custom-control-label">Top</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-md-12 col-sm-12" style={{height: '500px'}}>
                                <label className="form-control-label">Location</label>
                                <GoogleMapReact
                                    bootstrapURLKeys={{key: "AIzaSyAIZAHqq0Gpw0yNcq6LgsQd9EAGpee5sMg"}}
                                    defaultCenter={{
                                        lat: 59.95,
                                        lng: 30.33
                                    }}
                                    defaultZoom={14}
                                    onClick={this.onClickMap}>
                                    <AnyReactComponent
                                        lat={this.state.lat}
                                        lng={this.state.lng}
                                        text="New location"
                                    />
                                </GoogleMapReact>
                            </div>
                            <hr className="mt-5"/>
                            <div className="col col-md-12 col-sm-12">
                                <input onClick={this.saveShops} value="Save Shop"
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