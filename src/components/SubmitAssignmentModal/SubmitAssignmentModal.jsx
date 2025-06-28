import React, { useState } from 'react';
import './SubmitAssignmentModal.css';

const SubmitAssignmentModal = ({ isOpen, onClose, onSubmit, assignmentTitle }) => {
    const [driveLink, setDriveLink] = useState('');
    const [comments, setComments] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!driveLink) {
            alert('Please provide a link to your work.');
            return;
        }
        onSubmit({ driveLink, comments });
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Submit for: {assignmentTitle}</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <input
                        type="url"
                        placeholder="Paste your Google Drive link here"
                        value={driveLink}
                        onChange={(e) => setDriveLink(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Add private comments for your teacher (optional)"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                    />
                    <div className="button-container">
                        <button type="button" className="modal-button cancel-btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="modal-button create-btn">Submit Work</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubmitAssignmentModal;