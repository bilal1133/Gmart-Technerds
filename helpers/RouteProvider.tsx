import React, {useContext} from 'react';
import {AuthContext} from "./AuthProvider";
import {Redirect, Route} from 'react-router-dom';

export const PrivateRouteProvider = ({children, ...rest}) => {
    const {isAuthenticated} = useContext(AuthContext);

    return (<Route
        {...rest}
        render={(props) =>
            isAuthenticated ? (
                React.cloneElement(children, props)
            ) : (<Redirect
                to={{
                    pathname: '/login',
                }}
            />)}
    />)
}