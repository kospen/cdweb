import type { CSSProperties } from "react";

const ART_WIDTH = 1672;
const ART_HEIGHT = 941;
const CORE = { x: 835, y: 446 };
const CLEAN_ART = "/images/hero-approved-clean-v2.png";

type Fragment = {
  points: string;
  floatX: number;
  floatY: number;
  floatRotate: number;
  duration: number;
  burst?: "a" | "b";
  burstX?: number;
  burstY?: number;
  burstRotate?: number;
};

const fragments: Fragment[] = [
  { points: "24,213 93,255 56,312", floatX: 3, floatY: -4, floatRotate: 1.4, duration: 8.6 },
  { points: "0,272 50,315 0,356", floatX: 4, floatY: 3, floatRotate: -1.1, duration: 9.8 },
  { points: "4,337 63,360 15,408", floatX: -3, floatY: 5, floatRotate: 1.7, duration: 7.9 },
  { points: "37,421 123,469 73,523", floatX: 5, floatY: -3, floatRotate: -1.5, duration: 10.4 },
  { points: "94,499 163,548 111,596", floatX: -4, floatY: -5, floatRotate: 1.3, duration: 9.2 },
  { points: "143,391 220,432 174,481", floatX: 4, floatY: 4, floatRotate: -1.6, duration: 8.2, burst: "a", burstX: -22, burstY: -15, burstRotate: -6 },
  { points: "228,374 302,417 254,459", floatX: -4, floatY: 3, floatRotate: 1.2, duration: 9.6 },
  { points: "278,475 344,516 298,559", floatX: 3, floatY: -5, floatRotate: -1.4, duration: 7.7, burst: "b", burstX: -16, burstY: 18, burstRotate: 5 },
  { points: "331,345 414,386 369,432", floatX: -5, floatY: -3, floatRotate: 1.8, duration: 10.1, burst: "a", burstX: -8, burstY: -25, burstRotate: 7 },
  { points: "386,491 468,527 421,575", floatX: 4, floatY: 5, floatRotate: -1.2, duration: 8.9, burst: "b", burstX: -4, burstY: 27, burstRotate: -7 },
  { points: "460,333 536,374 491,421", floatX: -3, floatY: 4, floatRotate: 1.6, duration: 9.4, burst: "a", burstX: 13, burstY: -20, burstRotate: -6 },
  { points: "532,425 612,464 566,512", floatX: 5, floatY: -4, floatRotate: -1.3, duration: 8.4 },
  { points: "604,368 682,410 636,458", floatX: -4, floatY: -4, floatRotate: 1.5, duration: 10.2, burst: "b", burstX: 20, burstY: 10, burstRotate: 6 },
  { points: "135,641 204,700 155,743", floatX: 4, floatY: -5, floatRotate: -1.1, duration: 9.9 },
  { points: "274,608 341,662 294,711", floatX: -3, floatY: 4, floatRotate: 1.4, duration: 8.7 },
];

const matterParticles = [
  { x: 156, y: 411, curve: -46, delay: .00, cluster: "a" },
  { x: 174, y: 432, curve: 38, delay: .12, cluster: "a" },
  { x: 196, y: 451, curve: -20, delay: .24, cluster: "a" },
  { x: 342, y: 361, curve: -58, delay: .05, cluster: "a" },
  { x: 369, y: 386, curve: 24, delay: .18, cluster: "a" },
  { x: 397, y: 411, curve: -32, delay: .31, cluster: "a" },
  { x: 468, y: 348, curve: -44, delay: .08, cluster: "a" },
  { x: 491, y: 374, curve: 30, delay: .20, cluster: "a" },
  { x: 518, y: 399, curve: -18, delay: .36, cluster: "a" },
  { x: 289, y: 493, curve: 42, delay: .00, cluster: "b" },
  { x: 309, y: 519, curve: -34, delay: .13, cluster: "b" },
  { x: 329, y: 540, curve: 28, delay: .27, cluster: "b" },
  { x: 396, y: 506, curve: -30, delay: .06, cluster: "b" },
  { x: 425, y: 530, curve: 45, delay: .19, cluster: "b" },
  { x: 452, y: 550, curve: -18, delay: .34, cluster: "b" },
  { x: 614, y: 384, curve: -38, delay: .03, cluster: "b" },
  { x: 641, y: 411, curve: 36, delay: .17, cluster: "b" },
  { x: 666, y: 435, curve: -26, delay: .30, cluster: "b" },
] as const;

