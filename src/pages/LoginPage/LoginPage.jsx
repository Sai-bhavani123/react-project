// src/pages/LoginPage.js
// import React from 'react';
// import AuthLayout from '../../layouts/AuthLayout';
// import Login from '../../components/Login/Login';

// const LoginPage = () => {
//     return (
//         <AuthLayout>
//             <Login />
//         </AuthLayout>
//     );
// };

// export default LoginPage;
// src/pages/LoginPage/LoginPage.jsx

// src/pages/LoginPage/LoginPage.jsx
// src/pages/LoginPage/LoginPage.jsx

// STEP 1: Import useEffect, and useLocation from react-router-dom
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';

// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from '../../firebase/firebaseConfig';
// import './LoginPage.css';

// // Import Icons
// import { IoSchoolOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
// import { MdOutlineEmail } from 'react-icons/md';
// import { FiLock } from 'react-icons/fi';
// import { BsPeople, BsChatDots } from 'react-icons/bs';
// import { BiBookContent } from 'react-icons/bi';

// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     // STEP 2: Add state for the success message and initialize useLocation
//     const [successMessage, setSuccessMessage] = useState('');
//     const location = useLocation();

//     // STEP 3: Add this useEffect hook to check for a message when the page loads
//     useEffect(() => {
//         // Check if the page was loaded with a 'message' in its state
//         if (location.state?.message) {
//             setSuccessMessage(location.state.message);
//         }
//     }, [location.state]); // This effect runs whenever location.state changes


//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError(''); // Clear previous errors
//         try {
//             await signInWithEmailAndPassword(auth, email, password);
//             navigate('/dashboard'); // On success, redirect to the dashboard
//         } catch (err) {
//             setError("Failed to log in. Please check your email and password.");
//             console.error("Login error:", err);
//         }
//     };

//     return (
//         <div className="login-page-container">
//             <div className="login-layout">
//                 {/* Left Info Panel */}
//                 <div className="info-panel">
//                     <div className="logo-container">
//                         <div className="logo-icon-wrapper">
//                             <IoSchoolOutline className="logo-icon" />
//                         </div>
//                         <div className="logo-text">
//                             <h1>ClassSync</h1>
//                             <p>Virtual Learning Platform</p>
//                         </div>
//                     </div>
//                     <h2 className="headline">Transform Your<br /><span>Learning Experience</span></h2>
//                     <p className="description">Connect teachers and students in a dynamic virtual classroom environment with real-time collaboration and comprehensive learning tools.</p>
//                     <ul className="feature-list">
//                         <li className="feature-item">
//                             <div className="feature-icon-wrapper green"><BsPeople /></div>
//                             <span>Interactive Live Classes</span>
//                         </li>
//                         <li className="feature-item">
//                             <div className="feature-icon-wrapper blue"><BiBookContent /></div>
//                             <span>Resource Sharing & Assignments</span>
//                         </li>
//                         <li className="feature-item">
//                             <div className="feature-icon-wrapper purple"><BsChatDots /></div>
//                             <span>Real-time Chat & Collaboration</span>
//                         </li>
//                     </ul>
//                 </div>

//                 {/* Right Form Panel */}
//                 <div className="form-panel">
//                     <div className="login-form-container">
//                         <h2>Welcome Back</h2>
//                         <p className="form-subtitle">Sign in to your account</p>
                        
//                         {/* STEP 4: Add this line to display the success message */}
//                         {successMessage && <p className="success-message">{successMessage}</p>}
                        
//                         {error && <p className="error-message">{error}</p>}
                        
