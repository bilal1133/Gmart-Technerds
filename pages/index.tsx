import React, {Component} from 'react';
import {StaticRouter} from 'react-router';
import Routes from "./routes";

const isServer = typeof window === 'undefined';

export default class extends Component {
    render() {
        if (isServer) {
            return (
                <StaticRouter>
                </StaticRouter>
            );
        }
        return (
            <Routes/>
        )
    }
}