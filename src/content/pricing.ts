import type { Localized } from "@/i18n/routing";

export interface PricingTier {
  id: string;
  name: Localized;
  price: Localized;
  description: Localized;
}

export const PRICING: PricingTier[] = [
  {
    id: "small",
    name: { mk: "Мало парче", en: "Small piece", al: "Punë e vogël" },
    price: { mk: "80–150 €", en: "80–150 €", al: "80–150 €" },
    description: {
      mk: "До 10 см — појас, симбол, мал мотив. Минимална цена на студиото е 80 €.",
      en: "Up to 10 cm — a band, a symbol, a small motif. The studio minimum is 80 €.",
      al: "Deri në 10 cm — një brez, një simbol, një motiv i vogël. Minimumi i studios është 80 €.",
    },
  },
  {
    id: "half-day",
    name: {
      mk: "Полудневна сесија",
      en: "Half-day session",
      al: "Seancë gjysmë dite",
    },
    price: { mk: "200–280 €", en: "200–280 €", al: "200–280 €" },
    description: {
      mk: "До четири часа работа. Типично: подлактица, лист, помал панел на грб.",
      en: "Up to four hours of work. Typically: a forearm, a calf, a smaller back panel.",
      al: "Deri në katër orë punë. Zakonisht: parakrah, pulpë, panel më i vogël shpine.",
    },
  },
  {
    id: "full-day",
    name: {
      mk: "Целодневна сесија",
      en: "Full-day session",
      al: "Seancë dite të plotë",
    },
    price: { mk: "350–450 €", en: "350–450 €", al: "350–450 €" },
    description: {
      mk: "До шест часа работа со паузи. За поголеми композиции што сакаме да ги затвориме одеднаш.",
      en: "Up to six hours of work, with breaks. For larger compositions we want to close in one go.",
      al: "Deri në gjashtë orë punë, me pushime. Për kompozime më të mëdha që duam t’i mbyllim përnjëherë.",
    },
  },
  {
    id: "large-project",
    name: {
      mk: "Голем проект",
      en: "Large project",
      al: "Projekt i madh",
    },
    price: { mk: "по сесија", en: "per session", al: "për seancë" },
    description: {
      mk: "Ракав, грб, гради — се планира во повеќе целодневни сесии, со фиксирана цена по сесија договорена на консултација.",
      en: "Sleeve, back, chest — planned across multiple full-day sessions, with a per-session price fixed at consultation.",
      al: "Mëngë, shpinë, kraharor — planifikohet në disa seanca ditore, me çmim për seancë të caktuar në konsultim.",
    },
  },
];
