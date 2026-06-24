-- Migration 003: seed production services from the live backup (briefservice_backup.sql).
-- Run AFTER 001 + 002, on a DB cleared of content (chats + admins kept).
-- Titles and body text are verbatim from the dump; only Markdown structure is added.
-- Idempotent: ON CONFLICT guards make it safe to re-run.

BEGIN;

-- Categories (verbatim from the dump; referenced by services + the homepage filter)
INSERT INTO categories (id, name_pl, name_en, name_uk, name_ru, name_cs, name_es, name_it, name_hu, name_ro, name_lt) VALUES ('370c82dd-4e25-4e6b-943a-523447890ff4', 'Brief', 'Brief', 'Brief', 'Brief', 'Brief', 'Brief', 'Brief', 'Brief', 'Brief', 'Brief') ON CONFLICT (id) DO NOTHING;
INSERT INTO categories (id, name_pl, name_en, name_uk, name_ru, name_cs, name_es, name_it, name_hu, name_ro, name_lt) VALUES ('cb214439-ec8b-4bd7-8443-ec54df21bb20', 'Zmiana DMC', 'GVW change', 'Зниження ДМЦ', 'Снижение ДМЦ', 'Snížení celkové hmotnosti', 'Reducción de MMA', 'Riduzione della MTT', 'GVM csökkentése', 'Schimbare MTMA', 'DLM keitimas') ON CONFLICT (id) DO NOTHING;
INSERT INTO categories (id, name_pl, name_en, name_uk, name_ru, name_cs, name_es, name_it, name_hu, name_ro, name_lt) VALUES ('a0cea2a0-16f1-4cd4-a28b-3b83d3937e9a', 'Zmiana rodzaju pojazdu', 'Change of vehicle type', 'Зміна типу транспортного засобу', 'Изменение типа транспортного средства', 'Změna druhu vozidla', 'Cambio de tipo de vehículo', 'Modifica della categoria del veicolo', 'Jármű típusának megváltoztatása', 'Schimbare tip vehicul', 'Transporto priemonės tipo keitimas') ON CONFLICT (id) DO NOTHING;
INSERT INTO categories (id, name_pl, name_en, name_uk, name_ru, name_cs, name_es, name_it, name_hu, name_ro, name_lt) VALUES ('5b04fe15-e731-47bd-9442-e775179b93fb', 'Rejestracja', 'Registration', 'Реєстрація', 'Регистрация', 'Registrace', 'Matriculación', 'Immatricolazione', 'Regisztráció', 'Înmatriculare', 'Registracija') ON CONFLICT (id) DO NOTHING;

-- zmiana-dmc-2500 :: Zmiana DMC w dół do 2500 kg (Dopuszczalna Masa Całkowita)
INSERT INTO services (id, category_id, image_url, slug, published, featured, sort_order) VALUES ('b9a55cf5-be16-4625-9f74-e22f413bb25e', 'cb214439-ec8b-4bd7-8443-ec54df21bb20', '/uploads/1772125685591-1sl4nh.jpg', 'zmiana-dmc-2500', true, true, 0) ON CONFLICT (slug) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'b9a55cf5-be16-4625-9f74-e22f413bb25e', 'pl', 'Zmiana DMC w dół do 2500 kg (Dopuszczalna Masa Całkowita)', 'Zmiana DMC w dół do 2500 kg (Dopuszczalna Masa Całkowita)', 'Zmiana DMC w dół do 2500 kg (Dopuszczalna Masa Całkowita)', 'Legalnie – w Niemczech - nowe Briefy - z wpisem do rejestru - brak problemów przy kontroli drogowej w UE!', 'Legalnie – w Niemczech - nowe Briefy - z wpisem do rejestru - brak problemów przy kontroli drogowej w UE!',
  'Legalnie – w Niemczech - nowe Briefy - z wpisem do rejestru - brak problemów przy kontroli drogowej w UE!

- dla transportu międzynarodowego lekkiego / pilnego

## Zakres usługi

- obniżenie DMC pojazdu do 2500 kg,
- wykonywane przez uprawniony instytut techniczny w Niemczech, przed wprowadzeniem pojazdu do Polski,
- kompleksowe przygotowanie pojazdu i pełna dokumentacja techniczna,
- rejestracja pojazdu w Niemczech po obniżeniu DMC.

## Efekt dla właściciela

- komplet nowych niemieckich dokumentów (Brief Teil I i II) z DMC = 2500 kg,
- nowa tabliczka znamionowa z naniesionymi nowymi masami,
- dokumenty honorowane w całej Unii Europejskiej, możliwość przerejestrowania w Polsce lub w każdym kraju UE.

Oferta szczególnie korzystna od 1 lipca 2026 r. dla firm, które potrzebują elastyczności w transporcie międzynarodowym.

## Dla kogo jest ta usługa

- pojazdy, które nie potrzebują DMC 2,5–3,5 t,
- lekkie, pilne i wrażliwe ładunki,
- gdy liczy się czas, elastyczność i jazda bez przestojów.

## Przykłady zastosowań

- transport leków i materiałów farmaceutycznych,
- wyroby medyczne i biologiczne,
- części krytyczne (automotive, AOG, przemysł),
- elektronika i komponenty o wysokiej wartości,
- przesyłki time-critical / just-in-time.

Usługa dostępna wyłącznie dla pojazdów, które technicznie kwalifikują się do obniżenia DMC – każdy przypadek jest indywidualnie weryfikowany.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'b9a55cf5-be16-4625-9f74-e22f413bb25e', 'en', 'Reduction of GVW down to 2500 kg (gross vehicle weight)', 'Reduction of GVW down to 2500 kg (gross vehicle weight)', 'Reduction of GVW down to 2500 kg (gross vehicle weight)', 'Legally, in Germany – ideal for light or urgent international transport.', 'Legally, in Germany – ideal for light or urgent international transport.',
  'Legally, in Germany – ideal for light or urgent international transport.

## Scope of service

- reduction of the vehicle''s GVW to 2500 kg,
- carried out by an authorised technical institute in Germany, before the vehicle is imported to Poland,
- comprehensive vehicle preparation and full technical documentation,
- vehicle registration in Germany after GVW reduction.

## Benefits for the owner

- a complete set of new German documents (Brief Teil I and II) with GVW = 2500 kg,
- new nameplate with updated weight data,
- documents recognised throughout the European Union, possibility of re-registration in Poland or any EU country.

Offer particularly advantageous from 1 July 2026 for companies that need flexibility in international transport.

## Who this service is for

- vehicles that do not require a GVW of 2.5–3.5 t,
- light, urgent and sensitive cargo,
- when time, flexibility and uninterrupted driving matter.

## Examples of applications

- transport of medicines and pharmaceutical materials,
- medical and biological products,
- critical parts (automotive, AOG, industry),
- electronics and high-value components,
- time-critical / just-in-time shipments.

Service available exclusively for vehicles that technically qualify for GVW reduction – each case is individually verified.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'b9a55cf5-be16-4625-9f74-e22f413bb25e', 'uk', 'Зниження ДМЦ до 2500 кг (допустима повна маса)', 'Зниження ДМЦ до 2500 кг (допустима повна маса)', 'Зниження ДМЦ до 2500 кг (допустима повна маса)', 'Законно, у Німеччині – ідеально для легкого або термінового міжнародного транспорту.', 'Законно, у Німеччині – ідеально для легкого або термінового міжнародного транспорту.',
  'Законно, у Німеччині – ідеально для легкого або термінового міжнародного транспорту.

## Обсяг послуги

- зниження ДМЦ транспортного засобу до 2500 кг,
- виконується уповноваженим технічним інститутом у Німеччині до ввезення транспортного засобу в Польщу,
- комплексна підготовка транспортного засобу та повна технічна документація,
- реєстрація транспортного засобу в Німеччині після зниження ДМЦ.

## Переваги для власника

- повний комплект нових німецьких документів (Brief Teil I і II) з ДМЦ = 2500 кг,
- нова заводська табличка з оновленими даними про масу,
- документи визнаються у всьому Європейському Союзі, можливість перереєстрації в Польщі або будь-якій країні ЄС.

Пропозиція особливо вигідна з 1 липня 2026 р. для компаній, яким потрібна гнучкість у міжнародних перевезеннях.

## Для кого ця послуга

- транспортні засоби, яким не потрібен ДМЦ 2,5–3,5 т,
- легкі, термінові та чутливі вантажі,
- коли важливий час, гнучкість і їзда без простоїв.

## Приклади застосування

- перевезення ліків та фармацевтичних матеріалів,
- медичні та біологічні вироби,
- критичні запчастини (automotive, AOG, промисловість),
- електроніка та компоненти високої вартості,
- відправлення time-critical / just-in-time.

Послуга доступна виключно для транспортних засобів, які технічно кваліфікуються для зниження ДМЦ – кожен випадок перевіряється індивідуально.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'b9a55cf5-be16-4625-9f74-e22f413bb25e', 'ru', 'Снижение ДМЦ до 2500 кг (допустимая полная масса)', 'Снижение ДМЦ до 2500 кг (допустимая полная масса)', 'Снижение ДМЦ до 2500 кг (допустимая полная масса)', 'Законно, в Германии – идеально для лёгкого или срочного международного транспорта.', 'Законно, в Германии – идеально для лёгкого или срочного международного транспорта.',
  'Законно, в Германии – идеально для лёгкого или срочного международного транспорта.

## Объём услуги

- снижение ДМЦ транспортного средства до 2500 кг,
- выполняется уполномоченным техническим институтом в Германии до ввоза транспортного средства в Польшу,
- комплексная подготовка транспортного средства и полная техническая документация,
- регистрация транспортного средства в Германии после снижения ДМЦ.

## Преимущества для владельца

- полный комплект новых немецких документов (Brief Teil I и II) с ДМЦ = 2500 кг,
- новая заводская табличка с обновлёнными данными о массе,
- документы признаются во всём Европейском Союзе, возможность перерегистрации в Польше или любой стране ЕС.

Предложение особенно выгодно с 1 июля 2026 г. для компаний, которым необходима гибкость в международных перевозках.

## Для кого эта услуга

- транспортные средства, которым не требуется ДМЦ 2,5–3,5 т,
- лёгкие, срочные и чувствительные грузы,
- когда важны время, гибкость и езда без простоев.

## Примеры применения

- перевозка лекарств и фармацевтических материалов,
- медицинские и биологические изделия,
- критические запчасти (automotive, AOG, промышленность),
- электроника и компоненты высокой стоимости,
- отправления time-critical / just-in-time.

Услуга доступна исключительно для транспортных средств, которые технически квалифицируются для снижения ДМЦ – каждый случай проверяется индивидуально.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'b9a55cf5-be16-4625-9f74-e22f413bb25e', 'cs', 'Snížení celkové hmotnosti vozidla na 2500 kg (přípustná celková hmotnost)', 'Snížení celkové hmotnosti vozidla na 2500 kg (přípustná celková hmotnost)', 'Snížení celkové hmotnosti vozidla na 2500 kg (přípustná celková hmotnost)', 'Legálně, v Německu – ideální pro lehkou nebo naléhavou mezinárodní přepravu.', 'Legálně, v Německu – ideální pro lehkou nebo naléhavou mezinárodní přepravu.',
  'Legálně, v Německu – ideální pro lehkou nebo naléhavou mezinárodní přepravu.

## Rozsah služby

- snížení celkové přípustné hmotnosti vozidla na 2500 kg,
- provádí oprávněný technický institut v Německu před dovozem vozidla do Polska,
- komplexní příprava vozidla a úplná technická dokumentace,
- registrace vozidla v Německu po snížení celkové hmotnosti.

## Přínos pro majitele

- kompletní sada nových německých dokladů (Brief Teil I a II) s celkovou hmotností = 2500 kg,
- nový výrobní štítek s aktualizovanými údaji o hmotnosti,
- doklady uznávané v celé Evropské unii, možnost přeregistrace v Polsku nebo v jakékoli zemi EU.

Nabídka zvláště výhodná od 1. července 2026 pro společnosti, které potřebují flexibilitu v mezinárodní přepravě.

## Pro koho je tato služba

- vozidla, která nepotřebují celkovou hmotnost 2,5–3,5 t,
- lehké, naléhavé a citlivé náklady,
- když záleží na čase, flexibilitě a jízdě bez prostojů.

## Příklady použití

- přeprava léků a farmaceutických materiálů,
- zdravotnické a biologické výrobky,
- kritické díly (automotive, AOG, průmysl),
- elektronika a komponenty s vysokou hodnotou,
- zásilky time-critical / just-in-time.

Služba dostupná výhradně pro vozidla, která technicky splňují podmínky pro snížení celkové hmotnosti – každý případ je individuálně ověřován.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'b9a55cf5-be16-4625-9f74-e22f413bb25e', 'es', 'Reducción del MMA hasta 2500 kg (masa máxima autorizada)', 'Reducción del MMA hasta 2500 kg (masa máxima autorizada)', 'Reducción del MMA hasta 2500 kg (masa máxima autorizada)', 'Legalmente, en Alemania – ideal para el transporte internacional ligero o urgente.', 'Legalmente, en Alemania – ideal para el transporte internacional ligero o urgente.',
  'Legalmente, en Alemania – ideal para el transporte internacional ligero o urgente.

## Alcance del servicio

- reducción de la MMA del vehículo a 2500 kg,
- realizada por un instituto técnico autorizado en Alemania, antes de la introducción del vehículo en Polonia,
- preparación integral del vehículo y documentación técnica completa,
- matriculación del vehículo en Alemania tras la reducción de la MMA.

## Beneficios para el propietario

- conjunto completo de nuevos documentos alemanes (Brief Teil I y II) con MMA = 2500 kg,
- nueva placa de características con los datos de masa actualizados,
- documentos reconocidos en toda la Unión Europea, posibilidad de nueva matriculación en Polonia o en cualquier país de la UE.

Oferta especialmente ventajosa a partir del 1 de julio de 2026 para empresas que necesitan flexibilidad en el transporte internacional.

## A quién va dirigido este servicio

- vehículos que no necesitan una MMA de 2,5–3,5 t,
- cargas ligeras, urgentes y sensibles,
- cuando importan el tiempo, la flexibilidad y la conducción sin interrupciones.

## Ejemplos de aplicación

- transporte de medicamentos y materiales farmacéuticos,
- productos médicos y biológicos,
- piezas críticas (automoción, AOG, industria),
- electrónica y componentes de alto valor,
- envíos time-critical / just-in-time.

Servicio disponible exclusivamente para vehículos que técnicamente cumplen los requisitos para la reducción de la MMA – cada caso se verifica individualmente.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'b9a55cf5-be16-4625-9f74-e22f413bb25e', 'it', 'Riduzione della MTT a 2500 kg (massa totale a terra)', 'Riduzione della MTT a 2500 kg (massa totale a terra)', 'Riduzione della MTT a 2500 kg (massa totale a terra)', 'Legalmente, in Germania – ideale per il trasporto internazionale leggero o urgente.', 'Legalmente, in Germania – ideale per il trasporto internazionale leggero o urgente.',
  'Legalmente, in Germania – ideale per il trasporto internazionale leggero o urgente.

## Ambito del servizio

- riduzione della MTT del veicolo a 2500 kg,
- effettuata da un istituto tecnico autorizzato in Germania, prima dell''introduzione del veicolo in Polonia,
- preparazione completa del veicolo e documentazione tecnica integrale,
- immatricolazione del veicolo in Germania dopo la riduzione della MTT.

## Vantaggi per il proprietario

- set completo di nuovi documenti tedeschi (Brief Teil I e II) con MTT = 2500 kg,
- nuova targhetta di identificazione con i dati di massa aggiornati,
- documenti riconosciuti in tutta l''Unione Europea, possibilità di reimmatricolazione in Polonia o in qualsiasi paese UE.

Offerta particolarmente vantaggiosa dal 1° luglio 2026 per le aziende che necessitano di flessibilità nel trasporto internazionale.

## A chi è destinato questo servizio

- veicoli che non necessitano di una MTT di 2,5–3,5 t,
- carichi leggeri, urgenti e sensibili,
- quando contano il tempo, la flessibilità e la guida senza interruzioni.

## Esempi di applicazione

- trasporto di farmaci e materiali farmaceutici,
- prodotti medici e biologici,
- parti critiche (automotive, AOG, industria),
- elettronica e componenti di alto valore,
- spedizioni time-critical / just-in-time.

Servizio disponibile esclusivamente per veicoli che tecnicamente si qualificano per la riduzione della MTT – ogni caso è verificato individualmente.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'b9a55cf5-be16-4625-9f74-e22f413bb25e', 'hu', 'GVM csökkentése 2500 kg-ra (megengedett legnagyobb össztömeg)', 'GVM csökkentése 2500 kg-ra (megengedett legnagyobb össztömeg)', 'GVM csökkentése 2500 kg-ra (megengedett legnagyobb össztömeg)', 'Jogszerűen, Németországban – ideális könnyű vagy sürgős nemzetközi szállításhoz.', 'Jogszerűen, Németországban – ideális könnyű vagy sürgős nemzetközi szállításhoz.',
  'Jogszerűen, Németországban – ideális könnyű vagy sürgős nemzetközi szállításhoz.

## A szolgáltatás köre

- a jármű megengedett legnagyobb össztömegének csökkentése 2500 kg-ra,
- németországi felhatalmazott műszaki intézet végzi el, a jármű Lengyelországba történő behozatala előtt,
- átfogó járműelőkészítés és teljes körű műszaki dokumentáció,
- a jármű németországi regisztrációja a GVM csökkentése után.

## A tulajdonos számára jelentkező előnyök

- teljes körű új német dokumentumok (Brief Teil I és II) GVM = 2500 kg értékkel,
- új gyártói adattábla a frissített tömegadatokkal,
- az Európai Unió egész területén elismert dokumentumok, lehetőség a lengyelországi vagy bármely EU-s országban történő átregisztrációra.

Az ajánlat 2026. július 1-jétől különösen kedvező azoknak a cégeknek, amelyeknek rugalmasságra van szükségük a nemzetközi szállításban.

## Kinek szól ez a szolgáltatás

