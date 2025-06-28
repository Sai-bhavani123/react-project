// src/components/AssignmentsTab/AssignmentsTab.jsx

// import React, { useState, useEffect } from 'react';
// import { db } from '../../firebase/firebaseConfig';
// import { collection, query, onSnapshot, addDoc, doc, deleteDoc, serverTimestamp, orderBy } from 'firebase/firestore';
// import { FaPlus, FaPen, FaTrash } from 'react-icons/fa';
// import CreateAssignmentModal from '../CreateAssignmentModal/CreateAssignmentModal'; // We will need this modal
// import './AssignmentsTab.css';

// const AssignmentsTab = ({ classId }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [assignments, setAssignments] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Effect to fetch assignments
//     useEffect(() => {
//         if (!classId) return;

//         const assignmentsRef = collection(db, 'classes', classId, 'assignments');
//         const q = query(assignmentsRef, orderBy('createdAt', 'desc'));

//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setAssignments(data);
//             setLoading(false);
//         });

//         return () => unsubscribe();
//     }, [classId]);

//     // Function to create a new assignment
//     const handleCreateAssignment = async (assignmentData) => {
//         const assignmentsRef = collection(db, 'classes', classId, 'assignments');
//         await addDoc(assignmentsRef, {
//             ...assignmentData,
//             createdAt: serverTimestamp(),
//         });
//     };

//     // Function to delete an assignment
//     const handleDeleteAssignment = async (assignmentId) => {
//         if (window.confirm("Are you sure you want to delete this assignment?")) {
//             const assignmentDocRef = doc(db, 'classes', classId, 'assignments', assignmentId);
//             await deleteDoc(assignmentDocRef);
//         }
//     };

//     return (
//         <div className="assignments-container">
//             <div className="assignments-header">
//                 <h2>Assignments</h2>
//                 <button className="create-assignment-btn" onClick={() => setIsModalOpen(true)}>
//                     <FaPlus size={12} /> Create Assignment
//                 </button>
//             </div>
//             <div className="assignment-list">
//                 {loading ? (
//                     <p>Loading assignments...</p>
//                 ) : assignments.length > 0 ? (
//                     assignments.map(asm => (
//                         <div key={asm.id} className="assignment-card">
//                             <div className="assignment-info">
//                                 <h4>{asm.title}</h4>
//                                 <p>{asm.description}</p>
//                                 {asm.dueDate && <p><strong>Due:</strong> {asm.dueDate}</p>}
//                             </div>
//                             <div className="assignment-actions">
//                                 <button title="Edit Assignment"><FaPen /></button>
//                                 <button title="Delete Assignment" onClick={() => handleDeleteAssignment(asm.id)}>
//                                     <FaTrash className="delete-icon" />
//                                 </button>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No assignments have been created for this class yet.</p>
//                 )}
//             </div>
//             {/* You will also need to create the CreateAssignmentModal component */}
//             <CreateAssignmentModal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 onSubmit={handleCreateAssignment}
//             />
//         </div>
//     );
// };

// export default AssignmentsTab;
// // src/components/AssignmentsTab/AssignmentsTab.jsx
// import React, { useState, useEffect } from 'react';
// import { db } from '../../firebase/firebaseConfig';
// import { collection, query, onSnapshot, addDoc, doc, deleteDoc, serverTimestamp, orderBy } from 'firebase/firestore';
// import { FaPlus, FaPen, FaTrash, FaUpload, FaCalendarAlt } from 'react-icons/fa';
// import CreateAssignmentModal from '../CreateAssignmentModal/CreateAssignmentModal';
// import './AssignmentsTab.css';

// const AssignmentsTab = ({ classId, userRole }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [assignments, setAssignments] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (!classId) return;
//         const assignmentsRef = collection(db, 'classes', classId, 'assignments');
//         // Order assignments by creation date
//         const q = query(assignmentsRef, orderBy('createdAt', 'desc'));
        
//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setAssignments(data);
//             setLoading(false);
//         });
//         return () => unsubscribe();
//     }, [classId]);

//     const handleCreateAssignment = async (assignmentData) => {
//         const assignmentsRef = collection(db, 'classes', classId, 'assignments');
//         await addDoc(assignmentsRef, {
//             ...assignmentData,
//             createdAt: serverTimestamp(),
//         });
//     };

