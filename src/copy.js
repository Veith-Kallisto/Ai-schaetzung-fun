// Alle Texte von Jini an einem Ort. Deutsch, mit Beratungs-Humor.

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
  'Multipliziere mit π, Erfahrungswert …',
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
  'Deploye auf Freitag … nein. Doch nicht.',
];

export const FINALE_LINES = [
  'Beschwöre die Würfel des Schicksals …',
  'Werfe. Bete. Runde auf.',
  'Die Würfel fallen. Wie das Budget.',
];

// Faktoren, die Jini aus dem Text liest. Reihenfolge = Reihenfolge in der Aufstellung.
export const KEYWORD_FACTORS = [
  { re: /\bnur\b/i, label: 'Kunde sagt „nur“', mult: 3 },
  { re: /\bmal eben\b|\beben mal\b|\bschnell\b|\bkurz\b|\bkurzfristig\b|\bzack\b/i, label: '„Kurz mal eben“-Zuschlag', mult: 2 },
  { re: /\beinfach\b|\bsimpel\b|\btrivial\b|\beasy\b|no-?brainer|\bkein problem\b/i, label: '„Ist doch einfach“-Faktor', mult: 2.5 },
  { re: /\bklein(e|es|er|en)?\s+(änderung|anpassung|feature|fix|sache|ding|erweiterung)\b|\bkleinigkeit\b|\bwinzig/i, label: 'Die berühmte kleine Änderung', mult: 4 },
  { re: /excel|xlsx|\bcsv\b|tabelle|makro|\bvba\b/i, label: 'Excel als Datenbank', mult: 4 },
  { re: /\bsap\b|abap|s\/?4 ?hana|fiori/i, label: 'SAP-Konstante (π)', mult: 3.14 },
  { re: /pi mal daumen|über den daumen|\bgrob\b/i, label: 'Pi mal Daumen', mult: 3.14 },
  { re: /\bki\b|\bai\b|künstliche intelligenz|\bllm\b|chatgpt|\bgpt\b|copilot|machine ?learning|genai/i, label: 'Buzzword-Zuschlag (KI)', mult: 1.5 },
  { re: /legacy|altsystem|alt(es|e|en)? system|cobol|mainframe|as\/?400|visual ?basic|\bvb6?\b|lotus ?notes|von 20(0|1)\d/i, label: 'Legacy-Archäologie', mult: 3 },
  { re: /migration|migrier|umzug|umzieh|ablös/i, label: 'Migrations-Realität', mult: 2 },
  { re: /deadline|dringend|asap|sofort|gestern|bis (morgen|übermorgen|montag|freitag|ende der woche|nächste)/i, label: 'Deadline-Panik', mult: 2 },
  { re: /freitag|feierabend|wochenende/i, label: 'Freitags-Deployment', mult: 1.5 },
  { re: /prototyp|\bpoc\b|proof of concept|\bmvp\b|pilot|\bdemo\b/i, label: 'Prototyp, der in Produktion geht', mult: 2 },
  { re: /datenschutz|dsgvo|gdpr|compliance|revision|audit|iso ?27|sicherheit|security/i, label: 'DSGVO-Nebel', mult: 2 },
  { re: /\bchef|geschäftsführ|\bceo\b|vorstand|management|c-level/i, label: 'Management hat es schon versprochen', mult: 2 },
  { re: /kunde|kundin|stakeholder|fachbereich|abteilung|einkauf/i, label: 'Stakeholder-Faktor', mult: 1.5 },
  { re: /button|knopf|schaltfläche/i, label: 'Ein Button ist nie nur ein Button', mult: 2.5 },
  { re: /login|anmeld|\bsso\b|oauth|passwort|keycloak|active ?directory/i, label: 'SSO-Sumpf', mult: 2 },
  { re: /\blogo\b|farbe|schrift|\bfont\b|\bcss\b|design|frontend|\bui\b|\bux\b/i, label: '„Nur was Optisches“', mult: 1.8 },
  { re: /cloud|kubernetes|\bk8s\b|docker|serverless|azure|\baws\b|\bgcp\b/i, label: 'Cloud-Native-Steuer', mult: 2 },
  { re: /microservice|event-?driven|kafka/i, label: 'Microservice-Verteilungswahn', mult: 2 },
  { re: /blockchain|web3|\bnft\b|metaverse|krypto/i, label: 'Hype-Zyklus 2021 (will keiner mehr)', mult: 0.5 },
  { re: /schnittstelle|\bapi\b|integration|anbind|\brest\b|\bsoap\b|import|export|sync/i, label: '„Die API ist doch dokumentiert“', mult: 2.5 },
  { re: /(so|genau) wie bei|1:1|genauso wie|einfach kopieren|wie (google|amazon|netflix|apple|spotify)/i, label: '„Einfach so wie bei Netflix“', mult: 2.5 },
  { re: /\btest|\bqa\b|qualität|abnahme/i, label: 'Tests (diesmal wirklich)', mult: 1.5 },
  { re: /dokumentation|\bdoku\b|handbuch|wiki/i, label: 'Doku (liest eh keiner)', mult: 0.8 },
  { re: /meeting|abstimm|workshop|besprechung|jour ?fixe|termin/i, label: 'Terminfindung (Doodle, 3 Runden)', mult: 1.5 },
  { re: /agil|scrum|sprint|kanban|daily|retro|\bsafe\b/i, label: 'Agil (also ohne Plan)', mult: 1.3 },
  { re: /urlaub|krank|sommer|weihnacht|ferien|feiertag|karneval/i, label: 'Urlaubszeit-Faktor', mult: 2 },
  { re: /praktikant|werkstudent|azubi|student/i, label: 'Praktikanten-Rabatt (Bug-Zuschlag folgt)', mult: 0.7 },
  { re: /outsourc|offshore|nearshore|extern(e|er)? dienstleister/i, label: 'Zeitzonen-Zuschlag', mult: 2 },
  { re: /berater|consult|agentur|freelancer/i, label: 'Berater-Rekursion', mult: 1.5 },
  { re: /powerpoint|folien|slides|präsentation/i, label: 'PowerPoint-Engineering', mult: 1.5 },
  { re: /kostenlos|umsonst|gratis|\b0 ?€|null euro|ohne budget|billig|günstig/i, label: 'Budget: keins (Jini lacht)', mult: 5 },
  { re: /genau|exakt|präzise|verbindlich|garantiert|festpreis|fix(er|es|e)? (preis|termin|datum)/i, label: 'Verbindlichkeit erbeten', mult: 2 },
  { re: /jini/i, label: 'Du hast meinen Namen gesagt (kostet extra)', mult: 1.1 },
  { re: /drucker|wlan|outlook|teams|sharepoint|wordpress|typo3/i, label: 'SharePoint-Trauma', mult: 2 },
  { re: /ganz(e|es|en)? (system|projekt|plattform|unternehmen)|\balles\b|komplett|neu (machen|bauen|schreiben)|neubau|greenfield|from scratch|rewrite|relaunch|neuentwicklung/i, label: 'Rewrite-Größenwahn', mult: 3 },
  { re: /\bbug\b|fehler|hotfix|kaputt|geht nicht|funktioniert nicht|absturz/i, label: 'Hotfix zieht Hotfix nach sich', mult: 2 },
  { re: /datenbank|\bdb\b|\bsql\b|oracle|postgres|schema/i, label: 'Datenbank-Schema von damals', mult: 1.7 },
  { re: /performance|langsam|schneller machen|optimier/i, label: '„Es ist halt langsam“', mult: 2 },
  { re: /fast fertig|nur noch|90 ?%|letzte[nr]? (schritt|meter|prozent)/i, label: 'Die letzten 10 % (= 90 % der Zeit)', mult: 3 },
  { re: /update|upgrade|aktualisier/i, label: 'Update „ohne Breaking Changes“', mult: 2 },
  { re: /realistisch|ehrlich|seriös/i, label: 'Ehrlichkeitsbonus', mult: 0.8 },
  { re: /^sudo\b/i, label: 'sudo (mit Verantwortung)', mult: 0.5 },
];
export const MAX_KEYWORD_FACTORS = 5;
export const OVERFLOW_FACTOR = (n) => ({ label: `+ ${n} weitere Faktoren (du hast viel geschrieben)`, mult: 1.5 });

