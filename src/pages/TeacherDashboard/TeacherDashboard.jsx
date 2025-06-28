// // src/pages/TeacherDashboard/TeacherDashboard.jsx

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db } from '../../firebase/firebaseConfig';
// import { collection, addDoc, query, where, onSnapshot, serverTimestamp } from 'firebase/firestore';
// import CreateClassModal from '../../components/CreateClassModal/CreateClassModal';
// import './TeacherDashboard.css';

// // Icons
// import { FaBookOpen, FaUserFriends, FaClipboardList, FaArrowRight, FaPlus } from 'react-icons/fa';

// const TeacherDashboard = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [classes, setClasses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const user = auth.currentUser;
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!user) return;
//         const q = query(collection(db, 'classes'), where('teacherId', '==', user.uid));
//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const classesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setClasses(classesData);
//             setLoading(false);
//         });
//         return () => unsubscribe();
//     }, [user]);

//     const handleCreateClass = async (classData) => {
//         if (!user) return;
//         try {
//             await addDoc(collection(db, 'classes'), {
//                 ...classData,
//                 teacherId: user.uid,
//                 teacherName: user.displayName,
//                 createdAt: serverTimestamp(),
//             });
//         } catch (error) {
//             console.error("Error creating class: ", error);
//         }
//     };

//     const formatDate = (timestamp) => {
//         if (!timestamp) return '...';
//         return timestamp.toDate().toLocaleDateString();
//     };

//     return (
//         <div className="dashboard-content-area">
//             <h1 className="dashboard-title">Teacher Dashboard</h1>
//             <p className="welcome-message">Welcome back, {user?.displayName || 'Teacher'}!</p>

//             {/* Stats Cards remain the same */}
//             <div className="stats-container">
//                 <div className="stat-card">
//                     <FaBookOpen className="stat-icon blue" />
//                     <div className="stat-info">
//                         <h3>{loading ? '...' : classes.length}</h3>
//                         <p>Classes</p>
//                     </div>
//                 </div>
//                 <div className="stat-card">
//                     <FaUserFriends className="stat-icon green" />
//                     <div className="stat-info"><h3>0</h3><p>Students</p></div>
//                 </div>
//                 <div className="stat-card">
//                     <FaClipboardList className="stat-icon purple" />
//                     <div className="stat-info"><h3>0</h3><p>Assignments</p></div>
//                 </div>
//             </div>

//             {/* Classes Header remains the same */}
//             <div className="classes-section-header">
//                 <h2>My Classes</h2>
//                 <button className="create-class-btn" onClick={() => setIsModalOpen(true)}>
//                     <FaPlus size={12} /> Create Class
//                 </button>
//             </div>
            
//             {/* THIS IS THE UPDATED PART: We replace the placeholder with the actual class list */}
//             <div className="class-list-container">
//                 {loading ? (
//                     // <center><p>Loading classes...</p></center>
//                     <p>Loading classes...</p>
//                 ) : classes.length > 0 ? (
//                     // If there are classes, map over them and display a card for each one
//                     classes.map(cls => (
//                         <div key={cls.id} className="class-card">
//                             <div>
//                                 <div className="class-card-header">
//                                     <h3 className="class-card-title">{cls.className}</h3>
//                                     <FaArrowRight className="class-card-arrow" />
//                                 </div>
//                                 <p className="class-card-date">Created {formatDate(cls.createdAt)}</p>
//                             </div>
//                             <div className="class-card-footer">
//                                 <p>Click to manage class</p>
//                                 <button className="open-btn" onClick={() => navigate(`/class/${cls.id}`)}>
//                                     Open
//                                 </button>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     // If there are no classes, display the "No classes yet" message
//                     <p>No classes have been created yet. Click "Create Class" to get started.</p>
//                 )}
//             </div>

//             <CreateClassModal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 onSubmit={handleCreateClass}
//             />
//         </div>
//     );
// };

// export default TeacherDashboard;
// src/pages/TeacherDashboard/TeacherDashboard.jsx

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db } from '../../firebase/firebaseConfig';
// import {
//   collection,
//   addDoc,
//   query,
//   where,
//   onSnapshot,
//   getDocs,
//   serverTimestamp
// } from 'firebase/firestore';
// import CreateClassModal from '../../components/CreateClassModal/CreateClassModal';
// import './TeacherDashboard.css';

