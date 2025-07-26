// components/TrackingCompsCard.jsx
import React from 'react'

export default function TrackingCompsCard({ complaint }) {
  const {
    id,
    department,
    subject,
    priority_level,
    complaint_content,
    complaint_answer,
    status,
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
        <p><strong>Priority:</strong> {priority_level}</p>
        <p><strong>Description:</strong> {complaint_content}</p>
        {complaint_answer && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: '#f8f9fa',
            borderRadius: '5px'
          }}>
            <strong>Response:</strong><br />
            {complaint_answer}
          </div>
        )}
      </div>
    </div>
  )
}
