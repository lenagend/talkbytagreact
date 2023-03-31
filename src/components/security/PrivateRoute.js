import React, {useContext, useEffect} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from "./AuthContext";

const PrivateRoute = ({ originPath }) => {
    const { isLoggedIn } = useContext(AuthContext);

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" state={{ originPath }}/>;
}
export default PrivateRoute;