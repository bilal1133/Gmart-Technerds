import React, { Component } from 'react';
import Layout from '../../layouts/layouts'
import Head from 'next/head';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import SmallLoader from "../../components/smallLoader";
import {RouteProps} from 'react-router';

declare var $: any;

interface AppProps {

}

interface AppState {
    active: number
    id: number,
    name: string,
    icon: string,
    class: string,
    redirectTo: boolean,
    loading: boolean
}

export default class PaymentStatusesAdd extends Component<AppProps & RouteProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            active: 1,
            id: -1,
            name: "",
            icon: "",
            class: "",
            redirectTo: false,
            loading: true
        }

        this.getOrderStatusInfoById = this.getOrderStatusInfoById.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeActive = this.onChangeActive.bind(this);
        this.onChangeIcon = this.onChangeIcon.bind(this);
        this.onChangeClass = this.onChangeClass.bind(this);
        this.savePaymentStatus = this.savePaymentStatus.bind(this);
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params.id > 0)
            this.getOrderStatusInfoById(this.props.match.params.id);
        else
            this.setState({
                loading: false
            })
    }

    async getOrderStatusInfoById(id: number) {
        //get brand by id
        const { data: data } = await axios.post('/api/payments/status/info', { id });
        this.setState({
            id: data.data.id,
            name: data.data.name,
            class: data.data.class,
            icon: data.data.class,
            active: data.data.active,
            loading: false
        });
    }

    onChangeClass(e: any) {
        this.setState({
            class: e.target.value
        });
    }

    onChangeIcon(e: any) {
        this.setState({
            icon: e.target.value
        });
    }

    onChangeName(e: any) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeActive(active: number) {
        this.setState({
            active: active
        });
    }

    async savePaymentStatus() {
        //save orders data
        const { data: data } = await axios.post('/api/payments/status/save', {
            name: this.state.name,
            class: this.state.class,
            icon: this.state.icon,
            active: this.state.active,
            id: this.state.id
        });

        if (data.data.success) {
            this.setState({
                redirectTo: true
            })
        }
    }

    render() {
        if (this.state.redirectTo)
            return (<Redirect to='/payments/status'/>);

        return (
            <Layout>
                <Head>
                    <title>Gmarket - Edit payment status</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Edit payment status</h1>
                <div className="card shadow mb-4">
                    <div className="row card-header py-3">
                        <div className="col col-md-6 col-sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">Edit payment status</h6>
                        </div>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <input className="form-control" value={this.state.name} onChange={this.onChangeName} placeholder="Payment status name" required={true} />
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <input className="form-control" value={this.state.icon} onChange={this.onChangeIcon} placeholder="Payment status icon" required={true} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <input className="form-control" value={this.state.class} onChange={this.onChangeClass} placeholder="Payment status class" required={true} />
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <div className="custom-control custom-checkbox small">
                                        <input checked={this.state.active == 1 ? true : false} onChange={() => this.onChangeActive(this.state.active == 1 ? 0 : 1)} id="active" type="checkbox" className="custom-control-input" />
                                        <label htmlFor="active" className="custom-control-label">Active</label>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="col col-md-12 col-sm-12">
                                <input value="Save Payment Status" onClick={this.savePaymentStatus} className="btn btn-success float-right" type="button" />
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