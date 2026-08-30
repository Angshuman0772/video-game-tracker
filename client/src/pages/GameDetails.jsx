import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchGameDetails } from "../api/rawg";
import axios from "axios";
import "../styles/pages/GameDetails.css";

function GameDetails() {
  const { id } = useParams();

  const token = localStorage.getItem("token");

  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const addToLibrary = async () => {
    await axios.post(
      "/api/library",
      {
        gameId: game.id,
        gameName: game.name,
        gameImage: game.background_image,
        status: "wishlist",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  };

  useEffect(() => {
    const loadGameDetails = async () => {
      try {
        const data = await fetchGameDetails(id);
        setGame(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadGameDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="game-details">
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
      </div>
    );
  }

  if (error) {
    return (
      <div className="game-details">
        <div className="error">{error}</div>
        <Link className="back-btn" to="/">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="game-details">
      <div
        className="gd-hero"
        style={{ backgroundImage: `url(${game?.background_image})` }}
      >
        <div className="gd-overlay">
          <div className="container hero-inner">
            <div className="hero-top">
              <h1 className="title">{game?.name}</h1>

              <div className="hero-actions">
                <Link className="back-btn" to="/">
                  Back
                </Link>

                <button className="primary-btn" onClick={addToLibrary}>
                  Add to Library
                </button>
              </div>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <div className="stat-label">Rating</div>
                <div className="stat-value">{game?.rating ?? "—"} / 5</div>
              </div>
              <div className="stat">
                <div className="stat-label">Released</div>
                <div className="stat-value">{game?.released || "—"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container gd-content">
        <div className="gd-main">
          <article className="gd-desc">
            <h2>Overview</h2>
            {game?.description_raw ? (
              game.description_raw
                .split(/\r?\n\r?\n/)
                .map((para, i) => <p key={i}>{para}</p>)
            ) : (
              <p>No description available.</p>
            )}
          </article>

          <aside className="gd-aside">
            <div className="panel">
              <h3>Genres</h3>
              <div className="chips">
                {game?.genres?.length ? (
                  game.genres.map((g) => (
                    <span key={g.id} className="chip">
                      {g.name}
                    </span>
                  ))
                ) : (
                  <span className="chip muted">N/A</span>
                )}
              </div>
            </div>

            <div className="panel">
              <h3>Platforms</h3>
              <div className="chips">
                {game?.platforms?.length ? (
                  game.platforms.map((p, idx) => (
                    <span key={idx} className="chip">
                      {p.platform.name}
                    </span>
                  ))
                ) : (
                  <span className="chip muted">N/A</span>
                )}
              </div>
            </div>

            <div className="panel small">
              <h3>Details</h3>
              <div className="meta-list">
                <div>
                  <strong>Metacritic:</strong> {game?.metacritic ?? "—"}
                </div>
                <div>
                  <strong>Developers:</strong>{" "}
                  {game?.developers?.map((d) => d.name).join(", ") || "—"}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
