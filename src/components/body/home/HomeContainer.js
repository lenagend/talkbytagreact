import LeftSidebar from "../LeftSidebar";
import HomeSubmit from "./HomeSubmit";
import LatestPostList from "../post/LatestPostList";
import RightSidebar from "../RightSidebar";
import React, {useContext, useState} from "react";
import AuthContext from "../../security/AuthContext";
import HomeButtonList from "./HomeButtonList";
import HottestPostList from "../post/HottestPostList";

const HomeContainer = ({ sortType }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const [viewType, setViewType] = useState("list"); // "list" 또는 "table"

    const handleViewTypeChange = (newViewType) => {
        setViewType(newViewType);
    };

    return (
        <main>
            <div className="container">
                <div className="row g-4">
                    {isAuthenticated && <LeftSidebar />}
                    <div className="col-md-8 col-lg-6 vstack gap-4">
                        <HomeSubmit />
                        <HomeButtonList sortType={sortType} onViewTypeChange={handleViewTypeChange} />
                        {sortType === "latest" ? <LatestPostList viewType={viewType}/> : <HottestPostList viewType={viewType}/>}
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
