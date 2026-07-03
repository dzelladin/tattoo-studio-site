import type { Localized } from "@/i18n/routing";

export interface FaqItem {
  id: string;
  question: Localized;
  answer: Localized;
}

export const FAQ: FaqItem[] = [
  {
    id: "color",
    question: {
      mk: "Дали работите во боја?",
      en: "Do you work in colour?",
      al: "A punoni me ngjyra?",
    },
    answer: {
      mk: "Не. Студиото е изградено околу блекворк и таму сме најдобри. Ако бараш боја, со задоволство ќе те упатиме кај колеги во Скопје на кои им веруваме.",
      en: "No. The studio is built around blackwork and that is where we are best. If you want colour, we will happily point you to colleagues in Skopje we trust.",
      al: "Jo. Studioja është ndërtuar rreth blackwork-ut dhe aty jemi më të mirët. Nëse kërkon ngjyra, me kënaqësi të drejtojmë te kolegë në Shkup që u besojmë.",
    },
  },
  {
    id: "pain",
    question: {
      mk: "Колку боли?",
      en: "How much does it hurt?",
      al: "Sa dhemb?",
    },
    answer: {
      mk: "Зависи од позицијата и од денот. Ребра, ’рбет и колено болат повеќе; подлактица и лист се поднослививи. Правиме паузи и никогаш не браниме да се прекине сесија — подобро две сесии отколку лошо искуство.",
      en: "Depends on placement and on the day. Ribs, spine and knee hurt more; forearm and calf are manageable. We take breaks, and stopping a session early is always allowed — better two sessions than one bad experience.",
      al: "Varet nga vendi dhe nga dita. Brinjët, kurrizi dhe gjuri dhembin më shumë; parakrahu dhe pulpa durohen. Bëjmë pushime dhe ndalimi i një seance më herët lejohet gjithmonë — më mirë dy seanca sesa një përvojë e keqe.",
    },
  },
  {
    id: "deposit",
    question: {
      mk: "Како функционира капарот?",
      en: "How does the deposit work?",
      al: "Si funksionon kapari?",
    },
    answer: {
      mk: "Капар од 3.000 денари (50 €) го резервира терминот и се одбива од крајната цена. Презакажување е бесплатно до 72 часа пред терминот; потоа капарот се задржува.",
      en: "A 3,000 MKD (€50) deposit books your date and comes off the final price. Rescheduling is free up to 72 hours before the appointment; after that the deposit is kept.",
      al: "Kapari prej 3.000 denarësh (50 €) e rezervon datën dhe zbritet nga çmimi përfundimtar. Shtyrja është falas deri 72 orë para terminit; pas kësaj kapari mbahet.",
    },
  },
  {
    id: "healing",
    question: {
      mk: "Како се негува тетоважата?",
      en: "How do I care for the tattoo?",
      al: "Si kujdesem për tatuazhin?",
    },
    answer: {
      mk: "Добиваш печатени упатства по сесијата: фолија првите часови, миење со неутрален сапун, тенок слој крема, без сонце, базен и теретана две-три недели. По четири недели правиме контрола и бесплатна поправка ако е потребна.",
      en: "You get printed instructions after the session: film for the first hours, washing with neutral soap, a thin layer of cream, no sun, pools or gym for two to three weeks. At four weeks we do a check-up and a free touch-up if needed.",
      al: "Merr udhëzime të shtypura pas seancës: film mbrojtës orët e para, larje me sapun neutral, një shtresë e hollë kremi, pa diell, pishinë e palestër dy-tri javë. Pas katër javësh bëjmë kontroll dhe një ndreqje falas nëse duhet.",
    },
  },
  {
    id: "coverup",
    question: {
      mk: "Правите ли кавер-ап?",
      en: "Do you do cover-ups?",
      al: "A bëni cover-up?",
    },
    answer: {
      mk: "Понекогаш. Тешкото црно е моќна алатка за покривање, но не секоја стара тетоважа е кандидат. Кавер-ап се проценува исклучиво во живо, на консултација — не по фотографија.",
      en: "Sometimes. Heavy black is a powerful covering tool, but not every old tattoo is a candidate. Cover-ups are assessed strictly in person, at consultation — not from a photo.",
      al: "Ndonjëherë. E zeza e rëndë është mjet i fuqishëm mbulimi, por jo çdo tatuazh i vjetër është kandidat. Cover-up-et vlerësohen vetëm në studio, në konsultim — jo nga fotografia.",
    },
  },
  {
    id: "age",
    question: {
      mk: "Тетовирате ли лица под 18 години?",
      en: "Do you tattoo people under 18?",
      al: "A tatuoni persona nën 18 vjeç?",
    },
    answer: {
      mk: "Не, без исклучок — ни со родителска согласност. Носи документ; ќе го побараме.",
      en: "No, without exception — not even with parental consent. Bring ID; we will ask for it.",
      al: "Jo, pa përjashtim — as me pëlqim prindëror. Merr dokument me vete; do ta kërkojmë.",
    },
  },
  {
    id: "design",
    question: {
      mk: "Кога ќе го видам дизајнот?",
      en: "When do I see the design?",
      al: "Kur e shoh dizajnin?",
    },
    answer: {
      mk: "Кратко пред сесијата, во студиото. Насоката се договара детално на консултацијата, па дизајнот никогаш не е изненадување — но не праќаме скици по мејл, зашто дизајн виден на екран, а не на тело, наведува на погрешни заклучоци.",
      en: "Shortly before the session, at the studio. The direction is agreed in detail at consultation, so the design is never a surprise — but we don’t email sketches, because a design judged on a screen instead of on a body invites the wrong conclusions.",
      al: "Pak para seancës, në studio. Drejtimi bisedohet në detaje në konsultim, kështu që dizajni s’është kurrë befasi — por nuk dërgojmë skica me email, sepse një dizajn i gjykuar në ekran e jo mbi trup të çon në përfundime të gabuara.",
    },
  },
];
