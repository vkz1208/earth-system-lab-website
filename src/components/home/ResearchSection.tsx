'use client';

import { useLanguage, localizeField } from '@/components/LanguageContext';
import { directionIconMap } from '@/components/IconMap';
import { research as researchData } from '@/data';
import ArrowRight from '@/components/ArrowRight';

export default function ResearchSection() {
  const { lang } = useLanguage();

  return (
    <section className="section-container py-10 md:py-16">
      <h2 className="text-2xl md:text-3xl font-light text-earth-green-deep mb-6">
        {lang === 'zh' ? '研究方向' : 'Research Directions'}
      </h2>

      <div className="flex flex-wrap gap-3">
        {researchData.directions.map((dir) => {
          const iconCfg = directionIconMap[dir.icon];
          const Icon = iconCfg?.Icon;
          return (
            <div
              key={dir.title}
              className="flex items-center gap-2 px-4 py-2.5 rounded-card border border-neutral-gray bg-white"
            >
              <div className="text-earth-green-deep flex-shrink-0">
                {Icon && <Icon size={16} strokeWidth={1.5} />}
              </div>
              <h3 className="text-sm font-normal text-earth-green-deep">
                {localizeField(dir, 'title', lang)}
              </h3>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end mt-4">
        <a
          href="/research"
          className="w-60 flex items-center justify-center gap-2 px-5 py-2.5 rounded-card border border-earth-green-soft/40 bg-earth-green-glow/30 text-earth-green-deep text-sm hover:bg-earth-green-deep hover:text-white hover:border-earth-green-deep transition-all duration-300 group"
        >
          {lang === 'zh' ? '了解更多研究内容' : 'Explore Our Research'}
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>
    </section>
  );
}
