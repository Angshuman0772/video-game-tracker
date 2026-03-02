const BASE_URL = "https://api.rawg.io/api";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

// Fetch popular games (most relevant/highest rated)
export const fetchPopularGames = async () => {
  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&ordering=-rating&page_size=10`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular games");
  }

  return response.json();
};

// Fetch new releases (recently released games)
export const fetchNewReleases = async () => {
  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&ordering=-released&page_size=10`,
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
