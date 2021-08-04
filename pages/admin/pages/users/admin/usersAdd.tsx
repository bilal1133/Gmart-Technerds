import React, {Component} from 'react'
import axios from 'axios';
import Layout from '../../../layouts/layouts'
import Head from 'next/head'
import {Redirect} from 'react-router-dom';
import {RouteProps} from 'react-router';

declare var $: any;

interface AppProps {

}

interface AppState {
    roles: any[],
    name: string,
    surname: string,
    middleName: string,
    email: string,
    role: number,
    phone: string,
    password: string,
    passwordConfirm: string,
    shops: any[],
    shop: number,
    id: number,
    error: string,
    selectedFile: any,
    selectedFileName: string,
    address: string,
    active: number,
    redirectTo: boolean
}

export default class UserAdminAdd extends Component<AppProps & RouteProps, AppState> {

    constructor(props: AppProps) {
        super(props);

        this.state = {
            roles: [],
            name: "",
            surname: "",
            middleName: "",
            email: "",
            role: 2,
            phone: "",
            password: "",
            passwordConfirm: "",
            shops: [],
            shop: -1,
            id: -1,
            error: "",
            selectedFile: {},
            selectedFileName: "Upload image",
            address: "",
            active: 1,
            redirectTo: false
        }

        this.enterEmail = this.enterEmail.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.changeRole = this.changeRole.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.getActiveRoles = this.getActiveRoles.bind(this);
        this.getActiveShops = this.getActiveShops.bind(this);
        this.changeShops = this.changeShops.bind(this);
        this.onChangeFileUpload = this.onChangeFileUpload.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeActive = this.onChangeActive.bind(this);
    }

    componentDidMount() {
        this.getActiveRoles();
        this.getActiveShops();

        if (this.props.match && this.props.match.params.id > 0)
            this.getUserInfoById(this.props.match.params.id);
    }

    async getActiveShops() {
        //get shops
        const {data: data} = await axios.post('/api/shops/active');
        console.log(data.data[0].id);
        this.setState({
            shops: data.data,
            shop: data.data[0].id
        });
        setTimeout(() => {
            $('.shop-select').selectpicker({
                liveSearch: true
            });
        }, 1000);
    }

    async getUserInfoById(id: number) {
        //get user by id
        const {data: data} = await axios.post('/api/users/admin/info', {id});
        this.setState({
            role: data.data.role.id,
            name: data.data.name,
            surname: data.data.surname,
            middleName: data.data.middle_name,
            address: data.data.address,
            email: data.data.email,
            phone: data.data.phone,
            shop: data.data.shop != null ? data.data.shop.id : -1,
            id: data.data.id,
            selectedFileName: data.data.image_url
        });
    }

    async getActiveRoles() {
        //get all active roles list
        const {data: data} = await axios.post('/api/roles/active')
        this.setState({
            roles: data.data,
            role: data.data[0].id
        });
        setTimeout(() => {
            $('.role-select').selectpicker();
        }, 1000);
    }

    //enter name
    onChangeName(e: any) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeAddress(e: any) {
        this.setState({
            address: e.target.value
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

    //enter email
    enterEmail(e: any) {
        this.setState({
            email: e.target.value
        });
    }

    //enter phone
    onChangePhone(e: any) {
        this.setState({
            phone: e.target.value
        });
    }

    //change role
    changeRole(e: any) {
        this.setState({
            role: e.target.value
        });
    }

    //change shops
    changeShops(e: any) {
        this.setState({
            shop: e.target.value
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

    //save user data
    async saveUser() {
        if (this.state.password == this.state.passwordConfirm && this.state.name.length > 0 && this.state.surname.length > 0
            && this.state.password.length >= 8 && this.state.phone.length > 0 && this.state.email.length > 0) {
            const formData = new FormData();
            formData.append('id', this.state.id.toString());
            formData.append('name', this.state.name.toString());
            formData.append('surname', this.state.surname.toString());
            formData.append('address', this.state.address.toString());
            formData.append('email', this.state.email.toString());
            formData.append('phone', this.state.phone.toString());
            formData.append('role', this.state.role.toString());
            formData.append('shop', this.state.shop.toString());
            formData.append('password', this.state.password.toString());
            formData.append('active', this.state.active.toString());
            formData.append('image', this.state.selectedFile);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            const {data: data} = await axios.post('/api/users/admin/save', formData, config)

            if (data.data.success) {
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

            if (this.state.email.length == 0)
                error += "User email is not entered.\n"

            if (this.state.password.length != this.state.passwordConfirm.length)
                error += "User password is not matched.\n"

            if (this.state.password.length < 8)
                error += "User password's length must be at least 8 characters.\n"

            this.setState({
                error: error
            });
        }
    }

    render() {
        if (this.state.redirectTo)
            return (<Redirect to='/users/admins'/>);

        return (
            <Layout>
                <Head>
                    <title>Gmarket - Add admin</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Add admin</h1>
                <p className="mb-4">Add user</p>
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
                                <h6 className="m-0 font-weight-bold text-primary">Add admin</h6>
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
                                    <label>Address</label>
                                    <input className="form-control" value={this.state.address}
                                           onChange={this.onChangeAddress} placeholder="Address" required={true}/>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Avatar</label>
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
                                    <label>Email</label>
                                    <input className="form-control" value={this.state.email} onChange={this.enterEmail}
                                           placeholder="Email" required={true}/>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Phone</label>
                                    <input className="form-control" value={this.state.phone}
                                           onChange={this.onChangePhone}
                                           placeholder="Phone" required={true}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col col-md-6 col-sm-12">
                                    <label>Role</label>
                                    <select className="form-control role-select" value={this.state.role}
                                            onChange={this.changeRole}>
                                        {
                                            this.state.roles.length > 0 && this.state.roles.map((item) => {
                                                if (item.id == 1)
                                                    return false;
                                                else
                                                    return (
                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                    );
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col col-md-6 col-sm-12">
                                    <label>Shop</label>
                                    <select placeholder="User shop" className="form-control shop-select"
                                            value={this.state.shop}
                                            onChange={this.changeShops}>
                                        {
                                            this.state.shops.length > 0 && this.state.shops.map((item) => {
                                                return (
                                                    <option key={item.id} value={item.id}>{item.lang[0].name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
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
            </Layout>
        )
    }
}