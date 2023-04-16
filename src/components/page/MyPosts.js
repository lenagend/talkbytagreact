import React from 'react';
import Header from "../header/Header";
import Container from "../body/Container";

const MyPosts = () => {
        return (
            <div className="App">
                <Header />
                <Container page="myPosts" />
            </div>
        );
    }
export default MyPosts;