// import {
//   FaBookOpen,
//   FaUserFriends,
//   FaClipboardList,
//   FaArrowRight,
//   FaPlus
// } from 'react-icons/fa';

// const TeacherDashboard = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [assignmentCount, setAssignmentCount] = useState(0);
//   const [studentCount, setStudentCount] = useState(0);

//   const user = auth.currentUser;
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) return;

//     const q = query(collection(db, 'classes'), where('teacherId', '==', user.uid));
//     const unsubscribe = onSnapshot(q, async (snapshot) => {
//       const classesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setClasses(classesData);
//       setLoading(false);

//       await fetchAssignmentCount(classesData);
//       await fetchStudentCount(classesData);
//     });

//     return () => unsubscribe();
//   }, [user]);

//   const fetchAssignmentCount = async (classesData) => {
//     let total = 0;
//     for (const cls of classesData) {
//       const snap = await getDocs(collection(db, 'classes', cls.id, 'assignments'));
//       total += snap.size;
//     }
//     setAssignmentCount(total);
//   };

//   const fetchStudentCount = async (classesData) => {
//     let total = 0;
//     for (const cls of classesData) {
//       const snap = await getDocs(collection(db, 'classes', cls.id, 'students'));
//       total += snap.size;
//     }
//     setStudentCount(total);
//   };

//   const handleCreateClass = async (classData) => {
//     if (!user) return;
//     try {
//       await addDoc(collection(db, 'classes'), {
//         ...classData,
//         teacherId: user.uid,
//         teacherName: user.displayName,
//         createdAt: serverTimestamp(),
//       });
//     } catch (error) {
//       console.error("Error creating class: ", error);
//     }
//   };

//   const formatDate = (timestamp) => {
//     if (!timestamp) return '...';
//     return timestamp.toDate().toLocaleDateString();
//   };

//   return (
//     <div className="dashboard-content-area">
//       <h1 className="dashboard-title">Teacher Dashboard</h1>
//       <p className="welcome-message">Welcome back, {user?.displayName || 'Teacher'}!</p>

//       <div className="stats-container">
//         <div className="stat-card">
//           <FaBookOpen className="stat-icon blue" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : classes.length}</h3>
//             <p>Classes</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <FaUserFriends className="stat-icon green" />
//           <div className="stat-info">
//             <h3>{studentCount}</h3>
//             <p>Students</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <FaClipboardList className="stat-icon purple" />
//           <div className="stat-info">
//             <h3>{assignmentCount}</h3>
//             <p>Assignments</p>
//           </div>
//         </div>
//       </div>

//       <div className="classes-section-header">
//         <h2>My Classes</h2>
//         <button className="create-class-btn" onClick={() => setIsModalOpen(true)}>
//           <FaPlus size={12} /> Create Class
//         </button>
//       </div>

//       <div className="class-list-container">
//         {loading ? (
//           <p>Loading classes...</p>
//         ) : classes.length > 0 ? (
//           classes.map(cls => (
//             <div key={cls.id} className="class-card">
//               <div>
//                 <div className="class-card-header">
//                   <h3 className="class-card-title">{cls.className}</h3>
//                   <FaArrowRight className="class-card-arrow" />
//                 </div>
//                 <p className="class-card-date">Created {formatDate(cls.createdAt)}</p>
//               </div>
//               <div className="class-card-footer">
//                 <p>Click to manage class</p>
//                 <button className="open-btn" onClick={() => navigate(`/class/${cls.id}`)}>
//                   Open
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No classes have been created yet. Click "Create Class" to get started.</p>
//         )}
//       </div>

//       <CreateClassModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSubmit={handleCreateClass}
//       />
//     </div>
//   );
// };

// export default TeacherDashboard;

// src/pages/TeacherDashboard/TeacherDashboard.jsx------------------corrected

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db } from '../../firebase/firebaseConfig';
// import {
//   collection,
//   addDoc,
//   query,
//   where,
//   onSnapshot,
//   getDocs,
//   serverTimestamp,
// } from 'firebase/firestore';
// import CreateClassModal from '../../components/CreateClassModal/CreateClassModal';
// import './TeacherDashboard.css';

