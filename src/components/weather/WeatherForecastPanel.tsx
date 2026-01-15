import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ja";
import Panel from "@/components/common/Panel";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ja");

type WeatherItem = {
  dt: number;
  temp: number;
  icon: string | null;
};

type WeatherForecastStatus =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; items: WeatherItem[] };

type WeatherForecastPanelProps = {
  query: string;
  status: WeatherForecastStatus;
};

export default function WeatherForecastPanel({ query, status }: WeatherForecastPanelProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-bold">天気</h2>
      <Panel>
        <div className="flex items-baseline justify-between">
          <h3 className="text-lg font-semibold">予報</h3>
          <span className="text-sm text-slate-400">都市: {query}</span>
        </div>
        {status.state === "loading" && <p className="text-slate-300">取得中...</p>}
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
      </Panel>
    </section>
  );
}
