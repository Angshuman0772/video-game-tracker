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

export const addGameToLibrary = async (
  game,
  status = "completed",
  dates = {},
) => {
  const response = await axios.post(
    "/api/library",
    {
      gameId: game.id,
      gameName: game.name,
      gameImage: game.background_image,
      status,
      startedAt: dates.startedAt || undefined,
      completedAt: dates.completedAt || undefined,
    },
    getAuthConfig(),
  );
  return response.data;
};

export const updateLibraryGame = async (id, updates) => {
  const response = await axios.put(
    `/api/library/${id}`,
    updates,
    getAuthConfig(),
  );
  return response.data;
};

export const saveGameReview = async (
  game,
  libraryEntry,
  rating,
  review,
  completedAt,
) => {
  const reviewData = {};

  if (rating > 0) {
    reviewData.rating = rating;
  }
  if (review) {
    reviewData.review = review;
  }

  if (libraryEntry) {
    return updateLibraryGame(libraryEntry._id, reviewData);
  }

  const response = await axios.post(
    "/api/library",
    {
      gameId: game.id,
      gameName: game.name,
      gameImage: game.background_image,
      status: "completed",
      completedAt,
      ...reviewData,
    },
    getAuthConfig(),
  );
  return response.data;
};

export const getLibraryStats = async () => {
  const response = await axios.get("/api/library/stats", getAuthConfig());
  return response.data;
};

export const removeGameFromLibrary = async (id) => {
  const response = await axios.delete(`/api/library/${id}`, getAuthConfig());

  return response.data;
};
