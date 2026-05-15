import React from "react";

export type FaceId =
  | "early-a" | "early-b" | "early-c" | "early-d"
  | "mid-a"   | "mid-b"   | "mid-c"   | "mid-d"
  | "senior-a"| "senior-b"| "senior-c"| "senior-d";

interface FaceProps { size?: number; className?: string }

const STROKE = "#18150f";

// ── Early career faces (young, full hair, smooth features) ─────────────

function EarlyA({ size = 80 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* hair back */}
      <ellipse cx="40" cy="30" rx="22" ry="24" fill="#3d2010" />
      {/* face */}
      <ellipse cx="40" cy="38" rx="18" ry="20" fill="#d4965c" stroke={STROKE} strokeWidth="1.5" />
      {/* hair top */}
      <path d="M18 30 Q20 12 40 10 Q60 12 62 30 Q56 20 40 20 Q24 20 18 30Z" fill="#3d2010" />
      {/* ears */}
      <ellipse cx="22" cy="38" rx="3" ry="4" fill="#c8864e" stroke={STROKE} strokeWidth="1" />
      <ellipse cx="58" cy="38" rx="3" ry="4" fill="#c8864e" stroke={STROKE} strokeWidth="1" />
      {/* eyes */}
      <ellipse cx="34" cy="34" rx="3" ry="3.5" fill={STROKE} />
      <ellipse cx="46" cy="34" rx="3" ry="3.5" fill={STROKE} />
      <circle cx="35.2" cy="33" r="1" fill="white" />
      <circle cx="47.2" cy="33" r="1" fill="white" />
      {/* nose */}
      <path d="M40 38 Q38 42 36 43 Q40 44 44 43 Q42 42 40 38Z" fill="#b87040" />
      {/* mouth */}
      <path d="M34 50 Q40 55 46 50" stroke={STROKE} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* collar */}
      <path d="M26 58 Q33 62 40 60 Q47 62 54 58 L58 80 L22 80Z" fill="#1a3a5c" />
      <path d="M40 60 L36 66 L40 64 L44 66 L40 60Z" fill="#f0ece0" />
    </svg>
  );
}

function EarlyB({ size = 80 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* curly hair */}
      <circle cx="25" cy="26" r="9" fill="#1a0e06" />
      <circle cx="33" cy="19" r="9" fill="#1a0e06" />
      <circle cx="43" cy="17" r="9" fill="#1a0e06" />
      <circle cx="53" cy="20" r="9" fill="#1a0e06" />
      <circle cx="59" cy="28" r="8" fill="#1a0e06" />
      {/* face */}
      <ellipse cx="40" cy="39" rx="18" ry="20" fill="#8b5e3c" stroke={STROKE} strokeWidth="1.5" />
      {/* ears */}
      <ellipse cx="22" cy="39" rx="3" ry="4" fill="#7a5030" stroke={STROKE} strokeWidth="1" />
      <ellipse cx="58" cy="39" rx="3" ry="4" fill="#7a5030" stroke={STROKE} strokeWidth="1" />
      {/* eyes */}
      <ellipse cx="34" cy="35" rx="3" ry="3.5" fill={STROKE} />
      <ellipse cx="46" cy="35" rx="3" ry="3.5" fill={STROKE} />
      <circle cx="35.2" cy="34" r="1" fill="white" />
      <circle cx="47.2" cy="34" r="1" fill="white" />
      {/* nose */}
      <path d="M40 39 Q38 43 36 44 Q40 45 44 44 Q42 43 40 39Z" fill="#6a4020" />
      {/* mouth */}
      <path d="M34 51 Q40 57 46 51" stroke={STROKE} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* collar */}
      <path d="M26 59 Q33 63 40 61 Q47 63 54 59 L58 80 L22 80Z" fill="#1a3a5c" />
      <path d="M40 61 L36 67 L40 65 L44 67 L40 61Z" fill="#f0ece0" />
    </svg>
  );
}