//                         <form onSubmit={handleLogin}>
//                             <div className="form-group">
//                                 <label>Email Address</label>
//                                 <div className="input-wrapper">
//                                     <MdOutlineEmail className="input-icon" />
//                                     <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                                 </div>
//                             </div>
//                             <div className="form-group">
//                                 <label>Password</label>
//                                 <div className="input-wrapper">
//                                     <FiLock className="input-icon" />
//                                     <input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                                     <span onClick={() => setShowPassword(!showPassword)} className="password-toggle-icon">
//                                         {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
//                                     </span>
//                                 </div>
//                             </div>
//                             <div className="form-options">
//                                 <label className="remember-me">
//                                     <input type="checkbox" /> Remember me
//                                 </label>
//                                 <a href="#!">Forgot password?</a>
//                             </div>
//                             <button type="submit" className="sign-in-btn">Sign In</button>
//                         </form>
//                         <div className="demo-accounts">
//                             <p>Demo accounts:<br />Teacher: teacher@example.com | Student: student@example.com</p>
//                         </div>
//                         <div className="signup-link">
//                             Don't have an account? <Link to="/signup">Sign up</Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;


// src/pages/LoginPage/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // <-- Import getDoc
import { auth, db } from '../../firebase/firebaseConfig'; // <-- Import db
import './LoginPage.css';

// Import Icons
import { IoSchoolOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { FiLock } from 'react-icons/fi';
import { BsPeople, BsChatDots } from 'react-icons/bs';
import { BiBookContent } from 'react-icons/bi';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.message) {
            setSuccessMessage(location.state.message);
        }
    }, [location.state]);

    // --- THIS IS THE UPDATED LOGIN LOGIC ---
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            // 1. Sign in the user
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Get the user's document from Firestore to check their role
            const userDocRef = doc(db, 'users', user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                const role = userData.role;

                // 3. Redirect based on the role
                if (role === 'teacher') {
                    navigate('/dashboard'); // Teacher dashboard
                } else if (role === 'student') {
                    navigate('/student-dashboard'); // Student dashboard
                } else {
                    // Fallback if role is not set
                    setError("User role not found. Please contact support.");
                    await signOut(auth);
                }
            } else {
                setError("No user data found. Please contact support.");
                await signOut(auth); // Sign out if no user data exists
            }

        } catch (err) {
            setError("Failed to log in. Please check your email and password.");
            console.error("Login error:", err);
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-layout">
                {/* Left Info Panel */}
                <div className="info-panel">
                    <div className="logo-container">
                        <div className="logo-icon-wrapper">
                            <IoSchoolOutline className="logo-icon" />
                        </div>
                        <div className="logo-text">
                            <h1>ClassSync</h1>
                            <p>Virtual Learning Platform</p>
                        </div>
                    </div>
                    <h2 className="headline">Transform Your<br /><span>Learning Experience</span></h2>
                    <p className="description">Connect teachers and students in a dynamic virtual classroom environment with real-time collaboration and comprehensive learning tools.</p>
                    <ul className="feature-list">
                        <li className="feature-item">
                            <div className="feature-icon-wrapper green"><BsPeople /></div>
                            <span>Interactive Live Classes</span>
                        </li>
                        <li className="feature-item">
                            <div className="feature-icon-wrapper blue"><BiBookContent /></div>
                            <span>Resource Sharing & Assignments</span>
                        </li>
                        <li className="feature-item">
                            <div className="feature-icon-wrapper purple"><BsChatDots /></div>
                            <span>Real-time Chat & Collaboration</span>
                        </li>
                    </ul>
                </div>

                {/* Right Form Panel */}
                <div className="form-panel">
                    <div className="login-form-container">
                        <h2>Welcome Back</h2>
                        <p className="form-subtitle">Sign in to your account</p>
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        {error && <p className="error-message">{error}</p>}
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label>Email Address</label>
                                <div className="input-wrapper">
                                    <MdOutlineEmail className="input-icon" />
                                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <div className="input-wrapper">
                                    <FiLock className="input-icon" />
                                    <input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    <span onClick={() => setShowPassword(!showPassword)} className="password-toggle-icon">
                                        {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                                    </span>
                                </div>
                            </div>
                            <div className="form-options">
                                <label className="remember-me">
                                    <input type="checkbox" /> Remember me
                                </label>
                                <a href="#!">Forgot password?</a>
                            </div>
                            <button type="submit" className="sign-in-btn">Sign In</button>
                        </form>
                        <div className="demo-accounts">
                            <p>Demo accounts:<br />Teacher: teacher@example.com | Student: student@example.com</p>
                        </div>
                        <div className="signup-link">
                            Don't have an account? <Link to="/signup">Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;