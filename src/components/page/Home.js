import React from 'react';
import Header from "../header/Header";
import Container from "../body/Container";
import HomeContainer from "../body/home/HomeContainer";

const Home = ({sortType}) => {

        return (
            <div className="App">
                <Header />
                <HomeContainer sortType={sortType}/>
            </div>
        );
}

export default Home;