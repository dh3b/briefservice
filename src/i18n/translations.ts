const base = {
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
};

type TranslationShape = typeof base;

const pl: TranslationShape = {
  nav: { home: "Strona główna", services: "Usługi", contact: "Kontakt", admin: "Panel admina" },
  hero: { title: "Profesjonalne Usługi", titleAccent: "Dla Twojego Biznesu", subtitle: "Oferujemy kompleksowe rozwiązania dopasowane do Twoich potrzeb. Skontaktuj się z nami i przekonaj się sam.", cta: "Zobacz usługi", chatCta: "Porozmawiaj z nami" },
  services: { title: "Nasze Usługi", subtitle: "Sprawdź naszą ofertę i wybierz rozwiązanie idealne dla Ciebie.", chatAbout: "Zapytaj o to", details: "Szczegóły", priceFrom: "Od", close: "Zamknij", allCategories: "Wszystkie" },
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
  footer: { rights: "Wszelkie prawa zastrzeżone.", description: "Profesjonalne usługi dla Twojego biznesu." },
};

const en: TranslationShape = {
  nav: { home: "Home", services: "Services", contact: "Contact", admin: "Admin Panel" },
  hero: { title: "Professional Services", titleAccent: "For Your Business", subtitle: "We offer comprehensive solutions tailored to your needs. Get in touch and see for yourself.", cta: "View Services", chatCta: "Chat With Us" },
  services: { title: "Our Services", subtitle: "Browse our offer and find the perfect solution for you.", chatAbout: "Ask about this", details: "Details", priceFrom: "From", close: "Close", allCategories: "All" },
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
  footer: { rights: "All rights reserved.", description: "Professional services for your business." },
};

const de: TranslationShape = {
  nav: { home: "Startseite", services: "Dienstleistungen", contact: "Kontakt", admin: "Admin-Bereich" },
  hero: { title: "Professionelle Dienstleistungen", titleAccent: "Für Ihr Unternehmen", subtitle: "Wir bieten umfassende Lösungen, die auf Ihre Bedürfnisse zugeschnitten sind.", cta: "Leistungen ansehen", chatCta: "Mit uns chatten" },
  services: { title: "Unsere Leistungen", subtitle: "Entdecken Sie unser Angebot und finden Sie die perfekte Lösung.", chatAbout: "Fragen Sie dazu", details: "Details", priceFrom: "Ab", close: "Schließen", allCategories: "Alle" },
  contact: { title: "Kontaktieren Sie uns", subtitle: "Haben Sie Fragen? Senden Sie uns eine Nachricht.", name: "Vollständiger Name", email: "E-Mail-Adresse", message: "Nachricht", send: "Nachricht senden", sent: "Nachricht gesendet!", phone: "Telefon", address: "Adresse" },
  chat: { title: "Live-Chat", placeholder: "Nachricht eingeben...", send: "Senden", greeting: "Hallo! Wie können wir Ihnen helfen?", serviceContext: "Frage zum Service:", namePrompt: "Geben Sie Ihre Daten ein:", namePlaceholder: "Ihr Name...", emailPlaceholder: "Ihre E-Mail...", nameSubmit: "Chat starten", translateAll: "Nachrichten übersetzen", showOriginal: "Original anzeigen" },
  admin: { login: "Anmelden", username: "Benutzername", password: "Passwort", signIn: "Einloggen", dashboard: "Admin-Dashboard", chats: "Chats", servicesManage: "Leistungen verwalten", noChats: "Keine aktiven Chats", deleteChat: "Chat löschen", addService: "Leistung hinzufügen", editService: "Bearbeiten", deleteService: "Löschen", logout: "Abmelden", addCategory: "Kategorie hinzufügen", editCategory: "Kategorie bearbeiten", deleteCategory: "Löschen", categories: "Kategorien", saveService: "Leistung speichern", saveCategory: "Kategorie speichern", renameChat: "Umbenennen", chatTitle: "Chat-Titel", chatUser: "Benutzer", chatEmail: "E-Mail", imageUrl: "Bild-URL", uploadImage: "Bild hochladen", priceRange: "Preisbereich", category: "Kategorie", titleField: "Titel", descriptionField: "Beschreibung", languageTab: "Sprache", cancel: "Abbrechen", save: "Speichern", noServices: "Keine Leistungen", noCategories: "Keine Kategorien", statistics: "Statistiken", visits: "Website-Besuche", chatsByService: "Chats nach Service", timeRange: "Zeitraum", week: "Woche", month: "Monat", halfYear: "Halbjahr", year: "Jahr", filterAll: "Alle", noData: "Keine Daten" },
  footer: { rights: "Alle Rechte vorbehalten.", description: "Professionelle Dienstleistungen für Ihr Unternehmen." },
};

