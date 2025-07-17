// components/TrackingCompsCard.jsx
import React from 'react'

export default function TrackingCompsCard({ complaint }) {
  const {
    subject,
    status,
    department,
    priority,
    dateSubmitted,
    description,
    response,
  } = complaint

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <strong>{subject}</strong>
          <span className={`status-badge status-${status.toLowerCase().replace(" ", "-")}`}>
            {status}
          </span>
        </div>
      </div>
      <div className="card-body">
        <p><strong>Department:</strong> {department}</p>
        <p><strong>Priority:</strong> {priority}</p>
        <p><strong>Date Submitted:</strong> {new Date(dateSubmitted).toLocaleDateString()}</p>
        <p><strong>Description:</strong> {description}</p>
        {response && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: '#f8f9fa',
            borderRadius: '5px'
          }}>
            <strong>Response:</strong><br />
            {response}
          </div>
        )}
      </div>
    </div>
  )
}
