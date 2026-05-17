'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import Badge from '@/components/Badge';
import { useLanguage } from '@/components/LanguageContext';
import {
  journalCategories,
  journalCategoriesCn,
  journalCategoriesEn,
  researchDirections,
  researchDirectionsCn,
  researchDirectionsEn,
} from '@/config';
import papersJson from '@/data/papers.json';
import { team as teamData } from '@/data';
import { ExternalLink } from 'lucide-react';

const papers = papersJson.papers;

export default function PapersPage() {
  const { lang, t } = useLanguage();
  const [activeJournalCategory, setActiveJournalCategory] = useState('All');
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [activeDirection, setActiveDirection] = useState('All');
  const [search, setSearch] = useState('');

  const years = useMemo(() => {
    const s = new Set(papers.map((p) => p.year));
    return Array.from(s).sort((a, b) => b - a);
  }, []);

  const selectedPapers = papers.filter(
    (p) =>
      p.category === 'Nature/Science' &&
      (p.isCorresponding || p.isFirstAuthor)
  );

  const filteredPapers = useMemo(() => {
    return papers.filter((p) => {
      if (activeJournalCategory !== 'All' && p.journalCategory !== activeJournalCategory) return false;
      if (activeYear !== null && p.year !== activeYear) return false;
      if (activeDirection !== 'All' && !p.researchDirections.includes(activeDirection)) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.authors.toLowerCase().includes(q) ||
          p.journal.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeJournalCategory, activeYear, activeDirection, search]);

  const dirLabel = (dir: string) =>
    lang === 'zh' ? researchDirectionsCn[dir] || dir : researchDirectionsEn[dir] || dir;

  return (
    <>
      <PageHero
        title={t('papers.title')}
        subtitle={t('papers.subtitle')}
      />

      {/* Publication Statistics */}
      <section className="section-container pb-12 md:pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { value: teamData.pi.scholarStats.citations, labelEn: 'Citations', labelCn: '引用次数' },
            { value: teamData.pi.scholarStats.hIndex, labelEn: 'H-index', labelCn: 'H指数' },
            { value: teamData.pi.scholarStats.i10Index, labelEn: 'i10-index', labelCn: 'i10指数' },
            { value: teamData.pi.scholarStats.publications, labelEn: 'Publications', labelCn: '发表论文' },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-5 md:p-6 rounded-card border border-neutral-gray bg-white"
            >
              <p className="text-2xl md:text-3xl font-light text-earth-green-deep">{stat.value}</p>
              <p className="mt-1 text-xs md:text-sm text-neutral-text-secondary">
                {lang === 'zh' ? stat.labelCn : stat.labelEn}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-neutral-text-secondary text-right">
          {lang === 'zh'
            ? `数据截至 ${teamData.pi.scholarStats.asOf.replace('-', '年')}月 · Google Scholar`
            : `As of ${new Date(teamData.pi.scholarStats.asOf + '-01').toLocaleDateString('en', { month: 'long', year: 'numeric' })} · Google Scholar`}
        </p>
      </section>

      {/* Selected Papers */}
      <section className="section-container pb-16 md:pb-24">
        <SectionTitle>{t('papers.selected')}</SectionTitle>
        <div className="space-y-4">
          {selectedPapers.slice(0, 10).map((paper) => (
            <div
              key={paper.id}
              className="flex gap-4 p-5 rounded-card border border-neutral-gray bg-white hover:shadow-md transition-shadow"
            >
              {/* Left: Paper Image */}
              <div className="flex-shrink-0 w-28 md:w-36 aspect-[4/3] rounded-lg overflow-hidden bg-neutral-gray/30">
                <Image
                  src={paper.image || '/images/placeholder_paper.svg'}
                  alt={paper.title}
                  width={144}
                  height={108}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Right: Paper Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-neutral-text leading-snug">
                  {paper.title}
                </h3>
                <p className="text-xs text-neutral-text-secondary mt-2 leading-relaxed line-clamp-2">
                  {paper.authors}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-earth-green font-normal">
                    {paper.journal}
                  </span>
                  <span className="text-xs text-neutral-text-secondary">
                    ({paper.year})
                  </span>
                  {paper.researchDirections.map((dir) => (
                    <span
                      key={dir}
                      className="inline-block px-2 py-0.5 text-[10px] rounded-full bg-earth-green-soft/20 text-earth-green-deep border border-earth-green-soft/30"
                    >
                      {dirLabel(dir)}
                    </span>
                  ))}
                  {paper.doi && (
                    <a
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-earth-green-deep hover:text-earth-green transition-colors ml-auto"
                    >
                      <ExternalLink size={12} strokeWidth={1.5} />
                      DOI
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Papers */}
      <section className="section-container pb-16 md:pb-24">
        <SectionTitle>{t('papers.all')}</SectionTitle>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          <input
            type="text"
            placeholder={t('papers.search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 text-sm border border-neutral-gray rounded-card bg-white focus:outline-none focus:border-earth-green"
          />

          {/* Journal Category Filter */}
          <div>
            <p className="text-xs font-medium text-neutral-text-secondary mb-2">
              {t('papers.journalCategory')}
            </p>
            <div className="flex flex-wrap gap-2">
              {journalCategories.map((cat) => (
                <Badge
                  key={cat}
                  active={activeJournalCategory === cat}
                  onClick={() => setActiveJournalCategory(cat)}
                >
                  {lang === 'zh' ? journalCategoriesCn[cat] || cat : journalCategoriesEn[cat] || cat}
                </Badge>
              ))}
            </div>
          </div>

          {/* Year Filter */}
          <div>
            <p className="text-xs font-medium text-neutral-text-secondary mb-2">
              {t('papers.year')}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge active={activeYear === null} onClick={() => setActiveYear(null)}>
                {t('papers.allYears')}
              </Badge>
              {years.map((y) => (
                <Badge
                  key={y}
                  active={activeYear === y}
                  onClick={() => setActiveYear(y)}
                >
                  {y}
                </Badge>
              ))}
            </div>
          </div>

          {/* Research Direction Filter */}
          <div>
            <p className="text-xs font-medium text-neutral-text-secondary mb-2">
              {t('papers.researchDirection')}
            </p>
            <div className="flex flex-wrap gap-2">
              {researchDirections.map((dir) => (
                <Badge
                  key={dir}
                  active={activeDirection === dir}
                  onClick={() => setActiveDirection(dir)}
                >
                  {lang === 'zh' ? researchDirectionsCn[dir] || dir : researchDirectionsEn[dir] || dir}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Paper Count */}
        <p className="text-sm text-neutral-text-secondary mb-4">
          {filteredPapers.length} {t('papers.count')}
        </p>

        {/* Paper List */}
        <div className="space-y-3">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="p-4 rounded-card border border-neutral-gray bg-white hover:shadow-sm transition-shadow"
            >
              <h3 className="text-sm font-semibold text-neutral-text leading-snug">
                {paper.title}
              </h3>
              <p className="text-xs text-neutral-text-secondary/70 mt-1.5 leading-relaxed line-clamp-1">
                {paper.authors}
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <span className="text-xs text-earth-green/80">{paper.journal}</span>
                <span className="text-xs text-neutral-text-secondary/60">
                  ({paper.year})
                </span>
                {paper.isCorresponding && (
                  <span className="text-xs text-earth-green-soft">*</span>
                )}
                {paper.researchDirections.map((dir) => (
                  <span
                    key={dir}
                    className="inline-block px-1.5 py-0.5 text-[10px] rounded-full bg-earth-green-soft/15 text-earth-green-deep/80 border border-earth-green-soft/20"
                  >
                    {dirLabel(dir)}
                  </span>
                ))}
                {paper.doi && (
                  <a
                    href={`https://doi.org/${paper.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-earth-green-deep hover:text-earth-green transition-colors ml-auto"
                  >
                    <ExternalLink size={10} strokeWidth={1.5} />
                    DOI
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
