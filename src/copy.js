// Alle Texte von Jini an einem Ort. Deutsch, mit Beratungs-Humor.
// Hinweis zu den Regexen: \b ist in JavaScript ASCII-basiert. Vor Umlauten (ä/ö/ü) darf deshalb
// kein \b stehen, für kurze Kürzel (h, SP, KI …) wird eine unicode-sichere Grenze verwendet.

export const INTRO = [
  'Salam und Moin! Ich bin <b>Jini</b>, dein Senior Estimation Genie (m/w/d). 3.000 Jahre Projekterfahrung, davon 2.990 im Lenkungskreis.',
  'Beschreib mir dein Vorhaben. Ich lese die üblichen Verdächtigen aus dem Text („nur“, „kurz“, „Excel“), konsultiere die heiligen Würfel und liefere eine belastbare Schätzung™ – belastbar wie ein Excel-Sheet vom Praktikanten.',
];

export const STATUS_LINES = [
  'Schätz-Orakel · online · Konfidenz 100 %',
  'seit 3.000 Jahren im Projekt',
  'Verfügbarkeit 100 % · Auslastung 140 %',
  'wohnt in Rack 7, Keller, neben dem Fax',
  'zertifiziert (von sich selbst)',
  'antwortet schneller als der Fachbereich',
];

export const THINKING_LINES = [
  'Befrage die Kristallkugel …',
  'Konsultiere das Backlog von 2019 …',
  'Öffne „Schaetzung_final_v7_FINAL2_neu.xlsx“ …',
  'Frage den Kollegen, der das damals gebaut hat … (seit 2021 nicht mehr da)',
  'Multipliziere mit π. Warum π? Erfahrungswert.',
  'Plane Puffer für den Puffer ein …',
  'Ziehe die Tarotkarte „Der Scope Creep“ …',
  'Frage ChatGPT, was ChatGPT sagen würde …',
  'Berücksichtige, dass Kevin Urlaub hat …',
  'Warte auf VPN …',
  'Klicke durch 14 SharePoint-Ordner …',
  'Suche die Definition of Done … nicht gefunden.',
  'Berechne die Wahrscheinlichkeit, dass „einfach“ einfach ist … 3 %.',
  'Nehme die Schätzung vom letzten Mal und verdopple sie …',
  'Ersetze „kurz“ durch „quartalsübergreifend“ …',
  'Rechne um: Personentage → Wochen → Quartale → Legislaturperioden …',
  'Lese im Kaffeesatz des Dailys …',
  'Puste den Staub von der Lampe …',
  'Suche den Kunden, der weiß, was er will …',
  'Prüfe, ob das Legacy-System noch atmet …',
  'Wärme die Würfel des Schicksals an …',
  'Öffne die Glaskugel-API (v2, deprecated) …',
  'Kalibriere den Optimismus auf null …',
  'Lade drei Wünsche … bitte warten …',
  'Frage den Praktikanten …',
  'Schätze die Schätzung der Schätzung …',
  'Wende Hofstadters Gesetz an …',
  'Warte auf Freigabe vom Lenkungsausschuss …',
  'Deploye am Freitag, 16:55 … nein. Doch nicht. Montag.',
  'Suche das Ticket … es gibt kein Ticket.',
  'Frage im Teams-Kanal … drei Daumen hoch, keine Antwort.',
  'Rechne in Manntagen … äh, Personentagen …',
  'Lade Jira … Jira lädt noch …',
  'Prüfe die Confluence-Seite … zuletzt bearbeitet 2017.',
  'Warte, bis der Kunde den Termin absagt …',
];

export const FINALE_LINES = [
  'Beschwöre die Würfel des Schicksals …',
  'Werfe. Bete. Runde auf.',
  'Die Würfel fallen. Der Termin auch.',
];

