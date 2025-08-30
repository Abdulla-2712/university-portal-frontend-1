// components/AdminRequestsCard.tsx
import React, { useState } from 'react'

// Fixed API URLs based on your Django routing
const ADD_USER_URL = "https://university-portal-backend-production.up.railway.app/add_user"
const DELETE_REQUEST_URL = "https://university-portal-backend-production.up.railway.app"

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
  const [isProcessing, setIsProcessing] = useState(false);

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
    
    if (isProcessing || loading) return;
    
    setIsProcessing(true);
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    const requestData = {
      name: FullName,
      email: AcademicEmail,
      phone_number: PhoneNumber,
      Seat_Number: SeatNumber,
      level: Level,
      department: Department
    };
    
    console.log('Sending request to:', ADD_USER_URL);
    console.log('Request data:', requestData);
    
    try {
      const response = await fetch(ADD_USER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      
      console.log('Response status:', response.status);
      const rData = await response.json();
      console.log('Response data:', rData);
      
      if (response.ok) {
        setError(null);
        setSuccess("Account added successfully!");
        
        // Now delete the request
        await deleteRequest(id);
        
      } else {
        if (response.status === 409) {
          setError("An account with this data already exists.");
        } else if (response.status === 404) {
          setError("Server endpoint not found. Please check the API.");
        } else {
          setError(rData.error || rData.message || "Something went wrong.");
        }
        setSuccess(null);
      }
    } catch (err) {
      console.error("Accept error:", err);
      setError("Network error. Please check your connection and API endpoint.");
      setSuccess(null);
    } finally {
      setLoading(false);
      setIsProcessing(false);
    }
  }

  const deleteRequest = async (requestId: number) => {
    try {
      console.log('Deleting request ID:', requestId);
      const deleteUrl = `${DELETE_REQUEST_URL}/delete_request/${requestId}`;
      console.log('Delete URL:', deleteUrl);
      
      const res = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Delete response status:', res.status);
      
      if (!res.ok) {
        const errorData = await res.json();
        console.log('Delete error data:', errorData);
        throw new Error(`Failed to delete: ${res.status}`);
      }

      const deleteData = await res.json();
      console.log('Delete success data:', deleteData);

      if (onDelete) {
        onDelete(requestId);
      }
      
    } catch (error) {
      console.error('Delete error:', error);
      setError("Failed to remove request from list. Please refresh the page.");
    }
  };

  const handleReject = async () => {
    if (loading || isProcessing) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await deleteRequest(id);
      setSuccess("Request rejected successfully.");
    } catch (error) {
      setError("Failed to reject request.");
    } finally {
      setLoading(false);
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
            {loading ? 'Rejecting...' : 'Reject'}
          </button>
        </div>
        
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}
      </div>
    </div>
  );
}