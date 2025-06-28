// // src/pages/ClassDetailPage/ClassDetailPage.js
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { doc, onSnapshot } from 'firebase/firestore';
// import { db } from '../../firebase/firebaseConfig';
// import './ClassDetailPage.css';
// import { FaArrowLeft, FaComments, FaBook, FaClipboardList } from 'react-icons/fa';

// const ClassDetailPage = () => {
//     const { classId } = useParams(); // Get classId from the URL
//     const [classDetails, setClassDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'resources', 'assignments'

//     useEffect(() => {
//         const docRef = doc(db, 'classes', classId);
//         const unsubscribe = onSnapshot(docRef, (docSnap) => {
//             if (docSnap.exists()) {
//                 setClassDetails({ id: docSnap.id, ...docSnap.data() });
//             } else {
//                 console.log("No such document!");
//             }
//             setLoading(false);
//         });

//         return () => unsubscribe();
//     }, [classId]);

//     if (loading) {
//         return <div>Loading class details...</div>;
//     }

//     if (!classDetails) {
//         return <div>Class not found.</div>;
//     }

//     return (
//         <div className="class-detail-container">
//             <Link to="/dashboard" className="back-link">
//                 <FaArrowLeft /> Back to Dashboard
//             </Link>

//             <header className="class-header">
//                 <h1>{classDetails.className}</h1>
//                 <p className="class-id">Class ID: {classDetails.id}</p>
//             </header>

//             <nav className="class-tabs">
//                 <button 
//                     className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('chat')}>
//                     <FaComments /> Chat
//                 </button>
//                 <button 
//                     className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('resources')}>
//                     <FaBook /> Resources
//                 </button>
//                 <button 
//                     className={`tab-btn ${activeTab === 'assignments' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('assignments')}>
//                     <FaClipboardList /> Assignments
//                 </button>
//             </nav>

//             <main className="tab-content">
//                 {activeTab === 'chat' && (
//                     <div>
//                         <h2>Class Chat</h2>
//                         {/* Real-time chat implementation would go here */}
//                     </div>
//                 )}
//                 {activeTab === 'resources' && (
//                     <div>
//                         <h2>Resources</h2>
//                         {/* Resource sharing implementation would go here */}
//                     </div>
//                 )}
//                 {activeTab === 'assignments' && (
//                     <div>
//                         <h2>Assignments</h2>
//                         {/* Assignment management implementation would go here */}
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default ClassDetailPage;


// src/pages/ClassDetailPage/ClassDetailPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { doc, onSnapshot } from 'firebase/firestore';
// import { db } from '../../firebase/firebaseConfig';
// import './ClassDetailPage.css';
// import { FaArrowLeft, FaComments, FaBook, FaClipboardList } from 'react-icons/fa';
// import Chat from '../../components/Chat/Chat'; // Import the Chat component

// const ClassDetailPage = () => {
//     const { classId } = useParams();
//     const [classDetails, setClassDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [activeTab, setActiveTab] = useState('chat'); // Default to the 'chat' tab

//     // Fetch the details of the specific class from Firestore
//     useEffect(() => {
//         const docRef = doc(db, 'classes', classId);
//         const unsubscribe = onSnapshot(docRef, (docSnap) => {
//             if (docSnap.exists()) {
//                 setClassDetails({ id: docSnap.id, ...docSnap.data() });
//             } else {
//                 console.log("No such document!");
//             }
//             setLoading(false);
//         });
//         return () => unsubscribe();
//     }, [classId]);

//     // Show a loading message while fetching data
//     if (loading) {
//         return <div style={{ padding: '2rem' }}>Loading class details...</div>;
//     }

//     // Show a message if the class isn't found
//     if (!classDetails) {
//         return <div style={{ padding: '2rem' }}>Class not found.</div>;
//     }

//     return (
//         <div className="class-detail-container">
//             {/* "Back to Dashboard" Link */}
//             <Link to="/dashboard" className="back-link">
//                 <FaArrowLeft /> Back to Dashboard
//             </Link>

//             {/* Class Title and ID */}
//             <header className="class-header">
//                 <h1>{classDetails.className}</h1>
//                 <p className="class-id">Class ID: {classDetails.id}</p>
//             </header>

