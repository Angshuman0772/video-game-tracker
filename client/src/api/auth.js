import axios from "axios";

const API_URL = "http://localhost:5000/api/";

// Register user
export const registerUser = async (username, email, password) => {
  const response = await axios.post(API_URL + "auth/register", {
    username,
    email,
    password,
  });

  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.post(API_URL + "auth/login", {
    email,
    password,
  });

  return response.data;
};

export const getProfile = async (token) => {
  const response = await axios.get(API_URL + "user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
