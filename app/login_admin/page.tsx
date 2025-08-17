"use client"

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './Login.css';

const LOGIN_URL = "https://university-portal-backend-production.up.railway.app/api/login_admin"

export default function Login_Admin() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();   
        setLoading(true);
        setError(null);

        const formData = new FormData(event.target as HTMLFormElement);
        const objectsfromentries = Object.fromEntries(formData);
        const json = JSON.stringify(objectsfromentries);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: json,
        };
        
        try {
            const response = await fetch(LOGIN_URL, requestOptions);
            const rData = await response.json();

            if(response.ok){
                const token = rData.token;
                localStorage.setItem('token', token);
                setError(null);
                setSuccess("Admin access granted! Redirecting to dashboard...");
                
                setTimeout(() => {
                    router.push('/admin_dashboard');
                }, 1500);
            }
            else{
                if(response.status == 404 || response.status == 401){
                    setError(rData.error || "Invalid admin credentials. Please check your email and password.");
                }else{
                    setError(rData.error || "Authentication failed. Please try again later.");
                    setSuccess(null);
                }
            }
        }
        catch (err){
            console.error("Login error:", err);
            setError("Network connection error. Please check your internet and try again.");
            setSuccess(null);
        }
        finally {
            setLoading(false);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-page admin-login">
            <div className="login-container">
                <header className="login-header">
                    <div className="header-content">
                        <h1>👨‍💼 Admin Portal</h1>
                        <p>Administrative access to university management system</p>
                    </div>
                </header>

                <main className="login-main">
                    <div className="login-card admin-card">
                        <div className="card-header">
                            <div className="admin-badge">
                                <span className="badge-icon">🛡️</span>
                                <span className="badge-text">Authorized Personnel Only</span>
                            </div>
                            <h2>Admin Login</h2>
                            <p>Access administrative dashboard and controls</p>
                        </div>

                        <div className="card-body">
                            {/* Alert Messages */}
                            {error && (
                                <div className="alert alert-error">
                                    <span className="alert-icon">🚨</span>
                                    <span className="alert-message">{error}</span>
                                </div>
                            )}
                            
                            {success && (
                                <div className="alert alert-success">
                                    <span className="alert-icon">✅</span>
                                    <span className="alert-message">{success}</span>
                                </div>
                            )}

                            <form onSubmit={handleLogin} className="login-form">
                                <div className="form-group">
                                    <label htmlFor="email">Administrative Email</label>
                                    <div className="input-wrapper">
                                        <span className="input-icon">👤</span>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            name="email" 
                                            placeholder="admin@university.edu"
                                            required 
                                            disabled={loading}
                                            className={loading ? 'loading' : ''}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Admin Password</label>
                                    <div className="input-wrapper">
                                        <span className="input-icon">🔐</span>
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            id="password" 
                                            name="password" 
                                            placeholder="Enter admin password"
                                            autoComplete="current-password" 
                                            required 
                                            disabled={loading}
                                            className={loading ? 'loading' : ''}
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={togglePasswordVisibility}
                                            disabled={loading}
                                        >
                                            {showPassword ? '👁️' : '👁️'}
                                        </button>
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    className={`btn btn-admin ${loading ? 'loading' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="btn-spinner"></span>
                                            Authenticating...
                                        </>
                                    ) : (
                                        <>
                                            <span>Access Dashboard</span>
                                        </>
                                    )}
                                </button>
                            </form>

                           {/* <div className="security-notice">
                                <div className="notice-icon">🔒</div>
                                <div className="notice-content">
                                    <p><strong>Security Notice:</strong></p>
                                    <p>This portal is restricted to authorized administrative personnel only. All access attempts are logged and monitored.</p>
                                </div>
                            </div>*/}

                            <div className="card-footer">
                                <div className="footer-links">
                                    <Link href="/" className="link-secondary">
                                        <span className="link-icon">←</span>
                                        Return to Main Portal
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}