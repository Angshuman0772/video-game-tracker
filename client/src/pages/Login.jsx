import { Link } from "react-router-dom";
import "../styles/pages/Auth.css";

function Login() {
  return (
    <main className="auth-page">
      <div className="auth-card panel">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to manage your game library.</p>
        </div>

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="primary-btn">
            Sign In
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register" className="auth-link">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
