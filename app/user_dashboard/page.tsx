'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode, JwtPayload } from 'jwt-decode'; // Fixed import name
import UserComplaints from '@/Components/UserComplaints';
import UserSuggestions from '@/Components/UserSuggestions';
import UserTracking from '@/Components/UserTracking';

import './userD.css';
import router from 'next/router';
interface MyJwtPayload extends JwtPayload {
  name?: string;
  email?: string;
}
export default function TabsPage() {
    const [authorized, setAuthorized] = useState(false);
    const [activeTab, setActiveTab] = useState(1);
    const [studentName, setStudentName] = useState('Student');
    const [decodedToken, setDecodedToken] = useState<JwtPayload | null>(null);
    const router = useRouter();

useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login_student");
      return;
    }

    try {
      const decoded: MyJwtPayload = jwtDecode<MyJwtPayload>(token);
      setDecodedToken(decoded);

      if (!decoded.exp || decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        router.push("/login_student");
        return;
      }

      if (decoded.name || decoded.email) {
        setStudentName(decoded.name || decoded.email!.split("@")[0]);
      }

      setAuthorized(true);
    } catch (err) {
      console.error("Token validation error:", err);
      localStorage.removeItem("token");
      router.push("/login_student");
    }
  }, [router]);
}

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login_student');
    };

    
    const renderContent = () => {
        switch (activeTab) {
            case 1: return <UserComplaints decoded= {decodedToken}/>;
            case 2: return <UserSuggestions decoded= {decodedToken}/>;
            case 3: return <UserTracking />;
            case 4: return <div>Chat Support - Coming Soon</div>;
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
                    <p>Welcome, <span id="studentName">{studentName}</span></p>
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
                                className={`nav-button ${activeTab === 1 ? 'active' : ''}`} // Fixed class name
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