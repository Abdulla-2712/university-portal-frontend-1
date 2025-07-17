'use client';

import { useState } from 'react';
import UserComplaints from '@/Components/UserComplaints';
import UserSuggestions from '@/Components/UserSuggestions';
import UserTracking from '@/Components/UserTracking';

import './userD.css';

export default function TabsPage() {
  const [activeTab, setActiveTab] = useState(1);

  const renderContent = () => {
    switch (activeTab) {
      case 1: return <UserComplaints/>;
      case 2: return <UserSuggestions/>;
      case 3: return <UserTracking />;
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
                </div>

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
                      Submit Complaint
                    </button>
                  </li>
                  <li className="nav-tab">
                    <button
                      className={`nav-button ${activeTab === 2 ? 'active' : ''}`}
                      onClick={() => setActiveTab(2)}
                    >
                      Submit Suggestion
                    </button>
                  </li>
                  <li className="nav-tab">
                    <button
                      className={`nav-button ${activeTab === 3 ? 'active' : ''}`}
                      onClick={() => setActiveTab(3)}
                    >
                      Track Complaints
                    </button>
                  </li>
                  <li className="nav-tab">
                    <button
                      className={`nav-button ${activeTab === 4 ? 'active' : ''}`}
                      onClick={() => setActiveTab(4)}
                    >
                      Chat Support
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