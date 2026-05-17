'use client';

import PageHero from '@/components/PageHero';
import { useLanguage } from '@/components/LanguageContext';
import { team as teamData } from '@/data';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
      />

      <section className="section-container pb-16 md:pb-24">
        <h2 className="text-lg font-normal text-earth-green-deep mb-6">
          {t('contact.info')}
        </h2>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-card border border-neutral-gray bg-white">
            <MapPin size={20} strokeWidth={1.5} className="text-earth-green mb-3" />
            <p className="text-sm text-neutral-text font-medium">{t('contact.address')}</p>
            <p className="text-sm text-neutral-text-secondary mt-1">{t('contact.addressLine1')}</p>
            <p className="text-sm text-neutral-text-secondary">{t('contact.addressLine2')}</p>
            <p className="text-sm text-neutral-text-secondary">{t('contact.addressLine3')}</p>
          </div>

          <div className="p-5 rounded-card border border-neutral-gray bg-white">
            <Mail size={20} strokeWidth={1.5} className="text-earth-green mb-3" />
            <p className="text-sm text-neutral-text font-medium">{t('contact.email')}</p>
            <a
              href={`mailto:${teamData.pi.email}`}
              className="text-sm text-earth-green-deep hover:text-earth-green transition-colors mt-1 inline-block"
            >
              {teamData.pi.email}
            </a>
          </div>

          <div className="p-5 rounded-card border border-neutral-gray bg-white">
            <Phone size={20} strokeWidth={1.5} className="text-earth-green mb-3" />
            <p className="text-sm text-neutral-text font-medium">{t('contact.phone')}</p>
            <p className="text-sm text-neutral-text-secondary mt-1">{teamData.pi.phone}</p>
          </div>

          <div className="p-5 rounded-card border border-neutral-gray bg-white">
            <Globe size={20} strokeWidth={1.5} className="text-earth-green mb-3" />
            <p className="text-sm text-neutral-text font-medium">{t('contact.website')}</p>
            <a
              href="https://www.zhenzhongzeng.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-earth-green-deep hover:text-earth-green transition-colors mt-1 inline-block"
            >
              www.zhenzhongzeng.com
            </a>
          </div>
        </div>

        {/* Open Positions */}
        <div className="mt-8 p-6 md:p-8 rounded-card border border-earth-green-soft/30 bg-earth-green-glow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-base font-normal text-earth-green-deep mb-2">
                {t('contact.openPositions')}
              </h3>
              <p className="text-sm text-neutral-text-secondary leading-relaxed mb-3">
                {t('contact.recruiting')}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-text-secondary">
                <span>{t('contact.postdoc')}</span>
                <span>{t('contact.phd')}</span>
                <span>{t('contact.master')}</span>
                <span>{t('contact.undergrad')}</span>
              </div>
            </div>
            <a
              href={`mailto:${teamData.pi.email}`}
              className="inline-block px-5 py-2.5 bg-earth-green-deep text-white text-sm rounded-card hover:bg-earth-green transition-colors shrink-0"
            >
              {t('contact.applyNow')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
