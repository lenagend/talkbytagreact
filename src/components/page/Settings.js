import React, {useState} from 'react';
import Header from "../header/Header";
import Container from "../body/Container";


const Settings = () => {
    const [selectedTab, setSelectedTab] = useState('accountSettings');

    return (
        <div className="App">
            <Header />
            <Container page="settings" selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
        </div>
    );

}

export default Settings;