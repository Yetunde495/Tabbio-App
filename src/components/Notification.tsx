import { PropsWithChildren } from "react";

interface Props {
  title: string;
  msg?: string;
  variant?: "error" | "info" | "warning" | "success";
}

export default function Notification({
  title,
  msg,
  children,
  variant,
}: Props & PropsWithChildren) {
  let cls =
    variant === "info"
      ? "mb-3 text-xl font-semibold text-primary"
      : variant === "error"
      ? "mb-3 text-xl font-semibold text-danger"
      : variant === "success"
      ? "mb-3 text-xl font-semibold text-success"
      : variant === "warning"
      ? "mb-3 text-xl font-semibold text-warning"
      : "mb-3 text-xl font-semibold text-black/80";

  return (
    <div>
      <h2 className={cls}>{title}</h2>
      <p className="text-sm">{msg || children}</p>
    </div>
  );
}
