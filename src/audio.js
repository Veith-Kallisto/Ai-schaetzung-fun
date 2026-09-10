// Kleine Klangkulisse, komplett synthetisch (WebAudio) – keine externen Dateien.
export class JiniAudio {
  constructor() {
    this.ctx = null;
    this.muted = false;
    try { this.muted = localStorage.getItem('jini-muted') === '1'; } catch { /* egal */ }
  }

  setMuted(m) {
    this.muted = m;
    try { localStorage.setItem('jini-muted', m ? '1' : '0'); } catch { /* egal */ }
  }

  ensure() {
    if (this.muted) return null;
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.55;
      this.master.connect(this.ctx.destination);
      this.noise = this._noiseBuffer();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
    return this.ctx;
  }

  _noiseBuffer() {
    const len = this.ctx.sampleRate * 0.5;
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  /** Würfel schlägt auf: kurzer Knack, Lautstärke nach Aufprallstärke. */
  clack(strength = 0.5) {
    const ctx = this.ensure();
    if (!ctx) return;
    const t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 1400 + Math.random() * 1200;
    bp.Q.value = 1.4;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.25 + strength * 0.6, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05 + strength * 0.05);
    src.connect(bp).connect(g).connect(this.master);
    src.start(t);
    src.stop(t + 0.12);
    // Holz-„Tok“
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(260 + Math.random() * 120, t);
    o.frequency.exponentialRampToValueAtTime(90, t + 0.06);
    const og = ctx.createGain();
    og.gain.setValueAtTime(0.0001, t);
    og.gain.exponentialRampToValueAtTime(0.15 + strength * 0.35, t + 0.003);
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
    o.connect(og).connect(this.master);
    o.start(t);
    o.stop(t + 0.1);
  }

  /** Wurfgeräusch: Rauschen mit Frequenz-Sweep. */
  whoosh() {
    const ctx = this.ensure();
    if (!ctx) return;
    const t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    src.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.setValueAtTime(300, t);
    f.frequency.exponentialRampToValueAtTime(3200, t + 0.22);
    f.frequency.exponentialRampToValueAtTime(400, t + 0.5);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.35, t + 0.12);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    src.connect(f).connect(g).connect(this.master);
    src.start(t);
    src.stop(t + 0.55);
  }

  /** Magisches Glitzern bei der Enthüllung. */
  shimmer(mood = 'normal') {
    const ctx = this.ensure();
    if (!ctx) return;
    const t = ctx.currentTime;
    const notes = mood === 'sad' ? [392, 349.2, 311.1, 261.6] : mood === 'jackpot' ? [523.3, 659.3, 784, 1046.5, 1318.5, 1568] : [523.3, 659.3, 784, 1046.5];
    notes.forEach((freq, i) => {
      const o = ctx.createOscillator();
      o.type = mood === 'sad' ? 'triangle' : 'sine';
      o.frequency.value = freq;
      const g = ctx.createGain();
      const start = t + i * (mood === 'sad' ? 0.16 : 0.07);
      g.gain.setValueAtTime(0.0001, start);
      g.gain.exponentialRampToValueAtTime(0.18, start + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, start + 0.6);
      o.connect(g).connect(this.master);
      o.start(start);
      o.stop(start + 0.65);
    });
  }

  /** Leises „Plopp“ für neue Nachrichten. */
  pop() {
    const ctx = this.ensure();
    if (!ctx) return;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(520, t);
    o.frequency.exponentialRampToValueAtTime(760, t + 0.05);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.12, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + 0.13);
  }
}
