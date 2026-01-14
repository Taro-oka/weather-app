import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getWeather } from "@/api/weather";

type WeatherItem = {
  dt: number;
  temp: number;
  icon: string | null;
};

type Status =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; city: string; items: WeatherItem[] }
  | { state: "error"; message: string };

export default function Weather() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "Tokyo";
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("ja-JP", {
        timeZone: "Asia/Tokyo",
        dateStyle: "medium",
        timeStyle: "short",
      }),
    []
  );

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
        const message = error instanceof Error ? error.message : "Unknown error";
        setStatus({ state: "error", message });
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
        <p className="text-6xl font-bold text-slate-200">500</p>
        <p className="text-lg text-slate-300">Server error. Please try again.</p>
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
                    {dateFormatter.format(new Date(item.dt * 1000))}
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
