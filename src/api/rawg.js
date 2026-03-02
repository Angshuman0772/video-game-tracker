const BASE_URL = "https://api.rawg.io/api";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const formatDate = (date) => date.toISOString().split("T")[0];

// Fetch popular games (most relevant/highest rated)
export const fetchPopularGames = async () => {
  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&ordering=-added&page_size=10`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular games");
  }

  return response.json();
};

// Fetch new releases (recently released games)
export const fetchNewReleases = async () => {
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const dateRange = `${formatDate(oneYearAgo)},${formatDate(today)}`;

  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&dates=${dateRange}&ordering=-released&page_size=10`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch new releases");
  }

  return response.json();
};

// Fetch top rated games
export const fetchTopRated = async () => {
  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&ordering=-metacritic&page_size=10`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top rated games");
  }

  return response.json();
};
