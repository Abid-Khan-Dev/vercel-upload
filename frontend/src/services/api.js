import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.SERVER_URL, // backend url
  withCredentials: true, // to allow cookies
});

export default api;
