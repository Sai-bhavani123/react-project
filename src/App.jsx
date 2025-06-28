// // // // src/App.js
// // // import React from 'react';
// // // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // // import LoginPage from './pages/LoginPage';
// // // import SignupPage from './pages/SignupPage';
// // // import DashBoarPage from './pages/DashboardPages'; // Import the new page
// // // import ProtectedRoute from './utils/ProtectedRoute'; // Import the protector

// // // function App() {
// // //   return (
// // //     <Router>
// // //       <Routes>
// // //         <Route path="/login" element={<LoginPage />} />
// // //         <Route path="/signup" element={<SignupPage />} />
        
// // //         {/* Protected Dashboard Route */}
// // //         <Route 
// // //           path="/dashboard" 
// // //           element={
// // //             <ProtectedRoute>
// // //               <DashBoarPage />
// // //             </ProtectedRoute>
// // //           } 
// // //         />
        
// // //         {/* Default route redirects to login */}
// // //         <Route path="/" element={<Navigate replace to="/login" />} />
// // //       </Routes>
// // //     </Router>
// // //   );
// // // }

// // // export default App;

// // // src/App.js
// // import React, { useState, useEffect } from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import { onAuthStateChanged } from 'firebase/auth';
// // import { auth } from './firebase/firebaseConfig';

// // import AuthPage from './pages/AuthPage/AuthPage';
// // import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
// // import ClassDetailPage from './pages/ClassDetailPage/ClassDetailPage';

// // function App() {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     // This listener is key. It updates the state whenever auth status changes.
// //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
// //       console.log('Auth State Changed. User:', currentUser); // DEBUG LOG
// //       setUser(currentUser);
// //       setLoading(false);
// //     });

// //     // Cleanup subscription on unmount
// //     return () => unsubscribe();
// //   }, []);

// //   // Show a loading indicator while checking auth status
// //   if (loading) {
// //     return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
// //   }

// //   return (
// //     <Router>
// //       <Routes>
// //         <Route 
// //           path="/auth" 
// //           element={!user ? <AuthPage /> : <Navigate to="/dashboard" />} 
// //         />
// //         <Route 
// //           path="/dashboard" 
// //           element={user ? <TeacherDashboard /> : <Navigate to="/auth" />} 
// //         />
// //         {/* Default route redirects based on auth status */}
// //         <Route 
// //           path="*" 
// //           element={<Navigate to={user ? "/dashboard" : "/auth"} />} 
// //         />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;
// // 2nd

// // src/App.jsx

// // import React, { useState, useEffect } from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import { onAuthStateChanged } from 'firebase/auth';
// // import { auth } from './firebase/firebaseConfig';

// // Import all the pages with the correct names
// // import AuthPage from './pages/AuthPage/AuthPage';
// // import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
// // import ClassDetailPage from './pages/ClassDetailPage/ClassDetailPage'; // <-- CORRECTED IMPORT

// // function App() {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
// //       setUser(currentUser);
// //       setLoading(false);
// //     });
// //     return () => unsubscribe();
// //   }, []);

// //   if (loading) {
// //     return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
// //   }

// //   return (
// //     <Router>
// //       <Routes>
// //         <Route 
// //           path="/auth" 
// //           element={!user ? <AuthPage /> : <Navigate to="/dashboard" />} 
// //         />

// //         <Route 
// //           path="/dashboard" 
// //           element={user ? <TeacherDashboard /> : <Navigate to="/auth" />} 
// //         />

// //         {/* This route now uses the correct component name */}
// //         <Route 
// //           path="/class/:classId" 
// //           element={user ? <ClassDetailPage /> : <Navigate to="/auth" />} // <-- CORRECTED USAGE
// //         />

// //         <Route 
// //           path="*" 
// //           element={<Navigate to={user ? "/dashboard" : "/auth"} />} 
// //         />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;

// // src/App.jsx
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase/firebaseConfig';