function EarlyC({ size = 80 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* short neat hair */}
      <path d="M20 34 Q20 12 40 11 Q60 12 60 34 Q56 18 40 17 Q24 18 20 34Z" fill="#8B4513" />
      {/* face */}
      <ellipse cx="40" cy="39" rx="18" ry="20" fill="#f0c89a" stroke={STROKE} strokeWidth="1.5" />
      {/* ears */}
      <ellipse cx="22" cy="39" rx="3" ry="4" fill="#e8bc88" stroke={STROKE} strokeWidth="1" />
      <ellipse cx="58" cy="39" rx="3" ry="4" fill="#e8bc88" stroke={STROKE} strokeWidth="1" />
      {/* hair sides */}
      <path d="M20 34 L20 40 Q22 36 22 34Z" fill="#8B4513" />
      <path d="M60 34 L60 40 Q58 36 58 34Z" fill="#8B4513" />
      {/* eyes */}
      <ellipse cx="34" cy="35" rx="3" ry="3" fill={STROKE} />
      <ellipse cx="46" cy="35" rx="3" ry="3" fill={STROKE} />
      <circle cx="35.2" cy="34.2" r="0.9" fill="white" />
      <circle cx="47.2" cy="34.2" r="0.9" fill="white" />
      {/* eyebrows */}
      <path d="M30 31 Q34 29.5 37 31" stroke={STROKE} strokeWidth="1.2" fill="none" />
      <path d="M43 31 Q46 29.5 50 31" stroke={STROKE} strokeWidth="1.2" fill="none" />
      {/* nose */}
      <circle cx="38" cy="41" r="1.2" fill="#d4a070" />
      <circle cx="42" cy="41" r="1.2" fill="#d4a070" />
      {/* mouth */}
      <path d="M35 50 Q40 54 45 50" stroke={STROKE} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* collar */}
      <path d="M26 59 Q33 63 40 61 Q47 63 54 59 L58 80 L22 80Z" fill="#1a3a5c" />
      <path d="M40 61 L36 67 L40 65 L44 67 L40 61Z" fill="#f0ece0" />
    </svg>
  );
}

function EarlyD({ size = 80 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* long hair */}
      <path d="M18 32 Q16 50 18 70 L24 68 Q22 50 22 34Z" fill="#2c1810" />
      <path d="M62 32 Q64 50 62 70 L56 68 Q58 50 58 34Z" fill="#2c1810" />
      <path d="M19 32 Q20 12 40 10 Q60 12 61 32 Q56 20 40 20 Q24 20 19 32Z" fill="#2c1810" />
      {/* face */}
      <ellipse cx="40" cy="38" rx="18" ry="20" fill="#c4a882" stroke={STROKE} strokeWidth="1.5" />
      {/* ears */}
      <ellipse cx="22" cy="38" rx="3" ry="4" fill="#b89870" stroke={STROKE} strokeWidth="1" />
      <ellipse cx="58" cy="38" rx="3" ry="4" fill="#b89870" stroke={STROKE} strokeWidth="1" />
      {/* eyes */}
      <ellipse cx="34" cy="34" rx="3" ry="3.5" fill={STROKE} />
      <ellipse cx="46" cy="34" rx="3" ry="3.5" fill={STROKE} />
      <circle cx="35" cy="33" r="1" fill="white" />
      <circle cx="47" cy="33" r="1" fill="white" />
      {/* nose */}
      <path d="M39 38 L37 43 L43 43 L41 38Z" fill="none" stroke="#a07848" strokeWidth="1" />
      {/* mouth */}
      <path d="M34 50 Q40 55 46 50" stroke={STROKE} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* collar */}
      <path d="M26 58 Q33 62 40 60 Q47 62 54 58 L58 80 L22 80Z" fill="#1a3a5c" />
      <path d="M40 60 L36 66 L40 64 L44 66 L40 60Z" fill="#f0ece0" />
    </svg>
  );
}

// ── Mid career faces (professional, some gray, defined features) ────────

