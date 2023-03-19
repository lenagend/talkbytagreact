import React from 'react';
import PostList from './PostList';
import HomeSubmit from "./HomeSubmit";
import RightSidebar from "./RightSidebar";
import SubmitSubmit from "./SubmitSubmit";


function Container( { page} ){
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
                            <SubmitSubmit />
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Container;