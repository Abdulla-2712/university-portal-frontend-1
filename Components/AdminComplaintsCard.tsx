import React, { useState } from 'react'
import RespondModal from '@/Components/Modals/RespondModal'

const stat_URL = "http://127.0.0.1:8001/api/compsuggs/change_status_comp"
const answer_URL = "http://127.0.0.1:8001/api/compsuggs/answer_complaint"

export default function adminComplaintsCard({ complaint }) {
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
  const [reply, setReply] = useState(complaint_answer || "");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

  async function handlePending(event){
        event.preventDefault();
        setLoading(true);
        setError(null);
        const request = {
            id: id,
            status: 'Reviewed'
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request)
        }
        try{
            const response = await fetch(stat_URL, requestOptions);
            const rData = await response.json();
            if(response.ok){
                setStat('Reviewed')
            }
            else{
                setError(rData.error || "try again later");
            }
        }
        catch(error){
            setError("error, contact adminstrator");
            setSuccess(null);
        }
    }




    async function handleRespond(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const objectFromEntries = Object.fromEntries(formData);
        const request = {
            id: id,
            complaint_answer: objectFromEntries.complaint_answer,
            status: 'Resolved'
        }
        setIsOpen(false);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`

            },
                body: JSON.stringify(request)
        }
        try{
            const response = await fetch(answer_URL, requestOptions);
            const rData = await response.json();
            if(response.ok){
                setStat('Resolved');
                setSuccess('Answer submited successfully....');
            }
            else{
                setError(rData.error || "try again later");
            }
        } catch (error){
            setError("error, contact adminstrator");
            setSuccess(null);
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
          <form id="studentLoginForm" onSubmit={handleRespond}>
          <h1>Respond to complaint</h1>
          <label htmlFor="complaint_answer">Response</label>
        <textarea id="complaint_answer" name="complaint_answer" required   value={reply}   onChange={(e) => setReply(e.target.value)}></textarea>
          <button className="btn btn-primary">
            Respond
          </button>
          </form>
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
