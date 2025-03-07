import axios from "axios";

const REACT_APP_API_URL = "https://job-board-backend-three.vercel.app";

const api = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
