'use client';

import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import type { Lang } from '@/components/LanguageContext';
import SectionTitle from '@/components/SectionTitle';
import type { NewsData } from '@/types';
import { EditableCard, AddButton, newsFields, type FieldDef } from './shared';

interface Props {
  lang: Lang;
  t: (key: string) => string;
  news: NewsData;
  openAdd: (collection: string, fields: FieldDef[], title: string) => void;
  openEdit: (collection: string, fields: FieldDef[], title: string, data: any, index: number) => void;
  handleDelete: (collection: string, index: number) => void;
}

export default function NewsTab({ lang, t, news, openAdd, openEdit, handleDelete }: Props) {
  return (
    <section className="section-container pb-16 md:pb-24">
      <div className="flex items-center justify-between mb-8">
        <SectionTitle>{lang === 'zh' ? '新闻列表' : 'News List'}</SectionTitle>
        <AddButton label={lang === 'zh' ? '添加新闻' : 'Add News'} onClick={() => openAdd('news', newsFields, '添加新闻')} />
      </div>
      <div className="space-y-6">
        {news.news.map((item, idx: number) => (
          <EditableCard
            key={item.id}
            onEdit={() => openEdit('news', newsFields, '编辑新闻', item, idx)}
            onDelete={() => handleDelete('news', idx)}
          >
            <div className="p-6 rounded-card border border-neutral-gray bg-white">
              <div className="flex flex-row gap-5">
                <div className="shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-card overflow-hidden bg-neutral-bg">
                  <Image
                    src={item.image || '/images/placeholder_news.svg'}
                    alt={lang === 'zh' ? item.titleCn || item.title : item.title}
                    width={144}
                    height={144}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-neutral-text-secondary whitespace-nowrap">{item.date}</span>
                  <h3 className="text-base text-neutral-text leading-snug mt-1">
                    {lang === 'zh' ? item.titleCn || item.title : item.title}
                  </h3>
                  <p className="text-sm text-neutral-text-secondary mt-2 leading-relaxed line-clamp-2">
                    {lang === 'zh' ? item.summaryCn || item.summary : item.summary}
                  </p>
                  {item.link && (
                    <span className="inline-flex items-center gap-1 text-xs text-earth-green-deep mt-3">
                      <ExternalLink size={12} strokeWidth={1.5} />
                      {t('news.readMore')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </EditableCard>
        ))}
      </div>
    </section>
  );
}
