import type { Localized } from "@/i18n/routing";
import type { StyleId } from "./styles";

export interface GalleryItem {
  id: string;
  title: Localized;
  artistSlug: string;
  styles: StyleId[];
  year: number;
  placement: Localized;
  /** Text alternative for the (generative placeholder) artwork tile. */
  alt: Localized;
}

export const GALLERY: GalleryItem[] = [
  {
    id: "solar-wheel-chest",
    title: {
      mk: "Сончево тркало на гради",
      en: "Solar wheel chestpiece",
      al: "Rrotë diellore në kraharor",
    },
    artistSlug: "jana",
    styles: ["folk", "ornamental"],
    year: 2025,
    placement: { mk: "Гради", en: "Chest", al: "Kraharor" },
    alt: {
      mk: "Блекворк на гради: осмокрако сончево тркало распнато меѓу клучните коски",
      en: "Blackwork chestpiece: an eight-spoked solar wheel spanning the collarbones",
      al: "Blackwork në kraharor: rrotë diellore me tetë rreze e shtrirë mes klavikulave",
    },
  },
  {
    id: "mariovo-diamond-sleeve",
    title: {
      mk: "Мариовски ромбови — подлактица",
      en: "Mariovo diamond forearm",
      al: "Rombe të Mariovës — parakrah",
    },
    artistSlug: "jana",
    styles: ["folk"],
    year: 2024,
    placement: { mk: "Подлактица", en: "Forearm", al: "Parakrah" },
    alt: {
      mk: "Појас од вгнездени ромбови по мариовски вез, обвиткан околу подлактицата",
      en: "A band of nested diamonds after Mariovo embroidery, wrapped around the forearm",
      al: "Brez rombesh të futura njëra në tjetrën sipas qëndisjes së Mariovës, i mbështjellë rreth parakrahut",
    },
  },
  {
    id: "rosette-mandala-back",
    title: {
      mk: "Розета на грб",
      en: "Rosette backpiece",
      al: "Rozetë në shpinë",
    },
    artistSlug: "aylin",
    styles: ["dotwork", "ornamental"],
    year: 2025,
    placement: { mk: "Грб", en: "Back", al: "Shpinë" },
    alt: {
      mk: "Голема точкеста розета центрирана меѓу плешките, со дванаесет латици",
      en: "A large stippled rosette centred between the shoulder blades, twelve petals",
      al: "Rozetë e madhe me pika e qendërzuar mes shpatullave, me dymbëdhjetë petale",
    },
  },
  {
    id: "stippled-current-spine",
    title: {
      mk: "Точкеста струја по ’рбет",
      en: "Stippled current, spine",
      al: "Rrymë me pika, shtyllë kurrizore",
    },
    artistSlug: "aylin",
    styles: ["dotwork"],
    year: 2024,
    placement: { mk: "’Рбет", en: "Spine", al: "Shtyllë kurrizore" },
    alt: {
      mk: "Вертикална лента од точки со променлива густина, како речна струја по ’рбетот",
      en: "A vertical band of dots in shifting density, like a river current down the spine",
      al: "Shirit vertikal pikash me dendësi të ndryshueshme, si rrymë lumi përgjatë kurrizit",
    },
  },
  {
    id: "iconostasis-panel-arm",
    title: {
      mk: "Копаница на надлактица",
      en: "Iconostasis panel, upper arm",
      al: "Panel ikonostasi, krah i sipërm",
    },
    artistSlug: "darko",
    styles: ["geometric", "ornamental"],
    year: 2025,
    placement: { mk: "Надлактица", en: "Upper arm", al: "Krah i sipërm" },
    alt: {
      mk: "Правоаголен панел со преплетена резба по мотив од копаница, на надворешната надлактица",
      en: "A rectangular panel of interlaced carving after an iconostasis motif, outer upper arm",
      al: "Panel drejtkëndor me gdhendje të ndërthurur sipas një motivi ikonostasi, në pjesën e jashtme të krahut",
    },
  },
  {
    id: "blackout-forearm-bone",
    title: {
      mk: "Црна подлактица со негативен вез",
      en: "Blackout forearm, negative embroidery",
      al: "Parakrah i zi, qëndisje negative",
    },
    artistSlug: "darko",
    styles: ["blackout", "folk"],
    year: 2024,
    placement: { mk: "Подлактица", en: "Forearm", al: "Parakrah" },
    alt: {
      mk: "Целосно зацрнета подлактица со везбен појас оставен во негатив, во боја на кожа",
      en: "A fully blacked-out forearm with an embroidery band left in negative, skin-tone",
      al: "Parakrah i nxirë plotësisht me një brez qëndisjeje të lënë në negativ, në ngjyrën e lëkurës",
    },
  },
  {
    id: "threshold-cross-calf",
    title: {
      mk: "Праговен крст на лист",
      en: "Threshold cross, calf",
      al: "Kryq pragu, pulpë",
    },
    artistSlug: "jana",
    styles: ["folk"],
    year: 2023,
    placement: { mk: "Лист", en: "Calf", al: "Pulpë" },
    alt: {
      mk: "Рамнокрак крст со разгранети краци, како врежан над селски праг, на листот",
      en: "An equal-armed cross with branching ends, as carved above a village threshold, on the calf",
      al: "Kryq me krahë të barabartë e maja të degëzuara, si i gdhendur mbi pragun e një shtëpie fshati, në pulpë",
    },
  },
  {
    id: "concentric-shield-shoulder",
    title: {
      mk: "Концентричен штит на рамо",
      en: "Concentric shield, shoulder",
      al: "Mburojë koncentrike, sup",
    },
    artistSlug: "darko",
    styles: ["geometric"],
    year: 2025,
    placement: { mk: "Рамо", en: "Shoulder", al: "Sup" },
    alt: {
      mk: "Кружен штит од концентрични прстени и радијални линии, центриран на рамото",
      en: "A circular shield of concentric rings and radial lines, centred on the shoulder cap",
      al: "Mburojë rrethore me unaza koncentrike dhe vija radiale, e qendërzuar mbi sup",
    },
  },
  {
    id: "wheat-band-arm",
    title: {
      mk: "Житен појас",
      en: "Wheat band",
      al: "Brez gruri",
    },
    artistSlug: "jana",
    styles: ["ornamental", "folk"],
    year: 2024,
    placement: { mk: "Надлактица", en: "Upper arm", al: "Krah i sipërm" },
    alt: {
      mk: "Тенок појас од стилизирани житни класови околу надлактицата",
      en: "A thin band of stylised wheat stalks circling the upper arm",
      al: "Brez i hollë me kallinj gruri të stilizuar rreth krahut të sipërm",
    },
  },
  {
    id: "dot-gradient-halfsleeve",
    title: {
      mk: "Градиент од точки — половина ракав",
      en: "Dot-gradient half sleeve",
      al: "Gradient pikash — gjysmë mënge",
    },
    artistSlug: "aylin",
    styles: ["dotwork", "blackout"],
    year: 2025,
    placement: { mk: "Половина ракав", en: "Half sleeve", al: "Gjysmë mënge" },
    alt: {
      mk: "Половина ракав што преминува од полно црно на лактот кон ретки точки на рамото",
      en: "A half sleeve fading from solid black at the elbow to sparse dots at the shoulder",
      al: "Gjysmë mënge që kalon nga e zeza e plotë te bërryli drejt pikave të rralla te supi",
    },
  },
  {
    id: "kilim-spine-column",
    title: {
      mk: "Килимска колона по ’рбет",
      en: "Kilim spine column",
      al: "Kolonë qilimi përgjatë kurrizit",
    },
    artistSlug: "aylin",
    styles: ["ornamental", "folk"],
    year: 2023,
    placement: { mk: "’Рбет", en: "Spine", al: "Shtyllë kurrizore" },
    alt: {
      mk: "Вертикална колона од килимски мотиви наредени од тилот до крстот",
      en: "A vertical column of kilim motifs stacked from the nape to the lower back",
      al: "Kolonë vertikale motivesh qilimi të renditura nga qafa deri te mesi",
    },
  },
  {
    id: "hex-sigil-knee",
    title: {
      mk: "Шестаголен печат на колено",
      en: "Hex sigil kneecap",
      al: "Vulë gjashtëkëndore mbi gju",
    },
    artistSlug: "darko",
    styles: ["geometric"],
    year: 2024,
    placement: { mk: "Колено", en: "Knee", al: "Gju" },
    alt: {
      mk: "Шестаголен геометриски печат центриран на капачето од коленото",
      en: "A hexagonal geometric seal centred on the kneecap",
      al: "Vulë gjeometrike gjashtëkëndore e qendërzuar mbi kupën e gjurit",
    },
  },
];

export function galleryByArtist(slug: string): GalleryItem[] {
  return GALLERY.filter((item) => item.artistSlug === slug);
}
