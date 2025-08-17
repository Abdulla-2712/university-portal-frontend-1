"use client"

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import './newPassword.css';

const Request_URL = "https://university-portal-backend-production.up.railway.app/api/new_password"

function NewPasswordForm() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    async function handleReset(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();   
        setLoading(true);
        setError(null);
        setSuccess(null);
        
        if(!checkPassword(event)){
            setError("Passwords don't match. Please ensure both password fields are identical.");
            setLoading(false);
            return;
        }
        
        const formData = new FormData(event.target as HTMLFormElement);
        const objectsfromentries = Object.fromEntries(formData);
        const sentPassword = {
            token,
            password: objectsfromentries.password
        }
        
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sentPassword)
        };
        
        try {
            const response = await fetch(Request_URL, requestOptions);
            const rData = await response.json();

            if(response.ok){
                const token = rData.token;
                localStorage.setItem('token', token);
                setError(null);
                setSuccess("Password reset successfully! Redirecting to login...");

                // Add a delay to show success message
                setTimeout(() => {
                    router.push('/login_student');
                }, 2000);
            }
            else{
                if(response.status == 400){
                    setError(rData.error || `
                        <strong>Password requirements:</strong><br/>
                        • At least 8 characters long<br/>
                        • Include at least one uppercase letter<br/>
                        • Include at least one lowercase letter<br/>
                        • Include at least one digit<br/>
                        • Include at least one special character
                    `);
                }
                else{
                    setError(rData.error || "Password reset failed. Please try again.");
                    setSuccess(null);
                }
            }
        }
        catch (err){
            console.error("Password reset error:", err);
            setError("Network error. Please check your connection and try again.");
            setSuccess(null);
        }
        finally {
            setLoading(false);
        }
    }

    function checkPassword(event: React.FormEvent<HTMLFormElement>){
        const formData = new FormData(event.target as HTMLFormElement);
        const formObject = Object.fromEntries(formData);
        const password = formObject.password as string;
        const passwordConfirmation = formObject.passwordConfirmation as string;
        const compareValue = password.localeCompare(passwordConfirmation);
        return compareValue === 0;
    }

    return (
        <div className="Login-container">
            <header className="header">
                <div className="logo">
                    <h1>🎓 University Portal</h1>
                </div>
            </header>

            <main className="main-content">
                <div className="form-container">
                    <h2 className="text-center mb-3">Reset Your Password</h2>
                    
                    <p style={{
                        textAlign: 'center',
                        color: '#6b7280',
                        marginBottom: '2rem',
                        fontSize: '1rem'
                    }}>
                        Enter your new password below. Make sure it&apos;s secure!
                    </p>

                    <form onSubmit={handleReset}>
                        <div className="form-group">
                            <label htmlFor="password">New Password:</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="Enter your new password"
                                autoComplete="new-password"
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="passwordConfirmation">Confirm Password:</label>
                            <input 
                                type="password" 
                                id="passwordConfirmation" 
                                name="passwordConfirmation" 
                                placeholder="Confirm your new password"
                                autoComplete="new-password" 
                                required 
                            />
                        </div>

                        <div className="password-requirements">
                            <strong style={{ color: '#374151', fontSize: '0.95rem' }}>Password Requirements:</strong>
                            <ul>
                                <li>At least 8 characters long</li>
                            </ul>
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary" 
                            style={{ width: '100%', marginTop: '2rem' }}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="loading-spinner"></span>
                                    Updating Password...
                                </>
                            ) : (
                                "Update Password"
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-3">
                        <a href="/login_student" style={{ fontSize: '0.9rem' }}>
                            ← Back to Login
                        </a>
                    </div>

                    {error && (
                        <div style={{
                            marginTop: '1.5rem'
                        }}>
                            <p style={{ color: "red" }} dangerouslySetInnerHTML={{ __html: error }}/>
                        </div>
                    )}
                    
                    {success && (
                        <div style={{
                            marginTop: '1.5rem'
                        }}>
                            <p style={{ color: "green" }}>{success}</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

const LoadingFallback = () => (
    <div className="Login-container">
        <header className="header">
            <div className="logo">
                <h1>🎓 University Portal</h1>
            </div>
        </header>
        <main className="main-content">
            <div className="form-container">
                <div style={{
                    textAlign: 'center',
                    padding: '2rem 0'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '4px solid #e5e7eb',
                        borderTop: '4px solid #667eea',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1rem'
                    }}></div>
                    <h2 style={{ 
                        color: '#6b7280',
                        fontSize: '1.2rem',
                        fontWeight: '500'
                    }}>
                        Loading password reset form...
                    </h2>
                </div>
            </div>
        </main>
        <style jsx>{`
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `}</style>
    </div>
);

// Main component that wraps the form in Suspense
export default function New_Password() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <NewPasswordForm />
        </Suspense>
    );
}