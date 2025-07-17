

'use client'
import React, { useEffect, useState } from 'react'
import AdminRequestsCard from './AdminRequestsCard'
import RespondModal from '@/Components/Modals/RespondModal'


export default function AdminRequests() {
  const [requests, setRequests] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [fullName, setFullName] = useState("");
  const [academicEmail, setAcademicEmail] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [level, setLevel] = useState("");
  const [department, setDepartment] = useState("");


  useEffect(() => {
    // TODO: Replace with Django fetch later
    const mockData = [
      {
        id: 1,
        FullName: 'Abdulla Omar',
        AcademicEmail: 'aabdula2712@gmail.com',
        SeatNumber: '162022160',
        Level: 'Third Level',
        dateSubmitted: '2025-07-14',
        Department: 'Computer Science',
      },
      {
        id: 2,
        FullName: 'Abdulla Omar',
        AcademicEmail: 'aabdula2712@gmail.com',
        SeatNumber: 162022160,
        Level: 'Third Level',
        dateSubmitted: '2025-07-14',
        Department: 'Information Technology',
      },
    ]
    setRequests(mockData)
  }, [])

const handleAddUser = () => {
  const newUser = {
    FullName: fullName,
    AcademicEmail: academicEmail,
    SeatNumber: seatNumber,
    Level: level,
    dateSubmitted: new Date().toISOString(),
    Department: department,
    status: "accepted", // optional but clear
  };

  console.log("Adding user:", newUser);
  setIsOpen(false);
};





  return (
    <div className="dashboard-content">
      {requests.length === 0 ? (
        <p>No complaints submitted yet.</p>
      ) : (
        requests.map((requests) => (
          <AdminRequestsCard key={requests.id} requests={requests} />
        ))
      )}

      <div className="flex justify-center">
      <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
          Add user
      </button>
        </div>
      <RespondModal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <div className="form-group">
          
                  
        <h1 className="text-3xl font-bold">Add a new account</h1>
      
              
          <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" name="fullName" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="academicEmail">Academic Email</label>
            <input type="email" value={academicEmail} onChange={(e) => setAcademicEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="seatNumber">Seat Number</label>
            <input type="text" value={seatNumber} onChange={(e) => setSeatNumber(e.target.value)} />
          </div>


          <div className="form-group">
            <label htmlFor="Level">Level</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="">-- Select your level --</option>
              <option value="cs">First level</option>
              <option value="it">Second level Technology</option>
              <option value="se">Third level</option>
              <option value="ai">Fourth level</option>
            </select>
          </div>              
          
          <div className="form-group">
            <label htmlFor="department">Department</label>
          <select value={department} onChange={(e) => setDepartment(e.target.value)} >
              <option value="">-- Select Department --</option>
              <option value="cs">Computer Science</option>
              <option value="it">Information Technology</option>
              <option value="se">Information Software</option>
              <option value="ai">Multi media</option>
            </select>
          </div>
        
        
        
        
        
        <div className="flex justify-center">
          <button className="btn btn-primary" onClick={handleAddUser}>
          Confirm
          </button>
        </div>

      </div>
      </RespondModal>

    </div>


  )
}

