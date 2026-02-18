const base = {
  seo: { title: "", description: "", keywords: "" },
  nav: { home: "", services: "", contact: "", admin: "" },
  hero: { title: "", titleAccent: "", subtitle: "", cta: "", chatCta: "" },
  services: { title: "", subtitle: "", chatAbout: "", details: "", priceFrom: "", close: "", allCategories: "" },
  contact: { title: "", subtitle: "", name: "", email: "", message: "", send: "", sent: "", phone: "", address: "" },
  chat: { title: "", placeholder: "", send: "", greeting: "", serviceContext: "", namePrompt: "", namePlaceholder: "", emailPlaceholder: "", nameSubmit: "", translateAll: "", showOriginal: "" },
  admin: {
    login: "", username: "", password: "", signIn: "", dashboard: "", chats: "", servicesManage: "",
    noChats: "", deleteChat: "", addService: "", editService: "", deleteService: "", logout: "",
    addCategory: "", editCategory: "", deleteCategory: "", categories: "", saveService: "", saveCategory: "",
    renameChat: "", chatTitle: "", chatUser: "", chatEmail: "", imageUrl: "", uploadImage: "", priceRange: "", category: "",
    titleField: "", descriptionField: "", languageTab: "", cancel: "", save: "", noServices: "", noCategories: "",
    statistics: "", visits: "", chatsByService: "", timeRange: "", week: "", month: "", halfYear: "", year: "",
    filterAll: "", noData: "",
  },
  footer: { rights: "", description: "" },
  notFound: { title: "", goHome: "" },
};

type TranslationShape = typeof base;

const pl: TranslationShape = {
  seo: {
    title: "BriefService – Rejestracja i przerejestrowanie pojazdów w Niemczech",
    description: "Obsługa rejestracji i przerejestrowania pojazdów w Niemczech. Wyrabianie duplikatów niemieckich Briefów, zmiana DMC, rodzaju pojazdu, liczby miejsc siedzących i legalizacja modyfikacji konstrukcyjnych.",
    keywords: "niemiecki brief, duplikat briefu, mały brief, duży brief, wtórnik dowodu rejestracyjnego Niemcy, rejestracja auta w Niemczech, przerejestrowanie auta z Niemiec, zmiana DMC, obniżenie DMC do 3500 kg, DMC 3,5t kat. B, zmiana rodzaju pojazdu, samochód specjalny zimowego utrzymania dróg, legalizacja zmian konstrukcyjnych, zmiana liczby miejsc siedzących, rejestracja anglika na niemiecki brief, rejestracja auta z UK w Niemczech, rejestracja auta z USA w Niemczech, wyrejestrowanie pojazdu z Niemiec, przegląd techniczny Niemcy, dokumentacja do rejestracji auta, rejestracja samochodu sprowadzonego, zmiana ciężarowy na osobowy, zmiana osobowy na ciężarowy, homologacja pojazdu Niemcy, tabliczka znamionowa DMC",
  },
  nav: { home: "Strona główna", services: "Usługi", contact: "Kontakt", admin: "Panel admina" },
  hero: { title: "Zagubiony Brief?", titleAccent: "Sprawy w niemieckich urzędach?", subtitle: "Oferujemy kompleksową obsługę rejestracji i przerejestrowania pojazdów w Niemczech oraz ich dalszą rejestrację w Polsce i UE. Zajmujemy się wyrabianiem duplikatów niemieckich Briefów, zmianą DMC, rodzaju pojazdu, liczby miejsc siedzących i legalizacją modyfikacji konstrukcyjnych oraz organizujemy przeglądy techniczne. A sam klient otrzymuje komplet dokumentów potrzebnych do dalszej rejestracji.", cta: "Zobacz usługi", chatCta: "Porozmawiaj z nami" },
  services: { title: "Nasze Usługi", subtitle: "Sprawdź naszą ofertę i wybierz usługę która jest Ci potrzebna. Oferty są elastyczne.", chatAbout: "Zapytaj o to", details: "Szczegóły", priceFrom: "Od", close: "Zamknij", allCategories: "Wszystkie" },
  contact: { title: "Skontaktuj się z nami", subtitle: "Masz pytania? Napisz do nas lub skorzystaj z czatu na żywo.", name: "Imię i nazwisko", email: "Adres e-mail", message: "Wiadomość", send: "Wyślij wiadomość", sent: "Wiadomość wysłana!", phone: "Telefon", address: "Adres" },
  chat: { title: "Czat na żywo", placeholder: "Napisz wiadomość...", send: "Wyślij", greeting: "Cześć! Jak możemy Ci pomóc?", serviceContext: "Pytanie dotyczy usługi:", namePrompt: "Podaj swoje dane, aby rozpocząć czat:", namePlaceholder: "Twoje imię...", emailPlaceholder: "Twój e-mail...", nameSubmit: "Rozpocznij czat", translateAll: "Przetłumacz wiadomości", showOriginal: "Pokaż oryginalne wiadomości" },
  admin: {
    login: "Logowanie", username: "Nazwa użytkownika", password: "Hasło", signIn: "Zaloguj się",
    dashboard: "Panel zarządzania", chats: "Czaty", servicesManage: "Zarządzaj usługami",
    noChats: "Brak aktywnych czatów", deleteChat: "Usuń czat", addService: "Dodaj usługę",
    editService: "Edytuj", deleteService: "Usuń", logout: "Wyloguj",
    addCategory: "Dodaj kategorię", editCategory: "Edytuj kategorię", deleteCategory: "Usuń",
    categories: "Kategorie", saveService: "Zapisz usługę", saveCategory: "Zapisz kategorię",
    renameChat: "Zmień nazwę", chatTitle: "Tytuł czatu", chatUser: "Użytkownik", chatEmail: "E-mail",
    imageUrl: "URL obrazu", uploadImage: "Prześlij obraz", priceRange: "Zakres cenowy", category: "Kategoria",
    titleField: "Tytuł", descriptionField: "Opis", languageTab: "Język", cancel: "Anuluj", save: "Zapisz",
    noServices: "Brak usług", noCategories: "Brak kategorii",
    statistics: "Statystyki", visits: "Wizyty na stronie", chatsByService: "Czaty wg usługi", timeRange: "Zakres czasu",
    week: "Tydzień", month: "Miesiąc", halfYear: "Pół roku", year: "Rok", filterAll: "Wszystkie", noData: "Brak danych",
  },
  footer: { rights: "Wszelkie prawa zastrzeżone.", description: "Oferta dotyczy wyrobienia nowych dokumentów rejestracyjnych niemieckich Briefów (w przypadku zagubienia, utraty, kradzieży)!" },
  notFound: { title: "Ups! Strona nie znaleziona", goHome: "Wróć na stronę główną" },
};

