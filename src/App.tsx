import Header from "@/components/Header";
import AppRoutes from "@/routes";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <AppRoutes />
      </main>
    </div>
  );
}
