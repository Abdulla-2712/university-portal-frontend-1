// components/TrackingCompsCard.jsx
import React from 'react'

export default function TrackingCompsCard({ complaint }) {
  const {
    id,
    department,
    subject,
    priority_level,
    content,
    answer = '',
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
        {priority_level && (
          <p><strong>Property Level:</strong> {priority_level}</p>
        )}
        <p><strong>Description:</strong> {content}</p>
        {answer && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: '#f8f9fa',
            borderRadius: '5px'
          }}>
            <strong>Response:</strong><br />
            {answer}
          </div>
        )}
      </div>
    </div>
  )
}
