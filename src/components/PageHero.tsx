import EarthSVG from './EarthSVG';

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-earth-green-glow/15 mb-8 md:mb-12">
      {/* Background Earth - compact decorative version */}
      <div className="absolute right-[-60px] md:right-[-40px] top-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[300px] md:h-[300px] lg:w-[360px] lg:h-[360px] pointer-events-none opacity-45">
        <EarthSVG variant="compact" />
      </div>

      <div className="section-container pt-16 pb-6 md:pt-20 md:pb-8 relative z-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-earth-green-deep leading-tight max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-base md:text-lg text-neutral-text-secondary max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
