'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { researchIconMap } from '@/components/IconMap';

export type { FieldDef } from '@/components/AdminModal';
import type { FieldDef } from '@/components/AdminModal';

// ─── Field Definitions ───────────────────────────────────────────────
export const memberFields: FieldDef[] = [
  { name: 'name', label: '英文名', type: 'text', required: true },
  { name: 'nameCn', label: '中文名', type: 'text' },
  { name: 'role', label: '角色', type: 'select', required: true, options: [
    { label: 'Research Assistant Professor', value: 'Research Assistant Professor' },
    { label: 'Postdoc', value: 'Postdoc' },
    { label: 'PhD Student', value: 'PhD Student' },
    { label: 'Master Student', value: 'Master Student' },
    { label: 'Undergraduate', value: 'Undergraduate' },
    { label: 'Secretary', value: 'Secretary' },
  ]},
  { name: 'roleCn', label: '角色（中文）', type: 'text' },
  { name: 'email', label: '邮箱', type: 'text' },
  { name: 'education', label: '教育经历（英文）', type: 'text' },
  { name: 'educationCn', label: '教育经历（中文）', type: 'text' },
  { name: 'started', label: '入职/入学时间', type: 'text', hint: '如 Sep 2023' },
  { name: 'photo', label: '照片路径', type: 'text', placeholder: '/images/team/xxx.jpg' },
];

export const piFields: FieldDef[] = [
  { name: 'name', label: '英文名', type: 'text', required: true },
  { name: 'nameCn', label: '中文名', type: 'text', required: true },
  { name: 'role', label: '角色', type: 'text' },
  { name: 'title', label: '英文头衔', type: 'text' },
  { name: 'titleCn', label: '中文头衔', type: 'text' },
  { name: 'email', label: '邮箱', type: 'text' },
  { name: 'phone', label: '电话', type: 'text' },
  { name: 'photo', label: '照片路径', type: 'text' },
  { name: 'education', label: '教育经历（英文）', type: 'list', hint: '每行一条' },
  { name: 'educationCn', label: '教育经历（中文）', type: 'list', hint: '每行一条' },
  { name: 'bio', label: '简介（英文）', type: 'textarea', rows: 4 },
  { name: 'bioCn', label: '简介（中文）', type: 'textarea', rows: 4 },
  { name: 'honors', label: '荣誉（英文）', type: 'list', hint: '每行一条' },
  { name: 'honorsCn', label: '荣誉（中文）', type: 'list', hint: '每行一条' },
  { name: 'links', label: '链接', type: 'list', itemFields: [
    { name: 'label', label: '标签', type: 'text' },
    { name: 'url', label: '链接', type: 'text' },
  ]},
];

export const paperFields: FieldDef[] = [
  { name: 'title', label: '标题', type: 'text', required: true },
  { name: 'authors', label: '作者', type: 'textarea', rows: 2, required: true },
  { name: 'journal', label: '期刊', type: 'text', required: true },
  { name: 'year', label: '年份', type: 'number', required: true },
  { name: 'volume', label: '卷', type: 'text' },
  { name: 'issue', label: '期', type: 'text' },
  { name: 'pages', label: '页码', type: 'text' },
  { name: 'doi', label: 'DOI', type: 'text' },
  { name: 'category', label: '分类', type: 'select', required: true, options: [
    { label: 'Nature/Science', value: 'Nature/Science' },
    { label: 'Environmental Science', value: 'Environmental Science' },
    { label: 'Energy', value: 'Energy' },
    { label: 'Earth System Science', value: 'Earth System Science' },
  ]},
  { name: 'journalCategory', label: '期刊级别', type: 'select', options: [
    { label: 'NS-Main (Nature/Science主刊)', value: 'NS-Main' },
    { label: 'NS-Sub (Nature/Science子刊)', value: 'NS-Sub' },
    { label: 'Top-Journal (顶级期刊)', value: 'Top-Journal' },
    { label: 'Field-Journal (领域期刊)', value: 'Field-Journal' },
  ]},
  { name: 'researchDirections', label: '研究方向', type: 'list', hint: '每行一个方向标识，如 earth-system, energy-transition, ai-climate' },
  { name: 'image', label: '配图路径', type: 'text', placeholder: '/images/papers/xxx.png' },
  { name: 'isCorresponding', label: '通讯作者', type: 'boolean', hint: '标记为通讯作者' },
  { name: 'isFirstAuthor', label: '第一作者', type: 'boolean', hint: '标记为第一作者' },
];

