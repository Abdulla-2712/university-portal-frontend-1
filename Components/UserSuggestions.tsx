'use client'
import React, { useEffect, useState } from 'react'

const add_suggs_URL = "https://university-portal-backend-production.up.railway.app/api/compsuggs/submit_suggestion"

interface DecodedProps {
  decoded: {
    id: number | string;
    // add other properties if needed
  };
}

export default function UserSuggestions({ decoded }: DecodedProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [studentID, setStudentID] = useState(null);
  

  async function adding_suggestion(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.target as HTMLFormElement);
    const formObject = Object.fromEntries(formData);
    
    // Better handling of student ID conversion
    const studentId = decoded.id;
    let numericStudentId: number;
    
    if (typeof studentId === 'string') {
      numericStudentId = parseInt(studentId, 10);
      if (isNaN(numericStudentId)) {
        setError("Invalid student ID. Please log in again.");
        setLoading(false);
        return;
      }
    } else {
      numericStudentId = studentId as number;
    }
    
    const requestData = {
      department: formObject.department,
      subject: formObject.subject,
      suggestion_content: formObject.suggestion_content,
      student: decoded.id,
    }

    console.log('Sending data:', requestData); // Debug log

    const requestOptions = {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    };
    
    try{
      console.log('Final student ID being sent:', numericStudentId);
      console.log('Original decoded.id:', decoded.id);
      const response = await fetch(add_suggs_URL, requestOptions);
      const rData = await response.json();
      
      console.log('Response status:', response.status); // Debug log
      console.log('Response data:', rData); // Debug log
      
      if(response.ok){
        setError(null);
        setSuccess("Suggestion submitted successfully");
        (event.target as HTMLFormElement).reset();
      }
      else{
          console.error('Error response:', response.status, rData); // Debug log
          
          if (response.status === 409) {
              setError("A suggestion with this data already exists.");
          } else if (response.status === 404) {
              setError("Server not found. Please try again later.");
          } else if (response.status === 422){
              // Handle validation errors properly
              if (rData.detail && Array.isArray(rData.detail)) {
                  // If detail is an array of validation errors
                  const errorMessages = rData.detail.map((err: any) => {
                      if (typeof err === 'object' && err.msg) {
                          return `${err.loc ? err.loc.join(' -> ') : 'Field'}: ${err.msg}`;
                      }
                      return String(err);
                  }).join(', ');
                  setError(`Validation errors: ${errorMessages}`);
              } else if (typeof rData.detail === 'string') {
                  // If detail is a simple string
                  setError(rData.detail);
              } else if (typeof rData.error === 'string') {
                  setError(rData.error);
              } else if (typeof rData.message === 'string') {
                  setError(rData.message);
              } else {
                  setError("Validation error occurred. Please check your input.");
              }
          } else if (response.status === 400){
              setError(typeof rData.detail === 'string' ? rData.detail : 
                     typeof rData.error === 'string' ? rData.error : 
                     typeof rData.message === 'string' ? rData.message : 
                     "Bad request. Please check your input.");
          } else{
              setError(typeof rData.detail === 'string' ? rData.detail : 
                     typeof rData.error === 'string' ? rData.error : 
                     typeof rData.message === 'string' ? rData.message : 
                     "Something went wrong.");
          }
          setSuccess(null);
      }
    }
    catch(error){
      console.error("Submission error:", error);
      setError("Network error. Please check your connection.");
      setSuccess(null);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div>
      <form id="studentRequestForm" onSubmit={adding_suggestion}>
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <select id="department" name="department" required>
            <option value="">-- Select Department --</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Multimedia">Multimedia</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" name="subject" required />
        </div>

        <div className="form-group">
          <label htmlFor="suggestion_content">Description</label>
          <textarea 
            id="suggestion_content" 
            name="suggestion_content" 
            required 
            placeholder="Please provide detailed information about your suggestion..."
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ width: '100%' }} 
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}    
    </div>
  );
}