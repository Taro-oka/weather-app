import WeatherForecastItem from "@/components/weather/WeatherForecastItem";
import { WeatherForecastItemData } from "./types";

type WeatherForecastListProps = {
  items: WeatherForecastItemData[];
};

export default function WeatherForecastList({ items }: WeatherForecastListProps) {
  return (
    <ul className="mt-4 divide-y divide-slate-800">
      {items.map((item, index) => (
        <WeatherForecastItem key={`${item.dt}-${index}`} item={item} />
      ))}
    </ul>
  );
}
