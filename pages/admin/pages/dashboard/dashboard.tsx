import React, {Component} from 'react';
import Layout from '../../layouts/layouts';
import Head from "next/head";
import {Doughnut, Line, Pie, Scatter} from 'react-chartjs-2';
import axios from "axios";
import {Link, Redirect} from 'react-router-dom';
import SmallLoader from "../../components/smallLoader";
import {roleGuard} from "../../../../utils/roleGuard";

interface AppProps {

}

interface AppState {
    users: any,
    ordersCount: number,
    ordersAmount: number,
    clientsCount: number,
    shopsCount: number,
    lastOrders: any[],
    lastShops: any[],
    pieChartData: any,
    lineChartData: any,
    loading: boolean
}

const colorSet = [
    "Green",
    "Red",
    "Olive",
    "Gray",
    "Fuchsia",
    "Navy",
    "Lime",
    "Teal",
    "Silver",
    "#4000ff",
    "#CCCCFF",
    "#6495ED",
    "IndianRed",
    "#9FE2BF",
    "#DE3163",
    "#bfff00",
    "#ff0040",
    "Purple",
    "Blue",
    "Aqua",
    "Yellow",
    "Maroon",
];

export default class Dashboard extends Component<AppProps, AppState> {
    constructor(props) {
        super(props);

        this.state = {
            users: {},
            ordersCount: 0,
            ordersAmount: 0,
            clientsCount: 0,
            shopsCount: 0,
            lastOrders: [],
            lastShops: [],
            pieChartData: {},
            lineChartData: {},
            loading: true
        }
    }

    async componentDidMount() {
        let users = this.getUser();

        this.setState({
            users: users
        })

        this.getOrdersInfo(users['id_shops'] ? users['id_shops']['id'] : 0);
        this.getShopCount();
    }

    getUser() {
        if (typeof window !== 'undefined')
        return localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : null;
    }

    async getOrdersInfo(id_shop) {
        const {data: data} = await axios.post('/api/dashboard/totalOrdersInfo', {
            id_shop: id_shop ? id_shop : 0
        })

        this.setState({
            ordersCount: data.data['order_count'],
            ordersAmount: data.data['order_amount']['sum'],
            clientsCount: data.data['client_count'][0]['client_count'],
            lastOrders: data.data['orders']
        });

        let orderDataByShop = data.data['shop_orders'];
        let lineChartDatas = data.data['line_data'];
        var labels = [];
        var datasetsData = [];
        var backgroundColor = [];
        var hoverBackgroundColor = [];

        for (let i = 0; i < orderDataByShop.length; i++) {
            labels.push(orderDataByShop[i]['shop']);
            datasetsData.push(orderDataByShop[i]['order_count']);
            backgroundColor.push(colorSet[i]);
            hoverBackgroundColor.push(colorSet[i]);
        }

        this.setState({
            pieChartData: {
                labels: labels,
                datasets: [{
                    data: datasetsData,
                    backgroundColor: backgroundColor,
                    hoverBackgroundColor: hoverBackgroundColor
                }]
            }
        })

        var lineLabel = [];
        var lineData = [];

        for (let i = 0; i < lineChartDatas.length; i++) {
            lineLabel.push(lineChartDatas[i]['dateFull']);
            lineData.push(lineChartDatas[i]['count']);
        }

        this.setState({
            lineChartData: {
                labels: lineLabel,
                datasets: [
                    {
                        label: 'Orders count in last 10 days',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: lineData
                    }
                ]
            },
            loading: false
        })
    }

    async getShopCount() {
        const {data: data} = await axios.post('/api/dashboard/totalShops')

        this.setState({
            shopsCount: data.data['shop_count'],
            lastShops: data.data['shop_data']
        })
    }

    render() {
        if(!roleGuard('dashboard'))
            return (<Redirect to='/shops'/>);

        return (
            <Layout>
                <Head>
                    <title>Gmarket - Dashboard</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <h1 className="h3 mb-2 text-gray-800">Dashboard</h1>
                <div className="card shadow mb-4">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-success shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div
                                                    className="text-xs font-weight-bold text-success text-uppercase mb-1">Total
                                                    orders
                                                </div>
                                                <div
                                                    className="h5 mb-0 font-weight-bold text-gray-800">{this.state.ordersCount}</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-shopping-cart fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-danger shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div
                                                    className="text-xs font-weight-bold text-danger text-uppercase mb-1">Total
                                                    earnings
                                                </div>
                                                <div
                                                    className="h5 mb-0 font-weight-bold text-gray-800">{this.state.ordersAmount}</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-coins fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-warning shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div
                                                    className="text-xs font-weight-bold text-warning text-uppercase mb-1">Markets
                                                </div>
                                                <div
                                                    className="h5 mb-0 font-weight-bold text-gray-800">{this.state.shopsCount}</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-store fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-primary shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div
                                                    className="text-xs font-weight-bold text-primary text-uppercase mb-1">Customers
                                                </div>
                                                <div
                                                    className="h5 mb-0 font-weight-bold text-gray-800">{this.state.clientsCount}</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-users fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card shadow mb-4">
                            <div className="card-body">
                                <label>Orders count by shop</label>
                                <Pie data={this.state.pieChartData}/>
                            </div>
                        </div>
                    </div>
                    <div className="col col-sm-12 col-md-6">
                        <div className="card shadow mb-4">
                            <div className="card-body">
                                <label>Orders amount by month</label>
                                <Line data={this.state.lineChartData}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card shadow mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col col-sm-6 col-md-6">
                                        <label>Last 10 orders</label>
                                    </div>
                                    <div className="col col-sm-6 col-md-6">
                                        <Link to="/orders" className="float-right">All orders</Link>
                                    </div>
                                </div>
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Amount</th>
                                        <th>Client</th>
                                        <th>Shop</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.lastOrders != null && this.state.lastOrders.map((item) => {
                                            return <tr>
                                                <td>#{item.id}</td>
                                                <td>{item.total_sum}</td>
                                                <td>{item.client}</td>
                                                <td>{item.shop}</td>
                                                <td>
                                                    <Link to={"/orders/edit/" + item.id} className="text-success"><i
                                                        className="fa fa-edit"></i></Link>
                                                </td>
                                            </tr>
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col col-md-6 col-sm-12">
                        <div className="card shadow mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col col-md-6 col-sm-6">
                                        <label>Shops</label>
                                    </div>
                                    <div className="col col-md-6 col-sm-6">
                                        <Link to="/shops" className="float-right">All shops</Link>
                                    </div>
                                </div>
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>Logo</th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.lastShops != null && this.state.lastShops.map((item) => {
                                            return <tr>
                                                <td>
                                                    <img src={item.logo_url}
                                                         style={{height: '40px', width: '40px', borderRadius: '20px'}}/>
                                                </td>
                                                <td>{item.lang[0].name}</td>
                                                <td>{item.lang[0].address}</td>
                                                <td>
                                                    <Link to={"/shops/edit/" + item.id} className="text-success"><i
                                                        className="fa fa-edit"></i></Link>
                                                </td>
                                            </tr>
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
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