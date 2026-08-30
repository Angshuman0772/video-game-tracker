import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/components/Navbar.css";

function Navbar({ toggleSidebar }) {
  const { user, logout } = useAuth();

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = search.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };
  return (
    <nav className="top-nav">
      <div className="nav-left">
        <button
          className="hamburger-btn"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Link to="/" className="brand">
          Checkpoint
        </Link>
      </div>
      <div className="nav-middle">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      {user ? (
        <button className="ghost-btn" onClick={logout}>
          Sign Out {user.username}
        </button>
      ) : (
        <Link className="ghost-btn" to="/login">
          Sign In
        </Link>
      )}
    </nav>
  );
}
export default Navbar;
