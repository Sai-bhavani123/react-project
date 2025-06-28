import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import './Dashboard.css';

// Icons
import { FaUserCircle, FaSignOutAlt, FaBookOpen, FaUserFriends, FaTasks, FaPlus } from 'react-icons/fa';

const Dashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    console.log("No such user document in Firestore!");
                }
            } else {
                console.log("User is not signed in.");
                navigate('/login');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) { // TYPO REMOVED HERE
            console.error("Error signing out: ", error);
        }
    };

    if (loading) {
        return <div>Loading Dashboard...</div>;
    }

    if (!userData) {
        return <div>Could not load user data. Please try logging in again.</div>;
    }

    return (
        <div className='dashboard-container'>
            <header className='dashboard-header'>
                <div className='header-logo'>ClassSync</div>
                <div className='header-user-info'>
                    <div className='user-details'>
                        <FaUserCircle />
                        <span>{userData?.fullName}</span>
                        <span className='role-tag'>{userData?.role}</span>
                    </div>
                    <button onClick={handleLogout} className='logout-button'>
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>
            </header>

            <main className='dashboard-main'>
                <h1>Teacher Dashboard</h1>
                <p className='welcome-msg'>Welcome back, {userData?.fullName}!</p>

                <div className='stats-container'>
                    <div className='stat-card classes'>
                        <div className='icon'><FaBookOpen /></div>
                        <div className='info'><h3>0</h3><p>Classes</p></div>
                    </div>
                    <div className='stat-card students'>
                        <div className='icon'><FaUserFriends /></div>
                        <div className='info'><h3>0</h3><p>Students</p></div>
                    </div>
                    <div className='stat-card assignments'>
                        <div className='icon'><FaTasks /></div>
                        <div className='info'><h3>0</h3><p>Assignments</p></div>
                    </div>
                </div>
                <div className='my-classes-section'>
                    <div className='my-classes-header'>
                        <h2>My Classes</h2>
                        <button className='create-class-btn'><FaPlus /> Create Class</button>
                    </div>
                    <div className='no-classes-container'>
                        <div className='icon'><FaBookOpen /></div>
                        <h3>No classes yet</h3>
                        <p>Create your first class to get started</p>
                        <button className='create-class-btn'><FaPlus /> Create Your First Class</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;