// Faktoren aus der Form des Textes.
export function shapeFactors(text) {
  const out = [];
  const len = text.trim().length;
  if (len < 16) out.push({ label: 'Anforderung: 1 Zeile, keine Spezifikation', mult: 2 });
  if (len > 140) out.push({ label: 'Anforderung länger als drei Sätze', mult: 1.5 });
  if ((text.match(/\?/g) || []).length > 1) out.push({ label: 'Mehrere Fragezeichen erkannt', mult: 1.2 });
  if (/!/.test(text)) out.push({ label: 'Ausrufezeichen (Dringlichkeit)', mult: 1.3 });
  if (/\b(oder|und\/oder|evtl|vielleicht|eventuell|irgendwie)\b/i.test(text)) out.push({ label: 'Unklare Anforderung („irgendwie“)', mult: 1.6 });
  if (/[A-ZÄÖÜ]{5,}/.test(text)) out.push({ label: 'CAPSLOCK erkannt', mult: 1.4 });
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
  { label: 'Der Architekt ist in einem anderen Call', mult: 1.3 },
  { label: 'Der eine Kollege, der alles weiß, ist weg', mult: 1.8 },
];

export const MOOD_FACTORS = {
  optimistic: { label: 'Vertriebsoptimismus', mult: 0.4 },
  pessimistic: { label: 'Betrieb hat Bedenken', mult: 2.5 },
};

