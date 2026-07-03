import type { Localized } from "@/i18n/routing";
import type { StyleId } from "./styles";

export interface GalleryItem {
  id: string;
  title: Localized;
  artistSlug: string;
  styles: StyleId[];
  year: number;
  placement: Localized;
  /** Path under /public. Rendered grayscale to keep the set monochrome. */
  image: string;
  /** Real alt text describing the photograph. */
  alt: Localized;
}

export const GALLERY: GalleryItem[] = [
  {
    id: "bodysuit-back",
    title: {
      mk: "Орнаментален боди-сут — грб и раце",
      en: "Ornamental bodysuit, back and arms",
      al: "Kostum ornamental — shpinë dhe krahë",
    },
    artistSlug: "jana",
    styles: ["ornamental", "folk"],
    year: 2025,
    placement: { mk: "Грб и раце", en: "Back and arms", al: "Shpinë dhe krahë" },
    image: "/images/gallery/bodysuit-back.jpg",
    alt: {
      mk: "Маж од грб со целосен орнаментален блекворк: полни црни раце и грб со симетрични светли шари што се спуштаат кон половината",
      en: "A man seen from behind with a full ornamental blackwork suit: solid black arms and a back of symmetric negative-space patterns flowing to the waist",
      al: "Një burrë nga pas me kostum të plotë blackwork ornamental: krahë të zinj të plotë dhe shpinë me motive simetrike në hapësirë negative që zbresin drejt belit",
    },
  },
  {
    id: "diamond-back",
    title: {
      mk: "Ромбовска решетка на грб",
      en: "Diamond lattice backpiece",
      al: "Rrjetë rombesh në shpinë",
    },
    artistSlug: "jana",
    styles: ["folk", "ornamental"],
    year: 2024,
    placement: { mk: "Грб", en: "Back", al: "Shpinë" },
    image: "/images/gallery/diamond-back.jpg",
    alt: {
      mk: "Црно-бела фотографија: грб со крупни вгнездени ромбови и назабени рабови, додека носителот соблекува џемпер преку глава",
      en: "Black-and-white photo: a back covered in large nested diamonds with serrated edges, the wearer pulling a sweater over their head",
      al: "Foto bardhezi: një shpinë e mbuluar me rombe të mëdha të futura njëra në tjetrën me buzë të dhëmbëzuara, ndërsa personi heq triko mbi kokë",
    },
  },
  {
    id: "throat-panel",
    title: {
      mk: "Геометриски панел на врат",
      en: "Geometric throat panel",
      al: "Panel gjeometrik në qafë",
    },
    artistSlug: "darko",
    styles: ["geometric"],
    year: 2025,
    placement: { mk: "Врат", en: "Neck", al: "Qafë" },
    image: "/images/gallery/throat-panel.jpg",
    alt: {
      mk: "Млад маж со очила во светол џемпер, со прецизен геометриски панел од линии врежан по страната на вратот",
      en: "A young man in glasses and a light sweater, a precise geometric line panel running down the side of his neck",
      al: "Një djalë me syze dhe triko të çelët, me një panel të saktë vijash gjeometrike përgjatë anës së qafës",
    },
  },
  {
    id: "spine-ornament",
    title: {
      mk: "Орнамент по ’рбет, заздравен",
      en: "Spine ornament, healed",
      al: "Ornament kurrizor, i shëruar",
    },
    artistSlug: "aylin",
    styles: ["ornamental", "dotwork"],
    year: 2023,
    placement: { mk: "’Рбет", en: "Spine", al: "Shtyllë kurrizore" },
    image: "/images/gallery/spine-ornament.jpg",
    alt: {
      mk: "Црно-бела фотографија на маж со раширени раце; долж ’рбетот се гледа заздравена орнаментална колона со лачни сегменти",
      en: "Black-and-white photo of a man with arms spread; a healed ornamental column of arched segments runs down his spine",
      al: "Foto bardhezi e një burri me krahë të hapur; përgjatë kurrizit i zbret një kolonë ornamentale e shëruar me segmente harkore",
    },
  },
  {
    id: "collar-hands",
    title: {
      mk: "Шеврон јака и појаси на дланки",
      en: "Chevron collar and hand bands",
      al: "Jakë shevron dhe breza duarsh",
    },
    artistSlug: "darko",
    styles: ["geometric", "ornamental"],
    year: 2024,
    placement: { mk: "Врат и дланки", en: "Neck and hands", al: "Qafë dhe duar" },
    image: "/images/gallery/collar-hands.jpg",
    alt: {
      mk: "Маж со очила седи на метална ограда; под јаката на џемперот се гледа шеврон-тетоважа на вратот, со радијални појаси на двете дланки",
      en: "A man in glasses sitting on a metal rail; a chevron tattoo shows above his sweater collar, with radial bands across both hands",
      al: "Një burrë me syze i ulur mbi një parmak metalik; mbi jakën e trikos i duket një tatuazh shevron në qafë, me breza radialë mbi të dyja duart",
    },
  },
  {
    id: "blackout-chest",
    title: {
      mk: "Црни ракави со шеврон гради",
      en: "Blackout sleeves, chevron chest",
      al: "Mëngë të zeza, kraharor shevron",
    },
    artistSlug: "darko",
    styles: ["blackout", "geometric"],
    year: 2025,
    placement: { mk: "Гради и раце", en: "Chest and arms", al: "Kraharor dhe krahë" },
    image: "/images/gallery/blackout-chest.jpg",
    alt: {
      mk: "Маж пред огледало со целосно зацрнети раце и шеврон-линии што се спуштаат од вратот кон градната коска",
      en: "A man at a mirror with fully blacked-out arms and chevron lines descending from the neck onto the sternum",
      al: "Një burrë para pasqyrës me krahë të nxirë plotësisht dhe vija shevron që zbresin nga qafa drejt sternumit",
    },
  },
  {
    id: "arrow-forearm",
    title: {
      mk: "Точкеста стрела на подлактица",
      en: "Dotwork arrow, forearm",
      al: "Shigjetë me pika, parakrah",
    },
    artistSlug: "aylin",
    styles: ["dotwork", "geometric"],
    year: 2024,
    placement: { mk: "Подлактица", en: "Forearm", al: "Parakrah" },
    image: "/images/gallery/arrow-forearm.jpg",
    alt: {
      mk: "Испружена рака со отворена дланка; по внатрешната подлактица тече тенка геометриска стрела со точкесто сенчење",
      en: "An outstretched arm, palm open; a thin geometric arrow with stippled shading runs down the inner forearm",
      al: "Krah i shtrirë me pëllëmbë të hapur; përgjatë parakrahut të brendshëm rrjedh një shigjetë e hollë gjeometrike me hijezim pikash",
    },
  },
  {
    id: "petal-back",
    title: {
      mk: "Латична розета на грб",
      en: "Petal rosette backpiece",
      al: "Rozetë petalesh në shpinë",
    },
    artistSlug: "jana",
    styles: ["ornamental", "geometric"],
    year: 2024,
    placement: { mk: "Грб", en: "Back", al: "Shpinë" },
    image: "/images/gallery/petal-back.jpg",
    alt: {
      mk: "Маж со дредови, свртен во профил; преку целиот грб се шири крупна латична розета со геометриско јадро, а раката му е покриена со мермерест ракав",
      en: "A man with dreadlocks in profile; a large petal rosette with a geometric core spans his back, one arm covered by a marbled sleeve",
      al: "Një burrë me dreadlocks në profil; një rozetë e madhe petalesh me bërthamë gjeometrike i mbulon shpinën, njëri krah i mbuluar me mëngë të mermertë",
    },
  },
  {
    id: "marbled-sleeves",
    title: {
      mk: "Мермерни ракави, заздравен грб",
      en: "Marbled sleeves, healed backpiece",
      al: "Mëngë të mermerta, shpinë e shëruar",
    },
    artistSlug: "aylin",
    styles: ["blackout", "ornamental"],
    year: 2025,
    placement: { mk: "Грб и раце", en: "Back and arms", al: "Shpinë dhe krahë" },
    image: "/images/gallery/marbled-sleeves.jpg",
    alt: {
      mk: "Маж се протега со раце над глава; двата ракава се исполнети со течни мермерни црни форми, а на грбот се гледа заздравена латична композиција",
      en: "A man stretching with arms overhead; both sleeves filled with fluid marbled black forms, a healed petal composition visible on his back",
      al: "Një burrë duke u shtriqur me krahë mbi kokë; të dyja mëngët të mbushura me forma të zeza të mermerta, me një kompozim petalesh të shëruar në shpinë",
    },
  },
];

export function galleryByArtist(slug: string): GalleryItem[] {
  return GALLERY.filter((item) => item.artistSlug === slug);
}
