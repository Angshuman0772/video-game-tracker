import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="top-nav">
      <Link to="/" className="brand">Checkpoint</Link>
      <div className="nav-middle">
        <Link to="/popular">Popular Games</Link>
        <Link to="/releases">New Releases</Link>
        <Link to="/top-rated">Top Rated</Link>
      </div>
      <button className="ghost-btn" type="button">
        Sign In
      </button>
    </nav>
  );
}
export default Navbar;
