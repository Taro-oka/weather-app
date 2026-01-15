import LinkCard from "@/components/common/LinkCard";
import Panel from "@/components/common/Panel";

export default function HomeErrorDemoPanel() {
  return (
    <Panel>
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold">エラーデモ</h3>
        <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
          エラーを再現できます
        </span>
      </div>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        <li>
          <LinkCard to="/weather?q=Tokyo&forceError=500">500エラーが出る都市</LinkCard>
        </li>
        <li>
          <LinkCard to={`/weather?q=${encodeURIComponent("XXXX")}`}>存在しない町</LinkCard>
        </li>
      </ul>
    </Panel>
  );
}
