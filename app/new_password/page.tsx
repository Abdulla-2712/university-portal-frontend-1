"use client"

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import './newPassword.css';

const Request_URL = "https://university-portal-backend-production.up.railway.app/api/new_password"

// Separate component that uses useSearchParams
function NewPasswordForm() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    async function handleReset(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();   
        setLoading(true); // Set loading to true when starting login
        setError(null); // Clear previous errors
        if(!checkPassword(event)){
          setError("Passwords doesn't match");
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
                setSuccess("Password added successfully, you can login now...");

                // Add a small delay to show success message
                setTimeout(() => {
                    router.push('/login_student');
                }, 1000);
            }
            else{
                if(response.status == 400){
                  setError(rData.error || "Password must be at least 8 characters.<br>Password must include at least one uppercase letter.<br>Password must include at least one lowercase letter.<br>Password must include at least one digit.<br>Password must include at least one special character.");
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
                  {loading ? "loading..." : "Confirm"}
                </button>
              </form>

              <div className="text-center mt-3">
              </div>
                {error && (<p style={{ color: "red" }} dangerouslySetInnerHTML={{ __html: error }}/>)}
                {success && <p style={{ color: "green" }}>{success}</p>}
            </div>
          </main>
        </div>
    );
}

// Main component that wraps the form in Suspense
export default function New_Password() {
    return (
        <Suspense fallback={
            <div className="Login-container">
                <header className="header">
                    <div className="logo">
                        <h1>🎓 University Portal</h1>
                    </div>
                </header>
                <main className="main-content">
                    <div className="form-container">
                        <h2 className="text-center mb-3">Loading...</h2>
                    </div>
                </main>
            </div>
        }>
            <NewPasswordForm />
        </Suspense>
    );
}