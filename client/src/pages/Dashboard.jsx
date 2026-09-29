import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLibrary, getLibraryStats } from "../api/library";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/toastContext";
import "../styles/pages/Dashboard.css";

const statusLabels = [
  ["playing", "Playing"],
  ["backlog", "Backlog"],
  ["wishlist", "Wishlist"],
  ["completed", "Completed"],
  ["dropped", "Dropped"],
];

const statusDescriptions = {
  playing: "In rotation right now",
  backlog: "Ready for your next session",
  wishlist: "Games you want to keep an eye on",
  completed: "Finished and logged",
  dropped: "Paused or left behind",
};

const formatDate = (date) => {
  if (!date) return "Added recently";

  return `Added ${new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
};

const formatTrackedDate = (date, label) =>
  date
    ? `${label} ${new Date(date).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}`
    : null;

function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const { showToast } = useToast();
  const [stats, setStats] = useState({
    totalGames: 0,
    completedGames: 0,
    byStatus: {},
  });
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) return;

    const loadStats = async () => {
      try {
        const [libraryStats, libraryGames] = await Promise.all([
          getLibraryStats(),
          getLibrary(),
        ]);
        setStats(libraryStats);
        setLibrary(libraryGames);
      } catch {
        showToast("Could not load your dashboard", "error");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [authLoading, showToast, user]);

  if (authLoading || (user && loading)) {
    return (
      <div className="dashboard-page loading-state">Loading dashboard...</div>
    );
  }

  if (!user) {
    return (
      <main className="dashboard-page">
        <section className="panel dashboard-empty">
          <h1>See your stats</h1>
          <p>Sign in to track your library and see your progress.</p>
          <Link className="primary-btn" to="/login">
            Sign In
          </Link>
        </section>
      </main>
    );
  }

  const gamesByStatus = statusLabels.reduce((groups, [status]) => {
    groups[status] = library.filter((game) => game.status === status);
    return groups;
  }, {});

  const latestGame = [...library].sort(
    (first, second) => new Date(second.createdAt) - new Date(first.createdAt),
  )[0];

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="hero-kicker">Library control room</p>
          <h1>{user.username}&apos;s library</h1>
          <p>Keep your current games close and your next games in sight.</p>
        </div>
        <Link className="dashboard-browse-link" to="/">
          Browse games <span aria-hidden="true">-&gt;</span>
        </Link>
      </header>

      <section className="stats-grid" aria-label="Library summary">
        <article className="panel stat-card stat-card-primary">
          <span className="stat-label">Total games</span>
          <strong>{stats.totalGames}</strong>
          <span className="stat-note">Across every status</span>
        </article>
        <article className="panel stat-card">
          <span className="stat-label">Completed</span>
          <strong>{stats.completedGames}</strong>
          <span className="stat-note">
            {stats.totalGames ? "Keep going" : "Start your collection"}
          </span>
        </article>
        <article className="panel stat-card">
          <span className="stat-label">Completion rate</span>
          <strong>
            {stats.totalGames
              ? Math.round((stats.completedGames / stats.totalGames) * 100)
              : 0}
            %
          </strong>
          <span className="stat-note">Your finish line</span>
        </article>
        <article className="panel stat-card latest-card">
          <span className="stat-label">Latest addition</span>
          <strong>{latestGame?.gameName ?? "No games yet"}</strong>
          <span className="stat-note">{formatDate(latestGame?.createdAt)}</span>
        </article>
      </section>

      <nav className="status-nav" aria-label="Jump to library status">
        {statusLabels.map(([status, label]) => (
          <a
            className={`status-nav-item status-${status}`}
            href={`#${status}`}
            key={status}
          >
            <span>{label}</span>
            <strong>{gamesByStatus[status].length}</strong>
          </a>
        ))}
      </nav>

      <div className="library-sections">
        {statusLabels.map(([status, label]) => {
          const games = gamesByStatus[status];

          return (
            <section
              className={`library-section status-${status}`}
              id={status}
              key={status}
            >
              <div className="section-heading">
                <div>
                  <p className="section-eyebrow">
                    {String(games.length).padStart(2, "0")} games
                  </p>
                  <h2>{label}</h2>
                  <p>{statusDescriptions[status]}</p>
                </div>
                <span className="section-mark" aria-hidden="true">
                  /{status.slice(0, 2)}
                </span>
              </div>

              {games.length ? (
                <div className="library-grid">
                  {games.map((game) => (
                    <Link
                      className="library-card"
                      key={game._id}
                      to={`/game/${game.gameId}`}
                    >
                      {game.gameImage ? (
                        <img
                          src={game.gameImage}
                          alt={`${game.gameName} cover art`}
                          loading="lazy"
                        />
                      ) : (
                        <div className="library-card-image image-fallback">
                          No cover art
                        </div>
                      )}
                      <div className="library-card-body">
                        <div className="library-card-title-row">
                          <h3>{game.gameName}</h3>
                          <span className="card-arrow" aria-hidden="true">
                            -&gt;
                          </span>
                        </div>
                        <div className="library-card-meta">
                          <span>
                            {game.rating ? `${game.rating}/10` : "Not rated"}
                          </span>
                          {formatTrackedDate(game.startedAt, "Started") && (
                            <span>
                              {formatTrackedDate(game.startedAt, "Started")}
                            </span>
                          )}
                          {formatTrackedDate(game.completedAt, "Completed") && (
                            <span>
                              {formatTrackedDate(game.completedAt, "Completed")}
                            </span>
                          )}
                          <span>
                            {game.hoursPlayed
                              ? `${game.hoursPlayed}h played`
                              : formatDate(game.createdAt)}
                          </span>
                        </div>
                        <span className="view-details">View game details</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="status-empty">
                  <span className="empty-number">00</span>
                  <div>
                    <h3>No games here yet</h3>
                    <p>
                      Add a game from its detail page to build this section.
                    </p>
                  </div>
                  <Link to="/">Find a game -&gt;</Link>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}

export default Dashboard;
