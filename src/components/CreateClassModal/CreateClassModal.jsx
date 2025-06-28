// // src/components/CreateClassModal/CreateClassModal.js
// import React, { useState } from 'react';
// import './CreateClassModal.css';
// import { FaRegCalendarAlt } from 'react-icons/fa';

// const CreateClassModal = ({ isOpen, onClose, onSubmit }) => {
//     const [className, setClassName] = useState('');
//     const [description, setDescription] = useState('');
//     const [schedule, setSchedule] = useState('');
//     const [meetingLink, setMeetingLink] = useState('');

//     if (!isOpen) {
//         return null;
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!className || !schedule) {
//             alert('Please fill in at least the Class Name and Schedule.');
//             return;
//         }
//         // Pass the form data to the parent component
//         onSubmit({
//             className,
//             description,
//             schedule,
//             meetingLink
//         });
//         // Clear form and close modal
//         setClassName('');
//         setDescription('');
//         setSchedule('');
//         setMeetingLink('');
//         onClose();
//     };

//     return (
//         <div className="modal-overlay" onClick={onClose}>
//             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                 <h2>Create New Class</h2>
//                 <form onSubmit={handleSubmit} className="modal-form">
//                     <input
//                         type="text"
//                         placeholder="Class Name"
//                         value={className}
//                         onChange={(e) => setClassName(e.target.value)}
//                         required
//                     />
//                     <textarea
//                         placeholder="Description"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                     />
//                     <div className="date-time-input-wrapper">
//                          <input
//                             type="datetime-local"
//                             value={schedule}
//                             onChange={(e) => setSchedule(e.target.value)}
//                             required
//                         />
//                         <FaRegCalendarAlt className="calendar-icon" />
//                     </div>
//                     <input
//                         type="url"
//                         placeholder="Live Meeting Link (e.g., Google Meet URL)"
//                         value={meetingLink}
//                         onChange={(e) => setMeetingLink(e.target.value)}
//                     />
//                     <div className="button-container">
//                         <button type="button" className="modal-button cancel-btn" onClick={onClose}>
//                             Cancel
//                         </button>
//                         <button type="submit" className="modal-button create-btn">
//                             Create Class
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CreateClassModal;
import React, { useState, useEffect } from 'react';
import './CreateClassModal.css';

const CreateClassModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [className, setClassName] = useState('');
  const [description, setDescription] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [scheduledDateTime, setScheduledDateTime] = useState('');

  // Pre-fill fields if editing an existing class
  useEffect(() => {
    if (initialData) {
      setClassName(initialData.className || '');
      setDescription(initialData.description || '');
      setMeetingLink(initialData.meetingLink || '');
      setScheduledDateTime(initialData.scheduledDateTime || '');
    } else {
      setClassName('');
      setDescription('');
      setMeetingLink('');
      setScheduledDateTime('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      className,
      description,
      meetingLink,
      scheduledDateTime,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create New Class</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            placeholder="Class Name"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="datetime-local"
            value={scheduledDateTime}
            onChange={(e) => setScheduledDateTime(e.target.value)}
          />
          <input
            type="url"
            placeholder="Live Meeting Link (e.g., Google Meet URL)"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
          />
          <div className="button-container">
            <button type="button" className="modal-button cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="modal-button create-btn">
              {initialData ? 'Save Changes' : 'Create Class'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClassModal;
