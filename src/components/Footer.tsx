'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-earth-green-deep">
      <div className="section-container py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-16">
          {/* Lab Info */}
          <div>
            <h3 className="text-base font-normal text-white mb-3">
              {t('footer.labName')}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              {t('footer.school')}
              <br />
              {t('footer.university')}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium text-white mb-3">{t('footer.contact')}</h4>
            <address className="not-italic text-sm text-white/70 leading-relaxed space-y-1">
              <p>{t('footer.address1')}</p>
              <p>{t('footer.address2')}</p>
              <p>
                <a
                  href="mailto:zengzz@sustech.edu.cn"
                  className="hover:text-earth-green-soft transition-colors"
                >
                  zengzz@sustech.edu.cn
                </a>
              </p>
            </address>
          </div>

          {/* Join Us */}
          <div>
            <h4 className="text-sm font-medium text-white mb-3">{t('home.joinUs')}</h4>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              {t('home.joinUsDesc')}
            </p>
            <a
              href="/contact"
              className="inline-block mt-4 px-5 py-2 border border-white/30 text-white text-sm rounded-card hover:bg-white/10 transition-colors"
            >
              {t('home.seeOpenings')}
            </a>
          </div>
        </div>

        {/* Funding & Copyright */}
        <div className="mt-10 pt-6 border-t border-white/15">
          <p className="text-xs text-white/50">
            {t('footer.funding')}
          </p>
          <p className="text-xs text-white/50 mt-2">
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
