import React from 'react';
import NavSearch from "./NavSearch";

class TopNav extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    {/*Logo Starg*/}
                    <a className="navbar-brand" href="index.html">
                        <img className="light-mode-item navbar-brand-item" src="assets/images/logo.svg" alt="logo"/>
                        <img className="dark-mode-item navbar-brand-item" src="assets/images/logo.svg" alt="logo"/>
                    </a>
                    {/*Logo End*/}

                   {/*Responsive navbar toggler */}
                    <button class="navbar-toggler ms-auto icon-md btn btn-light p-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-animation">
                        <span></span>
                        <span></span>
                        <span></span>
                        </span>
                    </button>
                    {/*Main navbar START*/}
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <NavSearch />
                    </div>
                </div>
            </nav>
        );
    }
}

export default TopNav;