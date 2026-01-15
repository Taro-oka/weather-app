import { Link } from "react-router-dom";

const CITIES = [
  { label: "東京", query: "Tokyo" },
  { label: "兵庫", query: "Hyogo" },
  { label: "大分", query: "Oita" },
  { label: "北海道", query: "Hokkaido" },
];

export default function HomeCityPanel() {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold">都市</h3>
        <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Pick a city</span>
      </div>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {CITIES.map((city) => (
          <li key={city.query}>
            <Link
              className="block rounded-md border border-slate-800 px-3 py-2 text-slate-200 transition hover:border-slate-600 hover:bg-slate-900"
              to={`/weather?q=${encodeURIComponent(city.query)}`}
            >
              {city.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