const networkRoutes = [
  { d: "M835 446 C900 446 930 446 976 446 H1036 L1063 476 H1160 L1194 488 H1312", delay: 0 },
  { d: "M835 446 C900 434 925 414 980 405 H1035 L1063 385 H1160 L1220 311 H1311 V218 H1458", delay: .55 },
  { d: "M835 446 C905 446 940 446 1008 446 H1108 L1133 421 H1220 L1262 366 H1311 H1392 L1428 403 H1461 L1498 367 H1548 V294 H1636", delay: 1.15 },
  { d: "M835 446 C900 456 940 475 1007 488 H1134 V541 H1312 V560 H1343 V581 H1452 H1598", delay: 1.7 },
] as const;

const awakenedNodes = [
  { x: 976, y: 446, delay: 6.75 }, { x: 1036, y: 446, delay: 7.05 },
  { x: 1063, y: 476, delay: 7.35 }, { x: 1063, y: 385, delay: 7.4 },
  { x: 1134, y: 421, delay: 7.7 }, { x: 1160, y: 341, delay: 7.9 },
  { x: 1194, y: 488, delay: 8.0 }, { x: 1220, y: 311, delay: 8.15 },
  { x: 1262, y: 366, delay: 8.35 }, { x: 1312, y: 560, delay: 8.45 },
  { x: 1311, y: 218, delay: 8.65 }, { x: 1392, y: 366, delay: 8.75 },
  { x: 1343, y: 581, delay: 8.9 }, { x: 1452, y: 581, delay: 9.15 },
  { x: 1460, y: 217, delay: 9.2 }, { x: 1548, y: 294, delay: 9.45 },
  { x: 1598, y: 581, delay: 9.7 }, { x: 1636, y: 294, delay: 9.9 },
] as const;

function fragmentStyle(fragment: Fragment, index: number): CSSProperties {
  const driftScale = .28;
  const driftRotationScale = .16;
  const impulseScale = .26;
  const impulseRotationScale = .14;
  const impulseX = (fragment.burstX ?? 0) * impulseScale;
  const impulseY = (fragment.burstY ?? 0) * impulseScale;
  const impulseRotate = (fragment.burstRotate ?? 0) * impulseRotationScale;

  return {
    "--float-x": `${fragment.floatX * driftScale}px`,
    "--float-y": `${fragment.floatY * driftScale}px`,
    "--float-r": `${fragment.floatRotate * driftRotationScale}deg`,
    "--float-duration": `${fragment.duration * 1.65}s`,
    "--float-delay": `${-(index % 5) * 1.35}s`,
    "--burst-x": `${impulseX}px`,
    "--burst-y": `${impulseY}px`,
    "--burst-r": `${impulseRotate}deg`,
    "--burst-x-entry": `${impulseX * .42}px`,
    "--burst-y-entry": `${impulseY * .42}px`,
    "--burst-r-entry": `${impulseRotate * .4}deg`,
  } as CSSProperties;
}

