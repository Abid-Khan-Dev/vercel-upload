import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3000", // backend url
  baseURL: import.meta.env.VITE_SERVER_URL, // backend url
  withCredentials: true, // to allow cookies
});

export default api;
