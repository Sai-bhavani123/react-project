// src/pages/AuthPage/AuthPage.js
import React, { useState } from 'react';
import Login from '../../components/Login/Login';
import Signup from '../../components/Signup/Signup';
import './AuthPage.css';

// Importing icons for the info panel
import { IoSchoolOutline } from 'react-icons/io5';
import { BsPeople, BsChatDots } from 'react-icons/bs';
import { BiBookContent } from 'react-icons/bi';

const AuthPage = () => {
    // State to control which form is shown. true = Login, false = Signup.
    const [isLoginView, setIsLoginView] = useState(true);

    // Function to pass down to children to toggle the view
    const toggleView = () => {
        setIsLoginView(!isLoginView);
    };

    return (
        <div className="auth-page-container">
            <div className="auth-layout">
                {/* Left Info Panel (Shared Layout) */}
                <div className="info-panel">
                    <div className="logo-container">
                        <IoSchoolOutline className="logo-icon" />
                        <div className="logo-text">
                            <h1>ClassSync</h1>
                            <p>Virtual Learning Platform</p>
                        </div>
                    </div>
                    <h2 className="headline">
                        Transform Your<br />
                        <span>Learning Experience</span>
                    </h2>
                    <p className="description">
                        Connect teachers and students in a dynamic virtual classroom environment with real-time collaboration and comprehensive learning tools.
                    </p>
                    <ul className="feature-list">
                        <li className="feature-item">
                            <span className="feature-icon green"><BsPeople /></span>
                            Interactive Live Classes
                        </li>
                        <li className="feature-item">
                            <span className="feature-icon blue"><BiBookContent /></span>
                            Resource Sharing & Assignments
                        </li>
                        <li className="feature-item">
                            <span className="feature-icon purple"><BsChatDots /></span>
                            Real-time Chat & Collaboration
                        </li>
                    </ul>
                </div>

                {/* Right Form Panel (Conditionally Renders Login or Signup) */}
                <div className="form-panel">
                    {isLoginView ? (
                        <Login onSwitchToSignup={toggleView} />
                    ) : (
                        <Signup onSwitchToLogin={toggleView} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;