"use client"

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './forgotPassword.css';

const LOGIN_URL = "http://127.0.0.1:8001/api/login_admin"

export default function Login_Admin() {

 const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false); // Add loading state
    const router = useRouter();

    async function handleLogin(event) {
        event.preventDefault();   
        setLoading(true); // Set loading to true when starting login
        setError(null); // Clear previous errors

        const formData = new FormData(event.target);
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
                setSuccess("Login successful! Redirecting...");
                
                // Add a small delay to show success message
                setTimeout(() => {
                    router.push('/admin_dashboard');
                }, 1000);
            }
            else{
                setError(rData.error || "Login failed");
                setSuccess(null);
            }
        }
        catch (err){
            console.error("Login error:", err);
            setError("Network error. Please check your connection.");
            setSuccess(null);
        }
        finally {
            setLoading(false); // Reset loading state
        }
    }








  return (
    <div className="Login-container">
      <header className="header">
        <div className="logo">
          <h1>🎓 Your account has been accepted</h1>
        </div>
      </header>

      <main className="main-content">
        <div className="form-container">
          <h2 className="text-center mb-3">Reset your password</h2>

          <div id="loginAlert" className="alert hidden"></div>

          <form id="studentLoginForm" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="password"> Enter a new password:</label>
              <input type="password" id="password" name="password" required />
            </div>

            <div className="form-group">
              <label htmlFor="passwordConfirmation">Enter your password again:</label>
              <input type="password" id="passwordConfirmation" name="passwordConfirmation" required />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Confirm
            </button>
          </form>

          <div className="text-center mt-3">
          </div>
                                  {error && <p style={{ color: "red" }}>{error}</p>}
                        {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
      </main>
    </div>
  );
}
