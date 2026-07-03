import { Kicker } from "./Section";
import { Sigil } from "./Sigil";

/**
 * Shared page intro: kicker, h1, lede — with a faint oversized sigil
 * bleeding off the right edge so no page opens on empty black.
 * The sigil is seeded by the title, so every page gets its own figure.
 */
export function PageHeader({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-ink-800">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -right-24 h-[26rem] w-[26rem] -translate-y-1/2 opacity-[0.08] sm:-right-12"
      >
        <Sigil seed={title} accent />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <Kicker>{kicker}</Kicker>
        <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,8vw,4rem)] leading-[1.02] font-bold text-balance sm:text-6xl">
          {title}
        </h1>
        {lede ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone-300">
            {lede}
          </p>
        ) : null}
      </div>
    </header>
  );
}
