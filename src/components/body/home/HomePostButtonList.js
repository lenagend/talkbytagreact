import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import AuthContext from "../../security/AuthContext";
import { IMAGE_SERVER_BASE_URL} from "../../../config/config";

const HomePostButtonList = ({sortType, onViewTypeChange}) => {
    const latestButtonClass =
        sortType === "latest" ? "btn  btn-sm fw-light btn-primary-soft" : "btn btn-light btn-sm fw-light";
    const hotButtonClass =
        sortType === "hot" ? "btn  btn-sm fw-light btn-primary-soft" : "btn btn-light btn-sm fw-light";

    const handleViewTypeButtonClick = (event, viewType) => {
        event.preventDefault();
        onViewTypeChange(viewType);
    };

    return (
        <div className="card card-body p-2">
            <div className="list-group list-group-horizontal gap-2 flex-wrap justify-content-evenly mb-0 border-0">
                <Link className={latestButtonClass} to="/">최신</Link>
                <Link className={hotButtonClass} to="/hot">인기</Link>
                <div className="vr"></div>
                <Link onClick={(e) => handleViewTypeButtonClick(e, "list")} className="btn btn-light btn-sm fw-light" to="#">목록형</Link>
                <Link onClick={(e) => handleViewTypeButtonClick(e, "table")} className="btn btn-light btn-sm fw-light" to="#">게시판형</Link>
            </div>
        </div>
    );
}

export default HomePostButtonList;