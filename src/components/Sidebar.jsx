import { Link } from "react-router-dom";

function Sidebar({ isOpen, toggleSidebar }) {
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
