// // // src/pages/StudentDashboard/StudentDashboard.jsx
// // // src/pages/StudentDashboard/StudentDashboard.jsx
// // import React, { useState, useEffect } from 'react';
// // import { auth, db } from '../../firebase/firebaseConfig';
// // import { collection, onSnapshot, doc, updateDoc, arrayUnion } from 'firebase/firestore';
// // import './StudentDashboard.css';

// // // Icons
// // import { FaBook, FaClipboardList, FaCommentDots, FaCalendarAlt } from 'react-icons/fa';

// // const StudentDashboard = () => {
// //     const [allClasses, setAllClasses] = useState([]);
// //     const [enrolledClasses, setEnrolledClasses] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const user = auth.currentUser;

// //     // Fetch all classes and filter them
// //     useEffect(() => {
// //         if (!user) return;

// //         const unsubscribe = onSnapshot(collection(db, 'classes'), (snapshot) => {
// //             const classesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

// //             // Filter classes into enrolled and available
// //             const enrolled = [];
// //             const available = [];

// //             classesData.forEach(cls => {
// //                 if (cls.enrolledStudents && cls.enrolledStudents.includes(user.uid)) {
// //                     enrolled.push(cls);
// //                 } else {
// //                     available.push(cls);
// //                 }
// //             });

// //             setAllClasses(available);
// //             setEnrolledClasses(enrolled);
// //             setLoading(false);
// //         });

// //         return () => unsubscribe();
// //     }, [user]);

// //     // Function to handle joining a class
// //     const handleJoinClass = async (classId) => {
// //         if (!user) return;

// //         const classRef = doc(db, 'classes', classId);

// //         try {
// //             // Atomically add a new student UID to the "enrolledStudents" array field.
// //             await updateDoc(classRef, {
// //                 enrolledStudents: arrayUnion(user.uid)
// //             });
// //             alert("Successfully joined the class!");
// //         } catch (error) {
// //             console.error("Error joining class: ", error);
// //             alert("Failed to join class. Please try again.");
// //         }
// //     };

// //     return (
// //         <div className="student-dashboard-content-area">
// //             <h1 className="student-dashboard-title">Student Dashboard</h1>
// //             <p className="welcome-message">Welcome back, {user?.displayName || 'Student'}!</p>

// //             <div className="stats-container">
// //                 <div className="stat-card">
// //                     <FaBook className="stat-icon blue" />
// //                     <div className="stat-info">
// //                         <h3>{loading ? '...' : enrolledClasses.length}</h3>
// //                         <p>Enrolled Classes</p>
// //                     </div>
// //                 </div>
// //                 <div className="stat-card">
// //                     <FaClipboardList className="stat-icon green" />
// //                     <div className="stat-info"><h3>0</h3><p>Assignments</p></div>
// //                 </div>
// //                 <div className="stat-card">
// //                     <FaCommentDots className="stat-icon purple" />
// //                     <div className="stat-info"><h3>0</h3><p>Messages</p></div>
// //                 </div>
// //                 <div className="stat-card">
// //                     <FaCalendarAlt className="stat-icon orange" />
// //                     <div className="stat-info"><h3>0</h3><p>Upcoming</p></div>
// //                 </div>
// //             </div>

// //             <div className="available-classes-header">
// //                 <h2>Available Classes</h2>
// //                 <p>Browse and join classes</p>
// //             </div>

// //             <div className="class-list-container">
// //                 {loading ? <p>Loading available classes...</p> : 
// //                  allClasses.length > 0 ? (
// //                     allClasses.map(cls => (
// //                         <div key={cls.id} className="class-card">
// //                             <div className="class-card-info">
// //                                 <p>Available for enrollment</p>
// //                                 <p>Click to enroll</p>
// //                             </div>
// //                             <button 
// //                                 className="join-class-btn"
// //                                 onClick={() => handleJoinClass(cls.id)}
// //                             >
// //                                 Join Class
// //                             </button>
// //                         </div>
// //                     ))
// //                 ) : (
// //                     <p>No new classes are available to join at this time.</p>
// //                 )}
// //             </div>
// //             {/* You can add another section here to display enrolledClasses */}
// //         </div>
// //     );
// // };

// // export default StudentDashboard;
// // src/pages/StudentDashboard/StudentDashboard.jsx
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { auth, db } from '../../firebase/firebaseConfig';
// // import { collection, onSnapshot, doc, updateDoc, arrayUnion } from 'firebase/firestore';
// // import './StudentDashboard.css';

// // // Import Icons
// // import { FaBook, FaClipboardList, FaCommentDots, FaCalendarAlt } from 'react-icons/fa';

// // const StudentDashboard = () => {
// //     const [availableClasses, setAvailableClasses] = useState([]);
// //     const [enrolledClasses, setEnrolledClasses] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const user = auth.currentUser;
// //     const navigate = useNavigate();

// //     // This effect runs once to fetch all class data from Firestore
// //     useEffect(() => {
// //         if (!user) {
// //             setLoading(false);
// //             return;
// //         }

// //         // Listen for real-time updates on the top-level 'classes' collection
// //         const unsubscribe = onSnapshot(collection(db, 'classes'), (snapshot) => {
// //             const allFetchedClasses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

// //             // Prepare arrays to filter the classes
// //             const myEnrolled = [];
// //             const stillAvailable = [];

// //             // Loop through every class to see if the student is enrolled
// //             allFetchedClasses.forEach(cls => {
// //                 // The 'enrolledStudents' field must be an array in your Firestore document
// //                 if (cls.enrolledStudents && cls.enrolledStudents.includes(user.uid)) {
// //                     myEnrolled.push(cls);
// //                 } else {
// //                     stillAvailable.push(cls);
// //                 }
// //             });

// //             // Update the state with the filtered lists
// //             setEnrolledClasses(myEnrolled);
// //             setAvailableClasses(stillAvailable);
// //             setLoading(false);
// //         });

// //         // Cleanup the listener when the component unmounts
// //         return () => unsubscribe();
// //     }, [user]);

// //     // Function to handle joining a new class
// //     const handleJoinClass = async (classId) => {
// //         if (!user) return;

// //         const classRef = doc(db, 'classes', classId);

// //         try {
// //             // Use arrayUnion to safely add the student's UID to the enrolledStudents array.
// //             // This prevents duplicate entries.
// //             await updateDoc(classRef, {
// //                 enrolledStudents: arrayUnion(user.uid)
// //             });
// //             alert("Successfully enrolled in the class!");
// //         } catch (error) {
// //             console.error("Error joining class: ", error);
// //             alert("Failed to join the class. Please try again.");
// //         }
// //     };

// //     // Function to navigate to the class detail page when an enrolled class is clicked
// //     const openClassDetails = (classId) => {
// //         navigate(`/class/${classId}`);
// //     };

// //     return (
// //         <div className="student-dashboard-content-area">
// //             <h1 className="student-dashboard-title">Student Dashboard</h1>
// //             <p className="welcome-message">Welcome back, {user?.displayName || 'Student'}!</p>

// //             {/* Stats Cards Section */}
// //             <div className="stats-container">
// //                 <div className="stat-card">
// //                     <FaBook className="stat-icon blue" />
// //                     <div className="stat-info">
// //                         <h3>{loading ? '...' : enrolledClasses.length}</h3>
// //                         <p>Enrolled Classes</p>
// //                     </div>
// //                 </div>
// //                 <div className="stat-card">
// //                     <FaClipboardList className="stat-icon green" />
// //                     <div className="stat-info"><h3>0</h3><p>Assignments</p></div>
// //                 </div>
// //                 <div className="stat-card">
// //                     <FaCommentDots className="stat-icon purple" />
// //                     <div className="stat-info"><h3>0</h3><p>Messages</p></div>
// //                 </div>
// //                 <div className="stat-card">
// //                     <FaCalendarAlt className="stat-icon orange" />
// //                     <div className="stat-info"><h3>0</h3><p>Upcoming</p></div>
// //                 </div>
// //             </div>

