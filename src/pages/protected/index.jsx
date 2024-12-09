import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = (props) => {
    const isUserLogin = useSelector(state => state.account.isAuthenticated);
    return (
        <>
            {isUserLogin ?
                props.children
                :
                <Navigate to="/login" />
            }
        </>
    );
}

export default PrivateRoute;