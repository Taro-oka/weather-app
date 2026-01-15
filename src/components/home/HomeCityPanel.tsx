import LinkCard from "@/components/common/LinkCard";
import Panel from "@/components/common/Panel";
import { CITY_OPTIONS } from "@/constants/weather";

export default function HomeCityPanel() {
  return (
    <Panel>
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold">都市</h3>
        <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
          都市を選んでください
        </span>
      </div>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {CITY_OPTIONS.map((city) => (
          <li key={city.query}>
            <LinkCard to={`/weather?q=${encodeURIComponent(city.query)}`}>{city.label}</LinkCard>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