// Faktoren, die Jini aus dem Text liest. Reihenfolge = Reihenfolge in der Aufstellung;
// es zählen die ersten MAX_KEYWORD_FACTORS Treffer, der Rest wird zu einem Sammelfaktor.
export const KEYWORD_FACTORS = [
  // Die Klassiker
  { re: /\bnur\b/i, label: 'Kunde sagt „nur“', mult: 3 },
  { re: /\bmal eben\b|\beben mal\b|\bschnell(e|en|er|es)?\b|\bkurz(e|en|er|es)?\b|\bkurzfristig\b|\bzack\b|\bruckzuck\b|\bnebenbei\b|\bzwischendurch\b|\bauf die schnelle\b/i, label: '„Kurz mal eben“-Zuschlag', mult: 2 },
  { re: /\beinfach(e|en|er|es|ste)?\b|\bsimpel|\bsimple\b|\btrivial|\beasy\b|no-?brainer|\bkein (problem|ding|hexenwerk|akt)\b|\bkeine raketenwissenschaft|\bunkompliziert|\bsollte (doch )?(nicht )?(so )?(schwer|schwierig|kompliziert) sein/i, label: '„Ist doch einfach“-Faktor', mult: 2.5 },
  { re: /\bklein(e|es|er|en)?\s+(änderung|anpassung|feature|fix|bugfix|sache|ding|erweiterung|tool|skript|script|app|website|webseite|seite|programm|projekt|formular|verbesserung)(en|es|s|e)?\b|\bkleinigkeit|\bwinzig|\bbisschen\b|\bbissl\b|\bbisserl\b|\bbissel\b|\bminimal(e|en|er)?\b|\bmini-?/i, label: 'Die berühmte kleine Änderung', mult: 4 },
  { re: /(haben|hab|hatten|hat) (wir|man|ihr|er|sie|jemand|die) (das |sowas |so was )?(doch )?(schon|bereits|schon ?mal|schon einmal)( mal)?( so ähnlich| ähnlich)?( gemacht| gebaut| umgesetzt| gehabt| gelöst)?\b|schon ?mal gemacht|gibt.?s (doch )?(schon|bereits)|gibt es (doch )?(schon|bereits)|wiederverwend|(könnte|kann|können) (man|wir) (doch )?(kopieren|übernehmen|klonen)|liegt (doch )?(schon )?(fertig )?(rum|herum|in der schublade)/i, label: '„Das hatten wir doch schon mal“', mult: 2 },
  { re: /gibt.?s (da |dafür |doch )?(nicht |kein |doch |bestimmt )?(ein|’n|n|schon|was)? ?(plugin|plug-?in|app|tool|modul|addon|add-?on|extension|erweiterung|fertige lösung|fertiges|was fertiges|standard|library|template|vorlage)|\bplugin|\bplug-?in|\badd-?on|\bextension|\bwas fertiges|\bstandardlösung|\bvon der stange|\bout of the box|\bstandardsoftware|\bno-?code|\blow-?code|\bzapier|\bn8n|\bmake\.com|\bpower ?automate|\bmarketplace|\bapp ?store/i, label: '„Gibt es dafür nicht ein Plugin?“', mult: 2 },
  { re: /läuft (auf|bei) (meinem|mir)|bei mir (geht|läuft|funktioniert|klappt)|works on my machine|auf meinem (rechner|laptop|pc|mac|notebook)|lokal (geht|läuft|funktioniert|klappt)|(auf|in) (dev|test|stage|staging|der testumgebung|dem testsystem) (geht|läuft|funktioniert|klappt)/i, label: '„Bei mir läuft’s“ (Docker folgt)', mult: 2.5 },
  { re: /change ?request|\bcrs?\b|änderungsanforderung|änderungswunsch|nachtrag|nachträglich|\bnoch dazu\b|\bzusätzlich\b|\baußerdem\b|\bund (dann )?noch\b|\bach ja\b|\bach so\b|übrigens|wo wir (gerade|schon) dabei sind|wenn (wir|ihr) (schon|gerade|eh) dabei (sind|seid)|by the way|\bbtw\b|\bobendrauf\b|\bon top\b|\bgleich mit\b|\bmit dazu\b|\bdirekt mit\b/i, label: '„Wo wir gerade dabei sind …“ (CR)', mult: 2 },
  { re: /(das|es|dies|sowas) (dauert|braucht|geht in|schafft man in|kann man in|ist in|wäre in|sollte in) (doch |bestimmt |sicher |maximal |höchstens |locker |ja )*(ein|eine|einen|einem|einer|zwei|drei|vier|fünf|\d+) (tag|tage|tagen|woche|wochen|stunde|stunden|monat|monate|monaten)|(ich|wir) (denke|denken|dachte|dachten|schätze|schätzen|glaube|glauben|rechne|rechnen|tippe|tippen|meine|meinen|hätte gesagt|hätten gesagt)( so| mit| mal| eher| auf)* (ein|eine|einen|zwei|drei|vier|fünf|\d+|max|maximal|höchstens|so)|\b(maximal|höchstens|max\.?) (ein|eine|einen|zwei|drei|\d+) (tag|tage|woche|wochen|stunde|stunden)|nicht (mehr|länger) als (ein|eine|einen|zwei|drei|\d+)|das sind (doch |so |maximal |vielleicht )*(ein|eine|zwei|drei|\d+) (tag|tage|stunden|wochen)/i, label: 'Kunde hat schon selbst geschätzt', mult: 3 },
  { re: /daten (sind|ist|wären|sollten) (doch |eigentlich |alle |ja )*(sauber|gepflegt|vollständig|korrekt|in ordnung|konsistent|aktuell|einheitlich)|datenqualität|stammdaten|dubletten|duplikate|bereinig|datenpflege|altdaten|datenübernahme|(die|alle) daten (liegen|sind) (in|als) (excel|csv|access|word)/i, label: '„Die Daten sind sauber“ (sind sie nie)', mult: 3 },
  { re: /(mit|per|über|via|durch) (ki|ai|chatgpt|copilot|claude|gemini|einer ki|eine ki) (machen|lösen|bauen|generieren|erledigen|schreiben|erstellen)|kann (das )?(nicht )?(die |eine |ne )?(ki|ai|chatgpt|copilot) (das )?(machen|übernehmen|lösen|bauen|schreiben)|lass (das )?(doch )?(die |eine )?(ki|chatgpt|copilot)|(ki|chatgpt|copilot) (macht|kann|schreibt|baut|generiert) (das|es) (doch )?(auch|schon|selbst|alleine|in sekunden|in 5 minuten)|einfach (chatgpt|copilot|die ki) fragen|vibe ?cod/i, label: '„Kann das nicht die KI machen?“', mult: 2.5 },
  { re: /selbst (angefangen|gebaut|gemacht|programmiert|versucht|gebastelt|zusammengeklickt)|hab(e)? (da |schon |mal |auch |bereits )*(was |etwas )?(angefangen|gebastelt|gebaut|zusammengeklickt|vorbereitet)|(mein|unser|der) (sohn|neffe|azubi|praktikant|schwager|kumpel|kollege|nachbar|schwiegersohn) (hat|kann|macht|könnte)|(darauf|drauf) aufbauen|weiterentwickeln|weiterbauen|bestehenden code|hab ich (schon )?(mal )?(in|mit) (excel|access|wordpress|chatgpt) (gemacht|gebaut)/i, label: 'Kunde hat „schon mal angefangen“', mult: 3 },
  { re: /serviette|skizze|skizziert|gemalt|handzeichnung|screenshot|foto vom|whiteboard|bierdeckel|flipchart|handschriftlich|abfotografiert|\bpaint\b/i, label: 'Spezifikation: Foto vom Whiteboard', mult: 2 },
  { re: /historisch gewachsen|gewachsen(e|es|en|er)?\b|eigenentwicklung|eigenbau|selbstgebaut|selbstgestrickt|inhouse-?lösung|der (kollege|entwickler|dienstleister) ist (nicht mehr da|weg|in rente|gegangen)|keiner weiß (mehr )?(wie|warum|was)|niemand (weiß|kennt)|(nicht|nie) dokumentiert|ohne doku/i, label: '„Historisch gewachsen“', mult: 3 },
  { re: /\beigentlich\b/i, label: 'Das Wort „eigentlich“', mult: 1.5 },
  { re: /details (kommen|folgen|später|klären wir)|klären wir (noch|später|dann|im detail)|sehen wir dann|wird noch (definiert|geklärt|festgelegt|entschieden)|\btbd\b|\btba\b|\bnoch offen\b|\bnoch unklar\b|\bkeine ahnung\b|\bmal (schauen|sehen|gucken)\b|\bkommt drauf an\b/i, label: 'Details folgen (nie)', mult: 2 },
  // Technik
  { re: /excel|xlsx|\bcsv\b|tabelle|makro|\bvba\b/i, label: 'Excel als Datenbank', mult: 4 },
  { re: /(^|[^\p{L}\d])sap(?![\p{L}\d])|abap|s\/?4 ?hana|fiori/iu, label: 'SAP-Konstante', mult: 3.14 },
  { re: /pi mal daumen|über den daumen|\bgrob\b/i, label: 'Pi mal Daumen', mult: 3.14 },
  { re: /(^|[^\p{L}\d])(ki|ai|llm|gpt|genai)(?![\p{L}\d])|künstliche intelligenz|chatgpt|copilot|machine ?learning/iu, label: 'Buzzword-Zuschlag (KI)', mult: 1.5 },
  { re: /legacy|altsystem|alt(es|e|en)? system|cobol|mainframe|as\/?400|visual ?basic|\bvb6?\b|lotus ?notes|von 20(0|1)\d/i, label: 'Legacy-Archäologie', mult: 3 },
  { re: /migration|migrier|umzug|umzieh|ablös/i, label: 'Migrations-Realität', mult: 2 },
  { re: /deadline|dringend|asap|sofort|gestern|zeitnah|eilig|schnellstmöglich|umgehend|bis (morgen|übermorgen|montag|dienstag|mittwoch|donnerstag|freitag|ende|spätestens|zum|weihnachten|ostern|nächste|zur messe)|(noch|bis) (heute|diese woche|diesen monat)|in (einer|einem|zwei|drei|[1-9]) (tag|woche|monat)|vor (der messe|dem go.?live|weihnachten|dem urlaub)/i, label: 'Deadline-Panik', mult: 2 },
  { re: /freitag|feierabend|wochenende/i, label: 'Freitags-Deployment', mult: 1.5 },
  { re: /\bpilot(projekt|phase|betrieb|kunde|kunden|anwender|ierung)?\b|prototyp|\bpoc\b|proof of concept|\bmvp\b|\bdemo\b|provisor|übergangslösung|zwischenlösung|interimslösung|\bworkaround|\bquick ?(and|&|’n|n) ?dirty|\bwegwerf|\bvorerst\b|\berst ?mal\b/i, label: 'Prototyp, der in Produktion geht', mult: 2 },
  { re: /datenschutz|dsgvo|gdpr|compliance|revision|audit|iso ?27|sicherheit|security/i, label: 'DSGVO: erst mal ein AV-Vertrag', mult: 2 },
  // Konzern & Vertrieb
  { re: /betriebsrat|\bbr\b|mitbestimmung|betriebsvereinbarung|personalrat|leistungskontrolle|verhaltenskontrolle|mitarbeiterdaten|zeiterfassung|arbeitszeit(erfassung)?|überwachung|mitarbeiter-?(tracking|monitoring)|personalabteilung|\bhr\b|hr-?system|gehalt|lohn(abrechnung)?|workday|personio|successfactors|schichtplan|urlaubsantrag|urlaubsplanung/i, label: 'Betriebsrat hat Fragen', mult: 3 },
  { re: /freigabe|genehmig|freigeben|absegnen|abnicken|unterschr(ift|eiben)|konzern|mutterkonzern|zentrale|holding|architektur-?board|architecture board|\bcab\b|change advisory|itil|governance|gremium|beschluss|budgetfreigabe|bestellnummer|purchase order|lieferanten?anlage|lieferant anlegen|einkaufsprozess|vergabe|ausschreibung|\brfp\b|\bnda\b|rahmenvertrag|beschaffung|it-?security (muss|prüft|freigabe)|security-?(review|freigabe|check)/i, label: 'Konzernfreigabe (4 Gremien, 0 Termine)', mult: 2.5 },
  { re: /jahresend|jahreswechsel|year-?end|\bq4\b|quartalsende|jahresabschluss|inventur|weihnachtsgeschäft|black ?friday|cyber ?monday|hauptsaison|hochsaison|code ?freeze|change ?freeze|deployment ?freeze|\bfreeze\b|silvester|neujahr|01\.01\.|1\. ?januar|zum ersten|zum 1\./i, label: 'Jahresendgeschäft: Code Freeze', mult: 2 },
  { re: /festpreis|fixpreis|pauschal(e|preis|angebot|betrag)?|fixed ?price|all-?inclusive|alles inklusive|komplettpreis|paketpreis|flatrate|werkvertrag|gewährleistung|fix(er|es|e)? (preis|termin|datum)|fixtermin/i, label: 'Festpreis (= Risikoaufschlag)', mult: 2.5 },
  { re: /angebot (bis|noch|heute|morgen|schnell|kurz|bitte|brauch|benötig)|(bis|noch|schnell|kurz|mal|dringend) (ein |das |euer |ihr )?angebot|(brauche|brauchen|bräuchte|bräuchten|benötige|benötigen|hätte gern|hätten gern) (noch |schnell |kurz |mal |dringend |bitte |bis morgen |bis freitag )*(ein |das |ihr |euer )?angebot|kostenvoranschlag|\bkva\b|richtpreis|indikativ|preisindikation|ballpark|hausnummer|grobe (schätzung|hausnummer|kostenschätzung|zahl)|budgetindikation|was (würde|kostet|kosten) (das|es|sowas) (ungefähr|ca\.?|circa|etwa|grob|so)/i, label: 'Angebot bis morgen früh, bitte', mult: 2 },
  { re: /skalier|millionen (nutzer|user|kunden)|weltweit|global|enterprise|hochverfügbar|24\/7|99,9|ausfallsicher|redundant|georedundant|lastspitze|zukunftssicher|für die zukunft/i, label: 'Muss skalieren (aktuell 3 Nutzer)', mult: 2 },
  { re: /\b(das|vom|unser|unserem|der|die|beim|im|ans|dem|vor dem|fürs) (top-?)?management\b|\btop-?management\b|\bchef(in|s|etage)?\b|\bder boss\b|geschäftsführ|geschäftsleitung|\bgf\b|\bgl\b|\bceo\b|\bcto\b|\bcio\b|\bcfo\b|vorstand|aufsichtsrat|c-level|bereichsleit|inhaber|\bhat (das )?(schon|bereits) (zugesagt|versprochen|verkauft)|\b(wurde|ist) (dem kunden )?(schon|bereits) (verkauft|zugesagt|versprochen|kommuniziert)/i, label: 'Management hat es schon versprochen', mult: 2 },
  { re: /\bkund(e|en|in|innen)\b|\bkunden(seite|wunsch|anforderung)|\bstakeholder|\bfachbereich|\bfachabteilung|\babteilung|\beinkauf\b|\bauftraggeber/i, label: 'Der Fachbereich hat noch Wünsche', mult: 1.5 },
  // Fachliches
  { re: /button|knopf|schaltfläche|formular|eingabefeld|pflichtfeld|checkbox|dropdown|popup|pop-?up|\bmodal\b|tooltip|\bdialog/i, label: 'Ein Button ist nie nur ein Button', mult: 2.5 },
  { re: /login|anmeld|\bsso\b|oauth|passwort|keycloak|active ?directory/i, label: 'SSO-Sumpf', mult: 2 },
  { re: /\blogo\b|\bfarbe|\bfarbschema|\bschrift(art|größe|farbe|typ)?\b|\bfonts?\b|\bcss\b|\bdesign|\bfrontend|(^|[^\p{L}\d])(ui|ux)(?![\p{L}\d])|\blayout|\boptik|\boptisch|\bhübsch|\bschöner|\bmodern(er|es|e)?\b|\bmodernisier|\bauffrisch|\bfrischer|\bresponsive|\bdark ?mode|\bicon|\banimation|\bcorporate ?design|\bbranding/iu, label: '„Nur was Optisches“', mult: 1.8 },
  { re: /\bapps?\b|\bios\b|\bandroid\b|\bapp ?store|\bplay ?store|\bnative\b|\bflutter\b|\breact ?native|\bpwa\b|\bhandy|\bsmartphone|\bmobil(e|es|er)?\b|\btablet|\bipad|\biphone/i, label: 'App (iOS, Android, Store-Review)', mult: 2.5 },
  { re: /website|webseite|homepage|landing ?page|internetseite|web-?auftritt|internetauftritt|online-?shop|onlineshop|\bshop\b|webshop|e-?commerce|\bseo\b|google ranking|(bei|auf) google (oben|vorne|gefunden|platz)|newsletter|social media|instagram|tiktok|linkedin/i, label: 'Homepage („und ein kleiner Shop“)', mult: 1.5 },
  { re: /dashboard|\breport(ing|s)?\b|auswertung|statistik|kennzahl|\bkpis?\b|(^|[^\p{L}\d])bi(?![\p{L}\d])|power ?bi|tableau|übersicht|grafana|cockpit|\bchart|\bdiagramm|\bexcel-?export/iu, label: 'Reporting: 14 Umsatz-Definitionen', mult: 2 },
  { re: /mehrsprachig|übersetz|\bsprachen\b|\bi18n\b|\bl10n\b|\benglisch|\bfranzösisch|\bspanisch|\bchinesisch|\binternational|\blokalisier|\bzweisprachig|\bdeutsch (und|\/) englisch/i, label: 'Mehrsprachig („nur Englisch dazu“)', mult: 1.8 },
  { re: /zahlung|bezahl|paypal|stripe|klarna|kreditkarte|lastschrift|\bsepa\b|rechnung|mahnung|buchhaltung|\bdatev\b|\bmwst|umsatzsteuer|gutschein|rabattcode|\babo\b|abonnement|subscription/i, label: 'Bezahlen (PCI-DSS, MwSt., Mahnwesen)', mult: 2 },
  { re: /cloud|kubernetes|\bk8s\b|docker|serverless|azure|\baws\b|\bgcp\b/i, label: 'Cloud-Native-Steuer', mult: 2 },
  { re: /microservice|event-?driven|kafka/i, label: 'Microservice-Verteilungswahn', mult: 2 },
  { re: /blockchain|web3|\bnft\b|metaverse|krypto/i, label: 'Hype-Zyklus 2021 (will keiner mehr)', mult: 0.5 },
  { re: /schnittstelle|\bapi\b|integration|anbind|\brest\b|\bsoap\b|import|export|sync/i, label: '„Die API ist doch dokumentiert“', mult: 2.5 },
  { re: /(so|genau|ähnlich|analog) wie bei|wie (bei )?(google|amazon|netflix|apple|spotify|tiktok|instagram|whatsapp|uber|airbnb|zalando|otto|check24|paypal|klarna|notion|figma|youtube|tinder|ebay|kleinanzeigen)|1:1|genauso wie|einfach kopieren|nachbauen|abkupfern|(die|der|unsere?) (konkurrenz|mitbewerber|wettbewerb(er)?) (hat|haben|macht|machen|kann|können)|(das|so ?was) (gibt es|gibts|gibt’s) doch (schon|bestimmt|sicher|überall)|(ein|eine) (uber|tinder|netflix|airbnb|spotify) für/i, label: '„Einfach so wie bei Netflix“', mult: 2.5 },
  { re: /\btest|(^|[^\p{L}\d])qa(?![\p{L}\d])|qualität|abnahme/iu, label: 'Tests (diesmal wirklich)', mult: 1.5 },
  { re: /dokumentation|\bdoku\b|handbuch|wiki/i, label: 'Doku (liest eh keiner)', mult: 0.8 },
  { re: /meeting|abstimm|workshop|besprechung|jour ?fixe|termin/i, label: 'Terminfindung (Doodle, 3 Runden)', mult: 1.5 },
  { re: /\bagil|scrum|sprint|kanban|daily|retro|\bsafe\b/i, label: 'Agil (also ohne Plan)', mult: 1.3 },
  { re: /\burlaub|\bkrank(heit|meldung|geschrieben|heitsbedingt)?\b|\bsommer(loch|pause|ferien)?\b|\bweihnacht|\bferien|\bfeiertag|\bkarneval|\bfasching|\bbrückentag|\bostern|\bdezember|\baugust|\belternzeit|\bsabbatical|\bkindkrank/i, label: 'Ferienzeit: halbe Mannschaft weg', mult: 2 },
  { re: /praktikant|werkstudent|azubi|student/i, label: 'Praktikanten-Rabatt (Bugs folgen)', mult: 0.7 },
  { re: /outsourc|offshore|nearshore|extern(e|er)? dienstleister/i, label: 'Zeitzonen-Zuschlag', mult: 2 },
  { re: /berater|consult|agentur|freelancer/i, label: 'Berater-Rekursion', mult: 1.5 },
  { re: /powerpoint|folien|slides|präsentation/i, label: 'PowerPoint-Engineering', mult: 1.5 },
  { re: /kostenlos|umsonst|gratis|\b0 ?€|null euro|ohne budget|billig|günstig|zu teuer|viel zu (teuer|viel|hoch)|\bzu viel\b|\bzu hoch\b|verhandel|rabatt|nachlass|für lau|für umme|appel und ei|gegen (beteiligung|anteile|sichtbarkeit|referenz)|für die referenz|pro bono|freundschaftspreis|wir sind (ein )?(startup|verein)|gemeinnützig/i, label: 'Budget: keins (Jini lacht)', mult: 5 },
  { re: /\bwie (genau|exakt|präzise)\b|\bgenau(e|en|er|es)? (zahl|schätzung|angabe|aufwand|summe|preis|termin|kosten)|\bexakt|\bpräzise|\bverbindlich|\bgarantie|\bgarantiert|\bauf den (tag|euro|cent) genau|\bnachkomma|\bkonkret(e|en)? (zahl|summe)/i, label: 'Verbindliche Zahl gewünscht', mult: 2 },
  { re: /jini/i, label: 'Namen gesagt (kostet extra)', mult: 1.1 },
  { re: /\bms ?teams\b|\bteams-?(call|chat|meeting|kanal|channel|besprechung)|\b(in|über|per|via) teams\b|\bdrucker|\bscanner|\bwlan|\boutlook|\bexchange\b|\bsharepoint|\bonedrive|\bintranet|\bcitrix|\bvpn\b|\bwordpress|\btypo3|\bconfluence|\bjira\b/i, label: 'SharePoint-Trauma', mult: 2 },
  { re: /ganz(e|es|en)? (system|projekt|plattform|unternehmen)|\balles\b|komplett|neu (machen|bauen|schreiben)|neubau|greenfield|from scratch|rewrite|relaunch|neuentwicklung|redesign/i, label: 'Rewrite-Größenwahn', mult: 3 },
  { re: /\bbug(s|fix|fixes|fixing)?\b|fehler|hotfix|kaputt|geht nicht|funktioniert nicht|absturz|stürzt ab|\bhängt\b|\bspinnt\b|\bdefekt|\bseit (gestern|heute|dem update|montag)/i, label: 'Hotfix zieht Hotfix nach sich', mult: 2 },
  { re: /datenbank|(^|[^\p{L}\d])(db|sql)(?![\p{L}\d])|oracle|postgres|mysql|mariadb|mongo|stored ?procedure|\bschema\b|\bdatenmodell/iu, label: 'Datenbank-Schema von damals', mult: 1.7 },
  { re: /performance|langsam|\bschneller\b|\bperformanter|\blädt (ewig|lange|langsam)|\bruckel|\bladezeit|\btimeout|optimier/i, label: '„Es ist halt langsam“', mult: 2 },
  { re: /fast fertig|nur noch|90 ?%|letzte[nr]? (schritt|meter|prozent)/i, label: 'Die letzten 10 % (= 90 % der Zeit)', mult: 3 },
  { re: /update|upgrade|aktualisier/i, label: 'Update „ohne Breaking Changes“', mult: 2 },
  { re: /realistisch|ehrlich|seriös/i, label: 'Ehrlichkeitsbonus', mult: 0.8 },
  { re: /^sudo\b/i, label: 'sudo (mit Verantwortung)', mult: 0.5 },
];
export const MAX_KEYWORD_FACTORS = 5;
export const OVERFLOW_FACTOR = (n) => ({ label: `+ ${n} weitere Faktoren (langer Text)`, mult: 1.5 });

