'use client';

import { useLanguage } from '@/components/LanguageContext';
import EarthSVG from '@/components/EarthSVG';
import PISection from '@/components/home/PISection';
import PapersSection from '@/components/home/PapersSection';
import ResearchSection from '@/components/home/ResearchSection';
import RecentNews from '@/components/home/RecentNews';
import ForcingDiagram from '@/components/home/ForcingDiagram';
import { site as siteData } from '@/data';

export default function Home() {
  const { lang } = useLanguage();

  return (
    <>
      {/* Hero Section — Title + diagram + globe background */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-earth-green-glow/20">
        {/* Globe background */}
        <div className="absolute right-[-3%] md:right-[-5%] top-[10%] md:top-[5%] lg:top-[0%] w-[280px] h-[280px] md:w-[420px] md:h-[420px] lg:w-[600px] lg:h-[600px] pointer-events-none animate-earth-float animate-earth-breathe" style={{animationDuration: '12s, 6s'}}>
          <EarthSVG variant="hero" />
        </div>

        <div className="section-container pt-16 pb-8 md:pt-24 md:pb-12 lg:pt-28 lg:pb-16 relative z-10">
          <div className="max-w-sm md:max-w-md animate-fade-in-up">
            <p className="text-xs md:text-sm tracking-widest uppercase text-earth-green-soft font-normal mb-4 md:mb-6">
              {lang === 'zh' ? siteData.hero.taglineCn : siteData.hero.tagline}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-[3.2rem] font-light text-earth-green-deep leading-[1.15]">
              {lang === 'zh' ? (
                <>{siteData.hero.titleCn.split('\n').map((line, i) => <span key={i}>{i > 0 && <br />}{line}</span>)}</>
              ) : (
                <>{siteData.hero.title.split('\n').map((line, i) => <span key={i}>{i > 0 && <br />}{line}</span>)}</>
              )}
            </h1>
            <div className="mt-4 md:mt-5 flex items-center gap-3">
              <div className="w-8 h-[1px] bg-earth-green-soft" />
              <p className="text-xs text-earth-green tracking-wide">
                {lang === 'zh' ? siteData.hero.subtitleCn : siteData.hero.subtitle}
              </p>
            </div>
            <div className="mt-6 md:mt-8">
              <ForcingDiagram />
            </div>
            <p className="mt-6 text-sm md:text-base font-medium text-earth-green-deep leading-relaxed">
              {lang === 'zh' ? siteData.hero.quoteCn : siteData.hero.quote}
            </p>
          </div>
        </div>
      </section>

      {/* Philosophical texts — between hero and PI section, right-aligned with design accent */}
      <section className="section-container py-10 md:py-16">
        <div className="max-w-3xl ml-auto animate-fade-in-up">
          {/* Decorative accent line */}
          <div className="w-12 h-[2px] bg-earth-green-soft/40 mb-8 ml-auto" />

          <p className="text-sm md:text-base text-neutral-text leading-relaxed text-right">
            {lang === 'zh' ? siteData.philosophy.paragraph1Cn : siteData.philosophy.paragraph1}
          </p>
          <p className="mt-5 text-sm md:text-base text-neutral-text leading-relaxed text-right">
            {lang === 'zh' ? siteData.philosophy.paragraph2Cn : siteData.philosophy.paragraph2}
          </p>
          <div className="mt-8 pt-6 border-t border-earth-green-soft/15 text-right">
            <p className="text-lg md:text-xl lg:text-2xl font-medium text-earth-green-deep leading-snug tracking-tight">
              {lang === 'zh'
                ? <>{siteData.philosophy.questionCn.split('\n').map((line, i) => <span key={i}>{i > 0 && <br />}{line}</span>)}</>
                : <>{siteData.philosophy.question.split('\n').map((line, i) => <span key={i}>{i > 0 && <br />}{line}</span>)}</>
              }
            </p>
          </div>
        </div>
      </section>

      <PISection />

      <ResearchSection />

      <PapersSection />

      <RecentNews />

    </>
  );
}