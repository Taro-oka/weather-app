import client from "./client";
import { ForecastResponseSchema } from "@/types/weather";

export async function getWeather({ q }: { q: string }) {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("Missing VITE_OPEN_WEATHER_API_KEY in env.");
  }

  const response = await client.get("/data/2.5/forecast", {
    params: {
      q,
      appid: apiKey,
      units: "metric",
      lang: "ja",
    },
  });

  return ForecastResponseSchema.parse(response.data);
}