// Faktoren aus der Form des Textes.
export function shapeFactors(text) {
  const out = [];
  const len = text.trim().length;
  if (len < 16) out.push({ label: 'Eine Zeile, null Spezifikation', mult: 2 });
  if (len > 140) out.push({ label: 'Roman statt Ticket (>140 Zeichen)', mult: 1.5 });
  if ((text.match(/\?/g) || []).length > 1) out.push({ label: '„???“ – Kunde weiß es selbst nicht', mult: 1.2 });
  if (/!/.test(text)) out.push({ label: 'Ausrufezeichen! (also dringend!)', mult: 1.3 });
  if (/\b(oder|und\/oder|evtl|vielleicht|eventuell|irgendwie)\b/i.test(text)) out.push({ label: 'Unklare Anforderung („irgendwie“)', mult: 1.6 });
  if (/(?:\b[A-ZÄÖÜ]{3,}\b[\s!?,.]*){3,}|[A-ZÄÖÜ!?]{9,}/.test(text)) out.push({ label: 'CAPSLOCK erkannt (Eskalationsstufe 2)', mult: 1.4 });
  return out;
}

// Immer dabei – Jini wählt je Wurf ein bis zwei davon aus.
export const ALWAYS_FACTORS = [
  { label: 'Hofstadters Gesetz', mult: 2 },
  { label: 'Meeting-Overhead', mult: 1.3 },
  { label: 'Puffer für den Puffer', mult: 1.2 },
  { label: 'Scope Creep (unvermeidlich)', mult: 1.15 },
  { label: 'Kaffee-Konstante', mult: 1.1 },
  { label: 'Optimismus-Korrektur', mult: 1.5 },
  { label: 'Unbekannte Unbekannte', mult: 1.4 },
  { label: 'Kevin ist im Urlaub', mult: 1.1 },
  { label: 'Sabine ist krank', mult: 1.2 },
  { label: 'Architekt ist in einem anderen Call', mult: 1.3 },
  { label: 'Bus-Faktor 1: der Kollege ist weg', mult: 1.8 },
  { label: 'Jira lädt noch', mult: 1.1 },
  { label: 'VPN zickt (Ticket offen seit März)', mult: 1.2 },
  { label: 'Teams-Update mitten im Sprint', mult: 1.15 },
  { label: 'Kunde antwortet nicht auf Mails', mult: 1.4 },
  { label: 'Windows-Update, 9:00 Uhr, Daily', mult: 1.1 },
  { label: 'Confluence-Seite von 2017 (veraltet)', mult: 1.2 },
];