//     const handleDeleteAssignment = async (assignmentId) => {
//         if (window.confirm("Are you sure?")) {
//             const assignmentDocRef = doc(db, 'classes', classId, 'assignments', assignmentId);
//             await deleteDoc(assignmentDocRef);
//         }
//     };

//     const handleStudentSubmit = (assignmentId) => {
//         alert(`Submitting work for assignment: ${assignmentId}`);
//         // In a real app, this would open a file upload modal.
//     };
    
//     // Helper to format the yyyy-mm-dd date from the input
//     const formatDate = (dateString) => {
//         if (!dateString) return 'Not specified';
//         const date = new Date(dateString);
//         // Add 1 day to correct for timezone issues with date inputs
//         const adjustedDate = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
//         return adjustedDate.toLocaleDateString();
//     };

//     return (
//         <div className="assignments-container">
//             <div className="assignments-header">
//                 <h2>Assignments</h2>
//                 {userRole === 'teacher' && (
//                     <button className="create-assignment-btn" onClick={() => setIsModalOpen(true)}>
//                         <FaPlus size={12} /> Create Assignment
//                     </button>
//                 )}
//             </div>
//             <div className="assignment-list">
//                 {loading ? <p>Loading assignments...</p> :
//                  assignments.length > 0 ? (
//                     assignments.map(asm => (
//                         <div key={asm.id} className="assignment-card">
//                             <div className="assignment-info">
//                                 <h4>{asm.title}</h4>
//                                 <p className="description">{asm.instructions}</p>
//                                 <p className="due-date">
//                                     <FaCalendarAlt /> Due: {formatDate(asm.dueDate)}
//                                 </p>
//                             </div>
//                             <div className="assignment-actions">
//                                 {userRole === 'teacher' ? (
//                                     <>
//                                         <button title="Edit"><FaPen /></button>
//                                         <button title="Delete" onClick={() => handleDeleteAssignment(asm.id)}><FaTrash className="delete-icon" /></button>
//                                     </>
//                                 ) : (
//                                     <button className="submit-btn" onClick={() => handleStudentSubmit(asm.id)}>
//                                         <FaUpload /> Submit
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No assignments have been posted yet.</p>
//                 )}
//             </div>

//             {userRole === 'teacher' && (
//                 <CreateAssignmentModal
//                     isOpen={isModalOpen}
//                     onClose={() => setIsModalOpen(false)}
//                     onSubmit={handleCreateAssignment}
//                 />
//             )}
//         </div>
//     );
// };

// export default AssignmentsTab;

// src/components/AssignmentsTab/AssignmentsTab.jsx
// import React, { useState, useEffect } from 'react';
// import { auth, db } from '../../firebase/firebaseConfig';
// import { collection, query, onSnapshot, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
// import { FaPlus, FaPen, FaTrash, FaUpload, FaCalendarAlt } from 'react-icons/fa';
// import CreateAssignmentModal from '../CreateAssignmentModal/CreateAssignmentModal';
// import SubmitAssignmentModal from '../SubmitAssignmentModal/SubmitAssignmentModal'; // <-- Import new modal
// import './AssignmentsTab.css';

// const AssignmentsTab = ({ classId, userRole }) => {
//     const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//     const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
//     const [selectedAssignment, setSelectedAssignment] = useState(null); // <-- To track which assignment is being submitted
//     const [assignments, setAssignments] = useState([]);
//     const user = auth.currentUser;

//     useEffect(() => {
//         const assignmentsRef = collection(db, 'classes', classId, 'assignments');
//         const q = query(assignmentsRef, orderBy('createdAt', 'desc'));
//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setAssignments(data);
//         });
//         return () => unsubscribe();
//     }, [classId]);

//     const handleCreateAssignment = async (assignmentData) => {
//         const assignmentsRef = collection(db, 'classes', classId, 'assignments');
//         await addDoc(assignmentsRef, { ...assignmentData, createdAt: serverTimestamp() });
//     };

//     const handleOpenSubmitModal = (assignment) => {
//         setSelectedAssignment(assignment);
//         setIsSubmitModalOpen(true);
//     };

