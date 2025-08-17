'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import dynamic from 'next/dynamic';
import './userD.css'; // dashboard styles

// Dynamic imports to prevent SSR issues
const UserComplaints = dynamic(() => import('@/Components/UserComplaints'), {
  loading: () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '200px',
      fontSize: '1.1rem',
      color: '#667eea'
    }}>
      Loading complaints...
    </div>
  ),
  ssr: false
});

const UserSuggestions = dynamic(() => import('@/Components/UserSuggestions'), {
  loading: () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '200px',
      fontSize: '1.1rem',
      color: '#667eea'
    }}>
      Loading suggestions...
    </div>
  ),
  ssr: false
});

const UserTracking = dynamic(() => import('@/Components/UserTracking'), {
  loading: () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '200px',
      fontSize: '1.1rem',
      color: '#667eea'
    }}>
      Loading tracking...
    </div>
  ),
  ssr: false
});

interface MyJwtPayload extends JwtPayload {
  name?: string;
  email?: string;
}

function DashboardContent() {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(1);
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login_student');
  };

  const renderContent = () => {
    const user = decodedToken ? { id: decodedToken.sub! } : { id: 0 };

    switch (activeTab) {
      case 1: return <UserComplaints decoded={user} />;
      case 2: return <UserSuggestions decoded={user} />;
      case 3: return <UserTracking />;
      case 4: return (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#6b7280',
          fontSize: '1.2rem'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem'
          }}>💬</div>
          <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Chat Support</h3>
          <p>Coming Soon - AI-powered chat support will be available here!</p>
        </div>
      );
      default: return null;
    }
  };

  if (!authorized) {
    return (
      <div className="loading-state">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid rgba(255,255,255,0.3)',
            borderTop: '2px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          Checking authorization...
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2>🎓 Student Dashboard</h2>
          <p>Welcome back, <span style={{ fontWeight: '600' }}>{studentName}</span>!</p>
        </div>
        <button className="btn btn-logout" onClick={handleLogout}>
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

export default function TabsPage() {
  return (
    <Suspense fallback={
      <div className="loading-state">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid rgba(255,255,255,0.3)',
            borderTop: '2px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          Loading dashboard...
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}