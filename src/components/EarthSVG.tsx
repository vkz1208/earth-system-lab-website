interface EarthSVGProps {
  /** 'hero' = full detail with markers, particles & orbits; 'compact' = simplified for page headers */
  variant?: 'hero' | 'compact';
}

/**
 * Realistic continent outlines for the globe (viewBox 0 0 500 500, center 250 250, radius 190).
 * The globe is viewed from roughly the Atlantic (center longitude ~15°W, center latitude ~15°N).
 * Each continent is traced with enough points to be immediately recognizable.
 */
const Continents = ({ fill }: { fill: string }) => (
  <g>
    {/* North America - detailed outline with recognizable features */}
    <path d="M 97 107 L 100 99 Q 105 96, 112 93 L 120 91 Q 128 89, 138 88
      L 148 87 Q 158 87, 168 90 L 174 93 Q 178 96, 180 100
      L 182 108 Q 183 116, 182 124 L 180 132 Q 178 140, 176 148
      L 173 155 Q 170 162, 167 168 L 163 174 Q 160 178, 157 181
      L 152 184 Q 148 187, 145 188 L 140 190 Q 136 192, 133 194
      L 130 198 Q 127 202, 125 206 L 124 210 Q 122 214, 120 216
      L 122 210 Q 124 206, 126 202 L 128 197 Q 132 194, 135 192
      L 138 190 Q 141 188, 144 186 L 148 183 Q 150 181, 152 179
      L 118 188 Q 115 183, 112 178 L 108 170 Q 105 162, 103 155
      L 100 145 Q 98 138, 96 130 L 95 118 Q 94 112, 97 107 Z"
      fill={fill} />

    {/* Alaska */}
    <path d="M 85 108 Q 88 104, 93 102 L 97 107 Q 95 112, 94 118
      L 92 115 Q 89 112, 85 108 Z"
      fill={fill} />

    {/* Greenland */}
    <path d="M 170 80 Q 175 77, 182 77 L 188 79 Q 194 83, 196 90
      L 194 97 Q 190 102, 184 104 L 178 103 Q 173 100, 170 94
      L 168 88 Q 168 83, 170 80 Z"
      fill={fill} />

    {/* Central America */}
    <path d="M 122 214 Q 126 210, 130 212 L 132 218 Q 130 222, 126 220
      L 122 218 Q 120 216, 122 214 Z"
      fill={fill} />

    {/* South America - recognizable shape */}
    <path d="M 152 228 Q 158 224, 165 228 L 172 233 Q 178 238, 180 248
      L 178 260 Q 176 272, 173 284 L 168 296 Q 164 306, 160 312
      L 156 318 Q 152 324, 148 326 L 145 324 Q 142 320, 140 314
      L 137 304 Q 134 294, 133 284 L 134 272 Q 136 260, 139 248
      L 142 238 Q 146 232, 152 228 Z"
      fill={fill} />

    {/* Africa - with Horn of Africa and West African bulge */}
    <path d="M 256 155 Q 260 152, 265 153 L 272 156 Q 278 158, 283 158
      L 288 160 Q 294 165, 298 170 L 300 178 Q 303 186, 304 194
      L 302 204 Q 300 214, 296 224 L 290 236 Q 284 244, 278 248
      L 270 250 Q 264 248, 260 242 L 256 230 Q 252 218, 250 204
      L 250 190 Q 250 178, 252 168 L 254 160 Q 256 157, 256 155 Z"
      fill={fill} />

    {/* West African bulge */}
    <path d="M 256 155 Q 252 158, 248 162 L 245 170 Q 244 178, 246 185
      L 250 190 Q 252 186, 254 170 L 256 160 Q 256 157, 256 155 Z"
      fill={fill} />

    {/* Madagascar */}
    <path d="M 298 240 Q 302 236, 306 240 L 308 250 Q 306 260, 302 262
      L 298 260 Q 296 252, 298 240 Z"
      fill={fill} />

    {/* Europe - main body (France, Germany, Eastern Europe) */}
    <path d="M 256 128 Q 260 124, 268 122 L 276 125 Q 282 128, 286 132
      L 284 138 Q 280 142, 274 144 L 268 144 Q 262 142, 256 138
      L 254 134 Q 254 130, 256 128 Z"
      fill={fill} />

    {/* Iberian Peninsula */}
    <path d="M 246 134 Q 250 130, 256 132 L 258 138 Q 256 142, 250 142
      L 246 140 Q 244 136, 246 134 Z"
      fill={fill} />

    {/* Scandinavia */}
    <path d="M 270 96 Q 276 92, 282 94 L 286 102 Q 284 108, 280 112
      L 274 110 Q 270 104, 270 96 Z"
      fill={fill} />

    {/* British Isles */}
    <path d="M 244 114 Q 248 110, 252 112 L 254 118 Q 252 124, 248 124
      L 244 120 Q 243 116, 244 114 Z"
      fill={fill} />

    {/* Italian Peninsula */}
    <path d="M 268 140 Q 272 136, 276 138 L 278 144 Q 276 148, 272 148
      L 268 146 Q 266 142, 268 140 Z"
      fill={fill} />

    {/* Asia - large landmass at the edge of the globe */}
    <path d="M 290 100 Q 300 92, 315 88 L 330 90 Q 342 94, 350 100
      L 356 108 Q 360 118, 360 130 L 355 142 Q 350 152, 340 158
      L 330 162 Q 320 164, 310 162 L 300 158 Q 294 150, 290 140
      L 288 130 Q 286 118, 290 100 Z"
      fill={fill} />

    {/* Arabian Peninsula */}
    <path d="M 296 164 Q 300 160, 306 162 L 310 170 Q 308 178, 304 180
      L 298 178 Q 294 174, 296 164 Z"
      fill={fill} />

    {/* India - triangular subcontinent */}
    <path d="M 316 172 Q 320 168, 326 172 L 328 182 Q 326 192, 322 198
      L 316 202 Q 310 200, 308 192 L 310 182 Q 312 176, 316 172 Z"
      fill={fill} />

    {/* Southeast Asia mainland */}
    <path d="M 342 168 Q 346 164, 350 168 L 352 178 Q 350 188, 346 190
      L 340 188 Q 338 180, 342 168 Z"
      fill={fill} />

    {/* Japan */}
    <path d="M 370 118 Q 374 112, 378 116 L 380 126 Q 378 136, 374 142
      L 370 146 Q 366 142, 368 132 L 370 118 Z"
      fill={fill} />

    {/* Korean Peninsula */}
    <path d="M 362 134 Q 366 130, 370 134 L 370 140 Q 366 144, 362 142
      L 360 138 Q 360 136, 362 134 Z"
      fill={fill} />

    {/* Indonesia / Borneo */}
    <path d="M 348 198 Q 354 192, 362 196 L 366 204 Q 364 212, 356 216
      L 348 214 Q 344 208, 348 198 Z"
      fill={fill} />

    {/* Australia - recognizable shape */}
    <path d="M 372 264 Q 380 256, 390 260 L 396 268 Q 400 278, 398 288
      L 392 296 Q 384 300, 376 298 L 370 290 Q 366 280, 368 270
      L 370 266 Q 372 264, 372 264 Z"
      fill={fill} />

    {/* New Zealand */}
    <path d="M 400 296 Q 404 290, 408 294 L 408 304 Q 406 310, 400 306
      L 398 300 Q 398 298, 400 296 Z"
      fill={fill} />
  </g>
);