export const MOOD_FACTORS = {
  optimistic: { label: 'Vertriebsoptimismus', mult: 0.4 },
  pessimistic: { label: 'Betrieb hat Bedenken', mult: 2.5 },
};

export const UNITS = {
  pt: { key: 'pt', singular: 'Personentag', plural: 'Personentage', re: /personentag|(^|[^\p{L}\d])pt(?![\p{L}\d])|aufwand|tage?(?![\p{L}])|wie lange|dauer|wie viel arbeit|manntag|kapazität/iu },
  sp: { key: 'sp', singular: 'Story Point', plural: 'Story Points', re: /story ?points?|(^|[^\p{L}\d])(sp|epic)(?![\p{L}\d])|sprint|scrum|jira|ticket|backlog|user ?story|planning/iu },
  weeks: { key: 'weeks', singular: 'Woche', plural: 'Wochen', re: /\bwann\b|fertig|termin|monat|jahr|quartal|release|go.?live|launch|deadline|roadmap|zeitplan|wochen?\b/i },
  eur: { key: 'eur', singular: '€', plural: '€', re: /€|euro|kost|budget|preis|teuer|geld|rechnung|angebot|honorar|bezahl|tagessatz|invest/i },
  hours: { key: 'hours', singular: 'Stunde', plural: 'Stunden', re: /stunden?|(^|[^\p{L}\d])(std|h)(?![\p{L}\d])/iu },
};
export const UNIT_ORDER = ['eur', 'sp', 'hours', 'weeks', 'pt'];
export const DAY_RATE = 1850;

