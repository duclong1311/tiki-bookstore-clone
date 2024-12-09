import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import RoleBaseRoute from './RoleBaseRoute';

const PrivateRoute = (props) => {
    const isUserLogin = useSelector(state => state.account.isAuthenticated);
    return (
        <>
            {isUserLogin ?
                <RoleBaseRoute>
                    {props.children}
                </RoleBaseRoute>
                :
                <Navigate to="/login" />
            }
        </>
    );
}

export default PrivateRoute;