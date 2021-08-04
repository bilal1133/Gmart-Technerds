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
    description: string,
    descriptions: any[],
    names: any,
    name: string,
    button_texts: any,
    button_text: string,
    id: number,
    active_lang: any,
    langs: any[],
    shops: any[],
    error: string,
    active: number,
    shop: number,
    title_color: string,
    button_color: string,
    indicator_color: string,
    background_color: string,
    position: string,
    redirectTo: boolean,
    productsData: any[],
    products: any[]
}

export default class BannersAdd extends Component<AppProps & RouteProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            selectedFileName: "Choose file",
            selectedFile: {},
            description: "",
            descriptions: [],
            names: [],
            name: "",
            button_texts: [],
            button_text: "",
            id: -1,
            error: "",
            active_lang: -1,
            langs: [],
            shops: [],
            active: 1,
            shop: -1,
            title_color: "#ffffff",
            button_color: "#ffffff",
            indicator_color: "#ffffff",
            background_color: "#ffffff",
            position: "left",
            redirectTo: false,
            productsData: [],
            products: []
        }

        this.onChangeFileUpload = this.onChangeFileUpload.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeButtonText = this.onChangeButtonText.bind(this);
        this.saveBanners = this.saveBanners.bind(this);
        this.getBannerInfoById = this.getBannerInfoById.bind(this);
        this.onChangeActive = this.onChangeActive.bind(this);
        this.onChangeShop = this.onChangeShop.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeTitleColor = this.onChangeTitleColor.bind(this);
        this.onChangeIndicatorColor = this.onChangeIndicatorColor.bind(this);
        this.onChangeButtonColor = this.onChangeButtonColor.bind(this);
        this.onChangeBackgroundColor = this.onChangeBackgroundColor.bind(this);
        this.onChangePosition = this.onChangePosition.bind(this);
        this.onChangeProducts = this.onChangeProducts.bind(this);
    }

    componentDidMount() {
        var self = this;
        this.getLangs();
        this.getActiveShops();
        if (this.props.match && this.props.match.params.id > 0)
            this.getBannerInfoById(this.props.match.params.id);

        setTimeout(() => {
            $('.shop-select').selectpicker({
                liveSearch: true
            });

            $('.product-select').selectpicker({
                liveSearch: true
            });

            $('.position-select').selectpicker();

            $(document).on('click', '.close', function () {
                let id = $(this).attr('id');
                let products = self.state.products;
                let index = products.findIndex((item) => item.id == id);
                if (index > -1)
                    products.splice(index, 1);

                self.setState({
                    products: products
                });
            });
        }, 1000);
    }

    async getActiveShops() {
        //get all active languages list
        const {data: data} = await axios.post('/api/shops/active')
        if (data.data.length > 0) {
            this.setState({
                shops: data.data,
                shop: this.state.shop == -1 ? data.data[0].id : this.state.shop
            })

            this.getActiveProducts(data.data[0].id);
        }
        setTimeout(() => {
            $('.shop-select').selectpicker('refresh');
        }, 1000);
    }

    async getActiveProducts(id) {
        //get all active languages list
        const {data: data} = await axios.post('/api/products/active', {id_shop: id})
        if (data.data.length > 0) {
            this.setState({
                productsData: data.data
            })
        }

        setTimeout(() => {
            $('.product-select').selectpicker('refresh');
        }, 1000);
    }

    async getBannerInfoById(id: number) {
        //get brand by id
        const {data: data} = await axios.post('/api/banners/info', {id});

        const langs = data.data.lang;
        const products = data.data.products;
        var names = [];
        var descriptions = [];
        var button_texts = [];
        if (langs.length > 0) {
            for (let i in langs) {
                let id_lang = langs[i].id_lang.id;
                if (names.length == 0) {
                    this.setState({
                        name: langs[i].title,
                        description: langs[i].description,
                        button_text: langs[i].button_text,
                        active_lang: langs[i].id_lang
                    });
                }

                names.push({
                    id_lang: id_lang,
                    value: langs[i].title
                });
                descriptions.push({
                    id_lang: id_lang,
                    value: langs[i].description
                });
                button_texts.push({
                    id_lang: id_lang,
                    value: langs[i].button_text
                });
            }
        }

        var products_array = [];
        if (products.length > 0) {
            for (let i in products) {
                if (!products[i]['id_product']) continue;
                products_array.push({
                    id: products[i]['id_product']['id'],
                    name: products[i]['id_product']['lang'][0]['name']
                });
            }
        }

        this.setState({
            products: products_array,
            selectedFileName: data.data.image_url,
            title_color: data.data.title_color,
            button_color: data.data.button_color,
            indicator_color: data.data.indicator_color,
            background_color: data.data.background_color,
            position: data.data.position,
            shop: data.data.id_shop,
            names: names,
            descriptions: descriptions,
            button_texts: button_texts,
            id: data.data.id
        });

        this.getActiveProducts(data.data.id_shop);

        setTimeout(() => {
            $('.shop-select').selectpicker('refresh');
            $('.product-select').selectpicker('refresh');
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

    async saveBanners() {
        if (((this.state.selectedFile.name && this.state.selectedFile.name.length > 0) || this.state.selectedFileName.length > 0) && this.state.names.length > 0 && this.state.descriptions.length > 0 && this.state.button_texts.length > 0) {
            const formData = new FormData();
            for (let i = 0; i < this.state.descriptions.length; i++) {
                if (!this.state.descriptions[i]) continue;

                formData.append('description[' + this.state.descriptions[i].id_lang + ']', this.state.descriptions[i].value);
                formData.append('name[' + this.state.names[i].id_lang + ']', this.state.names[i].value);
                formData.append('button_text[' + this.state.button_texts[i].id_lang + ']', this.state.button_texts[i].value);
            }
            for (let i = 0; i < this.state.products.length; i++) {
                if (!this.state.products[i]) continue;

                formData.append('products[' + i + ']', this.state.products[i].id);
            }
            formData.append('banner_image', this.state.selectedFile);
            formData.append('id_shop', this.state.shop.toString());
            formData.append('active', this.state.active.toString());
            formData.append('id', this.state.id.toString());
            formData.append('title_color', this.state.title_color.toString());
            formData.append('indicator_color', this.state.indicator_color.toString());
            formData.append('background_color', this.state.background_color.toString());
            formData.append('button_color', this.state.button_color.toString());
            formData.append('position', this.state.position);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            //save brands data
            const {data: data} = await axios.post('/api/banners/save', formData, config);

            if (data.data.success) {
                this.setState({
                    id: data.data.id,
                    redirectTo: true
                })
            }
        } else {
            let error = "";
            if (!(this.state.selectedFile.name && this.state.selectedFile.name.length > 0))
                error += 'Banners image is not selected.\n'

            if (this.state.names.length == 0)
                error += "Banners name is not entered.\n"

            if (this.state.descriptions.length == 0)
                error += "Banners description is not entered.\n"

            if (this.state.button_texts.length == 0)
                error += "Banners button name is not entered.\n"

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

    onChangeDescription(e) {
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

    onChangeButtonText(e: any) {
        let button_title_array = this.state.names;
        let index = button_title_array.findIndex((item) => item.id_lang == this.state.active_lang.id);
        if (index == -1)
            button_title_array.push({
                id_lang: this.state.active_lang.id,
                value: e.target.value
            });
        else
            button_title_array[index].value = e.target.value;
        this.setState({
            button_texts: button_title_array,
            button_text: e.target.value
        })
    }

    onChangeActive(active: number) {
        this.setState({
            active: active
        });
    }

    onChangeTitleColor(e: any) {
        this.setState({
            title_color: e.target.value
        })
    }

    onChangeIndicatorColor(e: any) {
        this.setState({
            indicator_color: e.target.value
        })
    }

    onChangeButtonColor(e: any) {
        this.setState({
            button_color: e.target.value
        })
    }

    onChangeBackgroundColor(e: any) {
        this.setState({
            background_color: e.target.value
        })
    }

    onChangeActiveLang(lang: any) {
        let name = "";
        let description = "";

        if (typeof this.state.names[lang.id] != 'undefined')
            name = this.state.names[lang.id];
        if (typeof this.state.descriptions[lang.id] != 'undefined')
            description = this.state.descriptions[lang.id];

        this.setState({
            active_lang: lang,
            name: name,
            description: description
        });
    }

    onChangeShop(e: any) {
        this.setState({
            shop: e.target.value,
            products: [],
            productsData: []
        })

        this.getActiveProducts(e.target.value);
    }


    onChangePosition(e: any) {
        this.setState({
            position: e.target.value
        })
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

    render() {
        if (this.state.redirectTo)
            return (<Redirect to='/banners'/>);

        return (
            <Layout>
                <Head>
                    <title>Gmarket - Add banner</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Add banner</h1>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">Add banner</h6>
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
                                    <label>Banner title</label>
                                    <input className="form-control" onChange={this.onChangeName} value={this.state.name}
                                           placeholder="Banner title" required={true}/>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Banner description</label>
                                    <textarea className="form-control" placeholder="Description"
                                              onChange={this.onChangeDescription}
                                              value={this.state.description}></textarea>
                                </div>

                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Button text</label>
                                    <input className="form-control" onChange={this.onChangeButtonText}
                                           value={this.state.button_text}
                                           placeholder="Button text" required={true}/>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Banner content position</label>
                                    <select className="form-control position-select bg-white"
                                            value={this.state.position}
                                            onChange={this.onChangePosition}>
                                        <option value="left">Left</option>
                                        <option value="right">Right</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Banner image</label>
                                    <div className="custom-file">
                                        <input type="file" onChange={this.onChangeFileUpload}
                                               className="custom-file-input" id="customFile"/>
                                        <label className="custom-file-label"
                                               htmlFor="customFile">{this.state.selectedFileName}</label>
                                    </div>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Shop</label>
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
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Title color</label>
                                    <input className="form-control" type="color" value={this.state.title_color}
                                           onChange={this.onChangeTitleColor}
                                           placeholder="Title color" required={true}/>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Button color</label>
                                    <input className="form-control" type="color" value={this.state.button_color}
                                           onChange={this.onChangeButtonColor}
                                           placeholder="Button color" required={true}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Indicator color</label>
                                    <input className="form-control" type="color" value={this.state.indicator_color}
                                           onChange={this.onChangeIndicatorColor}
                                           placeholder="Indicator color" required={true}/>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Background color</label>
                                    <input className="form-control" type="color" value={this.state.background_color}
                                           onChange={this.onChangeBackgroundColor}
                                           placeholder="Background color" required={true}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Products</label>
                                    <select className="form-control product-select"
                                            onChange={this.onChangeProducts}>
                                        {
                                            this.state.productsData.length > 0 && this.state.productsData.map((item) => {
                                                return (
                                                    <option key={item.id}
                                                            value={item.id}>{item.lang[0].name}</option>
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
                            <hr/>
                            <div className="col col-md-12 col-sm-12">
                                <input value="Save Banner" onClick={this.saveBanners}
                                       className="btn btn-success float-right" type="button"/>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        )
    }
}