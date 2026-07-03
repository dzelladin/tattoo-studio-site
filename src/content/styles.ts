import type { Localized } from "@/i18n/routing";

/**
 * Shared style vocabulary: gallery filters and artist specialties both
 * reference these ids, so a filter can never point at a style that
 * doesn't exist.
 */
export const STYLES = [
  {
    id: "ornamental",
    label: { mk: "Орнаментален", en: "Ornamental", al: "Ornamental" },
  },
  {
    id: "dotwork",
    label: { mk: "Дотворк", en: "Dotwork", al: "Dotwork" },
  },
  {
    id: "geometric",
    label: { mk: "Геометриски", en: "Geometric", al: "Gjeometrik" },
  },
  {
    id: "folk",
    label: { mk: "Народни мотиви", en: "Folk motifs", al: "Motive popullore" },
  },
  {
    id: "blackout",
    label: { mk: "Тешко црно", en: "Heavy black", al: "E zezë e rëndë" },
  },
] as const satisfies ReadonlyArray<{ id: string; label: Localized }>;

export type StyleId = (typeof STYLES)[number]["id"];

export function styleLabel(id: StyleId, locale: keyof Localized): string {
  const style = STYLES.find((s) => s.id === id);
  return style ? style.label[locale] : id;
}