- járművek, amelyeknek nincs szükségük 2,5–3,5 t GVM-re,
- könnyű, sürgős és érzékeny rakományok,
- amikor az idő, a rugalmasság és a késedelem nélküli közlekedés számít.

## Alkalmazási példák

- gyógyszerek és gyógyszerészeti anyagok szállítása,
- orvosi és biológiai termékek,
- kritikus alkatrészek (automotive, AOG, ipar),
- elektronika és nagy értékű komponensek,
- time-critical / just-in-time küldemények.

A szolgáltatás kizárólag olyan járművek számára érhető el, amelyek műszakilag alkalmasak a GVM csökkentésére – minden esetet egyedileg ellenőrzünk.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'b9a55cf5-be16-4625-9f74-e22f413bb25e', 'ro', 'Reducere MTMA până la 2500 kg (masă totală maximă admisă)', 'Reducere MTMA până la 2500 kg (masă totală maximă admisă)', 'Reducere MTMA până la 2500 kg (masă totală maximă admisă)', 'Legal, în Germania – ideal pentru transportul internațional ușor sau urgent. Domeniul de aplicare: * reducerea MTMA a vehiculului la 2500 kg, * efectuată de un institut tehnic autorizat din Germania, înainte de introducerea vehiculului în Polonia, * pregătirea completă a vehiculului și documentație tehnică completă, * înmatricularea vehiculului în Germania după reducerea MTMA. Efect pentru proprietar: * set complet de documente germane noi (Brief Teil I și II) cu MTMA = 2500 kg, * nouă plăcuță indicatoare cu noile mase înscrise, * documente recunoscute în întreaga Uniune Europeană, posibilitatea reînmatriculării în Polonia sau în orice țară UE. Ofertă deosebit de avantajoasă de la 1 iulie 2026 pentru firmele care au nevoie de flexibilitate în transportul internațional. Pentru cine este acest serviciu: * vehicule care nu necesită MTMA 2,5–3,5 t, * încărcături ușoare, urgente și sensibile, * când contează timpul, flexibilitatea și condusul fără întreruperi. Exemple de utilizare: * transportul medicamentelor și al materialelor farmaceutice, * produse medicale și biologice, * piese critice (automotive, AOG, industrie), * electronice și componente de mare valoare, * trimiteri time-critical / just-in-time. Serviciu disponibil exclusiv pentru vehicule care se califică tehnic pentru reducerea MTMA – fiecare caz este verificat individual.', 'Legal, în Germania – ideal pentru transportul internațional ușor sau urgent. Domeniul de aplicare: * reducerea MTMA a vehiculului la 2500 kg, * efectuată de un institut tehnic autorizat din Germania, înainte de introducerea vehiculului în Polonia, * pregătirea completă a vehiculului și documentație tehnică completă, * înmatricularea vehiculului în Germania după reducerea MTMA. Efect pentru proprietar: * set complet de documente germane noi (Brief Teil I și II) cu MTMA = 2500 kg, * nouă plăcuță indicatoare cu noile mase înscrise, * documente recunoscute în întreaga Uniune Europeană, posibilitatea reînmatriculării în Polonia sau în orice țară UE. Ofertă deosebit de avantajoasă de la 1 iulie 2026 pentru firmele care au nevoie de flexibilitate în transportul internațional. Pentru cine este acest serviciu: * vehicule care nu necesită MTMA 2,5–3,5 t, * încărcături ușoare, urgente și sensibile, * când contează timpul, flexibilitatea și condusul fără întreruperi. Exemple de utilizare: * transportul medicamentelor și al materialelor farmaceutice, * produse medicale și biologice, * piese critice (automotive, AOG, industrie), * electronice și componente de mare valoare, * trimiteri time-critical / just-in-time. Serviciu disponibil exclusiv pentru vehicule care se califică tehnic pentru reducerea MTMA – fiecare caz este verificat individual.',
  'Legal, în Germania – ideal pentru transportul internațional ușor sau urgent. Domeniul de aplicare: * reducerea MTMA a vehiculului la 2500 kg, * efectuată de un institut tehnic autorizat din Germania, înainte de introducerea vehiculului în Polonia, * pregătirea completă a vehiculului și documentație tehnică completă, * înmatricularea vehiculului în Germania după reducerea MTMA. Efect pentru proprietar: * set complet de documente germane noi (Brief Teil I și II) cu MTMA = 2500 kg, * nouă plăcuță indicatoare cu noile mase înscrise, * documente recunoscute în întreaga Uniune Europeană, posibilitatea reînmatriculării în Polonia sau în orice țară UE. Ofertă deosebit de avantajoasă de la 1 iulie 2026 pentru firmele care au nevoie de flexibilitate în transportul internațional. Pentru cine este acest serviciu: * vehicule care nu necesită MTMA 2,5–3,5 t, * încărcături ușoare, urgente și sensibile, * când contează timpul, flexibilitatea și condusul fără întreruperi. Exemple de utilizare: * transportul medicamentelor și al materialelor farmaceutice, * produse medicale și biologice, * piese critice (automotive, AOG, industrie), * electronice și componente de mare valoare, * trimiteri time-critical / just-in-time. Serviciu disponibil exclusiv pentru vehicule care se califică tehnic pentru reducerea MTMA – fiecare caz este verificat individual.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'b9a55cf5-be16-4625-9f74-e22f413bb25e', 'lt', 'DLM sumažinimas iki 2500 kg (didžiausia leidžiama masė)', 'DLM sumažinimas iki 2500 kg (didžiausia leidžiama masė)', 'DLM sumažinimas iki 2500 kg (didžiausia leidžiama masė)', 'Teisėtai, Vokietijoje – idealus lengvam arba skubiam tarptautiniam transportui. Paslaugos apimtis: * transporto priemonės DLM sumažinimas iki 2500 kg, * atliekama įgaliotos techninės institucijos Vokietijoje, prieš įvežant transporto priemonę į Lenkiją, * pilnas transporto priemonės paruošimas ir visa techninė dokumentacija, * transporto priemonės registracija Vokietijoje po DLM sumažinimo. Poveikis savininkui: * pilnas naujų vokiškų dokumentų rinkinys (Brief Teil I ir II) su DLM = 2500 kg, * nauja identifikacinė plokštelė su naujomis masėmis, * dokumentai pripažįstami visoje Europos Sąjungoje, galimybė perregistruoti Lenkijoje ar bet kurioje ES šalyje. Pasiūlymas ypač naudingas nuo 2026 m. liepos 1 d. įmonėms, kurioms reikia lankstumo tarptautiniame transporte. Kam skirta ši paslauga: * transporto priemonės, kurioms nereikia 2,5–3,5 t DLM, * lengvi, skubūs ir jautrūs kroviniai, * kai svarbu laikas, lankstumas ir važiavimas be sustojimų. Naudojimo pavyzdžiai: * vaistų ir farmacinių medžiagų transportavimas, * medicinos ir biologiniai produktai, * kritinės dalys (automobilių, AOG, pramonė), * elektronika ir didelės vertės komponentai, * time-critical / just-in-time siuntos. Paslauga prieinama tik transporto priemonėms, kurios techniškai tinka DLM mažinimui – kiekvienas atvejis vertinamas individualiai.', 'Teisėtai, Vokietijoje – idealus lengvam arba skubiam tarptautiniam transportui. Paslaugos apimtis: * transporto priemonės DLM sumažinimas iki 2500 kg, * atliekama įgaliotos techninės institucijos Vokietijoje, prieš įvežant transporto priemonę į Lenkiją, * pilnas transporto priemonės paruošimas ir visa techninė dokumentacija, * transporto priemonės registracija Vokietijoje po DLM sumažinimo. Poveikis savininkui: * pilnas naujų vokiškų dokumentų rinkinys (Brief Teil I ir II) su DLM = 2500 kg, * nauja identifikacinė plokštelė su naujomis masėmis, * dokumentai pripažįstami visoje Europos Sąjungoje, galimybė perregistruoti Lenkijoje ar bet kurioje ES šalyje. Pasiūlymas ypač naudingas nuo 2026 m. liepos 1 d. įmonėms, kurioms reikia lankstumo tarptautiniame transporte. Kam skirta ši paslauga: * transporto priemonės, kurioms nereikia 2,5–3,5 t DLM, * lengvi, skubūs ir jautrūs kroviniai, * kai svarbu laikas, lankstumas ir važiavimas be sustojimų. Naudojimo pavyzdžiai: * vaistų ir farmacinių medžiagų transportavimas, * medicinos ir biologiniai produktai, * kritinės dalys (automobilių, AOG, pramonė), * elektronika ir didelės vertės komponentai, * time-critical / just-in-time siuntos. Paslauga prieinama tik transporto priemonėms, kurios techniškai tinka DLM mažinimui – kiekvienas atvejis vertinamas individualiai.',
  'Teisėtai, Vokietijoje – idealus lengvam arba skubiam tarptautiniam transportui. Paslaugos apimtis: * transporto priemonės DLM sumažinimas iki 2500 kg, * atliekama įgaliotos techninės institucijos Vokietijoje, prieš įvežant transporto priemonę į Lenkiją, * pilnas transporto priemonės paruošimas ir visa techninė dokumentacija, * transporto priemonės registracija Vokietijoje po DLM sumažinimo. Poveikis savininkui: * pilnas naujų vokiškų dokumentų rinkinys (Brief Teil I ir II) su DLM = 2500 kg, * nauja identifikacinė plokštelė su naujomis masėmis, * dokumentai pripažįstami visoje Europos Sąjungoje, galimybė perregistruoti Lenkijoje ar bet kurioje ES šalyje. Pasiūlymas ypač naudingas nuo 2026 m. liepos 1 d. įmonėms, kurioms reikia lankstumo tarptautiniame transporte. Kam skirta ši paslauga: * transporto priemonės, kurioms nereikia 2,5–3,5 t DLM, * lengvi, skubūs ir jautrūs kroviniai, * kai svarbu laikas, lankstumas ir važiavimas be sustojimų. Naudojimo pavyzdžiai: * vaistų ir farmacinių medžiagų transportavimas, * medicinos ir biologiniai produktai, * kritinės dalys (automobilių, AOG, pramonė), * elektronika ir didelės vertės komponentai, * time-critical / just-in-time siuntos. Paslauga prieinama tik transporto priemonėms, kurios techniškai tinka DLM mažinimui – kiekvienas atvejis vertinamas individualiai.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;

-- odzyskanie-briefu :: Zgubiłeś skradziono brakuje - mały, duży Brief? Wyrobimy nowe!
INSERT INTO services (id, category_id, image_url, slug, published, featured, sort_order) VALUES ('47c35ad1-48af-4e37-9994-d890cb2fc48c', '370c82dd-4e25-4e6b-943a-523447890ff4', '/uploads/1772125690930-5fv0jt.png', 'odzyskanie-briefu', true, false, 20) ON CONFLICT (slug) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  '47c35ad1-48af-4e37-9994-d890cb2fc48c', 'pl', 'Zgubiłeś skradziono brakuje - mały, duży Brief? Wyrobimy nowe!', 'Zgubiłeś skradziono brakuje - mały, duży Brief? Wyrobimy nowe!', 'Zgubiłeś skradziono brakuje - mały, duży Brief? Wyrobimy nowe!', 'Utraciłeś niemieckie dowody rejestracyjne? Nie martw się – zajmiemy się wszystkim za Ciebie!', 'Utraciłeś niemieckie dowody rejestracyjne? Nie martw się – zajmiemy się wszystkim za Ciebie!',
  'Utraciłeś niemieckie dowody rejestracyjne? Nie martw się – zajmiemy się wszystkim za Ciebie!

Oferujemy pełną obsługę procedury w niemieckich urzędach w Twoim imieniu, tak abyś szybko otrzymał nowe dokumenty.

## Czas realizacji

- Mały Brief – część I (duplikat): 1 tydzień – 1 miesiąc
- Duży Brief – część II (duplikat) lub zgoda na rejestrację w Polsce bez jego przedstawiania: ok. 1 miesiąc
- Mały i Duży Brief – części I i II (duplikaty) lub zgoda na rejestrację w Polsce bez ich przedstawiania: min. 1,5 miesiąca

## Jak przebiega procedura

1. Zgłoszenie zagubienia, braku lub kradzieży w niemieckim urzędzie
2. Uzyskanie pozwolenia na wyrobienie duplikatów utraconych Briefów lub zgody na rejestrację w Polsce bez ich przedłożenia
3. Wyrobienie duplikatów Briefów cz. I i/lub II lub uzyskanie zgody na rejestrację w Polsce
4. Jeśli wymagane przez niemiecki urząd – przegląd techniczny pojazdu wraz ze specyfikacją

**Efekt:** Otrzymujesz oryginalne niemieckie dowody rejestracyjne cz. I i/lub II (Briefy) lub zgodę na rejestrację w Polsce bez konieczności ich przedstawiania.

Wszystko wykonujemy zdalnie – Twoje dokumenty są bezpieczne!

**Lokalizacja:** Żagań, 15 km od trasy A18 (Wrocław – Berlin), przy granicy polsko-niemieckiej.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  '47c35ad1-48af-4e37-9994-d890cb2fc48c', 'en', 'Lost, stolen, or missing small or large Brief? We''ll get new ones!', 'Lost, stolen, or missing small or large Brief? We''ll get new ones!', 'Lost, stolen, or missing small or large Brief? We''ll get new ones!', 'Have you lost your German vehicle registration documents? Don''t worry – we''ll handle everything for you!', 'Have you lost your German vehicle registration documents? Don''t worry – we''ll handle everything for you!',
  'Have you lost your German vehicle registration documents? Don''t worry – we''ll handle everything for you!

We offer full handling of the procedure at German authorities on your behalf, so you can quickly receive new documents.

## Processing time

- Small Brief – part I (duplicate): 1 week – 1 month
- Large Brief – part II (duplicate) or permission to register in Poland without presenting it: approx. 1 month
- Small and Large Brief – parts I and II (duplicates) or permission to register in Poland without presenting them: min. 1.5 months

## How the procedure works

1. Reporting the loss, absence, or theft at a German authority
2. Obtaining permission to issue duplicates of the lost Briefs or permission to register in Poland without submitting them
3. Issuing duplicate Briefs part I and/or II or obtaining permission to register in Poland
4. If required by the German authority – technical inspection of the vehicle along with a specification

**Result:** You receive original German vehicle registration documents part I and/or II (Briefs) or permission to register in Poland without having to present them.

We handle everything remotely – your documents are safe!

**Location:** Żagań, 15 km from the A18 route (Wrocław – Berlin), near the Polish-German border.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  '47c35ad1-48af-4e37-9994-d890cb2fc48c', 'uk', 'Загубили, вкрали або бракує малий чи великий Бріф? Оформимо нові!', 'Загубили, вкрали або бракує малий чи великий Бріф? Оформимо нові!', 'Загубили, вкрали або бракує малий чи великий Бріф? Оформимо нові!', 'Ви втратили німецькі свідоцтва про реєстрацію? Не хвилюйтеся – ми займемося всім за вас!', 'Ви втратили німецькі свідоцтва про реєстрацію? Не хвилюйтеся – ми займемося всім за вас!',
  'Ви втратили німецькі свідоцтва про реєстрацію? Не хвилюйтеся – ми займемося всім за вас!

Ми пропонуємо повне супроводження процедури в німецьких органах від вашого імені, щоб ви якнайшвидше отримали нові документи.

## Терміни виконання

- Малий Бріф – частина I (дублікат): 1 тиждень – 1 місяць
- Великий Бріф – частина II (дублікат) або дозвіл на реєстрацію в Польщі без його пред''явлення: прибл. 1 місяць
- Малий і Великий Бріф – частини I та II (дублікати) або дозвіл на реєстрацію в Польщі без їх пред''явлення: мін. 1,5 місяця

## Як відбувається процедура

1. Подання заяви про втрату, відсутність або крадіжку в німецькому органі
2. Отримання дозволу на виготовлення дублікатів втрачених Бріфів або дозволу на реєстрацію в Польщі без їх подання
3. Виготовлення дублікатів Бріфів ч. I та/або II або отримання дозволу на реєстрацію в Польщі
4. Якщо це вимагається німецьким органом – технічний огляд транспортного засобу разом зі специфікацією

**Результат:** Ви отримуєте оригінальні німецькі свідоцтва про реєстрацію ч. I та/або II (Бріфи) або дозвіл на реєстрацію в Польщі без необхідності їх пред''явлення.

Усе виконуємо дистанційно – ваші документи в безпеці!

**Місцезнаходження:** Жагань, 15 км від траси A18 (Вроцлав – Берлін), поблизу польсько-німецького кордону.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  '47c35ad1-48af-4e37-9994-d890cb2fc48c', 'ru', 'Потеряли, украли или не хватает малого или большого Брифа? Оформим новые!', 'Потеряли, украли или не хватает малого или большого Брифа? Оформим новые!', 'Потеряли, украли или не хватает малого или большого Брифа? Оформим новые!', 'Вы утратили немецкие свидетельства о регистрации? Не беспокойтесь – мы займёмся всем за вас!', 'Вы утратили немецкие свидетельства о регистрации? Не беспокойтесь – мы займёмся всем за вас!',
  'Вы утратили немецкие свидетельства о регистрации? Не беспокойтесь – мы займёмся всем за вас!

Мы предлагаем полное сопровождение процедуры в немецких органах от вашего имени, чтобы вы как можно скорее получили новые документы.

## Сроки выполнения

- Малый Бриф – часть I (дубликат): 1 неделя – 1 месяц
- Большой Бриф – часть II (дубликат) или разрешение на регистрацию в Польше без его предъявления: прибл. 1 месяц
- Малый и Большой Бриф – части I и II (дубликаты) или разрешение на регистрацию в Польше без их предъявления: мин. 1,5 месяца

## Как проходит процедура

1. Подача заявления об утере, отсутствии или краже в немецком органе
2. Получение разрешения на изготовление дубликатов утраченных Брифов или разрешения на регистрацию в Польше без их предоставления
3. Изготовление дубликатов Брифов ч. I и/или II или получение разрешения на регистрацию в Польше
4. Если это требуется немецким органом – технический осмотр транспортного средства вместе со спецификацией

