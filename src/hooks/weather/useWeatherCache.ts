import { useCallback } from "react";
import dayjs from "dayjs";
import { WeatherItem } from "./types";

type WeatherCacheEntry = {
  fetchedAt: number;
  city: string;
  items: WeatherItem[];
};

const THREE_HOURS_SECONDS = 3 * 60 * 60;
const weatherCache = new Map<string, WeatherCacheEntry>();

function getTimeBucket(timestamp: number) {
  return Math.floor(dayjs.utc(timestamp).unix() / THREE_HOURS_SECONDS);
}

export function useWeatherCache() {
  const getCached = useCallback((query: string, now: number) => {
    const cached = weatherCache.get(query);
    if (!cached) {
      return null;
    }
    if (getTimeBucket(cached.fetchedAt) !== getTimeBucket(now)) {
      return null;
    }
    return cached;
  }, []);

  const setCached = useCallback((query: string, entry: WeatherCacheEntry) => {
    weatherCache.set(query, entry);
  }, []);

  return { getCached, setCached };
}
