export const CITY_OPTIONS = [
  { label: "東京", query: "Tokyo" },
  { label: "兵庫", query: "Hyogo" },
  { label: "大分", query: "Oita" },
  { label: "北海道", query: "Hokkaido" },
] as const;

export const CITY_LABELS = Object.fromEntries(
  CITY_OPTIONS.map((city) => [city.query.toLowerCase(), city.label])
);