//             {/* Tab Navigation */}
//             <nav className="class-tabs">
//                  <button 
//                     className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('chat')}>
//                     <FaComments /> Chat
//                 </button>
//                 <button 
//                     className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('resources')}>
//                     <FaBook /> Resources
//                 </button>
//                 <button 
//                     className={`tab-btn ${activeTab === 'assignments' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('assignments')}>
//                     <FaClipboardList /> Assignments
//                 </button>
//             </nav>

//             {/* Main Content Area where the selected tab's content is rendered */}
//             <main className="tab-content">
//                 {/* --- THIS IS THE KEY PART --- */}
//                 {/* If the active tab is 'chat', render the full Chat component */}
//                 {activeTab === 'chat' && (
//                     <Chat classId={classId} />
//                 )}

//                 {/* Placeholder for the 'Resources' tab */}
//                 {activeTab === 'resources' && (
//                     <div>
//                         <h2>Resources</h2>
//                         <p>This feature is coming soon.</p>
//                     </div>
//                 )}

//                 {/* Placeholder for the 'Assignments' tab */}
//                 {activeTab === 'assignments' && (
//                     <div>
//                         <h2>Assignments</h2>
//                         <p>This feature is coming soon.</p>
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default ClassDetailPage;


// src/pages/ClassDetailPage/ClassDetailPage.jsx
// src/pages/ClassDetailPage/ClassDetailPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { doc, onSnapshot } from 'firebase/firestore';
// import { db } from '../../firebase/firebaseConfig';
// import './ClassDetailPage.css';
// import { FaArrowLeft, FaComments, FaBook, FaClipboardList } from 'react-icons/fa';
// import Chat from '../../components/Chat/Chat';
// import Resources from '../../components/ResourcesTab/ResourcesTab';
// import Assignments from '../../components/Assignments/Assignments'; 
// // <-- IMPORT THE NEW COMPONENT

// const ClassDetailPage = () => {
//     // ... (existing state and useEffect logic remains the same)
//     const { classId } = useParams();
//     const [classDetails, setClassDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [activeTab, setActiveTab] = useState('chat');

//     useEffect(() => {
//         const docRef = doc(db, 'classes', classId);
//         const unsubscribe = onSnapshot(docRef, (docSnap) => {
//             if (docSnap.exists()) {
//                 setClassDetails({ id: docSnap.id, ...docSnap.data() });
//             }
//             setLoading(false);
//         });
//         return () => unsubscribe();
//     }, [classId]);

//     if (loading) return <div>Loading...</div>;
//     if (!classDetails) return <div>Class not found.</div>;

//     return (
//         <div className="class-detail-container">
//             {/* ... (Back link and Header remain the same) ... */}
//             <Link to="/dashboard" className="back-link">
//                 <FaArrowLeft /> Back to Dashboard
//             </Link>
//             <header className="class-header">
//                 <h1>{classDetails.className}</h1>
//                 <p className="class-id">Class ID: {classDetails.id}</p>
//             </header>

//             {/* ... (Tabs remain the same) ... */}
//             <nav className="class-tabs">
//                  <button 
//                     className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('chat')}>
//                     <FaComments /> Chat
//                 </button>
//                 <button 
//                     className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('resources')}>
//                     <FaBook /> Resources
//                 </button>
//                 <button 
//                     className={`tab-btn ${activeTab === 'assignments' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('assignments')}>
//                     <FaClipboardList /> Assignments
//                 </button>
//             </nav>

//             <main className="tab-content">
//                 {activeTab === 'chat' && <Chat classId={classId} />}
//                 {activeTab === 'resources' && <Resources classId={classId} />}

//                 {/* --- THIS IS THE UPDATED PART --- */}
//                 {activeTab === 'assignments' && <Assignments classId={classId} />}
//             </main>
//         </div>
//     );
// };

// export default ClassDetailPage;


// src/pages/ClassDetailPage/ClassDetailPage.jsx

// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { doc, onSnapshot } from 'firebase/firestore';
// import { db } from '../../firebase/firebaseConfig';
// import './ClassDetailPage.css';

// // Import Icons
// import { FaArrowLeft, FaComments, FaBook, FaClipboardList } from 'react-icons/fa';

// // Import the components for each tab
// import Chat from '../../components/Chat/Chat';
// import ResourcesTab from '../../components/ResourcesTab/ResourcesTab';
// import AssignmentsTab from '../../components/AssignmentsTab/AssignmentsTab';

// const ClassDetailPage = () => {
//     const { classId } = useParams(); // Get the classId from the URL (e.g., /class/XYZ123)
//     const [classDetails, setClassDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [activeTab, setActiveTab] = useState('chat'); // Default to showing the 'chat' tab

