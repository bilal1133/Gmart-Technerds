import React, {Component} from 'react'
import axios from 'axios';
import Layout from '../../../layouts/layouts'
import Head from 'next/head'
import {Redirect} from 'react-router-dom';
import GoogleMapReact from "google-map-react";
import {RouteProps} from 'react-router';

declare var $: any;

interface AppProps {
    isModal: boolean
}

interface AppState {
    name: string,
    surname: string,
    phone: string,
    password: string,
    passwordConfirm: string,
    id: number,
    error: string,
    selectedFile: any,
    selectedFileName: string,
    active: number,
    redirectTo: boolean,
    addresses: any[],
    address: number,
    addressText: string,
    isAddAddress: boolean,
    lat: number,
    lng: number,
}

const AnyReactComponent = ({lat, lng, text}) => <div><i className="fa fa-home red-icon"></i></div>;

export default class UserClientAdd extends Component<AppProps & RouteProps, AppState> {

    constructor(props: AppProps) {
        super(props);

        this.state = {
            name: "",
            surname: "",
            phone: "",
            password: "",
            passwordConfirm: "",
            id: -1,
            error: "",
            selectedFile: {},
            selectedFileName: "Upload image",
            active: 1,
            redirectTo: false,
            addresses: [],
            address: -1,
            addressText: "",
            isAddAddress: false,
            lat: 59.95,
            lng: 30.33,
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.onChangeFileUpload = this.onChangeFileUpload.bind(this);
        this.onChangeActive = this.onChangeActive.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeAddressInput = this.onChangeAddressInput.bind(this);
        this.onClickAddAddress = this.onClickAddAddress.bind(this);
        this.onClickMap = this.onClickMap.bind(this);
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params.id > 0) {
            this.getAddressesByUserId(this.props.match.params.id);
            this.getUserInfoById(this.props.match.params.id);
        } else {
            this.setState({
                isAddAddress: true
            })
        }
    }


    onClickMap(position: any) {
        this.setState({
            lat: position.lat,
            lng: position.lng
        })
    }

    async getUserInfoById(id: number) {
        //get user by id
        const {data: data} = await axios.post('/api/users/client/info', {id});
        this.setState({
            name: data.data.name,
            surname: data.data.surname,
            phone: data.data.phone,
            id: data.data.id,
            selectedFileName: data.data.image_url
        });
    }

    async getAddressesByUserId(id: number) {
        //get user by id
        const {data: data} = await axios.post('/api/users/address/byUser', {id});

        let index = data.data.findIndex((item) => item.default == 1);

        this.setState({
            addresses: data.data,
            address: data.data[index].id
        });

        setTimeout(() => {
            $('.address-select').selectpicker({
                liveSearch: true
            });
        }, 1000);
    }

    //enter name
    onChangeName(e: any) {
        this.setState({
            name: e.target.value
        });
    }

    //on change address select
    onChangeAddress(e: any) {
        this.setState({
            address: e.target.value,
        });
        if (e.target.value > 0)
            this.setState({
                isAddAddress: false
            });
        else this.setState({
            isAddAddress: true
        });
    }

    //on change address input
    onChangeAddressInput(e: any) {
        this.setState({
            addressText: e.target.value
        });
    }

    onChangeFileUpload(e: any) {
        this.setState({
            selectedFile: e.target.files[0],
            selectedFileName: e.target.files[0].name
        });
    }

    //enter surname
    onChangeSurname(e: any) {
        this.setState({
            surname: e.target.value
        });
    }

    //enter phone
    onChangePhone(e: any) {
        this.setState({
            phone: e.target.value
        });
    }

    //enter passsword
    onChangePassword(e: any) {
        this.setState({
            password: e.target.value
        })
    }

    //enter password confirm
    onChangePasswordConfirm(e: any) {
        this.setState({
            passwordConfirm: e.target.value
        })
    }

    onChangeActive(active: number) {
        this.setState({
            active: active
        });
    }

    onClickAddAddress() {
        this.setState({
            isAddAddress: true,
            address: -1
        })

        setTimeout(() => {
            $('.address-select').selectpicker({
                liveSearch: true
            });
        }, 1000);
    }

