import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { getWeather } from "@/api/weather";
import { useWeatherCache } from "@/hooks/weather/useWeatherCache";
import { WeatherItem } from "./types";

type Status =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; city: string; items: WeatherItem[] }
  | { state: "error"; message: string; code: "not_found" | "client" | "server" };

type UseWeatherForecastParams = {
  query: string;
  forcedError: string | null;
};

export function useWeatherForecast({ query, forcedError }: UseWeatherForecastParams) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const { getCached, setCached } = useWeatherCache();

  const fetchWeather = useCallback(async () => {
    if (forcedError === "500") {
      setStatus({
        state: "error",
        message: "サーバーで問題が発生しました",
        code: "server",
      });
      return;
    }

    const now = dayjs.utc().valueOf();
    const cached = getCached(query, now);
    if (cached) {
      setStatus({
        state: "success",
        city: cached.city,
        items: cached.items,
      });
      return;
    }

    setStatus({ state: "loading" });

    try {
      const data = await getWeather({ q: query });
      const items = data.list.map((entry) => ({
        dt: entry.dt,
        temp: entry.main.temp,
        icon: entry.weather[0]?.icon ?? null,
      }));
      setCached(query, { fetchedAt: now, city: data.city.name, items });
      setStatus({
        state: "success",
        city: data.city.name,
        items,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        if (statusCode === 404) {
          setStatus({
            state: "error",
            message: "見つかりません",
            code: "not_found",
          });
        } else if (statusCode && statusCode >= 400 && statusCode < 500) {
          setStatus({
            state: "error",
            message: "リクエストに問題があります",
            code: "client",
          });
        } else {
          setStatus({
            state: "error",
            message: "サーバーで問題が発生しました",
            code: "server",
          });
        }
        return;
      }
      setStatus({
        state: "error",
        message: "不明なエラーが発生しました",
        code: "server",
      });
    }
  }, [forcedError, getCached, query, setCached, setStatus]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return { status };
}
