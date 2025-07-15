'use client';

import React, { useState } from 'react';
import './RequestAccount.css';

export default function LoginOrRequestStudentPage() {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName(null);
    }
  };

  return (
    <div className="Registration_container">
      <header className="header">
        <div className="logo">
          <h1>🎓 University Portal - Student Registration</h1>
        </div>
      </header>

      <main className="main-content">
        <div className="form-container">
          <h2 className="text-center mb-3">Student Login</h2>

          <div id="loginAlert" className="alert hidden"></div>

          <form id="studentLoginForm">
          <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" name="fullName" required />
              </div>

              <div className="form-group">
                <label htmlFor="academicEmail">Academic Email</label>
                <input type="email" id="academicEmail" name="academicEmail" required />
              </div>

              <div className="form-group">
                <label htmlFor="seatNumber">Seat Number</label>
                <input type="text" id="seatNumber" name="seatNumber" required />
              </div>

              <div className="form-group">
                <label htmlFor="Level">Level</label>
                <select id="level" name="level" required>
                  <option value="">-- Select your level --</option>
                  <option value="cs">First level</option>
                  <option value="it">Second level Technology</option>
                  <option value="se">Third level</option>
                  <option value="ai">Fourth level</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="department">Department</label>
                <select id="department" name="department" required>
                  <option value="">-- Select Department --</option>
                  <option value="cs">Computer Science</option>
                  <option value="it">Information Technology</option>
                  <option value="se">Information Software</option>
                  <option value="ai">Multi media</option>
                </select>
              </div>
            <div className="form-group">
              <label htmlFor="myFile" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                Upload Profile Picture
              </label>

              {/* Hidden real file input */}
              <input
                type="file"
                id="myFile"
                name="filename"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              {/* Custom button to trigger file input */}
              <label htmlFor="myFile" className="btn" style={{ display: 'inline-block', cursor: 'pointer' }}>
                {selectedFileName ? selectedFileName : 'Choose file'}
              </label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Login
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
