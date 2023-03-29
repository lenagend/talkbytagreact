import React, {useEffect} from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({isAuthenticated, originPath }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ originPath }}/>;
}
export default PrivateRoute;