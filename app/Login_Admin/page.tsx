import Link from 'next/link';
import './Login.css';

export default function LoginAdminPage() {
  return (
    <div className="Login-container">
      <header className="header">
        <div className="logo">
          <h1>🎓 Welcome to the Admin Portal</h1>
        </div>
      </header>

      <main className="main-content">
        <div className="form-container">
          <h2 className="text-center mb-3">Admin Login</h2>

          <div id="loginAlert" className="alert hidden"></div>

          <form id="studentLoginForm">
            <div className="form-group">
              <label htmlFor="email"> Email</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Login
            </button>
          </form>

          <div className="text-center mt-3">
            <p>
              <Link href="/">← Back to Home</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