// //             {/* Enrolled Classes Section */}
// //             <div className="classes-section-header">
// //                 <h2>My Classes</h2>
// //                 <p>Classes you are currently enrolled in</p>
// //             </div>
// //             <div className="class-list-container">
// //                  {loading ? <p>Loading...</p> : 
// //                   enrolledClasses.length > 0 ? (
// //                     enrolledClasses.map(cls => (
// //                         <div key={cls.id} className="enrolled-class-card">
// //                            <div className="enrolled-class-info">
// //                                 <h4>{cls.className}</h4>
// //                                 <p>Teacher: {cls.teacherName}</p>
// //                                 <p>Meeting Link:{cls.meetingLink}</p>
// //                            </div>
// //                            <button onClick={() => openClassDetails(cls.id)} className="open-class-btn">Open</button>
// //                         </div>
// //                     ))
// //                 ) : (
// //                     <p>You have not joined any classes yet. Browse available classes below.</p>
// //                 )}
// //             </div>

// //             {/* Available Classes Section */}
// //             <div className="available-classes-header">
// //                 <h2>Available Classes</h2>
// //                 <p>Browse and join classes created by teachers</p>
// //             </div>
// //             <div className="class-list-container">
// //                 {loading ? <p>Loading available classes...</p> : 
// //                  availableClasses.length > 0 ? (
// //                     availableClasses.map(cls => (
// //                         <div key={cls.id} className="available-class-card">
// //                             <div className="class-card-info">
// //                                 <h4>{cls.className}</h4>
// //                                 <p>Taught by: {cls.teacherName}</p>
// //                                 <p>Meeting Link:{cls.meetingLink}</p>
// //                             </div>
// //                             <button 
// //                                 className="join-class-btn"
// //                                 onClick={() => handleJoinClass(cls.id)}
// //                             >
// //                                 Join Class
// //                             </button>
// //                         </div>
// //                     ))
// //                 ) : (
// //                     <p>There are no new classes available to join at this time.</p>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default StudentDashboard;
// // src/pages/StudentDashboard/StudentDashboard.jsx
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { auth, db } from '../../firebase/firebaseConfig'; // <-- CORRECTED: It's 'db', not 'dbOf'
// // import { collection, onSnapshot, doc, updateDoc, arrayUnion } from 'firebase/firestore';
// // import './StudentDashboard.css';

// // // Import Icons
// // import { FaBook, FaClipboardList, FaCommentDots, FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';

// // const StudentDashboard = () => {
// //     const [availableClasses, setAvailableClasses] = useState([]);
// //     const [enrolledClasses, setEnrolledClasses] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const user = auth.currentUser;
// //     const navigate = useNavigate();

// //     // Fetch and filter all classes from Firebase
// //     useEffect(() => {
// //         if (!user) {
// //             setLoading(false);
// //             return;
// //         }

// //         const unsubscribe = onSnapshot(collection(db, 'classes'), (snapshot) => {
// //             const allFetchedClasses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

// //             const myEnrolled = [];
// //             const stillAvailable = [];

// //             allFetchedClasses.forEach(cls => {
// //                 if (cls.enrolledStudents && cls.enrolledStudents.includes(user.uid)) {
// //                     myEnrolled.push(cls);
// //                 } else {
// //                     stillAvailable.push(cls);
// //                 }
// //             });

// //             setEnrolledClasses(myEnrolled);
// //             setAvailableClasses(stillAvailable);
// //             setLoading(false);
// //         });

// //         return () => unsubscribe();
// //     }, [user]);

// //     // Function to handle joining a new class
// //     const handleJoinClass = async (classId) => {
// //         if (!user) return;

// //         const classRef = doc(db, 'classes', classId);

// //         try {
// //             await updateDoc(classRef, {
// //                 enrolledStudents: arrayUnion(user.uid)
// //             });
// //             alert("Successfully enrolled in the class!");
// //         } catch (error) {
// //             console.error("Error joining class: ", error);
// //             alert("Failed to join the class. Please try again.");
// //         }
// //     };

// //     // Function to navigate to the class detail page
// //     const openClassDetails = (classId) => {
// //         navigate(`/class/${classId}`);
// //     };

// //     return (
// //         <div className="student-dashboard-content-area">
// //             <h1 className="student-dashboard-title">Student Dashboard</h1>
// //             <p className="welcome-message">Welcome back, {user?.displayName || 'Student'}!</p>

// //             {/* Stats Cards Section */}
// //             <div className="stats-container">
// //                 <div className="stat-card">
// //                     <FaBook className="stat-icon blue" />
// //                     <div className="stat-info">
// //                         <h3>{loading ? '...' : enrolledClasses.length}</h3>
// //                         <p>Enrolled Classes</p>
// //                     </div>
// //                 </div>
// //                 <div className="stat-card">
// //                     <FaClipboardList className="stat-icon green" />
// //                     <div className="stat-info"><h3>0</h3><p>Assignments</p></div>
// //                 </div>
// //                 <div className="stat-card">
// //                     <FaCommentDots className="stat-icon purple" />
// //                     <div className="stat-info"><h3>0</h3><p>Messages</p></div>
// //                 </div>
// //                 <div className="stat-card">
// //                     <FaCalendarAlt className="stat-icon orange" />
// //                     <div className="stat-info"><h3>0</h3><p>Upcoming</p></div>
// //                 </div>
// //             </div>

// //             {/* Enrolled Classes Section */}
// //             <div className="classes-section-header">
// //                 <h2>My Classes</h2>
// //                 <p>Classes you are currently enrolled in</p>
// //             </div>
// //             <div className="class-list-container">
// //                  {loading ? <p>Loading...</p> : 
// //                   enrolledClasses.length > 0 ? (
// //                     enrolledClasses.map(cls => (
// //                         <div key={cls.id} className="enrolled-class-card">
// //                            <div className="enrolled-class-info">
// //                                 <h4>{cls.className}</h4>
// //                                 <p>Teacher: {cls.teacherName}</p>
// //                                 {/* --- UPDATED: Making the link clickable --- */}
// //                                 {cls.meetingLink && (
// //                                     <a href={cls.meetingLink} target="_blank" rel="noopener noreferrer" className="meeting-link">
// //                                         <FaExternalLinkAlt size={12} /> View Meeting
// //                                     </a>
// //                                 )}
// //                            </div>
// //                            <button onClick={() => openClassDetails(cls.id)} className="open-class-btn">Enter</button>
// //                         </div>
// //                     ))
// //                 ) : (
// //                     <p>You have not joined any classes yet. Browse available classes below.</p>
// //                 )}
// //             </div>

// //             {/* Available Classes Section */}
// //             <div className="available-classes-header">
// //                 <h2>Available Classes</h2>
// //                 <p>Browse and join classes created by teachers</p>
// //             </div>
// //             <div className="class-list-container">
// //                 {loading ? <p>Loading available classes...</p> : 
// //                  availableClasses.length > 0 ? (
// //                     availableClasses.map(cls => (
// //                         <div key={cls.id} className="available-class-card">
// //                             <div className="class-card-info">
// //                                 <h4>{cls.className}</h4>
// //                                 <p>Taught by: {cls.teacherName}</p>
// //                                 {/* --- UPDATED: Making the link clickable --- */}
// //                                 {cls.meetingLink && (
// //                                      <a href={cls.meetingLink} target="_blank" rel="noopener noreferrer" className="meeting-link">
// //                                         <FaExternalLinkAlt size={12} /> View Meeting
// //                                     </a>
// //                                 )}
// //                             </div>
// //                             <button 
// //                                 className="join-class-btn"
// //                                 onClick={() => handleJoinClass(cls.id)}
// //                             >
// //                                 Join Class
// //                             </button>
// //                         </div>
// //                     ))
// //                 ) : (
// //                     <p>There are no new classes available to join at this time.</p>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default StudentDashboard;
// // src/pages/StudentDashboard/StudentDashboard.jsx

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db } from '../../firebase/firebaseConfig';
// import { collection, onSnapshot, doc, updateDoc, arrayUnion } from 'firebase/firestore';
// import './StudentDashboard.css';

// // Import Icons
// import { FaBook, FaClipboardList, FaCommentDots, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

// const StudentDashboard = () => {
//     const [availableClasses, setAvailableClasses] = useState([]);
//     const [enrolledClasses, setEnrolledClasses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const user = auth.currentUser;
//     const navigate = useNavigate();

