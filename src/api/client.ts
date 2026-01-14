import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_OPEN_WEATHER_BASE_URL || "https://api.openweathermap.org",
});

export default client;
