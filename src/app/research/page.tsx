'use client';

import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { useLanguage } from '@/components/LanguageContext';
import { Leaf, Globe, Thermometer, Shield, Cpu, Satellite, Download, Code } from 'lucide-react';
import researchData from '@/data/research.json';

const iconMap: Record<string, React.ReactNode> = {
  Leaf: <Leaf size={28} strokeWidth={1.5} />,
  Globe: <Globe size={28} strokeWidth={1.5} />,
  Thermometer: <Thermometer size={28} strokeWidth={1.5} />,
  Shield: <Shield size={28} strokeWidth={1.5} />,
  Cpu: <Cpu size={28} strokeWidth={1.5} />,
  Satellite: <Satellite size={28} strokeWidth={1.5} />,
};

export default function ResearchPage() {
  const { lang, t } = useLanguage();

  return (
    <>
      <PageHero
        title={t('research.title')}
        subtitle={t('research.subtitle')}
      />

      {/* Research Directions */}
      <section className="section-container pb-16 md:pb-24">
        <SectionTitle>{t('research.directions')}</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchData.directions.map((dir) => (
            <div
              key={dir.title}
              className="p-8 rounded-card border border-neutral-gray bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="text-earth-green-deep mb-4">
                {iconMap[dir.icon] || <Globe size={28} strokeWidth={1.5} />}
              </div>
              <h3 className="text-base font-normal text-earth-green-deep mb-2">
                {lang === 'zh' ? (dir as any).titleCn || dir.title : dir.title}
              </h3>
              <p className="text-sm text-neutral-text-secondary leading-relaxed">
                {lang === 'zh' ? (dir as any).descriptionCn || dir.description : dir.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="section-container pb-16 md:pb-24">
        <SectionTitle>{t('research.teaching')}</SectionTitle>
        <div className="space-y-4">
          {researchData.courses.map((course) => (
            <div
              key={course.name}
              className="p-6 rounded-card border border-neutral-gray bg-white"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-base text-neutral-text">
                    {lang === 'zh' ? course.nameCn : course.name}
                  </h3>
                  <p className="text-sm text-neutral-text-secondary mt-1">
                    {lang === 'en' ? course.nameCn : course.name}
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-xs px-2 py-1 rounded-full border border-neutral-gray text-neutral-text-secondary">
                    {course.type}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full border border-neutral-gray text-neutral-text-secondary">
                    {course.hours}h
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full border border-neutral-gray text-neutral-text-secondary">
                    {course.language}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="section-container pb-16 md:pb-24">
        <SectionTitle>{t('research.projects')}</SectionTitle>
        <div className="space-y-4">
          {researchData.projects.map((project) => (
            <div
              key={project.title}
              className="p-6 rounded-card border border-neutral-gray bg-white"
            >
              <h3 className="text-base text-neutral-text">
                {lang === 'zh' ? (project as any).titleCn || project.title : project.title}
              </h3>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-text-secondary">
                <span>{lang === 'zh' ? (project as any).sourceCn || project.source : project.source}</span>
                <span>{project.period}</span>
                <span>{project.funding}</span>
                <span className="text-earth-green">
                  {lang === 'zh' ? (project as any).roleCn || project.role : project.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Datasets */}
      <section className="section-container pb-16 md:pb-24">
        <SectionTitle>{t('research.datasets')}</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {researchData.datasets.map((dataset) => (
            <div
              key={dataset.title}
              className="p-6 rounded-card border border-neutral-gray bg-white"
            >
              <h3 className="text-base text-neutral-text mb-2">
                {lang === 'zh' ? (dataset as any).titleCn || dataset.title : dataset.title}
              </h3>
              <p className="text-sm text-neutral-text-secondary leading-relaxed mb-4">
                {lang === 'zh' ? (dataset as any).descriptionCn || dataset.description : dataset.description}
              </p>
              <div className="flex gap-3">
                {dataset.downloadUrl && (
                  <a
                    href={dataset.downloadUrl}
                    className="inline-flex items-center gap-1 text-xs text-earth-green-deep hover:text-earth-green transition-colors"
                  >
                    <Download size={14} strokeWidth={1.5} />
                    {t('research.download')}
                  </a>
                )}
                {dataset.codesUrl && (
                  <a
                    href={dataset.codesUrl}
                    className="inline-flex items-center gap-1 text-xs text-earth-green-deep hover:text-earth-green transition-colors"
                  >
                    <Code size={14} strokeWidth={1.5} />
                    {t('research.code')}
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
