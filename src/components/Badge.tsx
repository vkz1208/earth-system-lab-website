interface BadgeProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export default function Badge({ children, active = false, onClick }: BadgeProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-block px-3 py-1 text-xs rounded-full border transition-colors cursor-pointer
        ${
          active
            ? 'bg-earth-green-deep text-white border-earth-green-deep'
            : 'bg-white text-neutral-text-secondary border-neutral-gray hover:border-earth-green hover:text-earth-green-deep'
        }`}
    >
      {children}
    </button>
  );
}