// // Import Pages and the new Layout
// import AuthPage from './pages/AuthPage/AuthPage';
// import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
// import ClassDetailPage from './pages/ClassDetailPage/ClassDetailPage';
// import DashboardLayout from './layout/DashboardLayout'; // <-- IMPORT THE LAYOUT

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Router>
//       <Routes>

        
//         {/* Public route for authentication */}
//         <Route 
//           path="/auth" 
//           element={!user ? <AuthPage /> : <Navigate to="/dashboard" />} 
//         />

//         {/* Protected routes wrapped by the DashboardLayout */}
//         <Route 
//           path="/" 
//           element={user ? <DashboardLayout /> : <Navigate to="/auth" />}
//         >
//           <Route path="dashboard" element={<TeacherDashboard />} />
//           <Route path="class/:classId" element={<ClassDetailPage />} />
//           <Route index element={<Navigate to="/dashboard" />} /> {/* Default to dashboard */}
//         </Route>

        

//         {/* Catch-all redirects */}
//         <Route 
//           path="*" 
//           element={<Navigate to="/" />} 
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// src/App.jsx
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase/firebaseConfig';

// // Import Pages and Layout
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// import DashBoarPage from './pages/DashboardPages'; // Import the new page
// import ProtectedRoute from './utils/ProtectedRoute';
// import AuthPage from './pages/AuthPage/AuthPage';
// import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
// import ClassDetailPage from './pages/ClassDetailPage/ClassDetailPage';
// import DashboardLayout from './layout/DashboardLayout'; 
// // import FullScreenChatPage from './pages/FullScreenChatPage/FullScreenChatPage'; // You will create this component next

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Router>
//        {/* <Route path="/login" element={<LoginPage />} />
//        <Route path="/signup" element={<SignupPage />} /> */}
//        <Routes>
//          <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//        <Route 
//           path="/dashboard" 
//           element={
//             <ProtectedRoute>
//               <DashBoarPage />
//             </ProtectedRoute>
//           } 
//         />
//         <Route path="/" element={<Navigate replace to="/login" />} />
//      </Routes>
       
//       <Routes>
//         {/* Public route for authentication */}
//         <Route 
//           path="/auth" 
//           element={!user ? <AuthPage /> : <Navigate to="/dashboard" />} 
//         />

//         {/* 
//           This is the main container for all pages that a logged-in user can see.
//           It uses DashboardLayout, which provides the top navigation Header.
//           The <Outlet /> inside DashboardLayout will render the specific child route.
//         */}
//         <Route 
//           path="/" 
//           element={user ? <DashboardLayout /> : <Navigate to="/auth" />}
//         >
//           {/* Child Route 1: The Dashboard */}
//           <Route path="dashboard" element={<TeacherDashboard />} />
          
//           {/* Child Route 2: The Class Detail page */}
//           <Route path="class/:classId" element={<ClassDetailPage />} />

//           {/* 
//             HERE IS THE NEW ROUTE
//             Child Route 3: The dedicated, full-screen Chat page.
//             It is also a child of the DashboardLayout, so it will have the same header.
//           */}
//           <Route 
//             path="class/:classId/chat" 
//             element={<div>Full Screen Chat Page Here</div>} // Replace this with <FullScreenChatPage /> when you create it
//           />
          
//           {/* This makes sure that if a user just goes to "/", they land on the dashboard */}
//           <Route index element={<Navigate to="/dashboard" />} />
//         </Route>

//         {/* Catch-all redirects any other unknown URL back to the main entry point */}
//         <Route 
//           path="*" 
//           element={<Navigate to="/" />} 
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// src/App.jsx

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase/firebaseConfig';

// // Import our pages and layout
// import LoginPage from './pages/LoginPage/LoginPage';
// import SignupPage from './pages/SignupPage/SignupPage';
// import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
// import ClassDetailPage from './pages/ClassDetailPage/ClassDetailPage';
// import DashboardLayout from './layout/DashboardLayout';

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // This hook sets up a listener to Firebase to check the user's login status
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser); // currentUser is an object if logged in, null if not
//       setLoading(false); // We're done checking, so stop loading
//     });
//     // Cleanup the listener when the app closes
//     return () => unsubscribe();
//   }, []);

