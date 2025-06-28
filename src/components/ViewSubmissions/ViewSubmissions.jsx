import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import './ViewSubmissions.css';

const ViewSubmissions = ({ classId, assignmentId }) => {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const submissionsRef = collection(db, 'classes', classId, 'assignments', assignmentId, 'submissions');
        const q = query(submissionsRef, orderBy('submittedAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setSubmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, [classId, assignmentId]);

    return (
        <div className="submissions-wrapper">
            <h4>Submissions ({submissions.length})</h4>
            {submissions.length > 0 ? (
                <ul className="submission-list">
                    {submissions.map(sub => (
                        <li key={sub.id} className="submission-item">
                            <div className="submission-item-info">
                                <strong>{sub.studentName}</strong>
                                {sub.comments && <p>"{sub.comments}"</p>}
                            </div>
                            <a href={sub.driveLink} target="_blank" rel="noopener noreferrer" className="submission-link">
                                View Submission
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No submissions yet.</p>
            )}
        </div>
    );
};

export default ViewSubmissions;