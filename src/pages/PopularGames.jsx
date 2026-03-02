import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPopularGames } from "../api/rawg";
import "../styles/PopularGames.css";

const PopularGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPopularGames = async () => {
      try {
        setLoading(true);
        const data = await fetchPopularGames(50);
        setGames(data.results ?? []);
        setError(null);
      } catch (err) {
        setError("Failed to load popular games. Please try again later.");
        console.error("Error fetching popular games:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPopularGames();
  }, []);

  if (loading) {
    return (
      <div className="popular-games-container">
        <div className="loading">Loading popular games...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="popular-games-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="popular-games-container">
      <h1 className="page-title">Popular Games</h1>
      <p>
        <Link to="/">Back to Home</Link>
      </p>
      <div className="games-grid">
        {games.map((game) => (
          <article key={game.id} className="panel">
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
    </div>
  );
};

export default PopularGames;