**Результат:** Вы получаете оригинальные немецкие свидетельства о регистрации ч. I и/или II (Брифы) или разрешение на регистрацию в Польше без необходимости их предъявления.

Всё выполняем дистанционно – ваши документы в безопасности!

**Местонахождение:** Жагань, 15 км от трассы A18 (Вроцлав – Берлин), вблизи польско-германской границы.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  '47c35ad1-48af-4e37-9994-d890cb2fc48c', 'cs', 'Ztratili jste, byl ukraden nebo chybí malý či velký Brief? Vyřídíme nové!', 'Ztratili jste, byl ukraden nebo chybí malý či velký Brief? Vyřídíme nové!', 'Ztratili jste, byl ukraden nebo chybí malý či velký Brief? Vyřídíme nové!', 'Přišli jste o německé technické průkazy? Nebojte se – postaráme se o vše za vás!', 'Přišli jste o německé technické průkazy? Nebojte se – postaráme se o vše za vás!',
  'Přišli jste o německé technické průkazy? Nebojte se – postaráme se o vše za vás!

Nabízíme kompletní vyřízení procedury na německých úřadech vaším jménem, abyste co nejdříve obdrželi nové doklady.

## Doba vyřízení

- Malý Brief – část I (duplikát): 1 týden – 1 měsíc
- Velký Brief – část II (duplikát) nebo povolení k registraci v Polsku bez jeho předložení: cca 1 měsíc
- Malý a Velký Brief – části I a II (duplikáty) nebo povolení k registraci v Polsku bez jejich předložení: min. 1,5 měsíce

## Jak procedura probíhá

1. Nahlášení ztráty, absence nebo krádeže na německém úřadě
2. Získání povolení k vydání duplikátů ztracených Briefů nebo povolení k registraci v Polsku bez jejich předložení
3. Vydání duplikátů Briefů č. I a/nebo II nebo získání povolení k registraci v Polsku
4. Pokud to německý úřad vyžaduje – technická kontrola vozidla spolu se specifikací

**Výsledek:** Obdržíte originální německé technické průkazy č. I a/nebo II (Briefy) nebo povolení k registraci v Polsku bez nutnosti jejich předložení.

Vše vyřizujeme na dálku – vaše dokumenty jsou v bezpečí!

**Lokalita:** Żagań, 15 km od trasy A18 (Wrocław – Berlín), u polsko-německé hranice.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  '47c35ad1-48af-4e37-9994-d890cb2fc48c', 'es', '¿Perdió, le robaron o le falta el Brief pequeño o grande? ¡Le tramitamos uno nuevo!', '¿Perdió, le robaron o le falta el Brief pequeño o grande? ¡Le tramitamos uno nuevo!', '¿Perdió, le robaron o le falta el Brief pequeño o grande? ¡Le tramitamos uno nuevo!', '¿Ha perdido sus documentos de matriculación alemanes? No se preocupe, ¡nos encargamos de todo por usted!', '¿Ha perdido sus documentos de matriculación alemanes? No se preocupe, ¡nos encargamos de todo por usted!',
  '¿Ha perdido sus documentos de matriculación alemanes? No se preocupe, ¡nos encargamos de todo por usted!

Ofrecemos la gestión completa del procedimiento ante las autoridades alemanas en su nombre, para que reciba nuevos documentos lo antes posible.

## Tiempo de tramitación

- Brief pequeño – parte I (duplicado): 1 semana – 1 mes
- Brief grande – parte II (duplicado) o permiso para registrar en Polonia sin presentarlo: aprox. 1 mes
- Brief pequeño y grande – partes I y II (duplicados) o permiso para registrar en Polonia sin presentarlos: mín. 1,5 meses

## Cómo funciona el procedimiento

1. Comunicación de pérdida, ausencia o robo ante la autoridad alemana
2. Obtención del permiso para emitir duplicados de los Briefs perdidos o del permiso para registrar en Polonia sin presentarlos
3. Emisión de duplicados de los Briefs parte I y/o II u obtención del permiso para registrar en Polonia
4. Si lo requiere la autoridad alemana – inspección técnica del vehículo junto con especificación

**Resultado:** Recibirá los documentos de matriculación alemanes originales parte I y/o II (Briefs) o el permiso para registrar en Polonia sin necesidad de presentarlos.

¡Todo lo gestionamos de forma remota – sus documentos están seguros!

**Ubicación:** Żagań, a 15 km de la ruta A18 (Wrocław – Berlín), cerca de la frontera polaco-alemana.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  '47c35ad1-48af-4e37-9994-d890cb2fc48c', 'it', 'Ha perso, subito un furto o manca il Brief piccolo o grande? Ne otteniamo uno nuovo!', 'Ha perso, subito un furto o manca il Brief piccolo o grande? Ne otteniamo uno nuovo!', 'Ha perso, subito un furto o manca il Brief piccolo o grande? Ne otteniamo uno nuovo!', 'Ha perso i documenti di immatricolazione tedeschi? Non si preoccupi – ci occupiamo di tutto per lei!', 'Ha perso i documenti di immatricolazione tedeschi? Non si preoccupi – ci occupiamo di tutto per lei!',
  'Ha perso i documenti di immatricolazione tedeschi? Non si preoccupi – ci occupiamo di tutto per lei!

Offriamo la gestione completa della procedura presso le autorità tedesche a suo nome, affinché riceva nuovi documenti il prima possibile.

## Tempi di elaborazione

- Brief piccolo – parte I (duplicato): 1 settimana – 1 mese
- Brief grande – parte II (duplicato) o autorizzazione per la registrazione in Polonia senza presentarlo: circa 1 mese
- Brief piccolo e grande – parti I e II (duplicati) o autorizzazione per la registrazione in Polonia senza presentarli: min. 1,5 mesi

## Come si svolge la procedura

1. Denuncia di smarrimento, assenza o furto presso l''autorità tedesca
2. Ottenimento dell''autorizzazione per il rilascio dei duplicati dei Brief persi o dell''autorizzazione per la registrazione in Polonia senza presentarli
3. Rilascio dei duplicati dei Brief parte I e/o II o ottenimento dell''autorizzazione per la registrazione in Polonia
4. Se richiesto dall''autorità tedesca – ispezione tecnica del veicolo con relativa specifica

**Risultato:** Riceverà i documenti di immatricolazione tedeschi originali parte I e/o II (Brief) o l''autorizzazione per la registrazione in Polonia senza doverli presentare.

Gestiamo tutto da remoto – i suoi documenti sono al sicuro!

**Sede:** Żagań, a 15 km dalla strada A18 (Wrocław – Berlino), vicino al confine polacco-tedesco.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  '47c35ad1-48af-4e37-9994-d890cb2fc48c', 'hu', 'Elveszett, ellopták vagy hiányzik a kis vagy nagy Brief? Újat intézünk!', 'Elveszett, ellopták vagy hiányzik a kis vagy nagy Brief? Újat intézünk!', 'Elveszett, ellopták vagy hiányzik a kis vagy nagy Brief? Újat intézünk!', 'Elveszítette a német forgalmi engedélyét? Ne aggódjon – mindent elintézünk Ön helyett!', 'Elveszítette a német forgalmi engedélyét? Ne aggódjon – mindent elintézünk Ön helyett!',
  'Elveszítette a német forgalmi engedélyét? Ne aggódjon – mindent elintézünk Ön helyett!

Teljes körű ügyintézést kínálunk a német hatóságoknál az Ön nevében, hogy mielőbb megkaphassa az új dokumentumokat.

## Ügyintézési idő

- Kis Brief – I. rész (másolat): 1 hét – 1 hónap
- Nagy Brief – II. rész (másolat) vagy engedély lengyelországi regisztrációhoz anélkül, hogy be kellene mutatni: kb. 1 hónap
- Kis és Nagy Brief – I. és II. rész (másolatok) vagy engedély lengyelországi regisztrációhoz anélkül, hogy be kellene mutatni: min. 1,5 hónap

## A folyamat menete

1. Az elveszés, hiány vagy lopás bejelentése a német hatóságnál
2. Engedély megszerzése az elveszett Briefek másodlatának kiadásához, vagy engedély a lengyelországi regisztrációhoz bemutatásuk nélkül
3. A Brief I. és/vagy II. részének másolatának kiadása, vagy engedély megszerzése a lengyelországi regisztrációhoz
4. Ha a német hatóság előírja – a jármű műszaki vizsgálata specifikációval együtt

**Eredmény:** Megkapja az eredeti német forgalmi engedélyt I. és/vagy II. részben (Briefek), vagy engedélyt a lengyelországi regisztrációhoz anélkül, hogy be kellene mutatnia azokat.

Mindent távolról intézünk – dokumentumai biztonságban vannak!

**Helyszín:** Żagań, az A18-as úttól (Wrocław – Berlin) 15 km-re, a lengyel–német határ közelében.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  '47c35ad1-48af-4e37-9994-d890cb2fc48c', 'ro', 'Ați pierdut, vi s-a furat sau vă lipsește Brieful mic sau mare? Obținem altele noi!', 'Ați pierdut, vi s-a furat sau vă lipsește Brieful mic sau mare? Obținem altele noi!', 'Ați pierdut, vi s-a furat sau vă lipsește Brieful mic sau mare? Obținem altele noi!', 'Ați pierdut documentele germane de înmatriculare? Nu vă faceți griji – ne ocupăm noi de tot pentru dumneavoastră! Oferim asistență completă pentru procedura în fața autorităților germane în numele dumneavoastră, astfel încât să primiți rapid documente noi. Termene de realizare: * Brieful mic – partea I (duplicat): 1 săptămână – 1 lună * Brieful mare – partea II (duplicat) sau acord pentru înmatricularea în Polonia fără prezentarea acestuia: aprox. 1 lună * Brieful mic și mare – părțile I și II (duplicate) sau acord pentru înmatricularea în Polonia fără prezentarea acestora: min. 1,5 luni. Cum decurge procedura: 1. Declararea pierderii, lipsei sau furtului la autoritatea germană 2. Obținerea permisiunii de a emite duplicate ale Briefurilor pierdute sau acord pentru înmatricularea în Polonia fără prezentarea acestora 3. Emiterea duplicatelor Briefurilor partea I și/sau II sau obținerea acordului pentru înmatricularea în Polonia 4. Dacă este solicitat de autoritatea germană – inspecția tehnică a vehiculului împreună cu specificația. Rezultat: Primiți documentele germane originale de înmatriculare partea I și/sau II (Briefurile) sau acordul pentru înmatricularea în Polonia fără a fi nevoie să le prezentați. Totul se realizează de la distanță – documentele dumneavoastră sunt în siguranță! Locație: Żagań, 15 km de ruta A18 (Wrocław – Berlin), la granița polono-germană.', 'Ați pierdut documentele germane de înmatriculare? Nu vă faceți griji – ne ocupăm noi de tot pentru dumneavoastră! Oferim asistență completă pentru procedura în fața autorităților germane în numele dumneavoastră, astfel încât să primiți rapid documente noi. Termene de realizare: * Brieful mic – partea I (duplicat): 1 săptămână – 1 lună * Brieful mare – partea II (duplicat) sau acord pentru înmatricularea în Polonia fără prezentarea acestuia: aprox. 1 lună * Brieful mic și mare – părțile I și II (duplicate) sau acord pentru înmatricularea în Polonia fără prezentarea acestora: min. 1,5 luni. Cum decurge procedura: 1. Declararea pierderii, lipsei sau furtului la autoritatea germană 2. Obținerea permisiunii de a emite duplicate ale Briefurilor pierdute sau acord pentru înmatricularea în Polonia fără prezentarea acestora 3. Emiterea duplicatelor Briefurilor partea I și/sau II sau obținerea acordului pentru înmatricularea în Polonia 4. Dacă este solicitat de autoritatea germană – inspecția tehnică a vehiculului împreună cu specificația. Rezultat: Primiți documentele germane originale de înmatriculare partea I și/sau II (Briefurile) sau acordul pentru înmatricularea în Polonia fără a fi nevoie să le prezentați. Totul se realizează de la distanță – documentele dumneavoastră sunt în siguranță! Locație: Żagań, 15 km de ruta A18 (Wrocław – Berlin), la granița polono-germană.',
  'Ați pierdut documentele germane de înmatriculare? Nu vă faceți griji – ne ocupăm noi de tot pentru dumneavoastră! Oferim asistență completă pentru procedura în fața autorităților germane în numele dumneavoastră, astfel încât să primiți rapid documente noi. Termene de realizare: * Brieful mic – partea I (duplicat): 1 săptămână – 1 lună * Brieful mare – partea II (duplicat) sau acord pentru înmatricularea în Polonia fără prezentarea acestuia: aprox. 1 lună * Brieful mic și mare – părțile I și II (duplicate) sau acord pentru înmatricularea în Polonia fără prezentarea acestora: min. 1,5 luni. Cum decurge procedura: 1. Declararea pierderii, lipsei sau furtului la autoritatea germană 2. Obținerea permisiunii de a emite duplicate ale Briefurilor pierdute sau acord pentru înmatricularea în Polonia fără prezentarea acestora 3. Emiterea duplicatelor Briefurilor partea I și/sau II sau obținerea acordului pentru înmatricularea în Polonia 4. Dacă este solicitat de autoritatea germană – inspecția tehnică a vehiculului împreună cu specificația. Rezultat: Primiți documentele germane originale de înmatriculare partea I și/sau II (Briefurile) sau acordul pentru înmatricularea în Polonia fără a fi nevoie să le prezentați. Totul se realizează de la distanță – documentele dumneavoastră sunt în siguranță! Locație: Żagań, 15 km de ruta A18 (Wrocław – Berlin), la granița polono-germană.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  '47c35ad1-48af-4e37-9994-d890cb2fc48c', 'lt', 'Pametėte, pavogė ar trūksta mažo ar didelio Brief? Pagaminsime naujus!', 'Pametėte, pavogė ar trūksta mažo ar didelio Brief? Pagaminsime naujus!', 'Pametėte, pavogė ar trūksta mažo ar didelio Brief? Pagaminsime naujus!', 'Pametėte vokiškus transporto priemonės registracijos dokumentus? Nesijaudinkite – mes viskuo pasirūpinsime už jus! Siūlome pilną procedūros tvarkymą Vokietijos įstaigose jūsų vardu, kad greitai gautumėte naujus dokumentus. Vykdymo laikas: * Mažas Brief – I dalis (dublikatas): 1 savaitė – 1 mėnuo * Didelis Brief – II dalis (dublikatas) arba leidimas registruoti Lenkijoje be jo pateikimo: apie 1 mėnuo * Mažas ir Didelis Brief – I ir II dalys (dublikatai) arba leidimas registruoti Lenkijoje be jų pateikimo: min. 1,5 mėnesio. Kaip vyksta procedūra: 1. Praradimo, trūkumo ar vagystės deklaravimas Vokietijos įstaigoje 2. Leidimo pagaminti pamestų Briefų dublikatus gavimas arba leidimas registruoti Lenkijoje be jų pateikimo 3. Briefų dublikatų I ir/arba II dalių pagaminimas arba leidimo registruoti Lenkijoje gavimas 4. Jei reikalauja Vokietijos įstaiga – transporto priemonės techninė apžiūra su specifikacija. Rezultatas: Gaunate originalius vokiškus registracijos dokumentus I ir/arba II dalis (Briefus) arba leidimą registruoti Lenkijoje be būtinybės juos pateikti. Viską atliekame nuotoliniu būdu – jūsų dokumentai saugūs! Vieta: Żagań, 15 km nuo kelio A18 (Vroclavas – Berlynas), prie Lenkijos-Vokietijos sienos.', 'Pametėte vokiškus transporto priemonės registracijos dokumentus? Nesijaudinkite – mes viskuo pasirūpinsime už jus! Siūlome pilną procedūros tvarkymą Vokietijos įstaigose jūsų vardu, kad greitai gautumėte naujus dokumentus. Vykdymo laikas: * Mažas Brief – I dalis (dublikatas): 1 savaitė – 1 mėnuo * Didelis Brief – II dalis (dublikatas) arba leidimas registruoti Lenkijoje be jo pateikimo: apie 1 mėnuo * Mažas ir Didelis Brief – I ir II dalys (dublikatai) arba leidimas registruoti Lenkijoje be jų pateikimo: min. 1,5 mėnesio. Kaip vyksta procedūra: 1. Praradimo, trūkumo ar vagystės deklaravimas Vokietijos įstaigoje 2. Leidimo pagaminti pamestų Briefų dublikatus gavimas arba leidimas registruoti Lenkijoje be jų pateikimo 3. Briefų dublikatų I ir/arba II dalių pagaminimas arba leidimo registruoti Lenkijoje gavimas 4. Jei reikalauja Vokietijos įstaiga – transporto priemonės techninė apžiūra su specifikacija. Rezultatas: Gaunate originalius vokiškus registracijos dokumentus I ir/arba II dalis (Briefus) arba leidimą registruoti Lenkijoje be būtinybės juos pateikti. Viską atliekame nuotoliniu būdu – jūsų dokumentai saugūs! Vieta: Żagań, 15 km nuo kelio A18 (Vroclavas – Berlynas), prie Lenkijos-Vokietijos sienos.',
  'Pametėte vokiškus transporto priemonės registracijos dokumentus? Nesijaudinkite – mes viskuo pasirūpinsime už jus! Siūlome pilną procedūros tvarkymą Vokietijos įstaigose jūsų vardu, kad greitai gautumėte naujus dokumentus. Vykdymo laikas: * Mažas Brief – I dalis (dublikatas): 1 savaitė – 1 mėnuo * Didelis Brief – II dalis (dublikatas) arba leidimas registruoti Lenkijoje be jo pateikimo: apie 1 mėnuo * Mažas ir Didelis Brief – I ir II dalys (dublikatai) arba leidimas registruoti Lenkijoje be jų pateikimo: min. 1,5 mėnesio. Kaip vyksta procedūra: 1. Praradimo, trūkumo ar vagystės deklaravimas Vokietijos įstaigoje 2. Leidimo pagaminti pamestų Briefų dublikatus gavimas arba leidimas registruoti Lenkijoje be jų pateikimo 3. Briefų dublikatų I ir/arba II dalių pagaminimas arba leidimo registruoti Lenkijoje gavimas 4. Jei reikalauja Vokietijos įstaiga – transporto priemonės techninė apžiūra su specifikacija. Rezultatas: Gaunate originalius vokiškus registracijos dokumentus I ir/arba II dalis (Briefus) arba leidimą registruoti Lenkijoje be būtinybės juos pateikti. Viską atliekame nuotoliniu būdu – jūsų dokumentai saugūs! Vieta: Żagań, 15 km nuo kelio A18 (Vroclavas – Berlynas), prie Lenkijos-Vokietijos sienos.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;

