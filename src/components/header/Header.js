import React from 'react';
import TopNav from "./TopNav";

class Header extends React.Component {
    render() {
        return (
            <header className="navbar-light fixed-top header-static bg-mode">
                <TopNav />
            </header>
        );
    }
}

export default Header;