// import {
//   FaBookOpen,
//   FaUserFriends,
//   FaClipboardList,
//   FaArrowRight,
//   FaPlus,
// } from 'react-icons/fa';

// const TeacherDashboard = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [studentCount, setStudentCount] = useState(0);
//   const [assignmentCount, setAssignmentCount] = useState(0);
//   const user = auth.currentUser;
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) return;
//     const q = query(collection(db, 'classes'), where('teacherId', '==', user.uid));
//     const unsubscribe = onSnapshot(q, async (snapshot) => {
//       const classesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setClasses(classesData);

//       // Count students and assignments
//       let totalStudents = 0;
//       let totalAssignments = 0;
//       for (const cls of classesData) {
//         const studentsSnap = await getDocs(collection(db, 'classes', cls.id, 'students'));
//         const assignmentsSnap = await getDocs(collection(db, 'classes', cls.id, 'assignments'));
//         totalStudents += studentsSnap.size;
//         totalAssignments += assignmentsSnap.size;
//       }
//       setStudentCount(totalStudents);
//       setAssignmentCount(totalAssignments);

//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, [user]);

//   const handleCreateClass = async (classData) => {
//     if (!user) return;
//     try {
//       await addDoc(collection(db, 'classes'), {
//         ...classData,
//         teacherId: user.uid,
//         teacherName: user.displayName,
//         createdAt: serverTimestamp(),
//       });
//     } catch (error) {
//       console.error("Error creating class: ", error);
//     }
//   };

//   const formatDate = (timestamp) => {
//     if (!timestamp) return '...';
//     return timestamp.toDate().toLocaleDateString();
//   };

//   return (
//     <div className="dashboard-content-area">
//       <h1 className="dashboard-title">Teacher Dashboard</h1>
//       <p className="welcome-message">Welcome back, {user?.displayName || 'Teacher'}!</p>

//       <div className="stats-container">
//         <div className="stat-card">
//           <FaBookOpen className="stat-icon blue" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : classes.length}</h3>
//             <p>Classes</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <FaUserFriends className="stat-icon green" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : studentCount}</h3>
//             <p>Students</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <FaClipboardList className="stat-icon purple" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : assignmentCount}</h3>
//             <p>Assignments</p>
//           </div>
//         </div>
//       </div>

//       <div className="classes-section-header">
//         <h2>My Classes</h2>
//         <button className="create-class-btn" onClick={() => setIsModalOpen(true)}>
//           <FaPlus size={12} /> Create Class
//         </button>
//       </div>

//       <div className="class-list-container">
//         {loading ? (
//           <p>Loading classes...</p>
//         ) : classes.length > 0 ? (
//           classes.map(cls => (
//             <div key={cls.id} className="class-card">
//               <div>
//                 <div className="class-card-header">
//                   <h3 className="class-card-title">{cls.className}</h3>
//                   <FaArrowRight className="class-card-arrow" />
//                 </div>
//                 <p className="class-card-date">Created {formatDate(cls.createdAt)}</p>
//               </div>
//               <div className="class-card-footer">
//                 <p>Click to manage class</p>
//                 <button className="open-btn" onClick={() => navigate(`/class/${cls.id}`)}>
//                   Open
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No classes have been created yet. Click "Create Class" to get started.</p>
//         )}
//       </div>

//       <CreateClassModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSubmit={handleCreateClass}
//       />
//     </div>
//   );
// };

// export default TeacherDashboard;

// src/pages/TeacherDashboard/TeacherDashboard.jsx

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db } from '../../firebase/firebaseConfig';
// import {
//   collection,
//   addDoc,
//   query,
//   where,
//   onSnapshot,
//   getDocs,
//   deleteDoc,
//   doc,
//   updateDoc,
//   serverTimestamp,
// } from 'firebase/firestore';
// import CreateClassModal from '../../components/CreateClassModal/CreateClassModal';
// import './TeacherDashboard.css';

// import {
//   FaBookOpen,
//   FaUserFriends,
//   FaClipboardList,
//   FaArrowRight,
//   FaPlus,
//   FaTrash,
//   FaPen,
// } from 'react-icons/fa';

