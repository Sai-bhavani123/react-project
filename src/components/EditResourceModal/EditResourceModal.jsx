// // src/components/EditResourceModal/EditResourceModal.jsx
// import React, { useState, useEffect } from 'react';
// import './EditResourceModal.css';

// const EditResourceModal = ({ isOpen, onClose, onSubmit, resource }) => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [link, setLink] = useState('');

//     useEffect(() => {
//         if (resource) {
//             setTitle(resource.title || '');
//             setDescription(resource.description || '');
//             setLink(resource.link || '');
//         }
//     }, [resource]);

//     if (!isOpen || !resource) return null;

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSubmit(resource.id, { title, description, link });
//         onClose();
//     };

//     return (
//         <div className="modal-overlay" onClick={onClose}>
//             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                 <h2>Edit Resource</h2>
//                 <form onSubmit={handleSubmit} className="modal-form">
//                     <input
//                         type="text"
//                         placeholder="Resource Title"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         required
//                     />
//                     <textarea
//                         placeholder="Description (optional)"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                     />
//                     <input
//                         type="url"
//                         placeholder="Resource Link"
//                         value={link}
//                         onChange={(e) => setLink(e.target.value)}
//                         required
//                     />
//                     <div className="button-container">
//                         <button type="button" className="modal-button cancel-btn" onClick={onClose}>Cancel</button>
//                         <button type="submit" className="modal-button update-btn">Update Resource</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default EditResourceModal;
// import React, { useState, useEffect } from 'react';
// import './EditAssignmentModal.css';

// const EditAssignmentModal = ({ isOpen, onClose, onSubmit, assignment }) => {
//     const [title, setTitle] = useState('');
//     const [instructions, setInstructions] = useState('');
//     const [dueDate, setDueDate] = useState('');

//     // When the modal opens, populate the fields with the existing assignment data
//     useEffect(() => {
//         if (assignment) {
//             setTitle(assignment.title);
//             setInstructions(assignment.instructions);
//             setDueDate(assignment.dueDate);
//         }
//     }, [assignment]);

//     if (!isOpen) return null;

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSubmit({ title, instructions, dueDate });
//         onClose();
//     };

//     return (
//         <div className="modal-overlay" onClick={onClose}>
//             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                 <h2>Edit Assignment</h2>
//                 <form onSubmit={handleSubmit} className="modal-form">
//                     <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
//                     <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} />
//                     <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
//                     <div className="button-container">
//                         <button type="button" className="modal-button cancel-btn" onClick={onClose}>Cancel</button>
//                         <button type="submit" className="modal-button create-btn">Save Changes</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default EditAssignmentModal;
import React, { useState, useEffect } from 'react';
import './EditResourceModal.css';

const EditResourceModal = ({ isOpen, onClose, onSubmit, resource }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        if (resource) {
            setTitle(resource.title || '');
            setDescription(resource.description || '');
            setLink(resource.link || '');
        }
    }, [resource]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            id: resource.id, // ✅ Include ID for updating in Firestore
            title,
            description,
            link,
        });
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Edit Resource</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                    <input type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Resource Link" required />
                    <div className="button-container">
                        <button type="button" className="modal-button cancel-btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="modal-button create-btn">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditResourceModal;
