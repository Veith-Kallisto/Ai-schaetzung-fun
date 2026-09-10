// Alle Texte von Jini an einem Ort. Deutsch, mit Beratungs-Humor.

export const INTRO = [
  'Ich bin <b>Jini</b>, das Schätz-Orakel. Sag mir, was geschätzt werden soll – Feature, Migration, „nur ein Button“ – und ich werfe die Würfel des Schicksals.',
  'Methodik: zwei Würfel, ein paar Faktoren aus deinem Text, großzügige Rundung. Genauigkeit: gefühlt 100 %.',
];

export const THINKING_LINES = [
  'Befrage die Kristallkugel …',
  'Konsultiere das Backlog von 2019 …',
  'Rechne in Story Points um …',
  'Multipliziere mit π, sicherheitshalber …',
  'Suche das passende Jira-Ticket …',
  'Frage die Senior-Entwicklerin (im Urlaub) …',
  'Lese im Kaffeesatz des Standups …',
  'Puste den Staub von der Lampe …',
  'Zähle die Meetings bis zum Go-live …',
  'Runde großzügig auf …',
  'Ignoriere die Anforderungen (wie alle) …',
  'Schaue in die Sterne – und in Excel …',
  'Prüfe, ob das Legacy-System noch atmet …',
  'Wärme die Würfel des Schicksals an …',
  'Berechne den Freitagnachmittag-Zuschlag …',
  'Öffne die Glaskugel-API (v2, deprecated) …',
  'Kalibriere den Optimismus auf null …',
  'Lade drei Wünsche … bitte warten …',
  'Frage den Praktikanten …',
  'Schätze die Schätzung der Schätzung …',
  'Erinnere mich an die letzte Deadline. Autsch …',
  'Formuliere das Sprint-Ziel um …',
  'Übersetze „mal eben“ in Personentage …',
  'Wende Hofstadters Gesetz an …',
  'Halte die Würfel an die Lampe …',
  'Ziehe Weihnachten, Urlaub und Sommerloch ab …',
  'Warte auf Freigabe vom Fachbereich …',
];

