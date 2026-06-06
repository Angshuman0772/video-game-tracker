import { useState } from "react";
import "../styles/pages/Auth.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="auth-page">
      <div className="auth-card panel">
        <div className="auth-header">
          <h1>{isLogin ? "Welcome Back" : "Create Account"}</h1>
          <p>
            {isLogin
              ? "Sign in to manage your game library."
              : "Create an account to manage your game library."}
          </p>
        </div>

        <form className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Choose a username"
              />
            </div>
          )}

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

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
              />
            </div>
          )}

          <button type="submit" className="primary-btn">
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                className="auth-link ghost-btn"
                onClick={() => setIsLogin(false)}
              >
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                className="auth-link ghost-btn"
                onClick={() => setIsLogin(true)}
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </main>
  );
}

export default Auth;