function MidA({ size = 80 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* hair with gray temples */}
      <path d="M20 33 Q20 12 40 11 Q60 12 60 33 Q56 18 40 17 Q24 18 20 33Z" fill="#5a4030" />
      <path d="M20 33 L20 38 Q23 30 23 33Z" fill="#b0a090" />
      <path d="M60 33 L60 38 Q57 30 57 33Z" fill="#b0a090" />
      {/* face */}
      <ellipse cx="40" cy="39" rx="18" ry="20" fill="#d4965c" stroke={STROKE} strokeWidth="1.5" />
      {/* ears */}
      <ellipse cx="22" cy="39" rx="3" ry="4" fill="#c8864e" stroke={STROKE} strokeWidth="1" />
      <ellipse cx="58" cy="39" rx="3" ry="4" fill="#c8864e" stroke={STROKE} strokeWidth="1" />
      {/* eyes */}
      <ellipse cx="34" cy="35" rx="3" ry="3" fill={STROKE} />
      <ellipse cx="46" cy="35" rx="3" ry="3" fill={STROKE} />
      <circle cx="35" cy="34" r="0.9" fill="white" />
      <circle cx="47" cy="34" r="0.9" fill="white" />
      {/* subtle eye lines */}
      <path d="M30 38 Q34 39 38 38" stroke="#b87040" strokeWidth="0.8" fill="none" />
      <path d="M42 38 Q46 39 50 38" stroke="#b87040" strokeWidth="0.8" fill="none" />
      {/* nose */}
      <path d="M40 39 Q38 43 36 44 Q40 45 44 44 Q42 43 40 39Z" fill="#b87040" />
      {/* mouth */}
      <path d="M34 51 Q40 55 46 51" stroke={STROKE} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* collar/jacket */}
      <path d="M24 59 Q32 65 40 62 Q48 65 56 59 L60 80 L20 80Z" fill="#2a3a2a" />
      <path d="M40 62 L35 70 L40 67 L45 70 L40 62Z" fill="#e8e0d0" />
    </svg>
  );
}

function MidB({ size = 80 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* hair */}
      <path d="M21 35 Q22 13 40 11 Q58 13 59 35 Q55 19 40 18 Q25 19 21 35Z" fill="#6b4c2a" />
      {/* face */}
      <ellipse cx="40" cy="39" rx="18" ry="20" fill="#8b5e3c" stroke={STROKE} strokeWidth="1.5" />
      {/* ears */}
      <ellipse cx="22" cy="39" rx="3" ry="4" fill="#7a5030" stroke={STROKE} strokeWidth="1" />
      <ellipse cx="58" cy="39" rx="3" ry="4" fill="#7a5030" stroke={STROKE} strokeWidth="1" />
      {/* glasses frame */}
      <rect x="28" y="31" width="11" height="8" rx="2" stroke={STROKE} strokeWidth="1.5" fill="none" />
      <rect x="41" y="31" width="11" height="8" rx="2" stroke={STROKE} strokeWidth="1.5" fill="none" />
      <line x1="39" y1="35" x2="41" y2="35" stroke={STROKE} strokeWidth="1.5" />
      <line x1="22" y1="34" x2="28" y2="34" stroke={STROKE} strokeWidth="1.2" />
      <line x1="52" y1="34" x2="58" y2="34" stroke={STROKE} strokeWidth="1.2" />
      {/* eyes behind glasses */}
      <circle cx="33.5" cy="35" r="2.5" fill={STROKE} />
      <circle cx="46.5" cy="35" r="2.5" fill={STROKE} />
      <circle cx="34.5" cy="34.2" r="0.8" fill="white" />
      <circle cx="47.5" cy="34.2" r="0.8" fill="white" />
      {/* nose */}
      <path d="M40 40 Q38 44 36 45 Q40 46 44 45 Q42 44 40 40Z" fill="#6a4020" />
      {/* mouth */}
      <path d="M34 52 Q40 56 46 52" stroke={STROKE} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* collar */}
      <path d="M24 59 Q32 65 40 62 Q48 65 56 59 L60 80 L20 80Z" fill="#2a3a2a" />
      <path d="M40 62 L35 70 L40 67 L45 70 L40 62Z" fill="#e8e0d0" />
    </svg>
  );
}

