import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { Sigil } from "@/components/ui/Sigil";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="flex flex-col items-center px-5 py-24 text-center">
      <div className="h-40 w-40 opacity-60">
        <Sigil seed="not-found" accent />
      </div>
      <h1 className="mt-8 font-display text-4xl font-semibold">{t("title")}</h1>
      <p className="mt-4 max-w-md text-bone-300">{t("body")}</p>
      <ButtonLink href="/" variant="outline" className="mt-8">
        {t("back")}
      </ButtonLink>
    </div>
  );
}
