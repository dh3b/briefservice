import type { GuideEntry, Faq, GuideCta } from "./types";
import { sectionsToMarkdown, type Section } from "./_build";

/**
 * Informational guides (Polish) targeting the real search demand around German
 * vehicle titles. Each ends with a CTA to the relevant service page.
 */

interface GuideSource {
  slug: string;
  sortOrder: number;
  title: string;
  h1: string;
  summary: string;
  description: string;
  lead: string;
  sections: Section[];
  faq: Faq[];
  cta: GuideCta;
}

const SOURCES: GuideSource[] = [
  {
    slug: "co-to-jest-niemiecki-brief",
    sortOrder: 10,
    title: "Co to jest niemiecki brief? Mały i duży brief (Teil I i II)",
    h1: "Co to jest niemiecki brief? Mały i duży brief",
    summary: "Wyjaśniamy, czym jest niemiecki brief i jaka jest różnica między małym a dużym briefem.",
    description:
      "Czym jest niemiecki brief samochodowy, czym różni się mały brief (Teil I) od dużego (Teil II) i do czego służą. Prosty przewodnik po niemieckich dokumentach pojazdu.",
    lead: "„Brief” to potoczna nazwa niemieckich dokumentów pojazdu. W praktyce chodzi o dwa dokumenty: Zulassungsbescheinigung Teil I (mały brief) i Teil II (duży brief). Poniżej wyjaśniamy, czym się różnią i do czego są potrzebne.",
    sections: [
      {
        heading: "Mały brief (Zulassungsbescheinigung Teil I)",
        body: [
          "Mały brief to odpowiednik dowodu rejestracyjnego. Zawiera dane techniczne pojazdu i informację o aktualnej rejestracji. To dokument, który wozi się w pojeździe.",
        ],
      },
      {
        heading: "Duży brief (Zulassungsbescheinigung Teil II)",
        body: [
          "Duży brief to dokument własności i „dowód pochodzenia” pojazdu. Nie wozi się go w aucie — przechowuje się go w bezpiecznym miejscu. To właśnie Teil II jest niezbędny do sprzedaży i przerejestrowania pojazdu.",
          "Starsze pojazdy mogą mieć dokumenty w poprzednim formacie (Fahrzeugbrief i Fahrzeugschein), ale ich rola jest analogiczna.",
        ],
      },
      {
        heading: "Dlaczego to ważne przy imporcie",
        body: [
          "Przy sprowadzaniu auta z Niemiec to duży brief (Teil II) decyduje o możliwości rejestracji w Polsce. Jego brak jest najczęstszą przyczyną problemów — dlatego zawsze upewnij się, że sprzedający przekazuje komplet dokumentów.",
          "Warto też wiedzieć, gdzie szukać numerów w dokumencie — zobacz: [guide:jak-czytac-niemiecki-brief].",
        ],
      },
    ],
    faq: [
      {
        q: "Czym różni się mały brief od dużego?",
        a: "Mały brief (Teil I) to dokument rejestracyjny wożony w aucie. Duży brief (Teil II) to dokument własności i pochodzenia pojazdu, niezbędny do sprzedaży i przerejestrowania.",
      },
      {
        q: "Który brief jest potrzebny do rejestracji w Polsce?",
        a: "Przede wszystkim duży brief (Teil II). Bez niego rejestracja jest zwykle niemożliwa.",
      },
      {
        q: "Co, jeśli mam tylko mały brief?",
        a: "Można odtworzyć brakującą dokumentację lub wyrobić duplikat dużego briefu na podstawie danych pojazdu w Niemczech. Pomagamy w takich sprawach.",
      },
    ],
    cta: {
      serviceSlug: "odzyskanie-briefu",
      label: "Odzyskanie i duplikat briefu",
      text: "Brakuje Ci briefu albo masz tylko część dokumentów? Sprawdź, jak możemy pomóc.",
    },
  },
  {
    slug: "jak-czytac-niemiecki-brief",
    sortOrder: 20,
    title: "Jak czytać niemiecki brief – numery i numer karty pojazdu",
    h1: "Jak czytać niemiecki brief – gdzie są numery",
    summary: "Przewodnik po polach niemieckiego briefu: VIN, numer dokumentu i numer karty pojazdu.",
    description:
      "Gdzie w niemieckim briefie znaleźć VIN, numer dokumentu i numer karty pojazdu. Wyjaśniamy najważniejsze pola w Zulassungsbescheinigung Teil I i Teil II.",
    lead: "Niemiecki brief jest pełen kodów i pól oznaczonych literami. Pokazujemy, gdzie szukać najważniejszych numerów, które przydają się przy zakupie, rejestracji i wyrobieniu duplikatu.",
    sections: [
      {
        heading: "Numer identyfikacyjny pojazdu (VIN)",
        body: [
          "VIN (Fahrzeug-Identifizierungsnummer) to 17-znakowy numer nadwozia. Znajdziesz go zarówno w małym, jak i dużym briefie oraz fizycznie na pojeździe. To podstawowy numer, od którego zaczynamy każdą sprawę.",
        ],
      },
      {
        heading: "Numer karty pojazdu / numer dokumentu",
        body: [
          "Duży brief (Teil II) ma własny numer dokumentu — to on bywa nazywany „numerem karty pojazdu”. Jest istotny m.in. przy weryfikacji autentyczności i przy wyrabianiu duplikatu.",
        ],
      },
      {
        heading: "Pola z kodami (np. 2.1, 2.2, D.1, D.2)",
        bullets: [
          "D.1 / D.2 – marka i typ/model pojazdu,",
          "J – kategoria pojazdu (rodzaj),",
          "F.1 / F.2 – dopuszczalna masa całkowita (DMC),",
          "G – masa własna,",
          "P.1–P.3 – pojemność, moc i rodzaj paliwa.",
        ],
      },
    ],
    faq: [
      {
        q: "Gdzie jest numer karty pojazdu w briefie?",
        a: "To numer dokumentu dużego briefu (Teil II). Znajduje się na samym dokumencie i służy m.in. do weryfikacji oraz przy wyrabianiu duplikatu.",
      },
      {
        q: "Gdzie sprawdzić DMC w briefie?",
        a: "Dopuszczalną masę całkowitą znajdziesz w polach F.1/F.2. Jeśli chcesz ją zmienić, zobacz nasz poradnik o zmianie DMC.",
      },
      {
        q: "Czy VIN w briefie musi zgadzać się z autem?",
        a: "Tak. VIN na pojeździe musi być zgodny z dokumentami. Rozbieżności trzeba wyjaśnić przed rejestracją — w takich sprawach również pomagamy.",
      },
    ],
    cta: {
      serviceSlug: "odzyskanie-briefu",
      label: "Pomoc z dokumentami",
      text: "Nie zgadzają się numery albo brakuje dokumentu? Pomożemy to uporządkować.",
    },
  },
  {
    slug: "zgubiony-brief-duplikat",
    sortOrder: 30,
    title: "Zgubiony lub skradziony niemiecki brief – jak wyrobić duplikat",
    h1: "Zgubiony lub skradziony niemiecki brief – duplikat",
    summary: "Co robić po utracie dużego briefu i jak krok po kroku wyrobić jego duplikat.",
    description:
      "Co zrobić, gdy zgubisz lub ktoś ukradnie niemiecki brief (Teil II). Jak wyrobić duplikat (Duplikat) i co jest do tego potrzebne. Praktyczny przewodnik krok po kroku.",
    lead: "Utrata dużego briefu (Teil II) blokuje sprzedaż i rejestrację pojazdu, ale nie oznacza, że auto jest „bez dokumentów”. Dokument można odtworzyć — wyjaśniamy, jak działa duplikat (Duplikat) i od czego zacząć.",
    sections: [
      {
        heading: "Co oznacza utrata dużego briefu",
        body: [
          "Brief Teil II to dokument własności i pochodzenia. Jego brak uniemożliwia przerejestrowanie i legalną sprzedaż, dlatego sprawę warto załatwić jak najszybciej — zwłaszcza w przypadku kradzieży, gdzie liczy się też unieważnienie starego dokumentu.",
        ],
      },
      {
        heading: "Jak działa duplikat",
        body: [
          "Duplikat odtwarza dokument na podstawie danych pojazdu zarejestrowanych w Niemczech. Procedurę prowadzi się we właściwym niemieckim urzędzie komunikacyjnym; my robimy to w imieniu klienta, także zdalnie.",
        ],
      },
      {
        heading: "Co przygotować",
        bullets: [
          "numer VIN pojazdu,",
          "wszystkie posiadane dokumenty (mały brief, umowa, stary dowód),",
          "dane dotyczące ostatniej rejestracji w Niemczech (jeśli są),",
          "w przypadku kradzieży — informację o zgłoszeniu.",
        ],
      },
    ],
    faq: [
      {
        q: "Czy duplikat ma taką samą moc jak oryginał?",
        a: "Tak. Wyrobiony zgodnie z procedurą duplikat zastępuje utracony dokument i pozwala normalnie przerejestrować pojazd.",
      },
      {
        q: "Ile trwa wyrobienie duplikatu?",
        a: "Zależy od historii pojazdu i konkretnego urzędu. Realny termin podajemy po sprawdzeniu sprawy na podstawie numeru VIN.",
      },
      {
        q: "Auto ukradziono razem z briefem — co teraz?",
        a: "Trzeba odtworzyć dokument i zadbać o unieważnienie starego. Doradzimy właściwą kolejność działań i przeprowadzimy procedurę.",
      },
    ],
    cta: {
      serviceSlug: "odzyskanie-briefu",
      label: "Wyrób duplikat briefu",
      text: "Zgubiłeś brief? Podaj nam VIN — sprawdzimy, jak szybko odzyskać dokument.",
    },
  },
  {
    slug: "zmiana-dmc-jak-dziala",
    sortOrder: 40,
    title: "Zmiana DMC 2,5t / 3,5t – jak działa zmiana dopuszczalnej masy",
    h1: "Zmiana DMC 2,5t / 3,5t – jak to działa",
    summary: "Na czym polega legalna zmiana dopuszczalnej masy całkowitej i co po niej otrzymujesz.",
    description:
      "Jak działa legalna zmiana DMC pojazdu w Niemczech do 2500 kg lub 3500 kg: ekspertyza, nowa tabliczka znamionowa i nowe Briefy. Co daje obniżenie DMC i kto się kwalifikuje.",
    lead: "Obniżenie DMC (dopuszczalnej masy całkowitej) bywa potrzebne np. po to, by prowadzić pojazd na prawo jazdy kat. B albo dopasować auto do potrzeb transportu. W Niemczech robi się to legalnie — z ekspertyzą techniczną, a nie „przez zmianę cyferek w dokumentach”.",
    sections: [
      {
        heading: "Co oznacza zmiana DMC",
        body: [
          "DMC to maksymalna dopuszczalna masa całkowita pojazdu. Jej zmiana (najczęściej obniżenie do 3500 kg lub 2490 kg) wymaga oceny technicznej w niemieckiej jednostce oraz aktualizacji dokumentów i tabliczki znamionowej.",
        ],
      },
      {
        heading: "Jak wygląda procedura",
        body: [
          "Pojazd przechodzi indywidualną ekspertyzę w niemieckim Instytucie Techniki Samochodowej. Po jej pozytywnym wyniku powstaje nowa tabliczka znamionowa oraz komplet nowych Briefów (Teil I i II) z nowym DMC.",
          "Na podstawie tych dokumentów pojazd można dopuścić do ruchu w Polsce lub innym kraju UE.",
        ],
      },
      {
        heading: "Kto się kwalifikuje",
        body: [
          "Nie każdy pojazd kwalifikuje się do legalnej zmiany DMC — decydują parametry techniczne. Dlatego każdy przypadek oceniamy indywidualnie na podstawie zdjęć i danych pojazdu.",
        ],
      },
    ],
    faq: [
      {
        q: "Czy po obniżeniu DMC do 3500 kg poprowadzę auto na prawo jazdy kat. B?",
        a: "Co do zasady tak — to jeden z głównych powodów obniżania DMC. Ostateczna ocena zależy od konkretnego pojazdu i jest częścią weryfikacji.",
      },
      {
        q: "Czy to legalne?",
        a: "Tak, o ile zmiana jest poparta ekspertyzą niemieckiej jednostki i odzwierciedlona w nowych dokumentach oraz na tabliczce znamionowej. Tylko taką procedurę realizujemy.",
      },
      {
        q: "Co dostaję po zakończeniu?",
        a: "Nową tabliczkę znamionową oraz komplet nowych niemieckich Briefów z nowym DMC, gotowych do rejestracji w UE.",
      },
    ],
    cta: {
      serviceSlug: "zmiana-dmc",
      label: "Usługa zmiany DMC",
      text: "Chcesz obniżyć DMC do 2,5t lub 3,5t? Zobacz szczegóły usługi i sprawdź swój pojazd.",
    },
  },
  {
    slug: "wyrejestrowanie-auta-bez-briefu",
    sortOrder: 50,
    title: "Wyrejestrowanie auta w Niemczech bez briefu – co zrobić",
    h1: "Wyrejestrowanie auta w Niemczech bez briefu",
    summary: "Co zrobić, gdy trzeba uporządkować status pojazdu w Niemczech, a brakuje dokumentów.",
    description:
      "Czy można wyrejestrować auto w Niemczech bez briefu i jak to zrobić. Wyjaśniamy ścieżki postępowania, gdy brakuje dużego briefu (Teil II), oraz rolę duplikatu.",
    lead: "Brak dużego briefu komplikuje formalności, ale zwykle nie blokuje ich całkowicie. Wyjaśniamy, jakie są możliwości, gdy auto trzeba wyrejestrować lub uporządkować jego status w Niemczech bez kompletu dokumentów.",
    sections: [
      {
        heading: "Dlaczego brief bywa potrzebny",
        body: [
          "Dokumenty pojazdu potwierdzają jego tożsamość i status rejestrowy. Przy części formalności urząd oczekuje dużego briefu (Teil II) — gdy go brakuje, najczęściej trzeba najpierw odtworzyć dokumentację.",
        ],
      },
      {
        heading: "Możliwe ścieżki",
        bullets: [
          "wyrobienie duplikatu briefu, a następnie standardowe załatwienie sprawy,",
          "uporządkowanie statusu pojazdu na podstawie danych rejestrowych w Niemczech,",
          "indywidualne rozwiązania w sprawach nietypowych (np. po imporcie, przy rozbieżności danych).",
        ],
      },
      {
        heading: "Od czego zacząć",
        body: [
          "Najlepiej od numeru VIN i opisu sytuacji. Na tej podstawie sprawdzamy status pojazdu w Niemczech i dobieramy najszybszą legalną ścieżkę.",
        ],
      },
    ],
    faq: [
      {
        q: "Czy da się cokolwiek zrobić bez dużego briefu?",
        a: "Tak. W większości przypadków zaczyna się od odtworzenia dokumentacji lub wyrobienia duplikatu, a potem przeprowadza właściwą procedurę.",
      },
      {
        q: "Czy muszę być w Niemczech?",
        a: "Zwykle nie — działamy w imieniu klienta. Zakres potrzebnych formalności ustalamy po weryfikacji sprawy.",
      },
    ],
    cta: {
      serviceSlug: "odzyskanie-briefu",
      label: "Odzyskanie dokumentacji",
      text: "Brakuje dokumentów do załatwienia sprawy? Sprawdź, jak odzyskać niemiecki brief.",
    },
  },
  {
    slug: "koszt-wyrobienia-briefu",
    sortOrder: 60,
    title: "Ile kosztuje wyrobienie lub wymiana niemieckiego briefu?",
    h1: "Ile kosztuje wyrobienie lub wymiana niemieckiego briefu?",
    summary: "Co wpływa na koszt duplikatu lub wymiany briefu i jak dostać konkretną wycenę.",
    description:
      "Od czego zależy koszt wyrobienia, duplikatu lub wymiany niemieckiego briefu. Co wpływa na cenę i dlaczego wycena jest indywidualna. Jak otrzymać konkretną wycenę.",
    lead: "Koszt zależy od rodzaju sprawy i stanu dokumentacji, dlatego nie ma jednej „ceny z cennika”. Wyjaśniamy, co wpływa na wycenę i jak szybko otrzymać konkretną kwotę dla swojego pojazdu.",
    sections: [
      {
        heading: "Co wpływa na koszt",
        bullets: [
          "rodzaj sprawy (duplikat, odtworzenie dokumentacji, wymiana po zmianach),",
          "stan i kompletność posiadanych dokumentów,",
          "historia rejestracji pojazdu w Niemczech,",
          "ewentualne dodatkowe procedury (np. ekspertyza techniczna).",
        ],
      },
      {
        heading: "Dlaczego wycena jest indywidualna",
        body: [
          "Każdy pojazd ma inną historię, a część spraw wymaga dodatkowych czynności. Dlatego wycenę przygotowujemy po krótkiej weryfikacji — dzięki temu kwota jest realna, bez ukrytych kosztów.",
        ],
      },
      {
        heading: "Jak otrzymać wycenę",
        body: [
          "Wyślij nam numer VIN i opis sytuacji (czego brakuje, co chcesz osiągnąć). Wstępną informację i orientacyjny zakres kosztów przedstawiamy po sprawdzeniu sprawy.",
        ],
      },
    ],
    faq: [
      {
        q: "Czy podajecie ceny z góry?",
        a: "Podajemy konkretną wycenę po weryfikacji, bo koszt zależy od rodzaju sprawy i stanu dokumentów. Wstępną informację możesz dostać szybko, podając VIN.",
      },
      {
        q: "Czy wycena jest płatna?",
        a: "Wstępna weryfikacja sprawy i orientacyjny zakres są bezpłatne i niezobowiązujące.",
      },
    ],
    cta: {
      serviceSlug: "odzyskanie-briefu",
      label: "Poproś o wycenę",
      text: "Chcesz poznać koszt dla swojego auta? Podaj VIN — przygotujemy wycenę.",
    },
  },
];

function toEntry(g: GuideSource): GuideEntry {
  return {
    slug: g.slug,
    sortOrder: g.sortOrder,
    translations: {
      pl: {
        title: g.h1,
        seoTitle: g.title,
        seoDescription: g.description,
        excerpt: g.summary,
        markdown: sectionsToMarkdown(g.lead, g.sections),
        faq: g.faq,
        cta: g.cta,
      },
    },
  };
}

/** The committed (seed/fallback) guides. */
export const GUIDES: GuideEntry[] = SOURCES.map(toEntry);
