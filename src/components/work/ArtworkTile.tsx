import { Sigil } from "@/components/ui/Sigil";
import { cn } from "@/lib/cn";

/**
 * A framed piece of work. The generative sigil is decorative; the tile
 * itself carries the accessible description (role="img" + aria-label),
 * which is the item's real alt text from the content model.
 */
export function ArtworkTile({
  seed,
  alt,
  accent,
  className,
}: {
  seed: string;
  alt: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative aspect-square overflow-hidden border border-ink-800 bg-ink-900 p-6 transition-colors duration-300 group-hover:border-ink-700",
        className,
      )}
    >
      <Sigil
        seed={seed}
        accent={accent}
        className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />
    </div>
  );
}
