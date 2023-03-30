import React, {useEffect, useState} from 'react';
import NavSearch from "./NavSearch";
import NavRight from "./NavRight";
import {useNavigate} from "react-router-dom";

const TopNav = () =>  {

        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const navigate = useNavigate();

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (token) {
                setIsLoggedIn(true);
            }
        }, []);

        const handleLoginButton = () =>{
            navigate("/login");
        }

        return (
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img className="light-mode-item navbar-brand-item" src="/assets/images/logo.svg" alt="logo"/>
                        <img className="dark-mode-item navbar-brand-item" src="/assets/images/logo.svg" alt="logo"/>
                    </a>
                    <button class="navbar-toggler ms-auto icon-md btn btn-light p-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-animation">
                        <span></span>
                        <span></span>
                        <span></span>
                        </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <NavSearch />
                    </div>
                    {isLoggedIn && (<NavRight />)}
                    {!isLoggedIn && (
                        <button type="button" className="btn btn-outline-primary" onClick={handleLoginButton}>로그인</button>
                    )}

                </div>
            </nav>
        );

}

export default TopNav;