// src/pages/EditClass/EditClass.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import './EditClass.css';

const EditClass = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState({ className: '', meetingLink: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const classRef = doc(db, 'classes', classId);
        const classSnap = await getDoc(classRef);
        if (classSnap.exists()) {
          const data = classSnap.data();
          setClassData({
            className: data.className || '',
            meetingLink: data.meetingLink || '',
          });
        } else {
          alert("Class not found");
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error fetching class data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClassData();
  }, [classId, navigate]);

  const handleInputChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const classRef = doc(db, 'classes', classId);
      await updateDoc(classRef, {
        className: classData.className,
        meetingLink: classData.meetingLink,
      });
      alert('Class updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating class:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-class-page">
      <h2>Edit Class</h2>
      <form onSubmit={handleSubmit} className="edit-class-form">
        <label>
          Class Name:
          <input
            type="text"
            name="className"
            value={classData.className}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Meeting Link:
          <input
            type="text"
            name="meetingLink"
            value={classData.meetingLink}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Update Class</button>
      </form>
    </div>
  );
};

export default EditClass;