export default function HeroRoutedMotion({ className = "" }: { className?: string }) {
  const idSuffix = className.includes("mobile") ? "mobile" : "desktop";
  const glowId = `hero-routed-glow-${idSuffix}`;
  const softGlowId = `hero-routed-soft-glow-${idSuffix}`;

  return (
    <svg
      className={`hero-motion-layer hero-routed-motion ${className}`.trim()}
      viewBox={`0 0 ${ART_WIDTH} ${ART_HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id={softGlowId} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        {fragments.map((fragment, index) => (
          <clipPath id={`hero-routed-fragment-${idSuffix}-${index}`} key={fragment.points}>
            <polygon points={fragment.points} />
          </clipPath>
        ))}
      </defs>

      <g className="hero-routed-fragment-field">
        {fragments.map((fragment) => (
          <polygon className="hero-routed-fragment-void" points={fragment.points} key={`void-${fragment.points}`} />
        ))}
        {fragments.map((fragment, index) => (
          <g
            className={`hero-routed-burst${fragment.burst ? ` hero-routed-burst--${fragment.burst}` : ""}`}
            style={fragmentStyle(fragment, index)}
            key={fragment.points}
          >
            <g className="hero-routed-float">
              <g clipPath={`url(#hero-routed-fragment-${idSuffix}-${index})`}>
                <image href={CLEAN_ART} width={ART_WIDTH} height={ART_HEIGHT} />
                <polygon className="hero-routed-fragment-edge" points={fragment.points} />
              </g>
            </g>
          </g>
        ))}
      </g>

      <g className="hero-routed-matter">
        {matterParticles.map((particle, index) => {
          const begin = particle.cluster === "b" ? -7 + particle.delay : particle.delay;
          const isCyan = index % 4 === 0;
          const path = `M${particle.x} ${particle.y} C${particle.x + 125} ${particle.y + particle.curve} 704 ${CORE.y - particle.curve * .42} ${CORE.x} ${CORE.y}`;
          return (
            <circle
              className={`hero-routed-particle${isCyan ? " hero-routed-particle--cyan" : ""}`}
              r={isCyan ? 3.5 : 2.1}
              key={`${particle.x}-${particle.y}`}
              filter={isCyan ? `url(#${glowId})` : undefined}
            >
              <animateMotion
                path={path}
                dur="14s"
                begin={`${begin}s`}
                keyPoints="0;0;1;1"
                keyTimes="0;.23;.43;1"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0;.92;.55;0;0"
                keyTimes="0;.22;.28;.40;.44;1"
                dur="14s"
                begin={`${begin}s`}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}
      </g>

      <g className="hero-routed-core">
        <circle className="hero-routed-core-aura" cx={CORE.x} cy={CORE.y} r="48" filter={`url(#${softGlowId})`} />
        <circle className="hero-routed-core-ring hero-routed-core-ring--event" cx={CORE.x} cy={CORE.y} r="31" />
        <circle className="hero-routed-core-ring hero-routed-core-ring--ambient" cx={CORE.x} cy={CORE.y} r="18" />
        <rect className="hero-routed-core-square" x={CORE.x - 6} y={CORE.y - 6} width="12" height="12" />
      </g>

      <g className="hero-routed-network">
        {networkRoutes.map((route) => (
          <g style={{ animationDelay: `${route.delay}s` }} key={route.d}>
            <path className="hero-network-pulse hero-network-pulse--glow" d={route.d} pathLength="1000" />
            <path className="hero-network-pulse hero-network-pulse--core" d={route.d} pathLength="1000" />
          </g>
        ))}
      </g>

      <g className="hero-routed-nodes">
        {awakenedNodes.map((node, index) => (
          <g
            className="hero-routed-node"
            style={{ animationDelay: `${node.delay}s` }}
            transform={`translate(${node.x} ${node.y})`}
            key={`${node.x}-${node.y}`}
          >
            <circle className="hero-routed-node-halo" r={index % 4 === 0 ? 14 : 10} />
            {index % 3 === 0
              ? <rect className="hero-routed-node-mark" x="-4" y="-4" width="8" height="8" />
              : <circle className="hero-routed-node-mark" r="3.5" />}
          </g>
        ))}
      </g>
    </svg>
  );
}
