// src/api/axios.js
import axios from "axios";

// ✅ UPDATED Railway backend URL
const API = axios.create({
  baseURL: "https://operations-dashboard-production-bd43.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: attach token automatically if you use authentication
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;