/** Research data markers on continents - matching reference image 1 style */
const DataMarkers = () => (
  <g>
    {/* North America markers - clustered */}
    <circle cx="142" cy="140" r="3.5" fill="#2D6A4F" opacity="0.35">
      <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
      <animate attributeName="r" values="2.5;4.5;2.5" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="142" cy="140" r="6" fill="none" stroke="#74C69D" strokeWidth="0.5" opacity="0.25" />
    
    <circle cx="155" cy="155" r="3" fill="#2D6A4F" opacity="0.4">
      <animate attributeName="opacity" values="0.25;0.55;0.25" dur="3.5s" repeatCount="indefinite" />
      <animate attributeName="r" values="2;4;2" dur="3.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="155" cy="155" r="5.5" fill="none" stroke="#74C69D" strokeWidth="0.4" opacity="0.2" />
    
    <circle cx="130" cy="125" r="2.5" fill="#74C69D" opacity="0.45">
      <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
      <animate attributeName="r" values="1.5;3.5;1.5" dur="4s" repeatCount="indefinite" />
    </circle>
    
    <circle cx="168" cy="145" r="2" fill="#2D6A4F" opacity="0.3">
      <animate attributeName="opacity" values="0.15;0.45;0.15" dur="5s" repeatCount="indefinite" />
    </circle>
    
    <circle cx="120" cy="165" r="2.5" fill="#74C69D" opacity="0.35">
      <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3.8s" repeatCount="indefinite" />
      <animate attributeName="r" values="1.8;3.5;1.8" dur="3.8s" repeatCount="indefinite" />
    </circle>
    
    <circle cx="148" cy="170" r="3" fill="#2D6A4F" opacity="0.3">
      <animate attributeName="opacity" values="0.2;0.45;0.2" dur="4.2s" repeatCount="indefinite" />
    </circle>
    <circle cx="148" cy="170" r="5" fill="none" stroke="#74C69D" strokeWidth="0.4" opacity="0.15" />

    {/* South America markers */}
    <circle cx="165" cy="260" r="3.5" fill="#2D6A4F" opacity="0.35">
      <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3.2s" repeatCount="indefinite" />
      <animate attributeName="r" values="2.5;4.5;2.5" dur="3.2s" repeatCount="indefinite" />
    </circle>
    <circle cx="165" cy="260" r="6" fill="none" stroke="#74C69D" strokeWidth="0.5" opacity="0.2" />
    
    <circle cx="155" cy="290" r="2" fill="#74C69D" opacity="0.3">
      <animate attributeName="opacity" values="0.15;0.4;0.15" dur="4.5s" repeatCount="indefinite" />
    </circle>

    {/* Europe markers */}
    <circle cx="268" cy="128" r="3" fill="#2D6A4F" opacity="0.4">
      <animate attributeName="opacity" values="0.25;0.55;0.25" dur="3s" repeatCount="indefinite" />
      <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="268" cy="128" r="5.5" fill="none" stroke="#74C69D" strokeWidth="0.4" opacity="0.2" />
    
    <circle cx="278" cy="135" r="2.5" fill="#74C69D" opacity="0.35">
      <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3.6s" repeatCount="indefinite" />
      <animate attributeName="r" values="1.5;3.5;1.5" dur="3.6s" repeatCount="indefinite" />
    </circle>
    
    <circle cx="260" cy="140" r="2" fill="#2D6A4F" opacity="0.3">
      <animate attributeName="opacity" values="0.15;0.4;0.15" dur="4.8s" repeatCount="indefinite" />
    </circle>

    {/* Africa markers */}
    <circle cx="270" cy="210" r="2.5" fill="#74C69D" opacity="0.35">
      <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3.4s" repeatCount="indefinite" />
      <animate attributeName="r" values="1.8;3.5;1.8" dur="3.4s" repeatCount="indefinite" />
    </circle>
    
    <circle cx="296" cy="180" r="2" fill="#2D6A4F" opacity="0.25">
      <animate attributeName="opacity" values="0.15;0.35;0.15" dur="5s" repeatCount="indefinite" />
    </circle>

    {/* Asia markers - research sites */}
    <circle cx="335" cy="140" r="3" fill="#2D6A4F" opacity="0.35">
      <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3.5s" repeatCount="indefinite" />
      <animate attributeName="r" values="2;4;2" dur="3.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="335" cy="140" r="5.5" fill="none" stroke="#74C69D" strokeWidth="0.4" opacity="0.18" />
    
    <circle cx="320" cy="180" r="2.5" fill="#74C69D" opacity="0.3">
      <animate attributeName="opacity" values="0.15;0.45;0.15" dur="4s" repeatCount="indefinite" />
      <animate attributeName="r" values="1.5;3.5;1.5" dur="4s" repeatCount="indefinite" />
    </circle>
    
    <circle cx="350" cy="170" r="2" fill="#2D6A4F" opacity="0.25">
      <animate attributeName="opacity" values="0.15;0.35;0.15" dur="4.5s" repeatCount="indefinite" />
    </circle>

    {/* Australia marker */}
    <circle cx="385" cy="275" r="2.5" fill="#74C69D" opacity="0.3">
      <animate attributeName="opacity" values="0.15;0.45;0.15" dur="3.8s" repeatCount="indefinite" />
      <animate attributeName="r" values="1.5;3.5;1.5" dur="3.8s" repeatCount="indefinite" />
    </circle>
  </g>
);

