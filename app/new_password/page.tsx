"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import './newPassword.css';

const Request_URL = "http://127.0.0.1:8001/api/new_password"

export default function newPassword() {

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    async function handleReset(event) {
        event.preventDefault();   
        setLoading(true); // Set loading to true when starting login
        setError(null); // Clear previous errors
        if(!checkPassword(event)){
          setError("password doesn't match");
          setLoading(false);
          return;
        }
        const formData = new FormData(event.target);
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
                setSuccess("Password added successfully, you can log in now...");

                // Add a small delay to show success message
                setTimeout(() => {
                    router.push('/login_student');
                }, 1000);
            }
            else{
                if(response.status == 400){
                  setError(rData.error || "Invalid or expired token");
                }
                else{
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

    function checkPassword(event){

      const formData = new FormData(event.target);
      const formObject = Object.fromEntries(formData);
      const compareValue = formObject.password.localeCompare(formObject.passwordConfirmation);
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
          <h2 className="text-center mb-3">Reset your password</h2>

          <div id="loginAlert" className="alert hidden"></div>

          <form id="studentLoginForm" onSubmit={handleReset}>
            <div className="form-group">
              <label htmlFor="password"> Enter a new password:</label>
              <input type="password" id="password" name="password" required />
            </div>

            <div className="form-group">
              <label htmlFor="passwordConfirmation">Enter your password again:</label>
              <input type="password" id="passwordConfirmation" name="passwordConfirmation" autoComplete='new-password' required />
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
