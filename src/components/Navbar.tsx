'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Languages } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const navLinkKeys = [
  { href: '/', key: 'nav.home' },
  { href: '/team', key: 'nav.team' },
  { href: '/papers', key: 'nav.papers' },
  { href: '/research', key: 'nav.research' },
  { href: '/news', key: 'nav.news' },
  { href: '/contact', key: 'nav.contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-gray">
      <nav className="section-container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full border-2 border-earth-green-deep flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-earth-green-deep" />
          </div>
          <span className="text-sm font-normal text-earth-green-deep leading-tight hidden sm:block">
            Earth System &amp; Global Change Lab
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-8">
            {navLinkKeys.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-neutral-text-secondary hover:text-earth-green-deep transition-colors duration-200"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border border-neutral-gray text-neutral-text-secondary hover:border-earth-green-deep hover:text-earth-green-deep transition-colors"
            aria-label="Toggle language"
          >
            <Languages size={14} strokeWidth={1.5} />
            {lang === 'en' ? '中文' : 'EN'}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-2 py-1 text-xs rounded-full border border-neutral-gray text-neutral-text-secondary hover:border-earth-green-deep hover:text-earth-green-deep transition-colors"
            aria-label="Toggle language"
          >
            <Languages size={14} strokeWidth={1.5} />
            {lang === 'en' ? '中文' : 'EN'}
          </button>
          <button
            className="p-2 text-neutral-text-secondary hover:text-earth-green-deep"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-gray bg-white">
          <ul className="section-container py-4 space-y-3">
            {navLinkKeys.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-sm text-neutral-text-secondary hover:text-earth-green-deep transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