export const UNITS = {
  pt: { key: 'pt', singular: 'Personentag', plural: 'Personentage', re: /personentag|\bpt\b|aufwand|tage?\b|wie lange|dauer|wie viel arbeit|manntag|kapazität/i },
  sp: { key: 'sp', singular: 'Story Point', plural: 'Story Points', re: /story ?points?|\bsp\b|sprint|scrum|jira|ticket|backlog|user ?story|\bepic\b|planning/i },
  weeks: { key: 'weeks', singular: 'Woche', plural: 'Wochen', re: /\bwann\b|fertig|termin|monat|jahr|quartal|release|go.?live|launch|deadline|roadmap|zeitplan|wochen?\b/i },
  eur: { key: 'eur', singular: '€', plural: '€', re: /€|euro|kost|budget|preis|teuer|geld|rechnung|angebot|honorar|bezahl|tagessatz|invest/i },
  hours: { key: 'hours', singular: 'Stunde', plural: 'Stunden', re: /stunden?|\bstd\b|\bh\b/i },
};
export const UNIT_ORDER = ['eur', 'sp', 'hours', 'weeks', 'pt'];
export const DAY_RATE = 1850;

export const VERDICTS = {
  snake: [
    'Kritischer Fehlschlag. Scope Creep hat einen natürlichen Einser gewürfelt.',
    'Snake Eyes. Das ist die Zahl, die der Vertrieb dem Kunden genannt hat – mal zehn.',
    '1 + 1. „Das schaffen wir bis Feierabend.“ – Ich, seit 3.000 Jahren.',
    'Zwei Einsen. Ich würde das nicht ins Angebot schreiben. Ich würde das nirgendwo hinschreiben.',
    'Doppel-Eins. Lenkungsausschuss einberufen, Kaffee nachbestellen, Therapeuten anrufen.',
  ],
  jackpot: [
    'Doppelsechs! Kritischer Erfolg. Das Projekt wird pünktlich fertig. (Das hat noch nie jemand gesagt.)',
    'Zwei Sechsen. Jini ist gnädig und halbiert. Trag die Zahl sofort ins Angebot ein, bevor ich es mir anders überlege.',
    'Zwölf Augen. Das Orakel sagt: Rahmenvertrag – und diesmal sogar im Budget.',
    'Doppel-Sechs. In der Fachsprache: „Phase 1 reicht.“',
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
    'Ich empfehle: Programm-Management, Lenkungskreis und einen guten Therapeuten.',
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
    'Pasch. Zwei gleiche Zahlen, wie Angebot und Nachtrag. Nur andersrum.',
  ],
};

