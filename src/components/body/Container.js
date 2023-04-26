import React, {useContext} from 'react';
import HomeSubmit from "./home/HomeSubmit";
import RightSidebar from "./RightSidebar";
import PostSubmit from "./post/PostSubmit";
import PostRead from "./post/PostRead";
import SearchList from "./post/SearchList";
import LeftSidebar from "./LeftSidebar";
import AuthContext from "../../security/AuthContext";
import SettingSideNav from "./settings/SettingSideNav";
import AccountSettings from "./settings/AccountSettings";
import CloseAccount from "./settings/CloseAccount";
import LikedList from "./Like/LikedList";
import MyPostList from "./post/MyPostList";
import DeletedPostList from "./post/DeletedPostList";
import MyCommentList from "./Comment/MyCommentList";


const Container = ( { page, post, selectedTab, setSelectedTab} ) => {
    const { isAuthenticated } = useContext(AuthContext);

    const renderContent = () => {
        switch (page) {
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
                            <PostRead showPost={true}/>
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
            case 'liked':
                return (
                    <div className="row g-4">
                        {isAuthenticated && <LeftSidebar />}
                        <div className="col-md-8 col-lg-6 vstack gap-4">
                            <LikedList />
                        </div>
                        <div className="col-lg-3"><RightSidebar /></div>
                    </div>
                );
            case 'myPosts':
                return (
                    <div className="row g-4">
                        {isAuthenticated && <LeftSidebar />}
                        <div className="col-md-8 col-lg-6 vstack gap-4">
                            <ul className="nav nav-tabs nav-tabs-white border-0 mb-0" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="pills-tab-1" data-bs-toggle="pill"
                                            data-bs-target="#pills-tab1" type="button" role="tab"
                                            aria-controls="pills-tab1" aria-selected="true">게시된 포스트
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-tab-2" data-bs-toggle="pill"
                                            data-bs-target="#pills-tab2" type="button" role="tab"
                                            aria-controls="pills-tab2" aria-selected="false">지운 포스트
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content pt-0" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-tab1" role="tabpanel"
                                     aria-labelledby="pills-tab-1">
                                    <MyPostList />
                                </div>
                                <div className="tab-pane pt-0 fade" id="pills-tab2" role="tabpanel"
                                     aria-labelledby="pills-tab-2">
                                    <DeletedPostList />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3"><RightSidebar /></div>
                    </div>
                );
            case 'myComments':
                return (
                    <div className="row g-4">
                        {isAuthenticated && <LeftSidebar />}
                        <div className="col-md-8 col-lg-6 vstack gap-4">
                            <MyCommentList />
                        </div>
                        <div className="col-lg-3"><RightSidebar /></div>
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