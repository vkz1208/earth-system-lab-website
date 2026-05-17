'use client';

import { useState, useMemo } from 'react';
import PageHero from '@/components/PageHero';
import { useLanguage, localizeField } from '@/components/LanguageContext';
import { news as newsData } from '@/data';
import { formatDate } from '@/config';
import Badge from '@/components/Badge';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function NewsPage() {
  const { lang, t } = useLanguage();
  const [selectedYear, setSelectedYear] = useState<string>('all');

  // Extract all unique years from news data, sorted descending
  const years = useMemo(() => {
    const yearSet = new Set<string>();
    newsData.news.forEach((item) => {
      const year = item.date.split('-')[0];
      yearSet.add(year);
    });
    return Array.from(yearSet).sort((a, b) => Number(b) - Number(a));
  }, []);

  // Filter news by selected year
  const filteredNews = useMemo(() => {
    if (selectedYear === 'all') return newsData.news;
    return newsData.news.filter((item) => item.date.startsWith(selectedYear));
  }, [selectedYear]);

  // Sort filtered news by date descending
  const sortedNews = useMemo(() => {
    return [...filteredNews].sort((a, b) => b.date.localeCompare(a.date));
  }, [filteredNews]);

  return (
    <>
      <PageHero
        title={t('news.title')}
        subtitle={t('news.subtitle')}
      />

      <section className="section-container pb-16 md:pb-24">
        {/* Year filter */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-earth-green-deep">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            <span className="text-sm font-medium text-neutral-text-secondary">
              {lang === 'zh' ? '按年份筛选' : 'Filter by year'}
            </span>
            <span className="text-xs text-neutral-text-secondary ml-1">
              ({filteredNews.length} {t('news.newsCount')})
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge active={selectedYear === 'all'} onClick={() => setSelectedYear('all')}>
              {t('news.allYears')}
            </Badge>
            {years.map((year) => (
              <Badge
                key={year}
                active={selectedYear === year}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </Badge>
            ))}
          </div>
        </div>

        {/* News list */}
        <div className="grid gap-4">
          {sortedNews.map((item) => {
            const content = (
              <div className="flex flex-row gap-4 md:gap-5">
                <div className="shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-card overflow-hidden bg-neutral-bg">
                  <Image
                    src={item.image || '/images/placeholder_news.svg'}
                    alt={localizeField(item, 'title', lang)}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-earth-green-deep/70 font-medium whitespace-nowrap">
                    {formatDate(item.date, lang)}
                  </span>
                  <h3 className="text-sm md:text-base text-neutral-text leading-snug mt-1 font-medium">
                    {localizeField(item, 'title', lang)}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-text-secondary mt-1.5 leading-relaxed line-clamp-2">
                    {localizeField(item, 'summary', lang)}
                  </p>
                  {item.link && (
                    <span className="inline-flex items-center gap-1 text-xs text-earth-green-deep mt-2">
                      <ExternalLink size={11} strokeWidth={1.5} />
                      {t('news.readMore')}
                    </span>
                  )}
                </div>
              </div>
            );

            const cardBase = "p-4 md:p-5 rounded-card border bg-white border-neutral-gray";
            const clickableClass = `${cardBase} cursor-pointer hover:shadow-md hover:-translate-y-0.5 hover:border-earth-green-soft/60 transition-all duration-300`;
            const staticClass = `${cardBase} transition-colors duration-200`;

            return item.link ? (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={clickableClass}
              >
                {content}
              </a>
            ) : (
              <div
                key={item.id}
                className={staticClass}
              >
                {content}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
