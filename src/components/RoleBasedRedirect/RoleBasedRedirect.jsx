// src/components/RoleBasedRedirect/RoleBasedRedirect.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const RoleBasedRedirect = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkRoleAndRedirect = async () => {
            const user = auth.currentUser;
            if (user) {
                // Fetch user role from Firestore
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);
                
                if (userDocSnap.exists()) {
                    const role = userDocSnap.data().role;
                    // Redirect based on role
                    if (role === 'teacher') {
                        navigate('/dashboard', { replace: true });
                    } else if (role === 'student') {
                        navigate('/student-dashboard', { replace: true });
                    } else {
                        // Fallback: if role is unknown, go to login
                        navigate('/login', { replace: true });
                    }
                } else {
                    // Fallback: if user document doesn't exist, go to login
                    console.error("User document not found.");
                    navigate('/login', { replace: true });
                }
            } else {
                // If there's no user, they should be at the login page anyway
                setLoading(false);
            }
        };

        checkRoleAndRedirect();
    }, [navigate]);

    // Render a loading state while we determine the redirect
    return <div>Loading your dashboard...</div>;
};

export default RoleBasedRedirect;