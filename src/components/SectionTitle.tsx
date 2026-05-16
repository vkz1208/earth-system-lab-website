interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <h2 className={`text-2xl md:text-3xl font-light text-earth-green-deep mb-8 ${className}`}>
      {children}
    </h2>
  );
}
