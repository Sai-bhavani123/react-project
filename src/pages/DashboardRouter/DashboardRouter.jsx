import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import TeacherDashboard from '../TeacherDashboard/TeacherDashboard';
import StudentDashboard from '../StudentDashboard/StudentDashboard';

const DashboardRouter = () => {
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = auth.currentUser;

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUserRole(userDoc.data().role);
                }
            }
            setLoading(false);
        };
        fetchUserRole();
    }, [user]);

    if (loading) {
        return <div>Loading dashboard...</div>;
    }

    if (userRole === 'teacher') {
        return <TeacherDashboard />;
    }
    
    if (userRole === 'student') {
        return <StudentDashboard />;
    }

    // Fallback or error view
    return <div>Could not determine user role.</div>;
};

export default DashboardRouter;