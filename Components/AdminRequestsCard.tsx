// components/TrackingCompsCard.jsx
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { responseCookiesToRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';


const add_user_URL = "http://127.0.0.1:8001/api/add_user"

export default function AdminRequestsCard({requests, onDelete}){
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const {
    id,
    FullName,
    PhoneNumber,
    AcademicEmail,
    SeatNumber,
    Level,
    Department,
  } = requests
  function getDeleteUrl(id) {
    return `http://127.0.0.1:8001/api/delete_request/${requests.id}`;
  }

  async function handleAccept(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();   
    const requestData = {
      name: requests.FullName,
      email: requests.AcademicEmail,
      phone_number: requests.PhoneNumber,
      Seat_Number: requests.SeatNumber,
      level: requests.Level,
      department: requests.Department
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
        setSuccess("Account added successfully");
        setTimeout(() => {
          setSuccess(null);
          handleDelete(requests.id);

        }, 2000);
      }
      else{
        setError(rData.error || "Something went wrong.");
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

const handleDelete = async (id: number) => {
  try {
    const res = await fetch(`http://127.0.0.1:8001/api/delete_request/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Failed to delete');
    }
      if (onDelete) {
        onDelete(id); // tell the parent to remove this card
      }
      } catch (error) {
        setError("Network error. Please check your connection.");
        console.error('Delete error:', error);
  }

};


  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <strong>{FullName}</strong>
        </div>
      </div>
      <div className="card-body">
        <p><strong>Academic Email:</strong> {AcademicEmail}</p>
        <p><strong>Phone Number:</strong> {PhoneNumber}</p>
        <p><strong>Seat Number:</strong> {SeatNumber}</p>
        <p><strong>Department:</strong> {Department}</p>
        <p><strong>Level:</strong> {Level}</p>
        <div className="flex gap-4 mt-4">
          <button className="btn btn-primary" onClick={handleAccept}>
          Accept
          </button>
          <button className="btn btn-secondary" onClick={() => handleDelete(requests.id)}>
          Reject
          </button>
        </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
    </div>






  );
};
