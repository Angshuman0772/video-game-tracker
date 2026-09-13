import axios from "axios";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getLibrary = async () => {
  const response = await axios.get("/api/library", getAuthConfig());
  return response.data;
};

export const addGameToLibrary = async (game) => {
  const response = await axios.post(
    "/api/library",
    {
      gameId: game.id,
      gameName: game.name,
      gameImage: game.background_image,
      status: "wishlist",
    },
    getAuthConfig(),
  );
  return response.data;
};

export const getLibraryStats = async () => {
  const response = await axios.get("/api/library/stats", getAuthConfig());
  return response.data;
};