export const newsFields: FieldDef[] = [
  { name: 'date', label: '日期', type: 'text', required: true, hint: '如 2025-01' },
  { name: 'title', label: '标题（英文）', type: 'text', required: true },
  { name: 'titleCn', label: '标题（中文）', type: 'text' },
  { name: 'summary', label: '摘要（英文）', type: 'textarea', rows: 3 },
  { name: 'summaryCn', label: '摘要（中文）', type: 'textarea', rows: 3 },
  { name: 'image', label: '配图路径', type: 'text', placeholder: '/images/news/xxx.png' },
  { name: 'link', label: '链接', type: 'text' },
];

export const directionFields: FieldDef[] = [
  { name: 'title', label: '标题（英文）', type: 'text', required: true },
  { name: 'titleCn', label: '标题（中文）', type: 'text' },
  { name: 'description', label: '描述（英文）', type: 'textarea', rows: 3 },
  { name: 'descriptionCn', label: '描述（中文）', type: 'textarea', rows: 3 },
  { name: 'icon', label: '图标', type: 'select', options: [
    { label: '树叶 Leaf', value: 'Leaf' },
    { label: '地球 Globe', value: 'Globe' },
    { label: '温度计 Thermometer', value: 'Thermometer' },
    { label: '盾牌 Shield', value: 'Shield' },
    { label: '芯片 Cpu', value: 'Cpu' },
    { label: '卫星 Satellite', value: 'Satellite' },
  ]},
];

export const projectFields: FieldDef[] = [
  { name: 'title', label: '标题（英文）', type: 'text', required: true },
  { name: 'titleCn', label: '标题（中文）', type: 'text' },
  { name: 'source', label: '来源（英文）', type: 'text' },
  { name: 'sourceCn', label: '来源（中文）', type: 'text' },
  { name: 'period', label: '周期', type: 'text', hint: '如 2024-2028' },
  { name: 'funding', label: '经费', type: 'text' },
  { name: 'role', label: '角色（英文）', type: 'text' },
  { name: 'roleCn', label: '角色（中文）', type: 'text' },
];

export const courseFields: FieldDef[] = [
  { name: 'name', label: '课程名（英文）', type: 'text', required: true },
  { name: 'nameCn', label: '课程名（中文）', type: 'text' },
  { name: 'type', label: '类型', type: 'select', options: [
    { label: 'Undergraduate', value: 'Undergraduate' },
    { label: 'Graduate', value: 'Graduate' },
  ]},
  { name: 'hours', label: '学时', type: 'text' },
  { name: 'language', label: '授课语言', type: 'select', options: [
    { label: 'English', value: 'English' },
    { label: 'Chinese', value: 'Chinese' },
  ]},
];

export const datasetFields: FieldDef[] = [
  { name: 'title', label: '标题（英文）', type: 'text', required: true },
  { name: 'titleCn', label: '标题（中文）', type: 'text' },
  { name: 'description', label: '描述（英文）', type: 'textarea', rows: 3 },
  { name: 'descriptionCn', label: '描述（中文）', type: 'textarea', rows: 3 },
  { name: 'downloadUrl', label: '下载链接', type: 'text' },
  { name: 'codesUrl', label: '代码链接', type: 'text' },
];

export const alumniMemberFields: FieldDef[] = [
  { name: 'name', label: '英文名', type: 'text', required: true },
  { name: 'nameCn', label: '中文名', type: 'text' },
  { name: 'role', label: '角色（英文）', type: 'select', options: [
    { label: 'Postdoc', value: 'Postdoc' },
    { label: 'PhD Student', value: 'PhD Student' },
    { label: 'Master Student', value: 'Master Student' },
    { label: 'Undergraduate', value: 'Undergraduate' },
  ]},
  { name: 'roleCn', label: '角色（中文）', type: 'text' },
  { name: 'current', label: '去向（英文）', type: 'text' },
  { name: 'currentCn', label: '去向（中文）', type: 'text' },
  { name: 'photo', label: '照片路径', type: 'text', placeholder: '/images/team/xxx.jpg' },
];

