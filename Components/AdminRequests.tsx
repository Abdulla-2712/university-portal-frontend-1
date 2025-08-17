'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminRequestsCard from './AdminRequestsCard'
import RespondModal from '@/Components/Modals/RespondModal'
const add_user_URL = "http://127.0.0.1:8001/api/add_user"


export default function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8001/api/get_all_requests")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch requests");
        }
        return res.json();
      })
      .then((data) => {
        setRequests(data);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  }, []);

async function adding_user(event: React.FormEvent<HTMLFormElement>){
  event.preventDefault();   
  setLoading(true);
  setError(null);
  const formData = new FormData(event.target as HTMLFormElement);
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
      const response = await fetch(add_user_URL, requestOptions);
      const rData = await response.json();

      if(response.ok){
        setError(null);
        setSuccess("Request successful! Redirecting...");
        setTimeout(() => {
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




  return (
    <div className="dashboard-content">
      {requests.length === 0 ? (
        <p>No complaints submitted yet.</p>
      ) : (
        requests.map((requests) => (
          <AdminRequestsCard key={requests.id} requests={requests}
            onDelete={(id) => {
              setRequests(prev => prev.filter(requests => requests.id !== id));
            }}
        />
        ))
      )}


      <div className="flex justify-center">
        <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
          Add user
        </button>
      </div>


      
      <RespondModal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
    <div className="form-group">
          
                  
        <h1 className="text-3xl font-bold">Add a new account</h1>
      <form id="studentRequestForm" onSubmit={adding_user}>
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
        <div className="flex justify-center">
          <button className="btn btn-primary">
          Confirm
          </button>
        </div>
      </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
      </RespondModal>

    </div>


  )
}

