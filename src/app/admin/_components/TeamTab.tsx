'use client';

import Image from 'next/image';
import type { Lang } from '@/components/LanguageContext';
import SectionTitle from '@/components/SectionTitle';
import type { TeamData, TeamMember } from '@/types';
import { roleOrder, roleLabels } from '@/config';
import { EditableCard, AddButton, piFields, memberFields, alumniMemberFields, type FieldDef } from './shared';

interface Props {
  lang: Lang;
  t: (key: string) => string;
  team: TeamData;
  openAdd: (collection: string, fields: FieldDef[], title: string) => void;
  openEdit: (collection: string, fields: FieldDef[], title: string, data: any, index: number) => void;
  handleDelete: (collection: string, index: number) => void;
}

export default function TeamTab({ lang, t, team, openAdd, openEdit, handleDelete }: Props) {
  const grouped = roleOrder.reduce<Record<string, TeamMember[]>>((acc, role) => {
    const filtered = team.members.filter((m) => m.role === role);
    if (filtered.length > 0) acc[role] = filtered;
    return acc;
  }, {} as Record<string, TeamMember[]>);

  return (
    <>
      {/* PI Section */}
      <section className="section-container pb-16 md:pb-24">
        <SectionTitle>{t('team.pi')}</SectionTitle>
        <EditableCard
          onEdit={() => openEdit('team.pi', piFields, '编辑 PI 信息', team.pi, 0)}
          onDelete={() => {}}
          showDelete={false}
        >
          <div className="p-8 rounded-card border border-neutral-gray bg-white max-w-3xl flex flex-col md:flex-row gap-8 items-start">
            <div className="shrink-0">
              {team.pi.photo ? (
                <div className="w-36 h-36 rounded-full overflow-hidden border-3 border-earth-green-soft bg-neutral-bg">
                  <Image src={team.pi.photo} alt={team.pi.name} width={144} height={144} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-36 h-36 rounded-full border-3 border-earth-green-soft bg-neutral-bg flex items-center justify-center">
                  <span className="text-4xl font-light text-earth-green-soft">{team.pi.name?.charAt(0)}</span>
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h3 className="text-xl font-normal text-earth-green-deep">
                {lang === 'en' ? team.pi.name : team.pi.nameCn}
                <span className="text-neutral-text-secondary ml-2">{lang === 'en' ? team.pi.nameCn : team.pi.name}</span>
              </h3>
              <p className="text-sm text-earth-green mt-1">{lang === 'zh' ? '教授' : team.pi.role}</p>
              <p className="text-sm text-neutral-text-secondary mt-1">{lang === 'zh' ? team.pi.titleCn : team.pi.title}</p>
              <div className="mt-4 space-y-1">
                {(lang === 'zh' ? team.pi.educationCn || team.pi.education : team.pi.education)?.map((edu: string, i: number) => (
                  <p key={i} className="text-sm text-neutral-text-secondary">{edu}</p>
                ))}
              </div>
              <p className="mt-4 text-sm text-neutral-text-secondary leading-relaxed">{lang === 'zh' ? team.pi.bioCn : team.pi.bio}</p>
              {(team.pi.honors && team.pi.honors.length > 0) && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-earth-green-deep mb-1.5">{lang === 'zh' ? '荣誉' : 'Honors'}</p>
                  <div className="space-y-0.5">
                    {(lang === 'zh' ? team.pi.honorsCn || team.pi.honors : team.pi.honors)?.map((h: string, i: number) => (
                      <p key={i} className="text-xs text-neutral-text-secondary">{h}</p>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                {team.pi.email && <span className="text-xs text-earth-green-deep">{team.pi.email}</span>}
                {team.pi.links?.map((link) => (
                  <span key={link.label} className="text-xs px-3 py-1 rounded-full border border-earth-green-deep text-earth-green-deep">{link.label}</span>
                ))}
              </div>
            </div>
          </div>
        </EditableCard>
      </section>

      {/* Members by Role */}
      {Object.entries(grouped).map(([role, roleMembers]) => {
        const membersWithIndex = roleMembers.map((m) => {
          const origIdx = team.members.findIndex((om) => om === m);
          return { ...m, _origIdx: origIdx };
        });
        return (
          <section key={role} className="section-container pb-12 md:pb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-normal text-earth-green-deep">
                {roleLabels[role]?.[lang] || role}
              </h2>
              <AddButton label={lang === 'zh' ? '添加成员' : 'Add Member'} onClick={() => openAdd('team.members', memberFields, '添加成员')} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {membersWithIndex.map((member) => (
                <EditableCard
                  key={member.email || member.name}
                  onEdit={() => openEdit('team.members', memberFields, '编辑成员', member, member._origIdx)}
                  onDelete={() => handleDelete('team.members', member._origIdx)}
                >
                  <div className="p-6 rounded-card border border-neutral-gray bg-white flex gap-5 items-start">
                    <div className="shrink-0">
                      {member.photo ? (
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-neutral-gray bg-neutral-bg">
                          <Image src={member.photo} alt={member.name} width={80} height={80} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-full border-2 border-neutral-gray bg-neutral-bg flex items-center justify-center">
                          <span className="text-2xl font-light text-earth-green-soft">{(lang === 'zh' && member.nameCn) ? member.nameCn.charAt(0) : member.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base text-neutral-text">
                        {lang === 'zh' && member.nameCn ? member.nameCn : member.name}
                        {lang === 'zh' && member.nameCn && <span className="text-neutral-text-secondary ml-2">{member.name}</span>}
                        {lang === 'en' && member.nameCn && <span className="text-neutral-text-secondary ml-2">{member.nameCn}</span>}
                      </h3>
                      <p className="text-sm text-earth-green mt-0.5">{lang === 'zh' ? member.roleCn || member.role : member.role}</p>
                      {member.started && <p className="text-xs text-neutral-text-secondary mt-0.5">Started {member.started}</p>}
                      {member.email && <p className="text-xs text-earth-green-deep mt-1">{member.email}</p>}
                    </div>
                  </div>
                </EditableCard>
              ))}
            </div>
          </section>
        );
      })}

      {/* Alumni */}
      <section className="section-container pb-16 md:pb-24">
        <SectionTitle>{t('team.alumni')}</SectionTitle>
        {([
          { key: 'members', labelEn: 'Former Members', labelCn: '高访/博后校友' },
          { key: 'masterStudents', labelEn: 'Master Alumni', labelCn: '硕士校友' },
          { key: 'bachelorStudents', labelEn: 'Undergraduate Alumni', labelCn: '本科校友' },
        ] as const).map(({ key, labelEn, labelCn }) => {
          const subList: any[] = team.alumni[key] || [];
          return (
            <div key={key} className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-neutral-text">{lang === 'zh' ? labelCn : labelEn}</h3>
                <AddButton label={lang === 'zh' ? '添加' : 'Add'} onClick={() => openAdd(`team.alumni.${key}`, alumniMemberFields, `添加${lang === 'zh' ? labelCn : labelEn}`)} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {subList.map((a: any, idx: number) => (
                  <EditableCard
                    key={a.name + idx}
                    onEdit={() => openEdit(`team.alumni.${key}`, alumniMemberFields, '编辑校友', a, idx)}
                    onDelete={() => handleDelete(`team.alumni.${key}`, idx)}
                  >
                    <div className="p-4 rounded-card border border-neutral-gray bg-white">
                      <span className="text-sm text-neutral-text">{lang === 'zh' && a.nameCn ? a.nameCn : a.name}</span>
                      {lang === 'zh' && a.nameCn && <span className="text-xs text-neutral-text-secondary ml-2">{a.name}</span>}
                      {lang === 'en' && a.nameCn && <span className="text-xs text-neutral-text-secondary ml-2">{a.nameCn}</span>}
                      <div className="mt-1 flex flex-wrap gap-2 text-xs text-neutral-text-secondary">
                        {a.role && <span>{lang === 'zh' ? a.roleCn || a.role : a.role}</span>}
                        {a.current && <span>— {lang === 'zh' ? a.currentCn || a.current : a.current}</span>}
                      </div>
                    </div>
                  </EditableCard>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