// Faktoren, die Jini aus dem Text liest. Reihenfolge = Reihenfolge in der Aufstellung.
export const KEYWORD_FACTORS = [
  { re: /\bnur\b/i, label: 'Kunde sagt „nur“', mult: 3 },
  { re: /\bmal eben\b|\bschnell\b|\bkurz\b|\bkurzfristig\b|\bfix\b|\bzack\b/i, label: '„Mal eben schnell“-Zuschlag', mult: 2 },
  { re: /\beinfach\b|\bsimpel\b|\btrivial\b|\bkein problem\b|\bsollte (doch )?(einfach|schnell) gehen\b/i, label: '„Ist doch einfach“-Faktor', mult: 2.5 },
  { re: /\bkleine?[snr]? (änderung|anpassung|feature|fix|sache|ding)\b|\bkleinigkeit\b/i, label: 'Kleine Änderung™', mult: 4 },
  { re: /excel|tabelle|csv|makro|vba/i, label: 'Excel im Spiel', mult: 4 },
  { re: /\bsap\b/i, label: 'SAP-Konstante (π)', mult: 3.14 },
  { re: /\bki\b|\bai\b|künstliche intelligenz|\bllm\b|gpt|chatgpt|copilot|machine learning|\bml\b|agent/i, label: 'Buzzword-Zuschlag (KI)', mult: 1.5 },
  { re: /legacy|alt(es|e|en)? system|cobol|mainframe|host|von 20(0|1)\d/i, label: 'Legacy-Archäologie', mult: 3 },
  { re: /migration|migrieren|umzug|umziehen|ablösung|ablösen/i, label: 'Migrations-Realität', mult: 2 },
  { re: /deadline|bis (freitag|montag|morgen|übermorgen|ende|nächste)|dringend|asap|sofort|gestern/i, label: 'Deadline-Panik', mult: 2 },
  { re: /freitag/i, label: 'Freitagnachmittag-Deploy', mult: 1.5 },
  { re: /prototyp|\bpoc\b|proof of concept|\bmvp\b|pilot/i, label: '„Nur ein Prototyp“ (geht in Produktion)', mult: 2 },
  { re: /datenschutz|dsgvo|gdpr|compliance|revision|sicherheit|security|audit/i, label: 'Datenschutz-Schleife', mult: 2 },
  { re: /kunde|kundin|stakeholder|vorstand|\bchef\b|geschäftsführ|fachbereich|abteilung/i, label: 'Stakeholder-Faktor', mult: 1.5 },
  { re: /login|button|knopf|farbe|logo|schrift|\bcss\b|frontend|design|ui\b|ux\b/i, label: 'Frontend-Unterschätzung', mult: 1.8 },
  { re: /cloud|kubernetes|k8s|docker|microservice|serverless|azure|aws|gcp/i, label: 'Cloud-Native-Steuer', mult: 2 },
  { re: /blockchain|web3|\bnft\b|metaverse|krypto/i, label: 'Hype-Zyklus 2021 (will keiner mehr)', mult: 0.5 },
  { re: /schnittstelle|\bapi\b|integration|anbindung|anbinden|import|export|sync/i, label: 'Schnittstelle „gibt’s schon“', mult: 2.5 },
  { re: /\btest|\bqa\b|qualität|abnahme/i, label: 'Tests (diesmal wirklich)', mult: 1.5 },
  { re: /dokumentation|\bdoku\b|handbuch|wiki/i, label: 'Doku (liest eh keiner)', mult: 0.8 },
  { re: /meeting|abstimmung|workshop|besprechung|jour fixe|termin/i, label: 'Meeting-Marathon', mult: 2 },
  { re: /agil|scrum|sprint|kanban|daily|retro/i, label: 'Agil (keine Deadline, aber Daily)', mult: 1.3 },
  { re: /urlaub|krank|sommer|weihnacht|ferien|feiertag/i, label: 'Urlaubszeit-Faktor', mult: 2 },
  { re: /praktikant|werkstudent|azubi|student/i, label: 'Praktikanten-Rabatt', mult: 0.7 },
  { re: /berater|consult|agentur|dienstleister|freelancer/i, label: 'Berater-Rekursion', mult: 1.5 },
  { re: /kostenlos|umsonst|gratis|\b0 ?€|null euro|ohne budget/i, label: 'Budget: keins (Jini lacht)', mult: 5 },
  { re: /genau|exakt|präzise|verbindlich|fix(er|es|e)? (preis|termin|datum)|festpreis/i, label: 'Verbindlichkeit erbeten', mult: 2 },
  { re: /jini/i, label: 'Du hast meinen Namen gesagt (kostet extra)', mult: 1.1 },
  { re: /passwort|reset|zurücksetzen|drucker|wlan|outlook|teams/i, label: 'IT-Support-Zuschlag', mult: 1.5 },
  { re: /ganz(e|es|en)? (system|projekt|plattform|unternehmen)|alles|komplett|neu bauen|neubau|greenfield|from scratch/i, label: 'Rewrite-Wahn', mult: 3 },
  { re: /bug|fehler|kaputt|geht nicht|funktioniert nicht|absturz/i, label: '„Ist nur ein Bug“', mult: 2 },
  { re: /datenbank|\bdb\b|sql|oracle|postgres|schema/i, label: 'Datenbank-Schema von damals', mult: 1.7 },
];

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
  { label: 'Kaffee-Konstante', mult: 1.1 },
  { label: 'Optimismus-Korrektur', mult: 1.5 },
  { label: 'Unbekannte Unbekannte', mult: 1.4 },
  { label: 'Jemand ist krank', mult: 1.2 },
  { label: 'Der eine Kollege, der alles weiß, ist weg', mult: 1.8 },
];

export const MOOD_FACTORS = {
  optimistic: { label: 'Vertriebsoptimismus', mult: 0.4 },
  pessimistic: { label: 'Betrieb hat Bedenken', mult: 2.5 },
};

export const UNITS = {
  pt: { key: 'pt', singular: 'Personentag', plural: 'Personentage', re: /personentag|\bpt\b|aufwand|tage?\b|wie lange|dauer|wie viel arbeit/i },
  sp: { key: 'sp', singular: 'Story Point', plural: 'Story Points', re: /story ?points?|\bsp\b|sprint|scrum|jira|ticket|backlog|schätzen wir|planning/i },
  weeks: { key: 'weeks', singular: 'Woche', plural: 'Wochen', re: /\bwann\b|fertig|termin|monat|jahr|quartal|release|go.?live|launch|deadline|wochen?\b/i },
  eur: { key: 'eur', singular: '€', plural: '€', re: /€|euro|kost|budget|preis|teuer|geld|rechnung|angebot|honorar|bezahl/i },
  hours: { key: 'hours', singular: 'Stunde', plural: 'Stunden', re: /stunden?|\bstd\b|\bh\b/i },
};
export const UNIT_ORDER = ['eur', 'sp', 'hours', 'weeks', 'pt'];
export const DAY_RATE = 1850;

