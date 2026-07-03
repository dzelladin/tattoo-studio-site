import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CookieSettingsButton } from "./CookieSettingsButton";

const NAV_ITEMS = [
  { href: "/studio", key: "studio" },
  { href: "/artists", key: "artists" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/news", key: "news" },
  { href: "/faq", key: "faq" },
  { href: "/booking", key: "booking" },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="overflow-hidden border-t border-ink-800 bg-ink-900">
      <p
        aria-hidden
        className="text-stroke-faint mx-auto max-w-6xl px-5 pt-12 font-display text-[10.5vw] leading-none font-bold tracking-tight whitespace-nowrap select-none sm:px-8 lg:text-[8.5rem]"
      >
        OBSIDIAN INK
      </p>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div>
          <p className="font-display text-sm font-bold tracking-[0.18em] uppercase">
            Obsidian Ink
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-bone-500">
            {t("tagline")}
          </p>
        </div>

        <div>
          <h2 className="font-mono text-xs tracking-kicker text-bone-500 uppercase">
            {t("visit")}
          </h2>
          <address className="mt-3 text-sm leading-relaxed text-bone-300 not-italic">
            {t("addressLine1")}
            <br />
            {t("addressLine2")}
          </address>
          <p className="mt-2 text-sm text-bone-300">{t("hoursValue")}</p>
        </div>

        <div>
          <h2 className="font-mono text-xs tracking-kicker text-bone-500 uppercase">
            {t("contact")}
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li>
              <a
                href="mailto:studio@obsidianink.mk"
                className="text-bone-300 transition-colors hover:text-bone-100"
              >
                studio@obsidianink.mk
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/obsidianink.ttt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bone-300 transition-colors hover:text-bone-100"
              >
                @obsidianink.ttt
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-mono text-xs tracking-kicker text-bone-500 uppercase">
            {t("navTitle")}
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-bone-300 transition-colors hover:text-bone-100"
                >
                  {nav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-xs text-bone-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} Obsidian Ink. {t("rights")}
          </p>
          <CookieSettingsButton />
        </div>
      </div>
    </footer>
  );
}
