'use client';

import { useState } from 'react';

import AdminComplaints from '@/Components/AdminComplaints';
import AdminSuggestions from '@/Components/AdminSuggestions';
import AdminRequests from '@/Components/AdminRequests';

import './adminD.css';

export default function TabsPage() {
  const [activeTab, setActiveTab] = useState(1);

  const renderContent = () => {
    switch (activeTab) {
      case 1: return <AdminComplaints/>;
      case 2: return <AdminSuggestions/>;
      case 3: return <AdminRequests/>;
      default: return null;
    }
  };
  const handleLogout = () => {
  localStorage.clear(); 

  window.location.href = '/Login_Admin';
};
  return (
    <div className="container">
        <div className="dashboard-header">
                <div>
                    <h2>Student Dashboard</h2>
                    <p>Welcome, <span id="studentName">Student</span></p>
                </div>ComplaintsUserTab

          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>

        </div>
      <div className="tab-buttons">
        <nav className="dashboard-nav">
                <ul className="nav-tabs">
                  <li className="nav-tab">
                    <button
                      className={`nav-button ${activeTab === 1 ? 'active' : ''}`}
                      onClick={() => setActiveTab(1)}
                    >
                        Complaints
                    </button>
                  </li>
                  <li className="nav-tab">
                    <button
                      className={`nav-button ${activeTab === 2 ? 'active' : ''}`}
                      onClick={() => setActiveTab(2)}
                    >
                        Suggestions
                    </button>
                  </li>
                  <li className="nav-tab">
                    <button
                      className={`nav-button ${activeTab === 3 ? 'active' : ''}`}
                      onClick={() => setActiveTab(3)}
                    >
                        Requests
                    </button>
                  </li>
                  <li className="nav-tab">
                    <button
                      className={`nav-button ${activeTab === 4 ? 'active' : ''}`}
                      onClick={() => setActiveTab(4)}
                    >
                      Statistcs
                    </button>
                  </li>
                </ul>
              </nav>
      </div>

      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
}