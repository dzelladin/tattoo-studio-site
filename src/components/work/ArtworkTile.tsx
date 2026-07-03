import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * A framed piece of work. Photos render grayscale so mixed-source
 * photography reads as one monochrome set — the studio only works
 * in black, and the site should look like it.
 */
export function ArtworkTile({
  image,
  alt,
  sizes = "(min-width: 1024px) 350px, (min-width: 640px) 45vw, 90vw",
  className,
}: {
  image: string;
  alt: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden border border-ink-800 bg-ink-900 transition-colors duration-300 group-hover:border-ink-700",
        className,
      )}
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover grayscale transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />
      {/* Blood-red wash on hover — the one colour the studio allows */}
      <span
        aria-hidden
        className="absolute inset-0 bg-blood-500/0 mix-blend-multiply transition-colors duration-500 group-hover:bg-blood-500/45"
      />
    </div>
  );
}
