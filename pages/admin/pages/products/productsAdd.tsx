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
    active_lang: any,
    langs: any[],
    names: any,
    name: string,
    categories: any[],
    category: number,
    brands: any[],
    brand: -1,
    descriptions: any,
    description: string,
    images: any,
    quantity: number,
    price: number,
    discount_price: number,
    weight: number,
    id: number,
    error: string,
    users: any,
    shops: any[],
    shop: number,
    feature_type: number,
    active: number,
    package_count: number,
    redirectTo: boolean,
    units: any[],
    unit: number,
    loading: boolean
}

export default class ProductsAdd extends Component<AppProps & RouteProps, AppState> {
    constructor(props) {
        super(props);

        this.state = {
            active_lang: -1,
            langs: [],
            names: [],
            name: "",
            categories: [],
            category: -1,
            brands: [],
            brand: -1,
            descriptions: [],
            description: "",
            images: [{
                name: "File Upload"
            }],
            quantity: 0,
            price: 0,
            discount_price: 0,
            weight: 0,
            id: -1,
            error: "",
            users: [],
            shops: [],
            shop: -1,
            feature_type: 1,
            active: 1,
            package_count: 1,
            redirectTo: false,
            units: [],
            unit: -1,
            loading: true
        }

        this.getLangs = this.getLangs.bind(this);
        this.addImage = this.addImage.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDiscount = this.onChangeDiscount.bind(this);
        this.saveProducts = this.saveProducts.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.getProductInfoById = this.getProductInfoById.bind(this);
        this.onChangeFeatureType = this.onChangeFeatureType.bind(this);
        this.onChangeActive = this.onChangeActive.bind(this);
        this.onChangeShop = this.onChangeShop.bind(this);
        this.onChangePackageCount = this.onChangePackageCount.bind(this);
        this.onChangeUnit = this.onChangeUnit.bind(this);
    }

    async componentDidMount() {
        let users = await Cookies.get('user');
        if (users && users != 'undefined') {
            var userData = JSON.parse(users);
            this.setState({
                users: userData
            });
        }

        this.getShops();
        this.getLangs();
        this.getActiveUnits();

        if (this.props.match && this.props.match.params.id > 0)
            this.getProductInfoById(this.props.match.params.id);
        else
            this.setState({
                loading: false
            })

        setTimeout(() => {
            $('.shop-select').selectpicker({
                liveSearch: true
            });
            $('.category-select').selectpicker();
            $('.brand-select').selectpicker();
            $('.unit-select').selectpicker();
        }, 1000);
    }

