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
    </div>
    <div className="cards-container">
  <div className="role-card">
    <span role="img" aria-label="student">👨‍🎓</span>
    <h3>Student</h3>
    
    <Link href="/login_student" className="btn btn-primary">
  Access Student Portal
</Link>

  </div>

  
  <div className="role-card">
    <span role="img" aria-label="admin">👨‍💼</span>
    <h3>Admin</h3>
    
   <Link href="/login_admin" className="btn btn-primary">
  Access Admin Portal 
</Link>

  </div>

</div>

    </div>
  );
}


