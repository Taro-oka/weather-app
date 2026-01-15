import type { HTMLAttributes } from "react";

type PanelProps = HTMLAttributes<HTMLDivElement>;

const BASE_CLASSNAME = "rounded-lg border border-slate-800 bg-slate-950/60 p-4";

export default function Panel({ className, ...props }: PanelProps) {
  const combinedClassName = className ? `${BASE_CLASSNAME} ${className}` : BASE_CLASSNAME;

  return <div className={combinedClassName} {...props} />;
}