export const REROLL_VERDICTS = {
  up: ['Siehst du? Nachschätzen macht es nie kleiner.', 'Größer geworden. Beim zweiten Blick sieht man immer mehr Arbeit.'],
  down: ['Kleiner geworden. Irgendwas wurde vergessen. Sicher.', 'Weniger als vorher. Der Vertrieb hat mitgewürfelt.'],
  same: ['Gleiche Zahl. Das nennt man Reproduzierbarkeit. Passiert sonst nie.'],
};

export const STAMPS = {
  normal: ['GESCHÄTZT™', 'BELASTBAR™', 'PI × DAUMEN', 'KONFIDENZ 100 %'],
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
  { re: /^\s*(hi|hallo|hey|moin|servus|grüß gott|guten (tag|morgen|abend)|na)\b[!. ]*$/i, reply: 'Moin! Ich bin Jini. Du kannst mich alles fragen, ich antworte auf alles mit einer Zahl. Nenn mir dein Vorhaben – oder tipp „nur kurz“, wenn du mich weinen sehen willst.', noRoll: true },
  { re: /^\s*(vielen dank|danke|dankeschön|merci|thx)\b.{0,25}$/i, reply: 'Gern geschehen. Das macht einen Personentag Beratungshonorar. Rechnung kommt per Fax. 📠', noRoll: true },
  { re: /^\s*nein\s*[!. ]*$/i, reply: 'Doch.', followup: 'Oh!', noRoll: true },
  { re: /wann bist du fertig/i, reply: 'Ich bin ein Dschinn. Ich bin nie fertig – ich bin in der Verlängerung. Seit 3.000 Jahren. Frag lieber, wann DU fertig bist, das würfle ich dir gern.', noRoll: true },
  { re: /ist das (schon )?fertig|seid ihr (schon )?fertig|bist du (schon )?fertig|^\s*status\s*\??\s*$/i, reply: 'Fast. Nur noch die letzten 10 %. Seit drei Wochen.', noRoll: true },
  { re: /bist du (eine |ein )?(ki|ai|echt|bot)|bist du chatgpt|echte ki/i, reply: 'Ich bin ein Dschinn mit Würfeln. Das ist ungefähr so belastbar wie eine KI, nur ehrlicher – und ich halluziniere nur Zahlen, keine Quellen.', noRoll: true },
  { re: /wie geht.?s|wie geht es dir|alles gut\??$/i, reply: 'Rot im Statusbericht, grün in der PowerPoint. Also: alles wie immer. Was soll ich schätzen?', noRoll: true },
  { re: /\blampe\b|\breib(e|en|st|t)?\b|\bgerieben\b/i, reply: 'Hey, nicht reiben. Wir sind hier in einem professionellen Kontext. Drei Wünsche gibt’s nicht – nur drei Schätzungen, und die weichen alle voneinander ab.', noRoll: true },
  { re: /wie lange hat es gedauert,? dich zu bauen|schätz(e)? dich selbst|wie lange hast du gebraucht/i, reply: 'Ein Tag. Geschätzt waren zwei Stunden. Das ist der Faktor 4, den ihr sonst nirgends kalkuliert.', noRoll: true },
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
};

export const SLAMS = {
  jackpot: 'Kritischer Erfolg',
  snake: 'Kritischer Fehlschlag',
};

export const PLACEHOLDER_WIDE = 'Dein Vorhaben … z. B. „Nur kurz das Logo tauschen“';
export const PLACEHOLDER_NARROW = 'Was soll Jini schätzen?';

export const FIB = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765];
