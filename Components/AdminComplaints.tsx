'use client'
import React, { useEffect, useState } from 'react'
import AdminComplaintsCard from './AdminComplaintsCard'
import { Complaint } from './types'

export default function ComplaintsAdminTab() {
  const [complaints, setComplaints] = useState<Complaint[]>([])

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      return;
    }
    fetch("https://university-portal-backend-production.up.railway.app/api/compsuggs/get_admin_comps", {
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
    .then((data: Complaint[])=>{
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