-- homologacja-n1 :: Zmiana samochodu osobowego na ciężarowy - Homologacja N1 (Dla Firm)
INSERT INTO services (id, category_id, image_url, slug, published, featured, sort_order) VALUES ('ed03af2a-5c34-4105-b7cd-145ecc56ec10', 'a0cea2a0-16f1-4cd4-a28b-3b83d3937e9a', '/uploads/1772906440387-fq5c23.jpg', 'homologacja-n1', true, false, 30) ON CONFLICT (slug) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'ed03af2a-5c34-4105-b7cd-145ecc56ec10', 'pl', 'Zmiana samochodu osobowego na ciężarowy - Homologacja N1 (Dla Firm)', 'Zmiana samochodu osobowego na ciężarowy - Homologacja N1 (Dla Firm)', 'Zmiana samochodu osobowego na ciężarowy - Homologacja N1 (Dla Firm)', 'Oferujemy przebudowę samochodów osobowych na samochody ciężarowe z homologacją N1. Oferta dotyczy pojazdów zakupionych na terenie całej Unii Europejskiej, które nie zostały jeszcze zarejestrowane w Polsce.', 'Oferujemy przebudowę samochodów osobowych na samochody ciężarowe z homologacją N1. Oferta dotyczy pojazdów zakupionych na terenie całej Unii Europejskiej, które nie zostały jeszcze zarejestrowane w Polsce.',
  'Oferujemy przebudowę samochodów osobowych na samochody ciężarowe z homologacją N1. Oferta dotyczy pojazdów zakupionych na terenie całej Unii Europejskiej, które nie zostały jeszcze zarejestrowane w Polsce.

**Warunek techniczny:** samochód musi posiadać tylną klapę otwieraną razem z szybą – do góry lub na bok.

**Przykład realizacji:** Skoda Fabia przerobiona na samochód ciężarowy – jeden rząd siedzeń oraz kratka oddzielająca przestrzeń ładunkową.

Akcyza oraz VAT opłacone w Polsce.

Samochód z homologacją N1 można użytkować na prawo jazdy kategorii B, a jednocześnie daje on możliwość korzystnego rozliczenia w firmie. Możliwe jest odliczenie 100% podatku VAT od zakupu pojazdu, odliczenie całej wartości zakupu od dochodu oraz rozliczanie pełnych kosztów eksploatacji, takich jak paliwo czy serwis. Nie ma również obowiązku prowadzenia ewidencji przebiegu pojazdu.

**Podstawa prawna:** art. 86a ust. 9 pkt 1 i 2 ustawy o podatku VAT z dnia 11 marca 2014 r.

**Przykład rozliczenia:** cena samochodu 100 000 zł netto, czyli 123 000 zł brutto.

**Możliwe korzyści:** 23 000 zł – odliczenie podatku VAT, 19 000 zł – oszczędność w podatku dochodowym (19% od 100 000 zł), 4 900 zł – oszczędność w składce zdrowotnej (4,9% od 100 000 zł).

W tym przykładzie w firmie pozostaje łącznie około 46 900 zł. Szczegóły najlepiej skonsultować z księgową, aby dopasować rozliczenie do formy opodatkowania.

Mały podatnik może również skorzystać z jednorazowej amortyzacji w ramach pomocy de minimis i odliczyć od dochodu zakup samochodu ciężarowego do 50 000 euro netto. W 2024 roku jest to około 220 000 zł netto. Od wydatkowanej kwoty można dodatkowo odliczyć pełny podatek VAT bez limitu 150 000 zł.

**Homologacja N1 obejmuje:** przeróbkę techniczną samochodu polegającą na montażu kratki za pierwszym rzędem siedzeń oraz zmianie konfiguracji na 2 miejsca siedzące i przestrzeń ładunkową, uzyskanie dokumentacji homologacyjnej potwierdzającej kategorię N1, komplet dokumentów do rejestracji pojazdu jako ciężarowego, w tym nowe niemieckie dokumenty rejestracyjne, rejestrację pojazdu w Polsce jako samochodu ciężarowego N1.

Po rejestracji pojazdu w Polsce w okręgowej stacji kontroli pojazdów można uzyskać zaświadczenie VAT-1a, które umożliwia odliczenie pełnej kwoty zakupu pojazdu od dochodu wraz z pełnym podatkiem VAT oraz rozliczanie paliwa i innych kosztów eksploatacyjnych bez konieczności prowadzenia ewidencji przebiegu pojazdu.

Przerabiamy samochody wszystkich marek i typów: hatchback, kombi, van, SUV, bus oraz samochody terenowe. Warunkiem jest zakup pojazdu na terenie Unii Europejskiej i brak wcześniejszej rejestracji w Polsce.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'ed03af2a-5c34-4105-b7cd-145ecc56ec10', 'en', 'Conversion of a passenger car to a commercial vehicle – N1 Type Approval (For Companies)', 'Conversion of a passenger car to a commercial vehicle – N1 Type Approval (For Companies)', 'Conversion of a passenger car to a commercial vehicle – N1 Type Approval (For Companies)', 'We offer the conversion of passenger cars to commercial vehicles with N1 type approval. The offer applies to vehicles purchased anywhere in the European Union that have not yet been registered in Poland.', 'We offer the conversion of passenger cars to commercial vehicles with N1 type approval. The offer applies to vehicles purchased anywhere in the European Union that have not yet been registered in Poland.',
  'We offer the conversion of passenger cars to commercial vehicles with N1 type approval. The offer applies to vehicles purchased anywhere in the European Union that have not yet been registered in Poland.

**Technical requirement:** the vehicle must have a rear hatch that opens together with the glass – upwards or to the side.

**Example of implementation:** Skoda Fabia converted to a commercial vehicle – one row of seats and a partition grille separating the cargo area.

Excise duty and VAT paid in Poland.

A vehicle with N1 type approval can be driven with a class B driving licence, while at the same time offering favourable tax settlement options for companies. It is possible to deduct 100% of VAT on the vehicle purchase, deduct the full purchase value from income, and settle full operating costs such as fuel and servicing. There is also no obligation to keep a vehicle mileage log.

**Legal basis:** Art. 86a sec. 9 point 1 and 2 of the VAT Act of 11 March 2014.

**Example of settlement:** vehicle price 100,000 PLN net, i.e. 123,000 PLN gross.

**Possible benefits:** 23,000 PLN – VAT deduction, 19,000 PLN – income tax saving (19% of 100,000 PLN), 4,900 PLN – health insurance contribution saving (4.9% of 100,000 PLN).

In this example, the company retains approximately 46,900 PLN in total. Details should best be consulted with an accountant to tailor the settlement to the tax form.

A small taxpayer may also use one-time depreciation under de minimis aid and deduct the purchase of a commercial vehicle up to 50,000 EUR net from income. In 2024 this is approximately 220,000 PLN net. On the amount spent, full VAT can additionally be deducted without the 150,000 PLN limit.

**N1 type approval includes:** technical conversion of the vehicle consisting of installing a grille behind the first row of seats and changing the configuration to 2 seats and a cargo area, obtaining type approval documentation confirming the N1 category, a full set of documents for registering the vehicle as a commercial vehicle including new German registration documents, registration of the vehicle in Poland as an N1 commercial vehicle.

After registering the vehicle in Poland, a VAT-1a certificate can be obtained at a regional vehicle inspection station, which enables deduction of the full vehicle purchase amount from income together with full VAT, and settlement of fuel and other operating costs without the need to keep a mileage log.

We convert vehicles of all makes and types: hatchback, estate, van, SUV, minibus and off-road vehicles. The condition is that the vehicle was purchased within the European Union and has not previously been registered in Poland.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'ed03af2a-5c34-4105-b7cd-145ecc56ec10', 'uk', 'Переобладнання легкового автомобіля у вантажний – Омологація N1 (Для підприємств)', 'Переобладнання легкового автомобіля у вантажний – Омологація N1 (Для підприємств)', 'Переобладнання легкового автомобіля у вантажний – Омологація N1 (Для підприємств)', 'Ми пропонуємо переобладнання легкових автомобілів у вантажні з омологацією N1. Пропозиція стосується транспортних засобів, придбаних на території всього Європейського Союзу, які ще не були зареєстровані в Польщі.', 'Ми пропонуємо переобладнання легкових автомобілів у вантажні з омологацією N1. Пропозиція стосується транспортних засобів, придбаних на території всього Європейського Союзу, які ще не були зареєстровані в Польщі.',
  'Ми пропонуємо переобладнання легкових автомобілів у вантажні з омологацією N1. Пропозиція стосується транспортних засобів, придбаних на території всього Європейського Союзу, які ще не були зареєстровані в Польщі.

**Технічна вимога:** автомобіль повинен мати задній люк, що відкривається разом зі склом – вгору або вбік.

**Приклад реалізації:** Skoda Fabia, переобладнана у вантажний автомобіль – один ряд сидінь та перегородкова решітка, що відокремлює вантажний відсік.

Акциз та ПДВ сплачені в Польщі.

Автомобіль з омологацією N1 можна використовувати з посвідченням водія категорії B, водночас він надає можливість вигідного розрахунку для підприємства. Можливе відрахування 100% ПДВ від покупки транспортного засобу, відрахування повної вартості покупки з доходу, а також розрахунок повних експлуатаційних витрат, таких як паливо або технічне обслуговування. Також відсутній обов''язок ведення журналу пробігу транспортного засобу.

**Правова основа:** ст. 86a п. 9 пп. 1 і 2 Закону про ПДВ від 11 березня 2014 р.

**Приклад розрахунку:** ціна автомобіля 100 000 злотих нетто, тобто 123 000 злотих брутто.

**Можливі вигоди:** 23 000 злотих – відрахування ПДВ, 19 000 злотих – економія на податку на прибуток (19% від 100 000 злотих), 4 900 злотих – економія на внеску медичного страхування (4,9% від 100 000 злотих).

У цьому прикладі у підприємстві залишається загалом близько 46 900 злотих. Деталі найкраще узгодити з бухгалтером, щоб пристосувати розрахунок до форми оподаткування.

Малий платник податків також може скористатися одноразовою амортизацією в рамках допомоги de minimis та відрахувати від доходу покупку вантажного автомобіля до 50 000 євро нетто. У 2024 році це близько 220 000 злотих нетто. Від витраченої суми можна додатково відрахувати повний ПДВ без ліміту 150 000 злотих.

**Омологація N1 включає:** технічне переобладнання автомобіля, що полягає у монтажі решітки за першим рядом сидінь та зміні конфігурації на 2 місця та вантажний відсік, отримання документації про омологацію, що підтверджує категорію N1, повний комплект документів для реєстрації транспортного засобу як вантажного, включаючи нові німецькі реєстраційні документи, реєстрацію транспортного засобу в Польщі як вантажного автомобіля N1.

Після реєстрації транспортного засобу в Польщі в окружній станції технічного огляду можна отримати довідку VAT-1a, яка дає можливість відрахувати повну суму покупки транспортного засобу з доходу разом із повним ПДВ, а також розраховувати витрати на паливо та інші експлуатаційні витрати без необхідності ведення журналу пробігу.

Ми переобладнуємо автомобілі всіх марок і типів: хетчбек, комбі, фургон, SUV, мікроавтобус та позашляховики. Умовою є придбання транспортного засобу на території Європейського Союзу та відсутність попередньої реєстрації в Польщі.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'ed03af2a-5c34-4105-b7cd-145ecc56ec10', 'ru', 'Переоборудование легкового автомобиля в грузовой – Омологация N1 (Для предприятий)', 'Переоборудование легкового автомобиля в грузовой – Омологация N1 (Для предприятий)', 'Переоборудование легкового автомобиля в грузовой – Омологация N1 (Для предприятий)', 'Мы предлагаем переоборудование легковых автомобилей в грузовые с омологацией N1. Предложение распространяется на транспортные средства, приобретённые на территории всего Европейского Союза, которые ещё не были зарегистрированы в Польше.', 'Мы предлагаем переоборудование легковых автомобилей в грузовые с омологацией N1. Предложение распространяется на транспортные средства, приобретённые на территории всего Европейского Союза, которые ещё не были зарегистрированы в Польше.',
  'Мы предлагаем переоборудование легковых автомобилей в грузовые с омологацией N1. Предложение распространяется на транспортные средства, приобретённые на территории всего Европейского Союза, которые ещё не были зарегистрированы в Польше.

**Техническое требование:** автомобиль должен иметь заднюю крышку, открывающуюся вместе со стеклом – вверх или в сторону.

**Пример реализации:** Skoda Fabia, переоборудованная в грузовой автомобиль – один ряд сидений и перегородочная решётка, отделяющая грузовой отсек.

Акцизный сбор и НДС уплачены в Польше.

Автомобиль с омологацией N1 можно использовать с водительским удостоверением категории B, при этом он предоставляет возможность выгодного налогового учёта для предприятия. Возможно вычитание 100% НДС от покупки транспортного средства, вычитание полной стоимости покупки из дохода, а также учёт полных эксплуатационных расходов, таких как топливо и техническое обслуживание. Также отсутствует обязанность ведения журнала пробега транспортного средства.

**Правовое основание:** ст. 86a п. 9 пп. 1 и 2 Закона об НДС от 11 марта 2014 г.

**Пример расчёта:** цена автомобиля 100 000 злотых нетто, то есть 123 000 злотых брутто.

**Возможные выгоды:** 23 000 злотых – вычет НДС, 19 000 злотых – экономия на налоге на прибыль (19% от 100 000 злотых), 4 900 злотых – экономия на взносе медицинского страхования (4,9% от 100 000 злотых).

В этом примере на предприятии остаётся в общей сложности около 46 900 злотых. Детали лучше всего согласовать с бухгалтером, чтобы подобрать расчёт к форме налогообложения.

Малый налогоплательщик также может воспользоваться единовременной амортизацией в рамках помощи de minimis и вычесть из дохода покупку грузового автомобиля до 50 000 евро нетто. В 2024 году это около 220 000 злотых нетто. С потраченной суммы можно дополнительно вычесть полный НДС без ограничения в 150 000 злотых.

**Омологация N1 включает:** техническое переоборудование автомобиля, заключающееся в монтаже решётки за первым рядом сидений и изменении конфигурации на 2 места и грузовой отсек, получение документации по омологации, подтверждающей категорию N1, полный комплект документов для регистрации транспортного средства в качестве грузового, включая новые немецкие регистрационные документы, регистрацию транспортного средства в Польше в качестве грузового автомобиля N1.

После регистрации транспортного средства в Польше в региональной станции технического осмотра можно получить справку VAT-1a, которая даёт возможность вычесть полную сумму покупки транспортного средства из дохода вместе с полным НДС, а также учитывать расходы на топливо и другие эксплуатационные расходы без необходимости ведения журнала пробега.

Мы переоборудуем автомобили всех марок и типов: хэтчбек, универсал, фургон, SUV, микроавтобус и внедорожники. Условием является приобретение транспортного средства на территории Европейского Союза и отсутствие предыдущей регистрации в Польше.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'ed03af2a-5c34-4105-b7cd-145ecc56ec10', 'cs', 'Přestavba osobního automobilu na nákladní vozidlo – homologace N1 (Pro firmy)', 'Přestavba osobního automobilu na nákladní vozidlo – homologace N1 (Pro firmy)', 'Přestavba osobního automobilu na nákladní vozidlo – homologace N1 (Pro firmy)', 'Nabízíme přestavbu osobních automobilů na nákladní vozidla s homologací N1. Nabídka se týká vozidel zakoupených na území celé Evropské unie, která dosud nebyla registrována v Polsku.', 'Nabízíme přestavbu osobních automobilů na nákladní vozidla s homologací N1. Nabídka se týká vozidel zakoupených na území celé Evropské unie, která dosud nebyla registrována v Polsku.',
  'Nabízíme přestavbu osobních automobilů na nákladní vozidla s homologací N1. Nabídka se týká vozidel zakoupených na území celé Evropské unie, která dosud nebyla registrována v Polsku.

**Technická podmínka:** vozidlo musí mít zadní víko, které se otevírá spolu se sklem – nahoru nebo do strany.

**Příklad realizace:** Škoda Fabia přestavěná na nákladní automobil – jedna řada sedadel a mřížka oddělující nákladový prostor.

Spotřební daň a DPH uhrazeny v Polsku.

Vozidlo s homologací N1 lze řídit s řidičským průkazem skupiny B a zároveň poskytuje možnost výhodného daňového vyúčtování pro firmy. Je možné odpočítat 100 % DPH z nákupu vozidla, odpočítat plnou pořizovací hodnotu z příjmů a uplatnit plné provozní náklady, jako jsou pohonné hmoty nebo servis. Není také povinnost vést evidenci jízd vozidla.

**Právní základ:** § 86a odst. 9 bod 1 a 2 zákona o DPH ze dne 11. března 2014.

**Příklad vyúčtování:** cena vozidla 100 000 PLN bez DPH, tj. 123 000 PLN s DPH.

**Možné výhody:** 23 000 PLN – odpočet DPH, 19 000 PLN – úspora na dani z příjmu (19 % ze 100 000 PLN), 4 900 PLN – úspora na zdravotním pojistném (4,9 % ze 100 000 PLN).

V tomto příkladu firmě zůstane celkem přibližně 46 900 PLN. Podrobnosti je nejlépe konzultovat s účetním, aby bylo vyúčtování přizpůsobeno formě zdanění.

Malý poplatník může také využít jednorázového odpisu v rámci pomoci de minimis a odečíst od příjmů nákup nákladního vozidla do výše 50 000 EUR bez DPH. V roce 2024 je to přibližně 220 000 PLN bez DPH. Z vynaložené částky lze navíc odečíst plné DPH bez limitu 150 000 PLN.