export const VERDICTS = {
  snake: [
    'Kritischer Fehlschlag. Scope Creep hat einen natürlichen Einser gewürfelt.',
    'Zwei Einsen. Das Universum hat gesprochen: Das wird ein Programm, kein Projekt.',
    'Snake Eyes. Jini empfiehlt: Lenkungsausschuss einberufen, Kaffee nachbestellen.',
  ],
  jackpot: [
    'Doppelsechs! Das Projekt wird pünktlich fertig. (Das hat noch nie jemand gesagt.)',
    'Zwei Sechsen. Jini ist gnädig – der Wurf halbiert alles. Nutze diesen Moment.',
    'Jackpot. Trag diese Zahl sofort ins Angebot ein, bevor Jini es sich anders überlegt.',
  ],
  tiny: [
    'Verdächtig klein. Jini hat vermutlich die Tests vergessen. Wie alle.',
    'So wenig? Da fehlt noch die Doku, die Abnahme und der Termin mit dem Betriebsrat.',
    'Klingt nach einem Nachmittag. Rechne mit einer Woche.',
  ],
  huge: [
    'Das ist kein Projekt mehr, das ist eine Karriere.',
    'Plan das lieber als Programm mit drei Teilprojekten und einem Steering Committee.',
    'Bei dieser Zahl empfiehlt Jini: umbenennen in „Transformation“, dann passt es.',
  ],
  normal: [
    'Plus/minus Faktor drei – wie immer.',
    'Jini hat mit π multipliziert. Sicherheitshalber.',
    'Diese Schätzung wurde ohne Anforderungen erstellt. Wie in echt.',
    'Das Planning Poker hätte länger gedauert und wäre nicht besser gewesen.',
    'Klingt viel? Warte, bis der Fachbereich das Konzept gelesen hat.',
    'Das ist die Schätzung. Der Aufwand ist etwas anderes.',
    'Zur Sicherheit: Jini hat 20 % Puffer eingebaut. Und dann nochmal 20 % auf den Puffer.',
    'Präzise bis auf die Nachkommastelle. Die Vorkommastellen sind Auslegungssache.',
  ],
  doubles: [
    'Pasch! Jini würfelt eigentlich nochmal – aber der Kunde wartet.',
    'Ein Pasch. Bedeutet nichts, sieht aber gut aus im Statusbericht.',
  ],
};

export const EASTER_EGGS = [
  { re: /^\s*42\s*[?!.]*\s*$/i, reply: '42. Die Antwort auf alles. Aber was war nochmal die Anforderung?', noRoll: true },
  { re: /^\s*(hi|hallo|hey|moin|servus|grüß gott|guten (tag|morgen|abend)|na)\b[!. ]*$/i, reply: 'Hallo! Ich bin Jini. Ich schätze alles – außer meine eigene Fertigstellung. Was soll’s sein?', noRoll: true },
  { re: /^\s*(vielen dank|danke|dankeschön|merci|thx)\b.{0,25}$/i, reply: 'Gern geschehen. Die Rechnung kommt nach Tagessatz. Der Wurf war umsonst, die Weisheit nicht.', noRoll: true },
  { re: /bist du (schon )?fertig|wann bist du fertig|status\??$/i, reply: 'Fertig ist ein Konzept. Ich bin bei 90 %. Seit drei Wochen.', noRoll: true },
  { re: /wer bist du|was bist du|was kannst du|^\s*(hilfe|help)\s*[?!.]*$/i, reply: 'Ich bin Jini, Schätz-Orakel mit Lampe. Du beschreibst ein Vorhaben, ich lese Faktoren aus dem Text, würfle in 3D und runde großzügig. Probier mal: „Nur schnell die Farbe im Logo ändern“.', noRoll: true },
  { re: /^\s*(tschüss|ciao|bye|bis dann|auf wiedersehen)\b/i, reply: 'Bis dann! Die Würfel bleiben hier. Der Aufwand auch.', noRoll: true },
  { re: /liebst du mich|magst du mich|heirat/i, reply: 'Ich schätze dich sehr. Auf 34 Story Points.', noRoll: true },
  { re: /^\s*(ja|nein|ok|okay|jo|ne)\s*[.!?]*\s*$/i, reply: 'Verstanden. Das ist auch die einzige Anforderung, die ich je bekommen habe.', noRoll: true },
];

export const EMPTY_CHIPS = [
  'Wie lange dauert die SAP-Migration?',
  'Story Points für den Login-Button?',
  'Was kostet ein kleines KI-Feature?',
  'Wann ist das Projekt fertig?',
  'Nur schnell die Farbe im Logo ändern',
  'Excel-Export, ist doch einfach, oder?',
  'Kleine Änderung an der Schnittstelle bis Freitag',
];

export const FOLLOWUP_CHIPS = [
  { label: '🎲 Nochmal würfeln', action: 'reroll' },
  { label: '📈 Optimistisch (Vertrieb)', action: 'optimistic' },
  { label: '🧯 Pessimistisch (Betrieb)', action: 'pessimistic' },
  { label: '💶 In Euro', action: 'unit:eur' },
  { label: '🃏 In Story Points', action: 'unit:sp' },
];

export const STAGE_CAPTIONS = {
  idle: 'Die Würfel des Schicksals ruhen.',
  thinking: 'Jini denkt. Das dauert nie lange.',
  rolling: 'Die Würfel fallen …',
  result: 'Gewürfelt. Unwiderruflich.',
};

export const CONFIDENCE = ['Konfidenz 100 %', 'Konfidenz 110 %', 'Konfidenz 100 % (wie immer)', 'Konfidenz: ja', 'Konfidenz 99,9 %'];

export const FIB = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765];