const fr: TranslationShape = {
  nav: { home: "Accueil", services: "Services", contact: "Contact", admin: "Panneau admin" },
  hero: { title: "Services Professionnels", titleAccent: "Pour Votre Entreprise", subtitle: "Nous proposons des solutions complètes adaptées à vos besoins.", cta: "Voir les services", chatCta: "Discuter avec nous" },
  services: { title: "Nos Services", subtitle: "Parcourez notre offre et trouvez la solution parfaite.", chatAbout: "Poser une question", details: "Détails", priceFrom: "À partir de", close: "Fermer", allCategories: "Tous" },
  contact: { title: "Contactez-nous", subtitle: "Des questions ? Envoyez-nous un message.", name: "Nom complet", email: "Adresse e-mail", message: "Message", send: "Envoyer", sent: "Message envoyé !", phone: "Téléphone", address: "Adresse" },
  chat: { title: "Chat en direct", placeholder: "Écrire un message...", send: "Envoyer", greeting: "Bonjour ! Comment pouvons-nous vous aider ?", serviceContext: "Question sur le service :", namePrompt: "Entrez vos coordonnées :", namePlaceholder: "Votre nom...", emailPlaceholder: "Votre e-mail...", nameSubmit: "Démarrer le chat", translateAll: "Traduire les messages", showOriginal: "Afficher les originaux" },
  admin: { login: "Connexion", username: "Utilisateur", password: "Mot de passe", signIn: "Se connecter", dashboard: "Tableau de bord", chats: "Chats", servicesManage: "Gérer les services", noChats: "Aucun chat actif", deleteChat: "Supprimer", addService: "Ajouter un service", editService: "Modifier", deleteService: "Supprimer", logout: "Déconnexion", addCategory: "Ajouter une catégorie", editCategory: "Modifier la catégorie", deleteCategory: "Supprimer", categories: "Catégories", saveService: "Enregistrer", saveCategory: "Enregistrer", renameChat: "Renommer", chatTitle: "Titre du chat", chatUser: "Utilisateur", chatEmail: "E-mail", imageUrl: "URL de l'image", uploadImage: "Télécharger", priceRange: "Fourchette de prix", category: "Catégorie", titleField: "Titre", descriptionField: "Description", languageTab: "Langue", cancel: "Annuler", save: "Enregistrer", noServices: "Aucun service", noCategories: "Aucune catégorie", statistics: "Statistiques", visits: "Visites du site", chatsByService: "Chats par service", timeRange: "Période", week: "Semaine", month: "Mois", halfYear: "Semestre", year: "Année", filterAll: "Tous", noData: "Aucune donnée" },
  footer: { rights: "Tous droits réservés.", description: "Services professionnels pour votre entreprise." },
};

