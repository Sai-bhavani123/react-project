// // src/components/Resources/Resources.jsx
// import React, { useState, useEffect } from 'react';
// import { auth, db } from '../../firebase/firebaseConfig';
// import { storage } from '../../firebase/firebaseConfig'; // We need to export storage from firebaseConfig
// import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
// import { collection, query, onSnapshot, addDoc, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';
// import { FaFileUpload, FaFileAlt, FaTrash } from 'react-icons/fa';
// import './ResourcesTab.css';

// const Resources = ({ classId }) => {
//     const [resources, setResources] = useState([]);
//     const [uploading, setUploading] = useState(false);
//     const [progress, setProgress] = useState(0);

//     // Fetch resources
//     useEffect(() => {
//         if (!classId) return;
// //         const resourcesRef = collection(db, 'classes', classId, 'resources');
// //         const q = query(resourcesRef,);
// //         const unsubscribe = onSnapshot(q, (snapshot) => {
// //             const fetchedResources = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// //             setResources(fetchedResources);
// //         });
// //         return () => unsubscribe();
// //     }, [classId]);

// //     // Handle file upload
// //     const handleFileUpload = (e) => {
// //         const file = e.target.files[0];
// //         if (!file) {
// //             console.log("No file selected.");
// //             return;
// //         }

// //         console.log("File selected:", file.name); // DEBUG: Check if the function runs

// //         // The path where the file will be stored in Firebase Storage
// //         const storageRef = ref(storage, `resources/${classId}/${file.name}`);
// //         const uploadTask = uploadBytesResumable(storageRef, file);

// //         setUploading(true);

// //         uploadTask.on('state_changed',
// //             (snapshot) => {
// //                 // This part tracks the upload progress
// //                 const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
// //                 console.log('Upload is ' + prog + '% done'); // DEBUG: Check progress
// //                 setProgress(prog);
// //             },
// //             (error) => {
// //                 // This will catch any errors, including permission errors
// //                 console.error("Upload error:", error.code, error.message); // DEBUG: Check for errors
// //                 alert("Upload failed! Check the console for details.");
// //                 setUploading(false);
// //             },
// //             () => {
// //                 // This runs when the upload is complete
// //                 getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
// //                     console.log('File available at', downloadURL); // DEBUG: Check if you get the URL

// //                     // Save file metadata to Firestore
// //                     const resourcesRef = collection(db, 'classes', classId, 'resources');
// //                     await addDoc(resourcesRef, {
// //                         name: file.name,
// //                         url: downloadURL,
// //                         createdAt: serverTimestamp(),
// //                         uploaderId: auth.currentUser.uid,
// //                     });

// //                     console.log("File metadata saved to Firestore."); // DEBUG: Confirm save
// //                     setUploading(false);
// //                     setProgress(0);
// //                 });
// //             }
// //         );
// //     };

// //     // Handle file deletion
// //     const handleDeleteResource = async (resource) => {
// //         if (!window.confirm(`Are you sure you want to delete "${resource.name}"?`)) return;

// //         // Delete from Storage
// //         const fileRef = ref(storage, `resources/${classId}/${resource.name}`);
// //         await deleteObject(fileRef);

// //         // Delete from Firestore
// //         const docRef = doc(db, 'classes', classId, 'resources', resource.id);
// //         await deleteDoc(docRef);
// //     };

// //     return (
// //         <div className="resources-container">
// //             <div className="resources-header">
// //                 <h2>Resources</h2>
// //                 <label className="upload-btn">
// //                     <FaFileUpload />
// //                     Upload Resource
// //                     <input type="file" onChange={handleFileUpload} disabled={uploading} />
// //                 </label>
// //             </div>
// //             {uploading && <div className="upload-progress">Uploading: {Math.round(progress)}%</div>}
// //             <div className="resources-content">
// //                 {resources.length === 0 ? (
// //                     <div className="no-resources-placeholder">
// //                         <FaFileAlt className="no-resources-icon" />
// //                         <h3>No resources yet</h3>
// //                         <p>Resources will appear here when uploaded</p>
// //                     </div>
// //                 ) : (
// //                     <ul className="resource-list">
// //                         {resources.map(res => (
// //                             <li key={res.id} className="resource-item">
// //                                 <div className="resource-info">
// //                                     <FaFileAlt className="file-icon" />
// //                                     <a href={res.url} target="_blank" rel="noopener noreferrer">{res.name}</a>
// //                                 </div>
// //                                 <div className="resource-actions">
// //                                     <button className="delete-btn" onClick={() => handleDeleteResource(res)}>
// //                                         <FaTrash />
// //                                     </button>
// //                                 </div>
// //                             </li>
// //                         ))}
// //                     </ul>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default Resources;

