'use client';

import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { useLanguage } from '@/components/LanguageContext';
import newsData from '@/data/news.json';
import { ExternalLink } from 'lucide-react';

export default function NewsPage() {
  const { lang, t } = useLanguage();

  return (
    <>
      <PageHero
        title={t('news.title')}
        subtitle={t('news.subtitle')}
      />

      <section className="section-container pb-16 md:pb-24">
        <div className="space-y-6">
          {newsData.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-card border border-neutral-gray bg-white"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                <span className="text-sm text-neutral-text-secondary whitespace-nowrap min-w-[80px]">
                  {item.date}
                </span>
                <div className="flex-1">
                  <h3 className="text-base text-neutral-text leading-snug">
                    {lang === 'zh' ? (item as any).titleCn || item.title : item.title}
                  </h3>
                  <p className="text-sm text-neutral-text-secondary mt-2 leading-relaxed">
                    {lang === 'zh' ? (item as any).summaryCn || item.summary : item.summary}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-earth-green-deep hover:text-earth-green transition-colors mt-3"
                    >
                      <ExternalLink size={12} strokeWidth={1.5} />
                      {t('news.readMore')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
