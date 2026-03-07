import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchPopularGames,
  fetchNewReleases,
  fetchTopRated,
} from "../api/rawg";

function Home() {
  const [popularGames, setPopularGames] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [topRatedGames, setTopRatedGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const featuredGame = popularGames[0];

  // Fetch all game data on component mount which get stored in state variables
  // We use Promise.all to fetch all categories in parallel for better performance
  useEffect(() => {
    const fetchAllGames = async () => {
      try {
        const [popular, releases, topRated] = await Promise.all([
          fetchPopularGames(),
          fetchNewReleases(),
          fetchTopRated(),
        ]);

        setPopularGames(
          (popular.results ?? []).sort(
            (a, b) => (b.added ?? 0) - (a.added ?? 0),
          ),
        );
        setNewReleases(
          (releases.results ?? [])
            .filter((release) => release.released)
            .sort(
              (a, b) =>
                new Date(b.released).getTime() - new Date(a.released).getTime(),
            ),
        );
        setTopRatedGames(topRated.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllGames();
  }, []);

  if (loading)
    return (
      <div className="animated-loader">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="home-page">
      <header className="hero">
        <section className="hero-content">
          <p className="hero-kicker">Featured Game</p>
          <p className="item-meta">Track. Organize. Finish more games.</p>
          <h1>All your games in one clean dashboard.</h1>
          <p className="hero-copy">
            This week&apos;s spotlight is{" "}
            <strong>{featuredGame?.name ?? "Loading..."}</strong> — rated{" "}
            {featuredGame?.rating ?? "-"} with{" "}
            {featuredGame?.ratings_count ?? 0} community ratings.
          </p>
          <div className="hero-actions">
            <button className="primary-btn" type="button">
              Add to Library
            </button>
            <button className="secondary-btn" type="button">
              View Details
            </button>
          </div>
        </section>
      </header>

      <section className="content-grid">
        <article className="panel" id="popular">
          <div className="panel-heading">
            <h3>Popular Games</h3>
            <Link to="/popular">View All</Link>
          </div>
          <ul className="item-list">
            {popularGames.map((game) => (
              <li key={game.id}>
                <div>
                  <p className="item-title">{game.name}</p>
                  <p className="item-meta">
                    {game.genres?.[0]?.name ?? "Unknown genre"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel" id="releases">
          <div className="panel-heading">
            <h3>New Releases</h3>
            <Link to="/releases">View All</Link>
          </div>
          <ul className="item-list">
            {newReleases.map((release) => (
              <li key={release.id}>
                <div>
                  <p className="item-title">{release.name}</p>
                  <p className="item-meta">
                    {release.parent_platforms
                      ?.map((platformEntry) => platformEntry.platform.name)
                      .join(" / ") || "Unknown platform"}
                  </p>
                </div>
                <span>
                  {release.released
                    ? new Date(release.released).toLocaleDateString()
                    : "TBA"}
                </span>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel" id="top-rated">
          <div className="panel-heading">
            <h3>Top Rated</h3>
            <a href="#">Rankings</a>
          </div>
          <ul className="item-list">
            {topRatedGames.map((game) => (
              <li key={game.id}>
                <div>
                  <p className="item-title">{game.name}</p>
                  <p className="item-meta">{game.ratings_count ?? 0} ratings</p>
                </div>
                <span>{game.metacritic ?? "N/A"}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="signin-grid">
        <article className="panel" id="your-stats">
          <div className="panel-heading">
            <h3>Your Stats</h3>
          </div>
          <p className="signin-note">Sign in to display</p>
        </article>

        <article className="panel" id="friends-activity">
          <div className="panel-heading">
            <h3>Friend&apos;s Activity</h3>
          </div>
          <p className="signin-note">Sign in to display</p>
        </article>
      </section>
    </main>
  );
}

export default Home;