// // corercted
// src/components/ResourcesTab/ResourcesTab.jsx
// import React, { useState, useEffect } from 'react';
// import { db } from '../../firebase/firebaseConfig';
// import { collection, query, onSnapshot, addDoc, doc, deleteDoc, serverTimestamp, orderBy } from 'firebase/firestore';
// import { FaPlus, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';
// import CreateResourceModal from '../CreateResourceModal/CreateResourceModal';
// import './ResourcesTab.css';

// const ResourcesTab = ({ classId }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [resources, setResources] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Fetch resources in real-time
//     useEffect(() => {
//         if (!classId) return;
//         const resourcesRef = collection(db, 'classes', classId, 'resources');
//         const q = query(resourcesRef, orderBy('createdAt', 'desc'));
//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setResources(data);
//             setLoading(false);
//         });
//         return () => unsubscribe();
//     }, [classId]);

//     // Handle creating a new resource
//     const handleCreateResource = async (resourceData) => {
//         const resourcesRef = collection(db, 'classes', classId, 'resources');
//         await addDoc(resourcesRef, {
//             ...resourceData,
//             createdAt: serverTimestamp(),
//         });
//     };

//     // Handle deleting a resource
//     const handleDeleteResource = async (resourceId) => {
//         if (window.confirm("Are you sure you want to delete this resource?")) {
//             const resourceDocRef = doc(db, 'classes', classId, 'resources', resourceId);
//             await deleteDoc(resourceDocRef);
//         }
//     };

//     return (
//         <div className="resources-container">
//             <div className="resources-header">
//                 <h2>Resources</h2>
//                 <button className="create-resource-btn" onClick={() => setIsModalOpen(true)}>
//                     <FaPlus size={12} /> Add Resource
//                 </button>
//             </div>
//             <div className="resource-list">
//                 {loading ? (
//                     <p>Loading resources...</p>
//                 ) : resources.length > 0 ? (
//                     resources.map(res => (
//                         <div key={res.id} className="resource-card">
//                             <div className="resource-info">
//                                 <h4>{res.title}</h4>
//                                 <p>{res.description}</p>
//                             </div>
//                             <div className="resource-actions">
//                                 <a href={res.link} target="_blank" rel="noopener noreferrer" className="link-btn">
//                                     <FaExternalLinkAlt /> Open Link
//                                 </a>
//                                 <button title="Delete Resource" onClick={() => handleDeleteResource(res.id)}>
//                                     <FaTrash className="delete-icon" />
//                                 </button>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No resources have been added to this class yet.</p>
//                 )}
//             </div>
//             <CreateResourceModal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 onSubmit={handleCreateResource}
//             />
//         </div>
//     );
// };

// export default ResourcesTab;

// src/components/ResourcesTab/ResourcesTab.jsx
// import React, { useState, useEffect } from 'react';
// import { db } from '../../firebase/firebaseConfig';
// // Import 'updateDoc'
// import { collection, query, onSnapshot, addDoc, doc, deleteDoc, updateDoc, serverTimestamp, orderBy } from 'firebase/firestore';
// import { FaPlus, FaTrash, FaExternalLinkAlt, FaPen } from 'react-icons/fa';
// import CreateResourceModal from '../CreateResourceModal/CreateResourceModal';
// import EditResourceModal from '../EditResourceModal/EditResourceModal'; // <-- Import Edit Modal
// import './ResourcesTab.css';

// const ResourcesTab = ({ classId }) => {
//     // Modal states
//     const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//     // State for the resource being edited
//     const [currentResource, setCurrentResource] = useState(null);

//     const [resources, setResources] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Fetch resources (no changes here)
//     useEffect(() => {
//         if (!classId) return;
//         const resourcesRef = collection(db, 'classes', classId, 'resources');
//         const q = query(resourcesRef, orderBy('createdAt', 'desc'));
//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             setResources(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//             setLoading(false);
//         });
//         return () => unsubscribe();
//     }, [classId]);

//     // Create resource (no changes here)
//     const handleCreateResource = async (resourceData) => {
//         const resourcesRef = collection(db, 'classes', classId, 'resources');
//         await addDoc(resourcesRef, { ...resourceData, createdAt: serverTimestamp() });
//     };

//     // --- NEW FUNCTION TO HANDLE UPDATING ---
//     const handleUpdateResource = async (resourceId, updatedData) => {
//         const resourceDocRef = doc(db, 'classes', classId, 'resources', resourceId);
//         await updateDoc(resourceDocRef, updatedData);
//     };