const en: TranslationShape = {
  seo: {
    title: "BriefService – Vehicle Registration & Re-registration in Germany",
    description: "Comprehensive registration and re-registration services for vehicles in Germany. We handle duplicate German Briefs, GVW changes, vehicle type changes, seat count modifications, and legalization of structural modifications.",
    keywords: "German brief, duplicate brief, small brief, large brief, duplicate registration document Germany, car registration in Germany, re-registration from Germany, GVW change, GVW reduction to 3500 kg, GVW 3.5t category B, vehicle type change, special winter road maintenance vehicle, legalization of structural changes, seat count change, UK car German registration, US car registration in Germany, vehicle deregistration Germany, technical inspection Germany, vehicle registration documents, imported car registration, truck to passenger conversion, passenger to truck conversion, vehicle homologation Germany, GVW nameplate",
  },
  nav: { home: "Home", services: "Services", contact: "Contact", admin: "Admin Panel" },
  hero: { title: "Lost Brief?", titleAccent: "Matters at German offices?", subtitle: "We offer comprehensive registration and re-registration services for vehicles in Germany, as well as their subsequent registration in Poland and the EU. We handle obtaining duplicate German Briefs, changing GVW, vehicle type, number of seats, and legalizing structural modifications, as well as organizing technical inspections. The client receives a complete set of documents needed for further registration.", cta: "View Services", chatCta: "Chat With Us" },
  services: { title: "Our Services", subtitle: "Check our offer and choose the service you need. Offers are flexible.", chatAbout: "Ask about this", details: "Details", priceFrom: "From", close: "Close", allCategories: "All" },
  contact: { title: "Get In Touch", subtitle: "Have questions? Send us a message or use our live chat.", name: "Full name", email: "Email address", message: "Message", send: "Send Message", sent: "Message sent!", phone: "Phone", address: "Address" },
  chat: { title: "Live Chat", placeholder: "Type a message...", send: "Send", greeting: "Hello! How can we help you?", serviceContext: "Question about service:", namePrompt: "Enter your details to start chatting:", namePlaceholder: "Your name...", emailPlaceholder: "Your email...", nameSubmit: "Start Chat", translateAll: "Translate messages", showOriginal: "Show original messages" },
  admin: {
    login: "Login", username: "Username", password: "Password", signIn: "Sign In",
    dashboard: "Admin Dashboard", chats: "Chats", servicesManage: "Manage Services",
    noChats: "No active chats", deleteChat: "Delete Chat", addService: "Add Service",
    editService: "Edit", deleteService: "Delete", logout: "Log Out",
    addCategory: "Add Category", editCategory: "Edit Category", deleteCategory: "Delete",
    categories: "Categories", saveService: "Save Service", saveCategory: "Save Category",
    renameChat: "Rename", chatTitle: "Chat Title", chatUser: "User", chatEmail: "E-Mail",
    imageUrl: "Image URL", uploadImage: "Upload Image", priceRange: "Price Range", category: "Category",
    titleField: "Title", descriptionField: "Description", languageTab: "Language", cancel: "Cancel", save: "Save",
    noServices: "No services found", noCategories: "No categories found",
    statistics: "Statistics", visits: "Website Visits", chatsByService: "Chats by Service", timeRange: "Time Range",
    week: "Week", month: "Month", halfYear: "Half Year", year: "Year", filterAll: "All", noData: "No data",
  },
  footer: { rights: "All rights reserved.", description: "The offer applies to obtaining new German Brief registration documents (in case of loss, misplacement, or theft)!" },
  notFound: { title: "Oops! Page not found", goHome: "Return to Home" },
};

export const translations = { pl, en } as const;
export type Translations = TranslationShape;