function MidC({ size = 80 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* cropped hair */}
      <path d="M21 36 Q22 14 40 13 Q58 14 59 36 Q55 22 40 21 Q25 22 21 36Z" fill="#2a1a08" />
      {/* face - slightly angular */}
      <path d="M22 38 Q22 22 40 20 Q58 22 58 38 Q58 55 52 58 Q46 62 40 62 Q34 62 28 58 Q22 55 22 38Z" fill="#f0c89a" stroke={STROKE} strokeWidth="1.5" />
      {/* ears */}
      <ellipse cx="22" cy="39" rx="3" ry="4" fill="#e8bc88" stroke={STROKE} strokeWidth="1" />
      <ellipse cx="58" cy="39" rx="3" ry="4" fill="#e8bc88" stroke={STROKE} strokeWidth="1" />
      {/* eyes */}
      <ellipse cx="34" cy="35" rx="3" ry="3" fill={STROKE} />
      <ellipse cx="46" cy="35" rx="3" ry="3" fill={STROKE} />
      <circle cx="35" cy="34" r="0.9" fill="white" />
      <circle cx="47" cy="34" r="0.9" fill="white" />
      {/* nose */}
      <line x1="40" y1="37" x2="38" y2="43" stroke="#c89060" strokeWidth="1.2" />
      <line x1="38" y1="43" x2="42" y2="43" stroke="#c89060" strokeWidth="1.2" />
      {/* mouth */}
      <path d="M35 51 Q40 54 45 51" stroke={STROKE} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* beard stubble hint */}
      <path d="M30 54 Q40 58 50 54" stroke="#4a3020" strokeWidth="0.5" fill="none" opacity="0.4" />
      {/* collar */}
      <path d="M24 62 Q32 67 40 64 Q48 67 56 62 L60 80 L20 80Z" fill="#2a3a2a" />
      <path d="M40 64 L35 72 L40 69 L45 72 L40 64Z" fill="#e8e0d0" />
    </svg>
  );
}

function MidD({ size = 80 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* shoulder-length hair */}
      <path d="M18 35 Q18 55 22 72 L26 70 Q23 52 23 36Z" fill="#704030" />
      <path d="M62 35 Q62 55 58 72 L54 70 Q57 52 57 36Z" fill="#704030" />
      <path d="M19 35 Q20 13 40 11 Q60 13 61 35 Q56 20 40 19 Q24 20 19 35Z" fill="#704030" />
      {/* face */}
      <ellipse cx="40" cy="39" rx="17" ry="19" fill="#c4a882" stroke={STROKE} strokeWidth="1.5" />
      {/* ears */}
      <ellipse cx="23" cy="39" rx="3" ry="4" fill="#b89870" stroke={STROKE} strokeWidth="1" />
      <ellipse cx="57" cy="39" rx="3" ry="4" fill="#b89870" stroke={STROKE} strokeWidth="1" />
      {/* eyes */}
      <ellipse cx="34" cy="35" rx="3" ry="3" fill={STROKE} />
      <ellipse cx="46" cy="35" rx="3" ry="3" fill={STROKE} />
      <circle cx="35" cy="34.2" r="0.9" fill="white" />
      <circle cx="47" cy="34.2" r="0.9" fill="white" />
      {/* nose */}
      <path d="M40 38 Q38 43 36 44 Q40 45 44 44 Q42 43 40 38Z" fill="#a07848" />
      {/* mouth */}
      <path d="M34 51 Q40 55 46 51" stroke={STROKE} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* collar */}
      <path d="M24 58 Q32 64 40 61 Q48 64 56 58 L60 80 L20 80Z" fill="#2a3a2a" />
      <path d="M40 61 L35 69 L40 66 L45 69 L40 61Z" fill="#e8e0d0" />
    </svg>
  );
}

// ── Senior faces (distinguished, silver/white hair, defined features) ──

function SeniorA({ size = 80 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* white swept hair */}
      <path d="M19 34 Q20 12 40 10 Q60 12 61 34 Q56 18 40 17 Q24 18 19 34Z" fill="#c8c0b0" />
      <path d="M19 34 L18 42 Q21 35 22 34Z" fill="#c8c0b0" />
      {/* face */}
      <ellipse cx="40" cy="39" rx="18" ry="20" fill="#d4965c" stroke={STROKE} strokeWidth="1.5" />
      {/* ears */}
      <ellipse cx="22" cy="39" rx="3.5" ry="4.5" fill="#c8864e" stroke={STROKE} strokeWidth="1" />
      <ellipse cx="58" cy="39" rx="3.5" ry="4.5" fill="#c8864e" stroke={STROKE} strokeWidth="1" />
      {/* eyes */}
      <ellipse cx="34" cy="35" rx="3" ry="2.8" fill={STROKE} />
      <ellipse cx="46" cy="35" rx="3" ry="2.8" fill={STROKE} />
      <circle cx="35" cy="34.2" r="0.9" fill="white" />
      <circle cx="47" cy="34.2" r="0.9" fill="white" />
      {/* crow's feet */}
      <path d="M38 33 Q36 31 34 30" stroke="#a06830" strokeWidth="0.8" fill="none" />
      <path d="M42 33 Q44 31 46 30" stroke="#a06830" strokeWidth="0.8" fill="none" />
      {/* nose */}
      <path d="M40 39 Q37 44 35 45 Q40 47 45 45 Q43 44 40 39Z" fill="#b87040" />
      {/* laugh lines */}
      <path d="M28 45 Q30 52 30 56" stroke="#a06830" strokeWidth="0.8" fill="none" />
      <path d="M52 45 Q50 52 50 56" stroke="#a06830" strokeWidth="0.8" fill="none" />
      {/* mouth */}
      <path d="M33 52 Q40 57 47 52" stroke={STROKE} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* collar/blazer */}
      <path d="M22 59 Q31 65 40 63 Q49 65 58 59 L62 80 L18 80Z" fill="#5c2020" />
      <path d="M40 63 L34 72 L40 69 L46 72 L40 63Z" fill="#f0e8d8" />
    </svg>
  );
}

