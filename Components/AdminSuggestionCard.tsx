"use client"

import React, { useState } from 'react'
import RespondModal from '@/Components/Modals/RespondModal'

const stat_URL = "http://127.0.0.1:8001/api/compsuggs/change_status_sugs"
const answer_URL = "http://127.0.0.1:8001/api/compsuggs/answer_suggestion"


type Suggestion = {
    id: number;
    subject: string;
    status: string;
    department: string;
    suggestion_content: string;
    suggestion_answer?: string;
};

export default function adminSuggestionsCard({ suggestion }: { suggestion: Suggestion }) {
    const {
        id,
        subject,
        status,
        department,
        suggestion_content,
        suggestion_answer,
    } = suggestion

    const [stat, setStat] = useState(status)
    const [isOpen, setIsOpen] = useState(false)
    const [reply, setReply] = useState(suggestion_answer || "");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false); // Add loading state
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    async function handlePending(event: React.MouseEvent<HTMLButtonElement>){
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




    async function handleRespond(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const objectFromEntries = Object.fromEntries(formData);
        const request = {
            id: id,
            suggestion_answer: objectFromEntries.suggestion_answer,
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
                <p><strong>Description:</strong> {suggestion_content}</p>
                {suggestion_answer && (
                    <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '5px'}}>
                        <strong>Response:</strong><br />
                        {suggestion_answer}
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
                            <h1>Respond to suggestion</h1>
                            <label htmlFor="suggestion_answer">Response</label>
                            <textarea id="suggestion_answer" name="suggestion_answer" required   value={reply}   onChange={(e) => setReply(e.target.value)}></textarea>
                            <button className="btn btn-primary">
                                Respond
                            </button>
                        </form>
                    </div>
                </RespondModal>

                {stat === 'Resolved' && (
                    <span className="text-green-600 font-semibold mt-2 inline-block">
                        This Suggestion has been considered.
                    </span>
                )}
            </div>
        </div>
    )
}
