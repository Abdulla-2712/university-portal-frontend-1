'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
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
            // Define a custom type for the decoded token
            type AdminJwtPayload = {
                exp?: number;
                name?: string;
                email?: string;
            };

            const decoded = jwtDecode<AdminJwtPayload>(token);

            // Fixed expiration check - added missing parentheses and undefined check
            if (!decoded.exp || decoded.exp * 1000 < Date.now()) {
                localStorage.removeItem('token');
                router.push('/login_admin');
                return;
            }

            // Extract admin name from token if available
            if (decoded.name) {
                setAdminName(decoded.name);
            } else if (decoded.email) {
                setAdminName(decoded.email.split('@')[0]);
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
            case 4: return (
                <div style={{
                    textAlign: 'center',
                    padding: '3rem'
                }}>

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
        <div className="container">
            <div className="dashboard-header">
                <div>
                    <h2>👨‍💼 Admin Dashboard</h2>
                    <p>Welcome back, <span style={{ fontWeight: '600' }}>{AdminName}</span>!</p>
                </div>

                <button className="btn btn-danger" onClick={handleLogout}>
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
                                Statistics
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