// // // src/components/Signup/Signup.js
// // import React, { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// // import { doc, setDoc } from "firebase/firestore";
// // import { auth, db } from '../../firebase/firebaseConfig';
// // import './Signup.css';

// // // Icons
// // import { FiUser, FiLock } from 'react-icons/fi';
// // import { MdOutlineEmail } from 'react-icons/md';
// // import { GrUserAdmin } from 'react-icons/gr';

// // const Signup = () => {
// //     const [fullName, setFullName] = useState('');
// //     const [email, setEmail] = useState('');
// //     const [role, setRole] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [confirmPassword, setConfirmPassword] = useState('');
// //     const [error, setError] = useState('');
// //     const navigate = useNavigate();

// //     const handleSignup = async (e) => {
// //         e.preventDefault();
// //         setError('');

// //         if (!fullName || !email || !role || !password || !confirmPassword) {
// //             setError('Please fill in all fields.');
// //             return;
// //         }
// //         if (password !== confirmPassword) {
// //             setError('Passwords do not match.');
// //             return;
// //         }
// //         if (password.length < 6) {
// //             setError('Password should be at least 6 characters long.');
// //             return;
// //         }

// //         try {
// //             // 1. Create user in Firebase Auth
// //             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
// //             const user = userCredential.user;

// //             // 2. Update user profile with full name
// //             await updateProfile(user, { displayName: fullName });

// //             // 3. Create a user document in Firestore to store role and other details
// //             await setDoc(doc(db, "users", user.uid), {
// //                 uid: user.uid,
// //                 fullName,
// //                 email,
// //                 role,
// //                 createdAt: new Date(),
// //             });

// //             console.log("Account created successfully for:", user.email);
// //             alert('Account created successfully! You will now be redirected to the login page.');
// //             navigate('/login');

// //         } catch (error) {
// //             if (error.code === 'auth/email-already-in-use') {
// //                 setError('This email address is already in use.');
// //             } else if (error.code === 'auth/invalid-email') {
// //                 setError('The email address is not valid.');
// //             } else if (error.code === 'auth/weak-password') {
// //                 setError('The password is too weak.');
// //             } else {
// //                 setError('Failed to create an account. Please try again.');
// //                 console.error("Signup Error:", error.code, error.message);
// //             }
// //         }
// //     };

// //     return (
// //         <div className="signup-page-container">
// //             <div className="signup-form-container">
// //                 <h2>Join ClassSync</h2>
// //                 <p>Create your account to get started</p>
// //                 {error && <div className="error-message">{error}</div>}
// //                 <form onSubmit={handleSignup}>
// //                     <div className="form-group">
// //                         <label htmlFor="fullName">Full Name</label>
// //                         <div className="input-wrapper">
// //                             <FiUser className="input-icon" />
// //                             <input
// //                                 type="text"
// //                                 id="fullName"
// //                                 placeholder="Enter your full name"
// //                                 value={fullName}
// //                                 onChange={(e) => setFullName(e.target.value)}
// //                                 required
// //                             />
// //                         </div>
// //                     </div>
// //                     <div className="form-group">
// //                         <label htmlFor="email">Email Address</label>
// //                         <div className="input-wrapper">
// //                             <MdOutlineEmail className="input-icon" />
// //                             <input
// //                                 type="email"
// //                                 id="email"
// //                                 placeholder="Enter your email"
// //                                 value={email}
// //                                 onChange={(e) => setEmail(e.target.value)}
// //                                 required
// //                             />
// //                         </div>
// //                     </div>
// //                     <div className="form-group">
// //                         <label htmlFor="role">Role</label>
// //                         <div className="input-wrapper role-select-wrapper">
// //                             <GrUserAdmin className="input-icon" />
// //                             <select
// //                                 id="role"
// //                                 value={role}
// //                                 onChange={(e) => setRole(e.target.value)}
// //                                 required
// //                             >
// //                                 <option value="" disabled>Select your role</option>
// //                                 <option value="teacher">Teacher</option>
// //                                 <option value="student">Student</option>
// //                             </select>
// //                         </div>
// //                     </div>
// //                     <div className="form-group">
// //                         <label htmlFor="password">Password</label>
// //                         <div className="input-wrapper">
// //                             <FiLock className="input-icon" />
// //                             <input
// //                                 type="password"
// //                                 id="password"
// //                                 placeholder="Create a password"
// //                                 value={password}
// //                                 onChange={(e) => setPassword(e.target.value)}
// //                                 required
// //                             />
// //                         </div>
// //                     </div>
// //                     <div className="form-group">
// //                         <label htmlFor="confirmPassword">Confirm Password</label>
// //                         <div className="input-wrapper">
// //                             <FiLock className="input-icon" />
// //                             <input
// //                                 type="password"
// //                                 id="confirmPassword"
// //                                 placeholder="Confirm your password"
// //                                 value={confirmPassword}
// //                                 onChange={(e) => setConfirmPassword(e.target.value)}
// //                                 required
// //                             />
// //                         </div>
// //                     </div>
// //                     <button type="submit" className="create-account-btn">Create Account</button>
// //                 </form>
// //                 <div className="login-link">
// //                     Already have an account? <Link to="/login">Sign in</Link>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Signup;

// // src/components/Signup/Signup.js
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from '../../firebase/firebaseConfig';
// import './Signup.css'; // Your existing Signup.css with 2-step styles

// // Icons
// import { FiUser, FiLock } from 'react-icons/fi';
// import { MdOutlineEmail } from 'react-icons/md';
// import { GrUserAdmin } from 'react-icons/gr';

// const Signup = () => {
//     const [step, setStep] = useState(1);
//     const [fullName, setFullName] = useState('');
//     const [email, setEmail] = useState('');
//     const [role, setRole] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate(); // Initialize navigate hook