/** Enhanced orbit rings with more particles - hero only */
const HeroOrbits = () => (
  <>
    {/* Orbit ring 1 - primary particles, more visible */}
    <g className="animate-earth-rotate" style={{transformOrigin: '250px 250px', animationDuration: '45s'}}>
      <ellipse cx="250" cy="250" rx="230" ry="88" fill="none" stroke="#74C69D" strokeWidth="0.5" opacity="0.22" transform="rotate(-15 250 250)" />
      <circle cx="22" cy="250" r="3" fill="#74C69D" opacity="0.6">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="r" values="2;4;2" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="478" cy="250" r="2.5" fill="#74C69D" opacity="0.5">
        <animate attributeName="opacity" values="0.25;0.7;0.25" dur="3s" repeatCount="indefinite" />
        <animate attributeName="r" values="1.5;3.5;1.5" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="250" cy="162" r="2.8" fill="#2D6A4F" opacity="0.5">
        <animate attributeName="opacity" values="0.25;0.65;0.25" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="r" values="1.8;3.5;1.8" dur="2.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="250" cy="338" r="2.5" fill="#74C69D" opacity="0.4">
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.5s" repeatCount="indefinite" />
        <animate attributeName="r" values="1.5;3;1.5" dur="3.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="120" cy="200" r="2" fill="#74C69D" opacity="0.35">
        <animate attributeName="opacity" values="0.15;0.5;0.15" dur="4s" repeatCount="indefinite" />
        <animate attributeName="r" values="1.2;2.8;1.2" dur="4s" repeatCount="indefinite" />
      </circle>
    </g>

    {/* Orbit ring 2 - counter rotation, more visible */}
    <g className="animate-earth-rotate" style={{transformOrigin: '250px 250px', animationDuration: '70s', animationDirection: 'reverse'}}>
      <ellipse cx="250" cy="250" rx="220" ry="76" fill="none" stroke="#2D6A4F" strokeWidth="0.4" opacity="0.18" transform="rotate(25 250 250)" />
      <circle cx="35" cy="260" r="2.5" fill="#74C69D" opacity="0.5">
        <animate attributeName="opacity" values="0.25;0.65;0.25" dur="3.2s" repeatCount="indefinite" />
        <animate attributeName="r" values="1.5;3.5;1.5" dur="3.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="465" cy="240" r="2.2" fill="#2D6A4F" opacity="0.4">
        <animate attributeName="opacity" values="0.2;0.55;0.2" dur="3.8s" repeatCount="indefinite" />
        <animate attributeName="r" values="1.2;3;1.2" dur="3.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="260" cy="174" r="2.5" fill="#74C69D" opacity="0.45">
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
        <animate attributeName="r" values="1.5;3.2;1.5" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="240" cy="326" r="2" fill="#2D6A4F" opacity="0.35">
        <animate attributeName="opacity" values="0.15;0.5;0.15" dur="4.5s" repeatCount="indefinite" />
        <animate attributeName="r" values="1;2.5;1" dur="4.5s" repeatCount="indefinite" />
      </circle>
    </g>

    {/* Orbit ring 3 - tilted */}
    <g className="animate-earth-rotate" style={{transformOrigin: '250px 250px', animationDuration: '120s'}}>
      <ellipse cx="250" cy="250" rx="240" ry="100" fill="none" stroke="#74C69D" strokeWidth="0.35" opacity="0.15" transform="rotate(40 250 250)" />
      <circle cx="18" cy="245" r="2" fill="#74C69D" opacity="0.4">
        <animate attributeName="opacity" values="0.2;0.55;0.2" dur="5s" repeatCount="indefinite" />
        <animate attributeName="r" values="1;3;1" dur="5s" repeatCount="indefinite" />
      </circle>
      <circle cx="482" cy="255" r="2.2" fill="#2D6A4F" opacity="0.35">
        <animate attributeName="opacity" values="0.15;0.5;0.15" dur="5.5s" repeatCount="indefinite" />
        <animate attributeName="r" values="1;2.8;1" dur="5.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="150" r="1.8" fill="#74C69D" opacity="0.3">
        <animate attributeName="opacity" values="0.15;0.45;0.15" dur="6s" repeatCount="indefinite" />
        <animate attributeName="r" values="1;2.5;1" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle cx="300" cy="350" r="1.5" fill="#2D6A4F" opacity="0.25">
        <animate attributeName="opacity" values="0.1;0.4;0.1" dur="7s" repeatCount="indefinite" />
        <animate attributeName="r" values="0.8;2;0.8" dur="7s" repeatCount="indefinite" />
      </circle>
    </g>

    {/* Orbit ring 4 - extra layer for more visual depth */}
    <g className="animate-earth-rotate" style={{transformOrigin: '250px 250px', animationDuration: '180s', animationDirection: 'reverse'}}>
      <ellipse cx="250" cy="250" rx="245" ry="110" fill="none" stroke="#74C69D" strokeWidth="0.25" opacity="0.1" transform="rotate(-10 250 250)" />
      <circle cx="10" cy="255" r="1.5" fill="#2D6A4F" opacity="0.3">
        <animate attributeName="opacity" values="0.1;0.4;0.1" dur="6s" repeatCount="indefinite" />
        <animate attributeName="r" values="0.8;2;0.8" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle cx="490" cy="245" r="1.8" fill="#74C69D" opacity="0.25">
        <animate attributeName="opacity" values="0.1;0.35;0.1" dur="8s" repeatCount="indefinite" />
        <animate attributeName="r" values="1;2.5;1" dur="8s" repeatCount="indefinite" />
      </circle>
      <circle cx="180" cy="340" r="1.2" fill="#74C69D" opacity="0.2">
        <animate attributeName="opacity" values="0.08;0.3;0.08" dur="7s" repeatCount="indefinite" />
      </circle>
      <circle cx="320" cy="160" r="1.5" fill="#2D6A4F" opacity="0.2">
        <animate attributeName="opacity" values="0.08;0.35;0.08" dur="6.5s" repeatCount="indefinite" />
        <animate attributeName="r" values="0.8;2;0.8" dur="6.5s" repeatCount="indefinite" />
      </circle>
    </g>
  </>
);

