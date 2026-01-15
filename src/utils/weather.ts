import { CITY_LABELS } from "@/constants/weather";

export function getCityLabel(query: string) {
  return CITY_LABELS[query.toLowerCase()] ?? query;
}
