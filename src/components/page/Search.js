import React from 'react';
import Header from "../header/Header";
import Container from "../body/Container";

class Home extends React.Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Container page="search" />
            </div>
        );
    }
}

export default Home;