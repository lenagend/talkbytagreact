import React from 'react';
import PostList from './PostList';
import HomeSubmit from "./HomeSubmit";
import RightSidebar from "./RightSidebar";
import PostSubmit from "./PostSubmit";
import {useState} from 'react';
import PostNotice from "./PostNotice";
import PostRead from "./PostRead";


function Container( { page, post} ){
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
            default:
                return null;
        }
    };

    const renderRightSidebar = () => {
        if (page === 'home') {
            return <RightSidebar />;
        } else {
            return <PostNotice />;
        }
    };

    return (
        <main>
            <div className="container">
                <div className="row g-4">
                    <div className="col-md-8 col-lg-6 vstack gap-4">{renderContent()}</div>
                    <div className="col-lg-3">{renderRightSidebar()}</div>
                </div>
            </div>
        </main>
    );
}

export default Container;