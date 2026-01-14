import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-bold">Home</h2>
      <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
        <h3 className="text-lg font-semibold">Cities</h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {[
            { label: "東京", query: "Tokyo" },
            { label: "兵庫", query: "Hyogo" },
            { label: "大分", query: "Oita" },
            { label: "北海道", query: "Hokkaido" },
          ].map((city) => (
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
    </section>
  );
}