export const VERDICTS = {
  snake: [
    'Kritischer Fehlschlag. Scope Creep hat einen natürlichen Einser gewürfelt.',
    'Snake Eyes. Das ist die Zahl, die der Vertrieb dem Kunden genannt hat – mal zehn.',
    '1 + 1. „Das schaffen wir bis Feierabend.“ – Ich, seit 3.000 Jahren.',
    'Zwei Einsen. Ich würde das nicht ins Angebot schreiben. Ich würde das nirgendwo hinschreiben.',
    'Doppeleins. Lenkungsausschuss einberufen, Kaffee nachbestellen, Therapeuten anrufen.',
  ],
  jackpot: [
    'Doppelsechs! Kritischer Erfolg. Das Projekt wird pünktlich fertig. (Das hat noch nie jemand gesagt.)',
    'Zwei Sechsen. Jini ist gnädig und halbiert. Trag die Zahl sofort ins Angebot ein, bevor ich es mir anders überlege.',
    'Zwölf Augen. Das Orakel sagt: Rahmenvertrag – und diesmal sogar im Budget.',
    'Doppelsechs. In der Fachsprache: „Phase 1 reicht.“',
  ],
  tiny: [
    'Das schafft ihr noch vor dem Daily. Theoretisch.',
    'Kleine Zahl, großes Vertrauen. Ich hoffe, ihr habt Tests. (Ihr habt keine Tests.)',
    'Quick Win! Also das, was man im Dezember „technische Schuld“ nennt.',
    'So wenig? Der Kunde wird misstrauisch. Sag lieber das Doppelte.',
    'Verdächtig klein. Jini hat vermutlich die Doku vergessen. Wie alle.',
  ],
  huge: [
    'Das ist kein Projekt mehr, das ist ein Lebensabschnitt.',
    'Ich empfehle: Programm-Management, Lenkungskreis und einen Projektnamen, der nicht nach Schuld klingt.',
    'Der Einkauf wird lachen, dann weinen, dann unterschreiben.',
    'Dafür braucht ihr eine Roadmap, ein Logo und einen Projektnamen mit griechischem Buchstaben.',
    'Bei dieser Zahl empfiehlt Jini: umbenennen in „Transformation“, dann passt es.',
  ],
  normal: [
    'Solide Schätzung. Solide falsch, aber solide.',
    'Das ist die Zahl fürs Angebot. Die echte kommt im Change Request.',
    'Passt in ein Quartal. Welches, sage ich nicht.',
    'Realistisch – wenn niemand krank wird, niemand kündigt und der Kunde nichts will.',
    'Plus/minus Faktor drei – wie immer.',
    'Diese Schätzung wurde ohne Anforderungen erstellt. Wie in echt.',
    'Das Planning Poker hätte länger gedauert und wäre nicht besser gewesen.',
    'Das ist die Schätzung. Der Aufwand ist etwas anderes.',
    'Präzise bis auf die Nachkommastelle. Die Vorkommastellen sind Auslegungssache.',
  ],
  doubles: [
    'Pasch! Jini würfelt eigentlich nochmal – aber der Kunde wartet.',
    'Ein Pasch. Bedeutet nichts, sieht aber gut aus im Statusbericht.',
    'Pasch. Zwei gleiche Zahlen – das kommt sonst nur vor, wenn Angebot und Rechnung übereinstimmen. Also nie.',
  ],
};