function SeniorB({ size = 80 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* short white hair */}
      <path d="M21 35 Q22 14 40 13 Q58 14 59 35 Q55 22 40 21 Q25 22 21 35Z" fill="#e0dcd4" />
      {/* face */}
      <ellipse cx="40" cy="40" rx="18" ry="20" fill="#8b5e3c" stroke={STROKE} strokeWidth="1.5" />
      {/* ears */}
      <ellipse cx="22" cy="40" rx="3.5" ry="4.5" fill="#7a5030" stroke={STROKE} strokeWidth="1" />
      <ellipse cx="58" cy="40" rx="3.5" ry="4.5" fill="#7a5030" stroke={STROKE} strokeWidth="1" />
      {/* glasses */}
      <rect x="28" y="32" width="11" height="8" rx="2" stroke="#8b7050" strokeWidth="1.8" fill="rgba(200,190,170,0.2)" />
      <rect x="41" y="32" width="11" height="8" rx="2" stroke="#8b7050" strokeWidth="1.8" fill="rgba(200,190,170,0.2)" />
      <line x1="39" y1="36" x2="41" y2="36" stroke="#8b7050" strokeWidth="1.5" />
      <line x1="22" y1="35" x2="28" y2="35" stroke="#8b7050" strokeWidth="1.2" />
      <line x1="52" y1="35" x2="58" y2="35" stroke="#8b7050" strokeWidth="1.2" />
      {/* eyes */}
      <circle cx="33.5" cy="36" r="2.5" fill={STROKE} />
      <circle cx="46.5" cy="36" r="2.5" fill={STROKE} />
      <circle cx="34.5" cy="35.2" r="0.8" fill="white" />
      <circle cx="47.5" cy="35.2" r="0.8" fill="white" />
      {/* nose */}
      <path d="M40 41 Q38 45 36 46 Q40 47 44 46 Q42 45 40 41Z" fill="#6a4020" />
      {/* mouth */}
      <path d="M33 53 Q40 57 47 53" stroke={STROKE} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* wrinkle lines */}
      <path d="M28 47 Q29 53 30 57" stroke="#5a3818" strokeWidth="0.7" fill="none" />
      <path d="M52 47 Q51 53 50 57" stroke="#5a3818" strokeWidth="0.7" fill="none" />
      {/* collar */}
      <path d="M22 60 Q31 66 40 64 Q49 66 58 60 L62 80 L18 80Z" fill="#5c2020" />
      <path d="M40 64 L34 73 L40 70 L46 73 L40 64Z" fill="#f0e8d8" />
    </svg>
  );
}