//     // Fetch and filter all classes from Firebase
//     useEffect(() => {
//         if (!user) return; // Exit if user is not available

//         const unsubscribe = onSnapshot(collection(db, 'classes'), (snapshot) => {
//             const classesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

//             const myEnrolled = [];
//             const stillAvailable = [];

//             classesData.forEach(cls => {
//                 if (cls.enrolledStudents && cls.enrolledStudents.includes(user.uid)) {
//                     myEnrolled.push(cls);
//                 } else {
//                     stillAvailable.push(cls);
//                 }
//             });

//             setEnrolledClasses(myEnrolled);
//             setAvailableClasses(stillAvailable);
//             setLoading(false);
//         });

//         // Cleanup listener on unmount
//         return () => unsubscribe();
//     }, [user]);

//     // Function to handle joining a new class
//     const handleJoinClass = async (classId) => {
//         if (!user) return;
//         const classRef = doc(db, 'classes', classId);
//         try {
//             await updateDoc(classRef, {
//                 enrolledStudents: arrayUnion(user.uid)
//             });
//             alert("Successfully enrolled in the class!");
//         } catch (error) {
//             console.error("Error joining class: ", error);
//         }
//     };

//     // Function to navigate to the specific class detail page
//     const enterClass = (classId) => {
//         navigate(`/class/${classId}`);
//     };

//     return (
//         <div className="student-dashboard-content-area">
//             <h1 className="dashboard-title">Student Dashboard</h1>
//             <p className="welcome-message">Welcome back, {user?.displayName || 'Student'}!</p>

//             {/* Stats Cards Section */}
//             <div className="stats-container">
//                 <div className="stat-card">
//                     <FaBook className="stat-icon blue" />
//                     <div className="stat-info">
//                         <h3>{loading ? '...' : enrolledClasses.length}</h3>
//                         <p>Enrolled Classes</p>
//                     </div>
//                 </div>
//                 <div className="stat-card">
//                     <FaClipboardList className="stat-icon green" />
//                     <div className="stat-info"><h3>0</h3><p>Assignments</p></div>
//                 </div>
//                 <div className="stat-card">
//                     <FaCommentDots className="stat-icon purple" />
//                     <div className="stat-info"><h3>0</h3><p>Messages</p></div>
//                 </div>
//                 <div className="stat-card">
//                     <FaCalendarAlt className="stat-icon orange" />
//                     <div className="stat-info"><h3>0</h3><p>Upcoming</p></div>
//                 </div>
//             </div>

//             {/* "My Classes" (Enrolled) Section */}
//             <div className="section-header">
//                 <h2>My Classes</h2>
//                 <p>Your enrolled classes</p>
//             </div>
//             <div className="class-list-container">
//                 {loading ? <p>Loading your classes...</p> :
//                     enrolledClasses.length > 0 ? (
//                         enrolledClasses.map(cls => (
//                             <div key={cls.id} className="my-class-card">
//                                 <div className="my-class-info">
//                                     <div className="my-class-header">
//                                         <h4>{cls.className}</h4>
//                                         {cls.meetingLink && (
//                                         // If it exists, render an <a> tag
//                                         <a
//                                             href={cls.meetingLink}          // The URL the link will go to
//                                             target="_blank"                 // This makes it open in a new tab
//                                             rel="noopener noreferrer"       // Important for security with target="_blank"
//                                             className="meeting-link"        // A class for styling
//                                         >
//                                             Open Meeting Link
//                                         </a>
//                                     )}
//                                         <FaArrowRight />
//                                     </div>
//                                     <p className="enrolled-text">Enrolled class</p>
//                                 </div>
//                                 <div className="my-class-footer">
//                                     <p>Click to enter class</p>
//                                     <button onClick={() => enterClass(cls.id)} className="enter-btn">Enter</button>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p>You are not enrolled in any classes yet. Join a class below!</p>
//                     )}
//             </div>

//             {/* "Available Classes" Section */}
//             <div className="section-header">
//                 <h2>Available Classes</h2>
//                 <p>Browse and join classes</p>
//             </div>
//             <div className="class-list-container">
//                 {loading ? <p>Loading available classes...</p> :
//                     availableClasses.length > 0 ? (
//                         availableClasses.map(cls => (
//                             <div key={cls.id} className="available-class-card">
//                                 <div className="available-class-info">
//                                     <h4>{cls.className}</h4>
//                                     <p>Taught by: {cls.teacherName || 'Unknown Teacher'}</p>
//                                     {/* <p>Meeting Link: {cls. meetingLink}</p> */}
//                                     {cls.meetingLink && (
//                                         // If it exists, render an <a> tag
//                                         <a
//                                             href={cls.meetingLink}          // The URL the link will go to
//                                             target="_blank"                 // This makes it open in a new tab
//                                             rel="noopener noreferrer"       // Important for security with target="_blank"
//                                             className="meeting-link"        // A class for styling
//                                         >
//                                             Open Meeting Link
//                                         </a>
//                                     )}
//                                 </div>
//                                 <button
//                                     className="join-btn"
//                                     onClick={() => handleJoinClass(cls.id)}
//                                 >
//                                     Join
//                                 </button>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No new classes are available to join.</p>
//                     )}
//             </div>
//         </div>
//     );
// };

// export default StudentDashboard;
// src/pages/StudentDashboard/StudentDashboard.jsx
// src/pages/StudentDashboard/StudentDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db } from '../../firebase/firebaseConfig';
// import { collection, onSnapshot, doc, updateDoc, arrayUnion } from 'firebase/firestore';
// import './StudentDashboard.css';

// // --- THIS IS THE CORRECTED IMPORT LINE ---
// import { FaBook, FaClipboardList, FaCommentDots, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

// const StudentDashboard = () => {
//     const [availableClasses, setAvailableClasses] = useState([]);
//     const [enrolledClasses, setEnrolledClasses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const user = auth.currentUser;
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!user) return;
//         const unsubscribe = onSnapshot(collection(db, 'classes'), (snapshot) => {
//             const classesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             const myEnrolled = [];
//             const stillAvailable = [];

//             classesData.forEach(cls => {
//                 if (cls.enrolledStudents?.includes(user.uid)) {
//                     myEnrolled.push(cls);
//                 } else {
//                     stillAvailable.push(cls);
//                 }
//             });

//             setEnrolledClasses(myEnrolled);
//             setAvailableClasses(stillAvailable);
//             setLoading(false);
//         });
//         return () => unsubscribe();
//     }, [user]);

//     const handleJoinClass = async (classId) => {
//         if (!user) return;
//         const classRef = doc(db, 'classes', classId);
//         try {
//             await updateDoc(classRef, {
//                 enrolledStudents: arrayUnion(user.uid)
//             });
//             alert("Successfully enrolled in the class!");
//         } catch (error) {
//             console.error("Error joining class: ", error);
//         }
//     };

//     const enterClass = (classId) => {
//         navigate(`/class/${classId}`);
//     };

//     return (
//         <div className="student-dashboard-content-area">
//             <h1 className="dashboard-title">Student Dashboard</h1>
//             <p className="welcome-message">Welcome back, {user?.displayName || 'Student'}!</p>

//             <div className="stats-container">
//                 <div className="stat-card">
//                     <FaBook className="stat-icon blue" />
//                     <div className="stat-info">
//                         <h3>{loading ? '...' : enrolledClasses.length}</h3>
//                         <p>Enrolled Classes</p>
//                     </div>
//                 </div>
//                 <div className="stat-card">
//                     <FaClipboardList className="stat-icon green" />
//                     <div className="stat-info"><h3>0</h3><p>Assignments</p></div>
//                 </div>
//                 <div className="stat-card">
//                     {/* This icon will now work */}
//                     <FaCommentDots className="stat-icon purple" />
//                     <div className="stat-info"><h3>0</h3><p>Messages</p></div>
//                 </div>
//                 <div className="stat-card">
//                     {/* This icon will now work */}
//                     <FaCalendarAlt className="stat-icon orange" />
//                     <div className="stat-info"><h3>0</h3><p>Upcoming</p></div>
//                 </div>
//             </div>

