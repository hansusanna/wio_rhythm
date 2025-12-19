// src/components/ui/OptionChip.tsx
type OptionChipProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export function OptionChip({ label, active = false, onClick }: OptionChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'w-full rounded-xl py-5 border text-base transition font-medium',
        active
          ? 'bg-brand-accent text-white border-brand-accent'
          : 'bg-ui-btnbg text-brand-accent border-brand-accent hover:bg-brand-accent hover:text-white',
      ].join(' ')}
    >
      {label}
    </button>
  );
}
