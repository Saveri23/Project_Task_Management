import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔥 attach token automatically
API.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token"); // web

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export default API;