import { cn } from "@/lib/cn";

/**
 * Deterministic generative ornament in the studio's visual language:
 * 8/12/16-fold rosettes, dot rings and diamonds echoing Macedonian
 * embroidery geometry. Stands in for photography until the studio
 * supplies shot work — every gallery item / portrait seeds its own
 * unique figure, so the layout reads real, not lorem-ipsum grey boxes.
 *
 * Decorative only: consumers must provide their own text alternative
 * (visible caption or sr-only text); the SVG itself is aria-hidden.
 */

function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const C = 200; // center of the 400×400 viewBox

function ring(r: number, count: number, dotR: number, key: string) {
  const dots = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 - Math.PI / 2;
    dots.push(
      <circle
        key={`${key}-${i}`}
        cx={C + r * Math.cos(a)}
        cy={C + r * Math.sin(a)}
        r={dotR}
        fill="currentColor"
      />,
    );
  }
  return dots;
}

function spokes(rInner: number, rOuter: number, count: number) {
  const lines = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 - Math.PI / 2;
    lines.push(
      <line
        key={i}
        x1={C + rInner * Math.cos(a)}
        y1={C + rInner * Math.sin(a)}
        x2={C + rOuter * Math.cos(a)}
        y2={C + rOuter * Math.sin(a)}
        stroke="currentColor"
        strokeWidth={1.5}
      />,
    );
  }
  return lines;
}

function diamond(r: number, rotate = 0) {
  return (
    <rect
      x={C - r}
      y={C - r}
      width={r * 2}
      height={r * 2}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      transform={`rotate(${45 + rotate} ${C} ${C})`}
    />
  );
}

export function Sigil({
  seed,
  className,
  accent = false,
}: {
  seed: string;
  className?: string;
  /** Draw one ring in blood red instead of monochrome bone. */
  accent?: boolean;
}) {
  const rand = mulberry32(hashSeed(seed));
  const fold = [8, 12, 16][Math.floor(rand() * 3)];
  const outerR = 150 + rand() * 20;
  const midR = 90 + rand() * 30;
  const innerR = 34 + rand() * 18;
  const hasDoubleDiamond = rand() > 0.5;
  const dotCount = fold * (rand() > 0.5 ? 2 : 3);
  const accentRing = Math.floor(rand() * 3);

  const ringColor = (i: number) =>
    accent && i === accentRing ? "text-blood-500" : "text-bone-500";

  return (
    <svg
      viewBox="0 0 400 400"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g className={ringColor(0)}>
        <circle cx={C} cy={C} r={outerR} fill="none" stroke="currentColor" strokeWidth={1.5} />
        {ring(outerR - 12, dotCount, 2.2, "outer")}
      </g>
      <g className={ringColor(1)}>
        <circle cx={C} cy={C} r={midR} fill="none" stroke="currentColor" strokeWidth={1} strokeDasharray={rand() > 0.5 ? "2 6" : undefined} />
        {spokes(innerR + 10, midR - 6, fold)}
      </g>
      <g className={ringColor(2)}>
        {diamond(innerR)}
        {hasDoubleDiamond && diamond(innerR, 45)}
        <circle cx={C} cy={C} r={4} fill="currentColor" />
        {ring(innerR + 26, fold, 1.8, "inner")}
      </g>
    </svg>
  );
}
