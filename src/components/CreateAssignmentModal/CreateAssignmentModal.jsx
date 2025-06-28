// src/components/CreateAssignmentModal/CreateAssignmentModal.jsx
import React, { useState } from 'react';
import './CreateAssignmentModal.css';

const CreateAssignmentModal = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [instructions, setInstructions] = useState('');
    const [dueDate, setDueDate] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !dueDate) {
            alert('Please provide a title and a due date.');
            return;
        }
        onSubmit({ title, instructions, dueDate });
        // Reset form and close
        setTitle('');
        setInstructions('');
        setDueDate('');
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Create New Assignment</h2>
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
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAssignmentModal;