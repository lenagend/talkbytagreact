import React from 'react';
import {useLocation} from 'react-router-dom';
import LoginSubmit from "../body/login/LoginSubmit";
import Header from "../header/Header";
import HomeContainer from "../body/home/HomeContainer";
import Container from "../body/Container";


const Error = () => {

    return (
        <div className="App">
            <Header/>
            <main className="py-5">
                <div class="container">
                    <div className="h-100px d-none d-lg-block"></div>
                    <h1 class="display-1 mt-4">404</h1>
                    <h2 class="mb-2 h1">Page Not Found!</h2>
                    <p>Either something went wrong or this page doesn't exist anymore.</p>
                    <a class="btn btn-primary-soft btn-sm" href="index.html">Got to home page</a>
                </div>
                <div class="h-100px d-none d-lg-block"></div>
            </main>
        </div>
    );

}

export default Error;