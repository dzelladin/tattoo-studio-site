"use client";

import { useTranslations } from "next-intl";
import { useConsent } from "./ConsentProvider";

export function CookieBanner() {
  const t = useTranslations("cookies");
  const { bannerOpen, decide } = useConsent();

  if (!bannerOpen) return null;

  return (
    <div
      role="region"
      aria-label={t("ariaLabel")}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-700 bg-ink-900/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs tracking-kicker text-bone-500 uppercase">
            {t("title")}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-bone-300">
            {t("body")}
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="border border-ink-700 px-5 py-2.5 text-sm text-bone-300 transition-colors hover:border-bone-500 hover:text-bone-100"
          >
            {t("decline")}
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="bg-bone-100 px-5 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-bone-300"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