**Homologace N1 zahrnuje:** technickou přestavbu vozidla spočívající v montáži mřížky za první řadou sedadel a změně konfigurace na 2 sedadla a nákladový prostor, získání homologační dokumentace potvrzující kategorii N1, kompletní sadu dokumentů pro registraci vozidla jako nákladního včetně nových německých registračních dokumentů, registraci vozidla v Polsku jako nákladního automobilu N1.

Po registraci vozidla v Polsku lze v okresní stanici technické kontroly vozidel získat osvědčení VAT-1a, které umožňuje odečíst plnou kupní cenu vozidla od příjmů spolu s plným DPH a uplatňovat náklady na pohonné hmoty a další provozní náklady bez povinnosti vést evidenci jízd.

**Přestavujeme vozidla všech značek a typů:** hatchback, kombi, van, SUV, bus a terénní vozidla. Podmínkou je zakoupení vozidla na území Evropské unie a absence předchozí registrace v Polsku.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'ed03af2a-5c34-4105-b7cd-145ecc56ec10', 'es', 'Conversión de turismo a vehículo comercial – Homologación N1 (Para empresas)', 'Conversión de turismo a vehículo comercial – Homologación N1 (Para empresas)', 'Conversión de turismo a vehículo comercial – Homologación N1 (Para empresas)', 'Ofrecemos la conversión de turismos en vehículos comerciales con homologación N1. La oferta se aplica a vehículos adquiridos en cualquier país de la Unión Europea que aún no hayan sido matriculados en Polonia.', 'Ofrecemos la conversión de turismos en vehículos comerciales con homologación N1. La oferta se aplica a vehículos adquiridos en cualquier país de la Unión Europea que aún no hayan sido matriculados en Polonia.',
  'Ofrecemos la conversión de turismos en vehículos comerciales con homologación N1. La oferta se aplica a vehículos adquiridos en cualquier país de la Unión Europea que aún no hayan sido matriculados en Polonia.

**Requisito técnico:** el vehículo debe tener un portón trasero que se abra junto con el cristal – hacia arriba o hacia un lado.

**Ejemplo de realización:** Skoda Fabia convertida en vehículo comercial – una fila de asientos y una rejilla separadora del área de carga.

Impuesto especial e IVA pagados en Polonia.

Un vehículo con homologación N1 puede conducirse con permiso de conducir de clase B y, al mismo tiempo, ofrece la posibilidad de una liquidación fiscal ventajosa para las empresas. Es posible deducir el 100 % del IVA de la compra del vehículo, deducir el valor total de la compra de los ingresos y liquidar los costes de explotación completos, como combustible o mantenimiento. Tampoco existe obligación de llevar un registro de kilometraje del vehículo.

**Base legal:** art. 86a apart. 9 punto 1 y 2 de la Ley del IVA de 11 de marzo de 2014.

**Ejemplo de liquidación:** precio del vehículo 100 000 PLN neto, es decir, 123 000 PLN bruto.

**Posibles beneficios:** 23 000 PLN – deducción de IVA, 19 000 PLN – ahorro en el impuesto sobre la renta (19 % de 100 000 PLN), 4 900 PLN – ahorro en la cuota del seguro médico (4,9 % de 100 000 PLN).

En este ejemplo, la empresa retiene en total aproximadamente 46 900 PLN. Los detalles conviene consultarlos con un contable para adaptar la liquidación a la forma de tributación.

Un pequeño contribuyente también puede aprovechar la amortización única en el marco de la ayuda de minimis y deducir de los ingresos la compra de un vehículo comercial de hasta 50 000 EUR neto. En 2024 esto equivale a aproximadamente 220 000 PLN neto. Del importe gastado, se puede deducir adicionalmente el IVA completo sin el límite de 150 000 PLN.

**La homologación N1 incluye:** la conversión técnica del vehículo consistente en instalar una rejilla detrás de la primera fila de asientos y cambiar la configuración a 2 plazas y un área de carga, la obtención de la documentación de homologación que confirma la categoría N1, un conjunto completo de documentos para matricular el vehículo como comercial incluyendo los nuevos documentos de matriculación alemanes, la matriculación del vehículo en Polonia como vehículo comercial N1.

Tras la matriculación del vehículo en Polonia en la estación regional de inspección técnica de vehículos, se puede obtener el certificado VAT-1a, que permite deducir el importe total de la compra del vehículo de los ingresos junto con el IVA completo, y liquidar el combustible y otros costes de explotación sin necesidad de llevar un registro de kilometraje.

Convertimos vehículos de todas las marcas y tipos: hatchback, familiar, furgoneta, SUV, minibús y todoterrenos. La condición es que el vehículo haya sido adquirido en el territorio de la Unión Europea y no haya sido matriculado previamente en Polonia.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'ed03af2a-5c34-4105-b7cd-145ecc56ec10', 'it', 'Conversione di autovettura in veicolo commerciale – Omologazione N1 (Per aziende)', 'Conversione di autovettura in veicolo commerciale – Omologazione N1 (Per aziende)', 'Conversione di autovettura in veicolo commerciale – Omologazione N1 (Per aziende)', 'Offriamo la conversione di autovetture in veicoli commerciali con omologazione N1. L''offerta si applica a veicoli acquistati in qualsiasi paese dell''Unione Europea che non siano ancora stati immatricolati in Polonia.', 'Offriamo la conversione di autovetture in veicoli commerciali con omologazione N1. L''offerta si applica a veicoli acquistati in qualsiasi paese dell''Unione Europea che non siano ancora stati immatricolati in Polonia.',
  'Offriamo la conversione di autovetture in veicoli commerciali con omologazione N1. L''offerta si applica a veicoli acquistati in qualsiasi paese dell''Unione Europea che non siano ancora stati immatricolati in Polonia.

**Requisito tecnico:** il veicolo deve avere un portellone posteriore che si apre insieme al vetro – verso l''alto o di lato.

**Esempio di realizzazione:** Skoda Fabia convertita in veicolo commerciale – una fila di sedili e una griglia divisoria che separa il vano di carico.

Accisa e IVA pagate in Polonia.

Un veicolo con omologazione N1 può essere guidato con la patente di guida di categoria B e allo stesso tempo offre la possibilità di una vantaggiosa liquidazione fiscale per le aziende. È possibile detrarre il 100% dell''IVA sull''acquisto del veicolo, detrarre il valore totale dell''acquisto dal reddito e liquidare i costi operativi completi, come carburante o manutenzione. Non vi è nemmeno l''obbligo di tenere un registro del chilometraggio del veicolo.

**Base giuridica:** art. 86a c. 9 punto 1 e 2 della legge sull''IVA dell''11 marzo 2014.

**Esempio di liquidazione:** prezzo del veicolo 100 000 PLN netto, ossia 123 000 PLN lordo.

**Possibili vantaggi:** 23 000 PLN – detrazione IVA, 19 000 PLN – risparmio sull''imposta sul reddito (19% di 100 000 PLN), 4 900 PLN – risparmio sul contributo dell''assicurazione sanitaria (4,9% di 100 000 PLN).

In questo esempio, l''azienda trattiene complessivamente circa 46 900 PLN. È opportuno consultare i dettagli con un commercialista per adattare la liquidazione alla forma di tassazione.

Un piccolo contribuente può anche usufruire dell''ammortamento unico nell''ambito degli aiuti de minimis e detrarre dal reddito l''acquisto di un veicolo commerciale fino a 50 000 EUR netto. Nel 2024 ciò equivale a circa 220 000 PLN netto. Dalla somma spesa è possibile detrarre ulteriormente l''IVA completa senza il limite di 150 000 PLN.

**L''omologazione N1 comprende:** la conversione tecnica del veicolo consistente nell''installazione di una griglia dietro la prima fila di sedili e nella modifica della configurazione a 2 posti e un vano di carico, l''ottenimento della documentazione di omologazione che conferma la categoria N1, un set completo di documenti per l''immatricolazione del veicolo come commerciale inclusi i nuovi documenti di immatricolazione tedeschi, l''immatricolazione del veicolo in Polonia come veicolo commerciale N1.

Dopo l''immatricolazione del veicolo in Polonia presso la stazione regionale di revisione dei veicoli, è possibile ottenere il certificato VAT-1a, che consente di detrarre l''intero importo di acquisto del veicolo dal reddito insieme all''IVA completa e di liquidare il carburante e altri costi operativi senza necessità di tenere un registro del chilometraggio.

Convertiamo veicoli di tutte le marche e tipologie: hatchback, station wagon, furgone, SUV, minibus e fuoristrada. La condizione è che il veicolo sia stato acquistato nel territorio dell''Unione Europea e non sia stato precedentemente immatricolato in Polonia.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'ed03af2a-5c34-4105-b7cd-145ecc56ec10', 'hu', 'Személyautó tehergépjárművé alakítása – N1 típusjóváhagyás (Vállalkozásoknak)', 'Személyautó tehergépjárművé alakítása – N1 típusjóváhagyás (Vállalkozásoknak)', 'Személyautó tehergépjárművé alakítása – N1 típusjóváhagyás (Vállalkozásoknak)', 'Személyautók tehergépjárművé alakítását kínáljuk N1 típusjóváhagyással. Az ajánlat az Európai Unió egész területén vásárolt, Lengyelországban még nem regisztrált járművekre vonatkozik.', 'Személyautók tehergépjárművé alakítását kínáljuk N1 típusjóváhagyással. Az ajánlat az Európai Unió egész területén vásárolt, Lengyelországban még nem regisztrált járművekre vonatkozik.',
  'Személyautók tehergépjárművé alakítását kínáljuk N1 típusjóváhagyással. Az ajánlat az Európai Unió egész területén vásárolt, Lengyelországban még nem regisztrált járművekre vonatkozik.

**Műszaki követelmény:** a járműnek olyan hátsó ajtóval kell rendelkeznie, amely az üveggel együtt nyílik – felfelé vagy oldalra.

**Megvalósítási példa:** Skoda Fabia tehergépjárművé alakítva – egy sor ülőhely és a rakodóteret elválasztó rács.

Jövedéki adó és áfa Lengyelországban megfizetve.

Az N1 típusjóváhagyással rendelkező jármű B kategóriás jogosítvánnyal vezethető, ugyanakkor kedvező adózási elszámolási lehetőséget biztosít a vállalkozások számára. Lehetséges a jármű vásárlásának 100%-os áfalevonása, a teljes vételár levonása a bevételből, valamint a teljes üzemeltetési költségek – például üzemanyag vagy szerviz – elszámolása. Nincs kötelezettség a jármű kilométer-nyilvántartásának vezetésére sem.

**Jogalap:** a 2014. március 11-i általános forgalmi adóról szóló törvény 86a. § (9) bekezdés 1. és 2. pontja.

**Elszámolási példa:** a jármű ára 100 000 PLN nettó, azaz 123 000 PLN bruttó.

**Lehetséges előnyök:** 23 000 PLN – áfalevonás, 19 000 PLN – megtakarítás a jövedelemadón (19% 100 000 PLN-ből), 4 900 PLN – megtakarítás az egészségbiztosítási járulékon (4,9% 100 000 PLN-ből).

Ebben a példában a vállalkozásnál összesen mintegy 46 900 PLN marad. A részleteket érdemes könyvelővel egyeztetni, hogy az elszámolást a vállalkozás adózási formájához igazítsák.

A kisadózó egyösszegű értékcsökkentést is igénybe vehet a de minimis támogatás keretében, és legfeljebb 50 000 EUR nettó értékű tehergépjármű vásárlását levonhatja a bevételből. 2024-ben ez körülbelül 220 000 PLN nettó. Az elköltött összegből az áfa is teljes egészében levonható a 150 000 PLN-es korlát nélkül.

**Az N1 típusjóváhagyás magában foglalja:** a jármű műszaki átalakítását, amely az első üléssor mögötti rács beszerelésébőll és a konfiguráció 2 ülőhelyre és rakodótérre való módosításából áll, az N1 kategóriát igazoló típusjóváhagyási dokumentáció megszerzését, a jármű tehergépjárműként való nyilvántartásba vételéhez szükséges teljes dokumentumkészletet beleértve az új német regisztrációs dokumentumokat, a jármű N1 tehergépjárműként való regisztrálását Lengyelországban.

A jármű lengyelországi regisztrációja után a területi járműellenőrzési állomáson VAT-1a igazolás szerezhető, amely lehetővé teszi a jármű teljes vételárának levonását a bevételből a teljes áfával együtt, valamint az üzemanyag és egyéb üzemeltetési költségek elszámolását kilométer-nyilvántartás vezetése nélkül.

