import { fetchNewReleases } from "../api/rawg";
import GamesList from "../components/GamesList";
import "../styles/NewReleases.css";

const NewReleases = () => {
  return (
    <GamesList
      fetchFunction={fetchNewReleases}
      title="New Releases"
      containerClass="new-releases-container"
    />
  );
};

export default NewReleases;