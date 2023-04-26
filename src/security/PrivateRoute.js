import React, {useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from "./AuthContext";

const PrivateRoute = ({ originPath }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ originPath }}/>;
}
export default PrivateRoute;