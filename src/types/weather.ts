import { z } from "zod";

const WeatherEntrySchema = z.object({
  dt: z.number(),
  dt_txt: z.string(),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    humidity: z.number(),
  }),
  weather: z.array(
    z.object({
      id: z.number(),
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),
  wind: z.object({
    speed: z.number(),
    deg: z.number(),
  }),
});

export const ForecastResponseSchema = z.object({
  cod: z.string(),
  message: z.number(),
  cnt: z.number(),
  list: z.array(WeatherEntrySchema),
  city: z.object({
    id: z.number(),
    name: z.string(),
    country: z.string(),
    timezone: z.number(),
    sunrise: z.number(),
    sunset: z.number(),
  }),
});

export type ForecastResponse = z.infer<typeof ForecastResponseSchema>;
