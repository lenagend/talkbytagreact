import LeftSidebar from "../LeftSidebar";
import HomeSubmit from "./HomeSubmit";
import RightSidebar from "../RightSidebar";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../../security/AuthContext";
import HomeButtonList from "./HomeButtonList";
import PostContainer from "../post/PostContainer";

const HomeContainer = ({ sortType }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const [viewType, setViewType] = useState(localStorage.getItem("viewType") || "scroll");

    useEffect(() => {
        localStorage.setItem("viewType", viewType);
    }, [viewType]);
    return (
        <main>
            <div className="container">
                <div className="row g-4">
                    {isAuthenticated && <LeftSidebar />}
                    <div className="col-md-8 col-lg-6 vstack gap-4">
                        <HomeSubmit />
                        <HomeButtonList viewType={viewType} setViewType={setViewType} sortType={sortType}/>
                        <PostContainer sortType={sortType} viewType={viewType}/>
                    </div>
                    <div className="col-lg-3">
                        <RightSidebar />
                    </div>
                </div>
            </div>
        </main>
    );
};
export default HomeContainer;