    async getProductInfoById(id: number) {
        //get product by id
        const {data: data} = await axios.post('/api/products/info', {id});

        const langs = data.data.lang;
        var names = [];
        var descriptions = [];
        if (langs.length > 0) {
            for (let i in langs) {
                let id_lang = langs[i].id_lang.id;
                if (names.length == 0) {
                    this.setState({
                        name: langs[i].name,
                        description: langs[i].description,
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
            }
        }

        var shop_id = data.data.shop ? data.data.shop.id : -1;

        this.setState({
            names: names,
            price: data.data.price,
            discount_price: data.data.discount_price,
            quantity: data.data.quantity,
            weight: data.data.weight,
            package_count: data.data.pack_quantity,
            category: data.data.category ? data.data.category.id : -1,
            brand: data.data.brand ? data.data.brand.id : -1,
            shop: shop_id,
            unit: data.data.unit.id,
            feature_type: data.data.show_type,
            images: data.data.images,
            descriptions: descriptions,
            id: data.data.id,
            loading: false
        });

        this.getActiveCategories(shop_id);
        this.getActiveBrands(shop_id);
    }

    onChangeActiveLang(lang) {
        let name = "";
        let description = "";
        let index = this.state.names.findIndex((item) => item.id_lang == lang.id);
        if (index > -1)
            name = this.state.names[index].value;

        let index2 = this.state.descriptions.findIndex((item) => item.id_lang == lang.id);
        if (index2 > -1)
            description = this.state.descriptions[index2].value;

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

    async getLangs() {
        //get all active languages list
        const {data: data} = await axios.post('/api/languages/active')
        if (data.data.length > 0)
            this.setState({
                langs: data.data,
                active_lang: data.data[0]
            })
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

        if (data.data.length > 0 && !(this.props.match && this.props.match.params.id > 0)) {
            this.getActiveCategories(data.data[0].id);
            this.getActiveBrands(data.data[0].id);
        }

        setTimeout(() => {
            $('.shop-select').selectpicker('refresh');
        }, 3000);
    }

    async getActiveCategories(id_shop) {
        //get all active languages list
        const {data: data} = await axios.post('/api/categories/active', {
            "id_shop": id_shop,
        })
        if (data.data.length > 0) {
            this.setState({
                categories: data.data,
                category: this.state.category == -1 ? data.data[0].id : this.state.category
            })
            setTimeout(() => {
                $('.category-select').selectpicker('refresh');
            }, 3000);
        }
    }

    async getActiveBrands(id_shop) {
        //get all active brands list
        const {data: data} = await axios.post('/api/brands/active', {
            "id_shop": id_shop,
        })

        if (data.data.length > 0) {
            this.setState({
                brands: data.data,
                brand: this.state.brand == -1 ? data.data[0].id : this.state.brand
            })

            setTimeout(() => {
                $('.brand-select').selectpicker('refresh');
            }, 3000);
        }
    }

    async getActiveUnits() {
        //get all active brands list
        const {data: data} = await axios.post('/api/units/active')

        if (data.data.length > 0) {
            this.setState({
                units: data.data,
                unit: data.data[0].id
            })

            setTimeout(() => {
                $('.unit-select').selectpicker('refresh');
            }, 3000);
        }
    }

    async saveProducts() {
        if ((this.state.images.length > 0 && this.state.images[0].name != "File Upload") && this.state.names.length > 0 && this.state.descriptions.length > 0) {
            const formData = new FormData();
            for (let i = 0; i < this.state.images.length; i++) {
                if (this.state.images[i].image_url && this.state.images[i].image_url.length > 0)
                    formData.append('image[' + i + ']', JSON.stringify(this.state.images[i]));
                else
                    formData.append('image[' + i + ']', this.state.images[i]);
            }

            for (let i = 0; i < this.state.names.length; i++) {
                if (!this.state.names[i]) continue;
                formData.append('name[' + this.state.names[i].id_lang + ']', this.state.names[i].value);
                formData.append('description[' + this.state.descriptions[i].id_lang + ']', this.state.descriptions[i].value);
            }

            formData.append('amount', this.state.quantity.toString());
            formData.append('price', this.state.price.toString());
            formData.append('discount', this.state.discount_price.toString());
            formData.append('weight', this.state.weight.toString());
            formData.append('unit', this.state.unit.toString());
            formData.append('id_category', this.state.category.toString());
            formData.append('brand', this.state.brand.toString());
            formData.append('id', this.state.id.toString());
            formData.append('shop', this.state.shop.toString());
            formData.append('show_type', this.state.feature_type.toString());
            formData.append('active', this.state.active.toString());
            formData.append('package_count', this.state.package_count.toString());
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            //save brands data
            const {data: data} = await axios.post('/api/products/save', formData, config);

            if (data.data.success) {
                this.setState({
                    redirectTo: true
                })
            }
        } else {
            let error = "";

            if (!(this.state.images.length > 0 && this.state.images[0].name != "File Upload"))
                error += 'Please, add at least one image.\n'

            if (this.state.names.length != this.state.langs.length)
                error += "Product name is not entered in some languages.\n"

            if (this.state.descriptions.length != this.state.langs.length)
                error += "Product description is not entered in some languages.\n"

            this.setState({
                error: error
            });
        }
    }

    onChangeCategory(e: any) {
        this.setState({
            category: e.target.value
        })
    }

    onChangeUnit(e: any) {
        this.setState({
            unit: e.target.value
        })
    }

    onChangeBrand(e: any) {
        console.log(e.target.value);
        this.setState({
            brand: e.target.value
        })
    }

    //setState on change shop
    onChangeShop(e: any) {
        this.setState({
            shop: e.target.value,
            categories: []
        })

        this.getActiveCategories(e.target.value);
        this.getActiveBrands(e.target.value);
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

    onChangeImageUpload(e: any, index: number) {
        let images = this.state.images;
        images[index] = e.target.files[0];
        this.setState({
            images: images
        })
    }

    onChangeAmount(e) {
        this.setState({
            quantity: e.target.value
        })
    }

    onChangePackageCount(e) {
        this.setState({
            package_count: e.target.value
        })
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        })
    }

    onChangeDiscount(e) {
        this.setState({
            discount_price: e.target.value
        })
    }

    onChangeWeight(e) {
        this.setState({
            weight: e.target.value
        })
    }

    addImage() {
        let images = this.state.images;
        images.push({
            name: "File Upload"
        });
        this.setState({
            images: images
        })
    }

    removeImage() {
        let images = this.state.images;
        images.pop();
        this.setState({
            images: images
        })
    }

    onChangeFeatureType(type: number) {
        this.setState({
            feature_type: type
        })
    }

    onChangeActive(active: number) {
        this.setState({
            active: active
        });
    }

    render() {
        if (this.state.redirectTo)
            return (<Redirect to='/products'/>);

        return (
            <Layout>
                <Head>
                    <title>Gmarket - Add product</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Add product</h1>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">Add product</h6>
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
                                    <label>Product name</label>
                                    <input className="form-control" onChange={this.onChangeName} value={this.state.name}
                                           placeholder="Product name" required={true}/>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Product description</label>
                                    <textarea className="form-control" placeholder="Description"
                                              onChange={this.onChangeDescription}
                                              value={this.state.description}></textarea>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Shops</label>
                                    <select className="form-control shop-select" value={this.state.shop}
                                            onChange={this.onChangeShop}>
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
                                    <label>Brand</label>
                                    <select className="form-control brand-select" value={this.state.brand}
                                            onChange={this.onChangeBrand}>
                                        <option value={0}>No Brand</option>
                                        {
                                            this.state.brands.length > 0 && this.state.brands.map((item) => {
                                                return (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Category</label>
                                    <select className="form-control category-select" value={this.state.category}
                                            onChange={this.onChangeCategory}>
                                        {
                                            this.state.categories.length > 0 && this.state.categories.map((item) => {
                                                return (
                                                    <option key={item.id}
                                                            value={item.id}>{item.lang[0].name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Package count</label>
                                    <input className="form-control" onChange={this.onChangePackageCount}
                                           value={this.state.package_count} placeholder="Package count"
                                           required={true}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Price</label>
                                    <input className="form-control" onChange={this.onChangePrice}
                                           value={this.state.price} placeholder="Price" required={true}/>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Discount price</label>
                                    <input className="form-control" onChange={this.onChangeDiscount}
                                           value={this.state.discount_price} placeholder="Discount price"
                                           required={true}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <div className="row">
                                        <div className="col col-md-6 col-sm-12">
                                            <label>Weight</label>
                                            <input className="form-control" value={this.state.weight}
                                                   onChange={this.onChangeWeight} placeholder="Weight" required={true}/>
                                        </div>
                                        <div className="col col-md-6 col-sm-12">
                                            <label>Unit</label>
                                            <select className="form-control unit-select"
                                                    onChange={this.onChangeUnit} value={this.state.unit}>
                                                {
                                                    this.state.units.length > 0 && this.state.units.map((item) => {
                                                        return (
                                                            <option key={item.id}
                                                                    value={item.id}>{item.lang[0].name}</option>
                                                        );
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Quantity</label>
                                    <input className="form-control" onChange={this.onChangeAmount}
                                           value={this.state.quantity} placeholder="Quantity" required={true}/>
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
                                <div className="col col-md-6 col-sm-12">
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
                                               className="custom-control-label">Recomended</label>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <label>Product images</label>
                            {
                                this.state.images.length > 0 && this.state.images.map((item, key) => {
                                    return (<div className="form-group row" key={key}>
                                        <div className="col col-md-6 col-sm-12">
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input"
                                                       onChange={(e) => this.onChangeImageUpload(e, key)}
                                                       id="backimage"/>
                                                <label className="custom-file-label"
                                                       htmlFor="backimage">{item.image_url && item.image_url.length > 0 ? item.image_url : item.name}</label>
                                            </div>
                                        </div>
                                        <div className="col col-md-6 col-sm-12">
                                            <button onClick={this.addImage} type="button" className="btn btn-success"><i
                                                className="fa fa-plus"></i></button>
                                            {
                                                key > 0 && key == (this.state.images.length - 1) && (
                                                    <button onClick={this.removeImage} style={{marginLeft: '10px'}}
                                                            type="button" className="btn btn-success"><i
                                                        className="fa fa-minus"></i></button>
                                                )
                                            }
                                        </div>
                                    </div>);
                                })
                            }
                            <hr/>
                            <div className="col col-md-12 col-sm-12">
                                <input onClick={this.saveProducts} value="Save Product"
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