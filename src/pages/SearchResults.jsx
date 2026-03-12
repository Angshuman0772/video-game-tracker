import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchGames } from "../api/rawg";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadGames = async () => {
      if (!query.trim()) {
        setGames([]);
        setTotalPages(1);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await searchGames(query, 25, currentPage);
        setGames(data.results ?? []);
        setTotalPages(Math.max(1, Math.ceil((data.count ?? 0) / 25)));
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        setError("Failed to load search results. Please try again later.");
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, [query, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  if (loading) {
    return (
      <div className="search-results-container">
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
      <div className="search-results-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <h1 className="page-title">
        {query ? `Search Results for "${query}"` : "Search Results"}
      </h1>
      <p>
        <Link to="/" className="back-link">
          Back to Home
        </Link>
      </p>

      {!query && (
        <p className="empty-state">
          Enter a search term in the navbar to find games.
        </p>
      )}

      {query && games.length === 0 && !loading && (
        <p className="empty-state">No games found for "{query}".</p>
      )}

      {games.length > 0 && (
        <>
          <div className="games-grid">
            {games.map((game) => (
              <Link key={game.id} to={`/game/${game.id}`} className="game-link">
                <article className="panel">
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
        </>
      )}
    </div>
  );
}

export default SearchResults;