export const REROLL_VERDICTS = {
  up: ['Siehst du? Nachschätzen macht es nie kleiner.', 'Größer geworden. Beim zweiten Blick sieht man immer mehr Arbeit.'],
  down: ['Kleiner geworden. Irgendwas wurde vergessen. Sicher.', 'Weniger als vorher. Der Vertrieb hat mitgewürfelt.'],
  same: ['Gleiche Zahl. Das nennt man Reproduzierbarkeit. Passiert sonst nie.'],
};

export const STAMPS = {
  normal: ['GESCHÄTZT™', 'BELASTBAR™', 'PI × DAUMEN', 'KONFIDENZ 100 %', 'OHNE GEWÄHR', 'FINAL_v7_neu', 'VORBEHALTLICH'],
  jackpot: ['RAHMENVERTRAG'],
  snake: ['FESTPREIS'],
};

export const CONFIDENCE = [
  'Konfidenz: 100 % (gefühlt)',
  'Genauigkeit: ± 1 Quartal',
  'Belastbar wie ein Excel-Makro',
  'Gültig bis: nächstes Meeting',
  'Basis: 2 Würfel, 3.000 Jahre Erfahrung, 0 Anforderungen',
  'Methodik: Planning Poker, nur ehrlicher',
  'Konfidenz 110 %. Ja, das geht.',
  'Quelle: Bauchgefühl (kalibriert 2019)',
  'Abweichung: ± ein Praktikant',
];