//     // This effect runs when the component loads or the classId changes.
//     // It fetches the specific class's details from Firestore.
//     useEffect(() => {
//         if (!classId) return;

//         const docRef = doc(db, 'classes', classId);
//         const unsubscribe = onSnapshot(docRef, (docSnap) => {
//             if (docSnap.exists()) {
//                 // If the document exists, store its data in our state
//                 setClassDetails({ id: docSnap.id, ...docSnap.data() });
//             } else {
//                 console.log("Class document not found!");
//             }
//             setLoading(false); // We're done loading
//         });

//         // Cleanup the listener when the component unmounts
//         return () => unsubscribe();
//     }, [classId]);

//     // Show a loading message while fetching data
//     if (loading) {
//         return <div className="class-detail-container">Loading class details...</div>;
//     }

//     // Show a message if the class could not be found
//     if (!classDetails) {
//         return <div className="class-detail-container">Class not found.</div>;
//     }

//     return (
//         <div className="class-detail-container">
//             {/* Back to Dashboard Link */}
//             <Link to="/dashboard" className="back-link">
//                 <FaArrowLeft /> Back to Dashboard
//             </Link>

//             {/* Page Header */}
//             <header className="class-header">
//                 <h1>{classDetails.className}</h1>
//                 <p className="class-id">Class ID: {classDetails.id}</p>
//             </header>

//             {/* Tab Navigation */}
//             <nav className="class-tabs">
//                  <button 
//                     className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('chat')}>
//                     <FaComments /> Chat
//                 </button>
//                 <button 
//                     className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('resources')}>
//                     <FaBook /> Resources
//                 </button>
//                 <button 
//                     className={`tab-btn ${activeTab === 'assignments' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('assignments')}>
//                     <FaClipboardList /> Assignments
//                 </button>
//             </nav>

//             {/* Content Area for the Active Tab */}
//             <main className="tab-content">
//                 {/* Conditionally render the component based on the activeTab state */}
//                 {activeTab === 'chat' && <Chat classId={classId} />}

//                 {activeTab === 'resources' && <ResourcesTab classId={classId} />}

//                 {activeTab === 'assignments' && <AssignmentsTab classId={classId} />}
//             </main>
//         </div>
//     );
// };

// export default ClassDetailPage;
// src/pages/ClassDetailPage/ClassDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // <-- Use Link for navigation
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConfig';
import './ClassDetailPage.css';

// Import Icons
import { FaArrowLeft, FaComments, FaBook, FaClipboardList } from 'react-icons/fa';

// Import the components for each tab
import Chat from '../../components/Chat/Chat';
import ResourcesTab from '../../components/ResourcesTab/ResourcesTab';
import AssignmentsTab from '../../components/AssignmentsTab/AssignmentsTab';

