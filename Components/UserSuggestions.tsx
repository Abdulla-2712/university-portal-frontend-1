'use client'
import React, { useEffect, useState } from 'react'

const add_suggs_URL = "https://university-portal-backend-production.up.railway.app/api/compsuggs/submit_suggestion"

interface DecodedProps {
  decoded: {
    id: number | string;
    // add other properties if needed
  };
}

export default function userSuggestions({ decoded }: DecodedProps) {
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
    const requestData = {
      department: formObject.department,
      subject: formObject.subject,
      suggestion_content: formObject.suggestion_content,
      student: decoded.id,
    }
    const requestOptions = {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    };
    try{
      const response = await fetch(add_suggs_URL, requestOptions);
      const rData = await response.json();
      if(response.ok){
        setError(null);
        setSuccess("Suggestion submitted successfully");
        (event.target as HTMLFormElement).reset();
      }
      else{
          if (response.status === 409) {
              setError("A complaint with this data already exists.");
          } else if (response.status === 404) {
              setError("Server not found. Please try again later.");
          } else if (response.status === 422){
              setError(rData.detail || rData.error || "Validation error occurred.");
          } else if (response.status === 400){
              setError(rData.detail || rData.error || "Bad request. Please check your input.");
          } else{
              setError(rData.detail || rData.error || "Something went wrong.");
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
        <label form="suggestion_content">Description</label>
        <textarea id="suggestion_content" name="suggestion_content" required 
          placeholder="Please provide detailed information about your suggestion..."></textarea>
      </div>

      <button 
        type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
    {error && <p style={{ color: "red" }}>{error}</p>}
    {success && <p style={{ color: "green" }}>{success}</p>}    
  </div>
              






  );
}