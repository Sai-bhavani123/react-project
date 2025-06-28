// src/components/Login/Login.js
// import React, { useState } from 'react';
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from '../../firebase/firebaseConfig';
// import './Login.css';

// // Importing icons from react-icons
// import { IoSchoolOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
// import { MdOutlineEmail } from 'react-icons/md';
// import { FiLock } from 'react-icons/fi';
// import { BsPeople, BsChatDots } from 'react-icons/bs';
// import { BiBookContent } from 'react-icons/bi';
// import { Link } from 'react-router-dom';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [error, setError] = useState('');

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError(''); // Clear previous errors

//         if (!email || !password) {
//             setError("Please enter both email and password.");
//             return;
//         }

//         try {
//             const userCredential = await signInWithEmailAndPassword(auth, email, password);
//             // Signed in successfully
//             const user = userCredential.user;
//             console.log("Logged in successfully:", user);
//             alert(`Welcome back, ${user.email}!`);
//             // Here you would typically redirect the user to the dashboard
//             // e.g., using react-router-dom: history.push('/dashboard');
//         } catch (error) {
//             // Handle specific Firebase errors
//             if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
//                 setError("Invalid email or password. Please try again.");
//             } else {
//                 setError("An error occurred during login. Please try again later.");
//             }
//             console.error("Login Error:", error.code, error.message);
//         }
//     };

//     return (
//         <div className="login-page-container">
//             <div className="login-layout">
//                 <div className="info-panel">
//                     <div className="logo-container">
//                         {/* <IoSchoolOutline className="logo-icon" /> */}
//                         {/* <div className="logo-text">
//                             <h1>ClassSync</h1>
//                             <p>Virtual Learning Platform</p>
//                         </div> */}
//                     </div>
//                     {/* <h2 className="headline">
//                         Transform Your<br />
//                         <span>Learning Experience</span>
//                     </h2> */}
//                     {/* <p className="description">
//                         Connect teachers and students in a dynamic virtual classroom environment with real-time collaboration and comprehensive learning tools.
//                     </p> */}
//                     <ul className="feature-list">
//                         {/* <li className="feature-item">
//                             <span className="feature-icon green"><BsPeople /></span>
//                             Interactive Live Classes
//                         </li> */}
//                         {/* <li className="feature-item">
//                             <span className="feature-icon blue"><BiBookContent /></span>
//                             Resource Sharing & Assignments
//                         </li> */}
//                         {/* <li className="feature-item">
//                             <span className="feature-icon purple"><BsChatDots /></span>
//                             Real-time Chat & Collaboration
//                         </li> */}
//                     </ul>
//                 </div>
//                 <div className="form-panel">
//                     <div className="login-form-container">
//                         <h2>Welcome Back</h2>
//                         <p>Sign in to your account</p>
//                         {error && <div className="error-message">{error}</div>}
//                         <form onSubmit={handleLogin}>
//                             <div className="form-group">
//                                 <label htmlFor="email">Email Address</label>
//                                 <div className="input-wrapper">
//                                     <MdOutlineEmail className="input-icon" />
//                                     <input
//                                         type="email"
//                                         id="email"
//                                         placeholder="Enter your email"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="password">Password</label>
//                                 <div className="input-wrapper password-wrapper">
//                                     <FiLock className="input-icon" />
//                                     <input
//                                         type={showPassword ? 'text' : 'password'}
//                                         id="password"
//                                         placeholder="Enter your password"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         required
//                                     />
//                                     <span onClick={() => setShowPassword(!showPassword)} className="password-toggle-icon">
//                                         {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
//                                     </span>
//                                 </div>
//                             </div>
//                             <div className="form-options">
//                                 <div className="remember-me">
//                                     <input type="checkbox" id="remember" />
//                                     <label htmlFor="remember">Remember me</label>
//                                 </div>
//                                 <a href="#forgot" className="forgot-password">Forgot password?</a>
//                             </div>
//                             <button type="submit" className="sign-in-btn">Sign In</button>
//                         </form>
//                         <div className="demo-accounts">
//                             Demo accounts:<br />
//                             Teacher: teacher@example.com | Student: student@example.com
//                         </div>
//                         {/* <div className="signup-link">
//                             Don't have an account? <a href="#signup">Sign up</a>
//                         </div> */}
//                         <div className="signup-link">
//                             Don't have an account? <Link to="/signup">Sign up</Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;


// src/components/Login/Login.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate for redirection
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/firebaseConfig';
import './Login.css';

// Importing only the icons needed for this form
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { FiLock } from 'react-icons/fi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for redirection

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); 

        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("Logged in successfully:", user);
            alert(`Welcome back, ${user.displayName || user.email}!`);
            
            // Redirect to a dashboard page after successful login
            navigate('/dashboard'); // Example: redirect to a dashboard

        } catch (error) {
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                setError("Invalid email or password. Please try again.");
            } else {
                setError("An error occurred during login. Please try again later.");
            }
            console.error("Login Error:", error.code, error.message);
        }
    };

    // The component now only returns the form itself.
    // The AuthLayout component will provide the surrounding page structure.
    return (
        <div className="login-form-container">
            <h2>Welcome Back</h2>
            <p>Sign in to your account</p>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <div className="input-wrapper">
                        <MdOutlineEmail className="input-icon" />
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-wrapper password-wrapper">
                        <FiLock className="input-icon" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span onClick={() => setShowPassword(!showPassword)} className="password-toggle-icon">
                            {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                        </span>
                    </div>
                </div>
                <div className="form-options">
                    <div className="remember-me">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember" style={{cursor: 'pointer'}}>Remember me</label>
                    </div>
                    <a href="#forgot" className="forgot-password">Forgot password?</a>
                </div>
                <button type="submit" className="sign-in-btn">Sign In</button>
            </form>
            <div className="demo-accounts">
                Demo accounts:<br />
                Teacher: teacher@example.com | Student: student@example.com
            </div>
            <div className="signup-link">
                Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
        </div>
    );
};

export default Login;