// const TeacherDashboard = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [studentCount, setStudentCount] = useState(0);
//   const [assignmentCount, setAssignmentCount] = useState(0);
//   const user = auth.currentUser;
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) return;
//     const q = query(collection(db, 'classes'), where('teacherId', '==', user.uid));
//     const unsubscribe = onSnapshot(q, async (snapshot) => {
//       const classesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setClasses(classesData);

//       let totalStudents = 0;
//       let totalAssignments = 0;
//       for (const cls of classesData) {
//         const enrolledStudents = cls.enrolledStudents || [];
//         totalStudents += enrolledStudents.length;

//         const assignmentsSnap = await getDocs(collection(db, 'classes', cls.id, 'assignments'));
//         totalAssignments += assignmentsSnap.size;
//       }
//       setStudentCount(totalStudents);
//       setAssignmentCount(totalAssignments);

//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, [user]);

//   const handleCreateClass = async (classData) => {
//     if (!user) return;
//     try {
//       await addDoc(collection(db, 'classes'), {
//         ...classData,
//         teacherId: user.uid,
//         teacherName: user.displayName,
//         enrolledStudents: [],
//         createdAt: serverTimestamp(),
//       });
//     } catch (error) {
//       console.error("Error creating class: ", error);
//     }
//   };

//   const handleDeleteClass = async (classId) => {
//     if (window.confirm("Are you sure you want to delete this class?")) {
//       try {
//         await deleteDoc(doc(db, 'classes', classId));
//       } catch (error) {
//         console.error("Error deleting class: ", error);
//       }
//     }
//   };

//   const handleEditClass = (classId) => {
//     navigate(`/edit-class/${classId}`);
//   };

//   const formatDate = (timestamp) => {
//     if (!timestamp) return '...';
//     return timestamp.toDate().toLocaleDateString();
//   };

//   return (
//     <div className="dashboard-content-area">
//       <h1 className="dashboard-title">Teacher Dashboard</h1>
//       <p className="welcome-message">Welcome back, {user?.displayName || 'Teacher'}!</p>

//       <div className="stats-container">
//         <div className="stat-card">
//           <FaBookOpen className="stat-icon blue" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : classes.length}</h3>
//             <p>Classes</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <FaUserFriends className="stat-icon green" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : studentCount}</h3>
//             <p>Students</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <FaClipboardList className="stat-icon purple" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : assignmentCount}</h3>
//             <p>Assignments</p>
//           </div>
//         </div>
//       </div>

//       <div className="classes-section-header">
//         <h2>My Classes</h2>
//         <button className="create-class-btn" onClick={() => setIsModalOpen(true)}>
//           <FaPlus size={12} /> Create Class
//         </button>
//       </div>

//       <div className="class-list-container">
//         {loading ? (
//           <p>Loading classes...</p>
//         ) : classes.length > 0 ? (
//           classes.map(cls => (
//             <div key={cls.id} className="class-card">
//               <div>
//                 <div className="class-card-header">
//                   <h3 className="class-card-title">{cls.className}</h3>
//                   <FaArrowRight className="class-card-arrow" />
//                 </div>
//                 <p className="class-card-date">Created {formatDate(cls.createdAt)}</p>
//               </div>
//               <div className="class-card-footer">
//                 <p>Click to manage class</p>
//                 <div className="action-buttons">
//                   <button className="open-btn" onClick={() => navigate(`/class/${cls.id}`)}>Open</button>
//                   <button className="edit-btn" onClick={() => handleEditClass(cls.id)}><FaPen /></button>
//                   <button className="delete-btn" onClick={() => handleDeleteClass(cls.id)}><FaTrash /></button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No classes have been created yet. Click "Create Class" to get started.</p>
//         )}
//       </div>

//       <CreateClassModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSubmit={handleCreateClass}
//       />
//     </div>
//   );
// };

// export default TeacherDashboard;
// src/pages/TeacherDashboard/TeacherDashboard.jsx

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db } from '../../firebase/firebaseConfig';
// import {
//   collection,
//   addDoc,
//   query,
//   where,
//   onSnapshot,
//   getDocs,
//   serverTimestamp,
// } from 'firebase/firestore';
// import CreateClassModal from '../../components/CreateClassModal/CreateClassModal';
// import './TeacherDashboard.css';

