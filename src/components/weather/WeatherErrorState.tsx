type WeatherErrorStateProps = {
  code: "not_found" | "client" | "server";
  message: string;
};

const STATUS_CODE_MAP = {
  not_found: 404,
  client: 400,
  server: 500,
} as const;

export default function WeatherErrorState({ code, message }: WeatherErrorStateProps) {
  const statusCode = STATUS_CODE_MAP[code];

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center space-y-2 text-center">
      <p className="text-6xl font-bold text-slate-200">{statusCode}</p>
      <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Status Code</p>
      <p className="text-lg text-slate-300">{message}</p>
    </section>
  );
}
