import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ja";
import { WeatherForecastItemData } from "./types";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ja");

type WeatherForecastItemProps = {
  item: WeatherForecastItemData;
};

export default function WeatherForecastItem({ item }: WeatherForecastItemProps) {
  return (
    <li className="flex items-center gap-4 py-3">
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
        <span className="text-lg font-semibold text-slate-100">{item.temp.toFixed(1)}°C</span>
      </div>
    </li>
  );
}