//             <div className="section-header">
//                 <h2>My Classes</h2>
//             </div>
//             <div className="class-list-container">
//                 {loading ? <p>Loading...</p> : enrolledClasses.length > 0 ? (
//                     enrolledClasses.map(cls => (
//                         <div key={cls.id} className="my-class-card">
//                             <div className="my-class-info">
//                                 <div className="my-class-header">
//                                     <h4>{cls.className}</h4>
//                                     <FaArrowRight />
//                                 </div>
//                                 <p className="enrolled-text">Taught by: {cls.teacherName}</p>
//                                 {cls.meetingLink && (
//                                     // If it exists, render an <a> tag
//                                     <a
//                                         href={cls.meetingLink}          // The URL the link will go to
//                                         target="_blank"                 // This makes it open in a new tab
//                                         rel="noopener noreferrer"       // Important for security with target="_blank"
//                                         className="meeting-link"        // A class for styling
//                                     >
//                                         Open Meeting Link
//                                     </a>
//                                 )}
//                             </div>
//                             <div className="my-class-footer">
//                                 <p>Click to enter class</p>
//                                 <button onClick={() => enterClass(cls.id)} className="enter-btn">Enter</button>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>You are not enrolled in any classes yet.</p>
//                 )}
//             </div>

//             <div className="section-header">
//                 <h2>Available Classes</h2>
//             </div>
//             <div className="class-list-container">
//                 {loading ? <p>Loading...</p> : availableClasses.length > 0 ? (
//                     availableClasses.map(cls => (
//                         <div key={cls.id} className="available-class-card">
//                             <div className="available-class-info">
//                                 <h4>{cls.className}</h4>
//                                 <p>Taught by: {cls.teacherName || 'Unknown'}</p>
//                                 {cls.meetingLink && (
//                                     // If it exists, render an <a> tag
//                                     <a
//                                         href={cls.meetingLink}          // The URL the link will go to
//                                         target="_blank"                 // This makes it open in a new tab
//                                         rel="noopener noreferrer"       // Important for security with target="_blank"
//                                         className="meeting-link"        // A class for styling
//                                     >
//                                         Open Meeting Link
//                                     </a>
//                                 )}
//                             </div>
//                             <button className="join-btn" onClick={() => handleJoinClass(cls.id)}>Join Class</button>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No new classes are available.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default StudentDashboard;---------------------corrected
// src/pages/StudentDashboard/StudentDashboard.jsx

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db } from '../../firebase/firebaseConfig';
// import { collection, onSnapshot, doc, updateDoc, arrayUnion, getDocs } from 'firebase/firestore';
// import { FaBook, FaClipboardList, FaCommentDots, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
// import './StudentDashboard.css';

// const StudentDashboard = () => {
//     const [availableClasses, setAvailableClasses] = useState([]);
//     const [enrolledClasses, setEnrolledClasses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [assignmentCount, setAssignmentCount] = useState(0);
//     const [messageCount, setMessageCount] = useState(0);
//     const [upcomingCount, setUpcomingCount] = useState(0);
//     const user = auth.currentUser;
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!user) return;
//         const unsubscribe = onSnapshot(collection(db, 'classes'), async (snapshot) => {
//             const classesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             const myEnrolled = [];
//             const stillAvailable = [];

//             for (const cls of classesData) {
//                 if (cls.enrolledStudents?.includes(user.uid)) {
//                     myEnrolled.push(cls);
//                 } else {
//                     stillAvailable.push(cls);
//                 }
//             }

//             setEnrolledClasses(myEnrolled);
//             setAvailableClasses(stillAvailable);

//             // Count assignments for enrolled classes
//             let totalAssignments = 0;
//             let totalUpcoming = 0;
//             for (const cls of myEnrolled) {
//                 const assignSnap = await getDocs(collection(db, 'classes', cls.id, 'assignments'));
//                 totalAssignments += assignSnap.size;
//                 // count upcoming: assignments with dueDate in future
//                 assignSnap.docs.forEach(doc => {
//                     const data = doc.data();
//                     if (data.dueDate && new Date(data.dueDate) > new Date()) {
//                         totalUpcoming += 1;
//                     }
//                 });
//             }
//             setAssignmentCount(totalAssignments);
//             setUpcomingCount(totalUpcoming);

//             // For messages, you could count chat messages similarly if you have a collection
//             // Here we'll just reset to zero or fetch from a 'chats' subcollection
//             setMessageCount(0);

//             setLoading(false);
//         });
//         return () => unsubscribe();
//     }, [user]);

//     const handleJoinClass = async (classId) => {
//         if (!user) return;
//         const classRef = doc(db, 'classes', classId);
//         try {
//             await updateDoc(classRef, {
//                 enrolledStudents: arrayUnion(user.uid)
//             });
//             alert("Successfully enrolled in the class!");
//         } catch (error) {
//             console.error("Error joining class: ", error);
//         }
//     };

//     const enterClass = (classId) => {
//         navigate(`/class/${classId}`);
//     };

//     return (
//         <div className="student-dashboard-content-area">
//             <h1 className="dashboard-title">Student Dashboard</h1>
//             <p className="welcome-message">Welcome back, {user?.displayName || 'Student'}!</p>

//             <div className="stats-container">
//                 <div className="stat-card">
//                     <FaBook className="stat-icon blue" />
//                     <div className="stat-info">
//                         <h3>{loading ? '...' : enrolledClasses.length}</h3>
//                         <p>Enrolled Classes</p>
//                     </div>
//                 </div>
//                 <div className="stat-card">
//                     <FaClipboardList className="stat-icon green" />
//                     <div className="stat-info">
//                         <h3>{loading ? '...' : assignmentCount}</h3>
//                         <p>Assignments</p>
//                     </div>
//                 </div>
//                 <div className="stat-card">
//                     <FaCommentDots className="stat-icon purple" />
//                     <div className="stat-info">
//                         <h3>{loading ? '...' : messageCount}</h3>
//                         <p>Messages</p>
//                     </div>
//                 </div>
//                 <div className="stat-card">
//                     <FaCalendarAlt className="stat-icon orange" />
//                     <div className="stat-info">
//                         <h3>{loading ? '...' : upcomingCount}</h3>
//                         <p>Upcoming</p>
//                     </div>
//                 </div>
//             </div>

//             <div className="section-header">
//                 <h2>My Classes</h2>
//             </div>
//             <div className="class-list-container">
//                 {loading ? <p>Loading...</p> : enrolledClasses.length > 0 ? (
//                     enrolledClasses.map(cls => (
//                         <div key={cls.id} className="my-class-card">
//                             <div className="my-class-info">
//                                 <div className="my-class-header">
//                                     <h4>{cls.className}</h4>
//                                     <FaArrowRight />
//                                 </div>
//                                 <p className="enrolled-text">Taught by: {cls.teacherName}</p>
//                                 {cls.meetingLink && (
//                                     <a
//                                         href={cls.meetingLink}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="meeting-link"
//                                     >
//                                         Open Meeting Link
//                                     </a>
//                                 )}
//                             </div>
//                             <div className="my-class-footer">
//                                 <p>Click to enter class</p>
//                                 <button onClick={() => enterClass(cls.id)} className="enter-btn">Enter</button>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>You are not enrolled in any classes yet.</p>
//                 )}
//             </div>

//             <div className="section-header">
//                 <h2>Available Classes</h2>
//             </div>
//             <div className="class-list-container">
//                 {loading ? <p>Loading...</p> : availableClasses.length > 0 ? (
//                     availableClasses.map(cls => (
//                         <div key={cls.id} className="available-class-card">
//                             <div className="available-class-info">
//                                 <h4>{cls.className}</h4>
//                                 <p>Taught by: {cls.teacherName || 'Unknown'}</p>
//                                 {cls.meetingLink && (
//                                     <a
//                                         href={cls.meetingLink}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="meeting-link"
//                                     >
//                                         Open Meeting Link
//                                     </a>
//                                 )}
//                             </div>
//                             <button className="join-btn" onClick={() => handleJoinClass(cls.id)}>Join Class</button>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No new classes are available.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default StudentDashboard;----------------this one also correct
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db } from '../../firebase/firebaseConfig';
// import { collection, onSnapshot, doc, updateDoc, arrayUnion, getDocs } from 'firebase/firestore';
// import { FaBook, FaClipboardList, FaCommentDots, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
// import './StudentDashboard.css';

