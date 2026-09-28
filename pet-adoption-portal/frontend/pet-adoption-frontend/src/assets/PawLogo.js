import React from 'react';

function PawLogo({ size = 42, animated = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={animated ? { animation: 'pawBounce 2s ease-in-out infinite' } : {}}
    >
      <defs>
        <linearGradient id="pawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff8c42" />
          <stop offset="100%" stopColor="#ff5f6d" />
        </linearGradient>
      </defs>
      {/* Main pad */}
      <ellipse cx="50" cy="58" rx="22" ry="18" fill="url(#pawGrad)" />
      {/* Toes */}
      <ellipse cx="28" cy="30" rx="10" ry="12" fill="url(#pawGrad)" transform="rotate(-15 28 30)" />
      <ellipse cx="72" cy="30" rx="10" ry="12" fill="url(#pawGrad)" transform="rotate(15 72 30)" />
      <ellipse cx="40" cy="18" rx="9" ry="11" fill="url(#pawGrad)" transform="rotate(-5 40 18)" />
      <ellipse cx="60" cy="18" rx="9" ry="11" fill="url(#pawGrad)" transform="rotate(5 60 18)" />
      {/* Heart in paw */}
      <path
        d="M50 50 C50 50 42 44 42 38 C42 34 45 31 50 34 C55 31 58 34 58 38 C58 44 50 50 50 50Z"
        fill="white"
        opacity="0.9"
      >
        {animated && (
          <animate
            attributeName="opacity"
            values="0.9;0.6;0.9"
            dur="1.5s"
            repeatCount="indefinite"
          />
        )}
      </path>
      {/* Sparkles */}
      {animated && (
        <>
          <circle cx="18" cy="14" r="2.5" fill="#ff8c42">
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
            <animate attributeName="r" values="0;2.5;0" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="82" cy="12" r="2.5" fill="#ff5f6d">
            <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.5s" repeatCount="indefinite" />
            <animate attributeName="r" values="0;2.5;0" dur="2s" begin="0.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="12" cy="50" r="2" fill="#ff8c42">
            <animate attributeName="opacity" values="0;1;0" dur="2.5s" begin="1s" repeatCount="indefinite" />
            <animate attributeName="r" values="0;2;0" dur="2.5s" begin="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="88" cy="48" r="2" fill="#ff5f6d">
            <animate attributeName="opacity" values="0;1;0" dur="2.5s" begin="1.5s" repeatCount="indefinite" />
            <animate attributeName="r" values="0;2;0" dur="2.5s" begin="1.5s" repeatCount="indefinite" />
          </circle>
        </>
      )}
    </svg>
  );
}

export default PawLogo;
