'use client';

import type { Lang } from '@/components/LanguageContext';
import SectionTitle from '@/components/SectionTitle';
import type { SiteData } from '@/types';
import { EditableCard, heroFields, philosophyFields, type FieldDef } from './shared';

interface Props {
  lang: Lang;
  site: SiteData;
  openAdd: (collection: string, fields: FieldDef[], title: string) => void;
  openEdit: (collection: string, fields: FieldDef[], title: string, data: any, index: number) => void;
  handleDelete: (collection: string, index: number) => void;
}

export default function SiteTab({ lang, site, openAdd, openEdit, handleDelete }: Props) {
  return (
    <>
      {/* Hero Section */}
      <section className="section-container pb-16 md:pb-24">
        <SectionTitle>{lang === 'zh' ? '首页 Hero 区域' : 'Hero Section'}</SectionTitle>
        <EditableCard
          onEdit={() => openEdit('site.hero', heroFields, '编辑 Hero 文案', site.hero, 0)}
          onDelete={() => {}}
          showDelete={false}
        >
          <div className="p-8 rounded-card border border-neutral-gray bg-white max-w-3xl">
            <p className="text-xs text-earth-green-soft tracking-widest uppercase">{lang === 'zh' ? site.hero.taglineCn : site.hero.tagline}</p>
            <h3 className="mt-2 text-2xl font-light text-earth-green-deep leading-tight">
              {lang === 'zh' ? site.hero.titleCn.replace(/\n/g, ' ') : site.hero.title.replace(/\n/g, ' ')}
            </h3>
            <p className="mt-2 text-xs text-earth-green">{lang === 'zh' ? site.hero.subtitleCn : site.hero.subtitle}</p>
            <p className="mt-3 text-sm text-neutral-text-secondary leading-relaxed">{lang === 'zh' ? site.hero.quoteCn : site.hero.quote}</p>
          </div>
        </EditableCard>
      </section>

      {/* Philosophy Section */}
      <section className="section-container pb-16 md:pb-24">
        <SectionTitle>{lang === 'zh' ? '哲学文案' : 'Philosophy'}</SectionTitle>
        <EditableCard
          onEdit={() => openEdit('site.philosophy', philosophyFields, '编辑哲学文案', site.philosophy, 0)}
          onDelete={() => {}}
          showDelete={false}
        >
          <div className="p-8 rounded-card border border-neutral-gray bg-white max-w-3xl">
            <p className="text-sm text-neutral-text leading-relaxed">{lang === 'zh' ? site.philosophy.paragraph1Cn : site.philosophy.paragraph1}</p>
            <p className="mt-3 text-sm text-neutral-text leading-relaxed">{lang === 'zh' ? site.philosophy.paragraph2Cn : site.philosophy.paragraph2}</p>
            <div className="mt-4 pt-4 border-t border-earth-green-soft/15">
              <p className="text-lg font-medium text-earth-green-deep">{lang === 'zh' ? site.philosophy.questionCn.replace(/\n/g, ' ') : site.philosophy.question.replace(/\n/g, ' ')}</p>
            </div>
          </div>
        </EditableCard>
      </section>

    </>
  );
}
