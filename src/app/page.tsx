'use client';

import { useLanguage } from '@/components/LanguageContext';
import PageHero from '@/components/PageHero';
import researchData from '@/data/research.json';
import teamData from '@/data/team.json';

export default function Home() {
  const { lang, t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-earth-green-glow/20">
        {/* Background Earth Decoration */}
        <div className="absolute right-0 top-40 md:top-16 lg:top-0 w-[500px] h-[500px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px] pointer-events-none animate-earth-float animate-earth-breathe" style={{animationDuration: '12s, 6s'}}>
          <svg viewBox="0 0 500 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="bgGlobeGrad" cx="40%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#2D6A4F" stopOpacity="0.12" />
                <stop offset="50%" stopColor="#1B4332" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#1B4332" stopOpacity="0.18" />
              </radialGradient>
              <radialGradient id="bgLandGrad" cx="50%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#74C69D" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#2D6A4F" stopOpacity="0.4" />
              </radialGradient>
              <radialGradient id="bgOceanGrad" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#B7E4C7" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#2D6A4F" stopOpacity="0.03" />
              </radialGradient>
              {/* Glow filter for atmosphere */}
              <filter id="bgGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Atmosphere glow rings */}
            <circle cx="250" cy="250" r="240" fill="none" stroke="#74C69D" strokeWidth="0.3" opacity="0.15" className="animate-pulse-soft" />
            <circle cx="250" cy="250" r="220" fill="none" stroke="#74C69D" strokeWidth="0.5" opacity="0.2" />

            {/* Globe ocean fill */}
            <circle cx="250" cy="250" r="190" fill="url(#bgOceanGrad)" />
            <circle cx="250" cy="250" r="190" fill="url(#bgGlobeGrad)" />

            {/* Globe outline */}
            <circle cx="250" cy="250" r="190" fill="none" stroke="#1B4332" strokeWidth="1" opacity="0.35" />

            {/* Latitude lines */}
            <ellipse cx="250" cy="155" rx="140" ry="12" fill="none" stroke="#2D6A4F" strokeWidth="0.3" opacity="0.12" />
            <ellipse cx="250" cy="190" rx="172" ry="18" fill="none" stroke="#2D6A4F" strokeWidth="0.3" opacity="0.1" />
            <ellipse cx="250" cy="250" rx="190" ry="22" fill="none" stroke="#2D6A4F" strokeWidth="0.4" opacity="0.15" />
            <ellipse cx="250" cy="310" rx="172" ry="18" fill="none" stroke="#2D6A4F" strokeWidth="0.3" opacity="0.1" />
            <ellipse cx="250" cy="345" rx="140" ry="12" fill="none" stroke="#2D6A4F" strokeWidth="0.3" opacity="0.12" />

            {/* Longitude lines */}
            <ellipse cx="250" cy="250" rx="22" ry="190" fill="none" stroke="#2D6A4F" strokeWidth="0.3" opacity="0.12" />
            <ellipse cx="250" cy="250" rx="95" ry="190" fill="none" stroke="#2D6A4F" strokeWidth="0.3" opacity="0.08" transform="rotate(-20 250 250)" />
            <ellipse cx="250" cy="250" rx="95" ry="190" fill="none" stroke="#2D6A4F" strokeWidth="0.3" opacity="0.08" transform="rotate(20 250 250)" />

            {/* === Continents - realistic geographic shapes === */}

            {/* North America */}
            <path d="M115 128 C118 120 125 112 134 108 C140 105 148 104 155 106
              C162 108 168 112 174 118 C178 122 182 128 185 135
              C188 142 189 150 188 158 C187 165 184 172 180 178
              C176 183 172 188 168 192 C163 196 158 200 154 204
              C150 207 146 210 142 210 C138 209 135 206 133 202
              C130 196 128 190 127 184 C126 178 126 172 125 166
              C124 160 123 154 122 148 C121 142 120 136 118 130
              C117 128 116 126 115 128 Z"
              fill="url(#bgLandGrad)" />

            {/* Alaska */}
            <path d="M100 112 C104 108 110 106 116 108 C120 110 122 114 120 118
              C118 122 114 124 108 122 C104 120 100 116 100 112 Z"
              fill="url(#bgLandGrad)" />

            {/* Greenland */}
            <path d="M168 78 C175 74 184 74 192 78 C198 82 202 90 200 98
              C198 106 192 112 184 114 C176 114 170 108 168 100
              C166 92 166 84 168 78 Z"
              fill="url(#bgLandGrad)" />

            {/* Central America */}
            <path d="M144 210 C148 206 154 206 158 210 C160 214 158 220 155 226
              C152 230 148 228 146 224 C144 220 142 214 144 210 Z"
              fill="url(#bgLandGrad)" />

            {/* South America */}
            <path d="M160 230 C166 224 174 226 180 234 C184 242 186 252 185 264
              C184 276 181 288 176 300 C172 308 167 314 162 314
              C158 312 155 306 153 298 C151 288 150 278 151 266
              C152 254 154 244 156 236 C158 232 159 230 160 230 Z"
              fill="url(#bgLandGrad)" />

            {/* Europe - Iberian Peninsula */}
            <path d="M248 126 C252 122 258 122 262 126 C264 130 262 136 258 138
              C254 140 250 138 248 134 C246 130 247 128 248 126 Z"
              fill="url(#bgLandGrad)" />

            {/* Europe - main body */}
            <path d="M258 108 C264 102 274 100 282 104 C288 108 292 116 290 124
              C288 130 282 136 274 138 C268 140 262 138 258 132
              C254 126 254 116 258 108 Z"
              fill="url(#bgLandGrad)" />

            {/* Scandinavia */}
            <path d="M268 78 C274 74 280 76 284 82 C286 88 284 96 280 100
              C276 104 270 102 268 96 C266 90 266 82 268 78 Z"
              fill="url(#bgLandGrad)" />

            {/* UK & Ireland */}
            <path d="M244 102 C248 98 254 98 256 104 C257 110 254 116 250 116
              C246 116 243 110 244 104 Z"
              fill="url(#bgLandGrad)" />

            {/* Africa */}
            <path d="M266 138 C276 130 290 132 300 142 C308 152 312 166 312 182
              C312 198 308 214 302 228 C296 238 288 244 278 242
              C270 240 264 230 262 216 C260 200 260 184 262 168
              C263 154 264 144 266 138 Z"
              fill="url(#bgLandGrad)" />

            {/* Madagascar */}
            <path d="M298 232 C302 228 306 230 308 236 C309 242 306 250 302 252
              C298 252 296 248 296 242 C296 238 297 234 298 232 Z"
              fill="url(#bgLandGrad)" />

            {/* Asia - main body */}
            <path d="M290 92 C306 80 326 78 344 84 C358 90 368 102 370 118
              C372 132 366 146 354 156 C342 164 326 168 310 164
              C298 160 290 150 288 138 C286 124 287 108 290 92 Z"
              fill="url(#bgLandGrad)" />

            {/* India */}
            <path d="M312 168 C320 162 328 166 330 178 C332 190 328 204 320 210
              C314 214 308 208 308 198 C306 186 308 174 312 168 Z"
              fill="url(#bgLandGrad)" />

            {/* Southeast Asia - Malay Peninsula */}
            <path d="M342 172 C346 168 350 170 352 178 C353 184 350 190 346 190
              C342 190 340 184 342 178 Z"
              fill="url(#bgLandGrad)" />

            {/* Indonesia / Borneo */}
            <path d="M348 196 C354 190 362 192 366 200 C368 208 364 216 356 218
              C348 218 344 212 346 204 Z"
              fill="url(#bgLandGrad)" />

            {/* Japan */}
            <path d="M372 118 C376 112 380 114 382 122 C383 130 380 140 376 146
              C372 150 368 146 370 138 C371 130 371 124 372 118 Z"
              fill="url(#bgLandGrad)" />

            {/* Korean Peninsula */}
            <path d="M364 134 C368 130 372 132 372 138 C372 144 368 148 364 146
              C360 144 360 138 364 134 Z"
              fill="url(#bgLandGrad)" />

            {/* Australia */}
            <path d="M352 258 C364 248 380 250 390 262 C398 274 396 290 386 300
              C376 308 362 308 354 298 C346 288 346 270 352 258 Z"
              fill="url(#bgLandGrad)" />

            {/* New Zealand */}
            <path d="M396 296 C400 292 404 296 404 304 C403 310 398 314 394 310
              C391 306 393 300 396 296 Z"
              fill="url(#bgLandGrad)" />

            {/* === Orbiting Particle Rings === */}

            {/* Orbit ring 1 - particles */}
            <g className="animate-earth-rotate" style={{transformOrigin: '250px 250px', animationDuration: '60s'}}>
              <ellipse cx="250" cy="250" rx="228" ry="85" fill="none" stroke="#74C69D" strokeWidth="0.3" opacity="0.12" transform="rotate(-15 250 250)" />
              <circle cx="22" cy="250" r="2" fill="#74C69D" opacity="0.5">
                <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3s" repeatCount="indefinite" />
                <animate attributeName="r" values="1.5;2.8;1.5" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="478" cy="250" r="1.5" fill="#74C69D" opacity="0.35">
                <animate attributeName="opacity" values="0.15;0.5;0.15" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="250" cy="165" r="1.8" fill="#2D6A4F" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.5s" repeatCount="indefinite" />
                <animate attributeName="r" values="1.2;2.2;1.2" dur="3.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="250" cy="335" r="1.5" fill="#74C69D" opacity="0.3">
                <animate attributeName="opacity" values="0.1;0.45;0.1" dur="5s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Orbit ring 2 - counter rotation */}
            <g className="animate-earth-rotate" style={{transformOrigin: '250px 250px', animationDuration: '90s', animationDirection: 'reverse'}}>
              <ellipse cx="250" cy="250" rx="218" ry="72" fill="none" stroke="#2D6A4F" strokeWidth="0.25" opacity="0.08" transform="rotate(25 250 250)" />
              <circle cx="35" cy="260" r="1.8" fill="#74C69D" opacity="0.4">
                <animate attributeName="opacity" values="0.15;0.55;0.15" dur="4.5s" repeatCount="indefinite" />
                <animate attributeName="r" values="1.2;2.5;1.2" dur="4.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="465" cy="240" r="1.2" fill="#2D6A4F" opacity="0.3">
                <animate attributeName="opacity" values="0.1;0.4;0.1" dur="5.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="260" cy="178" r="1.5" fill="#74C69D" opacity="0.35">
                <animate attributeName="opacity" values="0.1;0.5;0.1" dur="3.8s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Orbit ring 3 - tilted */}
            <g className="animate-earth-rotate" style={{transformOrigin: '250px 250px', animationDuration: '150s'}}>
              <ellipse cx="250" cy="250" rx="235" ry="95" fill="none" stroke="#74C69D" strokeWidth="0.2" opacity="0.06" transform="rotate(40 250 250)" />
              <circle cx="18" cy="245" r="1.2" fill="#74C69D" opacity="0.25">
                <animate attributeName="opacity" values="0.1;0.4;0.1" dur="6s" repeatCount="indefinite" />
              </circle>
              <circle cx="482" cy="255" r="1.5" fill="#2D6A4F" opacity="0.2">
                <animate attributeName="opacity" values="0.08;0.35;0.08" dur="7s" repeatCount="indefinite" />
                <animate attributeName="r" values="1;2;1" dur="7s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Floating scattered particles near globe */}
            <circle cx="180" cy="90" r="1" fill="#74C69D" opacity="0.2">
              <animate attributeName="opacity" values="0.05;0.3;0.05" dur="5s" repeatCount="indefinite" />
              <animate attributeName="r" values="0.8;1.8;0.8" dur="5s" repeatCount="indefinite" />
            </circle>
            <circle cx="380" cy="80" r="1.2" fill="#2D6A4F" opacity="0.15">
              <animate attributeName="opacity" values="0.05;0.25;0.05" dur="6s" repeatCount="indefinite" />
              <animate attributeName="r" values="0.8;2;0.8" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle cx="400" cy="200" r="0.8" fill="#74C69D" opacity="0.2">
              <animate attributeName="opacity" values="0.08;0.35;0.08" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="420" cy="300" r="1" fill="#2D6A4F" opacity="0.15">
              <animate attributeName="opacity" values="0.05;0.3;0.05" dur="5.5s" repeatCount="indefinite" />
              <animate attributeName="r" values="0.6;1.5;0.6" dur="5.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="130" cy="380" r="0.8" fill="#74C69D" opacity="0.12">
              <animate attributeName="opacity" values="0.05;0.2;0.05" dur="7s" repeatCount="indefinite" />
            </circle>
            <circle cx="350" cy="370" r="1.2" fill="#74C69D" opacity="0.18">
              <animate attributeName="opacity" values="0.08;0.35;0.08" dur="4.5s" repeatCount="indefinite" />
              <animate attributeName="r" values="0.8;1.8;0.8" dur="4.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="90" cy="220" r="0.8" fill="#2D6A4F" opacity="0.12">
              <animate attributeName="opacity" values="0.05;0.2;0.05" dur="6.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="410" cy="130" r="1" fill="#74C69D" opacity="0.15">
              <animate attributeName="opacity" values="0.05;0.28;0.05" dur="5s" repeatCount="indefinite" />
              <animate attributeName="r" values="0.7;1.6;0.7" dur="5s" repeatCount="indefinite" />
            </circle>

            {/* Subtle atmosphere glow */}
            <circle cx="250" cy="250" r="194" fill="none" stroke="#74C69D" strokeWidth="3" opacity="0.04" filter="url(#bgGlow)" />
          </svg>
        </div>

        <div className="section-container pt-24 pb-16 md:pt-36 md:pb-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
            {/* Left: Title */}
            <div className="flex-1 max-w-xl animate-fade-in-up">
              {/* Affiliation tag */}
              <p className="text-xs md:text-sm tracking-widest uppercase text-earth-green-soft font-normal mb-4 md:mb-6">
                SUSTech · {lang === 'zh' ? '环境科学与工程学院' : 'School of Environmental Science and Engineering'}
              </p>
              {/* Main title */}
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-light text-earth-green-deep leading-[1.1]">
                {lang === 'zh' ? (
                  <>
                    地球系统<br className="hidden md:inline" />与全球变化实验室
                  </>
                ) : (
                  <>
                    Earth System<br className="hidden md:inline" /> &amp; Global Change Lab
                  </>
                )}
              </h1>
              {/* Decorative divider */}
              <div className="mt-5 md:mt-6 flex items-center gap-3">
                <div className="w-8 h-[1px] bg-earth-green-soft" />
                <p className="text-xs text-earth-green tracking-wide">
                  {lang === 'zh' ? '理解地球 · 应对变化 · 走向可持续' : 'Understanding Earth · Addressing Change · Towards Sustainability'}
                </p>
              </div>
            </div>

            {/* Right: Research Directions Grid */}
            <div className="flex-1 max-w-lg w-full animate-fade-in-up" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
              <div className="grid grid-cols-2 gap-3">
                {researchData.directions.map((dir, idx) => (
                  <div
                    key={idx}
                    className="group flex items-start gap-3 p-3 md:p-4 rounded-card border border-neutral-gray/70 bg-white/80 backdrop-blur-sm hover:border-earth-green-soft/50 hover:shadow-sm transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-earth-green-glow flex items-center justify-center mt-0.5">
                      {dir.icon === 'Leaf' && (
                        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-earth-green" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22.23C7.37 18.06 9.35 14.01 17 12V8Z" fill="currentColor" opacity="0.6" />
                          <path d="M20.59 2C16.89 2 13.5 3.75 11.17 6.58C13.42 5.2 16.04 4.36 18.76 4.09L20.59 2Z" fill="currentColor" opacity="0.4" />
                        </svg>
                      )}
                      {dir.icon === 'Globe' && (
                        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-earth-green" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
                          <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
                          <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
                        </svg>
                      )}
                      {dir.icon === 'Thermometer' && (
                        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-earth-green" xmlns="http://www.w3.org/2000/svg">
                          <rect x="10" y="2" width="4" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
                          <circle cx="12" cy="19" r="3" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
                          <circle cx="12" cy="19" r="1.5" fill="currentColor" opacity="0.4" />
                        </svg>
                      )}
                      {dir.icon === 'Shield' && (
                        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-earth-green" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L3 7V12C3 17.25 6.75 21.5 12 23C17.25 21.5 21 17.25 21 12V7L12 2Z" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
                          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      {dir.icon === 'Cpu' && (
                        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-earth-green" xmlns="http://www.w3.org/2000/svg">
                          <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
                          <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.3" />
                          <line x1="9" y1="2" x2="9" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                          <line x1="15" y1="2" x2="15" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                          <line x1="9" y1="18" x2="9" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                          <line x1="15" y1="18" x2="15" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                        </svg>
                      )}
                      {dir.icon === 'Satellite' && (
                        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-earth-green" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
                          <path d="M12 2V5" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                          <path d="M12 19V22" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                          <path d="M2 12H5" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                          <path d="M19 12H22" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                          <path d="M4.93 4.93L6.76 6.76" stroke="currentColor" strokeWidth="1" opacity="0.25" />
                          <path d="M17.24 17.24L19.07 19.07" stroke="currentColor" strokeWidth="1" opacity="0.25" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs md:text-sm font-normal text-earth-green-deep leading-snug">
                        {lang === 'zh' ? dir.titleCn : dir.title}
                      </h4>
                      <p className="mt-0.5 text-[10px] md:text-xs text-neutral-text-secondary leading-relaxed line-clamp-2">
                        {lang === 'zh' ? dir.descriptionCn : dir.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PI Section */}
      <section className="section-container pt-16 md:pt-24 pb-8 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Left: PI Photo + Stats */}
          <div className="lg:col-span-3 flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8">
            <div className="relative">
              <img
                src={teamData.pi.photo}
                alt={lang === 'zh' ? teamData.pi.nameCn : teamData.pi.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-earth-green-soft/30"
              />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl md:text-3xl font-light text-earth-green-deep">
                {lang === 'zh' ? teamData.pi.nameCn : teamData.pi.name}
              </h2>
              <p className="mt-1 text-sm text-earth-green font-normal">
                {lang === 'zh' ? teamData.pi.titleCn : teamData.pi.title}
              </p>
              {/* Key Honors */}
              <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                {(lang === 'zh' ? teamData.pi.honorsCn : teamData.pi.honors).slice(0, 3).map((honor, i) => (
                  <span
                    key={i}
                    className="inline-block px-3 py-1 text-xs rounded-full bg-earth-green-glow text-earth-green-deep border border-earth-green-soft/20"
                  >
                    {honor}
                  </span>
                ))}
              </div>
              {/* Citation Stats */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { value: '24,795', labelEn: 'Citations', labelCn: '引用次数' },
                  { value: '64', labelEn: 'H-index', labelCn: 'H指数' },
                  { value: '160', labelEn: 'i10-index', labelCn: 'i10指数' },
                  { value: '150+', labelEn: 'Papers', labelCn: '论文' },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-2 rounded-card bg-white border border-neutral-gray">
                    <p className="text-lg md:text-xl font-light text-earth-green-deep">{stat.value}</p>
                    <p className="text-[10px] md:text-xs text-neutral-text-secondary">
                      {lang === 'zh' ? stat.labelCn : stat.labelEn}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[10px] text-neutral-text-secondary text-right">
                {lang === 'zh' ? '截至 2026年5月 · Google Scholar' : 'As of May 2026 · Google Scholar'}
              </p>
            </div>
          </div>

          {/* Right: Group Photo */}
          <div className="lg:col-span-2 w-full">
            <div className="relative rounded-card overflow-hidden border border-neutral-gray">
              <img
                src="/images/team/group_photo.jpg"
                alt={lang === 'zh' ? '课题组合照' : 'Lab Group Photo'}
                className="w-full h-48 md:h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-earth-green-deep/60 to-transparent p-4">
                <p className="text-white text-sm font-light">
                  {lang === 'zh' ? '地球系统与全球变化实验室' : 'Earth System & Global Change Lab'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="section-container pt-8 md:pt-12 pb-16 md:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              href: '/research',
              titleKey: 'home.card.research',
              descKey: 'home.card.researchDesc',
              icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-earth-green-soft">
                  {/* Microscope */}
                  <rect x="22" y="6" width="4" height="18" rx="1" fill="currentColor" opacity="0.5" />
                  <circle cx="24" cy="6" r="4" fill="currentColor" opacity="0.6" />
                  <rect x="16" y="24" width="16" height="3" rx="1.5" fill="currentColor" opacity="0.4" />
                  <path d="M18 27 C18 27 18 38 14 40 L34 40 C30 38 30 27 30 27" fill="currentColor" opacity="0.25" />
                  <rect x="10" y="40" width="28" height="3" rx="1.5" fill="currentColor" opacity="0.5" />
                  <circle cx="32" cy="16" r="3" fill="currentColor" opacity="0.35" />
                  <rect x="31" y="19" width="2" height="6" rx="1" fill="currentColor" opacity="0.3" />
                </svg>
              ),
            },
            {
              href: '/papers',
              titleKey: 'home.card.papers',
              descKey: 'home.card.papersDesc',
              icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-earth-green-soft">
                  {/* Open book / journal */}
                  <path d="M6 10 C6 10 14 8 24 8 C34 8 42 10 42 10 L42 36 C42 36 34 34 24 34 C14 34 6 36 6 36 Z" fill="currentColor" opacity="0.15" />
                  <line x1="24" y1="8" x2="24" y2="34" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
                  <line x1="10" y1="15" x2="20" y2="14" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
                  <line x1="10" y1="20" x2="20" y2="19" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
                  <line x1="10" y1="25" x2="20" y2="24" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
                  <line x1="28" y1="14" x2="38" y2="15" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
                  <line x1="28" y1="19" x2="38" y2="20" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
                  <line x1="28" y1="24" x2="38" y2="25" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
                </svg>
              ),
            },
            {
              href: '/team',
              titleKey: 'home.card.team',
              descKey: 'home.card.teamDesc',
              icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-earth-green-soft">
                  {/* People / group */}
                  <circle cx="18" cy="14" r="5" fill="currentColor" opacity="0.45" />
                  <circle cx="30" cy="14" r="5" fill="currentColor" opacity="0.45" />
                  <path d="M8 34 C8 26 12 22 18 22 C21 22 23 23 24 25 C25 23 27 22 30 22 C36 22 40 26 40 34" fill="currentColor" opacity="0.2" />
                  <circle cx="24" cy="20" r="4" fill="currentColor" opacity="0.55" />
                  <path d="M14 40 C14 33 18 29 24 29 C30 29 34 33 34 40" fill="currentColor" opacity="0.25" />
                </svg>
              ),
            },
            {
              href: '/news',
              titleKey: 'home.card.news',
              descKey: 'home.card.newsDesc',
              icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-earth-green-soft">
                  {/* Newspaper / bulletin */}
                  <rect x="6" y="8" width="36" height="28" rx="2" fill="currentColor" opacity="0.12" />
                  <rect x="6" y="8" width="36" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
                  <rect x="10" y="12" width="12" height="8" rx="1" fill="currentColor" opacity="0.25" />
                  <line x1="26" y1="13" x2="38" y2="13" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
                  <line x1="26" y1="17" x2="36" y2="17" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
                  <line x1="10" y1="24" x2="38" y2="24" stroke="currentColor" strokeWidth="1.2" opacity="0.2" />
                  <line x1="10" y1="28" x2="34" y2="28" stroke="currentColor" strokeWidth="1.2" opacity="0.15" />
                  <line x1="10" y1="32" x2="30" y2="32" stroke="currentColor" strokeWidth="1.2" opacity="0.1" />
                </svg>
              ),
            },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group block p-8 rounded-card border border-neutral-gray bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-normal text-earth-green-deep group-hover:text-earth-green transition-colors">
                {t(item.titleKey)}
              </h3>
              <p className="mt-2 text-sm text-neutral-text-secondary">{t(item.descKey)}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Recent News */}
      <section className="section-container pb-16 md:pb-24">
        <h2 className="text-2xl md:text-3xl font-light text-earth-green-deep mb-8">{t('home.recentNews')}</h2>
        <div className="space-y-6">
          {[
            { date: 'Jan 2025', titleEn: 'Impact of Amazonian deforestation on precipitation reverses between seasons', titleCn: '亚马逊森林砍伐对降水的影响在季节间逆转', journal: 'Nature' },
            { date: 'Jan 2025', titleEn: 'Record-breaking 2023 marine heatwaves', titleCn: '2023年破纪录的海洋热浪', journal: 'Science' },
            { date: '2024', titleEn: 'Urgent need to improve modelled sensitivity of evaporation to vegetation change', titleCn: '迫切需要改进蒸发对植被变化敏感性的模拟', journal: 'Nature Water' },
            { date: '2024', titleEn: "A national-scale assessment of land subsidence in China's major cities", titleCn: '中国主要城市地面沉降的国家级评估', journal: 'Science' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 py-4 border-b border-neutral-gray last:border-0"
            >
              <span className="text-sm text-neutral-text-secondary whitespace-nowrap min-w-[80px]">
                {item.date}
              </span>
              <div>
                <p className="text-base text-neutral-text">{lang === 'zh' ? item.titleCn : item.titleEn}</p>
                <p className="text-sm text-earth-green mt-1">{item.journal}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </>
  );
}
