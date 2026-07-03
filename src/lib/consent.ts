export type ConsentValue = "accepted" | "rejected";

export const CONSENT_COOKIE = "oi-consent";
/** Six months, in seconds — long enough to not nag, short enough to re-ask. */
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 182;

export function readConsentCookie(): ConsentValue | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  const value = match?.split("=")[1];
  return value === "accepted" || value === "rejected" ? value : null;
}

export function writeConsentCookie(value: ConsentValue) {
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${CONSENT_MAX_AGE}; SameSite=Lax`;
}

/*
 * Minimal external store around the cookie so React components can read
 * consent via useSyncExternalStore — no state mirroring in effects.
 */
const listeners = new Set<() => void>();

export function subscribeConsent(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getConsentSnapshot(): ConsentValue | "unset" {
  return readConsentCookie() ?? "unset";
}

export function decideConsent(value: ConsentValue) {
  writeConsentCookie(value);
  listeners.forEach((l) => l());
}
