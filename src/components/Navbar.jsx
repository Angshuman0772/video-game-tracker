import { Link } from "react-router-dom";

function Navbar({ toggleSidebar }) {
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
        
      </div>
      <button className="ghost-btn" type="button">
        Sign In
      </button>
    </nav>
  );
}
export default Navbar;
