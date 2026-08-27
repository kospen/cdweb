/**
 * The CD monogram: two rounded terminals split by a diagonal, with the cyan
 * slash in the counter. Drawn as plain paths — no clipPath, so the mark can
 * appear more than once on a page without duplicating element ids.
 *
 * Geometry (viewBox 122 × 44): outer stadium r22, stroke 9.7, inner r12.3.
 * The split runs from x66 at the top to x59.2 at the bottom, 8.5 wide.
 */
export default function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 122 44"
      width="122"
      height="44"
      aria-hidden="true"
      focusable="false"
    >
      {/* left terminal */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M65.8,0 H22 A22,22 0 0 0 22,44 H59.2 Z
           M64.37,9.7 H22 A12.3,12.3 0 0 0 22,34.3 H60.63 Z"
      />
      {/* right terminal */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M74.35,0 H100 A22,22 0 0 1 100,44 H67.65 Z
           M72.87,9.7 H100 A12.3,12.3 0 0 1 100,34.3 H69.13 Z"
      />
      {/* the transition */}
      <polygon points="65.4,13.2 72,13.2 68.4,28.8 61.8,28.8" fill="var(--cyan)" />
    </svg>
  );
}
