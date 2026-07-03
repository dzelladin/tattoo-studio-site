/**
 * Scrolling type strip. Decorative (aria-hidden) — the same vocabulary
 * is available as real text on the portfolio filters. Two identical
 * halves translate -50% for a seamless loop; prefers-reduced-motion
 * freezes it (see globals.css).
 */
export function Marquee({ items }: { items: string[] }) {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-ink-800 bg-ink-900/60 py-3"
    >
      <div className="animate-marquee flex w-max">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {items.map((item, i) => (
              <span key={i} className="flex items-center">
                <span className="px-8 font-mono text-xs tracking-kicker whitespace-nowrap text-bone-500 uppercase">
                  {item}
                </span>
                <span className="text-xs text-blood-500">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