//     // Delete resource (no changes here)
//     const handleDeleteResource = async (resourceId) => {
//         if (window.confirm("Are you sure you want to delete this resource?")) {
//             const resourceDocRef = doc(db, 'classes', classId, 'resources', resourceId);
//             await deleteDoc(resourceDocRef);
//         }
//     };

//     // --- NEW FUNCTION TO OPEN THE EDIT MODAL ---
//     const openEditModal = (resource) => {
//         setCurrentResource(resource);
//         setIsEditModalOpen(true);
//     };

//     return (
//         <div className="resources-container">
//             <div className="resources-header">
//                 <h2>Resources</h2>
//                 <button className="create-resource-btn" onClick={() => setIsCreateModalOpen(true)}>
//                     <FaPlus size={12} /> Add Resource
//                 </button>
//             </div>
//             <div className="resource-list">
//                 {loading ? <p>Loading resources...</p> : 
//                  resources.length > 0 ? (
//                     resources.map(res => (
//                         <div key={res.id} className="resource-card">
//                             <div className="resource-info">
//                                 <h4>{res.title}</h4>
//                                 <p>{res.description}</p>
//                             </div>
//                             <div className="resource-actions">
//                                 <a href={res.link} target="_blank" rel="noopener noreferrer" className="link-btn">
//                                     <FaExternalLinkAlt /> Open Link
//                                 </a>
//                                 {/* --- ADDED EDIT BUTTON --- */}
//                                 <button title="Edit Resource" onClick={() => openEditModal(res)}>
//                                     <FaPen />
//                                 </button>
//                                 <button title="Delete Resource" onClick={() => handleDeleteResource(res.id)}>
//                                     <FaTrash className="delete-icon" />
//                                 </button>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No resources have been added to this class yet.</p>
//                 )}
//             </div>

//             {/* Render Both Modals */}
//             <CreateResourceModal
//                 isOpen={isCreateModalOpen}
//                 onClose={() => setIsCreateModalOpen(false)}
//                 onSubmit={handleCreateResource}
//             />
//             <EditResourceModal
//                 isOpen={isEditModalOpen}
//                 onClose={() => setIsEditModalOpen(false)}
//                 onSubmit={handleUpdateResource}
//                 resource={currentResource}
//             />
//         </div>
//     );
// };

// export default ResourcesTab;

// import React, { useState, useEffect } from 'react';
// import { db } from '../../firebase/firebaseConfig';
// import { collection, query, onSnapshot, addDoc, doc, deleteDoc, serverTimestamp, orderBy } from 'firebase/firestore';
// import { FaPlus, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';
// import CreateResourceModal from '../CreateResourceModal/CreateResourceModal';
// // import EditResourceModal from '../EditResourceModal/EditResourceModal';
// import './ResourcesTab.css';

// // The component now accepts a 'userRole' prop ('teacher' or 'student')
// const ResourcesTab = ({ classId, userRole }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [resources, setResources] = useState([]);
//     const [loading, setLoading] = useState(true);
//     // const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//     // Fetch resources in real-time (no changes needed here)
//     useEffect(() => {
//         if (!classId) return;
//         const resourcesRef = collection(db, 'classes', classId, 'resources');
//         const q = query(resourcesRef, orderBy('createdAt', 'desc'));
//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setResources(data);
//             setLoading(false);
//         });
//         return () => unsubscribe();
//     }, [classId]);

//     // Handle creating a new resource (no changes needed here)
//     const handleCreateResource = async (resourceData) => {
//         const resourcesRef = collection(db, 'classes', classId, 'resources');
//         await addDoc(resourcesRef, {
//             ...resourceData,
//             createdAt: serverTimestamp(),
//         });
//     };

//     // Handle deleting a resource (no changes needed here)
//     const handleDeleteResource = async (resourceId) => {
//         if (window.confirm("Are you sure you want to delete this resource?")) {
//             const resourceDocRef = doc(db, 'classes', classId, 'resources', resourceId);
//             await deleteDoc(resourceDocRef);
//         }
//     };
//     const openEditModal = (resource) => {
//                 setCurrentResource(resource);
//                 setIsEditModalOpen(true);
//             };

