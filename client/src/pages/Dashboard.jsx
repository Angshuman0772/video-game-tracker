import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLibraryStats } from "../api/library";
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

function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const { showToast } = useToast();
  const [stats, setStats] = useState({
    totalGames: 0,
    completedGames: 0,
    byStatus: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) return;

    const loadStats = async () => {
      try {
        setStats(await getLibraryStats());
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

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <p className="hero-kicker">Your progress</p>
        <h1>{user.username}&apos;s Dashboard</h1>
        <p>One glance at the games you are tracking and finishing.</p>
      </header>

      <section className="stats-grid" aria-label="Library summary">
        <article className="panel stat-card">
          <span className="stat-label">Total games</span>
          <strong>{stats.totalGames}</strong>
        </article>
        <article className="panel stat-card">
          <span className="stat-label">Completed</span>
          <strong>{stats.completedGames}</strong>
        </article>
        <article className="panel stat-card">
          <span className="stat-label">Completion rate</span>
          <strong>
            {stats.totalGames
              ? Math.round((stats.completedGames / stats.totalGames) * 100)
              : 0}
            %
          </strong>
        </article>
      </section>

      <section className="panel status-panel">
        <div className="panel-heading">
          <h2>Library by status</h2>
          <Link to="/">Browse games</Link>
        </div>
        <div className="status-list">
          {statusLabels.map(([status, label]) => (
            <div className="status-row" key={status}>
              <span>{label}</span>
              <strong>{stats.byStatus?.[status] ?? 0}</strong>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
