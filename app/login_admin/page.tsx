"use client"

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './Login.css';

const LOGIN_URL = "http://127.0.0.1:8001/api/login_admin"

export default function Login_Admin() {

 const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false); // Add loading state
    const router = useRouter();

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();   
        setLoading(true); // Set loading to true when starting login
        setError(null); // Clear previous errors

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
                setSuccess("Login successful! Redirecting...");
                
                // Add a small delay to show success message
                setTimeout(() => {
                    router.push('/admin_dashboard');
                }, 1000);
            }
            else{
                if(response.status == 404){
                  setError(rData.error || "Email or password is wrong");
                }else{
                  setError(rData.error || "Login failed");
                  setSuccess(null);
                }
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
          <h1>🎓 Welcome to the Admin Portal</h1>
        </div>
      </header>

      <main className="main-content">
        <div className="form-container">
          <h2 className="text-center mb-3">Admin Login</h2>

          <div id="loginAlert" className="alert hidden"></div>

          <form id="studentLoginForm" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email"> Email</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" autoComplete="new-password" required />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              {loading ? "loging in..." : "login"}
            </button>
          </form>

          <div className="text-center mt-3">
            <p>
              <Link href="/">← Back to Home</Link>
            </p>
          </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
      </main>
    </div>
  );
}
