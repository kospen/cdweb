"use client";

import { useEffect, useRef } from "react";

/**
 * HeroField — the fragment field of the hero, drawn as real objects on a canvas.
 *
 * The artwork ships as a "clean plate" with the painted fragments removed
 * (public/images/hero-field-plate-*.webp). Everything in the fragment field is
 * rendered here instead, which is what allows it to actually move: nothing
 * identical sits underneath, so there is no ghosting to hide.
 *
 * Behaviour
 *   - every triangle has a depth that drives its size, weight and drift (parallax)
 *   - constant, very small drift and rotation, each on its own period
 *   - at intervals one small cluster fractures; its shards separate and settle back
 *   - particles leave the edges of that cluster and travel to the core
 *   - arrivals charge the core, which answers and then decays
 *
 * The field is deterministic (seeded), pauses when off-screen or on a hidden tab,
 * and renders a single static frame when the visitor prefers reduced motion.
 */

const ART_W = 1672;
const ART_H = 941;
const CORE = { x: 835, y: 446 };

/** the four structure routes leaving the core, tracing the painted network */
const ROUTES = [
  "M835 446 C900 446 930 446 976 446 H1036 L1063 476 H1160 L1194 488 H1312",
  "M835 446 C900 434 925 414 980 405 H1035 L1063 385 H1160 L1220 311 H1311 V218 H1458",
  "M835 446 C905 446 940 446 1008 446 H1108 L1133 421 H1220 L1262 366 H1311 H1392 L1428 403 H1461 L1498 367 H1548 V294 H1636",
  "M835 446 C900 456 940 475 1007 488 H1134 V541 H1312 V560 H1343 V581 H1452 H1598",
] as const;

/** waypoints on those routes that wake as a pulse reaches them */
const NODES: [number, number][] = [
  [976, 446], [1036, 446], [1063, 476], [1063, 385],
  [1134, 421], [1160, 341], [1194, 488], [1220, 311],
  [1262, 366], [1312, 560], [1311, 218], [1392, 366],
  [1343, 581], [1452, 581], [1460, 217], [1548, 294],
  [1598, 581], [1636, 294],
];

type Vec = { x: number; y: number };

type Triangle = {
  x: number;
  y: number;
  depth: number;
  verts: [Vec, Vec, Vec];
  rot: number;
  driftX: number;
  driftY: number;
  perX: number;
  perY: number;
  phaseX: number;
  phaseY: number;
  perX2: number;
  phaseX2: number;
  rotAmp: number;
  rotPer: number;
  rotPhase: number;
  fill: number;
  edge: number;
  weight: number;
  litEdge: number;
  grad: CanvasGradient | null;
  /** fracture state */
  fracStart: number;
  fracDur: number;
  fracturing: boolean;
  shardSeed: [number, number, number];
};

type Particle = {
  sx: number;
  sy: number;
  cx: number;
  cy: number;
  start: number;
  dur: number;
  radius: number;
  cyan: boolean;
  landed: boolean;
};

type Ripple = { x: number; y: number; start: number };

