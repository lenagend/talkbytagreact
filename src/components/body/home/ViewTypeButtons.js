import {Link} from "react-router-dom";
import React from "react";

const ViewTypeButtons = () => {

    const handleViewTypeButtonClick = (event, viewType) => {
        event.preventDefault();
        localStorage.setItem("viewType", viewType);
    };

    return (
        <div className="list-group list-group-horizontal gap-2 flex-wrap justify-content-evenly mb-0 border-0">
            <Link onClick={(e) => handleViewTypeButtonClick(e, "scroll")} className="btn btn-light btn-sm fw-light"
                  to="#">스크롤</Link>
            <Link onClick={(e) => handleViewTypeButtonClick(e, "table")} className="btn btn-light btn-sm fw-light"
                  to="#">게시판</Link>
        </div>
    );
}
export default ViewTypeButtons;