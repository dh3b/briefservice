import type { ServicePage } from "./types";

/**
 * Dedicated, indexable service pages (Polish). The DMC/GVW change service has
 * its own established page at /pl/zmiana-dmc; these are the remaining services
 * that were previously buried as homepage sections.
 */
export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "modyfikacje-konstrukcyjne",
    name: "Legalizacja zmian konstrukcyjnych",
    title: "Legalizacja zmian konstrukcyjnych pojazdu w Niemczech | BriefService",
    description:
      "Legalizujemy modyfikacje konstrukcyjne pojazdu w Niemczech: zawieszenie, ogumienie, liczba miejsc, zabudowa. Pełna dokumentacja techniczna i nowy niemiecki brief (Teil I i II).",
    h1: "Legalizacja zmian konstrukcyjnych pojazdu w Niemczech",
    summary:
      "Wpisanie zmian technicznych do dokumentów i wydanie nowego niemieckiego briefu — legalnie, z ekspertyzą.",
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
    relatedGuides: ["co-to-jest-niemiecki-brief", "jak-czytac-niemiecki-brief", "zmiana-dmc-jak-dziala"],
  },

  {
    slug: "zmiana-rodzaju-pojazdu",
    name: "Zmiana rodzaju pojazdu",
    title: "Zmiana rodzaju pojazdu w Niemczech (ciężarowy ↔ osobowy) | BriefService",
    description:
      "Zmiana rodzaju / przeznaczenia pojazdu w Niemczech — np. z ciężarowego na osobowy lub specjalny. Ekspertyza, nowa tabliczka znamionowa i nowy niemiecki brief.",
    h1: "Zmiana rodzaju pojazdu w Niemczech",
    summary:
      "Zmiana klasyfikacji pojazdu (np. ciężarowy na osobowy) z pełną procedurą techniczną i nowymi dokumentami.",
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
        heading: "Co otrzymujesz",
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
    relatedGuides: ["zmiana-dmc-jak-dziala", "co-to-jest-niemiecki-brief"],
  },

  {
    slug: "odzyskanie-briefu",
    name: "Odzyskanie i duplikat briefu",
    title: "Odzyskanie i duplikat niemieckiego briefu (Teil I i II) | BriefService",
    description:
      "Zgubiony, zniszczony lub zatrzymany niemiecki brief? Pomagamy odzyskać dokumentację i wyrobić duplikat Zulassungsbescheinigung Teil I i Teil II — także w sprawach trudnych.",
    h1: "Odzyskanie i duplikat niemieckiego briefu",
    summary:
      "Wyrobienie duplikatu lub odtworzenie brakującej niemieckiej dokumentacji pojazdu — również w trudnych przypadkach.",
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
        a: "Tak. Jeśli brief zaginął, doradzimy najlepszą ścieżkę — od duplikatu po wyrejestrowanie. Zobacz też nasz poradnik o wyrejestrowaniu auta w Niemczech bez briefu.",
      },
    ],
    relatedGuides: [
      "co-to-jest-niemiecki-brief",
      "jak-czytac-niemiecki-brief",
      "zgubiony-brief-duplikat",
      "wyrejestrowanie-auta-bez-briefu",
      "koszt-wyrobienia-briefu",
    ],
  },
];

/** Look up a service page by slug. */
export function getService(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}
