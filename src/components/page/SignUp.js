import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginSubmit from "../body/login/LoginSubmit";
import SignUpSubmit from "../body/login/SignUpSubmit";
import Header from "../header/Header";


const SignUp = () =>{
    return (
        <div className="App">
            <Header />
            <SignUpSubmit/>
        </div>
    );

}

export default SignUp;