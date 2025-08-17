import React, { useState } from 'react'
import RespondModal from '@/Components/Modals/RespondModal'
import { Complaint } from './types'

const stat_URL = "https://university-portal-backend-production.up.railway.app/api/compsuggs/change_status_comp"
const answer_URL = "https://university-portal-backend-production.up.railway.app/api/compsuggs/answer_complaint"

export default function AdminComplaintsCard({ complaint }: { complaint: Complaint }) {
  const {
    id,
    subject,
    status,
    department,
    priority_level,
    complaint_content,
    complaint_answer,
  } = complaint

  const [stat, setStat] = useState(status)
  const [isOpen, setIsOpen] = useState(false)
  const [reply, setReply] = useState(complaint_answer || "")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  if (!token) return null

  async function handlePending(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    const request = {
      id,
      status: 'Reviewed'
    }
    try {
      const response = await fetch(stat_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      })
      const rData = await response.json()
      if (response.ok) {
        setStat('Reviewed')
      } else {
        setError(rData.error || "try again later")
      }
    } catch {
      setError("error, contact administrator")
      setSuccess(null)
    }
  }

  async function handleRespond(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const request = {
      id,
      complaint_answer: formData.get("complaint_answer"),
      status: 'Resolved'
    }
    setIsOpen(false)
    try {
      const response = await fetch(answer_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      })
      const rData = await response.json()
      if (response.ok) {
        setStat('Resolved')
        setSuccess('Answer submitted successfully')
      } else {
        setError(rData.error || "try again later")
      }
    } catch {
      setError("error, contact administrator")
      setSuccess(null)
    }
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
        <p><strong>Priority:</strong> {priority_level}</p>
        <p><strong>Description:</strong> {complaint_content}</p>
        {complaint_answer && (
          <div className="bg-gray-100 rounded p-3 mt-3">
            <strong>Response:</strong><br />
            {complaint_answer}
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
          <form onSubmit={handleRespond}>
            <h1>Respond to complaint</h1>
            <label htmlFor="complaint_answer">Response</label>
            <textarea
              id="complaint_answer"
              name="complaint_answer"
              required
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <button className="btn btn-primary">Respond</button>
          </form>
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
