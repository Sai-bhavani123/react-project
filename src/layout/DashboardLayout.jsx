// src/layouts/DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import './DashboardLayout.css';

const DashboardLayout = () => {
    return (
        <div className="dashboard-layout">
            <Header />
            <main className="dashboard-main">
                <Outlet /> {/* Child routes (like TeacherDashboard) will render here */}
            </main>
        </div>
    );
};

export default DashboardLayout;