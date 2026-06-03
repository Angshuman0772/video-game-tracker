import React from "react";
import "../styles/pages/Login.css";

function Login() {
  return (
    <main className="login-page">
      <div className="login-card panel">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to manage your game library.</p>
        </div>

        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="primary-btn">
            Sign In
          </button>
        </form>

        <p className="login-footer">
          Don't have an account? <a href="#">Create one</a>
        </p>
      </div>
    </main>
  );
}

export default Login;
