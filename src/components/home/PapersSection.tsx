'use client';

import Image from 'next/image';
import { useLanguage } from '@/components/LanguageContext';
import { ExternalLink } from 'lucide-react';
import { papers as papersData, team as teamData } from '@/data';
import ArrowRight from '@/components/ArrowRight';

const papers = papersData.papers;

export default function PapersSection() {
  const { lang } = useLanguage();

  // Count NS-Main papers where PI is corresponding or first author
  const nsMainCount = papers.filter(
    (p) => p.journalCategory === 'NS-Main' && (p.isCorresponding || p.isFirstAuthor)
  ).length;

  // Count NS-Sub papers where PI is corresponding or first author
  const nsSubCount = papers.filter(
    (p) => p.journalCategory === 'NS-Sub' && (p.isCorresponding || p.isFirstAuthor)
  ).length;

  // Get the two NS-Main papers (corresponding/first author) for reading cards
  const nsMainPapers = papers.filter(
    (p) => p.journalCategory === 'NS-Main' && (p.isCorresponding || p.isFirstAuthor)
  ).slice(0, 2);

  return (
    <section className="section-container py-10 md:py-16">
      <h2 className="text-2xl md:text-3xl font-light text-earth-green-deep mb-2">
        {lang === 'zh' ? '发表论文' : 'Publications'}
      </h2>

      {/* Part 1: NS highlight text + paper reading cards */}
      <div className="mt-6">
        <p className="text-sm text-neutral-text leading-relaxed">
          {lang === 'zh' ? (
            <>
              以<span className="font-semibold text-earth-green-deep">第一作者/通讯作者</span>发表 Nature/Science 正刊 <span className="text-xl md:text-2xl font-bold text-earth-green-deep">{nsMainCount}</span> 篇，子刊 <span className="text-xl md:text-2xl font-bold text-earth-green-deep">{nsSubCount}</span> 篇
            </>
          ) : (
            <>
              Published <span className="text-xl md:text-2xl font-bold text-earth-green-deep">{nsMainCount}</span> papers in Nature/Science (Main) and <span className="text-xl md:text-2xl font-bold text-earth-green-deep">{nsSubCount}</span> in sub-journals as <span className="font-semibold text-earth-green-deep">First / Corresponding Author</span>
            </>
          )}
        </p>

        {/* NS-Main paper reading cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nsMainPapers.map((paper) => (
            <a
              key={paper.id}
              href={paper.doi ? `https://doi.org/${paper.doi}` : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex gap-4 p-4 rounded-card border border-neutral-gray bg-white hover:shadow-md hover:border-earth-green-soft/40 transition-all duration-300"
            >
              <div className="shrink-0 w-24 h-18 md:w-28 md:h-20 rounded-lg overflow-hidden bg-neutral-gray/30">
                <Image
                  src={paper.image || '/images/placeholder_paper.svg'}
                  alt={paper.title}
                  width={112}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-neutral-text leading-snug group-hover:text-earth-green-deep transition-colors line-clamp-2">
                  {paper.title}
                </h3>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-xs text-earth-green font-normal">{paper.journal}</span>
                  <span className="text-xs text-neutral-text-secondary">({paper.year})</span>
                  <ExternalLink size={12} strokeWidth={1.5} className="text-earth-green-soft group-hover:text-earth-green-deep transition-colors ml-auto shrink-0" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Part 2: Google Scholar data */}
      <div className="mt-8 pt-6 border-t border-neutral-gray/60">
        <div className="flex flex-wrap gap-3">
          {[
            { value: teamData.pi.scholarStats.citations, labelEn: 'Citations', labelCn: '引用次数' },
            { value: teamData.pi.scholarStats.hIndex, labelEn: 'H-index', labelCn: 'H指数' },
            { value: teamData.pi.scholarStats.i10Index, labelEn: 'i10-index', labelCn: 'i10指数' },
            { value: teamData.pi.scholarStats.publications, labelEn: 'Papers', labelCn: '论文' },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center px-5 py-3 rounded-card bg-white border border-neutral-gray min-w-[100px] flex-1"
            >
              <p className="text-2xl md:text-3xl font-light text-earth-green-deep">{stat.value}</p>
              <p className="text-[10px] md:text-xs text-neutral-text-secondary mt-1">
                {lang === 'zh' ? stat.labelCn : stat.labelEn}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[10px] text-neutral-text-secondary text-right">
          {lang === 'zh'
            ? `数据截至 ${teamData.pi.scholarStats.asOf.replace('-', '年')}月 · Google Scholar`
            : `As of ${new Date(teamData.pi.scholarStats.asOf + '-01').toLocaleDateString('en', { month: 'long', year: 'numeric' })} · Google Scholar`}
        </p>
      </div>

      <div className="flex justify-end mt-4">
        <a
          href="/papers"
          className="w-60 flex items-center justify-center gap-2 px-5 py-2.5 rounded-card border border-earth-green-soft/40 bg-earth-green-glow/30 text-earth-green-deep text-sm hover:bg-earth-green-deep hover:text-white hover:border-earth-green-deep transition-all duration-300 group"
        >
          {lang === 'zh' ? '查看全部论文' : 'View All Papers'}
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>
    </section>
  );
}
