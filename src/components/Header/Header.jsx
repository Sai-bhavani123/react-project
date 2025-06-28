// // src/components/Header/Header.jsx
// import React from 'react';
// import { signOut } from 'firebase/auth';
// import { auth } from '../../firebase/firebaseConfig';
// import { FaGraduationCap, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
// import './Header.css';

// const Header = () => {
//     const user = auth.currentUser;

//     const handleLogout = () => {
//         signOut(auth).catch((error) => console.error("Logout Error:", error));
//     };

//     return (
//         <header className="app-header">
//             <div className="header-logo">
//                 <FaGraduationCap className="logo-icon" />
//                 <span>ClassSync</span>
//             </div>
//             <div className="user-info">
//                 <div className="user-details">
//                     <FaUserCircle />
//                     <span>{user?.displayName || 'User'}</span>
//                     <span className="user-role">teacher</span>
//                 </div>
//                 <button className="logout-btn" onClick={handleLogout}>
//                     <FaSignOutAlt />
//                     <span>Logout</span>
//                 </button>
//             </div>
//         </header>
//     );
// };

// export default Header;

// src/components/Header/Header.jsx

import React, { useState, useEffect } from 'react'; // <-- Add hooks
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // <-- Import getDoc
import { auth, db } from '../../firebase/firebaseConfig'; // <-- Import db
import { FaGraduationCap, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import './Header.css';

const Header = () => {
    const user = auth.currentUser;
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    setUserRole(userDocSnap.data().role);
                }
            }
        };
        fetchUserRole();
    }, [user]);

    const handleLogout = () => {
        signOut(auth).catch((error) => console.error("Logout Error:", error));
    };

    return (
        <header className="app-header">
            <div className="header-logo">
                <FaGraduationCap className="logo-icon" />
                <span>ClassSync</span>
            </div>
            {user && (
                <div className="user-info">
                    <div className="user-details">
                        <FaUserCircle />
                        <span>{user.displayName || 'User'}</span>
                        {userRole && <span className="user-role">{userRole}</span>}
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;