// const StudentDashboard = () => {
//     const [availableClasses, setAvailableClasses] = useState([]);
//     const [enrolledClasses, setEnrolledClasses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [assignmentCount, setAssignmentCount] = useState(0);
//     const [messageCount, setMessageCount] = useState(0);
//     const [upcomingCount, setUpcomingCount] = useState(0);
//     const user = auth.currentUser;
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!user) return;

//         const unsubscribe = onSnapshot(collection(db, 'classes'), async (snapshot) => {
//             const classesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             const myEnrolled = [];
//             const stillAvailable = [];

//             for (const cls of classesData) {
//                 if (cls.enrolledStudents?.includes(user.uid)) {
//                     myEnrolled.push(cls);
//                 } else {
//                     stillAvailable.push(cls);
//                 }
//             }

//             setEnrolledClasses(myEnrolled);
//             setAvailableClasses(stillAvailable);

//             let totalAssignments = 0;
//             let totalUpcoming = 0;
//             let totalMessages = 0;

//             for (const cls of myEnrolled) {
//                 const assignSnap = await getDocs(collection(db, 'classes', cls.id, 'assignments'));
//                 totalAssignments += assignSnap.size;

//                 assignSnap.docs.forEach(doc => {
//                     const data = doc.data();
//                     if (data.dueDate && new Date(data.dueDate) > new Date()) {
//                         totalUpcoming += 1;
//                     }
//                 });

//                 const chatSnap = await getDocs(collection(db, 'classes', cls.id, 'chats'));
//                 totalMessages += chatSnap.size;
//             }

//             setAssignmentCount(totalAssignments);
//             setUpcomingCount(totalUpcoming);
//             setMessageCount(totalMessages);
//             setLoading(false);
//         });

//         return () => unsubscribe();
//     }, [user]);

//     const handleJoinClass = async (classId) => {
//         if (!user) return;
//         const classRef = doc(db, 'classes', classId);
//         try {
//             await updateDoc(classRef, {
//                 enrolledStudents: arrayUnion(user.uid)
//             });
//             alert("Successfully enrolled in the class!");
//         } catch (error) {
//             console.error("Error joining class: ", error);
//         }
//     };

//     const enterClass = (classId) => {
//         navigate(`/class/${classId}`);
//     };

//     return (
//         <div className="student-dashboard-content-area">
//             <h1 className="dashboard-title">Student Dashboard</h1>
//             <p className="welcome-message">Welcome back, {user?.displayName || 'Student'}!</p>

//             <div className="stats-container">
//                 <div className="stat-card">
//                     <FaBook className="stat-icon blue" />
//                     <div className="stat-info">
//                         <h3>{loading ? '...' : enrolledClasses.length}</h3>
//                         <p>Enrolled Classes</p>
//                     </div>
//                 </div>
//                 <div className="stat-card">
//                     <FaClipboardList className="stat-icon green" />
//                     <div className="stat-info">
//                         <h3>{loading ? '...' : assignmentCount}</h3>
//                         <p>Assignments</p>
//                     </div>
//                 </div>
//                 <div className="stat-card">
//                     <FaCommentDots className="stat-icon purple" />
//                     <div className="stat-info">
//                         <h3>{loading ? '...' : messageCount}</h3>
//                         <p>Messages</p>
//                     </div>
//                 </div>
//                 <div className="stat-card">
//                     <FaCalendarAlt className="stat-icon orange" />
//                     <div className="stat-info">
//                         <h3>{loading ? '...' : upcomingCount}</h3>
//                         <p>Upcoming</p>
//                     </div>
//                 </div>
//             </div>

//             <div className="section-header">
//                 <h2>My Classes</h2>
//             </div>
//             <div className="class-list-container">
//                 {loading ? <p>Loading...</p> : enrolledClasses.length > 0 ? (
//                     enrolledClasses.map(cls => (
//                         <div key={cls.id} className="my-class-card">
//                             <div className="my-class-info">
//                                 <div className="my-class-header">
//                                     <h4>{cls.className}</h4>
//                                     <FaArrowRight />
//                                 </div>
//                                 <p className="enrolled-text">Taught by: {cls.teacherName}</p>
//                                 {cls.meetingLink && (
//                                     <a
//                                         href={cls.meetingLink}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="meeting-link"
//                                     >
//                                         Open Meeting Link
//                                     </a>
//                                 )}
//                             </div>
//                             <div className="my-class-footer">
//                                 <p>Click to enter class</p>
//                                 <button onClick={() => enterClass(cls.id)} className="enter-btn">Enter</button>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>You are not enrolled in any classes yet.</p>
//                 )}
//             </div>

//             <div className="section-header">
//                 <h2>Available Classes</h2>
//             </div>
//             <div className="class-list-container">
//                 {loading ? <p>Loading...</p> : availableClasses.length > 0 ? (
//                     availableClasses.map(cls => (
//                         <div key={cls.id} className="available-class-card">
//                             <div className="available-class-info">
//                                 <h4>{cls.className}</h4>
//                                 <p>Taught by: {cls.teacherName || 'Unknown'}</p>
//                                 {cls.meetingLink && (
//                                     <a
//                                         href={cls.meetingLink}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="meeting-link"
//                                     >
//                                         Open Meeting Link
//                                     </a>
//                                 )}
//                             </div>
//                             <button className="join-btn" onClick={() => handleJoinClass(cls.id)}>Join Class</button>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No new classes are available.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default StudentDashboard;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db } from '../../firebase/firebaseConfig';
// import {
//   collection,
//   onSnapshot,
//   doc,
//   updateDoc,
//   arrayUnion,
//   getDocs
// } from 'firebase/firestore';
// import {
//   FaBook,
//   FaClipboardList,
//   FaCommentDots,
//   FaCalendarAlt,
//   FaArrowRight
// } from 'react-icons/fa';
// import './StudentDashboard.css';

// const StudentDashboard = () => {
//   const [availableClasses, setAvailableClasses] = useState([]);
//   const [enrolledClasses, setEnrolledClasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [assignmentCount, setAssignmentCount] = useState(0);
//   const [messageCount, setMessageCount] = useState(0);
//   const [upcomingCount, setUpcomingCount] = useState(0);
//   const user = auth.currentUser;
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) return;

//     const unsubscribe = onSnapshot(collection(db, 'classes'), async (snapshot) => {
//       const classesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       const myEnrolled = [];
//       const stillAvailable = [];

//       for (const cls of classesData) {
//         if (cls.enrolledStudents?.includes(user.uid)) {
//           myEnrolled.push(cls);
//         } else {
//           stillAvailable.push(cls);
//         }
//       }

//       setEnrolledClasses(myEnrolled);
//       setAvailableClasses(stillAvailable);

//       // Count assignments, upcoming, and unread messages
//       let totalAssignments = 0;
//       let totalUpcoming = 0;
//       let totalUnreadMessages = 0;

//       for (const cls of myEnrolled) {
//         const assignSnap = await getDocs(collection(db, 'classes', cls.id, 'assignments'));
//         totalAssignments += assignSnap.size;

//         assignSnap.docs.forEach(doc => {
//           const data = doc.data();
//           if (data.dueDate && new Date(data.dueDate) > new Date()) {
//             totalUpcoming += 1;
//           }
//         });

//         const messagesSnap = await getDocs(collection(db, 'classes', cls.id, 'messages'));
//         messagesSnap.docs.forEach(doc => {
//           const msg = doc.data();
//           if (msg.unreadBy?.includes(user.uid)) {
//             totalUnreadMessages += 1;
//           }
//         });
//       }

//       setAssignmentCount(totalAssignments);
//       setUpcomingCount(totalUpcoming);
//       setMessageCount(totalUnreadMessages);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, [user]);

//   const handleJoinClass = async (classId) => {
//     if (!user) return;
//     const classRef = doc(db, 'classes', classId);
//     try {
//       await updateDoc(classRef, {
//         enrolledStudents: arrayUnion(user.uid)
//       });
//       alert("Successfully enrolled in the class!");
//     } catch (error) {
//       console.error("Error joining class: ", error);
//     }
//   };

//   const enterClass = (classId) => {
//     navigate(`/class/${classId}`);
//   };

