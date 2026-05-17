'use client';

import Image from 'next/image';
import { useLanguage, localizeField } from '@/components/LanguageContext';
import { news } from '@/data';
import { formatDate } from '@/config';
import ArrowRight from '@/components/ArrowRight';
import { ExternalLink } from 'lucide-react';

const newsData = news.news;

export default function RecentNews() {
  const { lang, t } = useLanguage();

  const recentItems = newsData.slice(0, 4);

  return (
    <section className="section-container pb-16 md:pb-24">
      <h2 className="text-2xl md:text-3xl font-light text-earth-green-deep mb-8">{t('home.recentNews')}</h2>

      <div className="grid gap-4">
        {recentItems.map((item) => {
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

      <div className="flex justify-end mt-6">
        <a
          href="/news"
          className="w-60 flex items-center justify-center gap-2 px-5 py-2.5 rounded-card border border-earth-green-soft/40 bg-earth-green-glow/30 text-earth-green-deep text-sm hover:bg-earth-green-deep hover:text-white hover:border-earth-green-deep transition-all duration-300 group"
        >
          {lang === 'zh' ? '查看更多新闻' : 'View All News'}
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>
    </section>
  );
}