/** Enhanced floating scattered particles - hero only, more particles and more visible */
const HeroParticles = () => (
  <>
    {/* Scattered around the globe - more particles, higher visibility */}
    <circle cx="160" cy="80" r="1.5" fill="#74C69D" opacity="0.35">
      <animate attributeName="opacity" values="0.15;0.5;0.15" dur="4s" repeatCount="indefinite" />
      <animate attributeName="r" values="1;2.5;1" dur="4s" repeatCount="indefinite" />
    </circle>
    <circle cx="380" cy="70" r="2" fill="#2D6A4F" opacity="0.25">
      <animate attributeName="opacity" values="0.12;0.4;0.12" dur="5s" repeatCount="indefinite" />
      <animate attributeName="r" values="1.2;2.8;1.2" dur="5s" repeatCount="indefinite" />
    </circle>
    <circle cx="420" cy="180" r="1.5" fill="#74C69D" opacity="0.35">
      <animate attributeName="opacity" values="0.2;0.55;0.2" dur="3.5s" repeatCount="indefinite" />
      <animate attributeName="r" values="1;2.5;1" dur="3.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="440" cy="280" r="2" fill="#2D6A4F" opacity="0.25">
      <animate attributeName="opacity" values="0.12;0.45;0.12" dur="4.5s" repeatCount="indefinite" />
      <animate attributeName="r" values="1;3;1" dur="4.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="120" cy="380" r="1.5" fill="#74C69D" opacity="0.2">
      <animate attributeName="opacity" values="0.1;0.35;0.1" dur="6s" repeatCount="indefinite" />
      <animate attributeName="r" values="0.8;2;0.8" dur="6s" repeatCount="indefinite" />
    </circle>
    <circle cx="360" cy="370" r="1.8" fill="#74C69D" opacity="0.3">
      <animate attributeName="opacity" values="0.15;0.45;0.15" dur="4s" repeatCount="indefinite" />
      <animate attributeName="r" values="1;2.5;1" dur="4s" repeatCount="indefinite" />
    </circle>
    <circle cx="80" cy="220" r="1.5" fill="#2D6A4F" opacity="0.2">
      <animate attributeName="opacity" values="0.1;0.35;0.1" dur="5.5s" repeatCount="indefinite" />
      <animate attributeName="r" values="0.8;2;0.8" dur="5.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="430" cy="130" r="1.8" fill="#74C69D" opacity="0.25">
      <animate attributeName="opacity" values="0.12;0.4;0.12" dur="4.5s" repeatCount="indefinite" />
      <animate attributeName="r" values="1;2.5;1" dur="4.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="300" cy="60" r="1.2" fill="#2D6A4F" opacity="0.2">
      <animate attributeName="opacity" values="0.08;0.3;0.08" dur="6s" repeatCount="indefinite" />
      <animate attributeName="r" values="0.6;1.8;0.6" dur="6s" repeatCount="indefinite" />
    </circle>
    <circle cx="190" cy="420" r="1.5" fill="#74C69D" opacity="0.18">
      <animate attributeName="opacity" values="0.08;0.3;0.08" dur="7s" repeatCount="indefinite" />
      <animate attributeName="r" values="0.8;2;0.8" dur="7s" repeatCount="indefinite" />
    </circle>
    <circle cx="450" cy="380" r="1.2" fill="#2D6A4F" opacity="0.15">
      <animate attributeName="opacity" values="0.06;0.25;0.06" dur="8s" repeatCount="indefinite" />
      <animate attributeName="r" values="0.6;1.5;0.6" dur="8s" repeatCount="indefinite" />
    </circle>
    <circle cx="70" cy="140" r="1.8" fill="#74C69D" opacity="0.25">
      <animate attributeName="opacity" values="0.12;0.4;0.12" dur="5s" repeatCount="indefinite" />
      <animate attributeName="r" values="1;2.5;1" dur="5s" repeatCount="indefinite" />
    </circle>
    <circle cx="60" cy="320" r="1.2" fill="#2D6A4F" opacity="0.18">
      <animate attributeName="opacity" values="0.08;0.3;0.08" dur="6.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="200" cy="50" r="1.5" fill="#74C69D" opacity="0.2">
      <animate attributeName="opacity" values="0.1;0.35;0.1" dur="5.2s" repeatCount="indefinite" />
      <animate attributeName="r" values="0.8;2.2;0.8" dur="5.2s" repeatCount="indefinite" />
    </circle>
    <circle cx="340" cy="430" r="1" fill="#2D6A4F" opacity="0.12">
      <animate attributeName="opacity" values="0.06;0.22;0.06" dur="9s" repeatCount="indefinite" />
    </circle>
    <circle cx="460" cy="220" r="1.5" fill="#74C69D" opacity="0.22">
      <animate attributeName="opacity" values="0.1;0.38;0.1" dur="4.8s" repeatCount="indefinite" />
      <animate attributeName="r" values="0.8;2.2;0.8" dur="4.8s" repeatCount="indefinite" />
    </circle>
  </>
);

