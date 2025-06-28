import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/firebaseConfig';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    if (loading) {
        // You can add a loading spinner here
        return <div>Loading...</div>;
    }

    if (!user) {
        // If user is not logged in, redirect to login page
        return <Navigate to="/login" replace />;
    }

    // If user is logged in, render the children components
    return children;
};

export default ProtectedRoute;