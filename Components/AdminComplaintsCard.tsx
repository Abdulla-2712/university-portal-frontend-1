import React, { useState } from 'react'
import RespondModal from '@/Components/Modals/RespondModal'

export default function adminComplaintsCard({ complaint }) {
  const {
    subject,
    status,
    department,
    priority,
    dateSubmitted,
    description,
    response,
  } = complaint

  const [stat, setStat] = useState(status)
  const [isOpen, setIsOpen] = useState(false)
  const [reply, setReply] = useState(response || "");


    const handlePending = () => {
        setStat('Reviewed')
    }
    const handleRespond = () => {
      complaint.response = reply;
      setIsOpen(false)
      setStat('Resolved')
    }



  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <strong>{subject}</strong>
          <span className={`status-badge status-${stat.toLowerCase().replace(" ", "-")}`}>
            {stat}
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


        {stat === 'Pending' && (
        <button className="btn btn-warning" onClick={handlePending}>
            Mark as read
            </button>
        )}

      {stat === 'Reviewed' && (
        <button className="btn btn-warning" onClick={() => setIsOpen(true)}>
          Respond
        </button>
      )}

      <RespondModal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <div className="form-group">
          <h1>Respond to complaint</h1>
          <label htmlFor="complaintDescription">Response</label>
          <textarea id="complaintDescription" name="description" required   value={reply}   onChange={(e) => setReply(e.target.value)}></textarea>
          <button className="btn btn-primary" onClick={handleRespond}>
            Respond
          </button>
        </div>
      </RespondModal>

      {stat === 'Resolved' && (
        <span className="text-green-600 font-semibold mt-2 inline-block">
          This complaint has been resolved.
        </span>

      )}

        
      </div>
    </div>
  )
}
