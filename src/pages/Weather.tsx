import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getWeather } from "@/api/weather";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ja";
import axios from "axios";

type WeatherItem = {
  dt: number;
  temp: number;
  icon: string | null;
};

type Status =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; city: string; items: WeatherItem[] }
  | { state: "error"; message: string; code: "not_found" | "client" | "server" };

export default function Weather() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "Tokyo";
  const [status, setStatus] = useState<Status>({ state: "idle" });

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("ja");

  useEffect(() => {
    let isMounted = true;

    const fetchWeather = async () => {
      setStatus({ state: "loading" });
      try {
        const data = await getWeather({ q: query });
        if (!isMounted) return;
        const items = data.list.map((entry) => ({
          dt: entry.dt,
          temp: entry.main.temp,
          icon: entry.weather[0]?.icon ?? null,
        }));
        setStatus({
          state: "success",
          city: data.city.name,
          items,
        });
      } catch (error) {
        if (!isMounted) return;
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status === 404) {
            setStatus({
              state: "error",
              message: "見つかりません",
              code: "not_found",
            });
          } else if (status && status >= 400 && status < 500) {
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
    };

    fetchWeather();

    return () => {
      isMounted = false;
    };
  }, [query]);

  if (status.state === "error") {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center space-y-2 text-center">
        <p className="text-6xl font-bold text-slate-200">
          {status.code === "not_found" ? "404" : status.code === "client" ? "400" : "500"}
        </p>
        <p className="text-lg text-slate-300">{status.message}</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-bold">Weather</h2>
      <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
        <div className="flex items-baseline justify-between">
          <h3 className="text-lg font-semibold">Forecast</h3>
          <span className="text-sm text-slate-400">City: {query}</span>
        </div>
        {status.state === "loading" && <p className="text-slate-300">Loading...</p>}
        {status.state === "success" && (
          <ul className="mt-4 divide-y divide-slate-800">
            {status.items.map((item, index) => (
              <li key={`${item.dt}-${index}`} className="flex items-center gap-4 py-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-900">
                  {item.icon ? (
                    <img
                      src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                      alt=""
                      className="h-10 w-10"
                    />
                  ) : (
                    <span className="text-xs text-slate-500">N/A</span>
                  )}
                </div>
                <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-slate-200">
                    {dayjs.unix(item.dt).tz("Asia/Tokyo").format("YYYY/MM/DD HH:mm")}
                  </span>
                  <span className="text-lg font-semibold text-slate-100">
                    {item.temp.toFixed(1)}°C
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
