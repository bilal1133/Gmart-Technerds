import React, {Suspense} from 'react';
import {Route, Switch, BrowserRouter as Router, withRouter} from 'react-router-dom';
import Login from "./admin/pages/auth/login";
import {AuthProvider} from "../helpers/AuthProvider";
import {PrivateRouteProvider} from "../helpers/RouteProvider";
import Dashboard from "./admin/pages/dashboard/dashboard";
import Shops from "./admin/pages/shops/shops";
import ShopsAdd from "./admin/pages/shops/shopsAdd";
import Languages from "./admin/pages/languages/languages";
import LanguagesAdd from "./admin/pages/languages/languagesAdd";
import Banners from "./admin/pages/banners/banners";
import BannersAdd from "./admin/pages/banners/bannersAdd";
import MobileLanguage from "./admin/pages/mobileParams/language";
import MobileLanguageDetail from "./admin/pages/mobileParams/detail";
import Brands from "./admin/pages/brands/brands";
import BrandsAdd from "./admin/pages/brands/brandsAdd";
import Categories from "./admin/pages/categories/categories";
import CategoriesAdd from "./admin/pages/categories/categoriesAdd";
import Units from "./admin/pages/units/units";
import UnitsAdd from "./admin/pages/units/unitsAdd";
import Products from "./admin/pages/products/products";
import ProductsAdd from "./admin/pages/products/productsAdd";
import ExtraGroups from "./admin/pages/extraGroups/extraGroups";
import ExtraGroupsAdd from "./admin/pages/extraGroups/extraGroupsAdd";
import Extras from "./admin/pages/extras/extras";
import ExtrasAdd from "./admin/pages/extras/extrasAdd";
import Roles from "./admin/pages/users/roles";
import Permissions from "./admin/pages/users/permissions";
import UsersClient from "./admin/pages/users/client/users";
import UserAdminAdd from "./admin/pages/users/admin/usersAdd";
import UsersAdmin from "./admin/pages/users/admin/users";
import UsersAddresses from "./admin/pages/usersAddress/usersAddresses";
import ProductComments from "./admin/pages/comments/productComments";
import OrderComments from "./admin/pages/comments/orderComments";
import PaymentMethods from "./admin/pages/payments/method";
import PaymentStatuses from "./admin/pages/payments/status";
import PaymentMethodsAdd from "./admin/pages/payments/methodAdd";
import PaymentStatusesAdd from "./admin/pages/payments/statusAdd";
import OrdersStatuses from "./admin/pages/orders/ordersStatus";
import OrdersStatusAdd from "./admin/pages/orders/ordersStatusAdd";
import Orders from "./admin/pages/orders/orders";
import OrdersAdd from "./admin/pages/orders/ordersAdd";
import UserClientAdd from "./admin/pages/users/client/usersAdd";
import UsersAddressesAdd from "./admin/pages/usersAddress/usersAddressesAdd";
import TimeUnits from "./admin/pages/timeUnits/timeUnits";
import TimeUnitsAdd from "./admin/pages/timeUnits/timeUnitsAdd";
import Settings from "./admin/pages/settings/settings";
import CouponsAdd from "./admin/pages/coupons/couponsAdd";
import Coupon from "./admin/pages/coupons/coupons";
import Table from "./admin/pages/deliveryBoy/table";
import Documentation from "./documentation";

const Routes = () => {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <PrivateRouteProvider exact={true} path='/'>
                        <Dashboard/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider exact={true} path='/shops'>
                        <Shops/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/shops/add'>
                        <ShopsAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/shops/edit/:id'>
                        <ShopsAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider exact={true} path='/brands'>
                        <Brands/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/brands/add'>
                        <BrandsAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/brands/edit/:id'>
                        <BrandsAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider exact={true} path='/categories'>
                        <Categories/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/categories/add'>
                        <CategoriesAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/categories/edit/:id'>
                        <CategoriesAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider exact={true} path='/languages'>
                        <Languages/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/languages/add'>
                        <LanguagesAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/languages/edit/:id'>
                        <LanguagesAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider exact={true} path='/banners'>
                        <Banners/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/banners/add'>
                        <BannersAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/banners/edit/:id'>
                        <BannersAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider exact={true} path='/mobile/language'>
                        <MobileLanguage/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/mobile/language/edit/:id'>
                        <MobileLanguageDetail/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider exact={true} path='/units'>
                        <Units/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/units/add'>
                        <UnitsAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/units/edit/:id'>
                        <UnitsAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider exact={true} path='/timeUnits'>
                        <TimeUnits/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/timeUnits/add'>
                        <TimeUnitsAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/timeUnits/edit/:id'>
                        <TimeUnitsAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider exact={true} path='/settings'>
                        <Settings/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider exact={true} path='/products'>
                        <Products/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/products/add'>
                        <ProductsAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/products/edit/:id'>
                        <ProductsAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider exact={true} path='/products/extraGroups'>
                        <ExtraGroups/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/products/extraGroups/add'>
                        <ExtraGroupsAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/products/extraGroups/edit/:id'>
                        <ExtraGroupsAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider exact={true} path='/products/extras'>
                        <Extras/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/products/extras/add'>
                        <ExtrasAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/products/extras/edit/:id'>
                        <ExtrasAdd/>
                    </PrivateRouteProvider>
                    <Route path='/login'>
                        <Login/>
                    </Route>
                    <PrivateRouteProvider path='/users/roles'>
                        <Roles/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/users/permissions'>
                        <Permissions/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider exact={true} path='/users/clients'>
                        <UsersClient/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/users/clients/add'>
                        <UserClientAdd isModal={false}/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/users/clients/edit/:id'>
                        <UserClientAdd isModal={false}/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider exact={true} path='/users/admins'>
                        <UsersAdmin/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/users/admins/add'>
                        <UserAdminAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/users/admins/edit/:id'>
                        <UserAdminAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/comments/order'>
                        <OrderComments/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/comments/product'>
                        <ProductComments/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider exact={true} path='/payments/method'>
                        <PaymentMethods/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/payments/method/edit/:id'>
                        <PaymentMethodsAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider exact={true} path='/payments/status'>
                        <PaymentStatuses/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/payments/status/edit/:id'>
                        <PaymentStatusesAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider exact={true} path='/orders/status'>
                        <OrdersStatuses/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/orders/status/edit/:id'>
                        <OrdersStatusAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider exact={true} path='/orders'>
                        <Orders/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/orders/show'>
                        <Orders/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/orders/add'>
                        <OrdersAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/orders/edit/:id'>
                        <OrdersAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider exact={true} path='/users/addresses'>
                        <UsersAddresses/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/users/addresses/add'>
                        <UsersAddressesAdd isModal={false} idUser={-1}/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/users/addresses/edit/:id'>
                        <UsersAddressesAdd isModal={false} idUser={-1}/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider exact={true} path='/coupon'>
                        <Coupon/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/coupon/add'>
                        <CouponsAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/coupon/edit/:id'>
                        <CouponsAdd/>
                    </PrivateRouteProvider>
                    <PrivateRouteProvider path='/deliveryboy'>
                        <Table/>
                    </PrivateRouteProvider>
                    <Route path='/doc' exact={true}>
                        <Documentation/>
                    </Route>
                </Switch>
            </Router>
        </AuthProvider>
    );
};

export default Routes;