import React, {useContext, useState} from 'react';
import axios from 'axios';
import Head from 'next/head'
import {AuthContext} from "../../../../helpers/AuthProvider";
import {Redirect} from 'react-router-dom';

export default function Login() {
    const {signin, isAuthenticated} = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRememberMe, setIsRememberMe] = useState(false);
    const [login_success, setLoginSuccess] = useState(false);
    const [error, setError] = useState("");


    let login = async (e) => {
        e.preventDefault()

        //check user with email and password
        const {data: data} = await axios.post('/api/auth/login', {email, password});

        if (data.logged) {
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(data.user));
                var oneday = new Date();
                oneday.setHours(oneday.getHours() + 24);
                localStorage.setItem('logout_time', oneday.toTimeString());
            }
            signin(true);
        } else {
            setError("Email or password is incorrect.");
        }
    }

    if(isAuthenticated)
        return (<Redirect to={{
            pathname: '/'
        }}/>);

    return (
        <>
            <Head>
                <title>Gmarket - Login</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-5 col-lg-6 col-md-5">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome to Gmarket</h1>
                                            </div>
                                            <form className="user">
                                                <div className="form-group">
                                                    <input type="email" onChange={(e) => {
                                                        setEmail(e.target.value);
                                                    }}
                                                           className="form-control form-control-user"
                                                           id="exampleInputEmail" aria-describedby="emailHelp"
                                                           placeholder="Enter Email Address..."/>
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" onChange={(e) => {
                                                        setPassword(e.target.value);
                                                    }}
                                                           className="form-control form-control-user"
                                                           id="exampleInputPassword" placeholder="Password"/>
                                                </div>

                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input"
                                                               checked={isRememberMe}
                                                               onChange={(e) => {
                                                                   setIsRememberMe(!isRememberMe)
                                                               }} id="customCheck"/>
                                                        <label className="custom-control-label"
                                                               htmlFor="customCheck">Remember Me</label>
                                                    </div>
                                                </div>

                                                <input type="submit" onClick={login} value="Login"
                                                       className="btn btn-primary btn-user btn-block"/>
                                            </form>
                                            <hr/>
                                            {
                                                error.length > 0 && (
                                                    <div className="text-center">
                                                        <span className="text-danger">{error}</span>
                                                    </div>
                                                )
                                            }
                                            <div className="text-center">
                                                Login: <span className="text-info">admin@githubit.com</span>
                                                <br/>
                                                Password: <span className="text-info">admin1234</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}
