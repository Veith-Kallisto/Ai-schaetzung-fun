// Jini – das Schätz-Orakel. Chat-Oberfläche, Schätzlogik und Bühnensteuerung.
import confetti from 'canvas-confetti';
import { DiceStage } from './dice.js';
import { JiniAudio } from './audio.js';
import * as C from './copy.js';

const $ = (s) => document.querySelector(s);
const els = {
  stage: $('#stage'),
  stageCanvas: $('#stage-canvas'),
  genie: $('#genie'),
  caption: $('#stage-caption'),
  messages: $('#messages'),
  chips: $('#chips'),
  form: $('#composer'),
  input: $('#prompt'),
  send: $('#btn-send'),
  sound: $('#btn-sound'),
  reset: $('#btn-reset'),
  status: $('#status-text'),
};

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fmt = new Intl.NumberFormat('de-DE');
const audio = new JiniAudio();
const DICE_GLYPHS = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

let stage = null;
let busy = false;
let last = null; // { text, unit, mood }

// ---------- Hilfen ----------
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
function pickN(arr, n) {
  const copy = [...arr];
  const out = [];
  while (copy.length && out.length < n) out.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
  return out;
}
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
}
function scrollDown() {
  requestAnimationFrame(() => {
    els.messages.scrollTo({ top: els.messages.scrollHeight, behavior: reduced ? 'auto' : 'smooth' });
  });
}
function fmtMult(m) {
  if (m === 3.14) return 'π';
  return String(m).replace('.', ',');
}
function fmtDec(x) {
  return x >= 100 ? fmt.format(Math.round(x)) : x.toFixed(1).replace('.', ',');
}
function roundNice(n) {
  const step = n < 10000 ? 100 : n < 100000 ? 500 : 1000;
  return Math.round(n / step) * step;
}
function nextFib(x) {
  for (const f of C.FIB) if (f >= x) return f;
  return C.FIB[C.FIB.length - 1];
}
function stageOrigin() {
  const r = els.stage.getBoundingClientRect();
  return { x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height * 0.55) / window.innerHeight };
}
function toast(text) {
  const t = el('div', 'toast', escapeHtml(text));
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2300);
}

// ---------- Bühne & Dschinn ----------
function setGenie(state) {
  els.genie.classList.remove('thinking', 'rolling', 'reveal', 'sad');
  els.stage.classList.remove('thinking', 'rolling');
  if (state === 'thinking') { els.genie.classList.add('thinking'); els.stage.classList.add('thinking'); }
  if (state === 'rolling') { els.genie.classList.add('rolling'); els.stage.classList.add('rolling'); }
  if (state === 'reveal') els.genie.classList.add('reveal');
  if (state === 'sad') els.genie.classList.add('sad');
  const cap = state === 'reveal' || state === 'sad' ? C.STAGE_CAPTIONS.result : C.STAGE_CAPTIONS[state] || C.STAGE_CAPTIONS.idle;
  if (stage || state !== 'idle') els.caption.textContent = cap;
}
function flashStage() {
  if (reduced) return;
  els.stage.classList.remove('flash');
  void els.stage.offsetWidth;
  els.stage.classList.add('flash');
}
let shakeTimer = 0;
function shakeStage() {
  if (reduced) return;
  els.stage.classList.remove('shake');
  void els.stage.offsetWidth;
  els.stage.classList.add('shake');
  clearTimeout(shakeTimer);
  shakeTimer = setTimeout(() => els.stage.classList.remove('shake'), 200);
}

function initStage() {
  try {
    stage = new DiceStage(els.stageCanvas, {
      reducedMotion: reduced,
      onCollide: (strength) => {
        audio.clack(strength);
        if (strength > 0.42) shakeStage();
      },
    });
  } catch (err) {
    console.warn('3D-Bühne nicht verfügbar:', err);
    stage = null;
    els.stage.classList.add('no-webgl');
    els.caption.textContent = 'Kein WebGL – Jini würfelt im Kopf.';
  }
}

