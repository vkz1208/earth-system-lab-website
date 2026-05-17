'use client';

import { Globe, Download, Code } from 'lucide-react';
import type { Lang } from '@/components/LanguageContext';
import SectionTitle from '@/components/SectionTitle';
import type { ResearchData } from '@/types';
import { EditableCard, AddButton, directionFields, courseFields, projectFields, datasetFields, iconMap, type FieldDef } from './shared';

interface Props {
  lang: Lang;
  t: (key: string) => string;
  research: ResearchData;
  openAdd: (collection: string, fields: FieldDef[], title: string) => void;
  openEdit: (collection: string, fields: FieldDef[], title: string, data: any, index: number) => void;
  handleDelete: (collection: string, index: number) => void;
}

export default function ResearchTab({ lang, t, research, openAdd, openEdit, handleDelete }: Props) {
  return (
    <>
      {/* Directions */}
      <section className="section-container pb-16 md:pb-24">
        <div className="flex items-center justify-between mb-6">
          <SectionTitle>{t('research.directions')}</SectionTitle>
          <AddButton label={lang === 'zh' ? '添加方向' : 'Add Direction'} onClick={() => openAdd('research.directions', directionFields, '添加研究方向')} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {research.directions.map((dir, idx: number) => (
            <EditableCard
              key={dir.title}
              onEdit={() => openEdit('research.directions', directionFields, '编辑研究方向', dir, idx)}
              onDelete={() => handleDelete('research.directions', idx)}
            >
              <div className="p-8 rounded-card border border-neutral-gray bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="text-earth-green-deep mb-4">{iconMap[dir.icon] || <Globe size={28} strokeWidth={1.5} />}</div>
                <h3 className="text-base font-normal text-earth-green-deep mb-2">
                  {lang === 'zh' ? dir.titleCn || dir.title : dir.title}
                </h3>
                <p className="text-sm text-neutral-text-secondary leading-relaxed">
                  {lang === 'zh' ? dir.descriptionCn || dir.description : dir.description}
                </p>
              </div>
            </EditableCard>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="section-container pb-16 md:pb-24">
        <div className="flex items-center justify-between mb-6">
          <SectionTitle>{t('research.teaching')}</SectionTitle>
          <AddButton label={lang === 'zh' ? '添加课程' : 'Add Course'} onClick={() => openAdd('research.courses', courseFields, '添加课程')} />
        </div>
        <div className="space-y-4">
          {research.courses.map((course, idx: number) => (
            <EditableCard
              key={course.name}
              onEdit={() => openEdit('research.courses', courseFields, '编辑课程', course, idx)}
              onDelete={() => handleDelete('research.courses', idx)}
            >
              <div className="p-6 rounded-card border border-neutral-gray bg-white">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-base text-neutral-text">{lang === 'zh' ? course.nameCn : course.name}</h3>
                    <p className="text-sm text-neutral-text-secondary mt-1">{lang === 'en' ? course.nameCn : course.name}</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-xs px-2 py-1 rounded-full border border-neutral-gray text-neutral-text-secondary">{course.type}</span>
                    <span className="text-xs px-2 py-1 rounded-full border border-neutral-gray text-neutral-text-secondary">{course.hours}h</span>
                    <span className="text-xs px-2 py-1 rounded-full border border-neutral-gray text-neutral-text-secondary">{course.language}</span>
                  </div>
                </div>
              </div>
            </EditableCard>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="section-container pb-16 md:pb-24">
        <div className="flex items-center justify-between mb-6">
          <SectionTitle>{t('research.projects')}</SectionTitle>
          <AddButton label={lang === 'zh' ? '添加项目' : 'Add Project'} onClick={() => openAdd('research.projects', projectFields, '添加项目')} />
        </div>
        <div className="space-y-4">
          {research.projects.map((project, idx: number) => (
            <EditableCard
              key={project.title}
              onEdit={() => openEdit('research.projects', projectFields, '编辑项目', project, idx)}
              onDelete={() => handleDelete('research.projects', idx)}
            >
              <div className="p-6 rounded-card border border-neutral-gray bg-white">
                <h3 className="text-base text-neutral-text">{lang === 'zh' ? project.titleCn || project.title : project.title}</h3>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-text-secondary">
                  <span>{lang === 'zh' ? project.sourceCn || project.source : project.source}</span>
                  <span>{project.period}</span>
                  <span>{project.funding}</span>
                  <span className="text-earth-green">{lang === 'zh' ? project.roleCn || project.role : project.role}</span>
                </div>
              </div>
            </EditableCard>
          ))}
        </div>
      </section>

      {/* Datasets */}
      <section className="section-container pb-16 md:pb-24">
        <div className="flex items-center justify-between mb-6">
          <SectionTitle>{t('research.datasets')}</SectionTitle>
          <AddButton label={lang === 'zh' ? '添加数据集' : 'Add Dataset'} onClick={() => openAdd('research.datasets', datasetFields, '添加数据集')} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {research.datasets.map((dataset, idx: number) => (
            <EditableCard
              key={dataset.title}
              onEdit={() => openEdit('research.datasets', datasetFields, '编辑数据集', dataset, idx)}
              onDelete={() => handleDelete('research.datasets', idx)}
            >
              <div className="p-6 rounded-card border border-neutral-gray bg-white">
                <h3 className="text-base text-neutral-text mb-2">{lang === 'zh' ? dataset.titleCn || dataset.title : dataset.title}</h3>
                <p className="text-sm text-neutral-text-secondary leading-relaxed mb-4">
                  {lang === 'zh' ? dataset.descriptionCn || dataset.description : dataset.description}
                </p>
                <div className="flex gap-3">
                  {dataset.downloadUrl && (
                    <span className="inline-flex items-center gap-1 text-xs text-earth-green-deep">
                      <Download size={14} strokeWidth={1.5} /> {t('research.download')}
                    </span>
                  )}
                  {dataset.codesUrl && (
                    <span className="inline-flex items-center gap-1 text-xs text-earth-green-deep">
                      <Code size={14} strokeWidth={1.5} /> {t('research.code')}
                    </span>
                  )}
                </div>
              </div>
            </EditableCard>
          ))}
        </div>
      </section>
    </>
  );
}