const es: TranslationShape = {
  nav: { home: "Inicio", services: "Servicios", contact: "Contacto", admin: "Panel admin" },
  hero: { title: "Servicios Profesionales", titleAccent: "Para Su Negocio", subtitle: "Ofrecemos soluciones integrales adaptadas a sus necesidades.", cta: "Ver servicios", chatCta: "Chatear con nosotros" },
  services: { title: "Nuestros Servicios", subtitle: "Explore nuestra oferta y encuentre la solución perfecta.", chatAbout: "Preguntar", details: "Detalles", priceFrom: "Desde", close: "Cerrar", allCategories: "Todos" },
  contact: { title: "Contáctenos", subtitle: "¿Tiene preguntas? Envíenos un mensaje.", name: "Nombre completo", email: "Correo electrónico", message: "Mensaje", send: "Enviar", sent: "¡Mensaje enviado!", phone: "Teléfono", address: "Dirección" },
  chat: { title: "Chat en vivo", placeholder: "Escribir mensaje...", send: "Enviar", greeting: "¡Hola! ¿Cómo podemos ayudarle?", serviceContext: "Pregunta sobre el servicio:", namePrompt: "Ingrese sus datos para comenzar:", namePlaceholder: "Su nombre...", emailPlaceholder: "Su correo...", nameSubmit: "Iniciar chat", translateAll: "Traducir mensajes", showOriginal: "Mostrar originales" },
  admin: { login: "Iniciar sesión", username: "Usuario", password: "Contraseña", signIn: "Entrar", dashboard: "Panel de control", chats: "Chats", servicesManage: "Gestionar servicios", noChats: "Sin chats activos", deleteChat: "Eliminar", addService: "Añadir servicio", editService: "Editar", deleteService: "Eliminar", logout: "Cerrar sesión", addCategory: "Añadir categoría", editCategory: "Editar categoría", deleteCategory: "Eliminar", categories: "Categorías", saveService: "Guardar", saveCategory: "Guardar", renameChat: "Renombrar", chatTitle: "Título del chat", chatUser: "Usuario", chatEmail: "E-mail", imageUrl: "URL de imagen", uploadImage: "Subir imagen", priceRange: "Rango de precios", category: "Categoría", titleField: "Título", descriptionField: "Descripción", languageTab: "Idioma", cancel: "Cancelar", save: "Guardar", noServices: "Sin servicios", noCategories: "Sin categorías", statistics: "Estadísticas", visits: "Visitas al sitio", chatsByService: "Chats por servicio", timeRange: "Período", week: "Semana", month: "Mes", halfYear: "Semestre", year: "Año", filterAll: "Todos", noData: "Sin datos" },
  footer: { rights: "Todos los derechos reservados.", description: "Servicios profesionales para su negocio." },
};

const it: TranslationShape = {
  nav: { home: "Home", services: "Servizi", contact: "Contatti", admin: "Pannello admin" },
  hero: { title: "Servizi Professionali", titleAccent: "Per la Tua Azienda", subtitle: "Offriamo soluzioni complete su misura per le tue esigenze.", cta: "Vedi i servizi", chatCta: "Chatta con noi" },
  services: { title: "I Nostri Servizi", subtitle: "Scopri la nostra offerta e trova la soluzione perfetta.", chatAbout: "Chiedi info", details: "Dettagli", priceFrom: "Da", close: "Chiudi", allCategories: "Tutti" },
  contact: { title: "Contattaci", subtitle: "Hai domande? Inviaci un messaggio.", name: "Nome completo", email: "Indirizzo e-mail", message: "Messaggio", send: "Invia", sent: "Messaggio inviato!", phone: "Telefono", address: "Indirizzo" },
  chat: { title: "Chat dal vivo", placeholder: "Scrivi un messaggio...", send: "Invia", greeting: "Ciao! Come possiamo aiutarti?", serviceContext: "Domanda sul servizio:", namePrompt: "Inserisci i tuoi dati per iniziare:", namePlaceholder: "Il tuo nome...", emailPlaceholder: "La tua email...", nameSubmit: "Inizia chat", translateAll: "Traduci messaggi", showOriginal: "Mostra originali" },
  admin: { login: "Accesso", username: "Utente", password: "Password", signIn: "Accedi", dashboard: "Dashboard", chats: "Chat", servicesManage: "Gestisci servizi", noChats: "Nessuna chat attiva", deleteChat: "Elimina", addService: "Aggiungi servizio", editService: "Modifica", deleteService: "Elimina", logout: "Esci", addCategory: "Aggiungi categoria", editCategory: "Modifica categoria", deleteCategory: "Elimina", categories: "Categorie", saveService: "Salva", saveCategory: "Salva", renameChat: "Rinomina", chatTitle: "Titolo chat", chatUser: "Utente", chatEmail: "E-mail", imageUrl: "URL immagine", uploadImage: "Carica immagine", priceRange: "Fascia di prezzo", category: "Categoria", titleField: "Titolo", descriptionField: "Descrizione", languageTab: "Lingua", cancel: "Annulla", save: "Salva", noServices: "Nessun servizio", noCategories: "Nessuna categoria", statistics: "Statistiche", visits: "Visite al sito", chatsByService: "Chat per servizio", timeRange: "Periodo", week: "Settimana", month: "Mese", halfYear: "Semestre", year: "Anno", filterAll: "Tutti", noData: "Nessun dato" },
  footer: { rights: "Tutti i diritti riservati.", description: "Servizi professionali per la tua azienda." },
};

