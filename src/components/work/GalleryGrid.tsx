"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { ArtworkTile } from "./ArtworkTile";

/** Pre-localized view model — the client bundle never ships all locales. */
export interface GalleryViewItem {
  id: string;
  title: string;
  artistName: string;
  styles: string[]; // style ids, for filtering
  styleLabels: string[];
  placement: string;
  year: number;
  image: string;
  alt: string;
}

export interface StyleOption {
  id: string;
  label: string;
}

export function GalleryGrid({
  items,
  styles,
}: {
  items: GalleryViewItem[];
  styles: StyleOption[];
}) {
  const t = useTranslations("portfolio");
  const [active, setActive] = useState<string | null>(null);

  const visible = active
    ? items.filter((item) => item.styles.includes(active))
    : items;

  return (
    <div>
      <fieldset className="mt-10">
        <legend className="sr-only">{t("filterLabel")}</legend>
        <div className="flex flex-wrap gap-2" role="group">
          <FilterButton
            label={t("all")}
            pressed={active === null}
            onClick={() => setActive(null)}
          />
          {styles.map((style) => (
            <FilterButton
              key={style.id}
              label={style.label}
              pressed={active === style.id}
              onClick={() => setActive(style.id)}
            />
          ))}
        </div>
      </fieldset>

      {visible.length === 0 ? (
        <p className="mt-12 text-bone-500">{t("empty")}</p>
      ) : (
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, i) => (
            <li key={item.id} className="group">
              <Reveal delay={(i % 3) * 80}>
                <ArtworkTile image={item.image} alt={item.alt} />
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <h3 className="text-sm font-semibold text-bone-100">
                    {item.title}
                  </h3>
                  <span className="font-mono text-xs text-bone-500">
                    {item.year}
                  </span>
                </div>
                <p className="mt-1 text-xs text-bone-500">
                  {item.placement} · {t("by", { name: item.artistName })} ·{" "}
                  {item.styleLabels.join(", ")}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterButton({
  label,
  pressed,
  onClick,
}: {
  label: string;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "border px-4 py-2 font-mono text-xs tracking-widest uppercase transition-colors",
        pressed
          ? "border-bone-100 bg-bone-100 text-ink-950"
          : "border-ink-700 text-bone-300 hover:border-bone-500 hover:text-bone-100",
      )}
    >
      {label}
    </button>
  );
}
