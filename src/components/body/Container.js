import React, {useContext, useEffect} from 'react';
import PostList from './PostList';
import HomeSubmit from "./HomeSubmit";
import RightSidebar from "./RightSidebar";
import PostSubmit from "./PostSubmit";
import {useState} from 'react';
import PostNotice from "./PostNotice";
import PostRead from "./PostRead";
import SearchList from "./SearchList";
import LeftSidebar from "./LeftSidebar";
import AuthContext from "../security/AuthContext";


const Container = ( { page, post} ) => {
    const { isAuthenticated } = useContext(AuthContext);

    const renderContent = () => {
        switch (page) {
            case 'home':
                return (
                    <>
                        <HomeSubmit />
                        <PostList />
                    </>
                );
            case 'submit':
                return <PostSubmit post={post ? post : null} />;
            case 'read':
                return <PostRead />;
            case 'search':
                return (
                    <>
                        <HomeSubmit />
                        <SearchList />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <main>
            <div className="container">
                <div className="row g-4">
                    {page === 'home' && isAuthenticated &&  <LeftSidebar />}
                    <div className="col-md-8 col-lg-6 vstack gap-4">{renderContent()}</div>
                    <div className="col-lg-3"><RightSidebar /></div>
                </div>
            </div>
        </main>
    );
}

export default Container;