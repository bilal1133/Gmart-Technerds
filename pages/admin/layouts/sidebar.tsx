import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {roleGuard} from '../../../utils/roleGuard';

interface AppProps {

}

interface AppState {

}

export default class Sidebar extends Component<AppProps, AppState> {
    render() {
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <a className="sidebar-brand d-flex align-items-center justify-content-center">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">Gmarket Admin</div>
                </a>
                {
                    roleGuard('dashboard') && (
                        <>
                            <li className="nav-item">
                                <Link to='/'>
                                    <a className="nav-link">
                                        <i className="fas fa-fw fa-tachometer-alt"></i>
                                        <span>Dashboard</span></a>
                                </Link>
                            </li>
                        </>
                    )
                }
                <div className="sidebar-divider"></div>
                <div className="sidebar-heading">
                    Main
                </div>
                {
                    roleGuard('shops') && (
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse"
                               data-target="#collapsePages13" aria-expanded="true" aria-controls="collapsePages">
                                <i className="fas fa-fw fa-shopping-cart"></i>
                                <span>Shops</span>
                            </a>
                            <div id="collapsePages13" className="collapse" aria-labelledby="headingPages"
                                 data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    {
                                        roleGuard('shops.shops') && (
                                            <Link to="/shops"><a className="collapse-item">Shops</a></Link>
                                        )
                                    }
                                </div>
                            </div>
                        </li>
                    )
                }
                {
                    roleGuard('brands') && (
                        <li className="nav-item">
                            <Link to="/brands"><a className="nav-link">
                                <i className="fas fa-fw fa-copyright"></i>
                                <span>Brands</span></a></Link>
                        </li>
                    )
                }

                {
                    roleGuard('categories') && (
                        <li className="nav-item">
                            <Link to="/categories"><a className="nav-link">
                                <i className="fas fa-fw fa-clipboard-list"></i>
                                <span>Categories</span></a></Link>
                        </li>
                    )
                }

                {
                    roleGuard('products') && (
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse"
                               data-target="#collapsePages126" aria-expanded="true" aria-controls="collapsePages">
                                <i className="fas fa-fw fa-apple-alt"></i>
                                <span>Products</span>
                            </a>
                            <div id="collapsePages126" className="collapse" aria-labelledby="headingPages"
                                 data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">

                                    {
                                        roleGuard('orders.orders') && (
                                            <Link to="/products"><a className="collapse-item">Products</a></Link>
                                        )
                                    }
                                    {
                                        roleGuard('extraGroup') && (
                                            <Link to="/products/extraGroups"><a className="collapse-item">Product extra groups</a></Link>)
                                    }
                                    {
                                        roleGuard('extras') && (
                                            <Link to="/products/extras"><a className="collapse-item">Product Extras</a></Link>
                                        )
                                    }
                                    {
                                        roleGuard('comments.product') && (
                                            <Link to="/comments/product"><a className="collapse-item">Product
                                                Comments</a></Link>)
                                    }
                                </div>
                            </div>
                        </li>
                    )
                }
                {
                    roleGuard('coupon') && (
                        <li className="nav-item">
                            <Link to="/coupon"><a className="nav-link">
                                <i className="fas fa-fw fa-ticket-alt"></i>
                                <span>Coupons</span></a></Link>
                        </li>
                    )
                }
                {
                    roleGuard('orders') && (
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse"
                               data-target="#collapsePages12" aria-expanded="true" aria-controls="collapsePages">
                                <i className="fas fa-fw fa-shopping-cart"></i>
                                <span>Orders</span>
                            </a>
                            <div id="collapsePages12" className="collapse" aria-labelledby="headingPages"
                                 data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">

                                    {
                                        roleGuard('orders.orders') && (
                                            <Link to="/orders"><a className="collapse-item">Orders</a></Link>
                                        )
                                    }
                                    {
                                        roleGuard('orders.status') && (
                                            <Link to="/orders/status"><a className="collapse-item">Order
                                                Status</a></Link>
                                        )
                                    }
                                    {
                                        roleGuard('comments.order') && (
                                            <Link to="/comments/order"><a className="collapse-item">Order
                                                Comments</a></Link>)
                                    }
                                </div>
                            </div>
                        </li>
                    )
                }


                {
                    roleGuard('payment') && (
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse"
                               data-target="#collapsePages11" aria-expanded="true" aria-controls="collapsePages">
                                <i className="fas fa-fw fa-money-bill-alt"></i>
                                <span>Payment</span>
                            </a>
                            <div id="collapsePages11" className="collapse" aria-labelledby="headingPages"
                                 data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    {
                                        roleGuard('payment.status') && (
                                            <Link to="/payments/status"><a className="collapse-item">Payment
                                                Status</a></Link>)
                                    }
                                    {
                                        roleGuard('payment.method') && (
                                            <Link to="/payments/method"><a className="collapse-item">Payment
                                                Method</a></Link>)
                                    }
                                </div>
                            </div>
                        </li>
                    )
                }
                {
                    roleGuard('banners') && (
                        <li className="nav-item">
                            <Link to="/banners"><a className="nav-link">
                                <i className="fas fa-fw fa-address-card"></i>
                                <span>Banners</span></a></Link>
                        </li>)
                }
                {
                    roleGuard('delivery_boy') && (
                        <li className="nav-item">
                            <Link to="/deliveryboy"><a className="nav-link">
                                <i className="fas fa-fw fa-truck-monster"></i>
                                <span>Delivery boy</span></a></Link>
                        </li>)
                }
                <div className="sidebar-divider"></div>
                <div className="sidebar-heading">
                    Settings
                </div>
                {
                    roleGuard('users') && (
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse"
                               data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                                <i className="fas fa-fw fa-users"></i>
                                <span>Users</span>
                            </a>

                            <div id="collapsePages" className="collapse" aria-labelledby="headingPages"
                                 data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    {
                                        roleGuard('users.role') && (
                                            <Link to="/users/roles"><a className="collapse-item">Roles</a></Link>)
                                    }
                                    {
                                        roleGuard('users.user') && (
                                            <Link to="/users/admins"><a className="collapse-item">Admin
                                                Users</a></Link>)
                                    }
                                    {
                                        roleGuard('users.user') && (
                                            <Link to="/users/clients"><a className="collapse-item">Client
                                                Users</a></Link>)
                                    }
                                    {
                                        roleGuard('users.address') && (
                                            <Link to="/users/addresses"><a className="collapse-item">Users
                                                Addresses</a></Link>)
                                    }
                                    {
                                        roleGuard('users.permission') && (
                                            <Link to="/users/permissions"><a className="collapse-item">Permissions</a></Link>)
                                    }
                                </div>
                            </div>
                        </li>
                    )
                }
                {
                    roleGuard('languages') && (
                        <li className="nav-item">
                            <Link to="/languages"><a className="nav-link">
                                <i className="fas fa-fw fa-language"></i>
                                <span>Languages</span></a></Link>
                        </li>)
                }
                {
                    roleGuard('settings') && (
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse"
                               data-target="#collapsePages1112" aria-expanded="true" aria-controls="collapsePages">
                                <i className="fas fa-fw fa-frog"></i>
                                <span>Settings</span>
                            </a>
                            <div id="collapsePages1112" className="collapse" aria-labelledby="headingPages"
                                 data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    {
                                        roleGuard('units') && (
                                            <Link to="/units"><a className="collapse-item">Units</a></Link>)
                                    }
                                    {
                                        roleGuard('timeUnits') && (
                                            <Link to="/timeUnits"><a className="collapse-item">Time Units</a></Link>)
                                    }
                                    {
                                        roleGuard('settings.detail') && (
                                            <Link to="/settings"><a className="collapse-item">Settings</a></Link>)
                                    }
                                </div>
                            </div>
                        </li>
                    )
                }
                {
                    roleGuard('mobile') && (
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse"
                               data-target="#collapsePages111" aria-expanded="true" aria-controls="collapsePages">
                                <i className="fas fa-fw fa-server"></i>
                                <span>App Settings</span>
                            </a>
                            <div id="collapsePages111" className="collapse" aria-labelledby="headingPages"
                                 data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    {
                                        roleGuard('mobile.params') && (
                                            <Link to="/mobile/language"><a className="collapse-item">App
                                                Language</a></Link>)
                                    }
                                </div>
                            </div>
                        </li>
                    )
                }
                <div className="sidebar-heading"></div>
                <div className="sidebar-divider d-none d-md-block"></div>
                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
            </ul>
        )
    }
}