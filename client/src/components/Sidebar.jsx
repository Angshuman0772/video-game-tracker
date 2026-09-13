import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/components/Sidebar.css";

function Sidebar({ isOpen, toggleSidebar }) {
  const { user } = useAuth();

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button
            className="close-btn"
            onClick={toggleSidebar}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>
        <nav className="sidebar-nav">
          {user && (
            <Link to="/dashboard" onClick={toggleSidebar}>
              Dashboard
            </Link>
          )}
          <Link to="/popular" onClick={toggleSidebar}>
            Popular Games
          </Link>
          <Link to="/releases" onClick={toggleSidebar}>
            New Releases
          </Link>
          <Link to="/top-rated" onClick={toggleSidebar}>
            Top Rated
          </Link>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