//     const handleNextStep = (e) => {
//         e.preventDefault();
//         if (!fullName || !email || !role) {
//             setError('Please fill in all fields before continuing.');
//             return;
//         }
//         setError('');
//         setStep(2);
//     };

//     const handlePrevStep = () => {
//         setError('');
//         setStep(1);
//     };

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         setError('');

//         if (password.length < 6) {
//             setError('Password should be at least 6 characters long.');
//             return;
//         }
//         if (password !== confirmPassword) {
//             setError('Passwords do not match.');
//             return;
//         }

//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;
//             await updateProfile(user, { displayName: fullName });
//             await setDoc(doc(db, "users", user.uid), {
//                 uid: user.uid,
//                 fullName,
//                 email,
//                 role,
//                 createdAt: new Date(),
//             });

//             alert('Account created successfully! Redirecting to login...');
//             navigate('/login'); // Redirect to login page on success

//         } catch (error) {
//             if (error.code === 'auth/email-already-in-use') {
//                 setError('This email address is already in use.');
//             } else {
//                 setError('Failed to create an account. Please try again.');
//             }
//             console.error("Signup Error:", error);
//         }
//     };

//     return (
//         <div className="signup-form-container">
//             <h2>Join ClassSync</h2>
//             <p>Create your account to get started</p>
//             {error && <div className="error-message">{error}</div>}

//             <form onSubmit={handleSignup}>
//                 {step === 1 && (
//                     <>
//                         {/* Step 1 Fields... */}
//                         <div className="form-group">
//                             <label htmlFor="fullName">Full Name</label>
//                             <div className="input-wrapper"><FiUser className="input-icon" /><input type="text" id="fullName" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required /></div>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="email">Email Address</label>
//                             <div className="input-wrapper"><MdOutlineEmail className="input-icon" /><input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="role">Role</label>
//                             <div className="input-wrapper role-select-wrapper"><GrUserAdmin className="input-icon" /><select id="role" value={role} onChange={(e) => setRole(e.target.value)} required><option value="" disabled>Select your role</option><option value="teacher">Teacher</option><option value="student">Student</option></select></div>
//                         </div>
//                         <button type="button" onClick={handleNextStep} className="create-account-btn">Next</button>
//                     </>
//                 )}

//                 {step === 2 && (
//                     <>
//                         {/* Step 2 Fields... */}
//                         <div className="form-group">
//                             <label htmlFor="password">Password</label>
//                             <div className="input-wrapper"><FiLock className="input-icon" /><input type="password" id="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="confirmPassword">Confirm Password</label>
//                             <div className="input-wrapper"><FiLock className="input-icon" /><input type="password" id="confirmPassword" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /></div>
//                         </div>
//                         <div className="button-group">
//                             <button type="button" onClick={handlePrevStep} className="back-btn">Back</button>
//                             <button type="submit" className="create-account-btn">Create Account</button>
//                         </div>
//                     </>
//                 )}
//             </form>

//             <div className="login-link">
//                 Already have an account? <Link to="/login">Sign in</Link>
//             </div>
//         </div>
//     );
// };

// export default Signup;

// src/components/Signup/Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../firebase/firebaseConfig';
import './Signup.css';

// Icons
import { FiUser, FiLock } from 'react-icons/fi';
import { MdOutlineEmail } from 'react-icons/md';
import { GrUserAdmin } from 'react-icons/gr';

const Signup = () => {
    const [step, setStep] = useState(1);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize navigate hook

    const handleNextStep = (e) => {
        e.preventDefault();
        if (!fullName || !email || !role) {
            setError('Please fill in all fields before continuing.');
            return;
        }
        setError('');
        setStep(2);
    };

    const handlePrevStep = () => {
        setError('');
        setStep(1);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Password should be at least 6 characters long.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: fullName });
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                fullName,
                email,
                role,
                createdAt: new Date(),
            });

            alert('Account created successfully! Redirecting to login...');
            
            // This is the line that takes the user to the Sign In page
            navigate('/login'); 

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('This email address is already in use.');
            } else {
                setError('Failed to create an account. Please try again.');
            }
            console.error("Signup Error:", error);
        }
    };

    return (
        <div className="signup-form-container">
            <h2>Join ClassSync</h2>
            <p>Create your account to get started</p>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSignup}>
                {step === 1 && (
                    <>
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <div className="input-wrapper"><FiUser className="input-icon" /><input type="text" id="fullName" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required /></div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper"><MdOutlineEmail className="input-icon" /><input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <div className="input-wrapper role-select-wrapper"><GrUserAdmin className="input-icon" /><select id="role" value={role} onChange={(e) => setRole(e.target.value)} required><option value="" disabled>Select your role</option><option value="teacher">Teacher</option><option value="student">Student</option></select></div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper"><FiLock className="input-icon" /><input type="password" id="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="input-wrapper"><FiLock className="input-icon" /><input type="password" id="confirmPassword" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /></div>
                        </div>
                        <button type="button" onClick={handleNextStep} className="create-account-btn">Next</button> 
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper"><FiLock className="input-icon" /><input type="password" id="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="input-wrapper"><FiLock className="input-icon" /><input type="password" id="confirmPassword" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /></div>
                        </div>
                        <div className="button-group">
                            {/* <button type="button" onClick={handlePrevStep} className="back-btn">Back</button> */}
                            <button type="submit" className="create-account-btn">Create Account</button>
                        </div>
                    </>
                )}
            </form>

            <div className="login-link">
                Already have an account? <Link to="/login">Sign in</Link>
            </div>
        </div>
    );
};

export default Signup;