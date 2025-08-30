// components/AdminRequestsCard.tsx
import React, { useState } from 'react'

const add_user_URL = "https://university-portal-backend-production.up.railway.app/api/add_user"

type Request = {
  id: number;
  FullName: string;
  PhoneNumber: string;
  AcademicEmail: string;
  SeatNumber: string;
  Level: string;
  Department: string;
};

interface AdminRequestsCardProps {
  requests: Request;
  onDelete?: (id: number) => void;
}

export default function AdminRequestsCard({requests, onDelete}: AdminRequestsCardProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // Prevent double clicks

  const {
    id,
    FullName,
    PhoneNumber,
    AcademicEmail,
    SeatNumber,
    Level,
    Department,
  } = requests

  async function handleAccept(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    
    // Prevent multiple clicks
    if (isProcessing || loading) return;
    
    setIsProcessing(true);
    setLoading(true);
    setError(null);
    setSuccess(null);
    
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
      
      if (response.ok) {
        setError(null);
        setSuccess("Account added successfully");
        
        // Delete from registration table immediately after successful addition
        await handleDelete(requests.id, false); // false means don't show delete errors
        
      } else {
        if (response.status === 409) {
          setError("An account with this data already exists.");
        } else {
          setError(rData.error || "Something went wrong.");
        }
        setSuccess(null);
      }
    } catch (err) {
      console.error("Accept error:", err);
      setError("Network error. Please check your connection.");
      setSuccess(null);
    } finally {
      setLoading(false);
      setIsProcessing(false);
    }
  }

  const handleDelete = async (id: number, showErrors: boolean = true) => {
    try {
      const res = await fetch(`https://university-portal-backend-production.up.railway.app/api/delete_request/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete');
      }

      if (onDelete) {
        onDelete(id); // Remove card from parent component
      }
      
    } catch (error) {
      if (showErrors) {
        setError("Failed to delete request. Please try again.");
      }
      console.error('Delete error:', error);
    }
  };

  const handleReject = () => {
    setLoading(true);
    handleDelete(requests.id).finally(() => setLoading(false));
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
          <button 
            className={`btn btn-primary ${loading || isProcessing ? 'loading' : ''}`}
            onClick={handleAccept}
            disabled={loading || isProcessing}
          >
            {loading ? 'Processing...' : 'Accept'}
          </button>
          <button 
            className={`btn btn-secondary ${loading ? 'loading' : ''}`}
            onClick={handleReject}
            disabled={loading || isProcessing}
          >
            {loading ? 'Deleting...' : 'Reject'}
          </button>
        </div>
        
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
    </div>
  );
}