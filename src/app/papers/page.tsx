'use client';

import { useState, useMemo } from 'react';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import Badge from '@/components/Badge';
import { useLanguage } from '@/components/LanguageContext';
import papers from '@/data/papers.json';
import { ExternalLink } from 'lucide-react';

const categories = ['All', 'Nature/Science', 'Environmental Science', 'Energy', 'Earth System Science'];
const categoriesCn: Record<string, string> = {
  'All': '全部',
  'Nature/Science': 'Nature/Science',
  'Environmental Science': '环境科学',
  'Energy': '能源',
  'Earth System Science': '地球系统科学',
};

export default function PapersPage() {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeYear, setActiveYear] = useState<number | null>(null);
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
      if (activeCategory !== 'All' && p.category !== activeCategory) return false;
      if (activeYear !== null && p.year !== activeYear) return false;
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
  }, [activeCategory, activeYear, search]);

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
            { value: '24,795', labelEn: 'Citations', labelCn: '引用次数' },
            { value: '64', labelEn: 'H-index', labelCn: 'H指数' },
            { value: '160', labelEn: 'i10-index', labelCn: 'i10指数' },
            { value: '150+', labelEn: 'Publications', labelCn: '发表论文' },
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
          {lang === 'zh' ? '数据截至 2026年5月 · Google Scholar' : 'As of May 2026 · Google Scholar'}
        </p>
      </section>

      {/* Selected Papers */}
      <section className="section-container pb-16 md:pb-24">
        <SectionTitle>{t('papers.selected')}</SectionTitle>
        <div className="space-y-4">
          {selectedPapers.slice(0, 10).map((paper) => (
            <div
              key={paper.id}
              className="p-5 rounded-card border border-neutral-gray bg-white"
            >
              <h3 className="text-base text-neutral-text leading-snug">
                {paper.title}
              </h3>
              <p className="text-sm text-neutral-text-secondary mt-2 leading-relaxed">
                {paper.authors}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-sm text-earth-green font-normal">
                  {paper.journal}
                </span>
                <span className="text-xs text-neutral-text-secondary">
                  ({paper.year})
                </span>
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

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {lang === 'zh' ? categoriesCn[cat] || cat : cat}
              </Badge>
            ))}
          </div>

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

        {/* Paper Count */}
        <p className="text-sm text-neutral-text-secondary mb-4">
          {filteredPapers.length} {t('papers.count')}
        </p>

        {/* Paper List */}
        <div className="space-y-3">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="p-4 rounded-card border border-neutral-gray bg-white"
            >
              <h3 className="text-sm text-neutral-text leading-snug">
                {paper.title}
              </h3>
              <p className="text-xs text-neutral-text-secondary mt-1.5 leading-relaxed">
                {paper.authors}
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <span className="text-xs text-earth-green">{paper.journal}</span>
                <span className="text-xs text-neutral-text-secondary">
                  ({paper.year})
                </span>
                {paper.isCorresponding && (
                  <span className="text-xs text-earth-green-soft">*</span>
                )}
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
