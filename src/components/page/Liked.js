import React from 'react';
import Header from "../header/Header";
import Container from "../body/Container";

const Liked = () => {
        return (
            <div className="App">
                <Header />
                <Container page="liked" />
            </div>
        );
    }
export default Liked;