import { Link } from "react-router-dom";

export default function HomeErrorDemoPanel() {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold">エラーデモ</h3>
        <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Try errors</span>
      </div>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        <li>
          <Link
            className="block rounded-md border border-slate-800 px-3 py-2 text-slate-200 transition hover:border-slate-600 hover:bg-slate-900"
            to="/weather?q=Tokyo&forceError=500"
          >
            500エラーが出る都市
          </Link>
        </li>
        <li>
          <Link
            className="block rounded-md border border-slate-800 px-3 py-2 text-slate-200 transition hover:border-slate-600 hover:bg-slate-900"
            to={`/weather?q=${encodeURIComponent("XXXX")}`}
          >
            存在しない町
          </Link>
        </li>
      </ul>
    </div>
  );
}
