import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchGameDetails } from "../api/rawg";
import {
  addGameToLibrary,
  getLibrary,
  updateLibraryGame,
} from "../api/library";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/toastContext";
import "../styles/pages/GameDetails.css";

const getTodayDateValue = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${today.getFullYear()}-${month}-${day}`;
};

function GameDetails() {
  const { id } = useParams();

  const { user } = useAuth();
  const { showToast } = useToast();

  const [game, setGame] = useState(null);
  const [inLibrary, setInLibrary] = useState(false);
  const [libraryEntry, setLibraryEntry] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [startedAt, setStartedAt] = useState("");
  const [completedAt, setCompletedAt] = useState("");
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const libraryStatuses = [
    ["playing", "Playing"],
    ["backlog", "Backlog"],
    ["wishlist", "Wishlist"],
    ["completed", "Completed"],
    ["dropped", "Dropped"],
  ];

  const openStatusForm = (status) => {
    if (status !== "playing" && status !== "completed") {
      saveLibraryStatus(status);
      return;
    }

    setSelectedStatus(status);
    setStartedAt(libraryEntry?.startedAt?.slice(0, 10) || "");
    setCompletedAt(libraryEntry?.completedAt?.slice(0, 10) || "");
  };

  const saveLibraryStatus = async (statusToSave = selectedStatus) => {
    if (!statusToSave || libraryLoading) return;

    if (!user) {
      showToast("Sign in to add games to your library", "error");
      return;
    }

    try {
      setLibraryLoading(true);
      const dates =
        statusToSave === "playing" || statusToSave === "completed"
          ? { startedAt, completedAt }
          : {};
      const savedEntry = libraryEntry
        ? await updateLibraryGame(libraryEntry._id, {
            status: statusToSave,
            ...dates,
          })
        : await addGameToLibrary(game, statusToSave, dates);
      setLibraryEntry(savedEntry);
      setInLibrary(true);
      setSelectedStatus(null);
      showToast(
        libraryEntry
          ? `${game.name} updated to ${statusToSave}`
          : `${game.name} added to your library as ${statusToSave}`,
      );
    } catch (err) {
      if (err.response?.status === 409) {
        setInLibrary(true);
      }
      showToast(
        err.response?.data?.message || "Could not update your library",
        "error",
      );
    } finally {
      setLibraryLoading(false);
    }
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

  useEffect(() => {
    const loadLibraryStatus = async () => {
      if (!user) {
        setInLibrary(false);
        return;
      }

      try {
        const library = await getLibrary();
        const entry = library.find((item) => item.gameId === Number(id));
        setLibraryEntry(entry || null);
        setInLibrary(Boolean(entry));
      } catch {
        showToast("Could not check your library status", "error");
      }
    };

    loadLibraryStatus();
  }, [id, showToast, user]);

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

                <div className="library-dropdown">
                  <button
                    className="primary-btn library-dropdown-trigger"
                    type="button"
                    aria-haspopup="menu"
                    disabled={libraryLoading}
                  >
                    {inLibrary ? "Update Library Entry" : "Add to Library"}
                    <span aria-hidden="true">▾</span>
                  </button>

                  {!selectedStatus && (
                    <div className="library-dropdown-menu" role="menu">
                      {libraryStatuses.map(([status, label]) => (
                        <button
                          key={status}
                          type="button"
                          role="menuitem"
                          onClick={() => openStatusForm(status)}
                          disabled={libraryLoading}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {selectedStatus && (
                <form
                  className="library-date-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    saveLibraryStatus();
                  }}
                >
                  <h2>
                    {libraryEntry ? "Update library entry" : "Log your dates"}
                  </h2>
                  <p>
                    {selectedStatus === "playing"
                      ? "When did you start playing this game?"
                      : selectedStatus === "completed"
                        ? "When did you complete this game?"
                        : "Dates are available for playing and completed games."}
                  </p>
                  {selectedStatus === "playing" && (
                    <label>
                      Started playing
                      <div className="date-input-row">
                        <input
                          type="date"
                          value={startedAt}
                          onChange={(event) => setStartedAt(event.target.value)}
                        />
                        <button
                          type="button"
                          className="secondary-btn today-btn"
                          onClick={() => setStartedAt(getTodayDateValue())}
                        >
                          Today
                        </button>
                      </div>
                    </label>
                  )}
                  {selectedStatus === "completed" && (
                    <label>
                      Completed
                      <div className="date-input-row">
                        <input
                          type="date"
                          value={completedAt}
                          onChange={(event) =>
                            setCompletedAt(event.target.value)
                          }
                        />
                        <button
                          type="button"
                          className="secondary-btn today-btn"
                          onClick={() => setCompletedAt(getTodayDateValue())}
                        >
                          Today
                        </button>
                      </div>
                    </label>
                  )}
                  <div className="library-date-actions">
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() => setSelectedStatus(null)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="primary-btn"
                      disabled={libraryLoading}
                    >
                      Save as {selectedStatus}
                    </button>
                  </div>
                </form>
              )}
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