/** small deterministic PRNG so the field is identical on every load and build */
function makeRandom(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function HeroField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const isMobileLayer = className.includes("mobile");
    const rand = makeRandom(isMobileLayer ? 6205221 : 20260826);

    /* ---------------------------------------------------------------- field */

    const count = isMobileLayer ? 62 : window.innerWidth < 1280 ? 88 : 112;
    const triangles: Triangle[] = [];

    for (let i = 0; i < count; i += 1) {
      // a stream: wide and large at the left, narrowing and shrinking toward the core
      const along = Math.pow(rand(), 0.62);
      const x = 6 + along * 762;
      const centre = 474 + (1 - along) * 34 - along * 10;
      const spread = Math.pow(1 - along, 1.25) * 252 + 24;
      const bell = (rand() + rand() + rand() - 1.5) / 1.5;
      const y = centre + Math.max(-1, Math.min(1, bell * 2.35)) * spread;

      const depth = rand();
      // a few foreground shards read solid, the way the painted field does
      const prominence = rand() < 0.16 ? 1.75 : 1;
      const size = (33 - along * 24) * (0.30 + Math.pow(depth, 1.35) * 0.80);

      const verts = [0, 1, 2].map((k) => {
        const angle = k * 2.0944 + (rand() - 0.5) * 1.04;
        const radius = size * (0.7 + rand() * 0.66);
        return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
      }) as [Vec, Vec, Vec];

      triangles.push({
        x,
        y,
        depth,
        verts,
        rot: rand() * Math.PI * 2,
        driftX: (3 + rand() * 7) * (0.35 + depth * 0.65),
        driftY: (2 + rand() * 5) * (0.35 + depth * 0.65),
        perX: 9 + rand() * 17,
        perY: 11 + rand() * 13,
        phaseX: rand() * Math.PI * 2,
        phaseY: rand() * Math.PI * 2,
        perX2: 23 + rand() * 19,
        phaseX2: rand() * Math.PI * 2,
        rotAmp: 0.004 + rand() * 0.017,
        rotPer: 14 + rand() * 14,
        rotPhase: rand() * Math.PI * 2,
        fill: (0.042 + Math.pow(depth, 1.2) * 0.105) * prominence,
        edge: (0.108 + depth * 0.205) * (1 + (prominence - 1) * 0.42),
        weight: 0.5 + depth * 0.7,
        litEdge: Math.floor(rand() * 3),
        grad: null,
        fracStart: 0,
        fracDur: 0,
        fracturing: false,
        shardSeed: [rand() * 6.283, rand() * 6.283, rand() * 6.283],
      });
    }

    // a finer population: the dust the field carries toward the core
    const dustCount = isMobileLayer ? 40 : 90;
    for (let i = 0; i < dustCount; i += 1) {
      const along = 0.18 + Math.pow(rand(), 0.55) * 0.82;
      const x = 6 + along * 790;
      const centre = 470 + (1 - along) * 26;
      const spread = Math.pow(1 - along, 1.4) * 170 + 12;
      const bell = (rand() + rand() + rand() - 1.5) / 1.5;
      const y = centre + Math.max(-1, Math.min(1, bell * 2.2)) * spread;
      const depth = rand() * 0.5;
      const size = 2.2 + rand() * 5.4;

      const verts = [0, 1, 2].map((k) => {
        const angle = k * 2.0944 + (rand() - 0.5) * 1.1;
        const radius = size * (0.7 + rand() * 0.7);
        return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
      }) as [Vec, Vec, Vec];

      triangles.push({
        x, y, depth, verts,
        rot: rand() * Math.PI * 2,
        driftX: (2 + rand() * 5) * 0.5,
        driftY: (1.5 + rand() * 3.5) * 0.5,
        perX: 8 + rand() * 15,
        perY: 10 + rand() * 12,
        phaseX: rand() * Math.PI * 2,
        phaseY: rand() * Math.PI * 2,
        perX2: 21 + rand() * 17,
        phaseX2: rand() * Math.PI * 2,
        rotAmp: 0.006 + rand() * 0.03,
        rotPer: 11 + rand() * 12,
        rotPhase: rand() * Math.PI * 2,
        fill: 0.05 + rand() * 0.09,
        edge: 0.13 + rand() * 0.22,
        weight: 0.45,
        litEdge: Math.floor(rand() * 3),
        grad: null,
        fracStart: 0,
        fracDur: 0,
        fracturing: false,
        shardSeed: [rand() * 6.283, rand() * 6.283, rand() * 6.283],
      });
    }

    // draw far triangles first so the near ones sit in front
    triangles.sort((a, b) => a.depth - b.depth);

    // facet lighting: one cached gradient per triangle, in art space
    for (const t of triangles) {
      const xs = t.verts.map((v) => v.x);
      const ys = t.verts.map((v) => v.y);
      const g = ctx.createLinearGradient(
        t.x + Math.min(...xs),
        t.y + Math.min(...ys),
        t.x + Math.max(...xs),
        t.y + Math.max(...ys),
      );
      g.addColorStop(0, `rgba(226,238,242,${(t.fill * 1.5).toFixed(4)})`);
      g.addColorStop(1, `rgba(196,214,222,${(t.fill * 0.45).toFixed(4)})`);
      t.grad = g;
    }

    const particles: Particle[] = [];
    const ripples: Ripple[] = [];
    let charge = 0;

    /* ------------------------------------------- routes and structure nodes */

    // Sample each route once into a polyline, so a pulse can be drawn as a
    // comet along it rather than faked with a dash pattern.
    const routes: { pts: Vec[]; fire: number }[] = ROUTES.map((d) => {
      const el = document.createElementNS("http://www.w3.org/2000/svg", "path");
      el.setAttribute("d", d);
      const total = el.getTotalLength();
      const steps = Math.max(60, Math.min(260, Math.round(total / 7)));
      const pts: Vec[] = [];
      for (let i = 0; i <= steps; i += 1) {
        const p = el.getPointAtLength((total * i) / steps);
        pts.push({ x: p.x, y: p.y });
      }
      return { pts, fire: -99 };
    });

    // Each node latches onto the route that passes closest to it, so it lights
    // exactly when the pulse reaches it.
    const nodes = NODES.map(([nx, ny], i) => {
      let route = 0;
      let at = 0;
      let best = Infinity;
      routes.forEach((r, ri) => {
        r.pts.forEach((p, pi) => {
          const dd = (p.x - nx) ** 2 + (p.y - ny) ** 2;
          if (dd < best) {
            best = dd;
            route = ri;
            at = pi / (r.pts.length - 1);
          }
        });
      });
      return { x: nx, y: ny, route, at, lit: 0, square: i % 3 === 0, big: i % 4 === 0 };
    });

    const PULSE = 1.75; // seconds for a pulse to run a route
    let lastSurge = -99;

    function fireRoutes(now: number) {
      routes.forEach((r, i) => {
        r.fire = now + i * 0.13;
      });
    }

    /* ------------------------------------------------------------ fracture */

    function emit(t: Triangle, verts: Vec[], n: number, at: number) {
      for (let i = 0; i < n; i += 1) {
        const e = Math.floor(rand() * 3);
        const a = verts[e];
        const b = verts[(e + 1) % 3];
        const f = rand();
        const sx = t.x + a.x + (b.x - a.x) * f;
        const sy = t.y + a.y + (b.y - a.y) * f;
        const dx = CORE.x - sx;
        const dy = CORE.y - sy;
        const len = Math.hypot(dx, dy) || 1;
        const bow = (rand() - 0.5) * 2 * (46 + len * 0.16);
        particles.push({
          sx,
          sy,
          cx: (sx + CORE.x) / 2 - (dy / len) * bow,
          cy: (sy + CORE.y) / 2 + (dx / len) * bow,
          start: at + rand() * 0.4,
          dur: 1.5 + rand() * 1.1,
          radius: 1 + rand() * 1.3,
          cyan: rand() < 0.3,
          landed: false,
        });
      }
    }

    function fracture(now: number) {
      let seed: Triangle | null = null;
      let best = -1;
      for (const t of triangles) {
        if (t.fracturing) continue;
        const score = rand() * (0.35 + t.depth);
        if (score > best) {
          best = score;
          seed = t;
        }
      }
      if (!seed) return;

      const group: Triangle[] = [seed];
      const neighbours = triangles
        .filter((t) => t !== seed && !t.fracturing)
        .map((t) => ({ t, d: Math.hypot(t.x - seed!.x, t.y - seed!.y) }))
        .sort((a, b) => a.d - b.d);
      const extra = 1 + Math.floor(rand() * 3);
      for (let i = 0; i < extra && i < neighbours.length; i += 1) {
        if (neighbours[i].d < 190) group.push(neighbours[i].t);
      }

      group.forEach((t, i) => {
        t.fracturing = true;
        t.fracStart = now + i * 0.09;
        t.fracDur = 1.9 + rand() * 0.7;
        const angle = t.rot;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const rotated = t.verts.map((v) => ({
          x: v.x * cos - v.y * sin,
          y: v.x * sin + v.y * cos,
        }));
        emit(t, rotated, 4 + Math.floor(rand() * 5), t.fracStart + 0.12);
      });
      ripples.push({ x: seed.x, y: seed.y, start: now + 0.1 });
    }

    /* ------------------------------------------------------------- pointer */

    let pointerX = 0;
    let pointerY = 0;
    let parallaxX = 0;
    let parallaxY = 0;

    function onPointer(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    }
    if (!coarse && !reduced) window.addEventListener("pointermove", onPointer, { passive: true });

    /* ---------------------------------------------------------------- draw */

    function shape(verts: Vec[], ox: number, oy: number, cx: number, cy: number) {
      ctx!.beginPath();
      for (let k = 0; k < 3; k += 1) {
        const X = cx + ox + verts[k].x;
        const Y = cy + oy + verts[k].y;
        if (k === 0) ctx!.moveTo(X, Y);
        else ctx!.lineTo(X, Y);
      }
      ctx!.closePath();
    }

    function draw(now: number) {
      const c = ctx!;
      c.clearRect(0, 0, ART_W, ART_H);

      parallaxX += (pointerX * 5 - parallaxX) * 0.045;
      parallaxY += (pointerY * 3.4 - parallaxY) * 0.045;

      for (const t of triangles) {
        // two incommensurate periods per axis so the field never visibly repeats
        const ox =
          Math.sin((now / t.perX) * 6.283 + t.phaseX) * t.driftX +
          Math.sin((now / t.perX2) * 6.283 + t.phaseX2) * t.driftX * 0.35 +
          parallaxX * (0.35 + t.depth);
        const oy =
          Math.cos((now / t.perY) * 6.283 + t.phaseY) * t.driftY +
          parallaxY * (0.35 + t.depth);
        const angle = t.rot + Math.sin((now / t.rotPer) * 6.283 + t.rotPhase) * t.rotAmp;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const verts = t.verts.map((v) => ({
          x: v.x * cos - v.y * sin,
          y: v.x * sin + v.y * cos,
        }));

        let frac = 0;
        if (t.fracturing) {
          const e = (now - t.fracStart) / t.fracDur;
          if (e >= 1) t.fracturing = false;
          else if (e > 0) frac = e < 0.18 ? e / 0.18 : Math.pow(1 - (e - 0.18) / 0.82, 1.6);
        }

        if (frac > 0) {
          const sep = frac * (3 + t.depth * 6);
          for (let k = 0; k < 3; k += 1) {
            const a = verts[k];
            const b = verts[(k + 1) % 3];
            const mx = (a.x + b.x) / 3;
            const my = (a.y + b.y) / 3;
            const m = Math.hypot(mx, my) || 1;
            const spin = frac * 0.1 * Math.sin(t.shardSeed[k]);
            const sc = Math.cos(spin);
            const ss = Math.sin(spin);
            const shard = [a, b, { x: 0, y: 0 }].map((v) => ({
              x: v.x * sc - v.y * ss,
              y: v.x * ss + v.y * sc,
            }));
            shape(shard, ox + (mx / m) * sep, oy + (my / m) * sep, t.x, t.y);
            c.fillStyle = `rgba(224,236,240,${t.fill + frac * 0.03})`;
            c.fill();
            c.strokeStyle = `rgba(206,231,238,${Math.min(0.6, t.edge + frac * 0.21)})`;
            c.lineWidth = t.weight + frac * 0.32;
            c.stroke();
          }
        } else {
          shape(verts, ox, oy, t.x, t.y);
          c.fillStyle = t.grad!;
          c.fill();
          c.strokeStyle = `rgba(212,232,238,${t.edge})`;
          c.lineWidth = t.weight;
          c.stroke();

          // one brighter edge, the way the painted facets catch light
          const a = verts[t.litEdge];
          const b = verts[(t.litEdge + 1) % 3];
          c.beginPath();
          c.moveTo(t.x + ox + a.x, t.y + oy + a.y);
          c.lineTo(t.x + ox + b.x, t.y + oy + b.y);
          c.strokeStyle = `rgba(230,242,247,${t.edge * 1.22})`;
          c.lineWidth = t.weight * 0.8;
          c.stroke();
        }
      }

      c.globalCompositeOperation = "lighter";

      // ripple at the fracture site
      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        const e = (now - ripples[i].start) / 1.5;
        if (e < 0) continue;
        if (e >= 1) {
          ripples.splice(i, 1);
          continue;
        }
        const r = 8 + e * 74;
        c.beginPath();
        c.arc(ripples[i].x, ripples[i].y, r, 0, 6.283);
        c.strokeStyle = `rgba(120,214,228,${(1 - e) * 0.16})`;
        c.lineWidth = 1;
        c.stroke();
      }

      // particles, with a short trail
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        const e = (now - p.start) / p.dur;
        if (e < 0) continue;
        if (e >= 1) {
          if (!p.landed) {
            p.landed = true;
            charge = Math.min(1, charge + 0.11);
          }
          particles.splice(i, 1);
          continue;
        }
        for (let s = 0; s < 3; s += 1) {
          const u = Math.max(0, easeInOut(e) - s * 0.03);
          const iu = 1 - u;
          const X = iu * iu * p.sx + 2 * iu * u * p.cx + u * u * CORE.x;
          const Y = iu * iu * p.sy + 2 * iu * u * p.cy + u * u * CORE.y;
          const fade = e < 0.14 ? e / 0.14 : e > 0.78 ? (1 - e) / 0.22 : 1;
          const alpha = fade * 0.9 * (1 - s * 0.33);
          c.beginPath();
          c.arc(X, Y, p.radius * (1 - s * 0.2), 0, 6.283);
          c.fillStyle = p.cyan
            ? `rgba(110,232,242,${alpha})`
            : `rgba(214,232,236,${alpha * 0.8})`;
          c.fill();
          if (p.cyan && s === 0) {
            c.beginPath();
            c.arc(X, Y, p.radius * 3.4, 0, 6.283);
            c.fillStyle = `rgba(86,215,229,${alpha * 0.14})`;
            c.fill();
          }
        }
      }

      // what the core has taken in leaves along the structure routes
      if (charge > 0.42 && now - lastSurge > 3.2) {
        fireRoutes(now);
        lastSurge = now;
      }

      for (let ri = 0; ri < routes.length; ri += 1) {
        const r = routes[ri];
        const e = (now - r.fire) / PULSE;
        if (e < 0 || e >= 1) continue;
        const head = easeInOut(e);
        const last = r.pts.length - 1;
        const tail = 0.13;
        const envelope = e < 0.12 ? e / 0.12 : e > 0.82 ? (1 - e) / 0.18 : 1;

        // a comet: bright head, fading tail drawn as short segments
        const segs = 26;
        for (let s = 0; s < segs; s += 1) {
          const a0 = head - (tail * s) / segs;
          const a1 = head - (tail * (s + 1)) / segs;
          if (a1 < 0) break;
          const i0 = Math.round(a0 * last);
          const i1 = Math.round(a1 * last);
          if (i0 === i1) continue;
          const fade = (1 - s / segs) ** 1.7 * envelope;
          c.beginPath();
          c.moveTo(r.pts[i1].x, r.pts[i1].y);
          for (let i = i1 + 1; i <= i0; i += 1) c.lineTo(r.pts[i].x, r.pts[i].y);
          c.strokeStyle = `rgba(38,196,216,${fade * 0.2})`;
          c.lineWidth = 6.5;
          c.stroke();
          c.strokeStyle = `rgba(150,242,249,${fade * 0.9})`;
          c.lineWidth = 1.7;
          c.stroke();
        }

        // wake the waypoints the head has just passed
        for (const n of nodes) {
          if (n.route !== ri) continue;
          if (head >= n.at && head - n.at < 0.06) n.lit = 1;
        }
      }

      for (const n of nodes) {
        if (n.lit <= 0.004) continue;
        const a = n.lit;
        c.beginPath();
        c.arc(n.x, n.y, n.big ? 15 : 11, 0, 6.283);
        c.fillStyle = `rgba(67,215,227,${a * 0.16})`;
        c.fill();
        c.beginPath();
        if (n.square) c.rect(n.x - 4, n.y - 4, 8, 8);
        else c.arc(n.x, n.y, 3.5, 0, 6.283);
        c.fillStyle = `rgba(84,223,233,${a * 0.5})`;
        c.fill();
        c.strokeStyle = `rgba(202,250,252,${a * 0.95})`;
        c.lineWidth = 1;
        c.stroke();
        n.lit *= 0.982;
      }

      // the core answers what reaches it
      const breathe = 0.5 + 0.5 * Math.sin((now / 3.4) * 6.283);
      const glow = 34 + charge * 46;
      const g = c.createRadialGradient(CORE.x, CORE.y, 0, CORE.x, CORE.y, glow);
      g.addColorStop(0, `rgba(120,235,245,${0.1 + charge * 0.42 + breathe * 0.05})`);
      g.addColorStop(1, "rgba(86,215,229,0)");
      c.fillStyle = g;
      c.beginPath();
      c.arc(CORE.x, CORE.y, glow, 0, 6.283);
      c.fill();

      c.globalCompositeOperation = "source-over";
      c.beginPath();
      c.arc(CORE.x, CORE.y, 15 + breathe * 2.2 + charge * 4, 0, 6.283);
      c.strokeStyle = `rgba(130,235,244,${0.32 + charge * 0.5})`;
      c.lineWidth = 1.1;
      c.stroke();

      charge *= 0.972;
    }

    /* ---------------------------------------------------------------- loop */

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      canvas!.width = Math.round(rect.width * dpr);
      canvas!.height = Math.round(rect.height * dpr);
      ctx!.setTransform(canvas!.width / ART_W, 0, 0, canvas!.height / ART_H, 0, 0);
    }
    resize();

    const observer = new ResizeObserver(() => {
      resize();
      if (reduced) draw(1.4);
    });
    observer.observe(canvas);

    if (reduced) {
      draw(1.4);
      return () => {
        observer.disconnect();
        window.removeEventListener("pointermove", onPointer);
      };
    }

    let raf = 0;
    let clock = 0;
    let last: number | null = null;
    let nextFracture = 2.4;
    let visible = true;

    function frame(ts: number) {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) {
        last = null;
        return;
      }
      if (last === null) last = ts;
      const dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;
      clock += dt;
      if (clock > nextFracture) {
        fracture(clock);
        nextFracture = clock + 3.5 + rand() * 3;
      }
      draw(clock);
    }
    raf = requestAnimationFrame(frame);

    // stop the loop entirely once the hero is scrolled away
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "120px" },
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, [className]);

  return (
    <canvas
      ref={canvasRef}
      className={`hero-motion-layer hero-field ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
