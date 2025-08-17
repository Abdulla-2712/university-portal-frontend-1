"use client"

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import './Login.css';

const LOGIN_URL = "https://university-portal-backend-production.up.railway.app/api/login_student"

export default function Login_Student() {
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
                setSuccess("Login successful! Redirecting to your dashboard...");
                
                setTimeout(() => {
                    router.push('/user_dashboard');
                }, 1500);
            }
            else{
                if(response.status == 404 || response.status == 401){
                    setError(rData.error || "Invalid email or password. Please try again.");
                }else{
                    setError(rData.error || "Login failed. Please try again later.");
                    setSuccess(null);
                }
            }
        }
        catch (err){
            console.error("Login error:", err);
            setError("Network error. Please check your internet connection and try again.");
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
        <div className="login-page">
            <div className="login-container">
                <header className="login-header">
                    <div className="header-content">
                        <h1>🎓 Student Portal</h1>
                        <p>Welcome back! Please sign in to your account</p>
                    </div>
                </header>

                <main className="login-main">
                    <div className="login-card">
                        <div className="card-header">
                            <h2>Student Login</h2>
                            <p>Access your academic dashboard</p>
                        </div>

                        <div className="card-body">
                            {/* Alert Messages */}
                            {error && (
                                <div className="alert alert-error">
                                    <span className="alert-icon">⚠️</span>
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
                                    <label htmlFor="email">Academic Email</label>
                                    <div className="input-wrapper">
                                        <span className="input-icon">📧</span>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            name="email" 
                                            placeholder="your.email@university.edu"
                                            required 
                                            disabled={loading}
                                            className={loading ? 'loading' : ''}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <div className="input-wrapper">
                                        <span className="input-icon">🔒</span>
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            id="password" 
                                            name="password" 
                                            placeholder="Enter your password"
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
                                    className={`btn btn-primary ${loading ? 'loading' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="btn-spinner"></span>
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            <span>Sign In</span>
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="card-footer">
                                <div className="divider">
                                    <span>New to the portal?</span>
                                </div>
                                
                                <div className="footer-links">
                                    <Link href="/request_student" className="link-primary">
                                        Request New Account
                                    </Link>
                                    
                                    <Link href="/" className="link-secondary">
                                        <span className="link-icon">←</span>
                                        Back to Home
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