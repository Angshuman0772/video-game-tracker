import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchNewReleases } from "../api/rawg";
import "../styles/NewReleases.css";

const NewReleases = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadNewReleases = async () => {
      try {
        setLoading(true);
        const data = await fetchNewReleases(25, currentPage);
        setGames(data.results ?? []);
        setTotalPages(Math.ceil((data.count ?? 0) / 25));
        setError(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        setError("Failed to load new releases. Please try again later.");
        console.error("Error fetching new releases:", err);
      } finally {
        setLoading(false);
      }
    };

    loadNewReleases();
  }, [currentPage]);

  if (loading) {
    return (
      <div className="new-releases-container">
        <div className="animated-loader">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="new-releases-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="new-releases-container">
      <h1 className="page-title">New Releases</h1>
      <p>
        <Link to="/" className="back-link">
          Back to Home
        </Link>
      </p>
      <div className="games-grid">
        {games.map((game) => (
          <article key={game.id} className="panel">
            {game.background_image ? (
              <img
                src={game.background_image}
                alt={`${game.name} cover art`}
                className="game-cover"
                loading="lazy"
              />
            ) : (
              <div className="game-cover game-cover-fallback">No cover art</div>
            )}
            <h3>{game.name}</h3>
            <p>{game.genres?.[0]?.name ?? "Unknown genre"}</p>
            <p>
              {game.released
                ? new Date(game.released).toLocaleDateString()
                : "TBA"}
            </p>
          </article>
        ))}
      </div>
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewReleases;
