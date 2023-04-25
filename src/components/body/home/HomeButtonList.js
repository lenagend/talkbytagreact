import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import AuthContext from "../../security/AuthContext";
import { IMAGE_SERVER_BASE_URL} from "../../../config/config";
import ViewTypeButtons from "./ViewTypeButtons";
import SortTypeButtons from "./SortTypeButtons";

const HomeButtonList = ({sortType}) => {
    return (
        <div className="card card-body p-2">
            <div className="list-group list-group-horizontal gap-2 flex-wrap justify-content-evenly mb-0 border-0">
                <SortTypeButtons sortType={sortType} />
                <div className="vr"></div>
                <ViewTypeButtons />
            </div>
        </div>
    );
}

export default HomeButtonList;