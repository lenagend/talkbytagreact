import {Link} from "react-router-dom";
import React from "react";

const SortTypeButtons = ({sortType}) => {
    const latestButtonClass =
        sortType === "latest" ? "btn  btn-sm fw-light btn-primary-soft" : "btn btn-light btn-sm fw-light";
    const hotButtonClass =
        sortType === "hot" ? "btn  btn-sm fw-light btn-primary-soft" : "btn btn-light btn-sm fw-light";

    return (
        <div className="list-group list-group-horizontal gap-2 flex-wrap justify-content-evenly mb-0 border-0">
            <Link className={latestButtonClass} to="/">최신</Link>
            <Link className={hotButtonClass} to="/hot">인기</Link>
        </div>
    );
}
export default SortTypeButtons;