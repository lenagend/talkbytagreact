import React from 'react';
import PostList from './PostList';
import HomeSubmit from "./HomeSubmit";
import RightSidebar from "./RightSidebar";
import PostSubmit from "./PostSubmit";
import {useState} from 'react';
import PostNotice from "./PostNotice";


function Container( { page, post} ){

    if (page === 'home'){
        return (
            <main>
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-8 col-lg-6 vstack gap-4">
                            <HomeSubmit />
                            <PostList />
                        </div>
                        <div className="col-lg-3">
                        <RightSidebar />
                        </div>
                    </div>
                </div>
            </main>
        );
    }else if (page === 'submit'){
        return (
            <main>
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-8 col-lg-6 vstack gap-4">
                            <PostSubmit post={post ? post : null}/>
                        </div>
                        <div className="col-lg-3">
                            <PostNotice />
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Container;