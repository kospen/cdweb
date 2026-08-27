"use client";

import { useEffect, useRef } from "react";

const ART_WIDTH = 1672;
const ART_HEIGHT = 941;
const CYCLE_MS = 13800;
const CORE = { x: 835, y: 446 };

type Point = { x: number; y: number };

type MatterParticle = {
  source: Point;
  controlIn: Point;
  controlOut: Point;
  target: Point;
  delay: number;
  size: number;
  drift: number;
  seed: number;
  cyan: boolean;
};

const fragmentShapes: Point[][] = [
  [{ x: 8, y: 237 }, { x: 82, y: 274 }, { x: 48, y: 329 }],
  [{ x: 3, y: 333 }, { x: 66, y: 356 }, { x: 12, y: 401 }],
  [{ x: 18, y: 442 }, { x: 118, y: 426 }, { x: 67, y: 515 }],
  [{ x: 89, y: 503 }, { x: 159, y: 548 }, { x: 108, y: 594 }],
  [{ x: 183, y: 395 }, { x: 254, y: 437 }, { x: 204, y: 477 }],
  [{ x: 259, y: 474 }, { x: 336, y: 521 }, { x: 286, y: 565 }],
  [{ x: 327, y: 350 }, { x: 413, y: 387 }, { x: 367, y: 433 }],
  [{ x: 386, y: 493 }, { x: 470, y: 527 }, { x: 420, y: 575 }],
  [{ x: 463, y: 337 }, { x: 537, y: 373 }, { x: 494, y: 420 }],
  [{ x: 532, y: 430 }, { x: 612, y: 466 }, { x: 567, y: 512 }],
  [{ x: 602, y: 369 }, { x: 682, y: 412 }, { x: 636, y: 459 }],
  [{ x: 133, y: 643 }, { x: 205, y: 702 }, { x: 154, y: 744 }],
  [{ x: 274, y: 610 }, { x: 341, y: 662 }, { x: 294, y: 711 }],
];

const networkNodes: Point[] = [
  { x: 917, y: 434 }, { x: 959, y: 405 }, { x: 1007, y: 471 },
  { x: 1041, y: 412 }, { x: 1064, y: 345 }, { x: 1117, y: 389 },
  { x: 1134, y: 541 }, { x: 1160, y: 339 }, { x: 1192, y: 489 },
  { x: 1220, y: 276 }, { x: 1263, y: 432 }, { x: 1311, y: 366 },
  { x: 1312, y: 560 }, { x: 1343, y: 489 }, { x: 1392, y: 294 },
  { x: 1428, y: 404 }, { x: 1452, y: 581 }, { x: 1461, y: 420 },
  { x: 1498, y: 464 }, { x: 1548, y: 217 }, { x: 1548, y: 368 },
  { x: 1598, y: 439 }, { x: 1598, y: 581 }, { x: 1636, y: 294 },
];

const membraneCells = [
  [0, 1, 2], [1, 3, 2], [1, 4, 3], [3, 4, 5], [2, 3, 6],
  [3, 5, 8], [5, 7, 10], [5, 10, 8], [8, 10, 13], [8, 13, 12],
  [7, 9, 11], [7, 11, 10], [9, 14, 11], [10, 11, 15], [10, 15, 13],
  [13, 15, 17], [13, 17, 16], [11, 14, 15], [14, 19, 20], [14, 20, 15],
  [15, 20, 17], [17, 20, 21], [17, 21, 18], [18, 21, 22], [20, 23, 21],
] as const;

