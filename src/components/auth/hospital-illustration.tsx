export function HospitalIllustration() {
  return (
    <svg viewBox="0 0 640 520" className="h-full w-full" role="img" aria-label="Hospital analytics illustration">
      <defs>
        <linearGradient id="hospitalSky" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#DBEAFE" />
          <stop offset="100%" stopColor="#EFF6FF" />
        </linearGradient>
        <linearGradient id="hospitalBuilding" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E0F2FE" />
        </linearGradient>
        <linearGradient id="hospitalAccent" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      <rect width="640" height="520" rx="36" fill="url(#hospitalSky)" />
      <circle cx="520" cy="92" r="42" fill="#BFDBFE" opacity="0.55" />
      <circle cx="125" cy="86" r="18" fill="#93C5FD" opacity="0.4" />
      <path d="M86 392c54-58 134-88 236-88s182 30 236 88" fill="none" stroke="#BFDBFE" strokeWidth="14" strokeLinecap="round" opacity="0.7" />
      <rect x="146" y="128" width="348" height="280" rx="28" fill="url(#hospitalBuilding)" stroke="#BFDBFE" strokeWidth="2" />
      <rect x="274" y="228" width="92" height="180" rx="16" fill="#DBEAFE" />
      <rect x="190" y="176" width="40" height="56" rx="10" fill="#EFF6FF" stroke="#93C5FD" />
      <rect x="250" y="176" width="40" height="56" rx="10" fill="#EFF6FF" stroke="#93C5FD" />
      <rect x="350" y="176" width="40" height="56" rx="10" fill="#EFF6FF" stroke="#93C5FD" />
      <rect x="410" y="176" width="40" height="56" rx="10" fill="#EFF6FF" stroke="#93C5FD" />
      <rect x="190" y="264" width="40" height="56" rx="10" fill="#EFF6FF" stroke="#93C5FD" />
      <rect x="350" y="264" width="40" height="56" rx="10" fill="#EFF6FF" stroke="#93C5FD" />
      <rect x="274" y="228" width="92" height="42" rx="12" fill="url(#hospitalAccent)" />
      <path d="M320 238v22M309 249h22" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
      <rect x="110" y="332" width="420" height="82" rx="28" fill="#FFFFFF" opacity="0.86" stroke="#BFDBFE" />
      <g transform="translate(132 350)">
        <rect width="92" height="48" rx="16" fill="#EFF6FF" />
        <circle cx="22" cy="24" r="10" fill="#2563EB" />
        <rect x="40" y="15" width="34" height="8" rx="4" fill="#93C5FD" />
        <rect x="40" y="29" width="24" height="6" rx="3" fill="#BFDBFE" />
      </g>
      <g transform="translate(258 350)">
        <rect width="92" height="48" rx="16" fill="#EFF6FF" />
        <circle cx="22" cy="24" r="10" fill="#1D4ED8" />
        <rect x="40" y="15" width="34" height="8" rx="4" fill="#93C5FD" />
        <rect x="40" y="29" width="24" height="6" rx="3" fill="#BFDBFE" />
      </g>
      <g transform="translate(384 350)">
        <rect width="92" height="48" rx="16" fill="#EFF6FF" />
        <circle cx="22" cy="24" r="10" fill="#0EA5E9" />
        <rect x="40" y="15" width="34" height="8" rx="4" fill="#93C5FD" />
        <rect x="40" y="29" width="24" height="6" rx="3" fill="#BFDBFE" />
      </g>
      <path d="M120 452h400" stroke="#DBEAFE" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}