function SeniorC({ size = 80 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* swept-back silver hair */}
      <path d="M18 36 Q19 12 40 10 Q61 12 62 36 Q58 16 40 15 Q22 16 18 36Z" fill="#b0a898" />
      <path d="M18 36 Q16 46 17 56 L21 54 Q20 44 21 36Z" fill="#b0a898" />
      {/* face */}
      <path d="M22 38 Q22 22 40 20 Q58 22 58 38 Q58 56 50 60 Q44 63 40 63 Q36 63 30 60 Q22 56 22 38Z" fill="#f0c89a" stroke={STROKE} strokeWidth="1.5" />
      {/* ears */}
      <ellipse cx="22" cy="40" rx="3.5" ry="4.5" fill="#e8bc88" stroke={STROKE} strokeWidth="1" />
      <ellipse cx="58" cy="40" rx="3.5" ry="4.5" fill="#e8bc88" stroke={STROKE} strokeWidth="1" />
      {/* eyes */}
      <ellipse cx="34" cy="36" rx="3" ry="2.8" fill={STROKE} />
      <ellipse cx="46" cy="36" rx="3" ry="2.8" fill={STROKE} />
      <circle cx="35" cy="35.2" r="0.9" fill="white" />
      <circle cx="47" cy="35.2" r="0.9" fill="white" />
      {/* strong brow */}
      <path d="M30 32 Q34 30 38 32" stroke={STROKE} strokeWidth="1.5" fill="none" />
      <path d="M42 32 Q46 30 50 32" stroke={STROKE} strokeWidth="1.5" fill="none" />
      {/* nose */}
      <path d="M40 40 Q37 46 35 47 Q40 48 45 47 Q43 46 40 40Z" fill="#c89060" />
      {/* laugh lines */}
      <path d="M27 46 Q28 54 29 58" stroke="#c09060" strokeWidth="0.8" fill="none" />
      <path d="M53 46 Q52 54 51 58" stroke="#c09060" strokeWidth="0.8" fill="none" />
      {/* mouth */}
      <path d="M33 53 Q40 58 47 53" stroke={STROKE} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* collar */}
      <path d="M22 63 Q31 68 40 66 Q49 68 58 63 L62 80 L18 80Z" fill="#5c2020" />
      <path d="M40 66 L34 75 L40 72 L46 75 L40 66Z" fill="#f0e8d8" />
    </svg>
  );
}

function SeniorD({ size = 80 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* wavy white hair */}
      <path d="M18 35 Q20 14 40 12 Q60 14 62 35" fill="#ddd8cc" />
      <path d="M18 35 Q22 28 26 32 Q30 28 34 32 Q38 28 42 32 Q46 28 50 32 Q54 28 58 32 Q60 28 62 35Z" fill="#ece8e0" />
      {/* face */}
      <ellipse cx="40" cy="40" rx="17" ry="19" fill="#c4a882" stroke={STROKE} strokeWidth="1.5" />
      {/* ears */}
      <ellipse cx="23" cy="40" rx="3.5" ry="4.5" fill="#b89870" stroke={STROKE} strokeWidth="1" />
      <ellipse cx="57" cy="40" rx="3.5" ry="4.5" fill="#b89870" stroke={STROKE} strokeWidth="1" />
      {/* eyes */}
      <ellipse cx="34" cy="36" rx="3" ry="2.8" fill={STROKE} />
      <ellipse cx="46" cy="36" rx="3" ry="2.8" fill={STROKE} />
      <circle cx="35" cy="35.2" r="0.9" fill="white" />
      <circle cx="47" cy="35.2" r="0.9" fill="white" />
      {/* nose */}
      <path d="M40 40 Q38 44 36 45 Q40 46 44 45 Q42 44 40 40Z" fill="#a07848" />
      {/* smile lines */}
      <path d="M29 46 Q30 52 31 56" stroke="#907040" strokeWidth="0.8" fill="none" />
      <path d="M51 46 Q50 52 49 56" stroke="#907040" strokeWidth="0.8" fill="none" />
      {/* warm smile */}
      <path d="M32 53 Q40 59 48 53" stroke={STROKE} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* collar */}
      <path d="M23 60 Q31 66 40 64 Q49 66 57 60 L61 80 L19 80Z" fill="#5c2020" />
      <path d="M40 64 L34 73 L40 70 L46 73 L40 64Z" fill="#f0e8d8" />
    </svg>
  );
}

export const FACES: Record<FaceId, (props: FaceProps) => React.ReactElement> = {
  "early-a": EarlyA, "early-b": EarlyB, "early-c": EarlyC, "early-d": EarlyD,
  "mid-a":   MidA,   "mid-b":   MidB,   "mid-c":   MidC,   "mid-d":   MidD,
  "senior-a":SeniorA,"senior-b":SeniorB,"senior-c":SeniorC,"senior-d":SeniorD,
};

export const ROLE_FACES: Record<string, FaceId[]> = {
  "early-career": ["early-a", "early-b", "early-c", "early-d"],
  "mid-career":   ["mid-a",   "mid-b",   "mid-c",   "mid-d"],
  "senior":       ["senior-a","senior-b","senior-c","senior-d"],
};

export function FaceAvatar({ faceId, size = 80, className = "" }: { faceId: FaceId; size?: number; className?: string }) {
  const Face = FACES[faceId];
  return <div className={className}><Face size={size} /></div>;
}
