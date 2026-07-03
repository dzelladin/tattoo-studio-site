import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline";

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm tracking-widest uppercase transition-colors";

const variants: Record<Variant, string> = {
  solid: "bg-bone-100 text-ink-950 hover:bg-blood-300 hover:text-ink-950",
  outline:
    "border border-ink-700 text-bone-100 hover:border-bone-300 hover:text-bone-100",
};

export function ButtonLink({
  variant = "solid",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; children: ReactNode }) {
  return (
    <Link {...props} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "solid",
  className,
  children,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button {...props} className={cn(base, variants[variant], className)}>
      {children}
    </button>
  );
}
