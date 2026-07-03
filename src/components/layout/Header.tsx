"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { LanguageSwitcher } from "./LanguageSwitcher";

const NAV_ITEMS = [
  { href: "/studio", key: "studio" },
  { href: "/artists", key: "artists" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/news", key: "news" },
  { href: "/faq", key: "faq" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation (state adjustment during render,
  // per react.dev "You Might Not Need an Effect").
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-800 bg-ink-950/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-sm font-bold tracking-[0.18em] text-bone-100 uppercase"
        >
          Obsidian Ink
        </Link>

        <nav aria-label={t("mainLabel")} className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative text-sm transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-blood-300 after:transition-transform after:duration-300",
                isActive(item.href)
                  ? "text-bone-100 after:scale-x-100"
                  : "text-bone-500 after:scale-x-0 hover:text-bone-100 hover:after:scale-x-100",
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href="/booking"
            className="hidden bg-bone-100 px-4 py-2 font-mono text-xs tracking-widest text-ink-950 uppercase transition-colors hover:bg-blood-300 sm:inline-block"
          >
            {t("bookCta")}
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span className="sr-only">{open ? t("close") : t("menu")}</span>
            <span
              aria-hidden
              className={cn(
                "h-px w-6 bg-bone-100 transition-transform",
                open && "translate-y-[3.5px] rotate-45",
              )}
            />
            <span
              aria-hidden
              className={cn(
                "h-px w-6 bg-bone-100 transition-transform",
                open && "-translate-y-[3.5px] -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-ink-800 bg-ink-950 lg:hidden"
      >
        <nav aria-label={t("mainLabel")} className="flex flex-col px-5 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "border-b border-ink-800 py-4 font-display text-lg",
                isActive(item.href) ? "text-bone-100" : "text-bone-300",
              )}
            >
              {t(item.key)}
            </Link>
          ))}
          <Link
            href="/booking"
            className="mt-5 bg-bone-100 px-4 py-3 text-center font-mono text-sm tracking-widest text-ink-950 uppercase"
          >
            {t("bookCta")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