const pt: TranslationShape = {
  nav: { home: "Início", services: "Serviços", contact: "Contacto", admin: "Painel admin" },
  hero: { title: "Serviços Profissionais", titleAccent: "Para o Seu Negócio", subtitle: "Oferecemos soluções abrangentes adaptadas às suas necessidades.", cta: "Ver serviços", chatCta: "Fale connosco" },
  services: { title: "Os Nossos Serviços", subtitle: "Explore a nossa oferta e encontre a solução perfeita.", chatAbout: "Perguntar", details: "Detalhes", priceFrom: "Desde", close: "Fechar", allCategories: "Todos" },
  contact: { title: "Contacte-nos", subtitle: "Tem perguntas? Envie-nos uma mensagem.", name: "Nome completo", email: "E-mail", message: "Mensagem", send: "Enviar", sent: "Mensagem enviada!", phone: "Telefone", address: "Morada" },
  chat: { title: "Chat ao vivo", placeholder: "Escrever mensagem...", send: "Enviar", greeting: "Olá! Como podemos ajudar?", serviceContext: "Pergunta sobre o serviço:", namePrompt: "Insira os seus dados para começar:", namePlaceholder: "O seu nome...", emailPlaceholder: "O seu e-mail...", nameSubmit: "Iniciar chat", translateAll: "Traduzir mensagens", showOriginal: "Mostrar originais" },
  admin: { login: "Entrar", username: "Utilizador", password: "Senha", signIn: "Entrar", dashboard: "Painel de controlo", chats: "Chats", servicesManage: "Gerir serviços", noChats: "Sem chats ativos", deleteChat: "Eliminar", addService: "Adicionar serviço", editService: "Editar", deleteService: "Eliminar", logout: "Sair", addCategory: "Adicionar categoria", editCategory: "Editar categoria", deleteCategory: "Eliminar", categories: "Categorias", saveService: "Guardar", saveCategory: "Guardar", renameChat: "Renomear", chatTitle: "Título do chat", chatUser: "Utilizador", chatEmail: "E-mail", imageUrl: "URL da imagem", uploadImage: "Carregar imagem", priceRange: "Faixa de preço", category: "Categoria", titleField: "Título", descriptionField: "Descrição", languageTab: "Idioma", cancel: "Cancelar", save: "Guardar", noServices: "Sem serviços", noCategories: "Sem categorias", statistics: "Estatísticas", visits: "Visitas ao site", chatsByService: "Chats por serviço", timeRange: "Período", week: "Semana", month: "Mês", halfYear: "Semestre", year: "Ano", filterAll: "Todos", noData: "Sem dados" },
  footer: { rights: "Todos os direitos reservados.", description: "Serviços profissionais para o seu negócio." },
};

const nl: TranslationShape = {
  nav: { home: "Home", services: "Diensten", contact: "Contact", admin: "Beheer" },
  hero: { title: "Professionele Diensten", titleAccent: "Voor Uw Bedrijf", subtitle: "Wij bieden uitgebreide oplossingen op maat van uw behoeften.", cta: "Bekijk diensten", chatCta: "Chat met ons" },
  services: { title: "Onze Diensten", subtitle: "Ontdek ons aanbod en vind de perfecte oplossing.", chatAbout: "Stel een vraag", details: "Details", priceFrom: "Vanaf", close: "Sluiten", allCategories: "Alle" },
  contact: { title: "Neem Contact Op", subtitle: "Heeft u vragen? Stuur ons een bericht.", name: "Volledige naam", email: "E-mailadres", message: "Bericht", send: "Versturen", sent: "Bericht verzonden!", phone: "Telefoon", address: "Adres" },
  chat: { title: "Live Chat", placeholder: "Typ een bericht...", send: "Versturen", greeting: "Hallo! Hoe kunnen we u helpen?", serviceContext: "Vraag over dienst:", namePrompt: "Vul uw gegevens in om te beginnen:", namePlaceholder: "Uw naam...", emailPlaceholder: "Uw e-mail...", nameSubmit: "Start chat", translateAll: "Vertaal berichten", showOriginal: "Toon originelen" },
  admin: { login: "Inloggen", username: "Gebruikersnaam", password: "Wachtwoord", signIn: "Inloggen", dashboard: "Dashboard", chats: "Chats", servicesManage: "Diensten beheren", noChats: "Geen actieve chats", deleteChat: "Verwijderen", addService: "Dienst toevoegen", editService: "Bewerken", deleteService: "Verwijderen", logout: "Uitloggen", addCategory: "Categorie toevoegen", editCategory: "Categorie bewerken", deleteCategory: "Verwijderen", categories: "Categorieën", saveService: "Opslaan", saveCategory: "Opslaan", renameChat: "Hernoemen", chatTitle: "Chattitel", chatUser: "Gebruiker", chatEmail: "E-mail", imageUrl: "Afbeelding URL", uploadImage: "Afbeelding uploaden", priceRange: "Prijsklasse", category: "Categorie", titleField: "Titel", descriptionField: "Beschrijving", languageTab: "Taal", cancel: "Annuleren", save: "Opslaan", noServices: "Geen diensten", noCategories: "Geen categorieën", statistics: "Statistieken", visits: "Websitebezoeken", chatsByService: "Chats per dienst", timeRange: "Periode", week: "Week", month: "Maand", halfYear: "Halfjaar", year: "Jaar", filterAll: "Alle", noData: "Geen gegevens" },
  footer: { rights: "Alle rechten voorbehouden.", description: "Professionele diensten voor uw bedrijf." },
};