// ---------- Nachrichten ----------
function miniAvatar() {
  return el('span', 'mini', '🧞');
}
function addMessage(role, html, { wide = false } = {}) {
  const wrap = el('div', `msg ${role}${wide ? ' wide' : ''}`);
  if (role === 'genie') wrap.appendChild(miniAvatar());
  const bubble = el('div', 'bubble', html);
  wrap.appendChild(bubble);
  els.messages.appendChild(wrap);
  scrollDown();
  return { wrap, bubble };
}
function addGenieText(paragraphs) {
  const html = paragraphs.map((p) => `<p>${p}</p>`).join('');
  return addMessage('genie', html);
}

/** Tipp-Indikator mit wechselnden Orakel-Sprüchen. */
function showThinking(lines) {
  const { wrap, bubble } = addMessage('genie', '');
  bubble.innerHTML = '<div class="typing"><span class="dots"><i></i><i></i><i></i></span><span class="thinking-line"></span></div>';
  const lineEl = bubble.querySelector('.thinking-line');
  let i = 0;
  const show = () => {
    const fresh = lineEl.cloneNode(false);
    fresh.textContent = lines[i % lines.length];
    lineEl.replaceWith(fresh);
    bubble.querySelector('.thinking-line').textContent = fresh.textContent;
    i++;
  };
  show();
  const timer = setInterval(show, 950);
  return {
    setLine(text) { clearInterval(timer); bubble.querySelector('.thinking-line').textContent = text; },
    remove() { clearInterval(timer); wrap.remove(); },
  };
}

function renderChips(items, onPick) {
  els.chips.innerHTML = '';
  items.forEach((item, i) => {
    const b = el('button', 'chip', escapeHtml(item.label || item));
    b.type = 'button';
    b.style.animationDelay = `${i * 45}ms`;
    b.addEventListener('click', () => onPick(item));
    els.chips.appendChild(b);
  });
}
function showEmptyChips() {
  renderChips(C.EMPTY_CHIPS, (text) => {
    els.input.value = text;
    autoGrow();
    els.form.requestSubmit();
  });
}
function showFollowupChips() {
  renderChips(C.FOLLOWUP_CHIPS, (chip) => runAction(chip.action));
}

// ---------- Schätzlogik ----------
function detectUnit(text) {
  for (const key of C.UNIT_ORDER) if (C.UNITS[key].re.test(text)) return key;
  return 'pt';
}
function analyze(text, opts = {}) {
  let factors = [];
  for (const f of C.KEYWORD_FACTORS) if (f.re.test(text)) factors.push({ label: f.label, mult: f.mult });
  factors.push(...C.shapeFactors(text));
  if (factors.length > 6) factors = factors.slice(0, 6);
  factors.push(...pickN(C.ALWAYS_FACTORS, factors.length >= 4 ? 1 : 2));
  if (opts.mood && C.MOOD_FACTORS[opts.mood]) factors.push(C.MOOD_FACTORS[opts.mood]);
  return { factors, unit: opts.unit || detectUnit(text) };
}