export const AFTERTHOUGHTS = [
  'Soll ich das als Change Request formulieren? Kostet extra.',
  'Ich kann das auch in Wochen sagen, dann klingt es kürzer.',
  'Tipp: Schreib „nur“ nicht ins Ticket. Ich lese das.',
  'Wenn du magst, würfle ich das für den Kunden noch mal. Anderes Ergebnis garantiert.',
  'Für die Roadmap nimm einfach das Doppelte und ein hübsches Gantt-Chart.',
  'Übrigens: Diese Schätzung ist veraltet, seit du sie gelesen hast.',
  'Bitte nicht dem Einkauf zeigen. Der glaubt mir sonst.',
  'Nächstes Vorhaben? Ich habe 3.000 Jahre Zeit. Du nicht.',
];

export const EASTER_EGGS = [
  { re: /^\s*42\s*[?!.]*\s*$/i, reply: '42. Die Antwort kenne ich. Die Frage hätte ich gern gehabt.', noRoll: true },
  { re: /^\s*(hi|hallo|hey|moin|servus|grüß gott|guten (tag|morgen|abend)|na)( jini| genie| dschinn| du| zusammen| ihr)?\s*[!.,? ]*$/i, reply: 'Moin! Ich bin Jini. Du kannst mich alles fragen, ich antworte auf alles mit einer Zahl. Nenn mir dein Vorhaben – oder tipp „nur kurz“, wenn du mich weinen sehen willst.', noRoll: true },
  { re: /^\s*(vielen dank|danke|dankeschön|merci|thx)\b.{0,25}$/i, reply: 'Gern geschehen. Das macht einen Personentag Beratungshonorar. Rechnung kommt per Fax. 📠', noRoll: true },
  { re: /^\s*nein\s*[!. ]*$/i, reply: 'Doch.', followup: 'Oh!', noRoll: true },
  { re: /wann bist du fertig/i, reply: 'Ich bin ein Dschinn. Ich bin nie fertig – ich bin in der Verlängerung. Seit 3.000 Jahren. Frag lieber, wann DU fertig bist, das würfle ich dir gern.', noRoll: true },
  { re: /ist das (schon )?fertig|seid ihr (schon )?fertig|bist du (schon )?fertig|^\s*status\s*\??\s*$/i, reply: 'Fast. Nur noch die letzten 10 %. Seit drei Wochen.', noRoll: true },
  { re: /bist du (eine |ein )?(ki|ai|echt|bot)|bist du chatgpt|echte ki/i, reply: 'Ich bin ein Dschinn mit Würfeln. Das ist ungefähr so belastbar wie eine KI, nur ehrlicher – und ich halluziniere nur Zahlen, keine Quellen.', noRoll: true },
  { re: /wie geht.?s\b|wie geht es dir|geht.?s dir gut|alles gut\??$/i, reply: 'Rot im Statusbericht, grün in der PowerPoint. Also: alles wie immer. Was soll ich schätzen?', noRoll: true },
  { re: /\blampe\b|\breib(e|en|st|t)?\b|\bgerieben\b/i, reply: 'Hey, nicht reiben. Wir sind hier in einem professionellen Kontext. Drei Wünsche gibt’s nicht – nur drei Schätzungen, und die weichen alle voneinander ab.', noRoll: true },
  { re: /wie lange hat es gedauert,? dich zu bauen|schätz(e)? dich selbst|wie lange hast du gebraucht/i, reply: 'Ein Tag. Geschätzt waren zwei Stunden. Das ist der Faktor 4, den ihr sonst nirgends kalkuliert.', noRoll: true },
  { re: /bist du (dir )?(da )?sicher|^\s*sicher\s*\?+\s*$|ist das sicher|kann ich mich darauf verlassen/i, reply: 'Sicher. Im Sinne von „gewürfelt“. Verlässlicher als das, was der Vertrieb sagt, ist es trotzdem.', noRoll: true },
  { re: /was kostest du|kostest du|dein tagessatz|was verdienst du|was nimmst du|dein stundensatz/i, reply: 'Mein Tagessatz: 1.850 €. Ich arbeite 24/7, abgerechnet werden 8 Stunden. Das ist die einzige Zahl hier, die stimmt.', noRoll: true },
  { re: /^\s*(hä|häh|was|wie bitte|bitte was|wtf|lol|haha+|echt jetzt|ernsthaft)\s*[?!. ]*$/i, reply: 'Ja. Genau das habe ich auch gedacht, als ich die Anforderung gelesen habe.', noRoll: true },
  { re: /\b(scheiße|scheisse|mist|verdammt|fuck|kacke|so ein müll)\b/i, reply: 'Das steht auch so im Statusbericht. Nur in Grün.', noRoll: true },
  { re: /\b(englisch bitte|in english|how (long|much))\b/i, reply: 'Auf Englisch schätze ich immer „two weeks“. Auf Deutsch wird es genauer – und teurer.', noRoll: true },
  { re: /wer bist du|was bist du|was kannst du|^\s*(hilfe|help)\s*[?!.]*$/i, reply: 'Ich bin Jini, Schätz-Orakel mit Lampe. Du beschreibst ein Vorhaben, ich lese Faktoren aus dem Text, würfle in 3D und runde großzügig. Probier mal: „Nur schnell die Farbe im Logo ändern“.', noRoll: true },
  { re: /^\s*(tschüss|ciao|bye|bis dann|auf wiedersehen)\b/i, reply: 'Bis dann! Die Würfel bleiben hier. Der Aufwand auch.', noRoll: true },
  { re: /liebst du mich|magst du mich|heirat/i, reply: 'Ich schätze dich sehr. Auf 34 Story Points.', noRoll: true },
  { re: /^\s*(ja|ok|okay|jo|ne|nö)\s*[.!?]*\s*$/i, reply: 'Verstanden. Das ist auch die einzige Anforderung, die ich je bekommen habe.', noRoll: true },
];