const cs: TranslationShape = {
  nav: { home: "Domů", services: "Služby", contact: "Kontakt", admin: "Administrace" },
  hero: { title: "Profesionální Služby", titleAccent: "Pro Vaše Podnikání", subtitle: "Nabízíme komplexní řešení přizpůsobená vašim potřebám.", cta: "Zobrazit služby", chatCta: "Chatujte s námi" },
  services: { title: "Naše Služby", subtitle: "Prozkoumejte naši nabídku a najděte ideální řešení.", chatAbout: "Zeptat se", details: "Detaily", priceFrom: "Od", close: "Zavřít", allCategories: "Vše" },
  contact: { title: "Kontaktujte nás", subtitle: "Máte otázky? Napište nám.", name: "Celé jméno", email: "E-mail", message: "Zpráva", send: "Odeslat", sent: "Zpráva odeslána!", phone: "Telefon", address: "Adresa" },
  chat: { title: "Živý chat", placeholder: "Napište zprávu...", send: "Odeslat", greeting: "Ahoj! Jak vám můžeme pomoci?", serviceContext: "Dotaz ke službě:", namePrompt: "Zadejte své údaje pro zahájení:", namePlaceholder: "Vaše jméno...", emailPlaceholder: "Váš e-mail...", nameSubmit: "Zahájit chat", translateAll: "Přeložit zprávy", showOriginal: "Zobrazit originály" },
  admin: { login: "Přihlášení", username: "Uživatel", password: "Heslo", signIn: "Přihlásit", dashboard: "Administrace", chats: "Chaty", servicesManage: "Správa služeb", noChats: "Žádné aktivní chaty", deleteChat: "Smazat", addService: "Přidat službu", editService: "Upravit", deleteService: "Smazat", logout: "Odhlásit", addCategory: "Přidat kategorii", editCategory: "Upravit kategorii", deleteCategory: "Smazat", categories: "Kategorie", saveService: "Uložit", saveCategory: "Uložit", renameChat: "Přejmenovat", chatTitle: "Název chatu", chatUser: "Uživatel", chatEmail: "E-mail", imageUrl: "URL obrázku", uploadImage: "Nahrát obrázek", priceRange: "Cenové rozpětí", category: "Kategorie", titleField: "Název", descriptionField: "Popis", languageTab: "Jazyk", cancel: "Zrušit", save: "Uložit", noServices: "Žádné služby", noCategories: "Žádné kategorie", statistics: "Statistiky", visits: "Návštěvy webu", chatsByService: "Chaty dle služby", timeRange: "Období", week: "Týden", month: "Měsíc", halfYear: "Půl roku", year: "Rok", filterAll: "Vše", noData: "Žádná data" },
  footer: { rights: "Všechna práva vyhrazena.", description: "Profesionální služby pro vaše podnikání." },
};

