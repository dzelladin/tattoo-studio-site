import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-5 py-16 sm:px-8 sm:py-24", className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-xs tracking-kicker text-bone-500 uppercase">
      <span aria-hidden className="inline-block h-px w-8 bg-blood-500" />
      {children}
    </p>
  );
}

export function SectionHeading({
  kicker,
  title,
  lede,
  index,
}: {
  kicker: string;
  title: string;
  lede?: string;
  /** Editorial section number, rendered as a huge outlined ghost numeral. */
  index?: string;
}) {
  return (
    <div className="relative max-w-2xl">
      {index ? (
        <span
          aria-hidden
          className="text-stroke-faint pointer-events-none absolute -top-12 -left-3 font-display text-[7rem] leading-none font-bold select-none sm:-top-16 sm:text-[9rem]"
        >
          {index}
        </span>
      ) : null}
      <div className="relative">
        <Kicker>{kicker}</Kicker>
        <h2 className="mt-4 font-display text-3xl leading-tight font-semibold text-balance sm:text-4xl">
          {title}
        </h2>
        {lede ? (
          <p className="mt-5 text-base leading-relaxed text-bone-300">{lede}</p>
        ) : null}
      </div>
    </div>
  );
}