export const EMPTY_CHIPS = [
  'Wie lange dauert die SAP-Migration?',
  'Story Points für den Login-Button?',
  'Nur kurz das Logo austauschen',
  'Was kostet ein KI-Chatbot für die Website?',
  'Excel durch eine richtige Datenbank ersetzen',
  'Kleine Änderung, muss bis Freitag fertig sein',
  'Das hatten wir doch schon mal, oder?',
  'Wann ist das Projekt fertig?',
];

export const FOLLOWUP_CHIPS = [
  { label: '🎲 Nochmal würfeln', action: 'reroll' },
  { label: '📈 Optimistisch (Vertrieb)', action: 'optimistic' },
  { label: '🧯 Pessimistisch (Betrieb)', action: 'pessimistic' },
  { label: '💶 In Euro', action: 'unit:eur' },
  { label: '🃏 In Story Points', action: 'unit:sp' },
  { label: '📅 In Wochen', action: 'unit:weeks' },
];

export const STAGE_CAPTIONS = {
  idle: 'Die Würfel des Schicksals ruhen.',
  thinking: 'Jini denkt. Das dauert nie lange.',
  rolling: 'Die Würfel fallen …',
  result: 'Gewürfelt. Unwiderruflich.',
  noWebgl: 'Kein WebGL – Jini würfelt im Kopf.',
};

export const SLAMS = {
  jackpot: 'Kritischer Erfolg',
  snake: 'Kritischer Fehlschlag',
};

export const PLACEHOLDER_WIDE = 'Dein Vorhaben … z. B. „Nur kurz das Logo tauschen“';
export const PLACEHOLDER_NARROW = 'Was soll Jini schätzen?';

export const FIB = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765];
