'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './RequestAccount.css';
const Request_URL = "http://127.0.0.1:8001/api/submit_request"


export default function Request_Account() {
      const [error, setError] = useState(null);
      const [success, setSuccess] = useState(null);
      const [loading, setLoading] = useState(false); // Add loading state
      const router = useRouter();
  
      async function handleRequest(event) {
          event.preventDefault();   
          setLoading(true); // Set loading to true when starting login
          setError(null); // Clear previous errors

          const formData = new FormData(event.target);
          const formObject = Object.fromEntries(formData);
          const requestData = {
              name: formObject.fullName,
              email: formObject.academicEmail,
              phone_number: formObject.phoneNumber,
              Seat_Number: formObject.seatNumber,
              level: formObject.level,
              department: formObject.department,
          };
          
          const requestOptions = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestData),
          };
          try {
              const response = await fetch(Request_URL, requestOptions);
              const rData = await response.json();

              if(response.ok){
                setError(null);
                setSuccess("Request successful! Redirecting...");
                
                // Add a small delay to show success message
                setTimeout(() => {
                    router.push('/');
                }, 3000);
              }
              else{
                  if (response.status === 409) {
                      setError("An account with this data already exists.");
                  } else if (response.status === 404) {
                      setError("Server not found. Please try again later.");
                  } else {
                      setError(rData.error || "Something went wrong.");
                  }
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


 {/*} const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName(null);
    }
  };*/}

  return (
    <div className="Registration_container">
      
      
      <header className="header">
        <div className="logo">
          <h1>🎓 University Portal - Student Registration</h1>
        </div>
      </header>

      <main className="main-content">

        <div className="form-container">
          <h2 className="text-center mb-3">Student Request Account</h2>
          <div id="loginAlert" className="alert hidden"></div>
          <form id="studentRequestForm" onSubmit={handleRequest}>
          <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" name="fullName" required />
              </div>

              <div className="form-group">
                <label htmlFor="academicEmail">Academic Email</label>
                <input type="email" id="academicEmail" name="academicEmail" required />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="text" id="phoneNumber" name="phoneNumber" required />
              </div>


              <div className="form-group">
                <label htmlFor="seatNumber">Seat Number</label>
                <input type="text" id="seatNumber" name="seatNumber" required />
              </div>

              <div className="form-group">
                <label htmlFor="level">Level</label>
                <select id="level" name="level" required>
                  <option value="">-- Select your level --</option>
                  <option value="First Level">First level</option>
                  <option value="Second Level">Second level</option>
                  <option value="Third Level">Third level</option>
                  <option value="FOurth Level">Fourth level</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="department">Department</label>
                <select id="department" name="department" required>
                  <option value="">-- Select Department --</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Software">Information Software</option>
                  <option value="Multi media">Multi media</option>
                </select>
              </div>
              {/*
              <div className="form-group">
                <label htmlFor="myFile" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                  Upload ID card
                </label>

                <input
                  type="file"
                  id="myFile"
                  name="filename"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  required 
                />

                <label htmlFor="myFile" className="btn" style={{ display: 'inline-block', cursor: 'pointer' }}>
                  {selectedFileName ? selectedFileName : 'Choose file'}
                </label>
              </div>
              */}


            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              {loading ? "loading" : "Request account"}
            </button>
          </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
      </main>


    </div>
  );
}