Minden márka és típus járművét átalakítjuk: hatchback, kombi, furgon, SUV, busz és terepjárók. Feltétel, hogy a járművet az Európai Unió területén vásárolták, és korábban nem regisztrálták Lengyelországban.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'ed03af2a-5c34-4105-b7cd-145ecc56ec10', 'ro', 'Conversie autoturism în vehicul comercial – Omologare N1 (Pentru firme)', 'Conversie autoturism în vehicul comercial – Omologare N1 (Pentru firme)', 'Conversie autoturism în vehicul comercial – Omologare N1 (Pentru firme)', 'Oferim conversia autoturismelor în vehicule comerciale cu omologare N1. Oferta se aplică vehiculelor achiziționate pe teritoriul întregii Uniuni Europene care nu au fost încă înmatriculate în Polonia. Condiție tehnică: autoturismul trebuie să aibă hayonul care se deschide împreună cu geamul – în sus sau lateral. Exemplu de realizare: Skoda Fabia transformată în vehicul comercial – un rând de scaune și grilaj de separare a spațiului de încărcare. Acciza și TVA plătite în Polonia. Vehiculul cu omologare N1 poate fi condus cu permis de conducere categoria B și oferă posibilitatea unei contabilizări avantajoase în firmă. Este posibilă deducerea a 100% TVA la achiziția vehiculului, deducerea întregii valori de achiziție din venit și contabilizarea costurilor complete de exploatare, precum combustibilul sau service-ul. Nu există obligația de a ține evidența rulajului vehiculului. Temei juridic: art. 86a alin. 9 pct. 1 și 2 din Legea privind TVA din 11 martie 2014. Exemplu de calcul: prețul mașinii 100 000 PLN net, adică 123 000 PLN brut. Beneficii posibile: 23 000 PLN – deducere TVA, 19 000 PLN – economie la impozitul pe venit (19% din 100 000 PLN), 4 900 PLN – economie la contribuția de sănătate (4,9% din 100 000 PLN). În acest exemplu, în firmă rămân aproximativ 46 900 PLN. Detaliile este bine să le consultați cu un contabil pentru a adapta calculul la forma de impozitare. Contribuabilul mic poate beneficia și de amortizare unică în cadrul ajutorului de minimis și poate deduce din venit achiziția unui vehicul comercial de până la 50 000 euro net. În 2024, aceasta este aproximativ 220 000 PLN net. Din suma cheltuită se poate deduce suplimentar TVA integral fără limita de 150 000 PLN. Omologarea N1 include: modificarea tehnică a autoturismului constând în montarea unui grilaj după primul rând de scaune și schimbarea configurației la 2 locuri și spațiu de încărcare, obținerea documentației de omologare care confirmă categoria N1, un set complet de documente pentru înmatricularea vehiculului ca comercial, inclusiv noi documente germane de înmatriculare, înmatricularea vehiculului în Polonia ca vehicul comercial N1. După înmatricularea vehiculului în Polonia, la stația de control tehnic se poate obține certificatul VAT-1a, care permite deducerea întregii sume de achiziție a vehiculului din venit împreună cu TVA integral și contabilizarea combustibilului și a altor costuri de exploatare fără a fi necesară evidența rulajului. Convertim autoturisme de toate mărcile și tipurile: hatchback, break, van, SUV, autobuz și vehicule de teren. Condiția este achiziționarea vehiculului pe teritoriul Uniunii Europene și lipsa înmatriculării anterioare în Polonia.', 'Oferim conversia autoturismelor în vehicule comerciale cu omologare N1. Oferta se aplică vehiculelor achiziționate pe teritoriul întregii Uniuni Europene care nu au fost încă înmatriculate în Polonia. Condiție tehnică: autoturismul trebuie să aibă hayonul care se deschide împreună cu geamul – în sus sau lateral. Exemplu de realizare: Skoda Fabia transformată în vehicul comercial – un rând de scaune și grilaj de separare a spațiului de încărcare. Acciza și TVA plătite în Polonia. Vehiculul cu omologare N1 poate fi condus cu permis de conducere categoria B și oferă posibilitatea unei contabilizări avantajoase în firmă. Este posibilă deducerea a 100% TVA la achiziția vehiculului, deducerea întregii valori de achiziție din venit și contabilizarea costurilor complete de exploatare, precum combustibilul sau service-ul. Nu există obligația de a ține evidența rulajului vehiculului. Temei juridic: art. 86a alin. 9 pct. 1 și 2 din Legea privind TVA din 11 martie 2014. Exemplu de calcul: prețul mașinii 100 000 PLN net, adică 123 000 PLN brut. Beneficii posibile: 23 000 PLN – deducere TVA, 19 000 PLN – economie la impozitul pe venit (19% din 100 000 PLN), 4 900 PLN – economie la contribuția de sănătate (4,9% din 100 000 PLN). În acest exemplu, în firmă rămân aproximativ 46 900 PLN. Detaliile este bine să le consultați cu un contabil pentru a adapta calculul la forma de impozitare. Contribuabilul mic poate beneficia și de amortizare unică în cadrul ajutorului de minimis și poate deduce din venit achiziția unui vehicul comercial de până la 50 000 euro net. În 2024, aceasta este aproximativ 220 000 PLN net. Din suma cheltuită se poate deduce suplimentar TVA integral fără limita de 150 000 PLN. Omologarea N1 include: modificarea tehnică a autoturismului constând în montarea unui grilaj după primul rând de scaune și schimbarea configurației la 2 locuri și spațiu de încărcare, obținerea documentației de omologare care confirmă categoria N1, un set complet de documente pentru înmatricularea vehiculului ca comercial, inclusiv noi documente germane de înmatriculare, înmatricularea vehiculului în Polonia ca vehicul comercial N1. După înmatricularea vehiculului în Polonia, la stația de control tehnic se poate obține certificatul VAT-1a, care permite deducerea întregii sume de achiziție a vehiculului din venit împreună cu TVA integral și contabilizarea combustibilului și a altor costuri de exploatare fără a fi necesară evidența rulajului. Convertim autoturisme de toate mărcile și tipurile: hatchback, break, van, SUV, autobuz și vehicule de teren. Condiția este achiziționarea vehiculului pe teritoriul Uniunii Europene și lipsa înmatriculării anterioare în Polonia.',
  'Oferim conversia autoturismelor în vehicule comerciale cu omologare N1. Oferta se aplică vehiculelor achiziționate pe teritoriul întregii Uniuni Europene care nu au fost încă înmatriculate în Polonia. Condiție tehnică: autoturismul trebuie să aibă hayonul care se deschide împreună cu geamul – în sus sau lateral. Exemplu de realizare: Skoda Fabia transformată în vehicul comercial – un rând de scaune și grilaj de separare a spațiului de încărcare. Acciza și TVA plătite în Polonia. Vehiculul cu omologare N1 poate fi condus cu permis de conducere categoria B și oferă posibilitatea unei contabilizări avantajoase în firmă. Este posibilă deducerea a 100% TVA la achiziția vehiculului, deducerea întregii valori de achiziție din venit și contabilizarea costurilor complete de exploatare, precum combustibilul sau service-ul. Nu există obligația de a ține evidența rulajului vehiculului. Temei juridic: art. 86a alin. 9 pct. 1 și 2 din Legea privind TVA din 11 martie 2014. Exemplu de calcul: prețul mașinii 100 000 PLN net, adică 123 000 PLN brut. Beneficii posibile: 23 000 PLN – deducere TVA, 19 000 PLN – economie la impozitul pe venit (19% din 100 000 PLN), 4 900 PLN – economie la contribuția de sănătate (4,9% din 100 000 PLN). În acest exemplu, în firmă rămân aproximativ 46 900 PLN. Detaliile este bine să le consultați cu un contabil pentru a adapta calculul la forma de impozitare. Contribuabilul mic poate beneficia și de amortizare unică în cadrul ajutorului de minimis și poate deduce din venit achiziția unui vehicul comercial de până la 50 000 euro net. În 2024, aceasta este aproximativ 220 000 PLN net. Din suma cheltuită se poate deduce suplimentar TVA integral fără limita de 150 000 PLN. Omologarea N1 include: modificarea tehnică a autoturismului constând în montarea unui grilaj după primul rând de scaune și schimbarea configurației la 2 locuri și spațiu de încărcare, obținerea documentației de omologare care confirmă categoria N1, un set complet de documente pentru înmatricularea vehiculului ca comercial, inclusiv noi documente germane de înmatriculare, înmatricularea vehiculului în Polonia ca vehicul comercial N1. După înmatricularea vehiculului în Polonia, la stația de control tehnic se poate obține certificatul VAT-1a, care permite deducerea întregii sume de achiziție a vehiculului din venit împreună cu TVA integral și contabilizarea combustibilului și a altor costuri de exploatare fără a fi necesară evidența rulajului. Convertim autoturisme de toate mărcile și tipurile: hatchback, break, van, SUV, autobuz și vehicule de teren. Condiția este achiziționarea vehiculului pe teritoriul Uniunii Europene și lipsa înmatriculării anterioare în Polonia.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'ed03af2a-5c34-4105-b7cd-145ecc56ec10', 'lt', 'Lengvojo automobilio pavertimas komercine transporto priemone – N1 tipo patvirtinimas (Įmonėms)', 'Lengvojo automobilio pavertimas komercine transporto priemone – N1 tipo patvirtinimas (Įmonėms)', 'Lengvojo automobilio pavertimas komercine transporto priemone – N1 tipo patvirtinimas (Įmonėms)', 'Siūlome lengvųjų automobilių pertvarkymą į komercines transporto priemones su N1 tipo patvirtinimu. Pasiūlymas taikomas transporto priemonėms, įsigytoms visoje Europos Sąjungoje, kurios dar nėra užregistruotos Lenkijoje. Techninė sąlyga: automobilis turi turėti galinį dangtį, atsidarantį kartu su stiklu – į viršų arba į šoną. Realizacijos pavyzdys: „Skoda Fabia“, pertvarkyta į komercinį automobilį – viena sėdynių eilė ir grotelės, skiriančios krovininę erdvę. Akcizas ir PVM sumokėti Lenkijoje. N1 tipo patvirtinimą turintį automobilį gali vairuoti B kategorijos teisių turėtojai, jis suteikia galimybę palankiai atsiskaityti įmonėje. Galima atskaityti 100% PVM nuo transporto priemonės įsigijimo, atskaityti visą įsigijimo vertę iš pajamų ir apskaityti visas eksploatacijos išlaidas, tokias kaip kuras ar servisas. Taip pat nėra prievolės vesti transporto priemonės ridos apskaitos. Teisinis pagrindas: 2014 m. kovo 11 d. PVM įstatymo 86a str. 9 d. 1 ir 2 p. Skaičiavimo pavyzdys: automobilio kaina 100 000 PLN neto, t. y. 123 000 PLN bruto. Galima nauda: 23 000 PLN – PVM atskaitymas, 19 000 PLN – sutaupymas pajamų mokesčiui (19% nuo 100 000 PLN), 4 900 PLN – sutaupymas sveikatos draudimo įmokai (4,9% nuo 100 000 PLN). Šiame pavyzdyje įmonėje lieka apie 46 900 PLN. Išsamiau geriausia pasikonsultuoti su buhalteriu, kad pritaikytumėte skaičiavimą pagal savo apmokestinimo formą. Mažasis mokesčių mokėtojas taip pat gali pasinaudoti vienkartiniu nudėvėjimu pagal de minimis pagalbą ir atskaityti iš pajamų komercinio automobilio įsigijimą iki 50 000 eurų neto. 2024 m. tai yra apie 220 000 PLN neto. Iš išleistos sumos galima papildomai atskaityti visą PVM be 150 000 PLN ribos. N1 tipo patvirtinimas apima: techninį automobilio pertvarkymą, montuojant groteles už pirmos sėdynių eilės ir pakeičiant konfigūraciją į 2 sėdimas vietas ir krovininę erdvę, N1 kategoriją patvirtinančios dokumentacijos gavimą, pilną dokumentų rinkinį transporto priemonės registracijai kaip krovininės, įskaitant naujus vokiškus registracijos dokumentus, transporto priemonės registraciją Lenkijoje kaip N1 krovininio automobilio. Po transporto priemonės registracijos Lenkijoje apygardos techninės apžiūros stotyje galima gauti VAT-1a pažymėjimą, kuris leidžia atskaityti visą transporto priemonės įsigijimo sumą iš pajamų kartu su visu PVM bei apskaityti kurą ir kitas eksploatacijos išlaidas be būtinybės vesti ridos apskaitą. Pertvarkome visų markių ir tipų automobilius: hatchback, universalo, van, visureigių, autobusų ir krovininius automobilius. Sąlyga – transporto priemonė įsigyta Europos Sąjungos teritorijoje ir nėra anksčiau registruota Lenkijoje.', 'Siūlome lengvųjų automobilių pertvarkymą į komercines transporto priemones su N1 tipo patvirtinimu. Pasiūlymas taikomas transporto priemonėms, įsigytoms visoje Europos Sąjungoje, kurios dar nėra užregistruotos Lenkijoje. Techninė sąlyga: automobilis turi turėti galinį dangtį, atsidarantį kartu su stiklu – į viršų arba į šoną. Realizacijos pavyzdys: „Skoda Fabia“, pertvarkyta į komercinį automobilį – viena sėdynių eilė ir grotelės, skiriančios krovininę erdvę. Akcizas ir PVM sumokėti Lenkijoje. N1 tipo patvirtinimą turintį automobilį gali vairuoti B kategorijos teisių turėtojai, jis suteikia galimybę palankiai atsiskaityti įmonėje. Galima atskaityti 100% PVM nuo transporto priemonės įsigijimo, atskaityti visą įsigijimo vertę iš pajamų ir apskaityti visas eksploatacijos išlaidas, tokias kaip kuras ar servisas. Taip pat nėra prievolės vesti transporto priemonės ridos apskaitos. Teisinis pagrindas: 2014 m. kovo 11 d. PVM įstatymo 86a str. 9 d. 1 ir 2 p. Skaičiavimo pavyzdys: automobilio kaina 100 000 PLN neto, t. y. 123 000 PLN bruto. Galima nauda: 23 000 PLN – PVM atskaitymas, 19 000 PLN – sutaupymas pajamų mokesčiui (19% nuo 100 000 PLN), 4 900 PLN – sutaupymas sveikatos draudimo įmokai (4,9% nuo 100 000 PLN). Šiame pavyzdyje įmonėje lieka apie 46 900 PLN. Išsamiau geriausia pasikonsultuoti su buhalteriu, kad pritaikytumėte skaičiavimą pagal savo apmokestinimo formą. Mažasis mokesčių mokėtojas taip pat gali pasinaudoti vienkartiniu nudėvėjimu pagal de minimis pagalbą ir atskaityti iš pajamų komercinio automobilio įsigijimą iki 50 000 eurų neto. 2024 m. tai yra apie 220 000 PLN neto. Iš išleistos sumos galima papildomai atskaityti visą PVM be 150 000 PLN ribos. N1 tipo patvirtinimas apima: techninį automobilio pertvarkymą, montuojant groteles už pirmos sėdynių eilės ir pakeičiant konfigūraciją į 2 sėdimas vietas ir krovininę erdvę, N1 kategoriją patvirtinančios dokumentacijos gavimą, pilną dokumentų rinkinį transporto priemonės registracijai kaip krovininės, įskaitant naujus vokiškus registracijos dokumentus, transporto priemonės registraciją Lenkijoje kaip N1 krovininio automobilio. Po transporto priemonės registracijos Lenkijoje apygardos techninės apžiūros stotyje galima gauti VAT-1a pažymėjimą, kuris leidžia atskaityti visą transporto priemonės įsigijimo sumą iš pajamų kartu su visu PVM bei apskaityti kurą ir kitas eksploatacijos išlaidas be būtinybės vesti ridos apskaitą. Pertvarkome visų markių ir tipų automobilius: hatchback, universalo, van, visureigių, autobusų ir krovininius automobilius. Sąlyga – transporto priemonė įsigyta Europos Sąjungos teritorijoje ir nėra anksčiau registruota Lenkijoje.',
  'Siūlome lengvųjų automobilių pertvarkymą į komercines transporto priemones su N1 tipo patvirtinimu. Pasiūlymas taikomas transporto priemonėms, įsigytoms visoje Europos Sąjungoje, kurios dar nėra užregistruotos Lenkijoje. Techninė sąlyga: automobilis turi turėti galinį dangtį, atsidarantį kartu su stiklu – į viršų arba į šoną. Realizacijos pavyzdys: „Skoda Fabia“, pertvarkyta į komercinį automobilį – viena sėdynių eilė ir grotelės, skiriančios krovininę erdvę. Akcizas ir PVM sumokėti Lenkijoje. N1 tipo patvirtinimą turintį automobilį gali vairuoti B kategorijos teisių turėtojai, jis suteikia galimybę palankiai atsiskaityti įmonėje. Galima atskaityti 100% PVM nuo transporto priemonės įsigijimo, atskaityti visą įsigijimo vertę iš pajamų ir apskaityti visas eksploatacijos išlaidas, tokias kaip kuras ar servisas. Taip pat nėra prievolės vesti transporto priemonės ridos apskaitos. Teisinis pagrindas: 2014 m. kovo 11 d. PVM įstatymo 86a str. 9 d. 1 ir 2 p. Skaičiavimo pavyzdys: automobilio kaina 100 000 PLN neto, t. y. 123 000 PLN bruto. Galima nauda: 23 000 PLN – PVM atskaitymas, 19 000 PLN – sutaupymas pajamų mokesčiui (19% nuo 100 000 PLN), 4 900 PLN – sutaupymas sveikatos draudimo įmokai (4,9% nuo 100 000 PLN). Šiame pavyzdyje įmonėje lieka apie 46 900 PLN. Išsamiau geriausia pasikonsultuoti su buhalteriu, kad pritaikytumėte skaičiavimą pagal savo apmokestinimo formą. Mažasis mokesčių mokėtojas taip pat gali pasinaudoti vienkartiniu nudėvėjimu pagal de minimis pagalbą ir atskaityti iš pajamų komercinio automobilio įsigijimą iki 50 000 eurų neto. 2024 m. tai yra apie 220 000 PLN neto. Iš išleistos sumos galima papildomai atskaityti visą PVM be 150 000 PLN ribos. N1 tipo patvirtinimas apima: techninį automobilio pertvarkymą, montuojant groteles už pirmos sėdynių eilės ir pakeičiant konfigūraciją į 2 sėdimas vietas ir krovininę erdvę, N1 kategoriją patvirtinančios dokumentacijos gavimą, pilną dokumentų rinkinį transporto priemonės registracijai kaip krovininės, įskaitant naujus vokiškus registracijos dokumentus, transporto priemonės registraciją Lenkijoje kaip N1 krovininio automobilio. Po transporto priemonės registracijos Lenkijoje apygardos techninės apžiūros stotyje galima gauti VAT-1a pažymėjimą, kuris leidžia atskaityti visą transporto priemonės įsigijimo sumą iš pajamų kartu su visu PVM bei apskaityti kurą ir kitas eksploatacijos išlaidas be būtinybės vesti ridos apskaitą. Pertvarkome visų markių ir tipų automobilius: hatchback, universalo, van, visureigių, autobusų ir krovininius automobilius. Sąlyga – transporto priemonė įsigyta Europos Sąjungos teritorijoje ir nėra anksčiau registruota Lenkijoje.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;

-- zmiana-dmc-3500 :: Zmiana DMC (Dopuszczalna Masa Całkowita) w dół do 3500 kg
INSERT INTO services (id, category_id, image_url, slug, published, featured, sort_order) VALUES ('dd24e081-9006-4e6e-ac60-e3aed8ad3942', 'cb214439-ec8b-4bd7-8443-ec54df21bb20', '/uploads/1772906088384-x9krq9.jpg', 'zmiana-dmc-3500', true, false, 10) ON CONFLICT (slug) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'dd24e081-9006-4e6e-ac60-e3aed8ad3942', 'pl', 'Zmiana DMC (Dopuszczalna Masa Całkowita) w dół do 3500 kg', 'Zmiana DMC (Dopuszczalna Masa Całkowita) w dół do 3500 kg', 'Zmiana DMC (Dopuszczalna Masa Całkowita) w dół do 3500 kg', 'Usługa wykonywana w Niemczech – przed wprowadzeniem pojazdu do Polski.', 'Usługa wykonywana w Niemczech – przed wprowadzeniem pojazdu do Polski.',
  'Usługa wykonywana w Niemczech – przed wprowadzeniem pojazdu do Polski.

Zmiana DMC w dół (z wyższego na niższe, np. z 6000 kg, 5000 kg lub 4600 kg do 3500 kg – kategoria N1, prawo jazdy kat. B)

Oferta dotyczy samochodów zakupionych na terenie całej Unii Europejskiej.

W wyniku przeprowadzonej procedury otrzymują Państwo:

- pełną dokumentację z niemieckich urzędów,
- nowe niemieckie dowody rejestracyjne (Briefy) z wpisanym nowym DMC,
- nową tabliczkę znamionową z numerem VIN pojazdu oraz zaktualizowanymi wartościami DMC.

Szczegółowe informacje udzielamy telefonicznie.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'dd24e081-9006-4e6e-ac60-e3aed8ad3942', 'en', 'GVW (Gross Vehicle Weight) reduction down to 3500 kg', 'GVW (Gross Vehicle Weight) reduction down to 3500 kg', 'GVW (Gross Vehicle Weight) reduction down to 3500 kg', 'Service performed in Germany – before the vehicle is imported to Poland.', 'Service performed in Germany – before the vehicle is imported to Poland.',
  'Service performed in Germany – before the vehicle is imported to Poland.

GVW reduction (from a higher to a lower value, e.g. from 6000 kg, 5000 kg or 4600 kg to 3500 kg – category N1, class B driving licence)

The offer applies to vehicles purchased anywhere in the European Union.

## As a result of the procedure, you will receive

- full documentation from German authorities,
- new German vehicle registration documents (Briefs) with the new GVW entered,
- a new nameplate with the vehicle''s VIN number and updated GVW values.

For detailed information, please contact us by phone.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'dd24e081-9006-4e6e-ac60-e3aed8ad3942', 'uk', 'Зниження ДМЦ (допустима повна маса) до 3500 кг', 'Зниження ДМЦ (допустима повна маса) до 3500 кг', 'Зниження ДМЦ (допустима повна маса) до 3500 кг', 'Послуга виконується в Німеччині – до ввезення транспортного засобу в Польщу.', 'Послуга виконується в Німеччині – до ввезення транспортного засобу в Польщу.',
  'Послуга виконується в Німеччині – до ввезення транспортного засобу в Польщу.

Зниження ДМЦ (з вищого до нижчого значення, наприклад з 6000 кг, 5000 кг або 4600 кг до 3500 кг – категорія N1, посвідчення водія кат. B)

Пропозиція стосується автомобілів, придбаних на території всього Європейського Союзу.

## В результаті проведеної процедури ви отримуєте

- повну документацію з німецьких органів,
- нові німецькі свідоцтва про реєстрацію (Бріфи) із зазначенням нового ДМЦ,
- нову заводську табличку з номером VIN транспортного засобу та оновленими значеннями ДМЦ.

Детальну інформацію надаємо телефоном.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'dd24e081-9006-4e6e-ac60-e3aed8ad3942', 'ru', 'Снижение ДМЦ (допустимая полная масса) до 3500 кг', 'Снижение ДМЦ (допустимая полная масса) до 3500 кг', 'Снижение ДМЦ (допустимая полная масса) до 3500 кг', 'Услуга выполняется в Германии – до ввоза транспортного средства в Польшу.', 'Услуга выполняется в Германии – до ввоза транспортного средства в Польшу.',
  'Услуга выполняется в Германии – до ввоза транспортного средства в Польшу.

