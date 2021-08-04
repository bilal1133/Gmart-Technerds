import React, {Component} from 'react';
import Layout from '../../layouts/layouts'
import Head from 'next/head';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {RouteProps} from 'react-router';

declare var $: any;

const AnyReactComponent = ({lat, lng, text}) => <div><i className="fa fa-home red-icon"></i></div>;

interface AppProps {
    isModal: boolean,
    idUser: number
}

interface AppState {
    lat: number,
    lng: number,
    id: number,
    address: string,
    userId: number,
    users: any[],
    redirectTo: boolean
}

export default class UsersAddressesAdd extends Component<AppProps & RouteProps, AppState> {
    static defaultProps = {};

    constructor(props: AppProps) {
        super(props);

        this.state = {
            lat: 59.95,
            lng: 30.33,
            id: -1,
            address: "",
            userId: props.idUser > 0 ? props.idUser : -1,
            users: [],
            redirectTo: false
        }

        this.onClickMap = this.onClickMap.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.saveUserAddress = this.saveUserAddress.bind(this);
    }

    componentDidMount() {
        this.getUsers();
        if (this.props.match && this.props.match.params.id > 0)
            this.getUserAddressInfoById(this.props.match.params.id);
    }

    onClickMap(position: any) {
        this.setState({
            lat: position.lat,
            lng: position.lng
        })
    }

    async getUserAddressInfoById(id: number) {
        //get user address by id
        const {data: data} = await axios.post('/api/users/address/info', {id});
        this.setState({
            address: data.data.address,
            userId: data.data.user.id,
            lat: data.data.latitude,
            lng: data.data.longtitude,
            id: data.data.id
        });
    }

    async getUsers() {
        //get user address by id
        const {data: data} = await axios.post('/api/users/client/active');
        this.setState({
            users: data.data,
            userId: this.props.idUser > 0 ? this.props.idUser : (data.data.lenght > 0 ? data.data[0].id : -1)
        });

        setTimeout(() => {
            $('.shop-select').selectpicker({
                liveSearch: true
            });
        }, 1000);
    }

    async saveUserAddress() {
        //save user address data
        const {data: data} = await axios.post('/api/users/address/save', {
            lat: this.state.lat,
            lng: this.state.lng,
            id: this.state.id,
            user_id: this.state.userId,
            address: this.state.address
        });

        if (data.data.success) {
            if (this.props.isModal)
                $('#addAddressModal').modal('hide')
            else
                this.setState({
                    redirectTo: true
                })
        }
    }

    onChangeAddress(e: any) {
        this.setState({
            address: e.target.value
        });
    }

    onChangeUser(e: any) {
        this.setState({
            userId: e.target.value
        });
    }

    _renderContent() {
        return (
            <div className="card shadow mb-4">
                <div className="row card-header py-3">
                    <div className="col col-md-6 col-sm-6">
                        <h6 className="m-0 font-weight-bold text-primary">Add user address</h6>
                    </div>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group row">
                            <div className="col col-md-6 col-sm-12">
                                <label>Address</label>
                                <input className="form-control" onChange={this.onChangeAddress}
                                       value={this.state.address} placeholder="Address" required={true}/>
                            </div>
                            <div className="col col-md-6 col-sm-12">
                                <label>Client</label>
                                <select placeholder="User shop" className="form-control shop-select"
                                        value={this.state.userId}
                                        onChange={this.onChangeUser}>
                                    {
                                        this.state.users.length > 0 && this.state.users.map((item) => {
                                            return (
                                                <option key={item.id}
                                                        value={item.id}>{item.name + " " + item.surname}</option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="col col-md-12 col-sm-12" style={{height: '300px'}}>
                            <label className="form-control-label">Select user address location</label>
                            <GoogleMapReact
                                bootstrapURLKeys={{key: "AIzaSyAIZAHqq0Gpw0yNcq6LgsQd9EAGpee5sMg"}}
                                defaultCenter={{
                                    lat: 59.95,
                                    lng: 30.33
                                }}
                                defaultZoom={11}
                                onClick={this.onClickMap}>
                                <AnyReactComponent
                                    lat={this.state.lat}
                                    lng={this.state.lng}
                                    text="New location"
                                />
                            </GoogleMapReact>
                        </div>
                        <hr/>
                        <div className="col col-md-12 col-sm-12">
                            <input onClick={this.saveUserAddress} value="Save Address"
                                   className="btn btn-success float-right" type="button"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    render() {
        if (this.state.redirectTo)
            return (<Redirect to='/users/addresses'/>);

        return this.props.isModal ? this._renderContent() : (
            <Layout>
                <Head>
                    <title>Gmarket - Add user address</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Add user address</h1>
                {
                    this._renderContent()
                }
            </Layout>
        )
    }
}