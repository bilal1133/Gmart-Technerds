import React, {Component, useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../../helpers/AuthProvider";
import axios from "axios";
import {Link} from 'react-router-dom';

const getUser = () => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined')
        return localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : null;
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Menu() {
    const {signin, isAuthenticated} = useContext(AuthContext);
    const [newOrders, setOrders] = useState([]);

    const [user, setUser] = useState(getUser);

    useEffect(() => {
        axios.post('/api/orders/order/orders').then(
                (result) => {
                    setOrders(result.data.data);
                },
                (error) => {
                }
            )
    }, [])

    let logout = () => {
        signin(false);
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined')
            localStorage.removeItem('user');
    }

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
            </button>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow d-sm-none">
                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-search fa-fw"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                         aria-labelledby="searchDropdown">
                        <form className="form-inline mr-auto w-100 navbar-search">
                            <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small"
                                       placeholder="Search for..." aria-label="Search"
                                       aria-describedby="basic-addon2"/>
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>

                <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-bell fa-fw"></i>
                        {
                            newOrders.length >= 10 && (
                                <span
                                    className="badge badge-danger badge-counter">10+</span>
                            )
                        }
                        {
                            newOrders.length < 10 && (
                                <span
                                    className="badge badge-danger badge-counter">{newOrders.length}</span>
                            )
                        }

                    </a>
                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                         aria-labelledby="alertsDropdown">
                        <h6 className="dropdown-header">
                            New orders
                        </h6>
                        {
                            newOrders.length > 0 && newOrders.map((item, key) => {
                                var date = new Date(item['created_at']);

                                if(key > 5)
                                    return ;

                                return <Link key={key} className="dropdown-item d-flex align-items-center" to={`/orders/edit/${item['id']}`}>
                                    <div className="mr-3">
                                        <div className="icon-circle bg-success">
                                            <i className="fas fa-shopping-cart text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="small text-gray-500">{months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</div>
                                        <b>Client</b>: {item['user']['surname']} {item['user']['name']} <br/>
                                        <b>Order amount</b>: {item['total_sum']} <br/>
                                        <b>Delivery date</b>: {item['delivery_date']} <br/>
                                    </div>
                                </Link>;
                            })
                        }
                        <Link className="dropdown-item text-center small text-gray-500" to="/orders">Show All Alerts</Link>
                    </div>
                </li>

                <div className="topbar-divider d-none d-sm-block"></div>

                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {
                            typeof user !== 'undefined' && user !== null && (<span
                                className="mr-2 d-none d-lg-inline text-gray-600 small">{user.surname} {user.name}</span>)
                        }
                        <img className="img-profile rounded-circle" src="/images/man.png"/>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                         aria-labelledby="userDropdown">
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </a>
                    </div>
                </li>

            </ul>

            <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Select "Logout" below if you are ready to end your current
                            session.
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button className="btn btn-primary" onClick={() => logout()} type="button"
                                    data-dismiss="modal">Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </nav>
    );
}