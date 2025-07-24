import axios from "axios";

export const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.message ||
      err.response?.statusText ||
      err.message ||
      "Unknown API error";

    return Promise.reject(new Error(message));
  }
);
