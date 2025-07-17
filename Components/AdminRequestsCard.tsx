// components/TrackingCompsCard.jsx
import React from 'react'





export default function AdminRequestsCard({requests}){
  const {
        id,
        FullName,
        AcademicEmail,
        SeatNumber,
        Level,
        dateSubmitted,
        Department,
  } = requests




  function handleAccept(){
  }

  function handleReject() {
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <strong>{FullName}</strong>
        </div>
      </div>
      <div className="card-body">
        <p><strong>Academic Email:</strong> {AcademicEmail}</p>
        <p><strong>Seat Number:</strong> {SeatNumber}</p>
        <p><strong>Department:</strong> {Department}</p>
        <p><strong>Level:</strong> {Level}</p>
        <p><strong>Date Submitted:</strong> {new Date(dateSubmitted).toLocaleDateString()}</p>
        <div className="flex gap-4 mt-4">
          <button className="btn btn-primary" onClick={handleAccept}>
          Accept
          </button>
          <button className="btn btn-secondary" onClick={handleReject}>
          Reject
          </button>
        </div>
      </div>
    </div>






  );
};
