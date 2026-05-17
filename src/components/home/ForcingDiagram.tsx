'use client';

import { useLanguage } from '@/components/LanguageContext';

/**
 * Earth System Forcing/Feedback Energy Landscape Diagram
 * Follows reference image design. Only changes: colors → earth-green palette, text sizes.
 * Curve: A (metastable) → B (unstable peak) → C (stable) → upturn
 */
export default function ForcingDiagram() {
  const { lang } = useLanguage();

  const labels = lang === 'zh' ? {
    freeEnergy: '自由能',
    forcing: '强迫',
    feedback: '反馈',
    metastable: '亚稳态',
    unstable: '不稳定',
    stable: '稳定',
    activationEnergy: '激活能',
  } : {
    freeEnergy: 'Free Energy',
    forcing: 'Forcing',
    feedback: 'Feedback',
    metastable: 'Metastable',
    unstable: 'Unstable',
    stable: 'Stable',
    activationEnergy: 'Activation Energy',
  };

  return (
    <div className="w-full max-w-[340px] md:max-w-[400px]">
      <svg viewBox="0 0 270 135" className="w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="forcingArrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0,0 6,3 0,6" fill="#D4A574" opacity="0.8" />
          </marker>
          <marker id="feedbackArrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0,0 6,3 0,6" fill="#74C69D" opacity="0.8" />
          </marker>
        </defs>

        {/* Y-axis: free energy */}
        <line x1="18" y1="8" x2="18" y2="118" stroke="#1B4332" strokeWidth="0.8" opacity="0.3" />
        <polygon points="18,8 15,14 21,14" fill="#1B4332" opacity="0.3" />
        <text x="9" y="16" fontSize="7" fill="#6B6B6B" fontFamily="Inter, system-ui, sans-serif"
          transform="rotate(-90, 9, 16)" textAnchor="middle">
          {labels.freeEnergy}
        </text>

        {/* X-axis */}
        <line x1="18" y1="118" x2="258" y2="118" stroke="#1B4332" strokeWidth="0.5" opacity="0.2" />

        {/* Energy landscape curve — with upturn after C */}
        <path d="M 18,50
          C 28,58, 40,76, 52,80
          C 60,82, 68,78, 78,62
          C 92,40, 106,24, 118,22
          C 130,20, 142,28, 155,52
          C 170,78, 182,98, 205,104
          C 222,108, 238,104, 248,90
          C 254,80, 258,68, 260,58"
          fill="none" stroke="#1B4332" strokeWidth="1.8" opacity="0.5" strokeLinecap="round" />

        {/* Subtle fill under curve */}
        <path d="M 18,50
          C 28,58, 40,76, 52,80
          C 60,82, 68,78, 78,62
          C 92,40, 106,24, 118,22
          C 130,20, 142,28, 155,52
          C 170,78, 182,98, 205,104
          C 222,108, 238,104, 248,90
          C 254,80, 258,68, 260,58
          L 260,118 L 18,118 Z"
          fill="#74C69D" opacity="0.05" />

        {/* --- Point A: metastable valley --- */}
        <circle cx="52" cy="80" r="3.5" fill="#2D6A4F" opacity="0.6" />
        <text x="36" y="76" fontSize="9" fill="#1B4332" fontFamily="Inter, system-ui, sans-serif"
          fontWeight="500" opacity="0.7">A</text>
        <text x="52" y="100" fontSize="7" fill="#2D6A4F" fontFamily="Inter, system-ui, sans-serif"
          textAnchor="middle" fontWeight="400">{labels.metastable}</text>

        {/* --- Forcing arrow: ABOVE the curve, diagonal from near A toward B --- */}
        {/* Start above the curve at A's area, end above B peak */}
        <line x1="42" y1="58" x2="110" y2="12"
          stroke="#D4A574" strokeWidth="1.5" opacity="0.7"
          markerEnd="url(#forcingArrowhead)" />
        {/* Label along the arrow, offset to upper-left so it doesn't cross curve */}
        <text x="64" y="24" fontSize="7.5" fill="#D4A574" fontFamily="Inter, system-ui, sans-serif"
          fontWeight="500" opacity="0.85"
          transform="rotate(-50, 64, 24)">{labels.forcing}</text>

        {/* --- Point B: unstable peak --- */}
        <circle cx="118" cy="22" r="2.5" fill="#1B4332" opacity="0.5" />
        <text x="118" y="12" fontSize="9" fill="#1B4332" fontFamily="Inter, system-ui, sans-serif"
          textAnchor="middle" fontWeight="500" opacity="0.6">B</text>
        {/* "unstable" label to the right of B, not overlapping curve */}
        <text x="134" y="18" fontSize="6.5" fill="#6B6B6B" fontFamily="Inter, system-ui, sans-serif"
          opacity="0.5">{labels.unstable}</text>

        {/* --- Activation energy: dashed line + vertical arrow, LEFT of curve --- */}
        {/* Horizontal dashed line at A's energy level */}
        <line x1="52" y1="80" x2="118" y2="80"
          stroke="#74C69D" strokeWidth="0.7" opacity="0.3" strokeDasharray="3,2" />
        {/* Vertical double-headed arrow at x=38 (clearly left of curve) */}
        <line x1="38" y1="80" x2="38" y2="22"
          stroke="#6B6B6B" strokeWidth="0.6" opacity="0.35" strokeDasharray="2,2" />
        <polygon points="38,22 35,26 41,26" fill="#6B6B6B" opacity="0.35" />
        <polygon points="38,80 35,76 41,76" fill="#6B6B6B" opacity="0.35" />
        <text x="28" y="54" fontSize="5.5" fill="#6B6B6B" fontFamily="Inter, system-ui, sans-serif"
          textAnchor="middle" opacity="0.5"
          transform="rotate(-90, 28, 54)">{labels.activationEnergy}</text>

        {/* --- Feedback arrow: from lower-left toward A, below the curve --- */}
        <line x1="24" y1="104" x2="44" y2="86"
          stroke="#74C69D" strokeWidth="1.5" opacity="0.65"
          markerEnd="url(#feedbackArrowhead)" />
        <text x="18" y="114" fontSize="7.5" fill="#74C69D" fontFamily="Inter, system-ui, sans-serif"
          fontWeight="500" opacity="0.85">{labels.feedback}</text>

        {/* --- Point C: stable deeper valley --- */}
        <circle cx="205" cy="104" r="3.5" fill="#2D6A4F" opacity="0.6" />
        <text x="216" y="100" fontSize="9" fill="#1B4332" fontFamily="Inter, system-ui, sans-serif"
          fontWeight="500" opacity="0.7">C</text>
        <text x="205" y="118" fontSize="7" fill="#2D6A4F" fontFamily="Inter, system-ui, sans-serif"
          textAnchor="middle" fontWeight="400">{labels.stable}</text>
      </svg>
    </div>
  );
}