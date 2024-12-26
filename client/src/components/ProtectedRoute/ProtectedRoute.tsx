import { Navigate } from 'react-router-dom';
import React from "react";

const ProtectedRoute = ({ children } : {children: React.ReactElement}) => {
    const token = localStorage.getItem('token'); // Or check token validity in cookies/sessionStorage

    if (!token) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;