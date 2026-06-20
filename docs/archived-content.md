# Archived seed content — services & guides

These were the committed **Polish mockup bodies** that the static build used as
a fallback when the database was unreachable. The live content now lives in
Postgres (`service_translations` / `guide_translations`) and is edited in the
admin; `zmiana-dmc` is still generated from `translations.ts`.

Kept here verbatim (the original `src/content/*.ts`) so it can be re-seeded or
re-authored later. To restore: recreate the files and re-add the
`content-source` fallback imports.

## src/content/services.ts

```ts
import type { ServiceEntry, Faq } from "./types";
import { sectionsToMarkdown, type Section } from "./_build";

/**
 * Dedicated, indexable service pages. Authored in Polish; `zmiana-dmc` (the
 * featured service) is assembled separately from `translations.ts` so it keeps
 * all 10 languages — see `./zmiana-dmc.ts`.
 */

interface ServiceSource {
  slug: string;
  sortOrder: number;
  relatedGuides: string[];
  /** Polish (authored base) content. */
  name: string;
  h1: string;
  seoTitle: string;
  summary: string;
  seoDescription: string;
  lead: string;
  sections: Section[];
  /** "What you get" — folded into the Markdown body. */
  highlights: string[];
  faq: Faq[];
}

const SOURCES: ServiceSource[] = [
  {
    slug: "modyfikacje-konstrukcyjne",
    sortOrder: 10,
    relatedGuides: ["co-to-jest-niemiecki-brief", "jak-czytac-niemiecki-brief", "zmiana-dmc-jak-dziala"],
    name: "Legalizacja zmian konstrukcyjnych",
    h1: "Legalizacja zmian konstrukcyjnych pojazdu w Niemczech",
    seoTitle: "Legalizacja zmian konstrukcyjnych pojazdu w Niemczech | BriefService",
    summary:
      "Wpisanie zmian technicznych do dokumentów i wydanie nowego niemieckiego briefu — legalnie, z ekspertyzą.",
    seoDescription:
      "Legalizujemy modyfikacje konstrukcyjne pojazdu w Niemczech: zawieszenie, ogumienie, liczba miejsc, zabudowa. Pełna dokumentacja techniczna i nowy niemiecki brief (Teil I i II).",
    lead: "Zmieniłeś coś w pojeździe, a zmiana nie jest ujęta w dokumentach? Pomożemy ją zalegalizować w Niemczech — z pełną ekspertyzą techniczną i nowym kompletem niemieckich Briefów (Zulassungsbescheinigung Teil I i Teil II), które są honorowane w całej Unii Europejskiej.",
    sections: [
      {
        heading: "Na czym polega usługa",
        body: [
          "Każda istotna modyfikacja konstrukcyjna pojazdu powinna zostać oceniona przez uprawnioną jednostkę i odzwierciedlona w dokumentach. W Niemczech ocenę przeprowadza Instytut Techniki Samochodowej (np. TÜV / DEKRA), który wydaje ekspertyzę potwierdzającą, że pojazd po zmianach pozostaje bezpieczny i zgodny z przepisami.",
          "Na podstawie ekspertyzy przygotowujemy komplet dokumentacji oraz nowy niemiecki brief z naniesionymi zmianami. Dzięki temu zmiana jest udokumentowana u źródła i nie sprawia problemów przy późniejszej rejestracji lub badaniu technicznym.",
        ],
      },
      {
        heading: "Jakie zmiany legalizujemy",
        bullets: [
          "zmiana zawieszenia, rozmiaru kół i ogumienia,",
          "zmiana liczby miejsc siedzących,",
          "zabudowy i adaptacje (np. pojazd kempingowy, warsztat, transport specjalny),",
          "zmiany w nadwoziu i punktach mocowania,",
          "inne modyfikacje wymagające wpisu do dokumentów.",
        ],
      },
      {
        heading: "Jak przebiega procedura",
        body: [
          "Zaczynamy od bezpłatnej weryfikacji — na podstawie zdjęć i opisu oceniamy, czy dana zmiana kwalifikuje się do legalizacji. Następnie przygotowujemy pojazd i przedstawiamy go do oceny w niemieckiej placówce technicznej.",
          "Cały proces prowadzimy w Niemczech — nie musisz tam jechać. Po zakończeniu otrzymujesz komplet dokumentów gotowy do przerejestrowania pojazdu w Polsce lub innym kraju UE.",
        ],
      },
    ],
    highlights: [
      "ekspertyza techniczna niemieckiej jednostki",
      "nowy komplet niemieckich Briefów (Teil I i II) z naniesionymi zmianami",
      "dokumentacja ważna w całej Unii Europejskiej",
      "obsługa zdalna — bez wyjazdu do Niemiec",
    ],
    faq: [
      {
        q: "Czy każdą modyfikację da się zalegalizować?",
        a: "Nie. Legalizacja jest możliwa tylko wtedy, gdy zmiana spełnia wymogi techniczne i da się ją potwierdzić ekspertyzą. Każdy przypadek oceniamy indywidualnie na podstawie zdjęć i danych pojazdu.",
      },
      {
        q: "Czy muszę jechać z autem do Niemiec?",
        a: "Nie zawsze. W wielu przypadkach proces prowadzimy w Twoim imieniu w Niemczech. Zakres niezbędnych czynności ustalamy po weryfikacji pojazdu.",
      },
      {
        q: "Czy dokumenty będą uznane w Polsce?",
        a: "Tak. Niemieckie Briefy (Zulassungsbescheinigung Teil I i Teil II) wraz z dokumentacją techniczną są honorowane w całej UE, w tym przy rejestracji w Polsce.",
      },
    ],
  },
  {
    slug: "zmiana-rodzaju-pojazdu",
    sortOrder: 20,
    relatedGuides: ["zmiana-dmc-jak-dziala", "co-to-jest-niemiecki-brief"],
    name: "Zmiana rodzaju pojazdu",
    h1: "Zmiana rodzaju pojazdu w Niemczech",
    seoTitle: "Zmiana rodzaju pojazdu w Niemczech (ciężarowy ↔ osobowy) | BriefService",
    summary:
      "Zmiana klasyfikacji pojazdu (np. ciężarowy na osobowy) z pełną procedurą techniczną i nowymi dokumentami.",
    seoDescription:
      "Zmiana rodzaju / przeznaczenia pojazdu w Niemczech — np. z ciężarowego na osobowy lub specjalny. Ekspertyza, nowa tabliczka znamionowa i nowy niemiecki brief.",
    lead: "Potrzebujesz zmienić rodzaj lub przeznaczenie pojazdu — na przykład z ciężarowego na osobowy albo specjalny? Przeprowadzamy tę procedurę w Niemczech, łącznie z ekspertyzą techniczną i wydaniem nowych niemieckich Briefów z poprawioną klasyfikacją.",
    sections: [
      {
        heading: "Na czym polega usługa",
        body: [
          "Rodzaj pojazdu (np. samochód ciężarowy, osobowy, specjalny) wynika z jego parametrów technicznych i jest zapisany w dokumentach. Jego zmiana wymaga oceny technicznej oraz aktualizacji wpisów w niemieckim brief'ie.",
          "Realizujemy całą procedurę w niemieckiej jednostce technicznej: od weryfikacji, przez niezbędne czynności, po wydanie kompletu nowych Briefów (Teil I i II) i — gdy to konieczne — nowej tabliczki znamionowej.",
        ],
      },
      {
        heading: "Typowe przypadki",
        bullets: [
          "zmiana z pojazdu ciężarowego na osobowy (kat. B),",
          "zmiana przeznaczenia na pojazd specjalny (np. kempingowy),",
          "porządkowanie błędnej lub nieaktualnej klasyfikacji w dokumentach,",
          "zmiana rodzaju powiązana z obniżeniem DMC.",
        ],
      },
      {
        heading: "Co otrzymujesz po zakończeniu",
        body: [
          "Po zakończeniu procedury dostajesz komplet nowych niemieckich Briefów z poprawnym rodzajem pojazdu oraz pełną dokumentację techniczną. Na ich podstawie zarejestrujesz pojazd w Polsce lub innym kraju UE bez dodatkowych komplikacji.",
        ],
      },
    ],
    highlights: [
      "ocena techniczna i ekspertyza niemieckiej jednostki",
      "nowy komplet Briefów z poprawnym rodzajem pojazdu",
      "w razie potrzeby nowa tabliczka znamionowa",
      "obsługa od A do Z, zdalnie",
    ],
    faq: [
      {
        q: "Czy zmiana rodzaju pojazdu wpływa na kategorię prawa jazdy?",
        a: "Może wpływać — np. zmiana powiązana z obniżeniem DMC do 3500 kg pozwala prowadzić pojazd na prawo jazdy kat. B. Szczegóły zależą od konkretnego pojazdu; oceniamy je przy weryfikacji.",
      },
      {
        q: "Czy każdy pojazd można przeklasyfikować?",
        a: "Nie. Zmiana musi być uzasadniona technicznie i możliwa do potwierdzenia ekspertyzą. Dlatego każdy przypadek analizujemy indywidualnie.",
      },
      {
        q: "Jak długo trwa procedura?",
        a: "Czas zależy od zakresu zmian i dostępności terminów w niemieckiej jednostce. Realny termin podajemy po weryfikacji pojazdu.",
      },
    ],
  },
  {
    slug: "odzyskanie-briefu",
    sortOrder: 30,
    relatedGuides: [
      "co-to-jest-niemiecki-brief",
      "jak-czytac-niemiecki-brief",
      "zgubiony-brief-duplikat",
      "wyrejestrowanie-auta-bez-briefu",
      "koszt-wyrobienia-briefu",
    ],
    name: "Odzyskanie i duplikat briefu",
    h1: "Odzyskanie i duplikat niemieckiego briefu",
    seoTitle: "Odzyskanie i duplikat niemieckiego briefu (Teil I i II) | BriefService",
    summary:
      "Wyrobienie duplikatu lub odtworzenie brakującej niemieckiej dokumentacji pojazdu — również w trudnych przypadkach.",
    seoDescription:
      "Zgubiony, zniszczony lub zatrzymany niemiecki brief? Pomagamy odzyskać dokumentację i wyrobić duplikat Zulassungsbescheinigung Teil I i Teil II — także w sprawach trudnych.",
    lead: "Brak briefu zwykle blokuje rejestrację i sprzedaż pojazdu. Pomagamy odzyskać brakującą niemiecką dokumentację oraz wyrobić duplikat briefu (Zulassungsbescheinigung Teil I i Teil II) — specjalizujemy się w sprawach trudnych i nietypowych.",
    sections: [
      {
        heading: "Kiedy potrzebny jest duplikat",
        body: [
          "Najczęściej wtedy, gdy duży brief (Teil II) zaginął, został zniszczony lub nie został przekazany przy zakupie pojazdu. Bez niego nie da się przerejestrować ani legalnie sprzedać auta.",
          "Duplikat odtwarza dokument na podstawie danych pojazdu zarejestrowanych w Niemczech. Procedurę prowadzimy w odpowiednim niemieckim urzędzie komunikacyjnym, działając w Twoim imieniu.",
        ],
      },
      {
        heading: "Co obejmuje usługa",
        bullets: [
          "ustalenie historii i danych rejestrowych pojazdu w Niemczech,",
          "wyrobienie duplikatu briefu (Teil II) lub odtworzenie Teil I,",
          "obsługę spraw trudnych: braki w historii, rozbieżności danych, starsze pojazdy,",
          "kompletowanie dokumentów potrzebnych do rejestracji w kraju docelowym.",
        ],
      },
      {
        heading: "Jak zaczynamy",
        body: [
          "Przyślij nam numer VIN oraz wszystkie dokumenty, które masz (np. mały brief, umowę, stary dowód). Na tej podstawie sprawdzamy, czy i w jaki sposób można odzyskać dokumentację, i przedstawiamy plan działania.",
          "Pomocne mogą być też nasze poradniki: [guide:zgubiony-brief-duplikat] oraz [guide:wyrejestrowanie-auta-bez-briefu].",
        ],
      },
    ],
    highlights: [
      "duplikat niemieckiego briefu (Teil I i/lub Teil II)",
      "obsługa spraw trudnych i nietypowych",
      "działanie w Twoim imieniu w niemieckich urzędach",
      "komplet dokumentów gotowy do rejestracji",
    ],
    faq: [
      {
        q: "Czy da się wyrobić duplikat bez dużego briefu?",
        a: "Często tak. Duplikat odtwarza się na podstawie danych pojazdu w Niemczech, dlatego brak oryginału Teil II nie przekreśla sprawy. Możliwości oceniamy po podaniu numeru VIN.",
      },
      {
        q: "Czego potrzebujecie, żeby zacząć?",
        a: "Numeru VIN i dokumentów, które posiadasz. Im więcej informacji, tym szybciej ustalimy ścieżkę postępowania.",
      },
      {
        q: "Czy pomagacie przy wyrejestrowaniu auta bez briefu?",
        a: "Tak. Jeśli brief zaginął, doradzimy najlepszą ścieżkę — od duplikatu po wyrejestrowanie auta w Niemczech bez briefu.",
      },
    ],
  },
];

function toEntry(s: ServiceSource): ServiceEntry {
  const markdown = sectionsToMarkdown(s.lead, [
    ...s.sections,
    { heading: "Co otrzymujesz", bullets: s.highlights },
  ]);
  return {
    slug: s.slug,
    featured: false,
    sortOrder: s.sortOrder,
    relatedGuides: s.relatedGuides,
    translations: {
      pl: {
        title: s.name,
        h1: s.h1,
        seoTitle: s.seoTitle,
        seoDescription: s.seoDescription,
        excerpt: s.summary,
        markdown,
        faq: s.faq,
      },
    },
  };
}

/** The committed (seed/fallback) service pages, excluding the featured DMC one. */
export const SERVICE_PAGES: ServiceEntry[] = SOURCES.map(toEntry);

```

## src/content/guides.ts

```ts
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

```