// import {
//   FaBookOpen,
//   FaUserFriends,
//   FaClipboardList,
//   FaArrowRight,
//   FaPlus,
// } from 'react-icons/fa';

// const TeacherDashboard = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [studentCount, setStudentCount] = useState(0);
//   const [assignmentCount, setAssignmentCount] = useState(0);
//   const user = auth.currentUser;
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) return;
//     const q = query(collection(db, 'classes'), where('teacherId', '==', user.uid));
//     const unsubscribe = onSnapshot(q, async (snapshot) => {
//       const classesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setClasses(classesData);

//       // Count students and assignments
//       let totalStudents = 0;
//       let totalAssignments = 0;
//       for (const cls of classesData) {
//         // If you store enrolledStudents array on class doc:
//         totalStudents += (cls.enrolledStudents || []).length;
//         // Count assignments subcollection
//         const assignmentsSnap = await getDocs(collection(db, 'classes', cls.id, 'assignments'));
//         totalAssignments += assignmentsSnap.size;
//       }
//       setStudentCount(totalStudents);
//       setAssignmentCount(totalAssignments);

//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, [user]);

//   const handleCreateClass = async (classData) => {
//     if (!user) return;
//     try {
//       await addDoc(collection(db, 'classes'), {
//         ...classData,
//         teacherId: user.uid,
//         teacherName: user.displayName,
//         enrolledStudents: [],
//         createdAt: serverTimestamp(),
//       });
//     } catch (error) {
//       console.error("Error creating class: ", error);
//     }
//   };

//   const formatDate = (timestamp) => {
//     if (!timestamp) return '...';
//     return timestamp.toDate().toLocaleDateString();
//   };

//   return (
//     <div className="dashboard-content-area">
//       <h1 className="dashboard-title">Teacher Dashboard</h1>
//       <p className="welcome-message">Welcome back, {user?.displayName || 'Teacher'}!</p>

//       <div className="stats-container">
//         <div className="stat-card">
//           <FaBookOpen className="stat-icon blue" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : classes.length}</h3>
//             <p>Classes</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <FaUserFriends className="stat-icon green" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : studentCount}</h3>
//             <p>Students</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <FaClipboardList className="stat-icon purple" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : assignmentCount}</h3>
//             <p>Assignments</p>
//           </div>
//         </div>
//       </div>

//       <div className="classes-section-header">
//         <h2>My Classes</h2>
//         <button className="create-class-btn" onClick={() => setIsModalOpen(true)}>
//           <FaPlus size={12} /> Create Class
//         </button>
//       </div>

//       <div className="class-list-container">
//         {loading ? (
//           <p>Loading classes...</p>
//         ) : classes.length > 0 ? (
//           classes.map(cls => (
//             <div key={cls.id} className="class-card">
//               <div>
//                 <div className="class-card-header">
//                   <h3 className="class-card-title">{cls.className}</h3>
//                   <FaArrowRight className="class-card-arrow" />
//                 </div>
//                 <p className="class-card-date">Created {formatDate(cls.createdAt)}</p>
//               </div>
//               <div className="class-card-footer">
//                 <p>Click to manage class</p>
//                 <button className="open-btn" onClick={() => navigate(`/class/${cls.id}`)}>
//                   Open
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No classes have been created yet. Click "Create Class" to get started.</p>
//         )}
//       </div>

//       <CreateClassModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSubmit={handleCreateClass}
//       />
//     </div>
//   );
// };

// export default TeacherDashboard;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db } from '../../firebase/firebaseConfig';
// import {
//   collection,
//   addDoc,
//   query,
//   where,
//   onSnapshot,
//   getDocs,
//   serverTimestamp,
//   deleteDoc,
//   doc,
//   updateDoc
// } from 'firebase/firestore';
// import CreateClassModal from '../../components/CreateClassModal/CreateClassModal';
// import './TeacherDashboard.css';

// import {
//   FaBookOpen,
//   FaUserFriends,
//   FaClipboardList,
//   FaArrowRight,
//   FaPlus,
//   FaTrash,
//   FaPen
// } from 'react-icons/fa';

