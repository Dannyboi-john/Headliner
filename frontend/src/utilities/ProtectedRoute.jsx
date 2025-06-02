import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const isTokenValid = (token) =>  {
    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 > Date.now();
    } catch (e) {
        return false;
    }
};

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token || !isTokenValid(token)) {
        return <Navigate to="/Home" replace />
    }

    return children;
};

export default ProtectedRoute;