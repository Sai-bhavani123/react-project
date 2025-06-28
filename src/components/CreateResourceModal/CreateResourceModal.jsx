// // src/components/CreateResourceModal/CreateResourceModal.jsx
// import React, { useState } from 'react';
// import './CreateResourceModal.css';

// const CreateResourceModal = ({ isOpen, onClose, onSubmit }) => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [link, setLink] = useState(''); // For URLs or file links

//     if (!isOpen) return null;

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!title || !link) {
//             alert("Please provide a title and a link for the resource.");
//             return;
//         }
//         onSubmit({ title, description, link });
//         onClose();
//         // Clear form for next time
//         setTitle('');
//         setDescription('');
//         setLink('');
//     };

//     return (
//         <div className="modal-overlay" onClick={onClose}>
//             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                 <h2>Add New Resource</h2>
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
//                         placeholder="Resource Link (e.g., Google Drive, YouTube)"
//                         value={link}
//                         onChange={(e) => setLink(e.target.value)}
//                         required
//                     />
//                     <div className="button-container">
//                         <button type="button" className="modal-button cancel-btn" onClick={onClose}>Cancel</button>
//                         <button type="submit" className="modal-button create-btn">Add Resource</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CreateResourceModal;

import React, { useState } from 'react';
import './CreateResourceModal.css';

const CreateResourceModal = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description, link });
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Upload New Resource</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <input type="text" placeholder="Resource Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input type="url" placeholder="Link (Google Drive, YouTube, etc.)" value={link} onChange={(e) => setLink(e.target.value)} required />
                    <div className="button-container">
                        <button type="button" className="modal-button cancel-btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="modal-button create-btn">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateResourceModal;