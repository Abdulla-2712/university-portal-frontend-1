'use client'
import React, { useEffect, useState } from 'react'
import AdminComplaintsCard from './AdminComplaintsCard'

export default function ComplaintsAdminTab() {
  const [complaints, setComplaints] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      return;
    }
    fetch("http://127.0.0.1:8001/api/compsuggs/get_admin_comps", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then((res)=>{
      if(!res.ok){
        throw new Error("Failed to fetch requests");
      }
      return res.json();

    })
    .then((data)=>{
        setComplaints(data);
    })
    .catch((error)=>{
            console.error("Error fetching requests:", error);
    });
  }, [])

  return (
    <div className="dashboard-content">
      {complaints.length === 0 ? (
        <p>No complaints submitted yet.</p>
      ) : (
        complaints.map((complaint) => (
          <AdminComplaintsCard key={complaint.id} complaint={complaint} />
        ))
      )}
    </div>
  )
}
