'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Fixed import name
import { useRouter } from 'next/navigation';

import AdminComplaints from '@/Components/AdminComplaints';
import AdminSuggestions from '@/Components/AdminSuggestions';
import AdminRequests from '@/Components/AdminRequests';

import './adminD.css';

export default function TabsPage() {
    const [authorized, setAuthorized] = useState(false);
    const [activeTab, setActiveTab] = useState(1);
    const [AdminName, setAdminName] = useState('Admin');
    const router = useRouter();

        useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login_admin');
            return;
        }
        
        try {
            const decoded = jwtDecode(token); // Fixed function name
            
            // Fixed expiration check - added missing parentheses
            if (decoded.exp * 1000 < Date.now()) {
                localStorage.removeItem('token');
                router.push('/login_admin');
                return;
            }
            
            // Extract student name from token if available
            if (decoded.name || decoded.email) {
                setAdminName(decoded.name);
            }
            
            setAuthorized(true);
        } catch (err) {
            console.error('Token validation error:', err);
            localStorage.removeItem('token');
            router.push('/login_admin');
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login_admin');
    };
  const renderContent = () => {
    switch (activeTab) {
      case 1: return <AdminComplaints/>;
      case 2: return <AdminSuggestions/>;
      case 3: return <AdminRequests/>;
      default: return null;
    }
  };
  if (!authorized) {
      return (
          <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100vh',
              fontSize: '18px'
          }}>
              Checking authorization...
          </div>
      );
  }
  return (
    <div className="container">
        <div className="dashboard-header">
                <div>
                    <h2>Student Dashboard</h2>
                    <p>Welcome, <span id="AdminName">{AdminName}</span></p>
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