const ro: TranslationShape = {
  nav: { home: "Acasă", services: "Servicii", contact: "Contact", admin: "Panou admin" },
  hero: { title: "Servicii Profesionale", titleAccent: "Pentru Afacerea Ta", subtitle: "Oferim soluții complete adaptate nevoilor dumneavoastră.", cta: "Vezi serviciile", chatCta: "Discută cu noi" },
  services: { title: "Serviciile Noastre", subtitle: "Explorați oferta noastră și găsiți soluția perfectă.", chatAbout: "Întreabă", details: "Detalii", priceFrom: "De la", close: "Închide", allCategories: "Toate" },
  contact: { title: "Contactați-ne", subtitle: "Aveți întrebări? Trimiteți-ne un mesaj.", name: "Nume complet", email: "E-mail", message: "Mesaj", send: "Trimite", sent: "Mesaj trimis!", phone: "Telefon", address: "Adresă" },
  chat: { title: "Chat live", placeholder: "Scrieți un mesaj...", send: "Trimite", greeting: "Bună! Cum vă putem ajuta?", serviceContext: "Întrebare despre serviciu:", namePrompt: "Introduceți datele pentru a începe:", namePlaceholder: "Numele dvs...", emailPlaceholder: "Email-ul dvs...", nameSubmit: "Începe chat", translateAll: "Traduce mesajele", showOriginal: "Arată originalele" },
  admin: { login: "Autentificare", username: "Utilizator", password: "Parolă", signIn: "Conectare", dashboard: "Panou de control", chats: "Chaturi", servicesManage: "Gestionare servicii", noChats: "Niciun chat activ", deleteChat: "Șterge", addService: "Adaugă serviciu", editService: "Editează", deleteService: "Șterge", logout: "Deconectare", addCategory: "Adaugă categorie", editCategory: "Editează categoria", deleteCategory: "Șterge", categories: "Categorii", saveService: "Salvează", saveCategory: "Salvează", renameChat: "Redenumește", chatTitle: "Titlul chatului", chatUser: "Utilizator", chatEmail: "E-mail", imageUrl: "URL imagine", uploadImage: "Încarcă imagine", priceRange: "Interval preț", category: "Categorie", titleField: "Titlu", descriptionField: "Descriere", languageTab: "Limbă", cancel: "Anulează", save: "Salvează", noServices: "Niciun serviciu", noCategories: "Nicio categorie", statistics: "Statistici", visits: "Vizite pe site", chatsByService: "Chaturi pe serviciu", timeRange: "Perioadă", week: "Săptămână", month: "Lună", halfYear: "Semestru", year: "An", filterAll: "Toate", noData: "Fără date" },
  footer: { rights: "Toate drepturile rezervate.", description: "Servicii profesionale pentru afacerea ta." },
};

const hu: TranslationShape = {
  nav: { home: "Főoldal", services: "Szolgáltatások", contact: "Kapcsolat", admin: "Admin panel" },
  hero: { title: "Professzionális Szolgáltatások", titleAccent: "Az Ön Vállalkozásának", subtitle: "Átfogó megoldásokat kínálunk az Ön igényeire szabva.", cta: "Szolgáltatások", chatCta: "Csevegjen velünk" },
  services: { title: "Szolgáltatásaink", subtitle: "Böngéssze kínálatunkat és találja meg a tökéletes megoldást.", chatAbout: "Kérdezzen", details: "Részletek", priceFrom: "Tól", close: "Bezárás", allCategories: "Összes" },
  contact: { title: "Kapcsolatfelvétel", subtitle: "Kérdése van? Küldjön nekünk üzenetet.", name: "Teljes név", email: "E-mail cím", message: "Üzenet", send: "Küldés", sent: "Üzenet elküldve!", phone: "Telefon", address: "Cím" },
  chat: { title: "Élő chat", placeholder: "Írjon üzenetet...", send: "Küldés", greeting: "Szia! Miben segíthetünk?", serviceContext: "Kérdés a szolgáltatásról:", namePrompt: "Adja meg adatait a kezdéshez:", namePlaceholder: "Az Ön neve...", emailPlaceholder: "Az Ön e-mailje...", nameSubmit: "Chat indítása", translateAll: "Üzenetek fordítása", showOriginal: "Eredetiek megjelenítése" },
  admin: { login: "Bejelentkezés", username: "Felhasználó", password: "Jelszó", signIn: "Belépés", dashboard: "Vezérlőpult", chats: "Csevegések", servicesManage: "Szolgáltatások kezelése", noChats: "Nincs aktív csevegés", deleteChat: "Törlés", addService: "Szolgáltatás hozzáadása", editService: "Szerkesztés", deleteService: "Törlés", logout: "Kijelentkezés", addCategory: "Kategória hozzáadása", editCategory: "Kategória szerkesztése", deleteCategory: "Törlés", categories: "Kategóriák", saveService: "Mentés", saveCategory: "Mentés", renameChat: "Átnevezés", chatTitle: "Chat címe", chatUser: "Felhasználó", chatEmail: "E-mail", imageUrl: "Kép URL", uploadImage: "Kép feltöltése", priceRange: "Árkategória", category: "Kategória", titleField: "Cím", descriptionField: "Leírás", languageTab: "Nyelv", cancel: "Mégse", save: "Mentés", noServices: "Nincs szolgáltatás", noCategories: "Nincs kategória", statistics: "Statisztikák", visits: "Weboldal látogatások", chatsByService: "Csevegések szolgáltatás szerint", timeRange: "Időszak", week: "Hét", month: "Hónap", halfYear: "Félév", year: "Év", filterAll: "Összes", noData: "Nincs adat" },
  footer: { rights: "Minden jog fenntartva.", description: "Professzionális szolgáltatások vállalkozása számára." },
};

