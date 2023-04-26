import {Link} from "react-router-dom";
import React from "react";

const ViewTypeButtons = ({ viewType, setViewType }) => {

    const handleViewTypeButtonClick = (event, newViewType) => {
        event.preventDefault();
        setViewType(newViewType);
    };

    const scrollButtonClass =
        viewType === "scroll" ? "btn btn-sm fw-light btn-primary-soft" : "btn btn-light btn-sm fw-light";
    const tableButtonClass =
        viewType === "table" ? "btn btn-sm fw-light btn-primary-soft" : "btn btn-light btn-sm fw-light";

    return (
        <div className="list-group list-group-horizontal gap-2 flex-wrap justify-content-evenly mb-0 border-0">
            <Link
                onClick={(e) => handleViewTypeButtonClick(e, "scroll")}
                className={scrollButtonClass}
                to="#"
            >
                스크롤
            </Link>
            <Link
                onClick={(e) => handleViewTypeButtonClick(e, "table")}
                className={tableButtonClass}
                to="#"
            >
                게시판
            </Link>
        </div>
    );
};
export default ViewTypeButtons;
