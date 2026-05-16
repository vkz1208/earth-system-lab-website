'use client';

import Image from 'next/image';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { useLanguage } from '@/components/LanguageContext';
import teamData from '@/data/team.json';

const roleOrder = [
  'Research Assistant Professor',
  'Postdoc',
  'PhD Student',
  'Master Student',
  'Undergraduate',
  'Secretary',
];

const roleLabels: Record<string, { en: string; zh: string }> = {
  'Research Assistant Professor': { en: 'Research Assistant Professors', zh: '研究助理教授' },
  'Postdoc': { en: 'Postdocs', zh: '博士后' },
  'PhD Student': { en: 'PhD Students', zh: '博士研究生' },
  'Master Student': { en: 'Master Students', zh: '硕士研究生' },
  'Undergraduate': { en: 'Undergraduates', zh: '本科生' },
  'Secretary': { en: 'Secretaries', zh: '科研秘书' },
};

export default function TeamPage() {
  const { lang, t } = useLanguage();
  const { pi, members, alumni } = teamData;

  const grouped = roleOrder.reduce<Record<string, typeof members>>((acc, role) => {
    const filtered = members.filter((m) => m.role === role);
    if (filtered.length > 0) acc[role] = filtered;
    return acc;
  }, {});

  return (
    <>
      <PageHero
        title={t('team.title')}
        subtitle={t('team.subtitle')}
      />

      {/* PI Section */}
      <section className="section-container pb-16 md:pb-24">
        <SectionTitle>{t('team.pi')}</SectionTitle>
        <div className="p-8 rounded-card border border-neutral-gray bg-white max-w-3xl flex flex-col md:flex-row gap-8 items-start">
          {/* PI Photo */}
          <div className="shrink-0">
            {pi.photo ? (
              <div className="w-36 h-36 rounded-full overflow-hidden border-3 border-earth-green-soft bg-neutral-bg">
                <Image
                  src={pi.photo}
                  alt={pi.name}
                  width={144}
                  height={144}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-36 h-36 rounded-full border-3 border-earth-green-soft bg-neutral-bg flex items-center justify-center">
                <span className="text-4xl font-light text-earth-green-soft">
                  {pi.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          {/* PI Info */}
          <div className="min-w-0">
            <h3 className="text-xl font-normal text-earth-green-deep">
              {lang === 'en' ? pi.name : pi.nameCn}
              <span className="text-neutral-text-secondary ml-2">
                {lang === 'en' ? pi.nameCn : pi.name}
              </span>
            </h3>
            <p className="text-sm text-earth-green mt-1">
              {lang === 'zh' ? '教授' : pi.role}
            </p>
            <p className="text-sm text-neutral-text-secondary mt-1">
              {lang === 'zh' ? (pi as any).titleCn || pi.title : pi.title}
            </p>

            <div className="mt-4 space-y-1">
              {(lang === 'zh' ? (pi as any).educationCn || pi.education : pi.education).map((edu: string, i: number) => (
                <p key={i} className="text-sm text-neutral-text-secondary">
                  {edu}
                </p>
              ))}
            </div>

            <div className="mt-4">
              <p className="text-sm text-neutral-text-secondary leading-relaxed">
                {lang === 'zh' ? (pi as any).bioCn || pi.bio : pi.bio}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-xs font-medium text-neutral-text mb-2">{t('team.selectedHonors')}</p>
              <ul className="space-y-1">
                {(lang === 'zh' ? (pi as any).honorsCn || pi.honors : pi.honors).slice(0, 5).map((honor: string, i: number) => (
                  <li key={i} className="text-xs text-neutral-text-secondary">
                    {honor}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {pi.email && (
                <a
                  href={`mailto:${pi.email}`}
                  className="text-xs text-earth-green-deep hover:text-earth-green transition-colors"
                >
                  {pi.email}
                </a>
              )}
              {pi.links?.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1 rounded-full border border-earth-green-deep text-earth-green-deep hover:bg-earth-green-deep hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Current Members by Role */}
      {Object.entries(grouped).map(([role, roleMembers]) => (
        <section key={role} className="section-container pb-12 md:pb-16">
          <h2 className="text-lg font-normal text-earth-green-deep mb-6">
            {roleLabels[role]?.[lang] || role}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roleMembers.map((member) => (
              <MemberCard key={member.email || member.name} member={member} lang={lang} />
            ))}
          </div>
        </section>
      ))}

      {/* Alumni */}
      <section className="section-container pb-16 md:pb-24">
        <SectionTitle>{t('team.alumni')}</SectionTitle>

        {alumni.members.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-neutral-text mb-3">{t('team.formerMembers')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {alumni.members.map((a) => (
                <div key={a.name} className="text-sm text-neutral-text-secondary">
                  <span className="text-neutral-text">{lang === 'zh' && a.nameCn ? a.nameCn : a.name}</span>
                  {lang === 'zh' && a.nameCn && <span className="ml-1">({a.name})</span>}
                  {lang === 'en' && a.nameCn && <span className="ml-1">({a.nameCn})</span>}
                  {a.current && <span className="ml-1">— {a.current}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {alumni.masterStudents.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-neutral-text mb-3">{t('team.formerMaster')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {alumni.masterStudents.map((a) => (
                <div key={a.name} className="text-sm text-neutral-text-secondary">
                  <span className="text-neutral-text">{lang === 'zh' && a.nameCn ? a.nameCn : a.name}</span>
                  {lang === 'zh' && a.nameCn && <span className="ml-1">({a.name})</span>}
                  {lang === 'en' && a.nameCn && <span className="ml-1">({a.nameCn})</span>}
                  {a.current && <span className="ml-1">— {a.current}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {alumni.bachelorStudents.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-neutral-text mb-3">{t('team.formerBachelor')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {alumni.bachelorStudents.map((a) => (
                <div key={a.name} className="text-sm text-neutral-text-secondary">
                  <span className="text-neutral-text">{lang === 'zh' && a.nameCn ? a.nameCn : a.name}</span>
                  {lang === 'zh' && a.nameCn && <span className="ml-1">({a.name})</span>}
                  {lang === 'en' && a.nameCn && <span className="ml-1">({a.nameCn})</span>}
                  {a.current && <span className="ml-1">— {a.current}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Join Us */}
      <section className="section-container py-16 md:py-24 border-t border-neutral-gray">
        <div className="p-6 md:p-8 rounded-card border-2 border-dashed border-earth-green-soft/40 bg-white flex flex-col md:flex-row items-center gap-6 md:gap-8 hover:border-earth-green-soft/60 hover:shadow-sm transition-all duration-300">
          {/* Avatar placeholder */}
          <div className="shrink-0">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-dashed border-earth-green-soft/50 flex items-center justify-center bg-earth-green-glow/20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-10 h-10 md:w-12 md:h-12 text-earth-green-soft"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                <path d="M4 20C4 15.5817 7.58172 12 12 12C16.4183 12 20 15.5817 20 20" stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
                <line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
                <line x1="12" y1="12" x2="12" y2="14" stroke="currentColor" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
                <line x1="2" y1="8" x2="4" y2="8" stroke="currentColor" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
                <line x1="20" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-light text-earth-green-deep">
              {t('team.thisCouldBeYou')}
            </h2>
            <p className="mt-2 text-sm text-neutral-text-secondary leading-relaxed max-w-lg">
              {t('team.joinDesc')}
            </p>
            <a
              href="/contact"
              className="inline-block mt-4 px-5 py-2.5 bg-earth-green-deep text-white text-sm rounded-card hover:bg-earth-green transition-colors"
            >
              {t('team.contactUs')}
            </a>
          </div>

          {/* Decorative hint */}
          <div className="hidden lg:flex flex-col items-center gap-1 text-earth-green-soft/40">
            <div className="w-[1px] h-6 bg-earth-green-soft/20" />
            <span className="text-[10px] tracking-wider uppercase">{lang === 'zh' ? '虚位以待' : 'Your Spot'}</span>
            <div className="w-[1px] h-6 bg-earth-green-soft/20" />
          </div>
        </div>
      </section>
    </>
  );
}

function MemberCard({ member, lang }: { member: typeof teamData.members[0]; lang: string }) {
  return (
    <div className="p-6 rounded-card border border-neutral-gray bg-white hover:shadow-sm transition-shadow flex gap-5 items-start">
      {/* Photo */}
      <div className="shrink-0">
        {member.photo ? (
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-neutral-gray bg-neutral-bg">
            <Image
              src={member.photo}
              alt={member.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full border-2 border-neutral-gray bg-neutral-bg flex items-center justify-center">
            <span className="text-2xl font-light text-earth-green-soft">
              {(lang === 'zh' && member.nameCn) ? member.nameCn.charAt(0) : member.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      {/* Info */}
      <div className="min-w-0">
        <h3 className="text-base text-neutral-text">
          {lang === 'zh' && member.nameCn ? member.nameCn : member.name}
          {lang === 'zh' && member.nameCn && (
            <span className="text-neutral-text-secondary ml-2">{member.name}</span>
          )}
          {lang === 'en' && member.nameCn && (
            <span className="text-neutral-text-secondary ml-2">{member.nameCn}</span>
          )}
        </h3>
        <p className="text-sm text-earth-green mt-0.5">
          {lang === 'zh' ? (member as any).roleCn || member.role : member.role}
        </p>
        {member.started && (
          <p className="text-xs text-neutral-text-secondary mt-0.5">
            {lang === 'zh' ? `${(member as any).roleCn?.includes('秘书') ? '入职' : '入学'} ${member.started}` : `Started ${member.started}`}
          </p>
        )}
        {member.education && (
          <p className="text-xs text-neutral-text-secondary mt-0.5 leading-relaxed">
            {lang === 'zh' ? (member as any).educationCn || member.education : member.education}
          </p>
        )}
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="text-xs text-earth-green-deep hover:text-earth-green transition-colors mt-1 inline-block"
          >
            {member.email}
          </a>
        )}
      </div>
    </div>
  );
}