Снижение ДМЦ (с более высокого до более низкого значения, например с 6000 кг, 5000 кг или 4600 кг до 3500 кг – категория N1, водительское удостоверение кат. B)

Предложение распространяется на автомобили, приобретённые на территории всего Европейского Союза.

## В результате проведённой процедуры вы получаете

- полную документацию от немецких органов,
- новые немецкие свидетельства о регистрации (Брифы) с указанием нового ДМЦ,
- новую заводскую табличку с номером VIN транспортного средства и обновлёнными значениями ДМЦ.

Подробную информацию предоставляем по телефону.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'dd24e081-9006-4e6e-ac60-e3aed8ad3942', 'cs', 'Snížení celkové hmotnosti vozidla na 3500 kg', 'Snížení celkové hmotnosti vozidla na 3500 kg', 'Snížení celkové hmotnosti vozidla na 3500 kg', 'Služba se provádí v Německu – před dovozem vozidla do Polska.', 'Služba se provádí v Německu – před dovozem vozidla do Polska.',
  'Služba se provádí v Německu – před dovozem vozidla do Polska.

Snížení celkové hmotnosti (z vyšší na nižší hodnotu, např. ze 6000 kg, 5000 kg nebo 4600 kg na 3500 kg – kategorie N1, řidičský průkaz skupiny B)

Nabídka se týká vozidel zakoupených kdekoliv v Evropské unii.

## V důsledku provedené procedury obdržíte

- úplnou dokumentaci z německých úřadů,
- nové německé technické průkazy (Briefy) se zapsanou novou celkovou hmotností,
- nový výrobní štítek s číslem VIN vozidla a aktualizovanými hodnotami celkové hmotnosti.

Podrobné informace poskytujeme telefonicky.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'dd24e081-9006-4e6e-ac60-e3aed8ad3942', 'es', 'Reducción de la MMA (masa máxima autorizada) hasta 3500 kg', 'Reducción de la MMA (masa máxima autorizada) hasta 3500 kg', 'Reducción de la MMA (masa máxima autorizada) hasta 3500 kg', 'Servicio realizado en Alemania – antes de la introducción del vehículo en Polonia.', 'Servicio realizado en Alemania – antes de la introducción del vehículo en Polonia.',
  'Servicio realizado en Alemania – antes de la introducción del vehículo en Polonia.

Reducción de la MMA (de un valor superior a uno inferior, p. ej. de 6000 kg, 5000 kg o 4600 kg a 3500 kg – categoría N1, permiso de conducir clase B)

La oferta se aplica a vehículos adquiridos en cualquier país de la Unión Europea.

## Como resultado del procedimiento, usted recibirá

- documentación completa de las autoridades alemanas,
- nuevos documentos de matriculación alemanes (Briefs) con la nueva MMA registrada,
- una nueva placa de características con el número VIN del vehículo y los valores de MMA actualizados.

Para información detallada, contáctenos por teléfono.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'dd24e081-9006-4e6e-ac60-e3aed8ad3942', 'it', 'Riduzione della MTT (massa totale a terra) a 3500 kg', 'Riduzione della MTT (massa totale a terra) a 3500 kg', 'Riduzione della MTT (massa totale a terra) a 3500 kg', 'Servizio eseguito in Germania – prima dell''introduzione del veicolo in Polonia.', 'Servizio eseguito in Germania – prima dell''introduzione del veicolo in Polonia.',
  'Servizio eseguito in Germania – prima dell''introduzione del veicolo in Polonia.

Riduzione della MTT (da un valore superiore a uno inferiore, ad es. da 6000 kg, 5000 kg o 4600 kg a 3500 kg – categoria N1, patente di guida classe B)

L''offerta riguarda veicoli acquistati in qualsiasi paese dell''Unione Europea.

A seguito della procedura effettuata, si riceverà:

- documentazione completa rilasciata dalle autorità tedesche,
- nuovi documenti di immatricolazione tedeschi (Brief) con la nuova MTT registrata,
- una nuova targhetta di identificazione con il numero VIN del veicolo e i valori MTT aggiornati.

Per informazioni dettagliate, contattateci telefonicamente.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'dd24e081-9006-4e6e-ac60-e3aed8ad3942', 'hu', 'GVM (megengedett legnagyobb össztömeg) csökkentése 3500 kg-ra', 'GVM (megengedett legnagyobb össztömeg) csökkentése 3500 kg-ra', 'GVM (megengedett legnagyobb össztömeg) csökkentése 3500 kg-ra', 'A szolgáltatást Németországban végzik el – a jármű Lengyelországba történő behozatala előtt.', 'A szolgáltatást Németországban végzik el – a jármű Lengyelországba történő behozatala előtt.',
  'A szolgáltatást Németországban végzik el – a jármű Lengyelországba történő behozatala előtt.

GVM csökkentése (magasabb értékről alacsonyabbra, pl. 6000 kg-ról, 5000 kg-ról vagy 4600 kg-ról 3500 kg-ra – N1 kategória, B kategóriás jogosítvány)

Az ajánlat az Európai Unió egész területén vásárolt járművekre vonatkozik.

## Az elvégzett eljárás eredményeként Ön megkapja

- a német hatóságok által kiadott teljes dokumentációt,
- az új GVM-értékkel ellátott új német forgalmi engedélyeket (Briefeket),
- a jármű VIN-számával és frissített GVM-értékekkel ellátott új gyártói adattáblát.

Részletes tájékoztatást telefonon nyújtunk.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'dd24e081-9006-4e6e-ac60-e3aed8ad3942', 'ro', 'Reducere MTMA (Masă Totală Maximă Admisă) până la 3500 kg', 'Reducere MTMA (Masă Totală Maximă Admisă) până la 3500 kg', 'Reducere MTMA (Masă Totală Maximă Admisă) până la 3500 kg', 'Serviciu efectuat în Germania – înainte de introducerea vehiculului în Polonia. Reducerea MTMA (de la o valoare mai mare la una mai mică, de ex. de la 6000 kg, 5000 kg sau 4600 kg la 3500 kg – categoria N1, permis de conducere categoria B) Oferta se aplică autovehiculelor achiziționate pe teritoriul întregii Uniuni Europene. În urma procedurii efectuate, veți primi: * documentație completă de la autoritățile germane, * noi documente germane de înmatriculare (Briefuri) cu noua MTMA înscrisă, * o nouă plăcuță indicatoare cu numărul VIN al vehiculului și valorile actualizate ale MTMA. Pentru informații detaliate, vă rugăm să ne contactați telefonic.', 'Serviciu efectuat în Germania – înainte de introducerea vehiculului în Polonia. Reducerea MTMA (de la o valoare mai mare la una mai mică, de ex. de la 6000 kg, 5000 kg sau 4600 kg la 3500 kg – categoria N1, permis de conducere categoria B) Oferta se aplică autovehiculelor achiziționate pe teritoriul întregii Uniuni Europene. În urma procedurii efectuate, veți primi: * documentație completă de la autoritățile germane, * noi documente germane de înmatriculare (Briefuri) cu noua MTMA înscrisă, * o nouă plăcuță indicatoare cu numărul VIN al vehiculului și valorile actualizate ale MTMA. Pentru informații detaliate, vă rugăm să ne contactați telefonic.',
  'Serviciu efectuat în Germania – înainte de introducerea vehiculului în Polonia. Reducerea MTMA (de la o valoare mai mare la una mai mică, de ex. de la 6000 kg, 5000 kg sau 4600 kg la 3500 kg – categoria N1, permis de conducere categoria B) Oferta se aplică autovehiculelor achiziționate pe teritoriul întregii Uniuni Europene. În urma procedurii efectuate, veți primi: * documentație completă de la autoritățile germane, * noi documente germane de înmatriculare (Briefuri) cu noua MTMA înscrisă, * o nouă plăcuță indicatoare cu numărul VIN al vehiculului și valorile actualizate ale MTMA. Pentru informații detaliate, vă rugăm să ne contactați telefonic.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'dd24e081-9006-4e6e-ac60-e3aed8ad3942', 'lt', 'DLM (Didžiausios leidžiamos masės) sumažinimas iki 3500 kg', 'DLM (Didžiausios leidžiamos masės) sumažinimas iki 3500 kg', 'DLM (Didžiausios leidžiamos masės) sumažinimas iki 3500 kg', 'Paslauga atliekama Vokietijoje – prieš įvežant transporto priemonę į Lenkiją. DLM mažinimas (iš didesnės į mažesnę vertę, pvz., nuo 6000 kg, 5000 kg arba 4600 kg iki 3500 kg – N1 kategorija, B kategorijos vairuotojo pažymėjimas) Pasiūlymas taikomas automobiliams, įsigytiems visoje Europos Sąjungoje. Atlikus procedūrą, gausite: * pilną dokumentaciją iš Vokietijos institucijų, * naujus vokiškus transporto priemonės registracijos dokumentus (Briefus) su įrašyta nauja DLM, * naują identifikacinę plokštelę su transporto priemonės VIN numeriu ir atnaujintomis DLM vertėmis. Išsamios informacijos teiraukitės telefonu.', 'Paslauga atliekama Vokietijoje – prieš įvežant transporto priemonę į Lenkiją. DLM mažinimas (iš didesnės į mažesnę vertę, pvz., nuo 6000 kg, 5000 kg arba 4600 kg iki 3500 kg – N1 kategorija, B kategorijos vairuotojo pažymėjimas) Pasiūlymas taikomas automobiliams, įsigytiems visoje Europos Sąjungoje. Atlikus procedūrą, gausite: * pilną dokumentaciją iš Vokietijos institucijų, * naujus vokiškus transporto priemonės registracijos dokumentus (Briefus) su įrašyta nauja DLM, * naują identifikacinę plokštelę su transporto priemonės VIN numeriu ir atnaujintomis DLM vertėmis. Išsamios informacijos teiraukitės telefonu.',
  'Paslauga atliekama Vokietijoje – prieš įvežant transporto priemonę į Lenkiją. DLM mažinimas (iš didesnės į mažesnę vertę, pvz., nuo 6000 kg, 5000 kg arba 4600 kg iki 3500 kg – N1 kategorija, B kategorijos vairuotojo pažymėjimas) Pasiūlymas taikomas automobiliams, įsigytiems visoje Europos Sąjungoje. Atlikus procedūrą, gausite: * pilną dokumentaciją iš Vokietijos institucijų, * naujus vokiškus transporto priemonės registracijos dokumentus (Briefus) su įrašyta nauja DLM, * naują identifikacinę plokštelę su transporto priemonės VIN numeriu ir atnaujintomis DLM vertėmis. Išsamios informacijos teiraukitės telefonu.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;

-- rejestracja-pojazdu :: Niemiecki Przegląd. Rejestracja i wyrejestrowanie auta w Niemczech.
INSERT INTO services (id, category_id, image_url, slug, published, featured, sort_order) VALUES ('ab4daaa2-47a7-42d9-99c2-970d921c79c3', '5b04fe15-e731-47bd-9442-e775179b93fb', '/uploads/1772906209074-h9ag98.jpg', 'rejestracja-pojazdu', true, false, 40) ON CONFLICT (slug) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'ab4daaa2-47a7-42d9-99c2-970d921c79c3', 'pl', 'Niemiecki Przegląd. Rejestracja i wyrejestrowanie auta w Niemczech.', 'Niemiecki Przegląd. Rejestracja i wyrejestrowanie auta w Niemczech.', 'Niemiecki Przegląd. Rejestracja i wyrejestrowanie auta w Niemczech.', 'Masz samochód zarejestrowany w Niemczech i kończy się przegląd techniczny, ale nie wiesz jak się za to zabrać albo nie znasz języka? Pomożemy przejść przez cały proces.', 'Masz samochód zarejestrowany w Niemczech i kończy się przegląd techniczny, ale nie wiesz jak się za to zabrać albo nie znasz języka? Pomożemy przejść przez cały proces.',
  'Masz samochód zarejestrowany w Niemczech i kończy się przegląd techniczny, ale nie wiesz jak się za to zabrać albo nie znasz języka? Pomożemy przejść przez cały proces.

Jeśli posiadasz meldunek w Niemczech i chcesz zarejestrować tam samochód, również możemy w tym pomóc. Zajmujemy się między innymi przeniesieniem polskich zniżek ubezpieczeniowych, organizacją niemieckiego przeglądu technicznego oraz rejestracją pojazdu w niemieckim urzędzie komunikacji.

Pomagamy także w wyrejestrowaniu pojazdów z Niemiec. Jeśli chcesz zarejestrować samochód w Polsce, a pojazd nadal widnieje jako zarejestrowany w Niemczech, również możemy pomóc w uporządkowaniu dokumentów.

Zajmujemy się wszystkimi formalnościami związanymi z rejestracją pojazdów sprowadzanych z zagranicy, w tym: zmianą rodzaju pojazdu (np. osobowy/ciężarowy M1/N1, ciężarowy/osobowy N1/M1, laweta, platforma, skrzynia, pojazdy specjalne – pomoc drogowa, pomoc techniczna itp.), zmianą liczby miejsc siedzących, zmianami konstrukcyjnymi pojazdu, oraz innymi legalnymi modyfikacjami wymaganymi do rejestracji.

Wykonujemy wszystko zgodnie z obowiązującymi przepisami i przygotowujemy niezbędną dokumentację.

Więcej informacji telefonicznie.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'ab4daaa2-47a7-42d9-99c2-970d921c79c3', 'en', 'German Inspection. Vehicle registration and deregistration in Germany.', 'German Inspection. Vehicle registration and deregistration in Germany.', 'German Inspection. Vehicle registration and deregistration in Germany.', 'Do you have a vehicle registered in Germany with an expiring technical inspection but don''t know how to go about it or don''t speak the language? We will help you through the entire process.', 'Do you have a vehicle registered in Germany with an expiring technical inspection but don''t know how to go about it or don''t speak the language? We will help you through the entire process.',
  'Do you have a vehicle registered in Germany with an expiring technical inspection but don''t know how to go about it or don''t speak the language? We will help you through the entire process.

If you have a registered address in Germany and want to register a vehicle there, we can help with that too. We handle, among other things, the transfer of Polish insurance discounts, the organisation of the German technical inspection, and vehicle registration at the German transport authority.

We also assist with deregistering vehicles from Germany. If you want to register your vehicle in Poland but it is still showing as registered in Germany, we can also help with sorting out the documents.

We handle all formalities related to the registration of vehicles imported from abroad, including: change of vehicle type (e.g. passenger/commercial M1/N1, commercial/passenger N1/M1, recovery truck, flatbed, box body, special vehicles – roadside assistance, technical assistance, etc.), change in the number of seats, structural modifications to the vehicle, and other legal modifications required for registration.

We carry out everything in accordance with applicable regulations and prepare all necessary documentation.

For more information, please contact us by phone.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'ab4daaa2-47a7-42d9-99c2-970d921c79c3', 'uk', 'Німецький техогляд. Реєстрація та зняття з обліку авто в Німеччині.', 'Німецький техогляд. Реєстрація та зняття з обліку авто в Німеччині.', 'Німецький техогляд. Реєстрація та зняття з обліку авто в Німеччині.', 'У вас є автомобіль, зареєстрований у Німеччині, і закінчується технічний огляд, але ви не знаєте, як це організувати або не знаєте мови? Ми допоможемо пройти через весь процес.', 'У вас є автомобіль, зареєстрований у Німеччині, і закінчується технічний огляд, але ви не знаєте, як це організувати або не знаєте мови? Ми допоможемо пройти через весь процес.',
  'У вас є автомобіль, зареєстрований у Німеччині, і закінчується технічний огляд, але ви не знаєте, як це організувати або не знаєте мови? Ми допоможемо пройти через весь процес.

Якщо у вас є реєстрація в Німеччині і ви хочете зареєструвати там автомобіль, ми також можемо в цьому допомогти. Ми займаємось, зокрема, перенесенням польських страхових знижок, організацією німецького технічного огляду та реєстрацією транспортного засобу в німецькому відомстві з транспорту.

Ми також допомагаємо зі зняттям транспортних засобів з обліку в Німеччині. Якщо ви хочете зареєструвати автомобіль у Польщі, а транспортний засіб досі значиться зареєстрованим у Німеччині, ми також можемо допомогти впорядкувати документи.

Ми займаємось усіма формальностями, пов''язаними з реєстрацією транспортних засобів, ввезених з-за кордону, зокрема: зміною типу транспортного засобу (наприклад, легковий/вантажний M1/N1, вантажний/легковий N1/M1, евакуатор, платформа, фургон, спеціальні транспортні засоби – дорожня допомога, технічна допомога тощо), зміною кількості місць для сидіння, конструктивними змінами транспортного засобу, а також іншими законними модифікаціями, необхідними для реєстрації.

Ми виконуємо все відповідно до чинних норм і готуємо необхідну документацію.

Детальніша інформація – телефоном.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'ab4daaa2-47a7-42d9-99c2-970d921c79c3', 'ru', 'Немецкий техосмотр. Регистрация и снятие с учёта автомобиля в Германии.', 'Немецкий техосмотр. Регистрация и снятие с учёта автомобиля в Германии.', 'Немецкий техосмотр. Регистрация и снятие с учёта автомобиля в Германии.', 'У вас есть автомобиль, зарегистрированный в Германии, и заканчивается технический осмотр, но вы не знаете, как это организовать или не знаете языка? Мы поможем пройти через весь процесс.', 'У вас есть автомобиль, зарегистрированный в Германии, и заканчивается технический осмотр, но вы не знаете, как это организовать или не знаете языка? Мы поможем пройти через весь процесс.',
  'У вас есть автомобиль, зарегистрированный в Германии, и заканчивается технический осмотр, но вы не знаете, как это организовать или не знаете языка? Мы поможем пройти через весь процесс.

Если у вас есть регистрация в Германии и вы хотите зарегистрировать там автомобиль, мы также можем в этом помочь. Мы занимаемся, в частности, переносом польских страховых скидок, организацией немецкого технического осмотра и регистрацией транспортного средства в немецком ведомстве по транспорту.

