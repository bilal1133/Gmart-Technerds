import React from 'react';

const isServer = typeof window === 'undefined';

type AuthProps = {
    isAuthenticated: boolean;
    signin: Function;
};

export const AuthContext = React.createContext({} as AuthProps);

const isAuthenticatedUser = () => {
    var date = new Date(localStorage.getItem('logout_time'));
    if (date < new Date()) {
        localStorage.clear();

        return  false;
    }

    if (!isServer)
        return localStorage.getItem('isAuthenticated') != null;
};

export const AuthProvider = ({children}) => {
    const [isAuthenticated, makeAuthenticated] = React.useState(isAuthenticatedUser());

    function signin(isAuthenticated) {
        if (isAuthenticated) {
            makeAuthenticated(true);
            if (!isServer)
                localStorage.setItem('isAuthenticated', '1');
        } else {
            makeAuthenticated(false);
            if (!isServer)
                localStorage.removeItem('isAuthenticated');
        }
    }

    return (<AuthContext.Provider value={{
        isAuthenticated,
        signin,
    }}>
        {children}
    </AuthContext.Provider>);
}
