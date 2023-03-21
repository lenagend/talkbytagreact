import React, {useState} from 'react';
import Header from "../header/Header";
import Container from "../body/Container";
import { useLocation } from 'react-router-dom';


function Read() {

    return (
        <div className="App">
            <Header />
            <Container page="read"/>
        </div>
    );

}

export default Read;