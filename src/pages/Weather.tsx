import { useEffect, useState } from "react";
import { getWeather } from "../api/weather";

type Status =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; city: string; firstTemp: number; firstDesc: string }
  | { state: "error"; message: string };

export default function Weather() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  useEffect(() => {
    let isMounted = true;

    const fetchWeather = async () => {
      setStatus({ state: "loading" });
      try {
        const data = await getWeather({ q: "Tokyo" });
        if (!isMounted) return;
        const first = data.list[0];
        setStatus({
          state: "success",
          city: data.city.name,
          firstTemp: first.main.temp,
          firstDesc: first.weather[0]?.description ?? "N/A",
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
  }, []);

  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-bold">Weather</h2>
      <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
        <h3 className="text-lg font-semibold">API Check (Tokyo)</h3>
        {status.state === "loading" && <p className="text-slate-300">Loading...</p>}
        {status.state === "error" && <p className="text-red-400">Error: {status.message}</p>}
        {status.state === "success" && (
          <div className="text-slate-200">
            <p>City: {status.city}</p>
            <p>
              First forecast: {status.firstTemp.toFixed(1)}°C / {status.firstDesc}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