const ClassDetailPage = () => {
    const { classId } = useParams();
    const [classDetails, setClassDetails] = useState(null);
    const [userRole, setUserRole] = useState(null); // State to hold the user's role
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('chat');

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            setLoading(false);
            return; // Exit if no user
        }

        // --- STEP 1: Fetch the current user's role from Firestore ---
        const fetchUserRole = async () => {
            const userDocRef = doc(db, 'users', user.uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                setUserRole(userDocSnap.data().role);
            }
        };

        // --- STEP 2: Fetch the class details (as before) ---
        const classDocRef = doc(db, 'classes', classId);
        const unsubscribe = onSnapshot(classDocRef, (docSnap) => {
            if (docSnap.exists()) {
                setClassDetails({ id: docSnap.id, ...docSnap.data() });
            } else {
                console.log("Class document not found!");
            }
            setLoading(false);
        });

        fetchUserRole();
        return () => unsubscribe();
    }, [classId]);

    // --- STEP 3: Determine the correct dashboard path based on the role ---
    const dashboardPath = userRole === 'teacher' ? '/dashboard' : '/student-dashboard';

    if (loading) return <div className="class-detail-container">Loading...</div>;
    if (!classDetails) return <div className="class-detail-container">Class not found.</div>;

    return (
        <div className="class-detail-container">
            {/* The "Back to Dashboard" link now points to the dynamic path */}
            <Link to={dashboardPath} className="back-link">
                <FaArrowLeft /> Back to Dashboard
            </Link>

            {/* Page Header with Class ID */}
            <header className="class-header">
                <h1>{classDetails.className}</h1>
                <p className="class-id">Class ID: {classDetails.id}</p>
            </header>

            {/* Tab Navigation */}
            <nav className="class-tabs">
                 <button 
                    className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
                    onClick={() => setActiveTab('chat')}>
                    <FaComments /> Chat
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
                    onClick={() => setActiveTab('resources')}>
                    <FaBook /> Resources
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'assignments' ? 'active' : ''}`}
                    onClick={() => setActiveTab('assignments')}>
                    <FaClipboardList /> Assignments
                </button>
            </nav>

            {/* Content Area for the Active Tab */}
            <main className="tab-content">
                {activeTab === 'chat' && <Chat classId={classId} />}
                {activeTab === 'resources' && <ResourcesTab classId={classId} />}
                {/* {activeTab === 'assignments' && <AssignmentsTab classId={classId} />} */}
                {activeTab === 'assignments' && <AssignmentsTab classId={classId} userRole={userRole} />}


            </main>
        </div>
    );
};

export  default ClassDetailPage;

// src/pages/ClassDetailPage/ClassDetailPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { doc, onSnapshot, getDoc } from 'firebase/firestore';
// import { auth, db } from '../../firebase/firebaseConfig';
// import './ClassDetailPage.css';

// // Import all necessary components and icons
// import { FaArrowLeft, FaComments, FaBook, FaClipboardList } from 'react-icons/fa';
// import Chat from '../../components/Chat/Chat';
// import AssignmentsTab from '../../components/AssignmentsTab/AssignmentsTab';


// const ClassDetailPage = () => {
//     const { classId } = useParams();
//     const [classDetails, setClassDetails] = useState(null);
//     const [userRole, setUserRole] = useState(null); // State to hold the user's role
//     const [loading, setLoading] = useState(true);
//     const [activeTab, setActiveTab] = useState('assignments'); // Default to assignments to show the result
//     const user = auth.currentUser;

//     useEffect(() => {
//         if (!user) return; // Make sure we have a user before doing anything

//         // 1. Fetch the details of the class itself
//         const classDocRef = doc(db, 'classes', classId);
//         const unsubscribeClass = onSnapshot(classDocRef, (docSnap) => {
//             if (docSnap.exists()) {
//                 setClassDetails({ id: docSnap.id, ...docSnap.data() });
//             }
//             // Don't stop loading until we also have the user role
//         });

//         // 2. Fetch the role of the currently logged-in user from the 'users' collection
//         const fetchUserRole = async () => {
//             const userDocRef = doc(db, 'users', user.uid);
//             const userDoc = await getDoc(userDocRef);
//             if (userDoc.exists()) {
//                 setUserRole(userDoc.data().role); // Set the role (e.g., 'teacher' or 'student')
//             }
//             setLoading(false); // Now we can stop loading
//         };

//         fetchUserRole();

//         // Cleanup the listener when the component unmounts
//         return () => unsubscribeClass();
//     }, [classId, user]);

//     // Show a loading message until both class details and user role are fetched
//     if (loading) {
//         return <div style={{ padding: '2rem' }}>Loading Class...</div>;
//     }

//     if (!classDetails) {
//         return <div style={{ padding: '2rem' }}>Class not found.</div>;
//     }

//     return (
//         <div className="class-detail-container">
//             <Link to="/dashboard" className="back-link">
//                 <FaArrowLeft /> Back to Dashboard
//             </Link>

//             <header className="class-header">
//                 <h1>{classDetails.className}</h1>
//                 <p className="class-id">Class ID: {classDetails.id}</p>
//             </header>

//             <nav className="class-tabs">
//                 <button className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}><FaComments /> Chat</button>
//                 <button className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`} onClick={() => setActiveTab('resources')}><FaBook /> Resources</button>
//                 <button className={`tab-btn ${activeTab === 'assignments' ? 'active' : ''}`} onClick={() => setActiveTab('assignments')}><FaClipboardList /> Assignments</button>
//             </nav>

//             <main className="tab-content">
//                 {activeTab === 'chat' && <Chat classId={classId} />}
//                 {/* {activeTab === 'resources' && (
//                     <div><h2>Resources</h2><p>Feature coming soon.</p></div>
//                 )} */}

//                 {activeTab === 'assignments' && (
//                     // 3. Pass the user's role down to the AssignmentsTab component
//                     <AssignmentsTab classId={classId} userRole={userRole} />
//                 )}
//             </main>
//         </div>
//     );
// };

// export default ClassDetailPage;