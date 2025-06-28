// src/layouts/AuthLayout.js
import React from 'react';
import './AuthLayout.css';
import { IoSchoolOutline } from 'react-icons/io5';
import { BsPeople, BsChatDots } from 'react-icons/bs';
import { BiBookContent } from 'react-icons/bi';

const AuthLayout = ({ children }) => {
    return (
        <div className="auth-page-container">
            <div className="auth-layout">
                {/* Left Info Panel */}
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

                {/* Right Form Panel */}
                <div className="form-panel">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;