export default function EarthSVG({ variant = 'hero' }: EarthSVGProps) {
  const isHero = variant === 'hero';

  // Gradient IDs must be unique per SVG instance
  const globeGrad = isHero ? 'heroGlobeGrad' : 'pageGlobeGrad';
  const landGrad = isHero ? 'heroLandGrad' : 'pageLandGrad';
  const oceanGrad = isHero ? 'heroOceanGrad' : undefined;
  const glowFilter = isHero ? 'heroGlow' : undefined;
  const clipId = isHero ? 'heroClip' : 'pageClip';

  // Land fill color - hero uses gradient, compact uses solid
  const landFill = isHero ? `url(#${landGrad})` : '#74C69D';

  return (
    <svg viewBox="0 0 500 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Clip path for globe boundary */}
        <clipPath id={clipId}>
          <circle cx="250" cy="250" r="190" />
        </clipPath>

        {/* Globe gradient */}
        <radialGradient id={globeGrad} cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#2D6A4F" stopOpacity={isHero ? 0.12 : 0.06} />
          <stop offset="50%" stopColor="#1B4332" stopOpacity={isHero ? 0.06 : 0.04} />
          <stop offset="100%" stopColor="#1B4332" stopOpacity={isHero ? 0.2 : 0.1} />
        </radialGradient>

        {/* Land gradient */}
        <radialGradient id={landGrad} cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#74C69D" stopOpacity={isHero ? 0.75 : 0.45} />
          <stop offset="100%" stopColor="#2D6A4F" stopOpacity={isHero ? 0.45 : 0.25} />
        </radialGradient>

        {isHero && (
          <radialGradient id={oceanGrad} cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#B7E4C7" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#2D6A4F" stopOpacity="0.04" />
          </radialGradient>
        )}

        {isHero && (
          <filter id={glowFilter} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      {/* Atmosphere glow rings - hero only */}
      {isHero && (
        <>
          <circle cx="250" cy="250" r="242" fill="none" stroke="#74C69D" strokeWidth="0.5" opacity="0.22" className="animate-pulse-soft" />
          <circle cx="250" cy="250" r="222" fill="none" stroke="#74C69D" strokeWidth="0.7" opacity="0.28" />
        </>
      )}

      {/* Globe ocean fill */}
      {isHero && <circle cx="250" cy="250" r="190" fill={`url(#${oceanGrad})`} />}
      <circle cx="250" cy="250" r="190" fill={`url(#${globeGrad})`} />

      {/* Globe outline */}
      <circle cx="250" cy="250" r="190" fill="none" stroke="#1B4332" strokeWidth="1.2" opacity={isHero ? 0.4 : 0.15} />

      {/* Latitude lines */}
      {isHero ? (
        <>
          <ellipse cx="250" cy="155" rx="140" ry="14" fill="none" stroke="#2D6A4F" strokeWidth="0.4" opacity="0.15" clipPath={`url(#${clipId})`} />
          <ellipse cx="250" cy="190" rx="172" ry="20" fill="none" stroke="#2D6A4F" strokeWidth="0.4" opacity="0.12" clipPath={`url(#${clipId})`} />
          <ellipse cx="250" cy="250" rx="190" ry="24" fill="none" stroke="#2D6A4F" strokeWidth="0.5" opacity="0.18" clipPath={`url(#${clipId})`} />
          <ellipse cx="250" cy="310" rx="172" ry="20" fill="none" stroke="#2D6A4F" strokeWidth="0.4" opacity="0.12" clipPath={`url(#${clipId})`} />
          <ellipse cx="250" cy="345" rx="140" ry="14" fill="none" stroke="#2D6A4F" strokeWidth="0.4" opacity="0.15" clipPath={`url(#${clipId})`} />
        </>
      ) : (
        <ellipse cx="250" cy="250" rx="190" ry="22" fill="none" stroke="#2D6A4F" strokeWidth="0.4" opacity="0.08" clipPath={`url(#${clipId})`} />
      )}

      {/* Longitude lines */}
      {isHero ? (
        <>
          <ellipse cx="250" cy="250" rx="24" ry="190" fill="none" stroke="#2D6A4F" strokeWidth="0.4" opacity="0.12" clipPath={`url(#${clipId})`} />
          <ellipse cx="250" cy="250" rx="95" ry="190" fill="none" stroke="#2D6A4F" strokeWidth="0.35" opacity="0.1" transform="rotate(-20 250 250)" clipPath={`url(#${clipId})`} />
          <ellipse cx="250" cy="250" rx="95" ry="190" fill="none" stroke="#2D6A4F" strokeWidth="0.35" opacity="0.1" transform="rotate(20 250 250)" clipPath={`url(#${clipId})`} />
        </>
      ) : (
        <ellipse cx="250" cy="250" rx="22" ry="190" fill="none" stroke="#2D6A4F" strokeWidth="0.4" opacity="0.08" clipPath={`url(#${clipId})`} />
      )}

      {/* Continents - clipped to globe */}
      <g clipPath={`url(#${clipId})`}>
        <Continents fill={landFill} />
      </g>

      {/* Data markers on continents - hero only */}
      {isHero && <DataMarkers />}

      {/* Orbits and particles - hero only */}
      {isHero && <HeroOrbits />}
      {isHero && <HeroParticles />}

      {/* Subtle atmosphere glow */}
      <circle cx="250" cy="250" r="195" fill="none" stroke="#74C69D" strokeWidth={isHero ? 4 : 2} opacity="0.06" filter={isHero ? `url(#${glowFilter})` : undefined} />
    </svg>
  );
}