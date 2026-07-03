"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  decideConsent,
  getConsentSnapshot,
  subscribeConsent,
  type ConsentValue,
} from "@/lib/consent";

type ConsentState = ConsentValue | "unset";

interface ConsentContextValue {
  /** "unset" until the visitor decides (and during SSR/first paint). */
  consent: ConsentState;
  bannerOpen: boolean;
  decide: (value: ConsentValue) => void;
  /** Re-opens the banner, e.g. from the footer "Cookie settings" button. */
  openBanner: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

const emptySubscribe = () => () => {};

export function ConsentProvider({ children }: { children: ReactNode }) {
  // The cookie is the source of truth; React just subscribes to it.
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    () => "unset" as const,
  );

  // False during SSR and hydration, so server and client markup agree
  // and the banner never flashes for visitors who already decided.
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const [reopened, setReopened] = useState(false);

  const decide = useCallback((value: ConsentValue) => {
    decideConsent(value);
    setReopened(false);
  }, []);

  const openBanner = useCallback(() => setReopened(true), []);

  const bannerOpen = hydrated && (consent === "unset" || reopened);

  const value = useMemo(
    () => ({ consent, bannerOpen, decide, openBanner }),
    [consent, bannerOpen, decide, openBanner],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used inside <ConsentProvider>");
  return ctx;
}
