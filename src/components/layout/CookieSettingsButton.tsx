"use client";

import { useTranslations } from "next-intl";
import { useConsent } from "@/components/consent/ConsentProvider";

export function CookieSettingsButton() {
  const t = useTranslations("footer");
  const { openBanner } = useConsent();

  return (
    <button
      type="button"
      onClick={openBanner}
      className="self-start underline decoration-ink-700 underline-offset-4 transition-colors hover:text-bone-100"
    >
      {t("cookieSettings")}
    </button>
  );
}