// const TeacherDashboard = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editClassData, setEditClassData] = useState(null);
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [studentCount, setStudentCount] = useState(0);
//   const [assignmentCount, setAssignmentCount] = useState(0);
//   const user = auth.currentUser;
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) return;
//     const q = query(collection(db, 'classes'), where('teacherId', '==', user.uid));
//     const unsubscribe = onSnapshot(q, async (snapshot) => {
//       const classesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setClasses(classesData);

//       let totalStudents = 0;
//       let totalAssignments = 0;
//       for (const cls of classesData) {
//         totalStudents += (cls.enrolledStudents || []).length;
//         const assignmentsSnap = await getDocs(collection(db, 'classes', cls.id, 'assignments'));
//         totalAssignments += assignmentsSnap.size;
//       }
//       setStudentCount(totalStudents);
//       setAssignmentCount(totalAssignments);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, [user]);

//   const handleCreateOrEditClass = async (classData) => {
//     if (!user) return;
//     try {
//       if (editClassData) {
//         const classRef = doc(db, 'classes', editClassData.id);
//         await updateDoc(classRef, {
//           ...classData,
//         });
//       } else {
//         await addDoc(collection(db, 'classes'), {
//           ...classData,
//           teacherId: user.uid,
//           teacherName: user.displayName,
//           enrolledStudents: [],
//           createdAt: serverTimestamp(),
//         });
//       }
//       setEditClassData(null);
//     } catch (error) {
//       console.error("Error creating/updating class: ", error);
//     }
//   };

//   const handleDeleteClass = async (classId) => {
//     if (window.confirm("Are you sure you want to delete this class?")) {
//       try {
//         await deleteDoc(doc(db, 'classes', classId));
//       } catch (error) {
//         console.error('Error deleting class:', error);
//       }
//     }
//   };

//   const handleEditClass = (cls) => {
//     setEditClassData(cls);
//     setIsModalOpen(true);
//   };

//   const formatDate = (timestamp) => {
//     if (!timestamp) return '...';
//     return timestamp.toDate().toLocaleDateString();
//   };

//   return (
//     <div className="dashboard-content-area">
//       <h1 className="dashboard-title">Teacher Dashboard</h1>
//       <p className="welcome-message">Welcome back, {user?.displayName || 'Teacher'}!</p>

//       <div className="stats-container">
//         <div className="stat-card">
//           <FaBookOpen className="stat-icon blue" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : classes.length}</h3>
//             <p>Classes</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <FaUserFriends className="stat-icon green" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : studentCount}</h3>
//             <p>Students</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <FaClipboardList className="stat-icon purple" />
//           <div className="stat-info">
//             <h3>{loading ? '...' : assignmentCount}</h3>
//             <p>Assignments</p>
//           </div>
//         </div>
//       </div>

//       <div className="classes-section-header">
//         <h2>My Classes</h2>
//         <button className="create-class-btn" onClick={() => {
//           setIsModalOpen(true);
//           setEditClassData(null);
//         }}>
//           <FaPlus size={12} /> Create Class
//         </button>
//       </div>

//       <div className="class-list-container">
//         {loading ? (
//           <p>Loading classes...</p>
//         ) : classes.length > 0 ? (
//           classes.map(cls => (
//             <div key={cls.id} className="class-card">
//               <div>
//                 <div className="class-card-header">
//                   <h3 className="class-card-title">{cls.className}</h3>
//                   <FaArrowRight className="class-card-arrow" />
//                 </div>
//                 <p className="class-card-date">Created {formatDate(cls.createdAt)}</p>
//               </div>
//               <div className="class-card-footer">
//                 <p>Click to manage class</p>
//                 <div className="class-card-actions">
//                   <button className="edit-btn" onClick={() => handleEditClass(cls)}><FaPen /> Edit</button>
//                   <button className="delete-btn" onClick={() => handleDeleteClass(cls.id)}><FaTrash /> Delete</button>
//                   <button className="open-btn" onClick={() => navigate(`/class/${cls.id}`)}>Open</button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No classes have been created yet. Click "Create Class" to get started.</p>
//         )}
//       </div>

//       <CreateClassModal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setEditClassData(null);
//         }}
//         onSubmit={handleCreateOrEditClass}
//         initialData={editClassData}
//       />
//     </div>
//   );
// };

