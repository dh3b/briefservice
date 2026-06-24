# Archived seed content - services & guides

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
 * all 10 languages - see `./zmiana-dmc.ts`.
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
  /** "What you get" - folded into the Markdown body. */
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
      "Wpisanie zmian technicznych do dokumentów i wydanie nowego niemieckiego briefu - legalnie, z ekspertyzą.",
    seoDescription:
      "Legalizujemy modyfikacje konstrukcyjne pojazdu w Niemczech: zawieszenie, ogumienie, liczba miejsc, zabudowa. Pełna dokumentacja techniczna i nowy niemiecki brief (Teil I i II).",
    lead: "Zmieniłeś coś w pojeździe, a zmiana nie jest ujęta w dokumentach? Pomożemy ją zalegalizować w Niemczech - z pełną ekspertyzą techniczną i nowym kompletem niemieckich Briefów (Zulassungsbescheinigung Teil I i Teil II), które są honorowane w całej Unii Europejskiej.",
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
          "Zaczynamy od bezpłatnej weryfikacji - na podstawie zdjęć i opisu oceniamy, czy dana zmiana kwalifikuje się do legalizacji. Następnie przygotowujemy pojazd i przedstawiamy go do oceny w niemieckiej placówce technicznej.",
          "Cały proces prowadzimy w Niemczech - nie musisz tam jechać. Po zakończeniu otrzymujesz komplet dokumentów gotowy do przerejestrowania pojazdu w Polsce lub innym kraju UE.",
        ],
      },
    ],
    highlights: [
      "ekspertyza techniczna niemieckiej jednostki",
      "nowy komplet niemieckich Briefów (Teil I i II) z naniesionymi zmianami",
      "dokumentacja ważna w całej Unii Europejskiej",
      "obsługa zdalna - bez wyjazdu do Niemiec",
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
      "Zmiana rodzaju / przeznaczenia pojazdu w Niemczech - np. z ciężarowego na osobowy lub specjalny. Ekspertyza, nowa tabliczka znamionowa i nowy niemiecki brief.",
    lead: "Potrzebujesz zmienić rodzaj lub przeznaczenie pojazdu - na przykład z ciężarowego na osobowy albo specjalny? Przeprowadzamy tę procedurę w Niemczech, łącznie z ekspertyzą techniczną i wydaniem nowych niemieckich Briefów z poprawioną klasyfikacją.",
    sections: [
      {
        heading: "Na czym polega usługa",
        body: [
          "Rodzaj pojazdu (np. samochód ciężarowy, osobowy, specjalny) wynika z jego parametrów technicznych i jest zapisany w dokumentach. Jego zmiana wymaga oceny technicznej oraz aktualizacji wpisów w niemieckim brief'ie.",
          "Realizujemy całą procedurę w niemieckiej jednostce technicznej: od weryfikacji, przez niezbędne czynności, po wydanie kompletu nowych Briefów (Teil I i II) i - gdy to konieczne - nowej tabliczki znamionowej.",
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
        a: "Może wpływać - np. zmiana powiązana z obniżeniem DMC do 3500 kg pozwala prowadzić pojazd na prawo jazdy kat. B. Szczegóły zależą od konkretnego pojazdu; oceniamy je przy weryfikacji.",
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
      "Wyrobienie duplikatu lub odtworzenie brakującej niemieckiej dokumentacji pojazdu - również w trudnych przypadkach.",
    seoDescription:
      "Zgubiony, zniszczony lub zatrzymany niemiecki brief? Pomagamy odzyskać dokumentację i wyrobić duplikat Zulassungsbescheinigung Teil I i Teil II - także w sprawach trudnych.",
    lead: "Brak briefu zwykle blokuje rejestrację i sprzedaż pojazdu. Pomagamy odzyskać brakującą niemiecką dokumentację oraz wyrobić duplikat briefu (Zulassungsbescheinigung Teil I i Teil II) - specjalizujemy się w sprawach trudnych i nietypowych.",
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
        a: "Tak. Jeśli brief zaginął, doradzimy najlepszą ścieżkę - od duplikatu po wyrejestrowanie auta w Niemczech bez briefu.",
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
          "Duży brief to dokument własności i „dowód pochodzenia” pojazdu. Nie wozi się go w aucie - przechowuje się go w bezpiecznym miejscu. To właśnie Teil II jest niezbędny do sprzedaży i przerejestrowania pojazdu.",
          "Starsze pojazdy mogą mieć dokumenty w poprzednim formacie (Fahrzeugbrief i Fahrzeugschein), ale ich rola jest analogiczna.",
        ],
      },
      {
        heading: "Dlaczego to ważne przy imporcie",
        body: [
          "Przy sprowadzaniu auta z Niemiec to duży brief (Teil II) decyduje o możliwości rejestracji w Polsce. Jego brak jest najczęstszą przyczyną problemów - dlatego zawsze upewnij się, że sprzedający przekazuje komplet dokumentów.",
          "Warto też wiedzieć, gdzie szukać numerów w dokumencie - zobacz: [guide:jak-czytac-niemiecki-brief].",
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
          "Duży brief (Teil II) ma własny numer dokumentu - to on bywa nazywany „numerem karty pojazdu”. Jest istotny m.in. przy weryfikacji autentyczności i przy wyrabianiu duplikatu.",
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
        a: "Tak. VIN na pojeździe musi być zgodny z dokumentami. Rozbieżności trzeba wyjaśnić przed rejestracją - w takich sprawach również pomagamy.",
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
    lead: "Utrata dużego briefu (Teil II) blokuje sprzedaż i rejestrację pojazdu, ale nie oznacza, że auto jest „bez dokumentów”. Dokument można odtworzyć - wyjaśniamy, jak działa duplikat (Duplikat) i od czego zacząć.",
    sections: [
      {
        heading: "Co oznacza utrata dużego briefu",
        body: [
          "Brief Teil II to dokument własności i pochodzenia. Jego brak uniemożliwia przerejestrowanie i legalną sprzedaż, dlatego sprawę warto załatwić jak najszybciej - zwłaszcza w przypadku kradzieży, gdzie liczy się też unieważnienie starego dokumentu.",
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
          "w przypadku kradzieży - informację o zgłoszeniu.",
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
        q: "Auto ukradziono razem z briefem - co teraz?",
        a: "Trzeba odtworzyć dokument i zadbać o unieważnienie starego. Doradzimy właściwą kolejność działań i przeprowadzimy procedurę.",
      },
    ],
    cta: {
      serviceSlug: "odzyskanie-briefu",
      label: "Wyrób duplikat briefu",
      text: "Zgubiłeś brief? Podaj nam VIN - sprawdzimy, jak szybko odzyskać dokument.",
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
    lead: "Obniżenie DMC (dopuszczalnej masy całkowitej) bywa potrzebne np. po to, by prowadzić pojazd na prawo jazdy kat. B albo dopasować auto do potrzeb transportu. W Niemczech robi się to legalnie - z ekspertyzą techniczną, a nie „przez zmianę cyferek w dokumentach”.",
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
          "Nie każdy pojazd kwalifikuje się do legalnej zmiany DMC - decydują parametry techniczne. Dlatego każdy przypadek oceniamy indywidualnie na podstawie zdjęć i danych pojazdu.",
        ],
      },
    ],
    faq: [
      {
        q: "Czy po obniżeniu DMC do 3500 kg poprowadzę auto na prawo jazdy kat. B?",
        a: "Co do zasady tak - to jeden z głównych powodów obniżania DMC. Ostateczna ocena zależy od konkretnego pojazdu i jest częścią weryfikacji.",
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
          "Dokumenty pojazdu potwierdzają jego tożsamość i status rejestrowy. Przy części formalności urząd oczekuje dużego briefu (Teil II) - gdy go brakuje, najczęściej trzeba najpierw odtworzyć dokumentację.",
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
        a: "Zwykle nie - działamy w imieniu klienta. Zakres potrzebnych formalności ustalamy po weryfikacji sprawy.",
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
          "Każdy pojazd ma inną historię, a część spraw wymaga dodatkowych czynności. Dlatego wycenę przygotowujemy po krótkiej weryfikacji - dzięki temu kwota jest realna, bez ukrytych kosztów.",
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
      text: "Chcesz poznać koszt dla swojego auta? Podaj VIN - przygotujemy wycenę.",
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

## src/content/zmiana-dmc.ts (generator - zmiana-dmc is now DB-only)

```ts
/**
 * The DMC/GVW-change service. It used to be a hardcoded page; it is now a
 * regular (featured) service. Its content already exists in `translations.ts`
 * for all 10 languages, so we assemble its per-language Markdown from there -
 * keeping every locale that the old `/[lang]/zmiana-dmc` page served.
 */
import { translations } from "@/i18n/translations";
import { SUPPORTED_LANGUAGES, type Language } from "@/seo/site";
import type { ServiceEntry, Translation, Translations } from "./types";

type ZmianaDmc = (typeof translations)[Language]["zmianaDmc"];

function buildMarkdown(d: ZmianaDmc): string {
  const parts: string[] = [];
  const push = (s?: string) => {
    if (s && s.trim()) parts.push(s.trim());
  };
  const paras = (items?: string[]) => {
    for (const x of items ?? []) push(x);
  };
  const bullets = (items?: string[]) => {
    const xs = (items ?? []).filter((x) => x && x.trim());
    if (xs.length) parts.push(xs.map((x) => `- ${x.trim()}`).join("\n"));
  };

  push(d.intro?.subtitle);

  const s = d.service2500;
  if (s?.title) {
    parts.push(`## ${s.title.trim()}`);
    push(s.subtitle);
    paras(s.lead);
    if (s.scopeTitle) parts.push(`### ${s.scopeTitle.trim()}`);
    paras(s.scopeText);
    if (s.scopeNote?.trim()) push(`**${s.scopeNote.trim()}**`);
    if (s.getTitle) parts.push(`### ${s.getTitle.trim()}`);
    bullets(s.getList);
    if (s.verifyTitle) parts.push(`### ${s.verifyTitle.trim()}`);
    push(s.verifyText);
    push(s.verifyPhotos);
  }

  const s2 = d.service3500;
  if (s2?.title) {
    parts.push(`## ${s2.title.trim()}`);
    push(s2.subtitle);
    paras(s2.lead);
    if (s2.scopeTitle) parts.push(`### ${s2.scopeTitle.trim()}`);
    paras(s2.scopeText);
    if (s2.scopeNote?.trim()) push(`**${s2.scopeNote.trim()}**`);
  }

  const h = d.howItWorks;
  if (h?.title) {
    parts.push(`## ${h.title.trim()}`);
    const steps: [string, string][] = [
      [h.step1, h.step1Desc],
      [h.step2, h.step2Desc],
      [h.step3, h.step3Desc],
      [h.step4, h.step4Desc],
    ];
    const lines = steps
      .filter(([t]) => t && t.trim())
      .map(([t, desc]) => `1. **${t.trim()}** - ${(desc ?? "").trim()}`.replace(/ - $/, ""));
    if (lines.length) parts.push(lines.join("\n"));
  }

  const n = d.note;
  if (n?.description?.trim()) {
    if (n.title?.trim()) parts.push(`## ${n.title.trim()}`);
    push(n.description);
  }

  return parts.join("\n\n");
}

function buildTranslations(): Translations {
  const out: Translations = {};
  for (const lang of SUPPORTED_LANGUAGES) {
    const d = translations[lang].zmianaDmc;
    const fc = translations[lang].services.featured_card;
    const h1 = d?.intro?.title?.trim();
    if (!h1) continue;
    const t: Translation = {
      title: fc?.title?.trim() || h1,
      h1,
      seoTitle: d.seo?.title?.trim() || h1,
      seoDescription: d.seo?.description?.trim() || fc?.description?.trim() || "",
      excerpt: fc?.description?.trim() || d.seo?.description?.trim() || "",
      markdown: buildMarkdown(d),
    };
    out[lang] = t;
  }
  return out;
}

/** The featured DMC-change service, available in every authored language. */
export const ZMIANA_DMC_SERVICE: ServiceEntry = {
  slug: "zmiana-dmc",
  featured: true,
  sortOrder: 0,
  relatedGuides: ["zmiana-dmc-jak-dziala"],
  translations: buildTranslations(),
};

```


## translations.ts - removed zmianaDmc blocks

```ts
// base shape
  zmianaDmc: {
    seo: { title: "", description: "", keywords: "" },
    nav: { home: "", services: "", contact: "" },
    intro: { title: "", subtitle: "" },
    service2500: {
      tag: "", title: "", subtitle: "",
      lead: [""] as string[],
      scopeTitle: "",
      scopeText: ["", "", ""] as string[],
      scopeNote: "",
      getTitle: "",
      getList: [""] as string[],
      verifyTitle: "", verifyText: "", verifyPhotos: "",
    },
    service3500: {
      tag: "", title: "", subtitle: "",
      lead: ["", "", ""] as string[],
      scopeTitle: "",
      scopeText: ["", "", ""] as string[],
      scopeNote: "",
    },
    howItWorks: { title: "", step1: "", step1Desc: "", step2: "", step2Desc: "", step3: "", step3Desc: "", step4: "", step4Desc: "" },
    note: { title: "", description: "" },
    contact: { title: "", subtitle: "", callLabel: "", writeLabel: "" },
  },

// locale 1
  zmianaDmc: {
    seo: {
      title: "Zmiana DMC pojazdu - obniżenie do 2500 kg lub 3500 kg",
      description: "Profesjonalna zmiana DMC pojazdów w Niemczech - obniżenie dopuszczalnej masy całkowitej do 3500 kg lub 2500 kg. Pełna obsługa, niemiecka dokumentacja, ważna w całej UE.",
      keywords: "zmiana DMC do 2500 kg, obniżenie DMC do 2500 kg, DMC 2500 kg, zmiana dopuszczalnej masy całkowitej 2500 kg, obniżenie masy całkowitej pojazdu do 2,5 t, zmiana DMC busa do 2500 kg, obniżenie DMC samochodu do 2500 kg, jak obniżyć DMC do 2500 kg, zmiana DMC pojazdu ciężarowego na 2500 kg, DMC 2500 kg a prawo jazdy, czy można zmniejszyć DMC do 2500 kg, przerobienie auta na 2500 kg, zmiana DMC w Niemczech 2500 kg, obniżenie DMC przed rejestracją w Polsce, zmiana DMC samochodu z Niemiec 2500 kg, jak uniknąć DMC powyżej 3,5 t, DMC 2500 kg a koszty, zmiana DMC a podatek, czy można jeździć na kat B po zmianie DMC, obniżenie DMC a rejestracja w Polsce",
    },
    nav: { home: "Strona główna", services: "Usługi", contact: "Kontakt" },
    intro: {
      title: "Zmiana DMC (dopuszczalna masa całkowita) do 2500kg (2490kg) oraz 3500kg",
      subtitle: "Legalnie - w Niemczech - z pełną procedurą techniczną! Prowadzimy Cię przez cały proces krok po kroku: od weryfikacji pojazdu, przez procedury wykonywane przez niemieckie placówki techniczne, przygotowujące kompletną dokumentację techniczną, w wyniku czego otrzymasz nową tabliczkę znamionową, oraz komplet nowych niemieckich Briefów cz. I i cz. II ze zmienionym DMC. Na ich podstawie pojazd może zostać następnie dopuszczony do ruchu w Polsce lub w każdym innym kraju UE.",
    },
    service2500: {
      tag: "Dopuszczalna masa całkowita",
      title: "Zmiana DMC w dół do 2500kg (2490kg)",
      subtitle: "Legalnie - w Niemczech - nowe Briefy - nowa tabliczka znamionowa - pełna procedura techniczna!",
      lead: ["dla transportu międzynarodowego lekkiego / pilnego"],
      scopeTitle: "Na czym polega usługa",
      scopeText: [
        "Zmiana DMC do 2490kg w Niemczech to nie jest „papier i zmiana cyferek”!",
        "Czynności realizowane są przez niemiecki Instytut Techniki Samochodowej, z pełną dokumentacją techniczną potwierdzającą przeprowadzone zmiany parametrów pojazdu.",
        "W wyniku przeprowadzonej procedury otrzymasz nową tabliczkę znamionową oraz komplet nowych niemieckich Briefów potwierdzających nowe DMC pojazdu. Na ich podstawie pojazd może zostać następnie dopuszczony do ruchu w Polsce lub w każdym innym kraju UE.",
      ],
      scopeNote: "Nie każdy samochód kwalifikuje się do legalnej zmiany DMC!",
      getTitle: "Co otrzymujesz",
      getList: [
        "komplet niemieckich Briefów (cz. I i cz. II) wraz z nową tabliczką znamionową - DMC 2490kg",
      ],
      verifyTitle: "Weryfikacja pojazdu",
      verifyText: "Usługa dostępna wyłącznie dla pojazdów, które technicznie się do tego kwalifikują (każdy przypadek rozpatrywany indywidualnie)!",
      verifyPhotos: "Przygotuj zdjęcia pojazdu: przód po skosie, tył po skosie, kabina kierowcy, licznik kilometrów, przedział bagażowy, tabliczka znamionowa.",
    },
    service3500: {
      tag: "Dopuszczalna masa całkowita",
      title: "Zmiana DMC w dół do 3500kg",
      subtitle: "Legalnie - w Niemczech - nowe Briefy - nowa tabliczka znamionowa - pełna procedura techniczna.",
      lead: [
        "Usługa przeznaczona dla pojazdów zakupionych na terenie całej Unii Europejskiej, przed ich wprowadzeniem do kraju!",
        "Prowadzimy Cię przez cały proces krok po kroku - od weryfikacji pojazdu, przez procedury wykonywane przez niemieckie placówki techniczne, aż do przygotowania kompletnej dokumentacji technicznej.",
        "W wyniku przeprowadzonej procedury otrzymasz nową tabliczkę znamionową oraz komplet nowych niemieckich Briefów ze zmienionym DMC 3500kg.",
      ],
      scopeTitle: "Na czym polega usługa",
      scopeText: [
        "Obniżenie DMC np. z 5000kg do 3500kg (kat. N1, prawo jazdy kat. B) dla samochodów zakupionych na obszarze całej Unii Europejskiej i jeszcze niedopuszczonych do ruchu w Polsce!",
        "Zmiana DMC do 3500kg polega na kompleksowym przygotowaniu pojazdu, a następnie przedstawieniu go do oceny przez niemiecki Instytut Techniki Samochodowej, który wykonuje indywidualną ekspertyzę techniczną oraz przygotowuje dokumentację potwierdzającą przeprowadzone zmiany parametrów pojazdu.",
        "W wyniku przeprowadzonej procedury właściciel otrzyma komplet nowych niemieckich Briefów (DMC 3500kg) wraz z nową tabliczką znamionową.",
      ],
      scopeNote: "Nie każdy pojazd kwalifikuje się do legalnej zmiany DMC - każdy przypadek analizowany jest indywidualnie!",
    },
    howItWorks: {
      title: "Jak wygląda współpraca?",
      step1: "Kontakt", step1Desc: "Dzwonisz lub piszesz - omawiamy Twój pojazd icelobniżenia DMC.",
      step2: "Weryfikacja", step2Desc: "Sprawdzamy, czy pojazd technicznie kwalifikuje się do zmianyDMC.",
      step3: "Realizacja", step3Desc: "Przeprowadzamy cały proces wNiemczech - Ty nie musisz tam jechać.",
      step4: "Odbiór", step4Desc: "Dostajesz pojazd z nową dokumentacją, gotowy do przerejestrowania.",
    },
    note: { title: "", description: "Oferta obniżenia DMC do 2500 kg jest szczególnie korzystna od 1lipca 2026r. - dla firm, które potrzebują elastyczności w transporcie międzynarodowym. Każdy przypadek jest indywidualnie weryfikowany pod kątem kwalifikacji technicznejpojazdu." },
    contact: { title: "Porozmawiajmy o Twoim pojeździe", subtitle: "Bezpłatna konsultacja - odpowiemy na każde pytanie dotyczące zmiany DMC.", callLabel: "Zadzwoń", writeLabel: "Napisz" },
  },

// locale 2
  zmianaDmc: {
    seo: {
      title: "GVW Change - Reduction to 2500 kg or 3500 kg",
      description: "Professional GVW change for vehicles in Germany - reduce permissible gross weight to 3500 kg or 2500 kg. Full service, German documentation, valid throughout the EU.",
      keywords: "GVW change to 2500 kg, reduce GVW to 2500 kg, GVW 2500 kg, reduce permissible gross weight to 2500 kg, reduce vehicle gross weight to 2.5 t, change van GVW to 2500 kg, reduce car GVW to 2500 kg, how to reduce GVW to 2500 kg, change truck GVW to 2500 kg, GVW 2500 kg and drivers license, can you reduce GVW to 2500 kg, convert car to 2500 kg, GVW change Germany 2500 kg, reduce GVW before Poland registration, change GVW car from Germany 2500 kg, how to avoid GVW over 3.5 t, GVW 2500 kg and costs, GVW change and tax, can you drive category B after GVW change, reduce GVW and registration in Poland",
    },
    nav: { home: "Home", services: "Services", contact: "Contact" },
    intro: {
      title: "GVW change (gross vehicle weight) to 2500kg (2490kg) and 3500kg",
      subtitle: "Legally - in Germany - with a full technical procedure! We guide you through the entire process step by step: from vehicle verification, through procedures carried out by German technical facilities, preparing complete technical documentation, as a result of which you will receive a new type plate and a complete set of new German Briefs (Teil I and Teil II) with the changed GVW. On their basis the vehicle can then be admitted to road traffic in Poland or in any other EU country.",
    },
    service2500: {
      tag: "Gross vehicle weight",
      title: "GVW reduction to 2500kg (2490kg)",
      subtitle: "Legally - in Germany - new Briefs - new type plate - full technical procedure!",
      lead: ["for light / urgent international transport"],
      scopeTitle: "What the service involves",
      scopeText: [
        "A GVW change to 2490kg in Germany is not “paperwork and tweaking numbers”!",
        "The work is carried out by a German Institute of Automotive Technology, with full technical documentation confirming the changes made to the vehicle's parameters.",
        "As a result of the procedure you will receive a new type plate and a complete set of new German Briefs confirming the vehicle's new GVW. On their basis the vehicle can then be admitted to road traffic in Poland or in any other EU country.",
      ],
      scopeNote: "Not every car qualifies for a legal GVW change!",
      getTitle: "What you receive",
      getList: [
        "a complete set of German Briefs (Teil I and Teil II) together with a new type plate - GVW 2490kg",
      ],
      verifyTitle: "Vehicle verification",
      verifyText: "The service is available exclusively for vehicles that technically qualify (each case is considered individually)!",
      verifyPhotos: "Prepare photos of the vehicle: front three-quarter view, rear three-quarter view, driver's cab, odometer, cargo compartment, type plate.",
    },
    service3500: {
      tag: "Gross vehicle weight",
      title: "GVW reduction to 3500kg",
      subtitle: "Legally - in Germany - new Briefs - new type plate - full technical procedure.",
      lead: [
        "Service intended for vehicles purchased anywhere in the European Union, before they are brought into the country!",
        "We guide you through the entire process step by step - from vehicle verification, through procedures carried out by German technical facilities, to the preparation of complete technical documentation.",
        "As a result of the procedure you will receive a new type plate and a complete set of new German Briefs with the changed GVW of 3500kg.",
      ],
      scopeTitle: "What the service involves",
      scopeText: [
        "Reduction of GVW e.g. from 5000kg to 3500kg (category N1, category B driving licence) for cars purchased anywhere in the European Union and not yet admitted to traffic in Poland!",
        "A GVW change to 3500kg consists of comprehensively preparing the vehicle and then submitting it for assessment to a German Institute of Automotive Technology, which carries out an individual technical expert assessment and prepares documentation confirming the changes made to the vehicle's parameters.",
        "As a result of the procedure the owner will receive a complete set of new German Briefs (GVW 3500kg) together with a new type plate.",
      ],
      scopeNote: "Not every vehicle qualifies for a legal GVW change - each case is analysed individually!",
    },
    howItWorks: {
      title: "How does the cooperation work?",
      step1: "Contact", step1Desc: "You call or write - we discuss your vehicle and the purpose of GVW reduction.",
      step2: "Verification", step2Desc: "We check if the vehicle technically qualifies for GVW change.",
      step3: "Implementation", step3Desc: "We carry out the entire process in Germany - you don't have to go there.",
      step4: "Pickup", step4Desc: "You receive the vehicle with new documentation, ready for re-registration.",
    },
    note: { title: "", description: "The offer to reduce GVW to 2500 kg is particularly beneficial from July1, 2026 - for companies that need flexibility in international transport. Each case is individually verified for technical qualification of the vehicle." },
    contact: { title: "Let's talk about your vehicle", subtitle: "Free consultation - we will answer any questions about GVW change.", callLabel: "Call", writeLabel: "Write" },
  },

// locale 3
  zmianaDmc: {
    seo: {
      title: "Зміна ПМА транспортного засобу - зменшення до 2500 кг або 3500 кг",
      description: "Професійна зміна ПМА транспортних засобів у Німеччині - зменшення дозволеної повної маси до 3500 кг або 2500 кг. Повний сервіс, німецька документація, дійсна по всій ЄС.",
      keywords: "зміна ПМА до 2500 кг, зменшення ПМА до 2500 кг, ПМА 2500 кг",
    },
    nav: { home: "Головна", services: "Послуги", contact: "Контакти" },
    intro: {
      title: "Зміна ПМА (повна маса автомобіля) до 2500кг (2490кг) та 3500кг",
      subtitle: "Легально - у Німеччині - з повною технічною процедурою! Ми проводимо вас через увесь процес крок за кроком: від перевірки транспортного засобу, через процедури, що виконуються німецькими технічними установами, які готують повну технічну документацію, у результаті чого ви отримаєте нову табличку з даними та комплект нових німецьких Briefів (Teil I і Teil II) зі зміненою ПМА. На їх підставі транспортний засіб може бути згодом допущений до руху в Польщі або в будь-якій іншій країні ЄС.",
    },
    service2500: {
      tag: "Повна маса автомобіля",
      title: "Зниження ПМА до 2500кг (2490кг)",
      subtitle: "Легально - у Німеччині - нові Briefи - нова табличка з даними - повна технічна процедура!",
      lead: ["для легких / термінових міжнародних перевезень"],
      scopeTitle: "У чому полягає послуга",
      scopeText: [
        "Зміна ПМА до 2490кг у Німеччині - це не «папір та зміна цифр»!",
        "Роботи виконує німецький Інститут автомобільної техніки, з повною технічною документацією, що підтверджує проведені зміни параметрів транспортного засобу.",
        "У результаті проведеної процедури ви отримаєте нову табличку з даними та комплект нових німецьких Briefів, що підтверджують нову ПМА транспортного засобу. На їх підставі транспортний засіб може бути згодом допущений до руху в Польщі або в будь-якій іншій країні ЄС.",
      ],
      scopeNote: "Не кожен автомобіль кваліфікується для легальної зміни ПМА!",
      getTitle: "Що ви отримуєте",
      getList: [
        "комплект німецьких Briefів (Teil I і Teil II) разом із новою табличкою з даними - ПМА 2490кг",
      ],
      verifyTitle: "Перевірка транспортного засобу",
      verifyText: "Послуга доступна виключно для транспортних засобів, які технічно для цього кваліфікуються (кожен випадок розглядається індивідуально)!",
      verifyPhotos: "Підготуйте фото транспортного засобу: перед навскіс, зад навскіс, кабіна водія, одометр, багажний відсік, табличка з даними.",
    },
    service3500: {
      tag: "Повна маса автомобіля",
      title: "Зниження ПМА до 3500кг",
      subtitle: "Легально - у Німеччині - нові Briefи - нова табличка з даними - повна технічна процедура.",
      lead: [
        "Послуга призначена для транспортних засобів, придбаних на території всього Європейського Союзу, до їх ввезення в країну!",
        "Ми проводимо вас через увесь процес крок за кроком - від перевірки транспортного засобу, через процедури, що виконуються німецькими технічними установами, аж до підготовки повної технічної документації.",
        "У результаті проведеної процедури ви отримаєте нову табличку з даними та комплект нових німецьких Briefів зі зміненою ПМА 3500кг.",
      ],
      scopeTitle: "У чому полягає послуга",
      scopeText: [
        "Зниження ПМА, наприклад, з 5000кг до 3500кг (кат. N1, посвідчення кат. B) для автомобілів, придбаних на території всього Європейського Союзу і ще не допущених до руху в Польщі!",
        "Зміна ПМА до 3500кг полягає в комплексній підготовці транспортного засобу, а потім поданні його на оцінку до німецького Інституту автомобільної техніки, який виконує індивідуальну технічну експертизу та готує документацію, що підтверджує проведені зміни параметрів транспортного засобу.",
        "У результаті проведеної процедури власник отримає комплект нових німецьких Briefів (ПМА 3500кг) разом із новою табличкою з даними.",
      ],
      scopeNote: "Не кожен транспортний засіб кваліфікується для легальної зміни ПМА - кожен випадок аналізується індивідуально!",
    },
    howItWorks: {
      title: "Як виглядає співпраця?",
      step1: "Контакт", step1Desc: "Ви телефонуєте або пишете - ми обговорюємо ваш транспортний засіб і мету зменшення ПМА.",
      step2: "Верифікація", step2Desc: "Ми перевіряємо, чи технічно транспортний засіб кваліфікується для зміни ПМА.",
      step3: "Реалізація", step3Desc: "Ми проводимо весь процес в Німеччині - вам не потрібно туди їхати.",
      step4: "Отримання", step4Desc: "Ви отримуєте транспортний засіб з новою документацією, готовий до перереєстрації.",
    },
    note: { title: "", description: "Пропозиція зменшення ПМА до 2500 кг особливо вигідна з 1 липня 2026 р. - для компаній, яким потрібна гнучкість у міжнародних перевезеннях. Кожен випадок індивідуально перевіряється на технічну кваліфікацію транспортного засобу." },
    contact: { title: "Поговорімо про ваш транспортний засіб", subtitle: "Безкоштовна консультація - ми відповімо на будь-які питання щодо зміни ПМА.", callLabel: "Зателефонуйте", writeLabel: "Напишіть" },
  },

// locale 4
  zmianaDmc: {
    seo: {
      title: "Изменение ПМ транспортного средства - снижение до 2500 кг или 3500 кг",
      description: "Профессиональное изменение ПМ транспортных средств в Германии - снижение допустимой полной массы до 3500 кг или 2500 кг. Полный сервис, немецкая документация, действует по всей ЕС.",
      keywords: "изменение ПМ до 2500 кг, снижение ПМ до 2500 кг, ПМ 2500 кг",
    },
    nav: { home: "Главная", services: "Услуги", contact: "Контакты" },
    intro: {
      title: "Изменение ПМ (полная масса автомобиля) до 2500кг (2490кг) и 3500кг",
      subtitle: "Легально - в Германии - с полной технической процедурой! Мы проводим вас через весь процесс шаг за шагом: от проверки транспортного средства, через процедуры, выполняемые немецкими техническими учреждениями, которые готовят полную техническую документацию, в результате чего вы получите новую табличку с данными и комплект новых немецких Briefов (Teil I и Teil II) с изменённой ПМ. На их основании транспортное средство может быть затем допущено к движению в Польше или в любой другой стране ЕС.",
    },
    service2500: {
      tag: "Полная масса автомобиля",
      title: "Снижение ПМ до 2500кг (2490кг)",
      subtitle: "Легально - в Германии - новые Briefы - новая табличка с данными - полная техническая процедура!",
      lead: ["для лёгких / срочных международных перевозок"],
      scopeTitle: "В чём заключается услуга",
      scopeText: [
        "Изменение ПМ до 2490кг в Германии - это не «бумага и смена цифр»!",
        "Работы выполняет немецкий Институт автомобильной техники, с полной технической документацией, подтверждающей проведённые изменения параметров транспортного средства.",
        "В результате проведённой процедуры вы получите новую табличку с данными и комплект новых немецких Briefов, подтверждающих новую ПМ транспортного средства. На их основании транспортное средство может быть затем допущено к движению в Польше или в любой другой стране ЕС.",
      ],
      scopeNote: "Не каждый автомобиль квалифицируется для легального изменения ПМ!",
      getTitle: "Что вы получаете",
      getList: [
        "комплект немецких Briefов (Teil I и Teil II) вместе с новой табличкой с данными - ПМ 2490кг",
      ],
      verifyTitle: "Проверка транспортного средства",
      verifyText: "Услуга доступна исключительно для транспортных средств, которые технически для этого квалифицируются (каждый случай рассматривается индивидуально)!",
      verifyPhotos: "Подготовьте фото транспортного средства: перёд по диагонали, зад по диагонали, кабина водителя, одометр, багажный отсек, табличка с данными.",
    },
    service3500: {
      tag: "Полная масса автомобиля",
      title: "Снижение ПМ до 3500кг",
      subtitle: "Легально - в Германии - новые Briefы - новая табличка с данными - полная техническая процедура.",
      lead: [
        "Услуга предназначена для транспортных средств, приобретённых на территории всего Европейского Союза, до их ввоза в страну!",
        "Мы проводим вас через весь процесс шаг за шагом - от проверки транспортного средства, через процедуры, выполняемые немецкими техническими учреждениями, вплоть до подготовки полной технической документации.",
        "В результате проведённой процедуры вы получите новую табличку с данными и комплект новых немецких Briefов с изменённой ПМ 3500кг.",
      ],
      scopeTitle: "В чём заключается услуга",
      scopeText: [
        "Снижение ПМ, например, с 5000кг до 3500кг (кат. N1, удостоверение кат. B) для автомобилей, приобретённых на территории всего Европейского Союза и ещё не допущенных к движению в Польше!",
        "Изменение ПМ до 3500кг заключается в комплексной подготовке транспортного средства, а затем представлении его на оценку в немецкий Институт автомобильной техники, который выполняет индивидуальную техническую экспертизу и готовит документацию, подтверждающую проведённые изменения параметров транспортного средства.",
        "В результате проведённой процедуры владелец получит комплект новых немецких Briefов (ПМ 3500кг) вместе с новой табличкой с данными.",
      ],
      scopeNote: "Не каждое транспортное средство квалифицируется для легального изменения ПМ - каждый случай анализируется индивидуально!",
    },
    howItWorks: {
      title: "Как выглядит сотрудничество?",
      step1: "Контакт", step1Desc: "Вы звоните или пишете - мы обсуждаем ваше транспортное средство и цель снижения ПМ.",
      step2: "Верификация", step2Desc: "Мы проверяем, технически ли транспортное средство квалифицируется для изменения ПМ.",
      step3: "Реализация", step3Desc: "Мы проводим весь процесс в Германии - вам не нужно туда ехать.",
      step4: "Получение", step4Desc: "Вы получаете транспортное средство с новой документацией, готовое к перерегистрации.",
    },
    note: { title: "", description: "Предложение снижения ПМ до 2500 кг особенно выгодно с 1 июля 2026 г. - для компаний, которым нужна гибкость в международных перевозках. Каждый случай индивидуально проверяется на техническую квалификацию транспортного средства." },
    contact: { title: "Поговорим о вашем транспортном средстве", subtitle: "Бесплатная консультация - мы ответим на любые вопросы об изменении ПМ.", callLabel: "Позвоните", writeLabel: "Напишите" },
  },

// locale 5
  zmianaDmc: {
    seo: {
      title: "Změna celkové hmotnosti vozidla - snížení na 2500 kg nebo 3500 kg",
      description: "Profesionální změna celkové hmotnosti vozidel v Německu - snížení povolené celkové hmotnosti na 3500 kg nebo 2500 kg. Kompletní servis, německá dokumentace, platná v celé EU.",
      keywords: "změna celkové hmotnosti na 2500 kg, snížení celkové hmotnosti na 2500 kg, celková hmotnost 2500 kg",
    },
    nav: { home: "Domů", services: "Služby", contact: "Kontakt" },
    intro: {
      title: "Změna celkové hmotnosti vozidla na 2500kg (2490kg) a 3500kg",
      subtitle: "Legálně - v Německu - s kompletní technickou procedurou! Provedeme vás celým procesem krok za krokem: od ověření vozidla, přes procedury prováděné německými technickými institucemi, které připravují kompletní technickou dokumentaci, v důsledku čehož obdržíte nový štítek a kompletní nové německé Briefy (Teil I a Teil II) se změněnou celkovou hmotností. Na jejich základě může být vozidlo následně připuštěno k provozu v Polsku nebo v jakékoli jiné zemi EU.",
    },
    service2500: {
      tag: "Celková hmotnost vozidla",
      title: "Snížení celkové hmotnosti na 2500kg (2490kg)",
      subtitle: "Legálně - v Německu - nové Briefy - nový štítek - kompletní technická procedura!",
      lead: ["pro lehkou / urgentní mezinárodní přepravu"],
      scopeTitle: "Co služba obnáší",
      scopeText: [
        "Změna celkové hmotnosti na 2490kg v Německu není „papír a změna čísel“!",
        "Práce provádí německý Institut automobilové techniky, s úplnou technickou dokumentací potvrzující provedené změny parametrů vozidla.",
        "V důsledku provedené procedury obdržíte nový štítek a kompletní nové německé Briefy potvrzující novou celkovou hmotnost vozidla. Na jejich základě může být vozidlo následně připuštěno k provozu v Polsku nebo v jakékoli jiné zemi EU.",
      ],
      scopeNote: "Ne každé vozidlo se kvalifikuje pro legální změnu celkové hmotnosti!",
      getTitle: "Co získáte",
      getList: [
        "kompletní německé Briefy (Teil I a Teil II) spolu s novým štítkem - celková hmotnost 2490kg",
      ],
      verifyTitle: "Ověření vozidla",
      verifyText: "Služba je dostupná výhradně pro vozidla, která se k tomu technicky kvalifikují (každý případ je posuzován individuálně)!",
      verifyPhotos: "Připravte fotografie vozidla: přední pohled šikmo, zadní pohled šikmo, kabina řidiče, tachometr, zavazadlový prostor, štítek.",
    },
    service3500: {
      tag: "Celková hmotnost vozidla",
      title: "Snížení celkové hmotnosti na 3500kg",
      subtitle: "Legálně - v Německu - nové Briefy - nový štítek - kompletní technická procedura.",
      lead: [
        "Služba určená pro vozidla zakoupená na území celé Evropské unie, před jejich dovozem do země!",
        "Provedeme vás celým procesem krok za krokem - od ověření vozidla, přes procedury prováděné německými technickými institucemi, až po přípravu kompletní technické dokumentace.",
        "V důsledku provedené procedury obdržíte nový štítek a kompletní nové německé Briefy se změněnou celkovou hmotností 3500kg.",
      ],
      scopeTitle: "Co služba obnáší",
      scopeText: [
        "Snížení celkové hmotnosti např. z 5000kg na 3500kg (kat. N1, řidičský průkaz kat. B) pro automobily zakoupené na území celé Evropské unie a dosud nepřipuštěné k provozu v Polsku!",
        "Změna celkové hmotnosti na 3500kg spočívá v komplexní přípravě vozidla a následně v jeho předložení k posouzení německému Institutu automobilové techniky, který provádí individuální technickou expertizu a připravuje dokumentaci potvrzující provedené změny parametrů vozidla.",
        "V důsledku provedené procedury obdrží majitel kompletní nové německé Briefy (celková hmotnost 3500kg) spolu s novým štítkem.",
      ],
      scopeNote: "Ne každé vozidlo se kvalifikuje pro legální změnu celkové hmotnosti - každý případ je analyzován individuálně!",
    },
    howItWorks: {
      title: "Jak probíhá spolupráce?",
      step1: "Kontakt", step1Desc: "Voláte nebo píšete - probíráme vaše vozidlo a účel snížení celkové hmotnosti.",
      step2: "Ověření", step2Desc: "Kontrolujeme, zda se vozidlo technicky kvalifikuje ke změně celkové hmotnosti.",
      step3: "Realizace", step3Desc: "Provádíme celý proces v Německu - nemusíte tam jezdit.",
      step4: "Převzetí", step4Desc: "Obdržíte vozidlo s novou dokumentací, připravené k přeregistraci.",
    },
    note: { title: "", description: "Nabídka snížení celkové hmotnosti na 2500 kg je zvláště výhodná od 1. července 2026 - pro firmy, které potřebují flexibilitu v mezinárodní přepravě. Každý případ je individuálně ověřován z hlediska technické kvalifikace vozidla." },
    contact: { title: "Pojďme mluvit o vašem vozidle", subtitle: "Bezplatná konzultace - odpovíme na jakékoliv otázky ohledně změny celkové hmotnosti.", callLabel: "Zavolejte", writeLabel: "Napište" },
  },

// locale 6
  zmianaDmc: {
    seo: {
      title: "Cambio de PMA del vehículo - reducción a 2500 kg o 3500 kg",
      description: "Cambio profesional de PMA de vehículos en Alemania - reducción del peso máximo autorizado a 3500 kg o 2500 kg. Servicio completo, documentación alemana, válida en toda la UE.",
      keywords: "cambio de PMA a 2500 kg, reducir PMA a 2500 kg, PMA 2500 kg",
    },
    nav: { home: "Inicio", services: "Servicios", contact: "Contacto" },
    intro: {
      title: "Cambio de PMA (peso máximo autorizado) a 2500kg (2490kg) y 3500kg",
      subtitle: "Legalmente - en Alemania - con un procedimiento técnico completo! Te guiamos por todo el proceso paso a paso: desde la verificación del vehículo, pasando por los procedimientos realizados por instituciones técnicas alemanas, que preparan la documentación técnica completa, como resultado de lo cual recibirás una nueva placa de datos y un juego completo de nuevos Briefs alemanes (Teil I y Teil II) con la PMA modificada. Sobre su base, el vehículo puede después ser admitido a la circulación en Polonia o en cualquier otro país de la UE.",
    },
    service2500: {
      tag: "Peso máximo autorizado",
      title: "Reducción de PMA a 2500kg (2490kg)",
      subtitle: "Legalmente - en Alemania - nuevos Briefs - nueva placa de datos - procedimiento técnico completo!",
      lead: ["para transporte internacional ligero / urgente"],
      scopeTitle: "En qué consiste el servicio",
      scopeText: [
        "El cambio de PMA a 2490kg en Alemania no es “papeleo y cambio de cifras”!",
        "Los trabajos los realiza un Instituto de Tecnología Automotriz alemán, con documentación técnica completa que confirma los cambios efectuados en los parámetros del vehículo.",
        "Como resultado del procedimiento recibirás una nueva placa de datos y un juego completo de nuevos Briefs alemanes que confirman la nueva PMA del vehículo. Sobre su base, el vehículo puede después ser admitido a la circulación en Polonia o en cualquier otro país de la UE.",
      ],
      scopeNote: "¡No todo automóvil se califica para un cambio legal de PMA!",
      getTitle: "Qué recibes",
      getList: [
        "juego completo de Briefs alemanes (Teil I y Teil II) junto con una nueva placa de datos - PMA 2490kg",
      ],
      verifyTitle: "Verificación del vehículo",
      verifyText: "¡El servicio está disponible exclusivamente para vehículos que técnicamente se califican para ello (cada caso se considera individualmente)!",
      verifyPhotos: "Prepara fotos del vehículo: vista frontal en diagonal, vista trasera en diagonal, cabina del conductor, cuentakilómetros, compartimento de carga, placa de datos.",
    },
    service3500: {
      tag: "Peso máximo autorizado",
      title: "Reducción de PMA a 3500kg",
      subtitle: "Legalmente - en Alemania - nuevos Briefs - nueva placa de datos - procedimiento técnico completo.",
      lead: [
        "¡Servicio destinado a vehículos comprados en todo el territorio de la Unión Europea, antes de su introducción en el país!",
        "Te guiamos por todo el proceso paso a paso - desde la verificación del vehículo, pasando por los procedimientos realizados por instituciones técnicas alemanas, hasta la preparación de la documentación técnica completa.",
        "Como resultado del procedimiento recibirás una nueva placa de datos y un juego completo de nuevos Briefs alemanes con la PMA modificada de 3500kg.",
      ],
      scopeTitle: "En qué consiste el servicio",
      scopeText: [
        "¡Reducción de PMA p. ej. de 5000kg a 3500kg (cat. N1, licencia cat. B) para coches comprados en todo el territorio de la Unión Europea y aún no admitidos a la circulación en Polonia!",
        "El cambio de PMA a 3500kg consiste en la preparación integral del vehículo y, a continuación, en presentarlo para evaluación a un Instituto de Tecnología Automotriz alemán, que realiza un peritaje técnico individual y prepara la documentación que confirma los cambios efectuados en los parámetros del vehículo.",
        "Como resultado del procedimiento el propietario recibirá un juego completo de nuevos Briefs alemanes (PMA 3500kg) junto con una nueva placa de datos.",
      ],
      scopeNote: "¡No todo vehículo se califica para un cambio legal de PMA - cada caso se analiza individualmente!",
    },
    howItWorks: {
      title: "¿Cómo es la cooperación?",
      step1: "Contacto", step1Desc: "Llamas o escribes - analizamos tu vehículo y el propósito de la reducción del PMA.",
      step2: "Verificación", step2Desc: "Comprobamos si el vehículo se cualifica técnicamente para el cambio de PMA.",
      step3: "Realización", step3Desc: "Llevamos a cabo todo el proceso en Alemania - no tienes que ir allí.",
      step4: "Recogida", step4Desc: "Recibes el vehículo con nueva documentación, listo para re-registrar.",
    },
    note: { title: "", description: "La oferta de reducción del PMA a 2500 kg es especialmente ventajosa desde el 1 de julio de 2026 - para empresas que necesitan flexibilidad en el transporte internacional. Cada caso se verifica individualmente para la cualificación técnica del vehículo." },
    contact: { title: "Hablemos de tu vehículo", subtitle: "Consulta gratuita - responderemos a cualquier pregunta sobre el cambio de PMA.", callLabel: "Llama", writeLabel: "Escribe" },
  },

// locale 7
  zmianaDmc: {
    seo: {
      title: "Cambio PMA del veicolo - riduzione a 2500 kg o 3500 kg",
      description: "Cambio professionale PMA veicoli in Germania - riduzione della massa massima autorizzata a 3500 kg o 2500 kg. Servizio completo, documentazione tedesca, valida in tutta l'UE.",
      keywords: "cambio PMA a 2500 kg, ridurre PMA a 2500 kg, PMA 2500 kg",
    },
    nav: { home: "Home", services: "Servizi", contact: "Contatti" },
    intro: {
      title: "Cambio della PMA (massa massima autorizzata) a 2500kg (2490kg) e 3500kg",
      subtitle: "Legalmente - in Germania - con una procedura tecnica completa! Ti accompagniamo nell'intero processo passo dopo passo: dalla verifica del veicolo, attraverso le procedure svolte dalle strutture tecniche tedesche, che preparano la documentazione tecnica completa, a seguito della quale riceverai una nuova targhetta e un set completo di nuovi Brief tedeschi (Teil I e Teil II) con la PMA modificata. Sulla loro base il veicolo può poi essere ammesso alla circolazione in Polonia o in qualsiasi altro paese UE.",
    },
    service2500: {
      tag: "Massa massima autorizzata",
      title: "Riduzione PMA a 2500kg (2490kg)",
      subtitle: "Legalmente - in Germania - nuovi Brief - nuova targhetta - procedura tecnica completa!",
      lead: ["per il trasporto internazionale leggero / urgente"],
      scopeTitle: "In cosa consiste il servizio",
      scopeText: [
        "Il cambio PMA a 2490kg in Germania non è “scartoffie e modifica di cifre”!",
        "Le operazioni sono svolte da un Istituto di Tecnologia Automobilistica tedesco, con documentazione tecnica completa che conferma le modifiche apportate ai parametri del veicolo.",
        "A seguito della procedura riceverai una nuova targhetta e un set completo di nuovi Brief tedeschi che confermano la nuova PMA del veicolo. Sulla loro base il veicolo può poi essere ammesso alla circolazione in Polonia o in qualsiasi altro paese UE.",
      ],
      scopeNote: "Non ogni automobile si qualifica per un cambio legale della PMA!",
      getTitle: "Cosa ricevi",
      getList: [
        "set completo di Brief tedeschi (Teil I e Teil II) insieme a una nuova targhetta - PMA 2490kg",
      ],
      verifyTitle: "Verifica del veicolo",
      verifyText: "Il servizio è disponibile esclusivamente per i veicoli che si qualificano tecnicamente (ogni caso viene considerato individualmente)!",
      verifyPhotos: "Prepara le foto del veicolo: vista anteriore di tre quarti, vista posteriore di tre quarti, cabina del conducente, contachilometri, vano di carico, targhetta.",
    },
    service3500: {
      tag: "Massa massima autorizzata",
      title: "Riduzione PMA a 3500kg",
      subtitle: "Legalmente - in Germania - nuovi Brief - nuova targhetta - procedura tecnica completa.",
      lead: [
        "Servizio destinato ai veicoli acquistati in tutto il territorio dell'Unione Europea, prima della loro introduzione nel paese!",
        "Ti accompagniamo nell'intero processo passo dopo passo - dalla verifica del veicolo, attraverso le procedure svolte dalle strutture tecniche tedesche, fino alla preparazione della documentazione tecnica completa.",
        "A seguito della procedura riceverai una nuova targhetta e un set completo di nuovi Brief tedeschi con la PMA modificata di 3500kg.",
      ],
      scopeTitle: "In cosa consiste il servizio",
      scopeText: [
        "Riduzione della PMA ad es. da 5000kg a 3500kg (cat. N1, patente cat. B) per le auto acquistate in tutto il territorio dell'Unione Europea e non ancora ammesse alla circolazione in Polonia!",
        "Il cambio PMA a 3500kg consiste nella preparazione completa del veicolo e nella sua successiva presentazione per la valutazione presso un Istituto di Tecnologia Automobilistica tedesco, che esegue una perizia tecnica individuale e prepara la documentazione che conferma le modifiche apportate ai parametri del veicolo.",
        "A seguito della procedura il proprietario riceverà un set completo di nuovi Brief tedeschi (PMA 3500kg) insieme a una nuova targhetta.",
      ],
      scopeNote: "Non ogni veicolo si qualifica per un cambio legale della PMA - ogni caso viene analizzato individualmente!",
    },
    howItWorks: {
      title: "Come funziona la cooperazione?",
      step1: "Contatto", step1Desc: "Chiami o scrivi - discutiamo del tuo veicolo e dello scopo della riduzione del PMA.",
      step2: "Verifica", step2Desc: "Verifichiamo se il veicolo si qualifica tecnicamente per il cambio PMA.",
      step3: "Realizzazione", step3Desc: "Realizziamo l'intero processo in Germania - non devi andarci.",
      step4: "Ritiro", step4Desc: "Ricevi il veicolo con nuova documentazione, pronto per la re-registrazione.",
    },
    note: { title: "", description: "L'offerta di riduzione del PMA a 2500 kg è particolarmente vantaggiosa dal 1° luglio 2026 - per aziende che necessitano di flessibilità nel trasporto internazionale. Ogni caso viene verificato individualmente per la qualifica tecnica del veicolo." },
    contact: { title: "Parliamo del tuo veicolo", subtitle: "Consulenza gratuita - risponderemo a qualsiasi domanda sul cambio PMA.", callLabel: "Chiama", writeLabel: "Scrivi" },
  },

// locale 8
  zmianaDmc: {
    seo: {
      title: "ÖTM változtatása járműveknél - csökkentés 2500 kg vagy 3500 kg-ra",
      description: "Professzionális ÖTM változtatás járműveknek Németországban - megengedett össztömeg csökkentése 3500 kg-ra vagy 2500 kg-ra. Teljes körű szolgáltatás, német dokumentáció, az EU-ban érvényes.",
      keywords: "ÖTM változtatás 2500 kg-ra, ÖTM csökkentés 2500 kg-ra, ÖTM 2500 kg",
    },
    nav: { home: "Kezdőlap", services: "Szolgáltatások", contact: "Kapcsolat" },
    intro: {
      title: "ÖTM (megengedett össztömeg) csökkentése 2500kg-ra (2490kg) és 3500kg-ra",
      subtitle: "Legálisan - Németországban - teljes műszaki eljárással! Lépésről lépésre végigvezetjük a teljes folyamaton: a jármű ellenőrzésétől, a német technikai intézmények által végzett eljárásokon át, amelyek elkészítik a teljes műszaki dokumentációt, aminek eredményeként új adattáblát és komplett új német Briefeket (Teil I és Teil II) kap a megváltoztatott ÖTM-mel. Ezek alapján a jármű ezután forgalomba helyezhető Lengyelországban vagy bármely más EU-országban.",
    },
    service2500: {
      tag: "Megengedett össztömeg",
      title: "ÖTM csökkentése 2500kg-ra (2490kg)",
      subtitle: "Legálisan - Németországban - új Briefek - új adattábla - teljes műszaki eljárás!",
      lead: ["könnyű / sürgős nemzetközi szállításhoz"],
      scopeTitle: "Miből áll a szolgáltatás",
      scopeText: [
        "Az ÖTM 2490kg-ra változtatása Németországban nem „papír és számváltoztatás”!",
        "A munkát német Gépjárműtechnikai Intézet végzi, teljes műszaki dokumentációval, amely igazolja a jármű paramétereiben végrehajtott változtatásokat.",
        "Az elvégzett eljárás eredményeként új adattáblát és komplett új német Briefeket kap, amelyek igazolják a jármű új ÖTM-ét. Ezek alapján a jármű ezután forgalomba helyezhető Lengyelországban vagy bármely más EU-országban.",
      ],
      scopeNote: "Nem minden autó jogosult az ÖTM legális megváltoztatására!",
      getTitle: "Mit kap",
      getList: [
        "komplett német Briefek (Teil I és Teil II) az új adattáblával együtt - ÖTM 2490kg",
      ],
      verifyTitle: "A jármű ellenőrzése",
      verifyText: "A szolgáltatás kizárólag azon járművek számára érhető el, amelyek erre műszakilag alkalmasak (minden esetet egyedileg bírálunk el)!",
      verifyPhotos: "Készítse elő a jármű fényképeit: elöl ferdén, hátul ferdén, vezetőfülke, kilométeróra, csomagtér, adattábla.",
    },
    service3500: {
      tag: "Megengedett össztömeg",
      title: "ÖTM csökkentése 3500kg-ra",
      subtitle: "Legálisan - Németországban - új Briefek - új adattábla - teljes műszaki eljárás.",
      lead: [
        "A szolgáltatás az Európai Unió egész területén vásárolt járművekre vonatkozik, az országba történő behozataluk előtt!",
        "Lépésről lépésre végigvezetjük a teljes folyamaton - a jármű ellenőrzésétől, a német technikai intézmények által végzett eljárásokon át, a teljes műszaki dokumentáció elkészítéséig.",
        "Az elvégzett eljárás eredményeként új adattáblát és komplett új német Briefeket kap a megváltoztatott 3500kg ÖTM-mel.",
      ],
      scopeTitle: "Miből áll a szolgáltatás",
      scopeText: [
        "Az ÖTM csökkentése pl. 5000kg-ról 3500kg-ra (N1 kat., B kat. jogosítvány) az Európai Unió egész területén vásárolt és Lengyelországban még forgalomba nem helyezett autókhoz!",
        "Az ÖTM 3500kg-ra változtatása a jármű átfogó előkészítéséből, majd egy német Gépjárműtechnikai Intézethez értékelésre történő benyújtásából áll, amely egyedi műszaki szakvéleményt készít, és elkészíti a jármű paramétereiben végrehajtott változtatásokat igazoló dokumentációt.",
        "Az elvégzett eljárás eredményeként a tulajdonos komplett új német Briefeket kap (ÖTM 3500kg) az új adattáblával együtt.",
      ],
      scopeNote: "Nem minden jármű jogosult az ÖTM legális megváltoztatására - minden esetet egyedileg elemzünk!",
    },
    howItWorks: {
      title: "Hogyan működik az együttműködés?",
      step1: "Kapcsolatfelvétel", step1Desc: "Hív vagy ír - megbeszéljük az Ön járművét és az ÖTM csökkentésének célját.",
      step2: "Ellenőrzés", step2Desc: "Ellenőrizzük, hogy a jármű technikailag alkalmas-e az ÖTM változtatására.",
      step3: "Végrehajtás", step3Desc: "A teljes folyamatot Németországban végezzük - Önnek nem kell odautaznia.",
      step4: "Átvétel", step4Desc: "Megkapja a járművet az új dokumentációval, készen az átregisztrációra.",
    },
    note: { title: "", description: "Az ÖTM 2500 kg-ra csökkentésének ajánlata különösen előnyös 2026. július 1-jétől - a nemzetközi szállításban rugalmasságra váró cégeknek. Minden eset egyedileg kerül ellenőrzésre a jármű műszaki alkalmassága szempontjából." },
    contact: { title: "Beszéljünk az Ön járművéről", subtitle: "Ingyenes konzultáció - válaszolunk bármilyen kérdésre az ÖTM változtatásával kapcsolatban.", callLabel: "Hívjon", writeLabel: "Írjon" },
  },

// locale 9
  zmianaDmc: {
    seo: {
      title: "Modificare MTMA vehicul - reducere la 2500 kg sau 3500 kg",
      description: "Modificare profesională MTMA a vehiculelor în Germania - reducerea masei totale maxime autorizate la 3500 kg sau 2500 kg. Serviciu complet, documentație germană, valabilă în întreaga UE.",
      keywords: "modificare MTMA la 2500 kg, reducere MTMA la 2500 kg, MTMA 2500 kg",
    },
    nav: { home: "Acasă", services: "Servicii", contact: "Contact" },
    intro: {
      title: "Modificarea MTMA (masa totală maximă autorizată) la 2500kg (2490kg) și 3500kg",
      subtitle: "Legal - în Germania - cu o procedură tehnică completă! Te ghidăm prin întregul proces pas cu pas: de la verificarea vehiculului, prin procedurile efectuate de instituțiile tehnice germane, care pregătesc documentația tehnică completă, în urma căreia vei primi o plăcuță de identificare nouă și un set complet de Briefuri germane noi (Teil I și Teil II) cu MTMA modificată. Pe baza lor, vehiculul poate fi apoi admis în circulație în Polonia sau în orice altă țară UE.",
    },
    service2500: {
      tag: "Masa totală maximă autorizată",
      title: "Reducerea MTMA la 2500kg (2490kg)",
      subtitle: "Legal - în Germania - Briefuri noi - plăcuță de identificare nouă - procedură tehnică completă!",
      lead: ["pentru transport internațional ușor / urgent"],
      scopeTitle: "În ce constă serviciul",
      scopeText: [
        "Modificarea MTMA la 2490kg în Germania nu înseamnă „hârtii și schimbare de cifre”!",
        "Lucrările sunt efectuate de un Institut de Tehnologie Auto german, cu documentație tehnică completă care confirmă modificările aduse parametrilor vehiculului.",
        "În urma procedurii efectuate vei primi o plăcuță de identificare nouă și un set complet de Briefuri germane noi care confirmă noua MTMA a vehiculului. Pe baza lor, vehiculul poate fi apoi admis în circulație în Polonia sau în orice altă țară UE.",
      ],
      scopeNote: "Nu orice automobil se califică pentru o modificare legală a MTMA!",
      getTitle: "Ce primești",
      getList: [
        "set complet de Briefuri germane (Teil I și Teil II) împreună cu o plăcuță de identificare nouă - MTMA 2490kg",
      ],
      verifyTitle: "Verificarea vehiculului",
      verifyText: "Serviciul este disponibil exclusiv pentru vehiculele care se califică tehnic pentru aceasta (fiecare caz este analizat individual)!",
      verifyPhotos: "Pregătește fotografii ale vehiculului: față din semiprofil, spate din semiprofil, cabina șoferului, kilometraj, compartiment de bagaje, plăcuța de identificare.",
    },
    service3500: {
      tag: "Masa totală maximă autorizată",
      title: "Reducerea MTMA la 3500kg",
      subtitle: "Legal - în Germania - Briefuri noi - plăcuță de identificare nouă - procedură tehnică completă.",
      lead: [
        "Serviciu destinat vehiculelor achiziționate pe întreg teritoriul Uniunii Europene, înainte de introducerea lor în țară!",
        "Te ghidăm prin întregul proces pas cu pas - de la verificarea vehiculului, prin procedurile efectuate de instituțiile tehnice germane, până la pregătirea documentației tehnice complete.",
        "În urma procedurii efectuate vei primi o plăcuță de identificare nouă și un set complet de Briefuri germane noi cu MTMA modificată de 3500kg.",
      ],
      scopeTitle: "În ce constă serviciul",
      scopeText: [
        "Reducerea MTMA de ex. de la 5000kg la 3500kg (cat. N1, permis cat. B) pentru autoturismele achiziționate pe întreg teritoriul Uniunii Europene și încă neadmise în circulație în Polonia!",
        "Modificarea MTMA la 3500kg constă în pregătirea completă a vehiculului și apoi prezentarea acestuia pentru evaluare la un Institut de Tehnologie Auto german, care efectuează o expertiză tehnică individuală și pregătește documentația care confirmă modificările aduse parametrilor vehiculului.",
        "În urma procedurii efectuate proprietarul va primi un set complet de Briefuri germane noi (MTMA 3500kg) împreună cu o plăcuță de identificare nouă.",
      ],
      scopeNote: "Nu orice vehicul se califică pentru o modificare legală a MTMA - fiecare caz este analizat individual!",
    },
    howItWorks: {
      title: "Cum decurge colaborarea?",
      step1: "Contact", step1Desc: "Suni sau scrii - discutăm despre vehiculul tău și scopul reducerii MTMA.",
      step2: "Verificare", step2Desc: "Verificăm dacă vehiculul se califică tehnic pentru modificarea MTMA.",
      step3: "Realizare", step3Desc: "Efectuăm întregul proces în Germania - nu trebuie să mergi acolo.",
      step4: "Primire", step4Desc: "Primești vehiculul cu documentația nouă, gata pentru reînmatriculare.",
    },
    note: { title: "", description: "Oferta de reducere a MTMA la 2500 kg este deosebit de avantajoasă de la 1 iulie 2026 - pentru companiile care au nevoie de flexibilitate în transportul internațional. Fiecare caz este verificat individual pentru calificarea tehnică a vehiculului." },
    contact: { title: "Să vorbim despre vehiculul tău", subtitle: "Consultanță gratuită - vom răspunde la orice întrebare despre modificarea MTMA.", callLabel: "Sună", writeLabel: "Scrie" },
  },

// locale 10
  zmianaDmc: {
    seo: {
      title: "Transporto priemonės DLM keitimas - mažinimas iki 2500 kg arba 3500 kg",
      description: "Profesionalus transporto priemonių DLM keitimas Vokietijoje - didžiausios leidžiamosios masės sumažinimas iki 3500 kg arba 2500 kg. Pilnas servisas, vokiška dokumentacija, galiojanti visoje ES.",
      keywords: "DLM keitimas iki 2500 kg, DLM mažinimas iki 2500 kg, DLM 2500 kg",
    },
    nav: { home: "Pagrindinis", services: "Paslaugos", contact: "Kontaktai" },
    intro: {
      title: "DLM (didžiausia leidžiamoji masė) keitimas iki 2500kg (2490kg) ir 3500kg",
      subtitle: "Teisėtai - Vokietijoje - su visa technine procedūra! Vedame jus per visą procesą žingsnis po žingsnio: nuo transporto priemonės patikros, per vokiškų techninių įstaigų atliekamas procedūras, kurios parengia pilną techninę dokumentaciją, dėl ko gausite naują identifikacinę lentelę ir naujų vokiškų Briefų komplektą (Teil I ir Teil II) su pakeista DLM. Jų pagrindu transporto priemonė vėliau gali būti įleista į eismą Lenkijoje arba bet kurioje kitoje ES šalyje.",
    },
    service2500: {
      tag: "Didžiausia leidžiamoji masė",
      title: "DLM mažinimas iki 2500kg (2490kg)",
      subtitle: "Teisėtai - Vokietijoje - nauji Briefai - nauja identifikacinė lentelė - visa techninė procedūra!",
      lead: ["lengviems / skubiems tarptautiniams pervežimams"],
      scopeTitle: "Ką apima paslauga",
      scopeText: [
        "DLM keitimas iki 2490kg Vokietijoje - tai ne „popierius ir skaičių keitimas“!",
        "Darbus atlieka vokiškas Automobilių technologijos institutas, su pilna technine dokumentacija, patvirtinančia atliktus transporto priemonės parametrų pakeitimus.",
        "Atliktos procedūros rezultatas - nauja identifikacinė lentelė ir naujų vokiškų Briefų komplektas, patvirtinantis naują transporto priemonės DLM. Jų pagrindu transporto priemonė vėliau gali būti įleista į eismą Lenkijoje arba bet kurioje kitoje ES šalyje.",
      ],
      scopeNote: "Ne kiekvienas automobilis kvalifikuojasi teisėtam DLM pakeitimui!",
      getTitle: "Ką gaunate",
      getList: [
        "vokiškų Briefų komplektas (Teil I ir Teil II) kartu su nauja identifikacine lentele - DLM 2490kg",
      ],
      verifyTitle: "Transporto priemonės patikra",
      verifyText: "Paslauga prieinama tik transporto priemonėms, kurios tam techniškai kvalifikuojasi (kiekvienas atvejis nagrinėjamas individualiai)!",
      verifyPhotos: "Paruoškite transporto priemonės nuotraukas: priekis įstrižai, galas įstrižai, vairuotojo kabina, ridos skaitiklis, bagažo skyrius, identifikacinė lentelė.",
    },
    service3500: {
      tag: "Didžiausia leidžiamoji masė",
      title: "DLM mažinimas iki 3500kg",
      subtitle: "Teisėtai - Vokietijoje - nauji Briefai - nauja identifikacinė lentelė - visa techninė procedūra.",
      lead: [
        "Paslauga skirta transporto priemonėms, įsigytoms visoje Europos Sąjungoje, prieš jų įvežimą į šalį!",
        "Vedame jus per visą procesą žingsnis po žingsnio - nuo transporto priemonės patikros, per vokiškų techninių įstaigų atliekamas procedūras, iki pilnos techninės dokumentacijos parengimo.",
        "Atliktos procedūros rezultatas - nauja identifikacinė lentelė ir naujų vokiškų Briefų komplektas su pakeistu 3500kg DLM.",
      ],
      scopeTitle: "Ką apima paslauga",
      scopeText: [
        "DLM mažinimas, pvz. nuo 5000kg iki 3500kg (N1 kat., B kat. pažymėjimas) automobiliams, įsigytiems visoje Europos Sąjungoje ir dar neįleistiems į eismą Lenkijoje!",
        "DLM keitimas iki 3500kg apima kompleksišką transporto priemonės paruošimą, o po to jos pateikimą įvertinti vokiškam Automobilių technologijos institutui, kuris atlieka individualią techninę ekspertizę ir parengia dokumentaciją, patvirtinančią atliktus transporto priemonės parametrų pakeitimus.",
        "Atliktos procedūros rezultatas - savininkas gaus naujų vokiškų Briefų komplektą (DLM 3500kg) kartu su nauja identifikacine lentele.",
      ],
      scopeNote: "Ne kiekviena transporto priemonė kvalifikuojasi teisėtam DLM pakeitimui - kiekvienas atvejis analizuojamas individualiai!",
    },
    howItWorks: {
      title: "Kaip vyksta bendradarbiavimas?",
      step1: "Kontaktas", step1Desc: "Skambinate ar ra\u0161ote - aptariame j\u016bs\u0173 transporto priemon\u0119 ir DLM ma\u017einimo tiksl\u0105.",
      step2: "Patikra", step2Desc: "Patikriname, ar transporto priemon\u0117 techni\u0161kai kvalifikuojasi DLM pakeitimui.",
      step3: "Vykdymas", step3Desc: "Atliekame vis\u0105 proces\u0105 Vokietijoje - jums nereikia ten va\u017eiuoti.",
      step4: "Atsi\u0117mimas", step4Desc: "Gaunate transporto priemon\u0119 su nauja dokumentacija, paruo\u0161t\u0105 perregistravimui.",
    },
    note: { title: "", description: "Pasi\u016blymas suma\u017einti DLM iki 2500 kg yra ypa\u010d naudingas nuo 2026 m. liepos 1 d. - \u012fmon\u0117ms, kurioms reikia lankstumo tarptautiniame transporte. Kiekvienas atvejis yra individualiai tikrinamas d\u0117l transporto priemon\u0117s technin\u0117s kvalifikacijos." },
    contact: { title: "Pakalb\u0117kime apie j\u016bs\u0173 transporto priemon\u0119", subtitle: "Nemokama konsultacija - atsakysime \u012f bet kokius klausimus apie DLM keitim\u0105.", callLabel: "Skambinti", writeLabel: "Ra\u0161yti" },
  },

```