function compute(dice, plan) {
  const [a, b] = dice;
  const sum = a + b;
  const rows = [];
  const factors = [...plan.factors];
  let mood = 'normal';
  if (a === 1 && b === 1) { mood = 'snake'; factors.push({ label: 'Kritischer Fehlschlag (1 + 1)', mult: 10 }); }
  else if (a === 6 && b === 6) { mood = 'jackpot'; factors.push({ label: 'Doppelsechs – Jini ist gnädig', mult: 0.5 }); }
  else if (a === b) mood = 'doubles';

  let raw = sum;
  rows.push({ label: `Basiswurf ${a} + ${b}`, value: String(sum) });
  for (const f of factors) {
    raw *= f.mult;
    rows.push({ label: f.label, value: `× ${fmtMult(f.mult)}` });
  }
  if (plan.unit !== 'pt') rows.push({ label: 'Zwischensumme', value: fmtDec(raw), total: true });

  let value; let unitLabel; let approx;
  const u = C.UNITS[plan.unit] || C.UNITS.pt;
  switch (plan.unit) {
    case 'sp': {
      value = nextFib(raw);
      rows.push({ label: 'Consulting-Rundung: nächste Fibonacci-Zahl', value: `→ ${fmt.format(value)}` });
      unitLabel = value === 1 ? u.singular : u.plural;
      approx = `≈ ${fmt.format(Math.round(value * 1.5))} Personentage (Velocity von 2019)`;
      break;
    }
    case 'eur': {
      const pt = Math.max(1, Math.round(raw));
      rows.push({ label: `Tagessatz × ${fmt.format(pt)} PT`, value: `${fmt.format(C.DAY_RATE)} €` });
      value = roundNice(pt * C.DAY_RATE);
      unitLabel = '€ netto';
      approx = `≈ ${fmt.format(pt)} Personentage · zzgl. MwSt., Reisekosten und Nachträgen`;
      break;
    }
    case 'hours': {
      value = Math.max(1, Math.round(raw * 8));
      rows.push({ label: '1 PT = 8 h (theoretisch)', value: '× 8' });
      unitLabel = value === 1 ? u.singular : u.plural;
      approx = `≈ ${fmt.format(Math.max(1, Math.round(value / 8)))} Personentage, inkl. Kaffee`;
      break;
    }
    case 'weeks': {
      value = Math.max(1, Math.round(raw / 5));
      rows.push({ label: '5 PT = 1 Woche (Urlaub nicht eingerechnet)', value: '÷ 5' });
      unitLabel = value === 1 ? u.singular : u.plural;
      approx = value >= 52
        ? `≈ ${(value / 52).toFixed(1).replace('.', ',')} Jahre – Zeit für ein Steering Committee`
        : `≈ ${Math.ceil(value / 2)} Sprint${Math.ceil(value / 2) === 1 ? '' : 's'} à 2 Wochen`;
      break;
    }
    default: {
      value = Math.max(1, Math.round(raw));
      unitLabel = value === 1 ? u.singular : u.plural;
      approx = value >= 5
        ? `≈ ${fmt.format(Math.round(value / 5))} Wochen bei 5 PT/Woche (theoretisch)`
        : 'Das schafft man an einem Nachmittag. Niemals.';
    }
  }
  if (value > 9999999) { value = 9999999; rows.push({ label: 'Jini-Obergrenze der Anzeige', value: 'gedeckelt' }); }

  let bucket = mood;
  if (mood !== 'snake' && mood !== 'jackpot') {
    if (raw <= 4) bucket = 'tiny';
    else if (raw >= 400) bucket = 'huge';
    else bucket = mood === 'doubles' ? 'doubles' : 'normal';
  }
  return {
    dice, sum, rows, value, unit: plan.unit, unitLabel, approx,
    verdict: pick(C.VERDICTS[bucket]),
    mood: bucket,
    confidence: pick(C.CONFIDENCE),
  };
}

