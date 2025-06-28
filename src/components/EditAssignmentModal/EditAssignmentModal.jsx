// src/components/EditAssignmentModal/EditAssignmentModal.jsx
import React, { useState, useEffect } from 'react';
import './EditAssignmentModal.css';

const EditAssignmentModal = ({ isOpen, onClose, onSubmit, assignmentData }) => {
    const [title, setTitle] = useState('');
    const [instructions, setInstructions] = useState('');
    const [dueDate, setDueDate] = useState('');

    // This effect runs when the modal is opened with assignment data
    useEffect(() => {
        if (assignmentData) {
            setTitle(assignmentData.title || '');
            setInstructions(assignmentData.instructions || '');
            setDueDate(assignmentData.dueDate || '');
        }
    }, [assignmentData]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, instructions, dueDate });
        onClose(); // Close the modal after submitting
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Edit Assignment</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <input
                        type="text"
                        placeholder="Assignment Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Instructions"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                    />
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                    <div className="button-container">
                        <button type="button" className="modal-button cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="modal-button create-btn">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAssignmentModal;

// src/components/AssignmentsTab/AssignmentsTab.jsx

// import React, { useState, useEffect } from 'react';
// import { db } from '../../firebase/firebaseConfig';
// import { collection, query, onSnapshot, addDoc, doc, deleteDoc, serverTimestamp, orderBy } from 'firebase/firestore';
// import { FaPlus, FaPen, FaTrash } from 'react-icons/fa';
// import CreateAssignmentModal from '../CreateAssignmentModal/CreateAssignmentModal';
// import './  EditAssignmentModal.css';

// const AssignmentsTab = ({ classId }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [assignments, setAssignments] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Effect to fetch assignments in real-time
//     useEffect(() => {
//         if (!classId) return;

//         const assignmentsRef = collection(db, 'classes', classId, 'assignments');
//         const q = query(assignmentsRef, orderBy('createdAt', 'desc'));

//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setAssignments(data);
//             setLoading(false);
//         }, (error) => {
//             console.error("Error fetching assignments: ", error);
//             setLoading(false);
//         });

//         return () => unsubscribe();
//     }, [classId]);

//     // Function to handle creating a new assignment
//     const handleCreateAssignment = async (assignmentData) => {
//         try {
//             const assignmentsRef = collection(db, 'classes', classId, 'assignments');
//             await addDoc(assignmentsRef, {
//                 ...assignmentData,
//                 createdAt: serverTimestamp(),
//             });
//         } catch (error) {
//             console.error("Firebase Error: Failed to create assignment.", error);
//         }
//     };

//     // Function to handle deleting an assignment
//     const handleDeleteAssignment = async (assignmentId) => {
//         if (window.confirm("Are you sure you want to delete this assignment?")) {
//             try {
//                 const assignmentDocRef = doc(db, 'classes', classId, 'assignments', assignmentId);
//                 await deleteDoc(assignmentDocRef);
//             } catch (error) {
//                 console.error("Firebase Error: Failed to delete assignment.", error);
//             }
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
//             <CreateAssignmentModal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 onSubmit={handleCreateAssignment}
//             />
//         </div>
//     );
// };

// export default AssignmentsTab;