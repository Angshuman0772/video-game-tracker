import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/GamesList.css";

const GamesList = ({ fetchFunction, title, containerClass }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

/* HOW FETCHING WORKS: 

fetch() → Promise<Response>

await fetch() → Response

response.json() → Promise<JSON>

await fetchFunction() → JSON object (e.g., { count, results, ... })
*/

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        const data = await fetchFunction(25, currentPage, ""); // unwraps Promise<parsedData> → parsed JSON object (e.g., { count, results, ... })
        setGames(data.results ?? []);
        setTotalPages(Math.ceil((data.count ?? 0) / 25));
        setError(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        setError(
          `Failed to load ${title.toLowerCase()}. Please try again later.`,
        );
        console.error(`Error fetching ${title.toLowerCase()}:`, err);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, [currentPage, fetchFunction, title]);

  if (loading) {
    return (
      <div className="loading-state">
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
    return <div className="error">{error}</div>;
  }

  return (
    <div className={containerClass}>
      <h1 className="page-title">{title}</h1>
      <p>
        <Link to="/" className="back-link">
          Back to Home
        </Link>
      </p>
      <div className="games-grid">
        {games.map((game) => (
          <Link
            key={game.id}
            to={`/game/${game.id}`}
            className="game-card-link"
          >
            <article key={game.id} className="panel">
              {game.background_image ? (
                <img
                  src={game.background_image}
                  alt={`${game.name} cover art`}
                  className="game-cover"
                  loading="lazy"
                />
              ) : (
                <div className="game-cover game-cover-fallback">
                  No cover art
                </div>
              )}
              <h3>{game.name}</h3>
              <p>{game.genres?.[0]?.name ?? "Unknown genre"}</p>
              <p>
                {game.released
                  ? new Date(game.released).toLocaleDateString()
                  : "TBA"}
              </p>
            </article>
          </Link>
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

export default GamesList;
