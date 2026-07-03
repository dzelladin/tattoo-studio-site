"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const LABELS: Record<Locale, string> = { mk: "МК", en: "EN", al: "SQ" };

export function LanguageSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav aria-label={t("languageLabel")} className="flex items-center gap-1">
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          // lang tells screen readers how to pronounce the label
          lang={l === "al" ? "sq" : l}
          aria-current={l === locale ? "true" : undefined}
          onClick={() => router.replace(pathname, { locale: l })}
          className={cn(
            "px-2 py-1 font-mono text-xs tracking-widest transition-colors",
            l === locale
              ? "text-blood-300"
              : "text-bone-500 hover:text-bone-100",
          )}
        >
          {LABELS[l]}
        </button>
      ))}
    </nav>
  );
}
