import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchGameDetails } from "../api/rawg";

function GameDetails() {
  const { id } = useParams();

  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <div className={"game-details"}>
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
      <div className={"game-details"}>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className={"game-details"}>
      <h1>{game.name}</h1>
    </div>
  );
}

export default GameDetails;