function mulberry32(seed: number) {
  return () => {
    let value = seed += 0x6d2b79f5;
    value = Math.imul(value ^ value >>> 15, value | 1);
    value ^= value + Math.imul(value ^ value >>> 7, value | 61);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
}

function mix(a: number, b: number, amount: number) {
  return a + (b - a) * amount;
}

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function smoothstep(value: number) {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
}

function cubicBezier(a: Point, b: Point, c: Point, d: Point, t: number): Point {
  const inverse = 1 - t;
  const inverseSquared = inverse * inverse;
  const tSquared = t * t;
  return {
    x: inverseSquared * inverse * a.x + 3 * inverseSquared * t * b.x + 3 * inverse * tSquared * c.x + tSquared * t * d.x,
    y: inverseSquared * inverse * a.y + 3 * inverseSquared * t * b.y + 3 * inverse * tSquared * c.y + tSquared * t * d.y,
  };
}

function edgePoint(shape: Point[], position: number): Point {
  const scaled = position * shape.length;
  const index = Math.floor(scaled) % shape.length;
  const next = (index + 1) % shape.length;
  const amount = scaled - Math.floor(scaled);
  return {
    x: mix(shape[index].x, shape[next].x, amount),
    y: mix(shape[index].y, shape[next].y, amount),
  };
}

function createParticles(): MatterParticle[] {
  const random = mulberry32(2682026);
  return Array.from({ length: 188 }, (_, index) => {
    const shape = fragmentShapes[index % fragmentShapes.length];
    const source = edgePoint(shape, random());
    source.x += (random() - .5) * 12;
    source.y += (random() - .5) * 12;

    const target = networkNodes[Math.floor(random() * networkNodes.length)];
    const depth = random();
    return {
      source,
      controlIn: {
        x: mix(source.x, CORE.x, .42) + (random() - .5) * 72,
        y: mix(source.y, CORE.y, .42) + (random() - .5) * 118,
      },
      controlOut: {
        x: mix(CORE.x, target.x, .46) + (random() - .5) * 86,
        y: mix(CORE.y, target.y, .46) + (random() - .5) * 126,
      },
      target: {
        x: target.x + (random() - .5) * (16 + depth * 28),
        y: target.y + (random() - .5) * (16 + depth * 28),
      },
      delay: random() * .105,
      size: .55 + random() * 1.35,
      drift: 3 + random() * 9,
      seed: random() * Math.PI * 2,
      cyan: random() > .88,
    };
  });
}

function drawSoftParticle(
  context: CanvasRenderingContext2D,
  point: Point,
  radius: number,
  alpha: number,
  cyan: boolean,
) {
  if (alpha <= .004) return;

  if (radius > 1.35) {
    const halo = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius * 5.5);
    halo.addColorStop(0, cyan ? `rgba(95,229,239,${alpha * .42})` : `rgba(225,237,239,${alpha * .24})`);
    halo.addColorStop(1, "rgba(35,195,213,0)");
    context.fillStyle = halo;
    context.beginPath();
    context.arc(point.x, point.y, radius * 5.5, 0, Math.PI * 2);
    context.fill();
  }

  context.fillStyle = cyan
    ? `rgba(92,228,238,${alpha})`
    : `rgba(218,231,233,${alpha * .82})`;
  context.beginPath();
  context.arc(point.x, point.y, radius, 0, Math.PI * 2);
  context.fill();
}

function drawMembranes(context: CanvasRenderingContext2D, cycle: number) {
  const wave = smoothstep((cycle - .43) / .27);
  const release = 1 - smoothstep((cycle - .78) / .13);
  const wavePosition = mix(880, 1685, wave);

  membraneCells.forEach((cell, index) => {
    const points = cell.map((nodeIndex) => networkNodes[nodeIndex]);
    const centroidX = points.reduce((total, point) => total + point.x, 0) / points.length;
    const distance = Math.abs(centroidX - wavePosition);
    const activation = smoothstep(1 - distance / 190) * release;
    if (activation <= .004) return;

    const gradient = context.createLinearGradient(points[0].x, points[0].y, points[2].x, points[2].y);
    const alternate = index % 3 === 0;
    gradient.addColorStop(0, `rgba(69,205,218,${activation * (alternate ? .04 : .016)})`);
    gradient.addColorStop(.55, `rgba(116,229,236,${activation * (alternate ? .11 : .055)})`);
    gradient.addColorStop(1, "rgba(26,123,142,0)");

    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    context.lineTo(points[1].x, points[1].y);
    context.lineTo(points[2].x, points[2].y);
    context.closePath();
    context.fillStyle = gradient;
    context.fill();
    context.strokeStyle = `rgba(113,222,230,${activation * .16})`;
    context.lineWidth = .55;
    context.stroke();
  });
}