// export default TeacherDashboard;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/firebaseConfig';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  getDocs,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import CreateClassModal from '../../components/CreateClassModal/CreateClassModal';
import './TeacherDashboard.css';

import {
  FaBookOpen,
  FaUserFriends,
  FaClipboardList,
  FaArrowRight,
  FaPlus,
  FaTrash,
  FaPen,
} from 'react-icons/fa';

const TeacherDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentCount, setStudentCount] = useState(0);
  const [assignmentCount, setAssignmentCount] = useState(0);
  const [currentClassToEdit, setCurrentClassToEdit] = useState(null);
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'classes'), where('teacherId', '==', user.uid));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const classesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClasses(classesData);

      let totalStudents = 0;
      let totalAssignments = 0;
      for (const cls of classesData) {
        totalStudents += (cls.enrolledStudents || []).length;
        const assignmentsSnap = await getDocs(collection(db, 'classes', cls.id, 'assignments'));
        totalAssignments += assignmentsSnap.size;
      }
      setStudentCount(totalStudents);
      setAssignmentCount(totalAssignments);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  const handleCreateOrUpdateClass = async (classData) => {
    if (!user) return;
    try {
      if (currentClassToEdit) {
        const classRef = doc(db, 'classes', currentClassToEdit.id);
        await updateDoc(classRef, { ...classData });
      } else {
        await addDoc(collection(db, 'classes'), {
          ...classData,
          teacherId: user.uid,
          teacherName: user.displayName,
          enrolledStudents: [],
          createdAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Error saving class: ", error);
    }
    setIsModalOpen(false);
    setCurrentClassToEdit(null);
  };

  const handleDeleteClass = async (classId) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        await deleteDoc(doc(db, 'classes', classId));
      } catch (error) {
        console.error("Error deleting class: ", error);
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '...';
    return timestamp.toDate().toLocaleDateString();
  };

  return (
    <div className="dashboard-content-area">
      <h1 className="dashboard-title">Teacher Dashboard</h1>
      <p className="welcome-message">Welcome back, {user?.displayName || 'Teacher'}!</p>

      <div className="stats-container">
        <div className="stat-card">
          <FaBookOpen className="stat-icon blue" />
          <div className="stat-info">
            <h3>{loading ? '...' : classes.length}</h3>
            <p>Classes</p>
          </div>
        </div>
        <div className="stat-card">
          <FaUserFriends className="stat-icon green" />
          <div className="stat-info">
            <h3>{loading ? '...' : studentCount}</h3>
            <p>Students</p>
          </div>
        </div>
        <div className="stat-card">
          <FaClipboardList className="stat-icon purple" />
          <div className="stat-info">
            <h3>{loading ? '...' : assignmentCount}</h3>
            <p>Assignments</p>
          </div>
        </div>
      </div>

      <div className="classes-section-header">
        <h2>My Classes</h2>
        <button
          className="create-class-btn"
          onClick={() => {
            setCurrentClassToEdit(null);
            setIsModalOpen(true);
          }}
        >
          <FaPlus size={12} /> Create Class
        </button>
      </div>

      <div className="class-list-container">
        {loading ? (
          <p>Loading classes...</p>
        ) : classes.length > 0 ? (
          classes.map(cls => (
            <div key={cls.id} className="class-card">
              <div className="class-card-header">
                <h3 className="class-card-title">{cls.className}</h3>
                <div className="class-actions">
                  <button title="Edit" onClick={() => {
                    setCurrentClassToEdit(cls);
                    setIsModalOpen(true);
                  }}>
                    <FaPen />
                  </button>
                  <button title="Delete" onClick={() => handleDeleteClass(cls.id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
              <p className="class-card-date">Created {formatDate(cls.createdAt)}</p>
              <div className="class-card-footer">
                <p>Click to manage class</p>
                <button className="open-btn" onClick={() => navigate(`/class/${cls.id}`)}>
                  <FaArrowRight /> Open
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No classes created yet.</p>
        )}
      </div>

      <CreateClassModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentClassToEdit(null);
        }}
        onSubmit={handleCreateOrUpdateClass}
        initialData={currentClassToEdit}
      />
    </div>
  );
};

export default TeacherDashboard;
