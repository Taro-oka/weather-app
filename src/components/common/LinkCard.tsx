import type { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";

type LinkCardProps = ComponentPropsWithoutRef<typeof Link>;

const BASE_CLASSNAME =
  "block rounded-md border border-slate-800 px-3 py-2 text-slate-200 transition hover:border-slate-600 hover:bg-slate-900";

export default function LinkCard({ className, ...props }: LinkCardProps) {
  const combinedClassName = className ? `${BASE_CLASSNAME} ${className}` : BASE_CLASSNAME;

  return <Link className={combinedClassName} {...props} />;
}