function drawAwakenedNodes(context: CanvasRenderingContext2D, cycle: number) {
  const wave = smoothstep((cycle - .43) / .27);
  const wavePosition = mix(880, 1685, wave);
  const release = 1 - smoothstep((cycle - .8) / .12);

  networkNodes.forEach((node, index) => {
    const distance = Math.abs(node.x - wavePosition);
    const activation = smoothstep(1 - distance / 125) * release;
    if (activation <= .004) return;

    const radius = 4 + activation * (index % 5 === 0 ? 7 : 3.5);
    const halo = context.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 3.2);
    halo.addColorStop(0, `rgba(97,231,239,${activation * .36})`);
    halo.addColorStop(1, "rgba(48,197,216,0)");
    context.fillStyle = halo;
    context.beginPath();
    context.arc(node.x, node.y, radius * 3.2, 0, Math.PI * 2);
    context.fill();

    context.strokeStyle = `rgba(155,239,243,${activation * .6})`;
    context.lineWidth = .7;
    context.beginPath();
    if (index % 4 === 0) {
      context.rect(node.x - radius * .55, node.y - radius * .55, radius * 1.1, radius * 1.1);
    } else {
      context.arc(node.x, node.y, radius * .62, 0, Math.PI * 2);
    }
    context.stroke();
  });
}

function drawCore(context: CanvasRenderingContext2D, cycle: number) {
  const compression = smoothstep((cycle - .18) / .23) * (1 - smoothstep((cycle - .55) / .16));
  const emergence = smoothstep((cycle - .4) / .13) * (1 - smoothstep((cycle - .72) / .18));
  const intensity = Math.max(compression * .68, emergence);
  const lensRadius = 34 + intensity * 54;

  const lens = context.createRadialGradient(CORE.x, CORE.y, 0, CORE.x, CORE.y, lensRadius);
  lens.addColorStop(0, `rgba(112,238,244,${.055 + intensity * .13})`);
  lens.addColorStop(.16, `rgba(56,211,225,${intensity * .08})`);
  lens.addColorStop(.48, `rgba(29,134,160,${intensity * .025})`);
  lens.addColorStop(1, "rgba(5,12,16,0)");
  context.fillStyle = lens;
  context.beginPath();
  context.arc(CORE.x, CORE.y, lensRadius, 0, Math.PI * 2);
  context.fill();

  context.save();
  context.translate(CORE.x, CORE.y);
  context.rotate(cycle * Math.PI * 1.4);
  context.strokeStyle = `rgba(113,230,238,${.12 + intensity * .28})`;
  context.lineWidth = .8;
  context.setLineDash([5, 13]);
  context.beginPath();
  context.ellipse(0, 0, 25 + intensity * 14, 16 + intensity * 7, -.28, 0, Math.PI * 2);
  context.stroke();
  context.rotate(-cycle * Math.PI * 2.7);
  context.strokeStyle = `rgba(211,242,243,${.08 + intensity * .18})`;
  context.setLineDash([2, 9]);
  context.beginPath();
  context.ellipse(0, 0, 42 + intensity * 20, 27 + intensity * 11, .22, 0, Math.PI * 2);
  context.stroke();
  context.restore();
}

