import Panel from "@/components/common/Panel";
import { getCityLabel } from "@/utils/weather";
import WeatherForecastList from "@/components/weather/WeatherForecastList";
import { WeatherForecastItemData } from "./types";

type WeatherForecastStatus =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; items: WeatherForecastItemData[] };

type WeatherForecastPanelProps = {
  query: string;
  status: WeatherForecastStatus;
};

export default function WeatherForecastPanel({ query, status }: WeatherForecastPanelProps) {
  const cityLabel = getCityLabel(query);

  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-bold">天気</h2>
      <Panel>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-semibold">予報</h3>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="text-xs uppercase tracking-[0.3em] text-slate-500">都市</span>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-sm font-semibold text-slate-100">
              {cityLabel}
            </span>
          </div>
        </div>
        {status.state === "loading" && <p className="text-slate-300">取得中...</p>}
        {status.state === "success" && <WeatherForecastList items={status.items} />}
      </Panel>
    </section>
  );
}
