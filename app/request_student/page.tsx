'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './RequestAccount.css';
import Link from 'next/link';

const Request_URL = "https://university-portal-backend-production.up.railway.app/api/submit_request";

export default function Request_Account() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData);
    const requestData = {
      name: formObject.fullName,
      email: formObject.academicEmail,
      phone_number: formObject.phoneNumber,
      Seat_Number: formObject.seatNumber,
      level: formObject.level,
      department: formObject.department,
    };

    try {
      const response = await fetch(Request_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const rData = await response.json();

      if (response.ok) {
        setError(null);
        setSuccess("Request successful! Redirecting...");
        setTimeout(() => router.push('/'), 3000);
      } else {
        if (response.status === 409) {
          setError("An account with this data already exists.");
        } else if (response.status === 404) {
          setError("Server not found. Please try again later.");
        } else {
          setError(rData.error || "Something went wrong.");
        }
        setSuccess(null);
      }
    } catch (err) {
      console.error("Request error:", err);
      setError("Network error. Please check your connection.");
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="registration-page">
      <div className="registration-container">
        <header className="registration-header">
          <div className="header-content">
            <h1>🎓 University Portal - Student Registration</h1>
            <p>Create your student account to access the academic portal</p>
          </div>
        </header>

        <main className="registration-main">
          <div className="registration-card">
            <div className="card-header">
              <h2>Student Registration</h2>
              <p>Fill in your details to request an account</p>
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

              <form className="registration-form" onSubmit={handleRequest}>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <div className="input-wrapper">
                    <span className="input-icon">👤</span>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Enter your full name"
                      required
                      disabled={loading}
                      className={loading ? 'loading' : ''}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="academicEmail">Academic Email</label>
                  <div className="input-wrapper">
                    <span className="input-icon">📧</span>
                    <input
                      type="email"
                      id="academicEmail"
                      name="academicEmail"
                      placeholder="your.email@university.edu"
                      required
                      disabled={loading}
                      className={loading ? 'loading' : ''}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <div className="input-wrapper">
                      <span className="input-icon">📱</span>
                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Your phone number"
                        required
                        disabled={loading}
                        className={loading ? 'loading' : ''}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="seatNumber">Seat Number</label>
                    <div className="input-wrapper">
                      <span className="input-icon">🎯</span>
                      <input
                        type="text"
                        id="seatNumber"
                        name="seatNumber"
                        placeholder="Your seat number"
                        required
                        disabled={loading}
                        className={loading ? 'loading' : ''}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="level">Level</label>
                    <div className="input-wrapper">
                      <span className="input-icon">📚</span>
                      <select id="level" name="level" required disabled={loading}>
                        <option value="">-- Select your level --</option>
                        <option value="First Level">First level</option>
                        <option value="Second Level">Second level</option>
                        <option value="Third Level">Third level</option>
                        <option value="Fourth Level">Fourth level</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <div className="input-wrapper">
                      <span className="input-icon">🏢</span>
                      <select id="department" name="department" required disabled={loading}>
                        <option value="">-- Select Department --</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Information Software">Information Software</option>
                        <option value="Multi media">Multi media</option>
                      </select>
                    </div>
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
                      Processing...
                    </>
                  ) : (
                    <>
                      <span>Request Account</span>
                      <span className="btn-arrow">→</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="card-footer">
              <div className="divider">
                <span>Already have an account?</span>
              </div>

              <div className="footer-links">
                <a href="/login" className="link-primary">
                  <span className="link-icon">🔑</span>
                  Sign In to Portal
                </a>
                <Link href="/" className="link-secondary">
                  <span className="link-icon">←</span>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
