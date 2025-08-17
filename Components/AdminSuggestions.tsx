'use client'
import React, { useEffect, useState } from 'react'
import AdminComplaintsCard from './AdminSuggestionCard'
import {Suggestion} from './types';

export default function SuggestionsAdminTab() {
  const [suggestion, setSuggestion] = useState<Suggestion[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    fetch("http://127.0.0.1:8001/api/compsuggs/get_admin_suggs",{
        method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      if(!res.ok){
        throw new Error("Failed to fetch requests");
      }
      return res.json();
    })
    .then((data) => {
      setSuggestion(data);
    })
    .catch((error) => {
      console.error("Error fetching requests:", error);
    });
  }, [])

  return (
    <div className="dashboard-content">
      {suggestion.length === 0 ? (
        <p>No complaints submitted yet.</p>
      ) : (
        suggestion.map((suggestion) => (
          <AdminComplaintsCard key={suggestion.id} suggestion={suggestion} />
        ))
      )}
    </div>
  )
}
