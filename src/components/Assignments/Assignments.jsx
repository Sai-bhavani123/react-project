// // src/components/Assignments/Assignments.jsx
// import React, { useState, useEffect } from 'react';
// import { db, auth } from '../../firebase/firebaseConfig';
// import { collection, query, onSnapshot, addDoc, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';
// import CreateAssignmentModal from '../CreateAssignmentModal/CreateAssignmentModal';
// import { FaCalendarAlt, FaPlus, FaTrash } from 'react-icons/fa';
// import './Assignments.css';

// const Assignments = ({ classId }) => {
//     const [assignments, setAssignments] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     // Fetch assignments
//     useEffect(() => {
//         if (!classId) return;
//         const assignmentsRef = collection(db, 'classes', classId, 'assignments');
//         const q = query(assignmentsRef);
//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const fetchedAssignments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setAssignments(fetchedAssignments);
//         });
//         return () => unsubscribe();
//     }, [classId]);

//     // Handle creating a new assignment
//     const handleCreateAssignment = async (assignmentData) => {
//         const assignmentsRef = collection(db, 'classes', classId, 'assignments');
//         await addDoc(assignmentsRef, {
//             ...assignmentData,
//             createdAt: serverTimestamp(),
//             creatorId: auth.currentUser.uid,
//         });
//     };
    
//     // Handle deleting an assignment
//     const handleDeleteAssignment = async (assignmentId) => {
//         if (!window.confirm("Are you sure you want to delete this assignment?")) return;
//         const docRef = doc(db, 'classes', classId, 'assignments', assignmentId);
//         await deleteDoc(docRef);
//     };

//     return (
//         <div className="assignments-container">
//             <CreateAssignmentModal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 onSubmit={handleCreateAssignment}
//             />
//             <div className="assignments-header">
//                 <h2>Assignments</h2>
//                 <button className="create-assignment-btn" onClick={() => setIsModalOpen(true)}>
//                     <FaPlus size={12} /> Create Assignment
//                 </button>
//             </div>
//             <div className="assignments-content">
//                 {assignments.length === 0 ? (
//                     <div className="no-assignments-placeholder">
//                         <FaCalendarAlt className="no-assignments-icon" />
//                         <h3>No assignments yet</h3>
//                         <p>Assignments will appear here when created</p>
//                     </div>
//                 ) : (
//                     <ul className="assignment-list">
//                         {assignments.map(asm => (
//                             <li key={asm.id} className="assignment-item">
//                                 <div className="assignment-info">
//                                     <h4>{asm.title}</h4>
//                                     <p>Due: {asm.dueDate}</p>
//                                 </div>
//                                 <div className="assignment-actions">
//                                     <button onClick={() => handleDeleteAssignment(asm.id)}><FaTrash /></button>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Assignments;
// src/components/Assignments/Assignments.jsx
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase/firebaseConfig';
// Import 'updateDoc' from firestore
import { collection, query, onSnapshot, addDoc, serverTimestamp, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import CreateAssignmentModal from '../CreateAssignmentModal/CreateAssignmentModal';
import EditAssignmentModal from '../EditAssignmentModal/EditAssignmentModal'; // <-- Import the new Edit modal
import { FaCalendarAlt, FaPlus, FaTrash, FaEdit } from 'react-icons/fa'; // <-- Import FaEdit icon
import './Assignments.css';

const Assignments = ({ classId }) => {
    const [assignments, setAssignments] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // <-- State for Edit modal
    const [currentAssignment, setCurrentAssignment] = useState(null); // <-- State to hold the assignment being edited

    // Fetch assignments (no changes here)
    useEffect(() => {
        if (!classId) return;
        const assignmentsRef = collection(db, 'classes', classId, 'assignments');
        const q = query(assignmentsRef);
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedAssignments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAssignments(fetchedAssignments);
        });
        return () => unsubscribe();
    }, [classId]);

    // Handle creating an assignment (no changes here)
    const handleCreateAssignment = async (assignmentData) => {
        const assignmentsRef = collection(db, 'classes', classId, 'assignments');
        await addDoc(assignmentsRef, { ...assignmentData, createdAt: serverTimestamp(), creatorId: auth.currentUser.uid });
    };

    // --- NEW: Function to open the edit modal ---
    const handleOpenEditModal = (assignment) => {
        setCurrentAssignment(assignment);
        setIsEditModalOpen(true);
    };

    // --- NEW: Function to handle the update ---
    const handleUpdateAssignment = async (updatedData) => {
        if (!currentAssignment) return;
        const docRef = doc(db, 'classes', classId, 'assignments', currentAssignment.id);
        await updateDoc(docRef, updatedData);
    };
    
    // Handle deleting an assignment (no changes here)
    const handleDeleteAssignment = async (assignmentId) => {
        if (!window.confirm("Are you sure you want to delete this assignment?")) return;
        const docRef = doc(db, 'classes', classId, 'assignments', assignmentId);
        await deleteDoc(docRef);
    };

    return (
        <div className="assignments-container">
            <CreateAssignmentModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateAssignment}
            />
            {/* --- NEW: Render the Edit modal --- */}
            <EditAssignmentModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleUpdateAssignment}
                assignmentData={currentAssignment}
            />
            <div className="assignments-header">
                <h2>Assignments</h2>
                <button className="create-assignment-btn" onClick={() => setIsCreateModalOpen(true)}>
                    <FaPlus size={12} /> Create Assignment
                </button>
            </div>
            <div className="assignments-content">
                {assignments.length === 0 ? (
                    <div className="no-assignments-placeholder">
                        <FaCalendarAlt className="no-assignments-icon" />
                        <h3>No assignments yet</h3>
                        <p>Assignments will appear here when created</p>
                    </div>
                ) : (
                    <ul className="assignment-list">
                        {assignments.map(asm => (
                            <li key={asm.id} className="assignment-item">
                                <div className="assignment-info">
                                    <h4>{asm.title}</h4>
                                    <h3>{asm.instructions}</h3>
                                    <p>Due: {asm.dueDate}</p>
                                </div>
                                {/* --- UPDATED: Container for both buttons --- */}
                                <div className="assignment-actions">
                                    <button onClick={() => handleOpenEditModal(asm)} className="edit-assignment-btn">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDeleteAssignment(asm.id)} className="delete-assignment-btn">
                                        <FaTrash />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Assignments;