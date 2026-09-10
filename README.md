# 🧞 Jini – das Schätz-Orakel

Eine kleine Spaß-Anwendung im Look einer klassischen KI-Chat-App: Du beschreibst ein Vorhaben
(„Nur schnell die Farbe im Logo ändern“), Jini der Dschinn liest Faktoren aus deinem Text,
wirft zwei **echte 3D-Würfel** (three.js + Physik) und liefert eine Schätzung in Personentagen,
Story Points, Wochen, Stunden oder Euro – inklusive Faktoren-Aufstellung, Konfidenz-Stempel
und Konfetti bei Doppelsechs.

Nur zum Spaß und als Machbarkeits-Analyse gedacht. Keine echte KI, kein Backend – alles läuft
lokal im Browser.

## Direkt öffnen

- **`index.html`** ist komplett eigenständig (JS, CSS, 3D-Bibliotheken sind eingebettet).
  Datei herunterladen und im Browser öffnen – fertig.
- **GitHub Pages:** Einmalig unter *Settings → Pages → Build and deployment → Source* die
  Option **GitHub Actions** wählen. Danach veröffentlicht der Workflow `pages.yml` bei jedem
  Push auf `main` automatisch nach `https://veith-kallisto.github.io/Ai-schaetzung-fun/`.

## Was passiert bei einer Schätzung?

1. **Faktoren aus dem Text** – z. B. „nur“ (× 3), „schnell“ (× 2), „Excel“ (× 4), „SAP“ (× π),
   „KI“ (× 1,5 Buzzword-Zuschlag), „Legacy“ (× 3), „bis Freitag“ (× 2 Deadline-Panik) …
   plus ein bis zwei Dauerbrenner wie „Hofstadters Gesetz“ oder „Meeting-Overhead“.
2. **Einheit aus dem Text** – „Was kostet …“ → Euro (Tagessatz 1.850 €), „Story Points“ → Fibonacci-
   Rundung, „Wann …“ → Wochen, „Stunden“ → Stunden, sonst Personentage.
3. **Der Wurf** – zwei Würfel werden physikalisch simuliert; die Augenzahl wird aus der Endlage
   abgelesen. 1 + 1 = kritischer Fehlschlag (× 10), 6 + 6 = Jackpot (halbiert, Konfetti).
4. **Die Karte** – Basiswurf, alle Faktoren, große Zahl (zählt hoch), Konfidenz-Stempel, Spruch.
   Mit „Nochmal würfeln“, „Optimistisch (Vertrieb)“, „Pessimistisch (Betrieb)“, „In Euro“ …

Easter Eggs: `42`, `Hallo`, `Danke`, `Bist du fertig?`, `Wer bist du?` …

## Entwickeln

```bash
npm install
npm run build      # erzeugt index.html aus src/
npm run dev        # baut bei jeder Änderung in src/ neu
```

| Datei | Inhalt |
| --- | --- |
| `src/index.html` | Seitengerüst (Chat, Bühne, Eingabe) |
| `src/styles.css` | Look & Animationen (dunkel, Lampengold, Dschinn-Violett) |
| `src/main.js` | Chat-Logik, Schätzformel, Ergebniskarte |
| `src/dice.js` | 3D-Bühne: three.js-Szene, cannon-es-Physik, Augen ablesen |
| `src/genie.svg` | Der Dschinn (SVG, per CSS animiert: schweben, blinzeln, grinsen) |
| `src/audio.js` | Synthetische Geräusche (WebAudio): Klackern, Wusch, Glitzern |
| `src/copy.js` | Alle Texte: Faktoren, Sprüche, Easter Eggs, Chips |

Bibliotheken: [three.js](https://threejs.org/) r169, [cannon-es](https://github.com/pmndrs/cannon-es) 0.20,
[canvas-confetti](https://github.com/catdad/canvas-confetti) 1.9. Gebündelt mit esbuild.

## Claude per GitHub-App steuern

`.github/workflows/claude.yml` reagiert auf `@claude` in Issues und Pull Requests – auch aus der
GitHub-App am Handy. Einmalig nötig: die [Claude GitHub App](https://github.com/apps/claude)
installieren und ein Secret (`CLAUDE_CODE_OAUTH_TOKEN` oder `ANTHROPIC_API_KEY`) anlegen.
Details stehen als Kommentar in der Workflow-Datei.
