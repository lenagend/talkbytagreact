import React, {useContext, useEffect} from 'react';
import PostList from './post/PostList';
import HomeSubmit from "./HomeSubmit";
import RightSidebar from "./RightSidebar";
import PostSubmit from "./post/PostSubmit";
import {useState} from 'react';
import PostNotice from "./post/PostNotice";
import PostRead from "./post/PostRead";
import SearchList from "./post/SearchList";
import LeftSidebar from "./LeftSidebar";
import AuthContext from "../security/AuthContext";
import SettingSideNav from "./settings/SettingSideNav";
import AccountSettings from "./settings/AccountSettings";
import CloseAccount from "./settings/CloseAccount";


const Container = ( { page, post, selectedTab, setSelectedTab} ) => {
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        console.log(selectedTab);
    }, [selectedTab]);


    const renderContent = () => {
        switch (page) {
            case 'home':
                return (
                    <div className="row g-4">
                        {isAuthenticated && <LeftSidebar />}
                        <div className="col-md-8 col-lg-6 vstack gap-4">
                            <HomeSubmit />
                            <PostList />
                        </div>
                        <div className="col-lg-3"><RightSidebar /></div>
                    </div>
                );
            case 'submit':
                return (
                    <div className="row g-4">
                        <div className="col-md-8 col-lg-6 vstack gap-4">
                            <PostSubmit post={post ? post : null} />
                        </div>
                    </div>
                );
            case 'read':
                return (
                    <div className="row g-4">
                        {isAuthenticated && <LeftSidebar />}
                        <div className="col-md-8 col-lg-6 vstack gap-4">
                            <PostRead />
                        </div>
                    </div>
                );
            case 'search':
                return (
                    <div className="row g-4">
                        {isAuthenticated && <LeftSidebar />}
                        <div className="col-md-8 col-lg-6 vstack gap-4">
                            <HomeSubmit />
                            <SearchList />
                        </div>
                        <div className="col-lg-3"><RightSidebar /></div>
                    </div>
                );
            case 'settings':
                return (
                    <div className="row g-4">
                        <SettingSideNav selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
                        <div className="col-lg-6 vstack gap-4">
                            <div className="tab-content py-0 mb-0">
                                {selectedTab === 'accountSettings' && <AccountSettings/>}
                                {selectedTab === 'closeAccount' && <CloseAccount/>}
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <main>
            <div className="container">{renderContent()}</div>
        </main>
    );

}

export default Container;