function countUp(node, target, delay) {
  setTimeout(() => {
    const dur = reduced ? 0 : 950;
    const t0 = performance.now();
    const tick = (now) => {
      const k = dur ? Math.min(1, (now - t0) / dur) : 1;
      const e = 1 - Math.pow(1 - k, 3);
      node.textContent = fmt.format(Math.round(target * e));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, delay);
}

function renderResult(res, text) {
  const [a, b] = res.dice;
  const chips = `<span class="dice-chips"><span class="die-chip" aria-label="Würfel ${a}">${DICE_GLYPHS[a]}</span><span class="die-chip" aria-label="Würfel ${b}">${DICE_GLYPHS[b]}</span></span>`;
  const rowsHtml = res.rows.map((r, i) =>
    `<tr class="${r.total ? 'total' : ''}" style="animation-delay:${180 + i * 70}ms"><td>${escapeHtml(r.label)}</td><td>${escapeHtml(r.value)}</td></tr>`,
  ).join('');
  const countDelay = 260 + res.rows.length * 70;
  const html = `
    <div class="card">
      <div class="card-head">${chips}<span>Basiswurf <b>${a} + ${b} = ${res.sum}</b></span></div>
      <table class="factors" aria-label="Schätzfaktoren"><tbody>${rowsHtml}</tbody></table>
      <div class="result">
        <div class="big"><span class="num" aria-live="off">0</span><span class="unit">${escapeHtml(res.unitLabel)}</span></div>
        <div class="approx">${escapeHtml(res.approx)}</div>
        <div class="seal" style="--stamp-delay:${countDelay + 1000}ms">${escapeHtml(res.confidence)}</div>
      </div>
      <p class="verdict">${escapeHtml(res.verdict)}</p>
      <div class="card-actions">
        <button class="btn" type="button" data-copy>Kopieren</button>
        <button class="btn primary" type="button" data-reroll>Nochmal würfeln</button>
      </div>
      <span class="sr-only">Ergebnis: ${fmt.format(res.value)} ${escapeHtml(res.unitLabel)}</span>
    </div>`;
  const { bubble } = addMessage('genie', html, { wide: true });
  countUp(bubble.querySelector('.num'), res.value, countDelay);
  bubble.querySelector('[data-copy]').addEventListener('click', (e) => copyResult(res, text, e.currentTarget));
  bubble.querySelector('[data-reroll]').addEventListener('click', () => runAction('reroll'));
  setTimeout(scrollDown, countDelay + 200);
  return bubble;
}

async function copyResult(res, text, btn) {
  const factors = res.rows.filter((r) => r.value.startsWith('×')).map((r) => `${r.label} ${r.value}`).join(', ');
  const line = `🧞 Jini schätzt „${text}“: ${fmt.format(res.value)} ${res.unitLabel} (Würfel ${res.dice[0]} + ${res.dice[1]}${factors ? '; ' + factors : ''}). ${res.confidence}. Nur zum Spaß.`;
  try {
    await navigator.clipboard.writeText(line);
    btn.textContent = 'Kopiert ✓';
    toast('Schätzung in die Zwischenablage kopiert.');
  } catch {
    toast('Kopieren geht hier nicht – Screenshot tut’s auch.');
  }
  setTimeout(() => { btn.textContent = 'Kopieren'; }, 1800);
}

function celebrate(res) {
  if (reduced) return;
  const origin = stageOrigin();
  const gold = ['#f5b84b', '#ffe08a', '#fffdf5'];
  if (res.mood === 'jackpot') {
    confetti({ particleCount: 160, spread: 85, startVelocity: 38, origin, colors: ['#f5b84b', '#8b6cff', '#2dd4bf', '#ff4d8d', '#fffdf5'], disableForReducedMotion: true });
    setTimeout(() => confetti({ particleCount: 90, spread: 120, startVelocity: 28, origin: { x: origin.x, y: origin.y - 0.1 }, colors: gold, disableForReducedMotion: true }), 350);
  } else if (res.mood === 'snake') {
    confetti({ particleCount: 40, spread: 50, startVelocity: 18, gravity: 1.6, origin, colors: ['#ff4d8d', '#5b3fe0', '#1b1740'], scalar: 0.9, disableForReducedMotion: true });
  } else {
    confetti({ particleCount: 34, spread: 70, startVelocity: 24, ticks: 90, scalar: 0.8, origin, colors: gold, disableForReducedMotion: true });
  }
}

function setBusy(b) {
  busy = b;
  els.send.disabled = b;
  els.input.disabled = b;
  if (!b) els.input.focus({ preventScroll: true });
}

async function estimate(text, opts = {}) {
  setBusy(true);
  els.chips.innerHTML = '';
  last = { text, unit: opts.unit, mood: opts.mood };
  const plan = analyze(text, opts);
  last.unit = plan.unit;

  setGenie('thinking');
  const thinking = showThinking(pickN(C.THINKING_LINES, 4));
  await wait(reduced ? 700 : 2400);

  setGenie('rolling');
  thinking.setLine('Die Würfel fallen …');
  audio.whoosh();
  let dice;
  if (stage) {
    dice = await stage.roll();
  } else {
    await wait(900);
    dice = [1 + Math.floor(Math.random() * 6), 1 + Math.floor(Math.random() * 6)];
  }
  const res = compute(dice, plan);
  thinking.remove();

  setGenie(res.mood === 'snake' ? 'sad' : 'reveal');
  flashStage();
  audio.shimmer(res.mood === 'snake' ? 'sad' : res.mood === 'jackpot' ? 'jackpot' : 'normal');
  try { navigator.vibrate?.(res.mood === 'jackpot' ? [40, 60, 40, 60, 140] : [25, 40, 25]); } catch { /* egal */ }
  renderResult(res, text);
  setTimeout(() => celebrate(res), 200);
  setTimeout(() => { if (!busy) return; }, 0);
  setTimeout(() => { if (!els.genie.classList.contains('thinking') && !els.genie.classList.contains('rolling')) setGenie('idle'); }, 2600);
  showFollowupChips();
  setBusy(false);
}

async function reply(text, delay = 900) {
  setBusy(true);
  setGenie('thinking');
  const thinking = showThinking(pickN(C.THINKING_LINES, 2));
  await wait(reduced ? 200 : delay);
  thinking.remove();
  setGenie('idle');
  audio.pop();
  addGenieText([text]);
  setBusy(false);
}

function runAction(action) {
  if (busy || !last) return;
  const map = {
    reroll: { msg: '🎲 Nochmal würfeln, bitte.', opts: { unit: last.unit, mood: last.mood } },
    optimistic: { msg: 'Und optimistisch? Der Vertrieb fragt.', opts: { unit: last.unit, mood: 'optimistic' } },
    pessimistic: { msg: 'Und wenn der Betrieb schätzt?', opts: { unit: last.unit, mood: 'pessimistic' } },
    'unit:eur': { msg: 'Und in Euro?', opts: { unit: 'eur', mood: last.mood } },
    'unit:sp': { msg: 'Und in Story Points?', opts: { unit: 'sp', mood: last.mood } },
  };
  const a = map[action];
  if (!a) return;
  addMessage('user', escapeHtml(a.msg));
  audio.pop();
  estimate(last.text, a.opts);
}

async function handleSubmit(text) {
  addMessage('user', escapeHtml(text));
  audio.pop();
  for (const egg of C.EASTER_EGGS) {
    if (egg.re.test(text)) {
      els.chips.innerHTML = '';
      await reply(egg.reply);
      if (!last) showEmptyChips(); else showFollowupChips();
      return;
    }
  }
  await estimate(text);
}

// ---------- Eingabe ----------
function autoGrow() {
  els.input.style.height = 'auto';
  els.input.style.height = `${Math.min(140, els.input.scrollHeight)}px`;
}
els.input.addEventListener('input', autoGrow);
els.input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
    e.preventDefault();
    els.form.requestSubmit();
  }
});
els.form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (busy) return;
  const text = els.input.value.trim();
  if (!text) {
    els.form.classList.remove('nudge');
    void els.form.offsetWidth;
    els.form.classList.add('nudge');
    els.input.focus();
    return;
  }
  els.input.value = '';
  autoGrow();
  handleSubmit(text);
});

