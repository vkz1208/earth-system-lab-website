'use client';

import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { useLanguage, localizeField } from '@/components/LanguageContext';
import { researchIconMap } from '@/components/IconMap';
import { Download, Code } from 'lucide-react';
import { research as researchData } from '@/data';

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
              className="p-6 rounded-card border border-neutral-gray bg-white"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="text-earth-green-deep flex-shrink-0">
                  {researchIconMap[dir.icon] || researchIconMap['Globe']}
                </div>
                <h3 className="text-base font-semibold text-earth-green-deep">
                  {localizeField(dir, 'title', lang)}
                </h3>
              </div>
              <p className="text-xs text-neutral-text-secondary leading-relaxed">
                {localizeField(dir, 'description', lang)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="section-container pb-16 md:pb-24">
        <SectionTitle>{t('research.teaching')}</SectionTitle>
        <ul className="space-y-2.5">
          {researchData.courses.map((course) => (
            <li key={course.name} className="flex items-baseline gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-text-secondary flex-shrink-0 mt-2" />
              <span className="text-sm text-neutral-text leading-relaxed">
                <span className="font-medium">{lang === 'zh' ? course.nameCn : course.name}</span>
                <span className="text-neutral-text-secondary"> ({lang === 'en' ? course.nameCn : course.name})</span>
                <span className="text-neutral-text-secondary"> · {course.type} · {course.hours}h · {course.language}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Projects */}
      <section className="section-container pb-16 md:pb-24">
        <SectionTitle>{t('research.projects')}</SectionTitle>
        <ul className="space-y-2.5">
          {researchData.projects.map((project) => (
            <li key={project.title} className="flex items-baseline gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-text-secondary flex-shrink-0 mt-2" />
              <span className="text-sm text-neutral-text leading-relaxed">
                <span className="font-medium">{localizeField(project, 'title', lang)}</span>
                <span className="text-neutral-text-secondary"> · {localizeField(project, 'source', lang)} · {project.period} · {project.funding} · {localizeField(project, 'role', lang)}</span>
              </span>
            </li>
          ))}
        </ul>
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
              <h3 className="text-lg font-medium text-earth-green-deep mb-2">
                {localizeField(dataset, 'title', lang)}
              </h3>
              <p className="text-sm text-neutral-text-secondary leading-relaxed mb-4">
                {localizeField(dataset, 'description', lang)}
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
