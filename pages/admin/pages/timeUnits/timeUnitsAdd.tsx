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
    active: number
    id: number,
    name: string,
    redirectTo: boolean,
    sort: number,
    shops: any[],
    shop: number,
}

export default class TimeUnitsAdd extends Component<AppProps & RouteProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            active: 1,
            id: -1,
            name: "",
            redirectTo: false,
            sort: 1,
            shops: [],
            shop: -1,
        }

        this.getTimeUnitInfoById = this.getTimeUnitInfoById.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeActive = this.onChangeActive.bind(this);
        this.saveTimeUnit = this.saveTimeUnit.bind(this);
        this.onChangeSort = this.onChangeSort.bind(this);
        this.onChangeShop = this.onChangeShop.bind(this);
        this.getShops = this.getShops.bind(this);
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params.id > 0)
            this.getTimeUnitInfoById(this.props.match.params.id);

        this.getShops();

        setTimeout(() => {
            $('.shops-select').selectpicker({
                liveSearch: true
            });
        }, 1000);
    }

    async getTimeUnitInfoById(id: number) {
        //get brand by id
        const {data: data} = await axios.post('/api/timeUnits/info', {id});
        this.setState({
            id: data.data.id,
            name: data.data.name,
            active: data.data.active,
            sort: data.data.sort,
            shop: data.data.shop.id
        });
    }

    async getShops() {
        //get all active shops list
        const {data: data} = await axios.post('/api/shops/active')
        if (data.data.length > 0)
            this.setState({
                shops: data.data,
                shop: this.state.shop == -1 ? data.data[0].id : this.state.shop
            })

        $('.shops-select').selectpicker('refresh');
    }

    onChangeName(e: any) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeSort(e: any) {
        this.setState({
            sort: e.target.value
        });
    }

    onChangeActive(active: number) {
        this.setState({
            active: active
        });
    }

    onChangeShop(e: any) {
        this.setState({
            shop: e.target.value
        })
    }

    async saveTimeUnit() {
        //save orders data
        const {data: data} = await axios.post('/api/timeUnits/save', {
            name: this.state.name,
            active: this.state.active,
            id: this.state.id,
            sort: this.state.sort,
            shop: this.state.shop
        });

        if (data.data.success) {
            this.setState({
                redirectTo: true
            })
        }
    }

    render() {
        if (this.state.redirectTo)
            return (<Redirect to='/timeUnits'/>);

        return (
            <Layout>
                <Head>
                    <title>Gmarket - Edit time units</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Edit time units</h1>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">Edit time units</h6>
                        </div>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Time Unit</label>
                                    <input className="form-control" value={this.state.name} onChange={this.onChangeName}
                                           placeholder="Ex: 08:00-10:00" required={true}/>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Sort</label>
                                    <input className="form-control" type="number" value={this.state.sort}
                                           onChange={this.onChangeSort}
                                           placeholder="Ex: 1" required={true}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Shop</label>
                                    <select className="form-control shops-select" value={this.state.shop}
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
                                <input value="Save Time Unit" onClick={this.saveTimeUnit}
                                       className="btn btn-success float-right" type="button"/>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        );
    }
}