// // src/pages/SignupPage.js
// import React from 'react';
// import AuthLayout from '../../layouts/AuthLayout';
// import Signup from '../../components/Signup/Signup';

// const SignupPage = () => {
//     return (
//         <AuthLayout>
//             <Signup />
//         </AuthLayout>
//     );
// };

// export default SignupPage;
// src/pages/SignupPage/SignupPage.jsx

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from '../../firebase/firebaseConfig';
// import './SignupPage.css'; // Make sure you have SignupPage.css in the same folder

// // Import Icons
// import { FiUser, FiLock } from 'react-icons/fi';
// import { MdOutlineEmail } from 'react-icons/md';
// import { GrUserAdmin } from 'react-icons/gr';

// const SignupPage = () => {
//     const [fullName, setFullName] = useState('');
//     const [email, setEmail] = useState('');
//     const [role, setRole] = useState('teacher'); // Default to teacher
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         if (password.length < 6) {
//             setError("Password must be at least 6 characters long.");
//             return;
//         }
//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             // Add the full name to the user's profile
//             await updateProfile(user, { displayName: fullName });

//             // Store additional user info (like role) in Firestore
//             await setDoc(doc(db, "users", user.uid), {
//                 uid: user.uid,
//                 fullName,
//                 email,
//                 role,
//                 createdAt: new Date(),
//             });

//             // On success, send them to the login page to sign in
//             navigate('/login');
//         } catch (err) {
//             setError("Failed to create an account. The email may already be in use.");
//             console.error(err);
//         }
//     };

//     return (
//         <div className="signup-page-container">
//             <div className="signup-form-container">
//                 <h2>Join EduClass</h2>
//                 <p>Create your account to get started</p>
//                 {error && <p className="error-message">{error}</p>}
//                 <form onSubmit={handleSignup}>
//                     <div className="form-group">
//                         <label>Full Name</label>
//                         <div className="input-wrapper">
//                             <FiUser className="input-icon" />
//                             <input type="text" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label>Email Address</label>
//                         <div className="input-wrapper">
//                             <MdOutlineEmail className="input-icon" />
//                             <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label>Role</label>
//                         <div className="input-wrapper">
//                             <GrUserAdmin className="input-icon" />
//                             <select value={role} onChange={(e) => setRole(e.target.value)} required>
//                                 <option value="teacher">Teacher</option>
//                                 <option value="student">Student</option>
//                             </select>
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label>Password</label>
//                         <div className="input-wrapper">
//                             <FiLock className="input-icon" />
//                             <input type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                         </div>
//                     </div>
//                     <button type="submit" className="create-account-btn">Create Account</button>
//                 </form>
//                 <div className="login-link">
//                     Already have an account? <Link to="/login">Sign in</Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignupPage;
// src/pages/SignupPage/SignupPage.jsx
// src/pages/SignupPage/SignupPage.jsx

// src/pages/SignupPage/SignupPage.jsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from '../../firebase/firebaseConfig';
// import './SignupPage.css';

// // Import Icons
// import { FiUser, FiLock } from 'react-icons/fi';
// import { MdOutlineEmail } from 'react-icons/md';
// import { GrUserAdmin } from 'react-icons/gr';
// import { BsPeople, BsChatDots } from 'react-icons/bs';
// import { BiBookContent } from 'react-icons/bi';

// const SignupPage = () => {
//     const [fullName, setFullName] = useState('');
//     const [email, setEmail] = useState('');
//     const [role, setRole] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate(); // We still need navigate for the final redirect

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         setError('');

//         if (password !== confirmPassword) {
//             setError("Passwords do not match.");
//             return;
//         }
//         if (password.length < 6) {
//             setError("Password must be at least 6 characters long.");
//             return;
//         }

//         try {
//             // 1. Create the user. This also logs them in temporarily.
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             // 2. Add their name to their profile
//             await updateProfile(user, { displayName: fullName });

//             // 3. Save extra info (like role) to Firestore
//             await setDoc(doc(db, "users", user.uid), {
//                 uid: user.uid, fullName, email, role, createdAt: new Date(),
//             });

//             // 4. Manually sign the user out immediately.
//             // This is the most important step to prevent the dashboard flash.
//             await signOut(auth);
            
//             // 5. NOW, after they are fully signed out, navigate to the login page.
//             // Pass a state to show a success message on the login page.
//             navigate('/login', { state: { message: 'Signup successful! Please log in.' } });

//         } catch (err) {
//             setError("Failed to create an account. The email may already be in use.");
//             console.error("Signup error:", err);
//         }
//     };

//     return (
//         <div className="signup-page-container">
//             <div className="signup-layout">
//                 {/* Left Info Panel */}
//                 <div className="info-panel">
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
//                     <div className="signup-form-container">
//                         <h2>Join ClassSync</h2>
//                         <p className="form-subtitle">Create your account to get started</p>
//                         {error && <p className="error-message">{error}</p>}
//                         <form onSubmit={handleSignup}>
//                             {/* Form inputs remain the same */}
//                              <div className="form-group">
//                                 <label>Full Name</label>
//                                 <div className="input-wrapper">
//                                     <FiUser className="input-icon" />
//                                     <input type="text" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
//                                 </div>
//                             </div>
//                             <div className="form-group">
//                                 <label>Email Address</label>
//                                 <div className="input-wrapper">
//                                     <MdOutlineEmail className="input-icon" />
//                                     <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                                 </div>
//                             </div>
//                             <div className="form-group">
//                                 <label>Role</label>
//                                 <div className="input-wrapper">
//                                     <GrUserAdmin className="input-icon" />
//                                     <select value={role} onChange={(e) => setRole(e.target.value)} required>
//                                         <option value="" disabled>Select your role</option>
//                                         <option value="teacher">Teacher</option>
//                                         <option value="student">Student</option>
//                                     </select>
//                                 </div>
//                             </div>
//                             <div className="form-group">
//                                 <label>Password</label>
//                                 <div className="input-wrapper">
//                                     <FiLock className="input-icon" />
//                                     <input type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                                 </div>
//                             </div>
//                             <div className="form-group">
//                                 <label>Confirm Password</label>
//                                 <div className="input-wrapper">
//                                     <FiLock className="input-icon" />
//                                     <input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
//                                 </div>
//                             </div>
//                             <button type="submit" className="create-account-btn">Create Account</button>
//                         </form>
//                         <div className="login-link">
//                             Already have an account? <Link to="/login">Sign in</Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignupPage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../firebase/firebaseConfig';
import './SignupPage.css';

// Import Icons
import { FiUser, FiLock } from 'react-icons/fi';
import { MdOutlineEmail } from 'react-icons/md';
import { GrUserAdmin } from 'react-icons/gr';
import { BsPeople, BsChatDots } from 'react-icons/bs';
import { BiBookContent } from 'react-icons/bi';
// --- ADDED THIS ICON IMPORT ---
import { IoSchoolOutline } from 'react-icons/io5'; 

const SignupPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: fullName });

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid, fullName, email, role, createdAt: new Date(),
            });

            await signOut(auth);
            
            navigate('/login', { state: { message: 'Signup successful! Please log in.' } });

        } catch (err) {
            setError("Failed to create an account. The email may already be in use.");
            console.error("Signup error:", err);
        }
    };

    return (
        <div className="signup-page-container">
            <div className="signup-layout">
                {/* Left Info Panel */}
                <div className="info-panel">
                    {/* --- LOGO ADDED HERE --- */}
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
                    <div className="signup-form-container">
                        <h2>Join ClassSync</h2>
                        <p className="form-subtitle">Create your account to get started</p>
                        {error && <p className="error-message">{error}</p>}
                        <form onSubmit={handleSignup}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <div className="input-wrapper">
                                    <FiUser className="input-icon" />
                                    <input type="text" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <div className="input-wrapper">
                                    <MdOutlineEmail className="input-icon" />
                                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Role</label>
                                <div className="input-wrapper">
                                    <GrUserAdmin className="input-icon" />
                                    <select value={role} onChange={(e) => setRole(e.target.value)} required>
                                        <option value="" disabled>Select your role</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="student">Student</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <div className="input-wrapper">
                                    <FiLock className="input-icon" />
                                    <input type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <div className="input-wrapper">
                                    <FiLock className="input-icon" />
                                    <input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                </div>
                            </div>
                            <button type="submit" className="create-account-btn">Create Account</button>
                        </form>
                        <div className="login-link">
                            Already have an account? <Link to="/login">Sign in</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;