//   return (
//     <div className="student-dashboard-content-area">
//       <h1 className="dashboard-title">Student Dashboard</h1>
//       <p className="welcome-message">Welcome back, {user?.displayName || 'Student'}!</p>

//       <div className="stats-container">
//         <div className="stat-card">
//           <FaBook className="stat-icon blue" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : enrolledClasses.length}</h3>
//             <p>Enrolled Classes</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <FaClipboardList className="stat-icon green" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : assignmentCount}</h3>
//             <p>Assignments</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <FaCommentDots className="stat-icon purple" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : messageCount}</h3>
//             <p>Unread Messages</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <FaCalendarAlt className="stat-icon orange" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : upcomingCount}</h3>
//             <p>Upcoming</p>
//           </div>
//         </div>
//       </div>

//       <div className="section-header">
//         <h2>My Classes</h2>
//       </div>
//       <div className="class-list-container">
//         {loading ? <p>Loading...</p> : enrolledClasses.length > 0 ? (
//           enrolledClasses.map(cls => (
//             <div key={cls.id} className="my-class-card">
//               <div className="my-class-info">
//                 <div className="my-class-header">
//                   <h4>{cls.className}</h4>
//                   <FaArrowRight />
//                 </div>
//                 <p className="enrolled-text">Taught by: {cls.teacherName}</p>
//                 {cls.meetingLink && (
//                   <a
//                     href={cls.meetingLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="meeting-link"
//                   >
//                     Open Meeting Link
//                   </a>
//                 )}
//               </div>
//               <div className="my-class-footer">
//                 <p>Click to enter class</p>
//                 <button onClick={() => enterClass(cls.id)} className="enter-btn">Enter</button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>You are not enrolled in any classes yet.</p>
//         )}
//       </div>

//       <div className="section-header">
//         <h2>Available Classes</h2>
//       </div>
//       <div className="class-list-container">
//         {loading ? <p>Loading...</p> : availableClasses.length > 0 ? (
//           availableClasses.map(cls => (
//             <div key={cls.id} className="available-class-card">
//               <div className="available-class-info">
//                 <h4>{cls.className}</h4>
//                 <p>Taught by: {cls.teacherName || 'Unknown'}</p>
//                 {cls.meetingLink && (
//                   <a
//                     href={cls.meetingLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="meeting-link"
//                   >
//                     Open Meeting Link
//                   </a>
//                 )}
//               </div>
//               <button className="join-btn" onClick={() => handleJoinClass(cls.id)}>Join Class</button>
//             </div>
//           ))
//         ) : (
//           <p>No new classes are available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;----------------correct
// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db } from '../../firebase/firebaseConfig';
// import {
//   collection,
//   onSnapshot,
//   doc,
//   updateDoc,
//   arrayUnion,
//   query
// } from 'firebase/firestore';
// import {
//   FaBook,
//   FaClipboardList,
//   FaCommentDots,
//   FaCalendarAlt,
//   FaArrowRight
// } from 'react-icons/fa';
// import './StudentDashboard.css';

// const StudentDashboard = () => {
//   const [availableClasses, setAvailableClasses] = useState([]);
//   const [enrolledClasses, setEnrolledClasses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // State for stats
//   const [assignmentCount, setAssignmentCount] = useState(0);
//   const [messageCount, setMessageCount] = useState(0);
//   const [upcomingCount, setUpcomingCount] = useState(0);

//   const user = auth.currentUser;
//   const navigate = useNavigate();

//   // A ref to hold stats for each class individually. This avoids extra re-renders.
//   const classStatsRef = useRef({});

//   // --- EFFECT #1: Manages the list of enrolled and available classes ---
//   useEffect(() => {
//     if (!user) return;

//     setLoading(true);
//     const classesQuery = query(collection(db, 'classes'));
//     const unsubscribe = onSnapshot(classesQuery, (snapshot) => {
//       const classesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       const myEnrolled = [];
//       const stillAvailable = [];

//       for (const cls of classesData) {
//         if (cls.enrolledStudents?.includes(user.uid)) {
//           myEnrolled.push(cls);
//         } else {
//           stillAvailable.push(cls);
//         }
//       }

//       setEnrolledClasses(myEnrolled);
//       setAvailableClasses(stillAvailable);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, [user]);

//   // --- EFFECT #2: Manages all stat listeners based on enrolled classes ---
//   useEffect(() => {
//     if (!user || enrolledClasses.length === 0) {
//       // If there are no enrolled classes, reset all stats and stop.
//       setAssignmentCount(0);
//       setMessageCount(0);
//       setUpcomingCount(0);
//       return;
//     }

//     // This function aggregates the stats from our ref and updates the state
//     const updateAllCounts = () => {
//       let totalAssignments = 0;
//       let totalUpcoming = 0;
//       let totalMessages = 0;

//       Object.values(classStatsRef.current).forEach(stats => {
//         totalAssignments += stats.assignments || 0;
//         totalUpcoming += stats.upcoming || 0;
//         totalMessages += stats.messages || 0;
//       });

//       setAssignmentCount(totalAssignments);
//       setUpcomingCount(totalUpcoming);
//       setMessageCount(totalMessages);
//     };

//     // Array to hold the unsubscribe function for each listener we create
//     const unsubscribers = [];

//     enrolledClasses.forEach(cls => {
//       // Listener for Assignments for this specific class
//       const assignmentsQuery = query(collection(db, 'classes', cls.id, 'assignments'));
//       const assignmentsUnsub = onSnapshot(assignmentsQuery, (snapshot) => {
//         let upcoming = 0;
//         snapshot.docs.forEach(doc => {
//           const data = doc.data();
//           // IMPORTANT: Firestore timestamps must be converted with .toDate()
//           if (data.dueDate && data.dueDate.toDate() > new Date()) {
//             upcoming += 1;
//           }
//         });
        
//         // Update the ref with stats for THIS class
//         classStatsRef.current[cls.id] = { ...classStatsRef.current[cls.id], assignments: snapshot.size, upcoming };
//         updateAllCounts(); // Recalculate totals
//       });
//       unsubscribers.push(assignmentsUnsub);

//       // Listener for Messages for this specific class
//       const messagesQuery = query(collection(db, 'classes', cls.id, 'messages'));
//       const messagesUnsub = onSnapshot(messagesQuery, (snapshot) => {
//         let unread = 0;
//         snapshot.docs.forEach(doc => {
//           if (doc.data().unreadBy?.includes(user.uid)) {
//             unread += 1;
//           }
//         });

//         // Update the ref with stats for THIS class
//         classStatsRef.current[cls.id] = { ...classStatsRef.current[cls.id], messages: unread };
//         updateAllCounts(); // Recalculate totals
//       });
//       unsubscribers.push(messagesUnsub);
//     });

//     // The cleanup function for THIS effect. It is CRUCIAL.
//     // It runs when the component unmounts OR when 'enrolledClasses' changes.
//     return () => {
//       unsubscribers.forEach(unsub => unsub());
//       classStatsRef.current = {}; // Reset the ref
//     };
//   }, [enrolledClasses, user]); // Dependency array ensures this runs when enrolled classes change


//   // --- Functions to handle user actions (these remain the same) ---
//   const handleJoinClass = async (classId) => {
//     if (!user) return;
//     const classRef = doc(db, 'classes', classId);
//     try {
//       await updateDoc(classRef, {
//         enrolledStudents: arrayUnion(user.uid)
//       });
//       alert("Successfully enrolled in the class!");
//     } catch (error) {
//       console.error("Error joining class: ", error);
//     }
//   };

//   const enterClass = (classId) => {
//     navigate(`/class/${classId}`);
//   };

//   // --- JSX (Rendering) ---
//   return (
//     <div className="student-dashboard-content-area">
//       <h1 className="dashboard-title">Student Dashboard</h1>
//       <p className="welcome-message">Welcome back, {user?.displayName || 'Student'}!</p>

//       {/* Stats Container */}
//       <div className="stats-container">
//         <div className="stat-card">
//           <FaBook className="stat-icon blue" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : enrolledClasses.length}</h3>
//             <p>Enrolled Classes</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <FaClipboardList className="stat-icon green" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : assignmentCount}</h3>
//             <p>Total Assignments</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <FaCommentDots className="stat-icon purple" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : messageCount}</h3>
//             <p>Unread Messages</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <FaCalendarAlt className="stat-icon orange" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : upcomingCount}</h3>
//             <p>Upcoming Due Dates</p>
//           </div>
//         </div>
//       </div>