export default function HeroNeuralMatter({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const particles = createParticles();
    const pointer = { x: -1000, y: -1000, active: false };
    let frame = 0;
    let startTime = performance.now();
    let scaleX = 1;
    let scaleY = 1;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.65);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      scaleX = rect.width / ART_WIDTH;
      scaleY = rect.height / ART_HEIGHT;
    };

    const updatePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / Math.max(scaleX, .0001);
      pointer.y = (event.clientY - rect.top) / Math.max(scaleY, .0001);
      pointer.active = event.clientX >= rect.left && event.clientX <= rect.right
        && event.clientY >= rect.top && event.clientY <= rect.bottom;
    };

    const clearPointer = () => {
      pointer.active = false;
    };

    const render = (now: number) => {
      const elapsed = now - startTime;
      const cycle = (elapsed % CYCLE_MS) / CYCLE_MS;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.setTransform(dpr * scaleX, 0, 0, dpr * scaleY, 0, 0);
      context.globalCompositeOperation = "screen";

      drawCore(context, cycle);
      drawMembranes(context, cycle);
      drawAwakenedNodes(context, cycle);

      particles.forEach((particle) => {
        const local = cycle - particle.delay;
        if (local < 0 || local > .92) return;

        let point: Point;
        let alpha = 0;
        let radius = particle.size;

        if (local < .18) {
          const ambient = local / .18;
          point = {
            x: particle.source.x + Math.sin(elapsed * .00033 + particle.seed) * particle.drift,
            y: particle.source.y + Math.cos(elapsed * .00028 + particle.seed * 1.7) * particle.drift,
          };
          alpha = smoothstep(ambient) * .12;
          radius *= .7;
        } else if (local < .46) {
          const amount = smoothstep((local - .18) / .28);
          point = cubicBezier(particle.source, particle.controlIn, {
            x: CORE.x - 58,
            y: CORE.y + Math.sin(particle.seed) * 34,
          }, CORE, amount);
          const compression = Math.sin(amount * Math.PI);
          point.x += Math.sin(amount * 17 + particle.seed) * (1 - amount) * 8;
          point.y += Math.cos(amount * 14 + particle.seed) * (1 - amount) * 7;
          alpha = .12 + compression * (particle.cyan ? .62 : .34);
          radius *= .76 + compression * .34;
        } else if (local < .75) {
          const amount = smoothstep((local - .46) / .29);
          point = cubicBezier(CORE, {
            x: CORE.x + 58,
            y: CORE.y + Math.cos(particle.seed) * 42,
          }, particle.controlOut, particle.target, amount);
          const expansion = Math.sin(amount * Math.PI);
          point.x += Math.sin(amount * 12 + particle.seed) * expansion * 10;
          point.y += Math.cos(amount * 15 + particle.seed) * expansion * 10;
          alpha = (.18 + expansion * (particle.cyan ? .58 : .38)) * (1 - amount * .24);
          radius *= .88 + expansion * .42;
        } else {
          const settle = smoothstep((local - .75) / .17);
          point = {
            x: particle.target.x + Math.sin(elapsed * .00027 + particle.seed) * particle.drift * (1 - settle),
            y: particle.target.y + Math.cos(elapsed * .00031 + particle.seed) * particle.drift * (1 - settle),
          };
          alpha = (1 - settle) * (particle.cyan ? .34 : .2);
          radius *= 1 - settle * .28;
        }

        if (pointer.active) {
          const dx = point.x - pointer.x;
          const dy = point.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 145 && distance > .1) {
            const influence = (1 - distance / 145) ** 2;
            point.x += dx / distance * influence * 9;
            point.y += dy / distance * influence * 9;
          }
        }

        drawSoftParticle(context, point, radius, alpha, particle.cyan);
      });

      context.globalCompositeOperation = "source-over";
      frame = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !frame) {
        startTime = performance.now();
        frame = requestAnimationFrame(render);
      } else if (!entry.isIntersecting && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }, { threshold: .01 });

    resize();
    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerleave", clearPointer);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", clearPointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`hero-motion-layer hero-neural-matter ${className}`.trim()}
      width={ART_WIDTH}
      height={ART_HEIGHT}
      aria-hidden="true"
    />
  );
}