//   // Show a loading message while we check for a logged-in user
//   if (loading) {
//     return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
//   }

//   return (
//     <Router>
//       <Routes>
//         {/*
//           PUBLIC ROUTES
//           These routes are for users who are NOT logged in.
//           If a logged-in user tries to visit them, they are redirected to the dashboard.
//         */}
//         <Route 
//           path="/login" 
//           element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} 
//         />
//         <Route 
//           path="/signup" 
//           element={!user ? <SignupPage /> : <Navigate to="/dashboard" />} 
//         />

//         {/*
//           PROTECTED ROUTES
//           These routes are for users who ARE logged in.
//           They are wrapped by the DashboardLayout to get the header.
//           If a logged-out user tries to visit them, they are redirected to the login page.
//         */}
//         <Route 
//           path="/" 
//           element={user ? <DashboardLayout /> : <Navigate to="/login" />}
//         >
//           <Route path="dashboard" element={<TeacherDashboard />} />
//           <Route path="class/:classId" element={<ClassDetailPage />} />
//           {/* Default route for logged-in users */}
//           <Route index element={<Navigate to="/dashboard" />} /> 
//         </Route>

//         {/* CATCH-ALL
//             If a user types any other URL, redirect them to the appropriate starting page.
//         */}
//         <Route 
//           path="*" 
//           element={<Navigate to="/" />} 
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// src/App.jsx

// src/App.jsx

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase/firebaseConfig';

// // Import Pages, Layout, and the new Redirector
// import LoginPage from './pages/LoginPage/LoginPage';
// import SignupPage from './pages/SignupPage/SignupPage';
// import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
// import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
// import ClassDetailPage from './pages/ClassDetailPage/ClassDetailPage';
// import DashboardLayout from './layout/DashboardLayout'; 
// import RoleBasedRedirect from './components/RoleBasedRedirect/RoleBasedRedirect'; // <-- IMPORT THE NEW COMPONENT

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
//   }

//   return (
//     <Router>
//       <Routes>
//         {/*
//           PUBLIC ROUTES
//           These are only accessible when the user is NOT logged in.
//         */}
//         <Route 
//           path="/login" 
//           element={!user ? <LoginPage /> : <Navigate to="/" />} 
//         />
//         <Route 
//           path="/signup" 
//           element={!user ? <SignupPage /> : <Navigate to="/" />} 
//         />

//         {/*
//           PROTECTED ROUTES
//           All protected pages now live inside the DashboardLayout.
//         */}
//         <Route 
//           path="/" 
//           element={user ? <DashboardLayout /> : <Navigate to="/login" />}
//         >
//           {/* Specific dashboard routes */}
//           <Route path="dashboard" element={<TeacherDashboard />} />
//           <Route path="student-dashboard" element={<StudentDashboard />} />
          
//           {/* Other protected routes */}
//           <Route path="class/:classId" element={<ClassDetailPage />} />
          
//           {/* 
//             THIS IS THE KEY CHANGE
//             The `index` route now points to our smart redirector.
//             If a user is logged in and goes to "/", this component will figure out
//             which dashboard to send them to.
//           */}
//           <Route index element={<RoleBasedRedirect />} /> 
//         </Route>

//         {/* Catch-all for any other path */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';

// Import Pages and Layout
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import DashboardRouter from './pages/DashboardRouter/DashboardRouter'; // <-- IMPORT THE NEW ROUTER
import ClassDetailPage from './pages/ClassDetailPage/ClassDetailPage';
import DashboardLayout from './layout/DashboardLayout';


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" />} />

        {/* Protected Routes */}
        <Route 
          path="/" 
          element={user ? <DashboardLayout /> : <Navigate to="/login" />}
        >
          {/* THE DASHBOARD ROUTE NOW USES THE ROUTER COMPONENT */}
          <Route path="dashboard" element={<DashboardRouter />} />
          <Route path="class/:classId" element={<ClassDetailPage />} />
          <Route index element={<Navigate to="/dashboard" />} /> 
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;