//       {/* My Classes Section */}
//       <div className="section-header">
//         <h2>My Classes</h2>
//       </div>
//       <div className="class-list-container">
//         {loading ? <p>Loading...</p> : enrolledClasses.length > 0 ? (
//           enrolledClasses.map(cls => (
//             <div key={cls.id} className="my-class-card" onClick={() => enterClass(cls.id)}>
//               <div className="my-class-info">
//                 <div className="my-class-header">
//                   <h4>{cls.className}</h4>
//                   <p className="enrolled-text">Taught by: {cls.teacherName}</p>
//                 </div>
//               </div>
//               <div className="my-class-footer">
//                 <p>Click to enter class</p>
//                 <button className="enter-btn">Enter <FaArrowRight /></button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>You are not enrolled in any classes yet.</p>
//         )}
//       </div>

//       {/* Available Classes Section */}
//       <div className="section-header">
//         <h2>Available Classes to Join</h2>
//       </div>
//       <div className="class-list-container">
//         {loading ? <p>Loading...</p> : availableClasses.length > 0 ? (
//           availableClasses.map(cls => (
//             <div key={cls.id} className="available-class-card">
//               <div className="available-class-info">
//                 <h4>{cls.className}</h4>
//                 <p>Taught by: {cls.teacherName || 'Unknown'}</p>
//               </div>
//               <button className="join-btn" onClick={() => handleJoinClass(cls.id)}>Join Class</button>
//             </div>
//           ))
//         ) : (
//           <p>No new classes are available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;
// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db } from '../../firebase/firebaseConfig';
// import {
//   collection,
//   onSnapshot,
//   doc,
//   updateDoc,
//   arrayUnion,
//   // --- IMPORT arrayRemove ---
//   arrayRemove,
//   query
// } from 'firebase/firestore';
// import {
//   FaBook,
//   FaClipboardList,
//   FaCommentDots,
//   FaCalendarAlt,
//   FaArrowRight
// } from 'react-icons/fa';
// import './StudentDashboard.css';

// const StudentDashboard = () => {
//   const [availableClasses, setAvailableClasses] = useState([]);
//   const [enrolledClasses, setEnrolledClasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [assignmentCount, setAssignmentCount] = useState(0);
//   const [messageCount, setMessageCount] = useState(0);
//   const user = auth.currentUser;
//   const navigate = useNavigate();
//   const classStatsRef = useRef({});

//   // Effect to manage class lists (no changes here)
//   useEffect(() => {
//     if (!user) return;
//     setLoading(true);
//     const classesQuery = query(collection(db, 'classes'));
//     const unsubscribe = onSnapshot(classesQuery, (snapshot) => {
//       const classesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       const myEnrolled = [];
//       const stillAvailable = [];
//       for (const cls of classesData) {
//         if (cls.enrolledStudents?.includes(user.uid)) {
//           myEnrolled.push(cls);
//         } else {
//           stillAvailable.push(cls);
//         }
//       }
//       setEnrolledClasses(myEnrolled);
//       setAvailableClasses(stillAvailable);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, [user]);

//   // Effect to manage stats (no changes here)
//   useEffect(() => {
//     if (!user || enrolledClasses.length === 0) {
//       setAssignmentCount(0);
//       setMessageCount(0);
//       return;
//     }
//     const updateAllCounts = () => {
//       let totalAssignments = 0;
//       let totalMessages = 0;
//       Object.values(classStatsRef.current).forEach(stats => {
//         totalAssignments += stats.assignments || 0;
//         totalMessages += stats.messages || 0;
//       });
//       setAssignmentCount(totalAssignments);
//       setMessageCount(totalMessages);
//     };
//     const unsubscribers = [];
//     enrolledClasses.forEach(cls => {
//       const assignmentsQuery = query(collection(db, 'classes', cls.id, 'assignments'));
//       const assignmentsUnsub = onSnapshot(assignmentsQuery, (snapshot) => {
//         classStatsRef.current[cls.id] = { ...classStatsRef.current[cls.id], assignments: snapshot.size };
//         updateAllCounts();
//       });
//       unsubscribers.push(assignmentsUnsub);
//       const messagesQuery = query(collection(db, 'classes', cls.id, 'messages'));
//       const messagesUnsub = onSnapshot(messagesQuery, (snapshot) => {
//         let unread = 0;
//         snapshot.docs.forEach(doc => {
//           if (doc.data().unreadBy?.includes(user.uid)) {
//             unread += 1;
//           }
//         });
//         classStatsRef.current[cls.id] = { ...classStatsRef.current[cls.id], messages: unread };
//         updateAllCounts();
//       });
//       unsubscribers.push(messagesUnsub);
//     });
//     return () => {
//       unsubscribers.forEach(unsub => unsub());
//       classStatsRef.current = {};
//     };
//   }, [enrolledClasses, user]);

//   // --- NEW FUNCTION TO LEAVE A CLASS ---
//   const handleLeaveClass = async (classId) => {
//     // Add a confirmation dialog before proceeding
//     if (!window.confirm("Are you sure you want to leave this class? All your data for this class will be inaccessible.")) {
//       return;
//     }

//     if (!user) return;
//     const classRef = doc(db, "classes", classId);
//     try {
//       // Use arrayRemove to pull the user's ID from the enrollment list
//       await updateDoc(classRef, {
//         enrolledStudents: arrayRemove(user.uid),
//       });
//       alert("You have successfully left the class.");
//     } catch (error) {
//       console.error("Error leaving class: ", error);
//       alert("Failed to leave the class. Please try again.");
//     }
//   };

//   const handleJoinClass = async (classId) => {
//     // ... (this function remains the same)
//     if (!user) return;
//     const classRef = doc(db, 'classes', classId);
//     try {
//       await updateDoc(classRef, {
//         enrolledStudents: arrayUnion(user.uid)
//       });
//       alert("Successfully enrolled in the class!");
//     } catch (error) {
//       console.error("Error joining class: ", error);
//     }
//   };

//   const enterClass = (classId) => {
//     navigate(`/class/${classId}`);
//   };

//   return (
//     <div className="student-dashboard-content-area">
//       <h1 className="dashboard-title">Student Dashboard</h1>
//       <p className="welcome-message">Welcome back, {user?.displayName || 'Student'}!</p>

//       {/* Stats Container (no changes here) */}
//       <div className="stats-container">
//         <div className="stat-card">
//           <FaBook className="stat-icon blue" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : enrolledClasses.length}</h3>
//             <p>Enrolled Classes</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <FaClipboardList className="stat-icon green" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : assignmentCount}</h3>
//             <p>Total Assignments</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <FaCommentDots className="stat-icon purple" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : messageCount}</h3>
//             <p>Unread Messages</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <FaCalendarAlt className="stat-icon orange" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : availableClasses.length}</h3>
//             <p>Available Classes</p>
//           </div>
//         </div>
//       </div>

//       {/* My Classes Section */}
//       <div className="section-header">
//         <h2>My Classes</h2>
//       </div>
//       <div className="class-list-container">
//         {loading ? <p>Loading...</p> : enrolledClasses.length > 0 ? (
//           enrolledClasses.map(cls => (
//             // The main card is still clickable to enter the class
//             <div key={cls.id} className="my-class-card" onClick={() => enterClass(cls.id)}>
//               <div className="my-class-info">
//                 <div className="my-class-header">
//                   <h4>{cls.className}</h4>
//                   <p className="enrolled-text">Taught by: {cls.teacherName}</p>
//                   {cls.meetingLink && (
//                   <a
//                     href={cls.meetingLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="meeting-link"
//                   >
//                     Open Meeting Link
//                   </a>
//                 )}
//                 </div>
//               </div>
//               <div className="my-class-footer">
//                 <p>Click card to enter</p>
//                 {/* --- UPDATED BUTTONS CONTAINER --- */}
//                 <div className="my-class-buttons">
//                   <button
//                     className="leave-btn"
//                     onClick={(e) => {
//                       e.stopPropagation(); // Prevents the card's onClick from firing
//                       handleLeaveClass(cls.id);
//                     }}
//                   >
//                     Leave
//                   </button>
//                   <button
//                     className="enter-btn"
//                     onClick={(e) => {
//                       e.stopPropagation(); // Also stop propagation here for consistency
//                       enterClass(cls.id);
//                     }}
//                   >
//                     Enter <FaArrowRight />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>You are not enrolled in any classes yet.</p>
//         )}
//       </div>

