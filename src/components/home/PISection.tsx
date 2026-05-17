'use client';

import Image from 'next/image';
import { useLanguage } from '@/components/LanguageContext';
import { team as teamData } from '@/data';
import { roleOrder } from '@/config';
import ArrowRight from '@/components/ArrowRight';

// 提到模块级：避免每次渲染重建
const shortLabel: Record<string, { en: string; zh: string }> = {
  'Research Assistant Professor': { en: 'Asst. Prof.', zh: '副研究员' },
  'Postdoc': { en: 'Postdocs', zh: '博士后' },
  'PhD Student': { en: 'PhD', zh: '博士生' },
  'Master Student': { en: 'Master', zh: '硕士生' },
  'Undergraduate': { en: 'Undergrad', zh: '本科生' },
};

export default function PISection() {
  const { lang } = useLanguage();

  return (
    <section className="section-container pt-16 md:pt-24 pb-8 md:pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-stretch">
        {/* Left: PI Photo + Info */}
        <div className="lg:col-span-3 flex items-center">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8 w-full">
            <div className="relative shrink-0 w-32 h-32 md:w-40 md:h-40">
              <Image
                src={teamData.pi.photo}
                alt={lang === 'zh' ? teamData.pi.nameCn : teamData.pi.name}
                fill
                className="rounded-full object-cover border-2 border-earth-green-soft/30"
              />
            </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl md:text-3xl font-light text-earth-green-deep">
              {lang === 'zh' ? teamData.pi.nameCn : teamData.pi.name}
            </h2>
            <p className="mt-1 text-sm text-earth-green font-normal">
              {lang === 'zh' ? teamData.pi.titleCn : teamData.pi.title}
            </p>
            {/* Key Honors */}
            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
              {(lang === 'zh' ? teamData.pi.honorsCn : teamData.pi.honors).slice(0, 3).map((honor, i) => (
                <span
                  key={i}
                  className="inline-block px-3 py-1 text-xs rounded-full bg-earth-green-glow text-earth-green-deep border border-earth-green-soft/20"
                >
                  {honor}
                </span>
              ))}
            </div>
          </div>
          </div>
        </div>

        {/* Right: Group Photo + Team Stats */}
        <div className="lg:col-span-2 w-full">
          <div className="relative rounded-card overflow-hidden border border-neutral-gray">
            <Image
              src="/images/team/group_photo.jpg"
              alt={lang === 'zh' ? '课题组合照' : 'Lab Group Photo'}
              width={600}
              height={256}
              className="w-full h-48 md:h-64 object-cover"
            />

            {/* Team stats overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-earth-green-deep/80 via-earth-green-deep/40 to-transparent pt-16 pb-4 px-4">
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-2">
                {roleOrder
                  .filter((role) => role !== 'Secretary')
                  .map((role) => {
                    const count = teamData.members.filter((m) => m.role === role).length;
                    if (count === 0) return null;
                    const label = shortLabel[role] || { en: role, zh: role };
                    return (
                      <div key={role} className="text-center">
                        <p className="text-base font-light text-white">{count}</p>
                        <p className="text-[10px] text-white/70">{lang === 'zh' ? label.zh : label.en}</p>
                      </div>
                    );
                  })}
              </div>
              <p className="text-white/80 text-xs font-light text-center">
                {lang === 'zh' ? '地球系统与全球变化实验室' : 'Earth System & Global Change Lab'}
              </p>
            </div>
          </div>

          {/* View Team button */}
          <div className="flex justify-end mt-3">
            <a
              href="/team"
              className="w-60 flex items-center justify-center gap-2 px-5 py-2.5 rounded-card border border-earth-green-soft/40 bg-earth-green-glow/30 text-earth-green-deep text-sm hover:bg-earth-green-deep hover:text-white hover:border-earth-green-deep transition-all duration-300 group"
            >
              {lang === 'zh' ? '了解更多团队成员' : 'Explore Our Team'}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
