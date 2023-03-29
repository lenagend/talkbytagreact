import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginSubmit from "../body/LoginSubmit";
import SignUpSubmit from "../body/SignUpSubmit";
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