//       {/* Available Classes Section (no changes here) */}
//       <div className="section-header">
//         <h2>Available Classes to Join</h2>
//       </div>
//       <div className="class-list-container">
//         {loading ? <p>Loading...</p> : availableClasses.length > 0 ? (
//           availableClasses.map(cls => (
//             <div key={cls.id} className="available-class-card">
//               <div className="available-class-info">
//                 <h4>{cls.className}</h4>
//                 <p>Taught by: {cls.teacherName || 'Unknown'}</p>
//                 {cls.meetingLink && (
//                   <a
//                     href={cls.meetingLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="meeting-link"
//                   >
//                     Open Meeting Link
//                   </a>
//                 )}
//               </div>
//               <button className="join-btn" onClick={() => handleJoinClass(cls.id)}>Join Class</button>
//             </div>
//           ))
//         ) : (
//           <p>No new classes are available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/firebaseConfig';
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query
} from 'firebase/firestore';
import {
  FaBook,
  FaClipboardList,
  FaCommentDots,
  FaCalendarAlt,
  FaArrowRight,
  // --- IMPORT THE VIDEO ICON ---
  FaVideo
} from 'react-icons/fa';
import './StudentDashboard.css';

const StudentDashboard = () => {
  // All state and useEffect hooks remain the same...
  const [availableClasses, setAvailableClasses] = useState([]);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assignmentCount, setAssignmentCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const user = auth.currentUser;
  const navigate = useNavigate();
  const classStatsRef = useRef({});

  // Effect #1: Manages class lists (no changes)
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const classesQuery = query(collection(db, 'classes'));
    const unsubscribe = onSnapshot(classesQuery, (snapshot) => {
      const classesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const myEnrolled = [];
      const stillAvailable = [];
      for (const cls of classesData) {
        if (cls.enrolledStudents?.includes(user.uid)) {
          myEnrolled.push(cls);
        } else {
          stillAvailable.push(cls);
        }
      }
      setEnrolledClasses(myEnrolled);
      setAvailableClasses(stillAvailable);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  // Effect #2: Manages stats (no changes)
  useEffect(() => {
    if (!user || enrolledClasses.length === 0) {
      setAssignmentCount(0);
      setMessageCount(0);
      return;
    }
    const updateAllCounts = () => {
      let totalAssignments = 0;
      let totalMessages = 0;
      Object.values(classStatsRef.current).forEach(stats => {
        totalAssignments += stats.assignments || 0;
        totalMessages += stats.messages || 0;
      });
      setAssignmentCount(totalAssignments);
      setMessageCount(totalMessages);
    };
    const unsubscribers = [];
    enrolledClasses.forEach(cls => {
      const assignmentsQuery = query(collection(db, 'classes', cls.id, 'assignments'));
      const assignmentsUnsub = onSnapshot(assignmentsQuery, (snapshot) => {
        classStatsRef.current[cls.id] = { ...classStatsRef.current[cls.id], assignments: snapshot.size };
        updateAllCounts();
      });
      unsubscribers.push(assignmentsUnsub);
      const messagesQuery = query(collection(db, 'classes', cls.id, 'messages'));
      const messagesUnsub = onSnapshot(messagesQuery, (snapshot) => {
        let unread = 0;
        snapshot.docs.forEach(doc => {
          if (doc.data().unreadBy?.includes(user.uid)) {
            unread += 1;
          }
        });
        classStatsRef.current[cls.id] = { ...classStatsRef.current[cls.id], messages: unread };
        updateAllCounts();
      });
      unsubscribers.push(messagesUnsub);
    });
    return () => {
      unsubscribers.forEach(unsub => unsub());
      classStatsRef.current = {};
    };
  }, [enrolledClasses, user]);

  // All handler functions remain the same...
  const handleLeaveClass = async (classId) => {
    if (!window.confirm("Are you sure you want to leave this class?")) return;
    if (!user) return;
    const classRef = doc(db, "classes", classId);
    try {
      await updateDoc(classRef, { enrolledStudents: arrayRemove(user.uid) });
      alert("You have successfully left the class.");
    } catch (error) {
      console.error("Error leaving class: ", error);
      alert("Failed to leave the class. Please try again.");
    }
  };

  const handleJoinClass = async (classId) => {
    if (!user) return;
    const classRef = doc(db, 'classes', classId);
    try {
      await updateDoc(classRef, { enrolledStudents: arrayUnion(user.uid) });
      alert("Successfully enrolled in the class!");
    } catch (error) {
      console.error("Error joining class: ", error);
    }
  };

  const enterClass = (classId) => {
    navigate(`/class/${classId}`);
  };

  return (
    <div className="student-dashboard-content-area">
      <h1 className="dashboard-title">Student Dashboard</h1>
      <p className="welcome-message">Welcome back, {user?.displayName || 'Student'}!</p>

      {/* Stats Container (no changes) */}
      <div className="stats-container">
        <div className="stat-card"><FaBook className="stat-icon blue" /><div className="stat-info"><h3>{loading ? '...' : enrolledClasses.length}</h3><p>Enrolled Classes</p></div></div>
        <div className="stat-card"><FaClipboardList className="stat-icon green" /><div className="stat-info"><h3>{loading ? '...' : assignmentCount}</h3><p>Total Assignments</p></div></div>
        <div className="stat-card"><FaCommentDots className="stat-icon purple" /><div className="stat-info"><h3>{loading ? '...' : messageCount}</h3><p>Unread Messages</p></div></div>
        <div className="stat-card"><FaCalendarAlt className="stat-icon orange" /><div className="stat-info"><h3>{loading ? '...' : availableClasses.length}</h3><p>Available Classes</p></div></div>
      </div>

      {/* My Classes Section */}
      <div className="section-header">
        <h2>My Classes</h2>
      </div>
      <div className="class-list-container">
        {loading ? <p>Loading...</p> : enrolledClasses.length > 0 ? (
          enrolledClasses.map(cls => (
            <div key={cls.id} className="my-class-card" onClick={() => enterClass(cls.id)}>
              <div className="my-class-info">
                <div className="my-class-header">
                  <h4>{cls.className}</h4>
                  <p className="enrolled-text">Taught by: {cls.teacherName}</p>
                </div>
                {/* --- ADDED MEETING LINK HERE --- */}
                {/* This will only render if a meetingLink exists for the class */}
                {cls.meetingLink && (
                  <a
                    href={cls.meetingLink.startsWith('http') ? cls.meetingLink : `//${cls.meetingLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="meeting-link"
                    onClick={(e) => e.stopPropagation()} // Prevent card's onClick from firing
                  >
                    <FaVideo />
                    <span>Join Meeting</span>
                  </a>
                )}
              </div>
              <div className="my-class-footer">
                <p>Click card to enter</p>
                <div className="my-class-buttons">
                  <button className="leave-btn" onClick={(e) => { e.stopPropagation(); handleLeaveClass(cls.id); }}>
                    Leave
                  </button>
                  <button className="enter-btn" onClick={(e) => { e.stopPropagation(); enterClass(cls.id); }}>
                    Enter <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>You are not enrolled in any classes yet.</p>
        )}
      </div>

      {/* Available Classes Section (no changes) */}
      <div className="section-header">
        <h2>Available Classes to Join</h2>
      </div>
      {/* ... rest of the component is the same ... */}
       <div className="class-list-container">
        {loading ? <p>Loading...</p> : availableClasses.length > 0 ? (
          availableClasses.map(cls => (
            <div key={cls.id} className="available-class-card">
              <div className="available-class-info">
                <h4>{cls.className}</h4>
                <p>Taught by: {cls.teacherName || 'Unknown'}</p>
              </div>
              <button className="join-btn" onClick={() => handleJoinClass(cls.id)}>Join Class</button>
            </div>
          ))
        ) : (
          <p>No new classes are available.</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;