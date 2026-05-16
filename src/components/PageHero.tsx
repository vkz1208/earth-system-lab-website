interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-earth-green-glow/15 mb-8 md:mb-12">
      {/* Background Earth - compact decorative version */}
      <div className="absolute right-[-60px] md:right-[-40px] top-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[300px] md:h-[300px] lg:w-[360px] lg:h-[360px] pointer-events-none opacity-45">
        <svg viewBox="0 0 500 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="pageGlobeGrad" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#2D6A4F" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#1B4332" stopOpacity="0.1" />
            </radialGradient>
            <radialGradient id="pageLandGrad" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#74C69D" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2D6A4F" stopOpacity="0.2" />
            </radialGradient>
          </defs>

          {/* Globe base */}
          <circle cx="250" cy="250" r="190" fill="url(#pageGlobeGrad)" />
          <circle cx="250" cy="250" r="190" fill="none" stroke="#1B4332" strokeWidth="1" opacity="0.15" />

          {/* Simplified continents */}
          <path d="M115 128 C118 120 125 112 134 108 C140 105 148 104 155 106 C162 108 168 112 174 118 C178 122 182 128 185 135 C188 142 189 150 188 158 C187 165 184 172 180 178 C176 183 172 188 168 192 C163 196 158 200 154 204 C150 207 146 210 142 210 C138 209 135 206 133 202 C130 196 128 190 127 184 C126 178 126 172 125 166 C124 160 123 154 122 148 C121 142 120 136 118 130 C117 128 116 126 115 128 Z" fill="url(#pageLandGrad)" />
          <path d="M160 230 C166 224 174 226 180 234 C184 242 186 252 185 264 C184 276 181 288 176 300 C172 308 167 314 162 314 C158 312 155 306 153 298 C151 288 150 278 151 266 C152 254 154 244 156 236 C158 232 159 230 160 230 Z" fill="url(#pageLandGrad)" />
          <path d="M266 138 C276 130 290 132 300 142 C308 152 312 166 312 182 C312 198 308 214 302 228 C296 238 288 244 278 242 C270 240 264 230 262 216 C260 200 260 184 262 168 C263 154 264 144 266 138 Z" fill="url(#pageLandGrad)" />
          <path d="M290 92 C306 80 326 78 344 84 C358 90 368 102 370 118 C372 132 366 146 354 156 C342 164 326 168 310 164 C298 160 290 150 288 138 C286 124 287 108 290 92 Z" fill="url(#pageLandGrad)" />
          <path d="M352 258 C364 248 380 250 390 262 C398 274 396 290 386 300 C376 308 362 308 354 298 C346 288 346 270 352 258 Z" fill="url(#pageLandGrad)" />

          {/* Latitude & longitude */}
          <ellipse cx="250" cy="250" rx="190" ry="22" fill="none" stroke="#2D6A4F" strokeWidth="0.4" opacity="0.08" />
          <ellipse cx="250" cy="250" rx="22" ry="190" fill="none" stroke="#2D6A4F" strokeWidth="0.4" opacity="0.08" />

          {/* Subtle atmosphere glow */}
          <circle cx="250" cy="250" r="194" fill="none" stroke="#74C69D" strokeWidth="2" opacity="0.04" />
        </svg>
      </div>

      <div className="section-container pt-16 pb-6 md:pt-20 md:pb-8 relative z-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-earth-green-deep leading-tight max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-base md:text-lg text-neutral-text-secondary max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
