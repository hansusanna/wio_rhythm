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
        'formButton rounded-xl px-7 py-5 border text-base transition font-medium flex-1 max-w-[110px] text-nowrap',
        active
          ? 'formButton bg-brand-accent text-white border-brand-accent'
          : 'formButton bg-ui-btnbg text-brand-accent border-brand-accent hover:bg-brand-accent hover:text-white',
      ].join(' ')}
    >
      {label}
    </button>
  );
}
