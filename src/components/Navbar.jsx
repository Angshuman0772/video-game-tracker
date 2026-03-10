import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ toggleSidebar }) {
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
            placeholder="Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      <button className="ghost-btn" type="button">
        Sign In
      </button>
    </nav>
  );
}
export default Navbar;
