export const translations = {
  pl: {
    nav: {
      home: "Strona główna",
      services: "Usługi",
      contact: "Kontakt",
      admin: "Panel admina",
    },
    hero: {
      title: "Profesjonalne Usługi",
      titleAccent: "Dla Twojego Biznesu",
      subtitle: "Oferujemy kompleksowe rozwiązania dopasowane do Twoich potrzeb. Skontaktuj się z nami i przekonaj się sam.",
      cta: "Zobacz usługi",
      chatCta: "Porozmawiaj z nami",
    },
    services: {
      title: "Nasze Usługi",
      subtitle: "Sprawdź naszą ofertę i wybierz rozwiązanie idealne dla Ciebie.",
      chatAbout: "Zapytaj o to",
      priceFrom: "Od",
      categories: {
        all: "Wszystkie",
        consulting: "Konsulting",
        development: "Rozwój",
        design: "Projektowanie",
        marketing: "Marketing",
      },
    },
    contact: {
      title: "Skontaktuj się z nami",
      subtitle: "Masz pytania? Napisz do nas lub skorzystaj z czatu na żywo.",
      name: "Imię i nazwisko",
      email: "Adres e-mail",
      message: "Wiadomość",
      send: "Wyślij wiadomość",
      phone: "Telefon",
      address: "Adres",
    },
    chat: {
      title: "Czat na żywo",
      placeholder: "Napisz wiadomość...",
      send: "Wyślij",
      greeting: "Cześć! Jak możemy Ci pomóc?",
      serviceContext: "Pytanie dotyczy usługi:",
    },
    admin: {
      login: "Logowanie",
      username: "Nazwa użytkownika",
      password: "Hasło",
      signIn: "Zaloguj się",
      dashboard: "Panel zarządzania",
      chats: "Czaty",
      servicesManage: "Zarządzaj usługami",
      noChats: "Brak aktywnych czatów",
      deleteChat: "Usuń czat",
      addService: "Dodaj usługę",
      editService: "Edytuj",
      deleteService: "Usuń",
      logout: "Wyloguj",
    },
    footer: {
      rights: "Wszelkie prawa zastrzeżone.",
      description: "Profesjonalne usługi dla Twojego biznesu.",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      contact: "Contact",
      admin: "Admin Panel",
    },
    hero: {
      title: "Professional Services",
      titleAccent: "For Your Business",
      subtitle: "We offer comprehensive solutions tailored to your needs. Get in touch and see for yourself.",
      cta: "View Services",
      chatCta: "Chat With Us",
    },
    services: {
      title: "Our Services",
      subtitle: "Browse our offer and find the perfect solution for you.",
      chatAbout: "Ask about this",
      priceFrom: "From",
      categories: {
        all: "All",
        consulting: "Consulting",
        development: "Development",
        design: "Design",
        marketing: "Marketing",
      },
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Have questions? Send us a message or use our live chat.",
      name: "Full name",
      email: "Email address",
      message: "Message",
      send: "Send Message",
      phone: "Phone",
      address: "Address",
    },
    chat: {
      title: "Live Chat",
      placeholder: "Type a message...",
      send: "Send",
      greeting: "Hello! How can we help you?",
      serviceContext: "Question about service:",
    },
    admin: {
      login: "Login",
      username: "Username",
      password: "Password",
      signIn: "Sign In",
      dashboard: "Admin Dashboard",
      chats: "Chats",
      servicesManage: "Manage Services",
      noChats: "No active chats",
      deleteChat: "Delete Chat",
      addService: "Add Service",
      editService: "Edit",
      deleteService: "Delete",
      logout: "Log Out",
    },
    footer: {
      rights: "All rights reserved.",
      description: "Professional services for your business.",
    },
  },
} as const;

export type TranslationKeys = typeof translations.pl;

// Recursive type to get string values
type DeepStringify<T> = {
  [K in keyof T]: T[K] extends object ? DeepStringify<T[K]> : string;
};

export type Translations = DeepStringify<TranslationKeys>;