    //save user data
    async saveUser() {
        if (this.state.password == this.state.passwordConfirm && this.state.name.length > 0 && this.state.surname.length > 0
            && this.state.password.length >= 8 && this.state.phone.length > 0) {
            const formData = new FormData();
            formData.append('id', this.state.id.toString());
            formData.append('name', this.state.name.toString());
            formData.append('surname', this.state.surname.toString());
            formData.append('phone', this.state.phone.toString());
            formData.append('password', this.state.password.toString());
            formData.append('active', this.state.active.toString());
            formData.append('image', this.state.selectedFile);
            formData.append('lat', this.state.lat.toString());
            formData.append('lng', this.state.lng.toString());
            formData.append('address', this.state.address.toString());
            formData.append('address_text', this.state.addressText.toString());
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            const {data: data} = await axios.post('/api/users/client/save', formData, config)

            if (data.data.success) {
                if (this.props.isModal)
                    $('#AddClientModal').modal('hide')
                else
                    this.setState({
                        redirectTo: true
                    })
            }
        } else {
            let error = "";

            if (this.state.name.length == 0)
                error += "User name is not entered.\n"

            if (this.state.surname.length == 0)
                error += "User surname is not entered.\n"

            if (this.state.phone.length == 0)
                error += "User phone is not entered.\n"

            if (this.state.password.length != this.state.passwordConfirm.length)
                error += "User password is not matched.\n"

            if (this.state.password.length < 8)
                error += "User password's length must be at least 8 characters.\n"

            this.setState({
                error: error
            });
        }
    }

    _renderContent() {
        return (
            <>
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
                    <div className="card shadow mb-4">
                        <div className="row card-header py-3">
                            <div className="col col-md-6 col-sm-6">
                                <h6 className="m-0 font-weight-bold text-primary">Add client</h6>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Name</label>
                                    <input className="form-control" value={this.state.name} onChange={this.onChangeName}
                                           placeholder="Name" required={true}/>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Surname</label>
                                    <input className="form-control" value={this.state.surname}
                                           onChange={this.onChangeSurname} placeholder="Surname" required={true}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Avatar</label>
                                    <div className="custom-file">
                                        <input type="file" onChange={this.onChangeFileUpload}
                                               className="custom-file-input" id="customFile"/>
                                        <label className="custom-file-label"
                                               htmlFor="customFile">{this.state.selectedFileName}</label>
                                    </div>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Phone</label>
                                    <input className="form-control" value={this.state.phone}
                                           onChange={this.onChangePhone}
                                           placeholder="Phone" required={true}/>
                                </div>
                            </div>
                            <hr/>
                            {
                                this.state.id > 0 && (
                                    <div className="form-group row">
                                        <div className="col col-md-12 col-sm-12">
                                            <label>Addresses</label>
                                            <div className="row">
                                                <div className="col col-md-6 col-sm-12">
                                                    <select placeholder="Addresses"
                                                            className="form-control address-select"
                                                            value={this.state.address}
                                                            onChange={this.onChangeAddress}>
                                                        {
                                                            this.state.addresses.length > 0 && this.state.addresses.map((item) => {
                                                                return (
                                                                    <option key={item.id}
                                                                            value={item.id}>{item.address}</option>
                                                                );
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <button className="btn btn-success ml-4"
                                                        onClick={this.onClickAddAddress}>Add
                                                    new client address
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                this.state.isAddAddress && (
                                    <>
                                        <div className="form-group row">
                                            <div className="col col-md-6 col-sm-12">
                                                <label>Address</label>
                                                <input className="form-control" onChange={this.onChangeAddressInput}
                                                       value={this.state.addressText} placeholder="Address"
                                                       required={true}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col col-md-12 col-sm-12" style={{height: '300px'}}>
                                                <label className="form-control-label">Select user address
                                                    location</label>
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
                                        </div>
                                    </>
                                )
                            }
                            <hr/>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Password</label>
                                    <input className="form-control" value={this.state.password}
                                           onChange={this.onChangePassword} placeholder="Password" required={true}/>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Password confirm</label>
                                    <input className="form-control" value={this.state.passwordConfirm}
                                           onChange={this.onChangePasswordConfirm} placeholder="Password confirm"
                                           required={true}/>
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
                                <input value="Save User" className="btn btn-success float-right" type="button"
                                       onClick={this.saveUser}/>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        );
    }

    render() {
        if (this.state.redirectTo)
            return (<Redirect to='/users/clients'/>);

        return this.props.isModal ? this._renderContent() : (
            <Layout>
                <Head>
                    <title>Gmarket - Add client</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Add client</h1>
                <p className="mb-4">Add client</p>
                {
                    this._renderContent()
                }
            </Layout>
        )
    }
}