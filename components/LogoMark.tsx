export default function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      aria-label="Systems That Decide mark"
    >
      <circle cx="50" cy="50" r="44" fill="none" stroke="#9A8B47" strokeWidth="3.8" />
      <polygon
        points="50,6 94,50 50,94 6,50"
        fill="none"
        stroke="#9A8B47"
        strokeWidth="1.6"
        strokeLinejoin="miter"
      />
      <circle cx="50" cy="6" r="3.5" fill="#9A8B47" />
      <circle cx="94" cy="50" r="3.5" fill="#9A8B47" />
      <circle cx="50" cy="94" r="3.5" fill="#9A8B47" />
      <circle cx="6" cy="50" r="3.5" fill="#9A8B47" />
    </svg>
  )
}
