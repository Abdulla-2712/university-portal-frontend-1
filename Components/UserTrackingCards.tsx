// components/TrackingCompsCard.jsx
import React from 'react'

interface Complaint {
  id: number | string;
  department: string;
  subject: string;
  priority_level?: string;
  content: string;
  answer?: string;
  status: string;
}

interface TrackingCompsCardProps {
  complaint: Complaint;
}

export default function TrackingCompsCard({ complaint }: TrackingCompsCardProps) {
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