//     const handleStudentSubmit = async (submissionData) => {
//         if (!user || !selectedAssignment) return;
        
//         // Create a reference to a new submission document. 
//         // The document ID will be the student's UID to prevent duplicate submissions.
//         const submissionRef = doc(db, 'classes', classId, 'assignments', selectedAssignment.id, 'submissions', user.uid);
        
//         await setDoc(submissionRef, {
//             ...submissionData,
//             studentId: user.uid,
//             studentName: user.displayName,
//             submittedAt: serverTimestamp(),
//         });
//         alert('Assignment submitted successfully!');
//     };

//     const formatDate = (dateString) => {
//         if (!dateString) return 'Not specified';
//         const date = new Date(dateString);
//         const adjustedDate = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
//         return adjustedDate.toLocaleDateString();
//     };

//     return (
//         <div className="assignments-container">
//             <div className="assignments-header">
//                 <h2>Assignments</h2>
//                 {userRole === 'teacher' && (
//                     <button className="create-assignment-btn" onClick={() => setIsCreateModalOpen(true)}>
//                         <FaPlus size={12} /> Create Assignment
//                     </button>
//                 )}
//             </div>
//             <div className="assignment-list">
//                 {assignments.map(asm => (
//                     <div key={asm.id} className="assignment-card">
//                         <div className="assignment-info">
//                             <h4>{asm.title}</h4>
//                             <p className="description">{asm.instructions}</p>
//                             <p className="due-date"><FaCalendarAlt /> Due: {formatDate(asm.dueDate)}</p>
//                         </div>
//                         <div className="assignment-actions">
//                             {userRole === 'teacher' ? (
//                                 // This will be the teacher's view with submissions list
//                                 <button className="view-submissions-btn" onClick={() => alert('Viewing submissions...')}>View Submissions</button>
//                             ) : (
//                                 <button className="submit-btn" onClick={() => handleOpenSubmitModal(asm)}>
//                                     <FaUpload /> Submit
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {userRole === 'teacher' && (
//                 <CreateAssignmentModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onSubmit={handleCreateAssignment} />
//             )}
            
//             {selectedAssignment && (
//                 <SubmitAssignmentModal
//                     isOpen={isSubmitModalOpen}
//                     onClose={() => setIsSubmitModalOpen(false)}
//                     onSubmit={handleStudentSubmit}
//                     assignmentTitle={selectedAssignment.title}
//                 />
//             )}
//         </div>
//     );
// };

// export default AssignmentsTab;

// src/components/AssignmentsTab/AssignmentsTab.jsx
// corrected-------------------------------------

// import React, { useState, useEffect } from 'react';
// import { auth, db } from '../../firebase/firebaseConfig';
// import { collection, query, onSnapshot, addDoc, doc, deleteDoc, serverTimestamp, orderBy } from 'firebase/firestore';
// import { FaPlus, FaPen, FaTrash, FaUpload, FaCalendarAlt } from 'react-icons/fa';

// // Import all the necessary components
// import CreateAssignmentModal from '../CreateAssignmentModal/CreateAssignmentModal';
// import SubmitAssignmentModal from '../SubmitAssignmentModal/SubmitAssignmentModal';
// import ViewSubmissions from '../ViewSubmissions/ViewSubmissions';

// import './AssignmentsTab.css';

// const AssignmentsTab = ({ classId, userRole }) => {
//     // State for modals
//     const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//     const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

//     // State for data and UI control
//     const [assignments, setAssignments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedAssignment, setSelectedAssignment] = useState(null);
//     const [viewingSubmissionsFor, setViewingSubmissionsFor] = useState(null); // Tracks which assignment's submissions are open

//     const user = auth.currentUser;

//     // Fetch assignments in real-time
//     useEffect(() => {
//         if (!classId) return;
//         const assignmentsRef = collection(db, 'classes', classId, 'assignments');
//         const q = query(assignmentsRef, orderBy('createdAt', 'desc'));
        
//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setAssignments(data);
//             setLoading(false);
//         });
//         return () => unsubscribe();
//     }, [classId]);

//     // --- Teacher Functions ---
//     const handleCreateAssignment = async (assignmentData) => {
//         const assignmentsRef = collection(db, 'classes', classId, 'assignments');
//         await addDoc(assignmentsRef, { ...assignmentData, createdAt: serverTimestamp() });
//     };

//     const handleDeleteAssignment = async (assignmentId) => {
//         if (window.confirm("Are you sure you want to delete this assignment?")) {
//             const assignmentDocRef = doc(db, 'classes', classId, 'assignments', assignmentId);
//             await deleteDoc(assignmentDocRef);
//         }
//     };

//     const toggleSubmissions = (assignmentId) => {
//         // If we are already viewing this assignment, close it. Otherwise, open it.
//         setViewingSubmissionsFor(prevId => (prevId === assignmentId ? null : assignmentId));
//     };

//     // --- Student Functions ---
//     const handleOpenSubmitModal = (assignment) => {
//         setSelectedAssignment(assignment);
//         setIsSubmitModalOpen(true);
//     };

//     const handleStudentSubmit = async (submissionData) => {
//         if (!user || !selectedAssignment) return;
//         const submissionRef = doc(db, 'classes', classId, 'assignments', selectedAssignment.id, 'submissions', user.uid);
//         await setDoc(submissionRef, {
//             ...submissionData,
//             studentId: user.uid,
//             studentName: user.displayName,
//             submittedAt: serverTimestamp(),
//         });
//         alert('Assignment submitted successfully!');
//     };

//     const formatDate = (dateString) => {
//         if (!dateString) return 'Not specified';
//         const date = new Date(dateString);
//         const adjustedDate = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
//         return adjustedDate.toLocaleDateString();
//     };

//     return (
//         <div className="assignments-container">
//             <div className="assignments-header">
//                 <h2>Assignments</h2>
//                 {userRole === 'teacher' && (
//                     <button className="create-assignment-btn" onClick={() => setIsCreateModalOpen(true)}>
//                         <FaPlus size={12} /> Create Assignment
//                     </button>
//                 )}
//             </div>

//             <div className="assignment-list">
//                 {loading ? <p>Loading assignments...</p> :
//                  assignments.length > 0 ? (
//                     assignments.map(asm => (
//                         <div key={asm.id} className="assignment-card-wrapper">
//                             <div className="assignment-card">
//                                 <div className="assignment-info">
//                                     <h4>{asm.title}</h4>
//                                     <p className="description">{asm.instructions}</p>
//                                     <p className="due-date">
//                                         <FaCalendarAlt /> Due: {formatDate(asm.dueDate)}
//                                     </p>
//                                 </div>
//                                 <div className="assignment-actions">
//                                     {userRole === 'teacher' ? (
//                                         <>
//                                             <button title="Edit Assignment"><FaPen /></button>
//                                             <button title="Delete Assignment" onClick={() => handleDeleteAssignment(asm.id)}><FaTrash className="delete-icon" /></button>
//                                             <button className="view-submissions-btn" onClick={() => toggleSubmissions(asm.id)}>
//                                                 {viewingSubmissionsFor === asm.id ? 'Hide Submissions' : 'View Submissions'}
//                                             </button>
//                                         </>
//                                     ) : (
//                                         <button className="submit-btn" onClick={() => handleOpenSubmitModal(asm)}>
//                                             <FaUpload /> Submit
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                             {/* Conditionally render the submissions component below the card */}
//                             {userRole === 'teacher' && viewingSubmissionsFor === asm.id && (
//                                 <ViewSubmissions classId={classId} assignmentId={asm.id} />
//                             )}
//                         </div>
//                     ))
//                 ) : (
//                     <p>No assignments have been posted yet.</p>
//                 )}
//             </div>

//             {/* Modals */}
//             {userRole === 'teacher' && (
//                 <CreateAssignmentModal
//                     isOpen={isCreateModalOpen}
//                     onClose={() => setIsCreateModalOpen(false)}
//                     onSubmit={handleCreateAssignment}
//                 />
//             )}
//             {selectedAssignment && (
//                 <SubmitAssignmentModal
//                     isOpen={isSubmitModalOpen}
//                     onClose={() => setIsSubmitModalOpen(false)}
//                     onSubmit={handleStudentSubmit}
//                     assignmentTitle={selectedAssignment.title}
//                 />
//             )}
//         </div>
//     );
// };

// export default AssignmentsTab;

// src/components/AssignmentsTab/AssignmentsTab.jsx

// import React, { useState, useEffect } from 'react';
// import { auth, db } from '../../firebase/firebaseConfig';
// import { collection, query, onSnapshot, addDoc, doc, deleteDoc, updateDoc, setDoc, serverTimestamp, orderBy } from 'firebase/firestore';
// import { FaPlus, FaPen, FaTrash, FaUpload, FaCalendarAlt } from 'react-icons/fa';

// // Import all the necessary modal and display components
// import CreateAssignmentModal from '../CreateAssignmentModal/CreateAssignmentModal';
// import EditAssignmentModal from '../EditAssignmentModal/EditAssignmentModal';
// import SubmitAssignmentModal from '../SubmitAssignmentModal/SubmitAssignmentModal';
// import ViewSubmissions from '../ViewSubmissions/ViewSubmissions';

// import './AssignmentsTab.css';

// const AssignmentsTab = ({ classId, userRole }) => {
//     // State for modals
//     const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

//     // State for data and UI control
//     const [assignments, setAssignments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedAssignment, setSelectedAssignment] = useState(null); // Used for both submitting and editing
//     const [viewingSubmissionsFor, setViewingSubmissionsFor] = useState(null);

//     const user = auth.currentUser;

//     // Fetch assignments in real-time from Firestore
//     useEffect(() => {
//         if (!classId) return;
//         const assignmentsRef = collection(db, 'classes', classId, 'assignments');
//         const q = query(assignmentsRef, orderBy('createdAt', 'desc'));
        
//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setAssignments(data);
//             setLoading(false);
//         });
//         return () => unsubscribe();
//     }, [classId]);

//     // --- Teacher Functions ---
//     const handleCreateAssignment = async (assignmentData) => {
//         const assignmentsRef = collection(db, 'classes', classId, 'assignments');
//         await addDoc(assignmentsRef, { ...assignmentData, createdAt: serverTimestamp() });
//     };

//     const handleOpenEditModal = (assignment) => {
//         setSelectedAssignment(assignment);
//         setIsEditModalOpen(true);
//     };

//     const handleUpdateAssignment = async (updatedData) => {
//         if (!selectedAssignment) return;
//         const assignmentDocRef = doc(db, 'classes', classId, 'assignments', selectedAssignment.id);
//         await updateDoc(assignmentDocRef, updatedData);
//         alert("Assignment updated successfully!");
//     };

//     const handleDeleteAssignment = async (assignmentId) => {
//         if (window.confirm("Are you sure you want to delete this assignment?")) {
//             const assignmentDocRef = doc(db, 'classes', classId, 'assignments', assignmentId);
//             await deleteDoc(assignmentDocRef);
//         }
//     };

//     const toggleSubmissions = (assignmentId) => {
//         setViewingSubmissionsFor(prevId => (prevId === assignmentId ? null : assignmentId));
//     };

//     // --- Student Functions ---
//     const handleOpenSubmitModal = (assignment) => {
//         setSelectedAssignment(assignment);
//         setIsSubmitModalOpen(true);
//     };

//     const handleStudentSubmit = async (submissionData) => {
//         if (!user || !selectedAssignment) return;
//         const submissionRef = doc(db, 'classes', classId, 'assignments', selectedAssignment.id, 'submissions', user.uid);
//         await setDoc(submissionRef, {
//             ...submissionData,
//             studentId: user.uid,
//             studentName: user.displayName,
//             submittedAt: serverTimestamp(),
//         });
//         alert('Assignment submitted successfully!');
//     };

//     const formatDate = (dateString) => {
//         if (!dateString) return 'Not specified';
//         const date = new Date(dateString);
//         const adjustedDate = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
//         return adjustedDate.toLocaleDateString();
//     };

//     return (
//         <div className="assignments-container">
//             <div className="assignments-header">
//                 <h2>Assignments</h2>
//                 {userRole === 'teacher' && (
//                     <button className="create-assignment-btn" onClick={() => setIsCreateModalOpen(true)}>
//                         <FaPlus size={12} /> Create Assignment
//                     </button>
//                 )}
//             </div>

//             <div className="assignment-list">
//                 {loading ? <p>Loading assignments...</p> :
//                  assignments.length > 0 ? (
//                     assignments.map(asm => (
//                         <div key={asm.id} className="assignment-card-wrapper">
//                             <div className="assignment-card">
//                                 <div className="assignment-info">
//                                     <h4>{asm.title}</h4>
//                                     <p className="description">{asm.instructions}</p>
//                                     <p className="due-date">
//                                         <FaCalendarAlt /> Due: {formatDate(asm.dueDate)}
//                                     </p>
//                                 </div>
//                                 <div className="assignment-actions">
//                                     {userRole === 'teacher' ? (
//                                         <>
//                                             <button title="Edit Assignment" onClick={() => handleOpenEditModal(asm)}><FaPen /></button>
//                                             <button title="Delete Assignment" onClick={() => handleDeleteAssignment(asm.id)}><FaTrash className="delete-icon" /></button>
//                                             <button className="view-submissions-btn" onClick={() => toggleSubmissions(asm.id)}>
//                                                 {viewingSubmissionsFor === asm.id ? 'Hide Submissions' : 'View Submissions'}
//                                             </button>
//                                         </>
//                                     ) : (
//                                         <button className="submit-btn" onClick={() => handleOpenSubmitModal(asm)}>
//                                             <FaUpload /> Submit
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                             {/* Conditionally render the submissions component below the card */}
//                             {userRole === 'teacher' && viewingSubmissionsFor === asm.id && (
//                                 <ViewSubmissions classId={classId} assignmentId={asm.id} />
//                             )}
//                         </div>
//                     ))
//                 ) : (
//                     <p>No assignments have been posted yet.</p>
//                 )}
//             </div>

//             {/* All Modals */}
//             {userRole === 'teacher' && (
//                 <CreateAssignmentModal
//                     isOpen={isCreateModalOpen}
//                     onClose={() => setIsCreateModalOpen(false)}
//                     onSubmit={handleCreateAssignment}
//                 />
//             )}
//             {selectedAssignment && userRole === 'teacher' && (
//                 <EditAssignmentModal
//                     isOpen={isEditModalOpen}
//                     onClose={() => setIsEditModalOpen(false)}
//                     onSubmit={handleUpdateAssignment}
//                     assignment={selectedAssignment}
//                 />
//             )}
//             {selectedAssignment && userRole === 'student' && (
//                 <SubmitAssignmentModal
//                     isOpen={isSubmitModalOpen}
//                     onClose={() => setIsSubmitModalOpen(false)}
//                     onSubmit={handleStudentSubmit}
//                     assignmentTitle={selectedAssignment.title}
//                 />
//             )}
//         </div>
//     );
// };

// export default AssignmentsTab;

// src/components/AssignmentsTab/AssignmentsTab.jsx

import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase/firebaseConfig';
import { collection, query, onSnapshot, orderBy, addDoc, deleteDoc, doc, setDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { FaPlus, FaPen, FaTrash, FaUpload, FaCalendarAlt } from 'react-icons/fa';

// Import all the necessary components
import CreateAssignmentModal from '../CreateAssignmentModal/CreateAssignmentModal';
import EditAssignmentModal from '../EditAssignmentModal/EditAssignmentModal';
import SubmitAssignmentModal from '../SubmitAssignmentModal/SubmitAssignmentModal';
import ViewSubmissions from '../ViewSubmissions/ViewSubmissions';

import './AssignmentsTab.css';

const AssignmentsTab = ({ classId, userRole }) => {
    // State for modals
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

    // State for data and UI control
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [viewingSubmissionsFor, setViewingSubmissionsFor] = useState(null);

    const user = auth.currentUser;

    // Fetch assignments in real-time
    useEffect(() => {
        if (!classId) return;
        const assignmentsRef = collection(db, 'classes', classId, 'assignments');
        const q = query(assignmentsRef, orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setAssignments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });
        return () => unsubscribe();
    }, [classId]);

    // --- Teacher Functions ---
    const handleCreateAssignment = async (assignmentData) => {
        const assignmentsRef = collection(db, 'classes', classId, 'assignments');
        await addDoc(assignmentsRef, { ...assignmentData, createdAt: serverTimestamp() });
    };

    const handleOpenEditModal = (assignment) => {
        setSelectedAssignment(assignment);
        setIsEditModalOpen(true);
    };

    const handleUpdateAssignment = async (updatedData) => {
        if (!selectedAssignment) return;
        const assignmentDocRef = doc(db, 'classes', classId, 'assignments', selectedAssignment.id);
        await updateDoc(assignmentDocRef, updatedData);
        setIsEditModalOpen(false);
    };

    const handleDeleteAssignment = async (assignmentId) => {
        if (window.confirm("Are you sure you want to delete this assignment?")) {
            const assignmentDocRef = doc(db, 'classes', classId, 'assignments', assignmentId);
            await deleteDoc(assignmentDocRef);
        }
    };

    const toggleSubmissions = (assignmentId) => setViewingSubmissionsFor(prev => prev === assignmentId ? null : assignmentId);

    // --- Student Functions ---
    const handleOpenSubmitModal = (assignment) => {
        setSelectedAssignment(assignment);
        setIsSubmitModalOpen(true);
    };

    const handleStudentSubmit = async (submissionData) => {
        if (!user || !selectedAssignment) return;
        const submissionRef = doc(db, 'classes', classId, 'assignments', selectedAssignment.id, 'submissions', user.uid);
        await setDoc(submissionRef, {
            ...submissionData,
            studentId: user.uid,
            studentName: user.displayName,
            submittedAt: serverTimestamp(),
        });
        setIsSubmitModalOpen(false);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not specified';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className="assignments-container">
            <div className="assignments-header">
                <h2>Assignments</h2>
                {userRole === 'teacher' && (
                    <button className="create-assignment-btn" onClick={() => setIsCreateModalOpen(true)}>
                        <FaPlus size={12} /> Create Assignment
                    </button>
                )}
            </div>

            <div className="assignment-list">
                {loading ? <p>Loading assignments...</p> : assignments.length > 0 ? (
                    assignments.map(asm => (
                        <div key={asm.id} className="assignment-card-wrapper">
                            <div className="assignment-card">
                                <div className="assignment-info">
                                    <h4>{asm.title}</h4>
                                    <p className="description">{asm.instructions}</p>
                                    <p className="due-date"><FaCalendarAlt /> Due: {formatDate(asm.dueDate)}</p>
                                </div>
                                <div className="assignment-actions">
                                    {userRole === 'teacher' ? (
                                        <>
                                            <button title="Edit Assignment" onClick={() => handleOpenEditModal(asm)}><FaPen /></button>
                                            <button title="Delete Assignment" onClick={() => handleDeleteAssignment(asm.id)}><FaTrash /></button>
                                            <button className="view-submissions-btn" onClick={() => toggleSubmissions(asm.id)}>
                                                {viewingSubmissionsFor === asm.id ? 'Hide Submissions' : 'View Submissions'}
                                            </button>
                                        </>
                                    ) : (
                                        <button className="submit-btn" onClick={() => handleOpenSubmitModal(asm)}>
                                            <FaUpload /> Submit
                                        </button>
                                    )}
                                </div>
                            </div>
                            {userRole === 'teacher' && viewingSubmissionsFor === asm.id && (
                                <ViewSubmissions classId={classId} assignmentId={asm.id} />
                            )}
                        </div>
                    ))
                ) : (
                    <p>No assignments have been posted yet.</p>
                )}
            </div>

            {/* Modals */}
            {userRole === 'teacher' && (
                <CreateAssignmentModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSubmit={handleCreateAssignment}
                />
            )}
            {selectedAssignment && userRole === 'teacher' && (
                <EditAssignmentModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onSubmit={handleUpdateAssignment}
                    assignment={selectedAssignment}
                />
            )}
            {selectedAssignment && userRole === 'student' && (
                <SubmitAssignmentModal
                    isOpen={isSubmitModalOpen}
                    onClose={() => setIsSubmitModalOpen(false)}
                    onSubmit={handleStudentSubmit}
                    assignmentTitle={selectedAssignment.title}
                />
            )}
        </div>
    );
};

export default AssignmentsTab;
