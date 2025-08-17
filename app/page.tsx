import './home.css'; 
import Link from 'next/link';

export default function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">
          <h1>🎓 University Portal</h1>
        </div>
      </header>
      
      <div className="welcome-section">
        <h2>Welcome to the University Portal</h2>
        <p className="welcome-text">Choose your role to access the appropriate portal</p>
      </div>
      
      <div className="cards-container">
        <div className="role-card">
          <div className="card-icon">
            <span role="img" aria-label="student">👨‍🎓</span>
          </div>
          <h3>Student Portal</h3>
          <p className="card-description"> Complain, suggest, and chat with the university AI bot</p>
          <Link href="/login_student" className="btn btn-primary">
            Access Student Portal
          </Link>
        </div>

        <div className="role-card">
          <div className="card-icon">
            <span role="img" aria-label="admin">👨‍💼</span>
          </div>
          <h3>Admin Portal</h3>
          <p className="card-description">Manage Complaints, suggestions, and accounts</p>
          <Link href="/login_admin" className="btn btn-primary">
            Access Admin Portal
          </Link>
        </div>
      </div>
    </div>
  );
}