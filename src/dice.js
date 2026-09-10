// 3D-Würfelbühne: three.js für die Optik, cannon-es für die Physik.
// Zwei Würfel werden über den Tisch geworfen; die Augenzahl wird aus der
// tatsächlichen Endlage abgelesen (Flächennormale, die am ehesten nach oben zeigt).
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const UP = new THREE.Vector3(0, 1, 0);

// Standardwürfel: gegenüberliegende Seiten ergeben 7.
const FACES = [
  { value: 1, normal: new THREE.Vector3(0, 1, 0) },
  { value: 6, normal: new THREE.Vector3(0, -1, 0) },
  { value: 2, normal: new THREE.Vector3(1, 0, 0) },
  { value: 5, normal: new THREE.Vector3(-1, 0, 0) },
  { value: 3, normal: new THREE.Vector3(0, 0, 1) },
  { value: 4, normal: new THREE.Vector3(0, 0, -1) },
];

// Augen-Layouts (u/v im Bereich -1..1 auf der Würfelseite)
const PIPS = {
  1: [[0, 0]],
  2: [[-1, -1], [1, 1]],
  3: [[-1, -1], [0, 0], [1, 1]],
  4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
  5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
  6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]],
};

const SIZE = 1; // Kantenlänge
const HALF = SIZE / 2;

function makeTableTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 1024;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(512, 512, 40, 512, 512, 512);
  grad.addColorStop(0, 'rgba(42,35,82,1)');
  grad.addColorStop(0.5, 'rgba(23,19,56,1)');
  grad.addColorStop(0.82, 'rgba(12,10,31,0.85)');
  grad.addColorStop(1, 'rgba(12,10,31,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 1024, 1024);
  // feines Samt-Rauschen
  const img = g.getImageData(0, 0, 1024, 1024);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] === 0) continue;
    const n = (Math.random() - 0.5) * 10;
    d[i] += n; d[i + 1] += n; d[i + 2] += n;
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

// Schicksalsring in Lampengold – eigene Textur, damit er sich der Arena anpasst.
function makeRingTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d');
  const R = 236;
  g.strokeStyle = 'rgba(245,184,75,0.32)';
  g.lineWidth = 2.5;
  g.beginPath(); g.arc(256, 256, R, 0, Math.PI * 2); g.stroke();
  g.lineWidth = 1;
  g.strokeStyle = 'rgba(245,184,75,0.18)';
  g.beginPath(); g.arc(256, 256, R - 20, 0, Math.PI * 2); g.stroke();
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2;
    const r1 = i % 3 === 0 ? R + 13 : R + 7;
    g.strokeStyle = 'rgba(245,184,75,0.38)';
    g.lineWidth = i % 3 === 0 ? 2.2 : 1.3;
    g.beginPath();
    g.moveTo(256 + Math.cos(a) * R, 256 + Math.sin(a) * R);
    g.lineTo(256 + Math.cos(a) * r1, 256 + Math.sin(a) * r1);
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

