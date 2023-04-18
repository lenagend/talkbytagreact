import React from 'react';
import Header from "../header/Header";
import Container from "../body/Container";

const MyComments = () => {
        return (
            <div className="App">
                <Header />
                <Container page="myComments" />
            </div>
        );
    }
export default MyComments;