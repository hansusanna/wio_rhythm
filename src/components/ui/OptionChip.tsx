// src/components/ui/OptionChip.tsx
type OptionChipProps = {
  label: string;
  hint?: string;
  active?: boolean;
  onClick?: () => void;
};

export function OptionChip({ label, hint, active = false, onClick }: OptionChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'rounded-2xl px-5 py-2.5 border text-sm transition',
        active
          ? 'bg-brand-accent text-white border-brand-accent'
          : 'bg-white/10 text-white/90 border-white/20 hover:bg-white/15',
      ].join(' ')}
    >
      <span className="font-medium">{label}</span>
      {hint && <span className="ml-2 text-xs opacity-75">({hint})</span>}
    </button>
  );
}
