"use client";

import Script from "next/script";
import { useConsent } from "./ConsentProvider";

/**
 * Non-essential scripts mount here and ONLY after explicit consent.
 * The script URL comes from the environment so the repo ships no tracker;
 * with the variable unset this renders nothing at all.
 */
export function AnalyticsGate() {
  const { consent } = useConsent();
  const src = process.env.NEXT_PUBLIC_ANALYTICS_SRC;

  if (consent !== "accepted" || !src) return null;

  return (
    <Script
      src={src}
      strategy="afterInteractive"
      data-domain={process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN}
    />
  );
}
