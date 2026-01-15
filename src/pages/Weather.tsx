import { useSearchParams } from "react-router-dom";
import { useWeatherForecast } from "@/hooks/weather/useWeatherForecast";
import WeatherErrorState from "@/components/weather/WeatherErrorState";
import WeatherForecastPanel from "@/components/weather/WeatherForecastPanel";

export default function Weather() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "Tokyo";
  const forcedError = searchParams.get("forceError");
  const { status } = useWeatherForecast({ query, forcedError });

  return status.state === "error" ? (
    <WeatherErrorState code={status.code} message={status.message} />
  ) : (
    <WeatherForecastPanel query={query} status={status} />
  );
}