export const heroFields: FieldDef[] = [
  { name: 'tagline', label: '标签行（英文）', type: 'text' },
  { name: 'taglineCn', label: '标签行（中文）', type: 'text' },
  { name: 'title', label: '标题（英文）', type: 'text', hint: '用 \\n 表示换行' },
  { name: 'titleCn', label: '标题（中文）', type: 'text', hint: '用 \\n 表示换行' },
  { name: 'subtitle', label: '副标题（英文）', type: 'text' },
  { name: 'subtitleCn', label: '副标题（中文）', type: 'text' },
  { name: 'quote', label: '引言（英文）', type: 'textarea', rows: 2 },
  { name: 'quoteCn', label: '引言（中文）', type: 'textarea', rows: 2 },
];

export const philosophyFields: FieldDef[] = [
  { name: 'paragraph1', label: '段落1（英文）', type: 'textarea', rows: 3 },
  { name: 'paragraph1Cn', label: '段落1（中文）', type: 'textarea', rows: 3 },
  { name: 'paragraph2', label: '段落2（英文）', type: 'textarea', rows: 3 },
  { name: 'paragraph2Cn', label: '段落2（中文）', type: 'textarea', rows: 3 },
  { name: 'question', label: '提问（英文）', type: 'text', hint: '用 \\n 表示换行' },
  { name: 'questionCn', label: '提问（中文）', type: 'text', hint: '用 \\n 表示换行' },
];

export const scholarStatsFields: FieldDef[] = [
  { name: 'citations', label: '引用次数', type: 'text', required: true },
  { name: 'hIndex', label: 'H-index', type: 'text', required: true },
  { name: 'i10Index', label: 'i10-index', type: 'text', required: true },
  { name: 'publications', label: '发表论文数', type: 'text', required: true },
  { name: 'asOf', label: '数据截止日期', type: 'text', hint: '格式: YYYY-MM，如 2026-05' },
];

export const iconMap = researchIconMap;

// ─── Card wrapper with edit/delete hover ─────────────────────────────
export function EditableCard({
  children,
  onEdit,
  onDelete,
  className = '',
  showDelete = true,
}: {
  children: React.ReactNode;
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
  showDelete?: boolean;
}) {
  const [confirm, setConfirm] = useState(false);
  return (
    <div className={`group relative ${className}`}>
      {children}
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-earth-green-deep/0 group-hover:bg-earth-green-deep/[0.03] rounded-card transition-colors duration-200 pointer-events-none" />
      {/* Edit/Delete buttons */}
      <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={onEdit}
          className="p-1.5 bg-white rounded-lg border border-neutral-gray shadow-sm text-earth-green-deep hover:bg-earth-green-glow transition-colors"
          title="编辑"
        >
          <Pencil size={14} />
        </button>
        {showDelete && (confirm ? (
          <div className="flex items-center gap-1 px-2 py-1 bg-red-50 rounded-lg border border-red-200">
            <button onClick={onDelete} className="text-xs text-red-600 font-medium">确认</button>
            <button onClick={() => setConfirm(false)} className="text-xs text-neutral-text-secondary">取消</button>
          </div>
        ) : (
          <button
            onClick={() => setConfirm(true)}
            className="p-1.5 bg-white rounded-lg border border-neutral-gray shadow-sm text-red-400 hover:bg-red-50 hover:border-red-200 transition-colors"
            title="删除"
          >
            <Trash2 size={14} />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Section Add Button ──────────────────────────────────────────────
export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm text-earth-green-deep border-2 border-dashed border-earth-green-soft/40 rounded-card hover:border-earth-green-soft hover:bg-earth-green-glow/20 transition-all duration-200"
    >
      <Plus size={16} />
      {label}
    </button>
  );
}
