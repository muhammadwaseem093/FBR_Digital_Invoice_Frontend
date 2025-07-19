import axios from "axios";
import { getToken } from "../auth/token";

const api = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL: "https://fbr-digital-invoice-backend.onrender.com", // ✅ use your deployed backend URL here
  withCredentials: false, // ✅ don't send cookies unless needed
});

// 🔐 Attach token to every request if exists
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔐 Handle unauthorized responses globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Session expired or invalid token
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
