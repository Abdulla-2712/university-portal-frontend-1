'use client'
import React, { useEffect, useState } from 'react'
import TrackingCompsCard from './UserTrackingCards'

export default function ComplaintsTab() {
  const [complaints, setComplaints] = useState([])

  useEffect(() => {
    // TODO: Replace with Django fetch later
    const mockData = [
      {
        id: 1,
        subject: 'WiFi not working',
        status: 'Reviewed',
        department: 'IT',
        priority: 'High',
        dateSubmitted: '2025-07-14',
        description: 'Can’t connect to dorm WiFi.',
        response: 'Technician will check it tomorrow.',
      },
      {
        id: 2,
        subject: 'No hot water',
        status: 'Pending',
        department: 'Maintenance',
        priority: 'Medium',
        dateSubmitted: '2025-07-10',
        description: 'Water heater not working in Room 203.',
        response: '',
      },
    ]
    setComplaints(mockData)
  }, [])

  return (
    <div className="dashboard-content">
      {complaints.length === 0 ? (
        <p>No complaints submitted yet.</p>
      ) : (
        complaints.map((complaint) => (
          <TrackingCompsCard key={complaint.id} complaint={complaint} />
        ))
      )}
    </div>
  )
}