//     return (
//         <div className="resources-container">
//             <div className="resources-header">
//                 <h2>Resources</h2>
//                 {/* --- CHANGE 1: Conditionally render the "Add Resource" button --- */}
//                 {/* This button will only be visible if the userRole is 'teacher' */}
//                 {userRole === 'teacher' && (
//                     <button className="create-resource-btn" onClick={() => setIsModalOpen(true)}>
//                         <FaPlus size={12} /> Add Resource
//                     </button>
//                 )}
//             </div>
//             <div className="resource-list">
//                 {loading ? (
//                     <p>Loading resources...</p>
//                 ) : resources.length > 0 ? (
//                     resources.map(res => (
//                         <div key={res.id} className="resource-card">
//                             <div className="resource-info">
//                                 <h4>{res.title}</h4>
//                                 <p>{res.description}</p>
//                             </div>
//                             <div className="resource-actions">
//                                 <a href={res.link} target="_blank" rel="noopener noreferrer" className="link-btn">
//                                     <FaExternalLinkAlt /> Open Link
//                                 </a>
//                                 {/* --- CHANGE 2: Conditionally render the "Delete" button --- */}
//                                 {/* This button will only be visible if the userRole is 'teacher' */}
//                                 {userRole === 'teacher' && (
//                                     <button title="Delete Resource" onClick={() => handleDeleteResource(res.id)}>
//                                         <FaTrash className="delete-icon" />
//                                     </button>
//                                 //     <button title="Edit Resource" onClick={() => openEditModal(res)}>
//                                 //     <FaPen />
//                                 // </button>
//                                 )}
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No resources have been added to this class yet.</p>
//                 )}
//             </div>
//             <CreateResourceModal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 onSubmit={handleCreateResource}
//             />
//         </div>
//     );
// };

// export default ResourcesTab;

import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
import {
    collection,
    query,
    onSnapshot,
    addDoc,
    doc,
    deleteDoc,
    updateDoc,
    serverTimestamp,
    orderBy
} from 'firebase/firestore';
import { FaPlus, FaTrash, FaExternalLinkAlt, FaPen } from 'react-icons/fa';
import CreateResourceModal from '../CreateResourceModal/CreateResourceModal';
import EditResourceModal from '../EditResourceModal/EditResourceModal';
import './ResourcesTab.css';

const ResourcesTab = ({ classId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentResource, setCurrentResource] = useState(null);

    // Fetch resources in real-time
    useEffect(() => {
        if (!classId) return;
        const resourcesRef = collection(db, 'classes', classId, 'resources');
        const q = query(resourcesRef, orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setResources(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [classId]);

    // Create new resource
    const handleCreateResource = async (resourceData) => {
        const resourcesRef = collection(db, 'classes', classId, 'resources');
        await addDoc(resourcesRef, {
            ...resourceData,
            createdAt: serverTimestamp(),
        });
    };

    // Delete a resource
    const handleDeleteResource = async (resourceId) => {
        if (window.confirm("Are you sure you want to delete this resource?")) {
            const resourceDocRef = doc(db, 'classes', classId, 'resources', resourceId);
            await deleteDoc(resourceDocRef);
        }
    };

    // Edit existing resource
    const handleEditSubmit = async (updatedResource) => {
        const resourceRef = doc(db, 'classes', classId, 'resources', updatedResource.id);
        await updateDoc(resourceRef, {
            title: updatedResource.title,
            description: updatedResource.description,
            link: updatedResource.link,
        });
    };

    return (
        <div className="resources-container">
            <div className="resources-header">
                <h2>Resources</h2>
                <button className="create-resource-btn" onClick={() => setIsModalOpen(true)}>
                    <FaPlus size={12} /> Add Resource
                </button>
            </div>

            <div className="resource-list">
                {loading ? (
                    <p>Loading resources...</p>
                ) : resources.length > 0 ? (
                    resources.map(res => (
                        <div key={res.id} className="resource-card">
                            <div className="resource-info">
                                <h4>{res.title}</h4>
                                <p>{res.description}</p>
                            </div>
                            <div className="resource-actions">
                                <a
                                    href={res.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="link-btn"
                                >
                                    <FaExternalLinkAlt /> Open Link
                                </a>
                                <button
                                    title="Edit Resource"
                                    onClick={() => {
                                        setCurrentResource(res);
                                        setIsEditModalOpen(true);
                                    }}
                                >
                                    <FaPen />
                                </button>
                                <button
                                    title="Delete Resource"
                                    onClick={() => handleDeleteResource(res.id)}
                                >
                                    <FaTrash className="delete-icon" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No resources have been added to this class yet.</p>
                )}
            </div>

            {/* Create Modal */}
            <CreateResourceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateResource}
            />

            {/* Edit Modal */}
            <EditResourceModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleEditSubmit}
                resource={currentResource}
            />
        </div>
    );
};

export default ResourcesTab;
