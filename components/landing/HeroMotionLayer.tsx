const fragments = [
  "16,468 100,506 48,556",
  "45,540 125,595 63,660",
  "133,584 190,635 142,689",
  "215,520 268,570 230,620",
  "283,592 340,638 298,690",
  "360,510 410,550 382,600",
  "470,550 525,590 493,640",
  "590,490 640,535 610,580",
];

export default function HeroMotionLayer({ className = "" }: { className?: string }) {
  const idSuffix = className.includes("mobile") ? "mobile" : "desktop";
  const cyanFilterId = `hero-cyan-extract-${idSuffix}`;
  const sweepGradientId = `hero-sweep-gradient-${idSuffix}`;
  const sweepMaskId = `hero-sweep-mask-${idSuffix}`;
  const circuitClipId = `hero-circuit-clip-${idSuffix}`;

  return (
    <svg
      className={`hero-motion-layer ${className}`.trim()}
      viewBox="0 0 1672 941"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id={cyanFilterId} x="780" y="120" width="892" height="560" filterUnits="userSpaceOnUse">
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 .337  0 0 0 0 .843  0 0 0 0 .898  .22 .7 .08 0 -.075"
            result="cyanLines"
          />
          <feGaussianBlur in="cyanLines" stdDeviation="1.25" result="cyanGlow" />
          <feMerge>
            <feMergeNode in="cyanGlow" />
            <feMergeNode in="cyanLines" />
          </feMerge>
        </filter>
        <linearGradient id={sweepGradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".24" stopColor="#fff" stopOpacity=".18" />
          <stop offset=".5" stopColor="#fff" stopOpacity="1" />
          <stop offset=".76" stopColor="#fff" stopOpacity=".18" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={sweepMaskId} x="780" y="120" width="892" height="560" maskUnits="userSpaceOnUse">
          <rect className="hero-circuit-mask" x="-520" y="120" width="520" height="560" fill={`url(#${sweepGradientId})`} />
        </mask>
        <clipPath id={circuitClipId}>
          <rect x="805" y="120" width="867" height="520" />
        </clipPath>
        {fragments.map((points, index) => (
          <clipPath id={`hero-fragment-clip-${idSuffix}-${index + 1}`} key={points}>
            <polygon points={points} />
          </clipPath>
        ))}
      </defs>

      <g className="hero-circuit-sweep" clipPath={`url(#${circuitClipId})`} mask={`url(#${sweepMaskId})`}>
        <rect className="hero-circuit-aura" x="805" y="120" width="867" height="520" />
        <image
          className="hero-circuit-image"
          href="/images/hero-approved-reference-cyan.png"
          x="0"
          y="0"
          width="1672"
          height="941"
          preserveAspectRatio="xMidYMid meet"
          filter={`url(#${cyanFilterId})`}
        />
      </g>

      <g className="hero-fragment-field">
        {fragments.map((points) => (
          <polygon className="hero-fragment-void" points={points} key={`void-${points}`} />
        ))}
        {fragments.map((points, index) => (
          <g className={`hero-fragment-piece hero-fragment-piece--${index + 1}`} key={points}>
            <g clipPath={`url(#hero-fragment-clip-${idSuffix}-${index + 1})`}>
              <image
                className="hero-fragment-image"
                href="/images/hero-approved-reference-cyan.png"
                x="0"
                y="0"
                width="1672"
                height="941"
                preserveAspectRatio="xMidYMid meet"
              />
              <polygon className="hero-fragment-edge" points={points} />
            </g>
          </g>
        ))}
      </g>

      <g className="hero-transition-core">
        <circle className="hero-core-ring hero-core-ring--outer" cx="835" cy="446" r="30" />
        <circle className="hero-core-ring hero-core-ring--inner" cx="835" cy="446" r="18" />
        <rect className="hero-core-square" x="829" y="440" width="12" height="12" />
      </g>
    </svg>
  );
}
