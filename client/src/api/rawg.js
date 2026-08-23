const BASE_URL = "https://api.rawg.io/api";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const formatDate = (date) => date.toISOString().split("T")[0];

// Fetch popular games (most relevant/highest rated)
export const fetchPopularGames = async (pageSize = 10, page = 1, search = "") => {
  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&ordering=-added&page_size=${pageSize}&page=${page}&search=${search}`,
  ); // / unwraps Promise<Response> to raw Response object

  if (!response.ok) {
    throw new Error("Failed to fetch popular games");
  }

  return response.json(); // // returns Promise<parsedData>
};

// Fetch new releases (recently released games)
export const fetchNewReleases = async (pageSize = 10, page = 1, search = "") => {
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const dateRange = `${formatDate(oneYearAgo)},${formatDate(today)}`;

  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&dates=${dateRange}&ordering=-released&page_size=${pageSize}&page=${page}&search=${search}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch new releases");
  }

  return response.json();
};

// Fetch top rated games
export const fetchTopRated = async (pageSize = 10, page = 1, search = "") => {
  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&ordering=-metacritic&page_size=${pageSize}&page=${page}&search=${search}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top rated games");
  }

  return response.json();
};

// Search games by name
export const searchGames = async (query, pageSize = 10, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&search=${encodeURIComponent(
      query,
    )}&page_size=${pageSize}&page=${page}`,
  );
  if (!response.ok) {
    throw new Error("Failed to search games");
  }
  return response.json();
}

export const fetchGameDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
  if (!response.ok) {
    throw new Error("Failed to fetch game details");
  }
  return response.json();
};
