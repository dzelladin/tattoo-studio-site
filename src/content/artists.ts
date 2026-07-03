import type { Localized } from "@/i18n/routing";
import type { StyleId } from "./styles";

export interface Artist {
  slug: string;
  name: string;
  role: Localized;
  /** Year they started tattooing. */
  since: number;
  instagram: string;
  specialties: StyleId[];
  /** Seed for the generative portrait mark (see <Sigil>). */
  sigilSeed: string;
  portraitAlt: Localized;
  bio: Localized;
}

export const ARTISTS: Artist[] = [
  {
    slug: "jana",
    name: "Jana Stojanovska",
    role: {
      mk: "Основачка и артистка",
      en: "Founder & artist",
      al: "Themeluese dhe artiste",
    },
    since: 2013,
    instagram: "jana.crnareka",
    specialties: ["ornamental", "folk"],
    sigilSeed: "jana-stojanovska",
    portraitAlt: {
      mk: "Личен знак на Јана: осмокрако сончево тркало во црно",
      en: "Jana’s personal mark: an eight-spoked solar wheel in black",
      al: "Shenja personale e Janës: një rrotë diellore me tetë rreze në të zezë",
    },
    bio: {
      mk: "Јана го отвори студиото во 2019, по чиракување во Белград и шест години работа по гостувања низ Европа. Нејзината опсесија се везовите од Мариово и Скопска Црна Гора — геометрија што ја документира по етнографски збирки, па ја прекомпонира за тело. Работи бавно, со листа на чекање од неколку месеци, и најсреќна е кога проектот почнува од предмет со семејна историја.",
      en: "Jana opened the studio in 2019, after an apprenticeship in Belgrade and six years of guest spots across Europe. Her obsession is embroidery from Mariovo and Skopska Crna Gora — geometry she documents in ethnographic collections, then recomposes for the body. She works slowly, keeps a months-long waitlist, and is happiest when a project starts from an object with family history.",
      al: "Jana e hapi studion më 2019, pas një praktike në Beograd dhe gjashtë vjetësh si mysafire nëpër studio të Evropës. Obsesioni i saj janë qëndisjet e Mariovës dhe të Malit të Zi të Shkupit — gjeometri që e dokumenton nëpër koleksione etnografike, pastaj e rikompozon për trupin. Punon ngadalë, mban listë pritjeje prej muajsh, dhe është më e lumtur kur projekti nis nga një objekt me histori familjare.",
    },
  },
  {
    slug: "darko",
    name: "Darko Velkov",
    role: { mk: "Артист", en: "Artist", al: "Artist" },
    since: 2016,
    instagram: "darko.blk",
    specialties: ["geometric", "blackout"],
    sigilSeed: "darko-velkov",
    portraitAlt: {
      mk: "Личен знак на Дарко: концентрични кругови со ромб во средината",
      en: "Darko’s personal mark: concentric circles with a central diamond",
      al: "Shenja personale e Darkos: rrathë koncentrikë me një romb në qendër",
    },
    bio: {
      mk: "Дарко студираше архитектура пред да ја замени хартијата со кожа. Од таму го носи начинот на размислување: сè што црта е конструирано, со мрежи, оски и симетрии што го следат движењето на мускулот. Специјалност му се големи геометриски композиции и тешки црни површини — парчиња што се планираат како градба, во повеќе сесии.",
      en: "Darko studied architecture before trading paper for skin. He kept the way of thinking: everything he draws is constructed, with grids, axes and symmetries that follow the movement of the muscle. His specialty is large geometric composition and heavy black surfaces — pieces planned like buildings, over multiple sessions.",
      al: "Darko studioi arkitekturë para se ta ndërronte letrën me lëkurën. E mbajti mënyrën e të menduarit: gjithçka që vizaton është e ndërtuar, me rrjeta, boshte dhe simetri që ndjekin lëvizjen e muskulit. Specialiteti i tij janë kompozimet e mëdha gjeometrike dhe sipërfaqet e rënda të zeza — punë që planifikohen si ndërtesa, në disa seanca.",
    },
  },
  {
    slug: "aylin",
    name: "Aylin Rexhepi",
    role: { mk: "Артистка", en: "Artist", al: "Artiste" },
    since: 2018,
    instagram: "aylin.dots",
    specialties: ["dotwork", "ornamental"],
    sigilSeed: "aylin-rexhepi",
    portraitAlt: {
      mk: "Личен знак на Ајлин: прстен од точки околу розета",
      en: "Aylin’s personal mark: a ring of dots around a rosette",
      al: "Shenja personale e Aylinit: një unazë pikash rreth një rozete",
    },
    bio: {
      mk: "Ајлин доаѓа од графиката — четири години правеше линорез и сериграфија пред да земе машинка во рака. Нејзиниот дотворк се потпира на трпение: илјадници точки што градат градиенти какви што иглата инаку не дава. Работи најмногу на ’рбет, гради и раце, и е позната по тоа што одбива проект ако не верува дека ќе старее добро.",
      en: "Aylin comes from printmaking — four years of linocut and screen printing before she picked up a machine. Her dotwork leans on patience: thousands of dots building gradients a needle doesn’t otherwise give. She works mostly on spines, chests and arms, and is known for declining a project if she doesn’t believe it will age well.",
      al: "Aylin vjen nga grafika — katër vjet linogravurë dhe serigrafi para se të merrte makinën në dorë. Dotwork-u i saj mbështetet te durimi: mijëra pika që ndërtojnë gradientë që gjilpëra ndryshe nuk i jep. Punon më së shumti mbi shpinë, kraharor dhe krahë, dhe njihet se e refuzon një projekt nëse nuk beson që do të plaket bukur.",
    },
  },
];

export function getArtist(slug: string): Artist | undefined {
  return ARTISTS.find((a) => a.slug === slug);
}