Мы также помогаем со снятием транспортных средств с учёта в Германии. Если вы хотите зарегистрировать автомобиль в Польше, а транспортное средство по-прежнему числится зарегистрированным в Германии, мы также можем помочь с упорядочением документов.

Мы занимаемся всеми формальностями, связанными с регистрацией транспортных средств, ввезённых из-за рубежа, в том числе: изменением типа транспортного средства (например, легковой/грузовой M1/N1, грузовой/легковой N1/M1, эвакуатор, платформа, фургон, специальные транспортные средства – дорожная помощь, техническая помощь и т.д.), изменением количества посадочных мест, конструктивными изменениями транспортного средства, а также другими законными модификациями, необходимыми для регистрации.

Всё выполняем в соответствии с действующими нормами и готовим необходимую документацию.

Дополнительная информация – по телефону.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'ab4daaa2-47a7-42d9-99c2-970d921c79c3', 'cs', 'Německá technická prohlídka. Registrace a odhlášení vozidla v Německu.', 'Německá technická prohlídka. Registrace a odhlášení vozidla v Německu.', 'Německá technická prohlídka. Registrace a odhlášení vozidla v Německu.', 'Máte vozidlo registrované v Německu a končí vám technická prohlídka, ale nevíte, jak na to, nebo neznáte jazyk? Pomůžeme vám projít celým procesem.', 'Máte vozidlo registrované v Německu a končí vám technická prohlídka, ale nevíte, jak na to, nebo neznáte jazyk? Pomůžeme vám projít celým procesem.',
  'Máte vozidlo registrované v Německu a končí vám technická prohlídka, ale nevíte, jak na to, nebo neznáte jazyk? Pomůžeme vám projít celým procesem.

Pokud máte trvalý pobyt v Německu a chcete tam registrovat vozidlo, můžeme s tím také pomoci. Zajišťujeme mimo jiné převod polských pojistných slev, organizaci německé technické prohlídky a registraci vozidla na německém dopravním úřadě.

Pomáháme také s odhlášením vozidel v Německu. Pokud chcete zaregistrovat vozidlo v Polsku, ale stále je vedeno jako registrované v Německu, pomůžeme vám také s uspořádáním dokumentů.

Zajišťujeme veškeré formality spojené s registrací vozidel dovezených ze zahraničí, včetně: změny druhu vozidla (např. osobní/nákladní M1/N1, nákladní/osobní N1/M1, odtahový vůz, plošina, skříň, speciální vozidla – silniční asistence, technická pomoc apod.), změny počtu sedadel, konstrukčních úprav vozidla a dalších legálních úprav požadovaných k registraci.

Vše provádíme v souladu s platnými předpisy a připravujeme veškerou potřebnou dokumentaci.

Více informací telefonicky.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'ab4daaa2-47a7-42d9-99c2-970d921c79c3', 'es', 'Inspección técnica alemana. Matriculación y baja del vehículo en Alemania.', 'Inspección técnica alemana. Matriculación y baja del vehículo en Alemania.', 'Inspección técnica alemana. Matriculación y baja del vehículo en Alemania.', 'Tiene un vehículo matriculado en Alemania con la inspección técnica a punto de vencer pero no sabe cómo gestionarlo o no conoce el idioma? Le ayudaremos a través de todo el proceso.', 'Tiene un vehículo matriculado en Alemania con la inspección técnica a punto de vencer pero no sabe cómo gestionarlo o no conoce el idioma? Le ayudaremos a través de todo el proceso.',
  'Tiene un vehículo matriculado en Alemania con la inspección técnica a punto de vencer pero no sabe cómo gestionarlo o no conoce el idioma? Le ayudaremos a través de todo el proceso.

Si tiene empadronamiento en Alemania y quiere matricular allí un vehículo, también podemos ayudarle. Nos encargamos, entre otras cosas, de la transferencia de descuentos de seguro polacos, la organización de la inspección técnica alemana y la matriculación del vehículo en la autoridad de tráfico alemana.

También ayudamos con la baja de vehículos en Alemania. Si quiere matricular su vehículo en Polonia pero sigue figurando como matriculado en Alemania, también podemos ayudarle a ordenar la documentación.

Nos ocupamos de todos los trámites relacionados con la matriculación de vehículos importados del extranjero, incluyendo: cambio de tipo de vehículo (p. ej. turismo/comercial M1/N1, comercial/turismo N1/M1, grúa, plataforma, furgón, vehículos especiales – asistencia en carretera, asistencia técnica, etc.), cambio en el número de plazas, modificaciones estructurales del vehículo y otras modificaciones legales requeridas para la matriculación.

Realizamos todo de acuerdo con la normativa vigente y preparamos la documentación necesaria.

Para más información, contáctenos por teléfono.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'ab4daaa2-47a7-42d9-99c2-970d921c79c3', 'it', 'Revisione tedesca. Immatricolazione e cancellazione del veicolo in Germania.', 'Revisione tedesca. Immatricolazione e cancellazione del veicolo in Germania.', 'Revisione tedesca. Immatricolazione e cancellazione del veicolo in Germania.', 'Ha un veicolo immatricolato in Germania con la revisione tecnica in scadenza ma non sa come procedere o non conosce la lingua? La aiuteremo a svolgere l''intero processo.', 'Ha un veicolo immatricolato in Germania con la revisione tecnica in scadenza ma non sa come procedere o non conosce la lingua? La aiuteremo a svolgere l''intero processo.',
  'Ha un veicolo immatricolato in Germania con la revisione tecnica in scadenza ma non sa come procedere o non conosce la lingua? La aiuteremo a svolgere l''intero processo.

Se ha la residenza in Germania e vuole immatricolare lì un veicolo, possiamo aiutarla anche in questo. Ci occupiamo tra l''altro del trasferimento degli sconti assicurativi polacchi, dell''organizzazione della revisione tecnica tedesca e dell''immatricolazione del veicolo presso l''ufficio dei trasporti tedesco.

Assistiamo anche nella cancellazione dell''immatricolazione dei veicoli in Germania. Se vuole immatricolare il suo veicolo in Polonia ma risulta ancora immatricolato in Germania, possiamo aiutarla anche a mettere in ordine i documenti.

Ci occupiamo di tutte le formalità relative all''immatricolazione di veicoli importati dall''estero, tra cui: modifica della categoria del veicolo (ad es. autovettura/commerciale M1/N1, commerciale/autovettura N1/M1, carro attrezzi, pianale, furgone, veicoli speciali – soccorso stradale, assistenza tecnica ecc.), modifica del numero di posti a sedere, modifiche strutturali del veicolo e altre modifiche legali richieste per l''immatricolazione.

Eseguiamo tutto in conformità con le normative vigenti e prepariamo la documentazione necessaria.

Per ulteriori informazioni, contattateci telefonicamente.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'ab4daaa2-47a7-42d9-99c2-970d921c79c3', 'hu', 'Német műszaki vizsga. Jármű regisztrációja és törlése Németországban.', 'Német műszaki vizsga. Jármű regisztrációja és törlése Németországban.', 'Német műszaki vizsga. Jármű regisztrációja és törlése Németországban.', 'Van Németországban regisztrált járműve, amelynek hamarosan lejár a műszaki vizsgája, de nem tudja, hogyan intézze el, vagy nem beszéli a nyelvet? Segítünk végigmenni az egész folyamaton.', 'Van Németországban regisztrált járműve, amelynek hamarosan lejár a műszaki vizsgája, de nem tudja, hogyan intézze el, vagy nem beszéli a nyelvet? Segítünk végigmenni az egész folyamaton.',
  'Van Németországban regisztrált járműve, amelynek hamarosan lejár a műszaki vizsgája, de nem tudja, hogyan intézze el, vagy nem beszéli a nyelvet? Segítünk végigmenni az egész folyamaton.

Ha németországi lakcímmel rendelkezik és ott szeretne járművet regisztrálni, abban is tudunk segíteni. Foglalkozunk többek között a lengyel biztosítási kedvezmények átvitelével, a német műszaki vizsga megszervezésével és a jármű regisztrálásával a német közlekedési hatóságnál.

Segítünk a járművek németországi törlésében is. Ha Lengyelországban szeretné regisztrálni járművét, de az még mindig németországi regisztráltként szerepel, a dokumentumok rendezésében is tudunk segíteni.

Foglalkozunk a külföldről behozott járművek regisztrációjával kapcsolatos összes formai követelménnyel, beleértve: a jármű típusának megváltoztatását (pl. személyautó/tehergépjármű M1/N1, tehergépjármű/személyautó N1/M1, autómentő, platós, zárt furgon, különleges járművek – útisegély, műszaki segítség stb.), a férőhelyek számának megváltoztatását, a jármű szerkezeti módosításait, valamint a regisztrációhoz szükséges egyéb jogszerű módosításokat.

Mindent a hatályos előírásoknak megfelelően végzünk, és elkészítjük a szükséges dokumentációt.

További információért hívjon minket telefonon.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'ab4daaa2-47a7-42d9-99c2-970d921c79c3', 'ro', 'Inspecție tehnică germană. Înmatricularea și radierea vehiculului în Germania.', 'Inspecție tehnică germană. Înmatricularea și radierea vehiculului în Germania.', 'Inspecție tehnică germană. Înmatricularea și radierea vehiculului în Germania.', 'Aveți un vehicul înmatriculat în Germania și expiră inspecția tehnică, dar nu știți cum să procedați sau nu cunoașteți limba? Vă ajutăm să parcurgeți întregul proces. Dacă aveți domiciliul în Germania și doriți să înmatriculați acolo un vehicul, putem ajuta și cu aceasta. Ne ocupăm, printre altele, de transferul reducerilor de asigurare din Polonia, organizarea inspecției tehnice germane și înmatricularea vehiculului la autoritatea germană de circulație. Ajutăm, de asemenea, la radierea vehiculelor din Germania. Dacă doriți să înmatriculați mașina în Polonia, dar vehiculul figurează încă ca înmatriculat în Germania, vă putem ajuta să puneți documentele în ordine. Ne ocupăm de toate formalitățile legate de înmatricularea vehiculelor importate din străinătate, inclusiv: schimbarea tipului de vehicul (de ex. autoturism/comercial M1/N1, comercial/autoturism N1/M1, platformă, camionetă, vehicule speciale – asistență rutieră, asistență tehnică etc.), modificarea numărului de locuri, modificări constructive ale vehiculului și alte modificări legale necesare pentru înmatriculare. Efectuăm totul conform reglementărilor în vigoare și pregătim documentația necesară. Mai multe informații telefonic.', 'Aveți un vehicul înmatriculat în Germania și expiră inspecția tehnică, dar nu știți cum să procedați sau nu cunoașteți limba? Vă ajutăm să parcurgeți întregul proces. Dacă aveți domiciliul în Germania și doriți să înmatriculați acolo un vehicul, putem ajuta și cu aceasta. Ne ocupăm, printre altele, de transferul reducerilor de asigurare din Polonia, organizarea inspecției tehnice germane și înmatricularea vehiculului la autoritatea germană de circulație. Ajutăm, de asemenea, la radierea vehiculelor din Germania. Dacă doriți să înmatriculați mașina în Polonia, dar vehiculul figurează încă ca înmatriculat în Germania, vă putem ajuta să puneți documentele în ordine. Ne ocupăm de toate formalitățile legate de înmatricularea vehiculelor importate din străinătate, inclusiv: schimbarea tipului de vehicul (de ex. autoturism/comercial M1/N1, comercial/autoturism N1/M1, platformă, camionetă, vehicule speciale – asistență rutieră, asistență tehnică etc.), modificarea numărului de locuri, modificări constructive ale vehiculului și alte modificări legale necesare pentru înmatriculare. Efectuăm totul conform reglementărilor în vigoare și pregătim documentația necesară. Mai multe informații telefonic.',
  'Aveți un vehicul înmatriculat în Germania și expiră inspecția tehnică, dar nu știți cum să procedați sau nu cunoașteți limba? Vă ajutăm să parcurgeți întregul proces. Dacă aveți domiciliul în Germania și doriți să înmatriculați acolo un vehicul, putem ajuta și cu aceasta. Ne ocupăm, printre altele, de transferul reducerilor de asigurare din Polonia, organizarea inspecției tehnice germane și înmatricularea vehiculului la autoritatea germană de circulație. Ajutăm, de asemenea, la radierea vehiculelor din Germania. Dacă doriți să înmatriculați mașina în Polonia, dar vehiculul figurează încă ca înmatriculat în Germania, vă putem ajuta să puneți documentele în ordine. Ne ocupăm de toate formalitățile legate de înmatricularea vehiculelor importate din străinătate, inclusiv: schimbarea tipului de vehicul (de ex. autoturism/comercial M1/N1, comercial/autoturism N1/M1, platformă, camionetă, vehicule speciale – asistență rutieră, asistență tehnică etc.), modificarea numărului de locuri, modificări constructive ale vehiculului și alte modificări legale necesare pentru înmatriculare. Efectuăm totul conform reglementărilor în vigoare și pregătim documentația necesară. Mai multe informații telefonic.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;
INSERT INTO service_translations (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq) VALUES (
  'ab4daaa2-47a7-42d9-99c2-970d921c79c3', 'lt', 'Vokiška techninė apžiūra. Transporto priemonės registracija ir išregistravimas Vokietijoje.', 'Vokiška techninė apžiūra. Transporto priemonės registracija ir išregistravimas Vokietijoje.', 'Vokiška techninė apžiūra. Transporto priemonės registracija ir išregistravimas Vokietijoje.', 'Ar turite Vokietijoje registruotą transporto priemonę, kuriai baigiasi techninės apžiūros galiojimas, bet nežinote, kaip tai sutvarkyti, arba nemokate kalbos? Padėsime jums atlikti visą procesą. Jei turite deklaruotą gyvenamąją vietą Vokietijoje ir norite ten užregistruoti automobilį, taip pat galime padėti. Mes užsiimame, be kita ko, lenkiškų draudimo nuolaidų perkėlimu, vokiškos techninės apžiūros organizavimu ir transporto priemonės registracija Vokietijos transporto įstaigoje. Taip pat padedame išregistruoti transporto priemones iš Vokietijos. Jei norite užregistruoti automobilį Lenkijoje, bet transporto priemonė vis dar nurodyta kaip registruota Vokietijoje, taip pat galime padėti sutvarkyti dokumentus. Mes tvarkome visus formalumus, susijusius su transporto priemonių, įvežtų iš užsienio, registracija, įskaitant: transporto priemonės tipo keitimą (pvz., lengvasis/krovininis M1/N1, krovininis/lengvasis N1/M1, platforma, furgonas, specialiosios transporto priemonės – kelių pagalba, techninė pagalba ir kt.), sėdimų vietų skaičiaus keitimą, konstrukcinius transporto priemonės pakeitimus ir kitus teisėtus pakeitimus, reikalingus registracijai. Viską atliekame pagal galiojančius teisės aktus ir parengiame reikiamą dokumentaciją. Daugiau informacijos telefonu.', 'Ar turite Vokietijoje registruotą transporto priemonę, kuriai baigiasi techninės apžiūros galiojimas, bet nežinote, kaip tai sutvarkyti, arba nemokate kalbos? Padėsime jums atlikti visą procesą. Jei turite deklaruotą gyvenamąją vietą Vokietijoje ir norite ten užregistruoti automobilį, taip pat galime padėti. Mes užsiimame, be kita ko, lenkiškų draudimo nuolaidų perkėlimu, vokiškos techninės apžiūros organizavimu ir transporto priemonės registracija Vokietijos transporto įstaigoje. Taip pat padedame išregistruoti transporto priemones iš Vokietijos. Jei norite užregistruoti automobilį Lenkijoje, bet transporto priemonė vis dar nurodyta kaip registruota Vokietijoje, taip pat galime padėti sutvarkyti dokumentus. Mes tvarkome visus formalumus, susijusius su transporto priemonių, įvežtų iš užsienio, registracija, įskaitant: transporto priemonės tipo keitimą (pvz., lengvasis/krovininis M1/N1, krovininis/lengvasis N1/M1, platforma, furgonas, specialiosios transporto priemonės – kelių pagalba, techninė pagalba ir kt.), sėdimų vietų skaičiaus keitimą, konstrukcinius transporto priemonės pakeitimus ir kitus teisėtus pakeitimus, reikalingus registracijai. Viską atliekame pagal galiojančius teisės aktus ir parengiame reikiamą dokumentaciją. Daugiau informacijos telefonu.',
  'Ar turite Vokietijoje registruotą transporto priemonę, kuriai baigiasi techninės apžiūros galiojimas, bet nežinote, kaip tai sutvarkyti, arba nemokate kalbos? Padėsime jums atlikti visą procesą. Jei turite deklaruotą gyvenamąją vietą Vokietijoje ir norite ten užregistruoti automobilį, taip pat galime padėti. Mes užsiimame, be kita ko, lenkiškų draudimo nuolaidų perkėlimu, vokiškos techninės apžiūros organizavimu ir transporto priemonės registracija Vokietijos transporto įstaigoje. Taip pat padedame išregistruoti transporto priemones iš Vokietijos. Jei norite užregistruoti automobilį Lenkijoje, bet transporto priemonė vis dar nurodyta kaip registruota Vokietijoje, taip pat galime padėti sutvarkyti dokumentus. Mes tvarkome visus formalumus, susijusius su transporto priemonių, įvežtų iš užsienio, registracija, įskaitant: transporto priemonės tipo keitimą (pvz., lengvasis/krovininis M1/N1, krovininis/lengvasis N1/M1, platforma, furgonas, specialiosios transporto priemonės – kelių pagalba, techninė pagalba ir kt.), sėdimų vietų skaičiaus keitimą, konstrukcinius transporto priemonės pakeitimus ir kitus teisėtus pakeitimus, reikalingus registracijai. Viską atliekame pagal galiojančius teisės aktus ir parengiame reikiamą dokumentaciją. Daugiau informacijos telefonu.',
  '[]'::jsonb
) ON CONFLICT (service_id, lang) DO NOTHING;

COMMIT;
