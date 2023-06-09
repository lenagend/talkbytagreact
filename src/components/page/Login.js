import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginSubmit from "../body/login/LoginSubmit";
import Header from "../header/Header";


const Login = () =>{
    const location = useLocation();
    const originPath = location.state?.originPath ?? "/";

    return (
        <div className="App">
            <Header />
            <LoginSubmit originPath={originPath}/>
        </div>
    );

}

export default Login;