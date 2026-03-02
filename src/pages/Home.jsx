// TODO: Fetch data from RAWG API instead of hardcoded arrays. See src/api/rawg.js for fetch functions.

const popularGames = [
  { title: "Elder Realms VI", genre: "Action RPG", players: "1.8M players" },
  { title: "Cyber Streets 2099", genre: "Open World", players: "1.3M players" },
  { title: "Aether Rivals", genre: "Fighting", players: "980K players" },
];

const newReleases = [
  { title: "Mythborne", date: "Mar 12, 2026", platform: "PC / PS5" },
  { title: "Velocity Drift X", date: "Apr 2, 2026", platform: "PC / Xbox" },
  { title: "Kingdoms of Ash", date: "May 18, 2026", platform: "PC / Switch 2" },
];

const topRatedGames = [
  { title: "Hollow Frontier", score: "9.6", reviews: "42K reviews" },
  { title: "Legends Reborn", score: "9.4", reviews: "31K reviews" },
  { title: "Orbitfall", score: "9.2", reviews: "25K reviews" },
];

function Home() {
  return (
    <main className="home-page">
      <nav className="top-nav">
        <p className="brand">Checkpoint</p>
        <div className="nav-middle">
          <a href="#popular">Popular Games</a>
          <a href="#releases">New Releases</a>
          <a href="#top-rated">Top Rated</a>
        </div>
        <button className="ghost-btn" type="button">
          Sign In
        </button>
      </nav>

      <header className="hero">
        <section className="hero-content">
          <p className="hero-kicker">Featured Game</p>
          <p className="item-meta">Track. Organize. Finish more games.</p>
          <h1>All your games in one clean dashboard.</h1>
          <p className="hero-copy">
            This week&apos;s spotlight is <strong>Elder Realms VI</strong> — a
            massive open-world RPG with deep progression and co-op raids.
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
            <a href="#">View All</a>
          </div>
          <ul className="item-list">
            {popularGames.map((game) => (
              <li key={game.title}>
                <div>
                  <p className="item-title">{game.title}</p>
                  <p className="item-meta">{game.genre}</p>
                </div>
                <span>{game.players}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel" id="releases">
          <div className="panel-heading">
            <h3>New Releases</h3>
            <a href="#">View All</a>
          </div>
          <ul className="item-list">
            {newReleases.map((release) => (
              <li key={release.title}>
                <div>
                  <p className="item-title">{release.title}</p>
                  <p className="item-meta">{release.platform}</p>
                </div>
                <span>{release.date}</span>
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
              <li key={game.title}>
                <div>
                  <p className="item-title">{game.title}</p>
                  <p className="item-meta">{game.reviews}</p>
                </div>
                <span>{game.score}</span>
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
