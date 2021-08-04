import React, {useState, createContext} from 'react';
import Sidebar from './sidebar'
import Menu from './menu';

const Layout = ({children}) => {
    return (
        <div id="wrapper">
            <Sidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Menu/>
                    <div className="container-fluid">
                        {children}
                    </div>
                </div>
                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright &copy; Gmarket 2021</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Layout;