const sv: TranslationShape = {
  nav: { home: "Hem", services: "Tjänster", contact: "Kontakt", admin: "Adminpanel" },
  hero: { title: "Professionella Tjänster", titleAccent: "För Ditt Företag", subtitle: "Vi erbjuder heltäckande lösningar anpassade efter dina behov.", cta: "Visa tjänster", chatCta: "Chatta med oss" },
  services: { title: "Våra Tjänster", subtitle: "Utforska vårt utbud och hitta den perfekta lösningen.", chatAbout: "Fråga om detta", details: "Detaljer", priceFrom: "Från", close: "Stäng", allCategories: "Alla" },
  contact: { title: "Kontakta Oss", subtitle: "Har du frågor? Skicka oss ett meddelande.", name: "Fullständigt namn", email: "E-postadress", message: "Meddelande", send: "Skicka", sent: "Meddelande skickat!", phone: "Telefon", address: "Adress" },
  chat: { title: "Livechatt", placeholder: "Skriv ett meddelande...", send: "Skicka", greeting: "Hej! Hur kan vi hjälpa dig?", serviceContext: "Fråga om tjänst:", namePrompt: "Ange dina uppgifter för att börja:", namePlaceholder: "Ditt namn...", emailPlaceholder: "Din e-post...", nameSubmit: "Starta chatt", translateAll: "Översätt meddelanden", showOriginal: "Visa original" },
  admin: { login: "Logga in", username: "Användarnamn", password: "Lösenord", signIn: "Logga in", dashboard: "Kontrollpanel", chats: "Chattar", servicesManage: "Hantera tjänster", noChats: "Inga aktiva chattar", deleteChat: "Ta bort", addService: "Lägg till tjänst", editService: "Redigera", deleteService: "Ta bort", logout: "Logga ut", addCategory: "Lägg till kategori", editCategory: "Redigera kategori", deleteCategory: "Ta bort", categories: "Kategorier", saveService: "Spara", saveCategory: "Spara", renameChat: "Byt namn", chatTitle: "Chattitel", chatUser: "Användare", chatEmail: "E-post", imageUrl: "Bild-URL", uploadImage: "Ladda upp bild", priceRange: "Prisklass", category: "Kategori", titleField: "Titel", descriptionField: "Beskrivning", languageTab: "Språk", cancel: "Avbryt", save: "Spara", noServices: "Inga tjänster", noCategories: "Inga kategorier", statistics: "Statistik", visits: "Webbplatsbesök", chatsByService: "Chattar per tjänst", timeRange: "Tidsperiod", week: "Vecka", month: "Månad", halfYear: "Halvår", year: "År", filterAll: "Alla", noData: "Ingen data" },
  footer: { rights: "Alla rättigheter förbehållna.", description: "Professionella tjänster för ditt företag." },
};

export const translations = { pl, en, de, fr, es, it, pt, nl, cs, ro, hu, sv } as const;
export type Translations = TranslationShape;