function syncSoundButton() {
  els.sound.classList.toggle('is-muted', audio.muted);
  els.sound.setAttribute('aria-pressed', String(!audio.muted));
  els.sound.setAttribute('aria-label', audio.muted ? 'Ton an' : 'Ton aus');
}
els.sound.addEventListener('click', () => {
  audio.setMuted(!audio.muted);
  syncSoundButton();
  if (!audio.muted) audio.pop();
});
els.reset.addEventListener('click', () => {
  if (busy) return;
  els.messages.innerHTML = '';
  last = null;
  setGenie('idle');
  if (stage) stage.restDice([1 + Math.floor(Math.random() * 6), 1 + Math.floor(Math.random() * 6)]);
  addGenieText(C.INTRO);
  showEmptyChips();
  els.input.focus();
});

// Statuszeile mit Lebenszeichen
const STATUS_LINES = [
  'Schätz-Orakel · online · Konfidenz 100 %',
  'würfelt seit 1001 Nächten',
  'zertifiziert (von sich selbst)',
  'Tagessatz: drei Wünsche',
  'antwortet schneller als der Fachbereich',
];
let statusIdx = 0;
setInterval(() => {
  statusIdx = (statusIdx + 1) % STATUS_LINES.length;
  els.status.textContent = STATUS_LINES[statusIdx];
}, 9000);

// ---------- Start ----------
initStage();
syncSoundButton();
setGenie('idle');
addGenieText(C.INTRO);
showEmptyChips();
