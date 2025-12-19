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
        'w-full rounded-xl py-5 border-2 border-border-linered text-base transition font-semibold',
        active
          ? 'bg-brand-accent text-white border-brand-accent'
          : 'bg-ui-btnbg text-brand-accent hover:bg-brand-accent hover:text-white',
      ].join(' ')}
    >
      {label}
    </button>
  );
}
