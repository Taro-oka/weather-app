import HomeCityPanel from "@/components/home/HomeCityPanel";
import HomeErrorDemoPanel from "@/components/home/HomeErrorDemoPanel";

export default function Home() {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-bold">ホーム</h2>
      <HomeCityPanel />
      <HomeErrorDemoPanel />
    </section>
  );
}
