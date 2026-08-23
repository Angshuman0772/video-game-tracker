import { fetchPopularGames } from "../api/rawg";
import GamesList from "../components/GamesList";

const PopularGames = () => {
  return (
    <GamesList
      fetchFunction={fetchPopularGames}
      title="Popular Games"
      containerClass="popular-games-container"
    />
  );
};

export default PopularGames;
