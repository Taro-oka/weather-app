import axios from "axios";

// Placeholder for future external API calls from the frontend.
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.example.com",
});

export default client;
