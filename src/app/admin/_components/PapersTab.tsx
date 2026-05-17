'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import type { Lang } from '@/components/LanguageContext';
import SectionTitle from '@/components/SectionTitle';
import Badge from '@/components/Badge';
import type { PapersData, TeamData } from '@/types';
import { paperCategories, paperCategoriesCn } from '@/config';
import { EditableCard, AddButton, paperFields, scholarStatsFields, type FieldDef } from './shared';

interface Props {
  lang: Lang;
  t: (key: string) => string;
  papers: PapersData;
  team: TeamData;
  openAdd: (collection: string, fields: FieldDef[], title: string) => void;
  openEdit: (collection: string, fields: FieldDef[], title: string, data: any, index: number) => void;
  handleDelete: (collection: string, index: number) => void;
}

export default function PapersTab({ lang, t, papers, team, openAdd, openEdit, handleDelete }: Props) {
  const [paperCategory, setPaperCategory] = useState('All');

  const categories = paperCategories;
  const categoriesCn = paperCategoriesCn;
  const selectedPapers = papers.papers.filter((p) => p.category === 'Nature/Science' && (p.isCorresponding || p.isFirstAuthor));
  const filteredPapers = paperCategory === 'All' ? papers.papers : papers.papers.filter((p) => p.category === paperCategory);

  return (
    <>
      {/* Statistics — PI Scholar Stats */}
      <section className="section-container pb-12 md:pb-16">
        <EditableCard
          onEdit={() => openEdit('team.pi.scholarStats', scholarStatsFields, '编辑学术指标', team.pi.scholarStats, 0)}
          onDelete={() => {}}
          showDelete={false}
        >
          <div className="p-6 rounded-card border border-neutral-gray bg-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { value: team.pi.scholarStats.citations, labelEn: 'Citations', labelCn: '引用次数' },
                { value: team.pi.scholarStats.hIndex, labelEn: 'H-index', labelCn: 'H指数' },
                { value: team.pi.scholarStats.i10Index, labelEn: 'i10-index', labelCn: 'i10指数' },
                { value: team.pi.scholarStats.publications, labelEn: 'Publications', labelCn: '发表论文' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl md:text-3xl font-light text-earth-green-deep">{stat.value}</p>
                  <p className="mt-1 text-xs md:text-sm text-neutral-text-secondary">{lang === 'zh' ? stat.labelCn : stat.labelEn}</p>
                </div>
              ))}
            </div>
            {team.pi.scholarStats.asOf && (
              <p className="mt-3 text-xs text-neutral-text-secondary text-right">
                {lang === 'zh'
                  ? `数据截至 ${team.pi.scholarStats.asOf.replace('-', '年')}月 · Google Scholar`
                  : `As of ${new Date(team.pi.scholarStats.asOf + '-01').toLocaleDateString('en', { month: 'long', year: 'numeric' })} · Google Scholar`}
              </p>
            )}
          </div>
        </EditableCard>
      </section>

      {/* Selected Papers */}
      <section className="section-container pb-16 md:pb-24">
        <SectionTitle>{t('papers.selected')}</SectionTitle>
        <div className="space-y-4">
          {selectedPapers.map((paper) => {
            const origIdx = papers.papers.findIndex((p) => p.id === paper.id);
            return (
              <EditableCard
                key={paper.id}
                onEdit={() => openEdit('papers', paperFields, '编辑论文', paper, origIdx)}
                onDelete={() => handleDelete('papers', origIdx)}
              >
                <div className="p-5 rounded-card border border-neutral-gray bg-white">
                  <div className="flex gap-4">
                    {paper.image && (
                      <div className="shrink-0 w-20 h-20 rounded-card overflow-hidden bg-neutral-bg">
                        <Image src={paper.image} alt={paper.title} width={80} height={80} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base text-neutral-text leading-snug">{paper.title}</h3>
                      <p className="text-sm text-neutral-text-secondary mt-2 leading-relaxed">{paper.authors}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="text-sm text-earth-green font-normal">{paper.journal}</span>
                        {paper.journalCategory && <span className="text-xs px-1.5 py-0.5 rounded bg-earth-green-glow/30 text-earth-green-deep">{paper.journalCategory}</span>}
                        <span className="text-xs text-neutral-text-secondary">({paper.year})</span>
                        {paper.doi && (
                          <span className="inline-flex items-center gap-1 text-xs text-earth-green-deep ml-auto">
                            <ExternalLink size={12} strokeWidth={1.5} /> DOI
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </EditableCard>
            );
          })}
        </div>
      </section>

      {/* All Papers */}
      <section className="section-container pb-16 md:pb-24">
        <div className="flex items-center justify-between mb-6">
          <SectionTitle>{t('papers.all')}</SectionTitle>
          <AddButton label={lang === 'zh' ? '添加论文' : 'Add Paper'} onClick={() => openAdd('papers', paperFields, '添加论文')} />
        </div>
        {/* Category filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Badge key={cat} active={paperCategory === cat} onClick={() => setPaperCategory(cat)}>
              {lang === 'zh' ? categoriesCn[cat] || cat : cat}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-neutral-text-secondary mb-4">{filteredPapers.length} {t('papers.count')}</p>
        <div className="space-y-3">
          {filteredPapers.map((paper) => {
            const origIdx = papers.papers.findIndex((p) => p.id === paper.id);
            return (
              <EditableCard
                key={paper.id}
                onEdit={() => openEdit('papers', paperFields, '编辑论文', paper, origIdx)}
                onDelete={() => handleDelete('papers', origIdx)}
              >
                <div className="p-4 rounded-card border border-neutral-gray bg-white">
                  <h3 className="text-sm text-neutral-text leading-snug">{paper.title}</h3>
                  <p className="text-xs text-neutral-text-secondary mt-1.5 leading-relaxed">{paper.authors}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-earth-green">{paper.journal}</span>
                    {paper.journalCategory && <span className="text-[10px] px-1 py-0.5 rounded bg-earth-green-glow/30 text-earth-green-deep">{paper.journalCategory}</span>}
                    <span className="text-xs text-neutral-text-secondary">({paper.year})</span>
                    {paper.isCorresponding && <span className="text-xs text-earth-green-soft">*</span>}
                    {paper.doi && (
                      <span className="inline-flex items-center gap-1 text-xs text-earth-green-deep ml-auto">
                        <ExternalLink size={10} strokeWidth={1.5} /> DOI
                      </span>
                    )}
                  </div>
                </div>
              </EditableCard>
            );
          })}
        </div>
      </section>
    </>
  );
}