export class DiceStage {
  /**
   * @param {HTMLElement} container
   * @param {{onCollide?: (strength:number)=>void, reducedMotion?: boolean}} opts
   */
  constructor(container, opts = {}) {
    this.container = container;
    this.onCollide = opts.onCollide || (() => {});
    this.reducedMotion = !!opts.reducedMotion;
    this.reserveTop = 0.2; // Anteil oben, der für den Dschinn frei bleibt
    this.dice = [];
    this.rolling = false;
    this.snapping = [];
    this.lastCollideAt = 0;
    this.rollStart = 0;
    this.t = 0;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    container.appendChild(renderer.domElement);
    this.renderer = renderer;

    const scene = new THREE.Scene();
    this.scene = scene;
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    this.camera = camera;
    this.cameraTarget = new THREE.Vector3(0, 0.25, 0);
    this.cameraDir = new THREE.Vector3(0, 1.05, 1).normalize(); // von schräg vorne oben

    // Licht: warmes Lampengold als Key, violetter Rand, kühle Hemisphäre
    scene.add(new THREE.HemisphereLight(0xc9bcff, 0x1a1236, 0.75));
    const key = new THREE.DirectionalLight(0xffe0a6, 2.6);
    key.position.set(3.5, 8, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 25;
    key.shadow.camera.left = key.shadow.camera.bottom = -6;
    key.shadow.camera.right = key.shadow.camera.top = 6;
    key.shadow.bias = -0.0008;
    key.shadow.radius = 4;
    scene.add(key);
    const rim = new THREE.PointLight(0x8b6cff, 30, 16, 1.6);
    rim.position.set(-4.5, 3.5, -3);
    scene.add(rim);
    const rim2 = new THREE.PointLight(0x2dd4bf, 12, 14, 1.6);
    rim2.position.set(4, 2.5, -4);
    scene.add(rim2);

    // Tisch
    const table = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 18),
      new THREE.MeshStandardMaterial({ map: makeTableTexture(), roughness: 0.95, metalness: 0.05, transparent: true }),
    );
    table.rotation.x = -Math.PI / 2;
    table.receiveShadow = true;
    scene.add(table);
    const ring = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshBasicMaterial({ map: makeRingTexture(), transparent: true, depthWrite: false }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.004;
    scene.add(ring);
    this.ring = ring;

    // Goldstaub in der Luft
    this.dust = makeDust();
    scene.add(this.dust);

    // Physik
    const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -38, 0) });
    world.broadphase = new CANNON.SAPBroadphase(world);
    world.allowSleep = false;
    this.world = world;
    this.diceMaterial = new CANNON.Material('dice');
    this.tableMaterial = new CANNON.Material('table');
    world.addContactMaterial(new CANNON.ContactMaterial(this.diceMaterial, this.tableMaterial, { friction: 0.55, restitution: 0.32 }));
    world.addContactMaterial(new CANNON.ContactMaterial(this.diceMaterial, this.diceMaterial, { friction: 0.35, restitution: 0.45 }));

    const ground = new CANNON.Body({ type: CANNON.Body.STATIC, shape: new CANNON.Plane(), material: this.tableMaterial });
    ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    world.addBody(ground);
    this.walls = [];
    this.arena = { w: 3.6, d: 2.4 };

    // Würfel-Geometrie & -Materialien (geteilt)
    this.bodyGeo = new RoundedBoxGeometry(SIZE, SIZE, SIZE, 5, 0.13);
    this.bodyMat = new THREE.MeshStandardMaterial({ color: 0xf6ecd6, roughness: 0.38, metalness: 0.02 });
    this.pipGeo = new THREE.SphereGeometry(0.083, 14, 10);
    this.pipMat = new THREE.MeshStandardMaterial({ color: 0x1b1740, roughness: 0.45, metalness: 0.1 });
    this.pipMatGold = new THREE.MeshStandardMaterial({ color: 0xe9a93a, roughness: 0.35, metalness: 0.55, emissive: 0x3a2400, emissiveIntensity: 0.6 });

    for (let i = 0; i < 2; i++) this.dice.push(this.createDie(i));

    this._ro = new ResizeObserver(() => this.resize());
    this._ro.observe(container);
    this.resize();
    this.restDice([1 + Math.floor(Math.random() * 6), 1 + Math.floor(Math.random() * 6)]);

    this.baseFov = this.camera.fov;
    this.slowmo = { done: true, until: 0 };
    this._clock = new THREE.Clock();
    this._frame = this._frame.bind(this);
    this.renderer.setAnimationLoop(this._frame);
  }

  createDie(index) {
    const group = new THREE.Group();
    const body = new THREE.Mesh(this.bodyGeo, this.bodyMat);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);
    for (const face of FACES) {
      const n = face.normal;
      // zwei Tangenten zur Fläche
      const tU = Math.abs(n.y) > 0.5 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3().crossVectors(n, UP).normalize();
      const tV = new THREE.Vector3().crossVectors(n, tU).normalize();
      const mat = face.value === 1 ? this.pipMatGold : this.pipMat;
      for (const [u, v] of PIPS[face.value]) {
        const pip = new THREE.Mesh(this.pipGeo, mat);
        const offset = face.value === 1 ? 0 : 0.27;
        pip.position.copy(n).multiplyScalar(HALF - 0.055)
          .addScaledVector(tU, u * offset)
          .addScaledVector(tV, v * offset);
        pip.scale.set(1, 1, 1);
        if (face.value === 1) pip.scale.setScalar(1.35);
        group.add(pip);
      }
    }
    this.scene.add(group);

    const shape = new CANNON.Box(new CANNON.Vec3(HALF * 0.97, HALF * 0.97, HALF * 0.97));
    const phys = new CANNON.Body({ mass: 1, shape, material: this.diceMaterial, linearDamping: 0.12, angularDamping: 0.22 });
    phys.position.set(index * 1.6 - 0.8, HALF, 0);
    phys.addEventListener('collide', (e) => {
      const v = Math.abs(e.contact.getImpactVelocityAlongNormal());
      const now = performance.now();
      if (now - this.rollStart < 120) return; // Startkontakte beim Einsortieren ignorieren
      if (v > 1.2 && now - this.lastCollideAt > 45) {
        this.lastCollideAt = now;
        this.onCollide(Math.min(1, v / 14));
      }
    });
    this.world.addBody(phys);
    return { group, phys, index };
  }

  setArena(w, d) {
    this.arena = { w, d };
    // Ring umschließt die Arena (Texturradius 236/256 der Fläche)
    const k = 256 / 236;
    this.ring.scale.set((w + 0.25) * k, (d + 0.25) * k, 1);
    for (const b of this.walls) this.world.removeBody(b);
    this.walls = [];
    const mk = (x, z, euler) => {
      const b = new CANNON.Body({ type: CANNON.Body.STATIC, shape: new CANNON.Plane(), material: this.tableMaterial });
      b.position.set(x, 0, z);
      b.quaternion.setFromEuler(euler[0], euler[1], euler[2]);
      this.world.addBody(b);
      this.walls.push(b);
    };
    mk(w, 0, [0, -Math.PI / 2, 0]);
    mk(-w, 0, [0, Math.PI / 2, 0]);
    mk(0, d, [0, Math.PI, 0]);
    mk(0, -d, [0, 0, 0]);
  }

  resize() {
    const el = this.container;
    const width = Math.max(1, el.clientWidth);
    const height = Math.max(1, el.clientHeight);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    const portrait = this.camera.aspect < 1;
    const w = portrait ? 2.3 : 3.4;
    const d = portrait ? 3.2 : 2.2;
    this.reserveTop = portrait ? 0.34 : 0.2;
    if (this.arena.w !== w || this.walls.length === 0) this.setArena(w, d);
    this.fitCamera();
    this.render();
  }

  // Kamera so weit zurückziehen, dass die ganze Arena sichtbar ist.
  fitCamera() {
    const { w, d } = this.arena;
    const corners = [];
    for (const x of [-w, w]) for (const z of [-d, d]) for (const y of [0, 1.1]) corners.push(new THREE.Vector3(x, y, z));
    const rx = (w + 0.25) * (256 / 236) * 1.03;
    const rz = (d + 0.25) * (256 / 236) * 1.03;
    corners.push(new THREE.Vector3(rx, 0, 0), new THREE.Vector3(-rx, 0, 0), new THREE.Vector3(0, 0, rz), new THREE.Vector3(0, 0, -rz));
    const tmp = new THREE.Vector3();
    let lo = 4, hi = 40;
    for (let i = 0; i < 18; i++) {
      const mid = (lo + hi) / 2;
      this.camera.position.copy(this.cameraTarget).addScaledVector(this.cameraDir, mid);
      this.camera.lookAt(this.cameraTarget);
      this.camera.updateMatrixWorld();
      let fits = true;
      const topLimit = 1 - 2 * this.reserveTop - 0.04;
      for (const c of corners) {
        tmp.copy(c).project(this.camera);
        if (Math.abs(tmp.x) > 0.95 || tmp.y < -0.84 || tmp.y > topLimit) { fits = false; break; }
      }
      if (fits) hi = mid; else lo = mid;
    }
    this.cameraDistance = hi;
    this.camera.position.copy(this.cameraTarget).addScaledVector(this.cameraDir, hi);
    this.camera.lookAt(this.cameraTarget);
  }

  /** Würfel ruhend mit vorgegebenen Augen hinlegen (Startzustand). */
  restDice(values) {
    const { w, d } = this.arena;
    this.dice.forEach((die, i) => {
      const q = quaternionForFaceUp(values[i] || 1, (i * 0.9 + 0.4));
      die.phys.velocity.setZero();
      die.phys.angularVelocity.setZero();
      die.phys.position.set(-w * 0.35 + i * 1.5, HALF + 0.001, d * 0.25 - i * 0.5);
      die.phys.quaternion.set(q.x, q.y, q.z, q.w);
      die.group.position.copy(die.phys.position);
      die.group.quaternion.copy(q);
    });
    this.render();
  }

  /** Wirft die Würfel und liefert die Augenzahlen, sobald sie liegen. */
  roll() {
    if (this.rolling) return this.rollPromise;
    this.rolling = true;
    this.snapping = [];
    const { w, d } = this.arena;
    const portrait = w < d;
    this.dice.forEach((die, i) => {
      const p = die.phys;
      p.wakeUp();
      const lane = (Math.random() - 0.5) * (portrait ? w : d) * 0.9;
      if (portrait) {
        p.position.set(lane + (i - 0.5) * 1.3, 1.6 + i * 1.8, -d + 1.3);
        p.velocity.set((Math.random() - 0.5) * 3, 1.5 + Math.random() * 2, 8 + Math.random() * 3);
      } else {
        p.position.set(-w + 1.3, 1.6 + i * 1.8, lane + (i - 0.5) * 1.3);
        p.velocity.set(8 + Math.random() * 3, 1.5 + Math.random() * 2, (Math.random() - 0.5) * 3);
      }
      p.angularVelocity.set(rnd(9, 18) * sign(), rnd(9, 18) * sign(), rnd(9, 18) * sign());
      p.quaternion.setFromEuler(Math.random() * 6.28, Math.random() * 6.28, Math.random() * 6.28);
    });
    this.rollStart = performance.now();
    this.simTime = 0;
    this.settledFrames = 0;
    this.slowmo = { done: false, until: 0 };
    this.baseFov = this.camera.fov;
    this.rollPromise = new Promise((resolve) => { this._resolveRoll = resolve; });
    return this.rollPromise;
  }

  topFace(die) {
    const q = die.group.quaternion;
    let best = FACES[0], bestDot = -2;
    const tmp = new THREE.Vector3();
    for (const f of FACES) {
      tmp.copy(f.normal).applyQuaternion(q);
      const dot = tmp.dot(UP);
      if (dot > bestDot) { bestDot = dot; best = f; }
    }
    return { value: best.value, normal: best.normal, dot: bestDot };
  }

  _finishRoll(forced) {
    // Nachjustieren: den Würfel exakt auf die oberste Fläche legen (falls er schief hängt).
    const values = [];
    for (const die of this.dice) {
      const top = this.topFace(die);
      values.push(top.value);
      const cur = die.group.quaternion.clone();
      const worldN = top.normal.clone().applyQuaternion(cur);
      const fix = new THREE.Quaternion().setFromUnitVectors(worldN, UP);
      const target = fix.multiply(cur);
      die.phys.velocity.setZero();
      die.phys.angularVelocity.setZero();
      die.phys.quaternion.set(target.x, target.y, target.z, target.w);
      die.phys.position.y = HALF;
      this.snapping.push({ die, from: cur, to: target, start: performance.now(), duration: forced ? 420 : 160 });
    }
    this.rolling = false;
    this.camera.fov = this.baseFov;
    this.camera.updateProjectionMatrix();
    const resolve = this._resolveRoll;
    this._resolveRoll = null;
    setTimeout(() => resolve && resolve(values), forced ? 420 : 160);
  }

  _frame() {
    const dt = Math.min(this._clock.getDelta(), 0.05);
    this.t += dt;
    if (this.rolling) {
      const now = performance.now();
      let scale = 1;
      if (this.slowmo.until > now) scale = 0.35;
      this.world.step(1 / 120, dt * scale, 8);
      this.simTime += dt * scale;
      let calm = true;
      let maxSpeed = 0;
      for (const die of this.dice) {
        maxSpeed = Math.max(maxSpeed, die.phys.velocity.length());
        const p = die.phys;
        die.group.position.copy(p.position);
        die.group.quaternion.copy(p.quaternion);
        if (p.velocity.length() > 0.08 || p.angularVelocity.length() > 0.12) calm = false;
        // Sicherheitsnetz: aus der Arena gefallen?
        if (p.position.y < -2) { p.position.set(0, 3, 0); p.velocity.set(0, 0, 0); }
      }
      const elapsed = now - this.rollStart;
      const simMs = this.simTime * 1000;
      // Einmal kurz Zeitlupe, wenn die Würfel fast liegen – der dramatische Moment.
      if (!this.slowmo.done && !this.reducedMotion && simMs > 900 && maxSpeed < 2.2 && !calm) {
        this.slowmo = { done: true, until: now + 420 };
      }
      const wantFov = this.slowmo.until > now ? this.baseFov - 4 : this.baseFov;
      if (Math.abs(this.camera.fov - wantFov) > 0.01) {
        this.camera.fov += (wantFov - this.camera.fov) * 0.12;
        this.camera.updateProjectionMatrix();
      }
      if (calm && simMs > 500) this.settledFrames++; else this.settledFrames = 0;
      if (this.settledFrames > 14) this._finishRoll(false);
      else if (simMs > 6500 || elapsed > 9000) this._finishRoll(true);
    }
    // sanftes Einrasten nach dem Wurf
    if (this.snapping.length) {
      const now = performance.now();
      this.snapping = this.snapping.filter((s) => {
        const k = Math.min(1, (now - s.start) / s.duration);
        const e = 1 - Math.pow(1 - k, 3);
        s.die.group.quaternion.slerpQuaternions(s.from, s.to, e);
        s.die.group.position.y = HALF;
        return k < 1;
      });
    }
    // Goldstaub treibt langsam nach oben
    if (!this.reducedMotion) {
      const pos = this.dust.geometry.attributes.position;
      const arr = pos.array;
      for (let i = 0; i < arr.length; i += 3) {
        arr[i + 1] += dt * (0.12 + (i % 7) * 0.02);
        arr[i] += Math.sin(this.t * 0.6 + i) * dt * 0.05;
        if (arr[i + 1] > 5.5) arr[i + 1] = 0;
      }
      pos.needsUpdate = true;
    }
    // leichte Kamerabewegung, damit die Bühne lebt
    if (!this.reducedMotion) {
      const a = Math.sin(this.t * 0.35) * 0.045;
      const b = Math.cos(this.t * 0.27) * 0.02;
      const dir = this.cameraDir.clone().applyAxisAngle(UP, a);
      this.camera.position.copy(this.cameraTarget).addScaledVector(dir, this.cameraDistance + b * 2);
      this.camera.lookAt(this.cameraTarget);
    }
    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.renderer.setAnimationLoop(null);
    this._ro.disconnect();
    this.renderer.dispose();
  }
}

function makeDust() {
  const n = 160;
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 11;
    pos[i * 3 + 1] = Math.random() * 5.5;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 9;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const c = document.createElement('canvas');
  c.width = c.height = 32;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, 'rgba(255,230,160,1)');
  grad.addColorStop(0.4, 'rgba(255,220,140,0.5)');
  grad.addColorStop(1, 'rgba(255,220,140,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 32, 32);
  const tex = new THREE.CanvasTexture(c);
  const mat = new THREE.PointsMaterial({
    size: 0.1, map: tex, color: 0xffe08a, transparent: true, opacity: 0.6,
    depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
  });
  return new THREE.Points(geo, mat);
}

function rnd(a, b) { return a + Math.random() * (b - a); }
function sign() { return Math.random() < 0.5 ? -1 : 1; }

/** Quaternion, bei der die Fläche mit dem gegebenen Wert nach oben zeigt (+ Drehung um die Hochachse). */
function quaternionForFaceUp(value, yaw = 0) {
  const face = FACES.find((f) => f.value === value) || FACES[0];
  const q = new THREE.Quaternion().setFromUnitVectors(face.normal, UP);
  const spin = new THREE.Quaternion().setFromAxisAngle(UP, yaw);
  return spin.multiply(q);
}
